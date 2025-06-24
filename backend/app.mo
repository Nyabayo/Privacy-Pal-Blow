import Nat "mo:base/Nat";
import Nat64 "mo:base/Nat64";
import Text "mo:base/Text";
import Blob "mo:base/Blob";
import Array "mo:base/Array";
import Principal "mo:base/Principal";
import Time "mo:base/Time";

actor BlowStorage {
  type BlowId = Nat;
  type Tag = Text;
  type File = {
    name : Text;
    contentType : Text;
    data : Blob;
  };
  
  // New Blow type with additional fields
  type Blow = {
    id : BlowId;
    description : Text;
    files : [File];
    tags : [Tag];
    trustScore : ?Nat;
    timestamp : Nat64;
    upvotes : Nat;
    downvotes : Nat;
    visibility : Nat; // 0-100, higher = more visible
    flagged : Bool;
  };
  
  stable var blows : [Blow] = [];
  stable var nextId : BlowId = 0;

  public shared({caller}) func submit_blow(description : Text, files : [File], tags : [Tag]) : async BlowId {
    // Use provided tags or default tags
    let aiTags : [Tag] = if (Array.size(tags) == 0) {
      ["whistleblowing", "report"];
    } else {
      tags;
    };
    
    // Simple trust score based on description length and content
    let trustScore : Nat = if (Text.size(description) > 100) {
      75; // Longer descriptions are more credible
    } else if (Text.size(description) > 50) {
      60;
    } else {
      40;
    };
    
    // Determine initial visibility based on trust score
    let initialVisibility : Nat = if (trustScore > 70) {
      80; // High trust = high visibility
    } else if (trustScore > 40) {
      60; // Medium trust = medium visibility
    } else {
      30; // Low trust = low visibility
    };
    
    // Check for potentially abusive content (simple keyword check)
    let flagged : Bool = Text.contains(description, #text "kill") or 
                        Text.contains(description, #text "bomb") or
                        Text.contains(description, #text "hate") or
                        Text.contains(description, #text "attack");
    
    // Reduce visibility if flagged
    let finalVisibility : Nat = if (flagged) {
      Nat.max(initialVisibility / 2, 10); // At least 10% visibility even if flagged
    } else {
      initialVisibility;
    };

    let blow : Blow = {
      id = nextId;
      description = description;
      files = files;
      tags = aiTags;
      trustScore = ?trustScore;
      timestamp = Nat64.fromIntWrap(Time.now());
      upvotes = 0;
      downvotes = 0;
      visibility = finalVisibility;
      flagged = flagged;
    };
    blows := Array.append(blows, [blow]);
    nextId += 1;
    return blow.id;
  };

  public query func get_blows() : async [Blow] {
    // Sort by visibility and timestamp (newest, most visible first)
    let sortedBlows = Array.sort<Blow>(blows, func (a, b) {
      if (a.visibility > b.visibility) return #less;
      if (a.visibility < b.visibility) return #greater;
      if (a.timestamp > b.timestamp) return #less;
      if (a.timestamp < b.timestamp) return #greater;
      return #equal;
    });
    return sortedBlows;
  };

  public query func get_blow(id : BlowId) : async ?Blow {
    for (blow in blows.vals()) {
      if (blow.id == id) return ?blow;
    };
    return null;
  };

  public shared({caller}) func upvote_blow(id : BlowId) : async Bool {
    var found = false;
    blows := Array.map<Blow, Blow>(blows, func (blow) {
      if (blow.id == id) {
        found := true;
        let newUpvotes = blow.upvotes + 1;
        let newVisibility = Nat.min(blow.visibility + 5, 100); // Increase visibility by 5, max 100
        { blow with upvotes = newUpvotes; visibility = newVisibility }
      } else blow
    });
    return found;
  };

  public shared({caller}) func downvote_blow(id : BlowId) : async Bool {
    var found = false;
    blows := Array.map<Blow, Blow>(blows, func (blow) {
      if (blow.id == id) {
        found := true;
        let newDownvotes = blow.downvotes + 1;
        let newVisibility = Nat.max(blow.visibility - 3, 5); // Decrease visibility by 3, min 5
        { blow with downvotes = newDownvotes; visibility = newVisibility }
      } else blow
    });
    return found;
  };

  public shared({caller}) func set_trust_score(id : BlowId, score : Nat) : async Bool {
    var found = false;
    blows := Array.map<Blow, Blow>(blows, func (blow) {
      if (blow.id == id) {
        found := true;
        { blow with trustScore = ?score }
      } else blow
    });
    return found;
  };

  // Simple tag generation (no LLM for now)
  public shared func generate_tags_llm(description : Text) : async [Text] {
    ["whistleblowing", "report", "anonymous"];
  };

  // Simple trust scoring (no LLM for now)
  public shared func trust_score_llm(description : Text, tags : [Text]) : async Nat {
    if (Text.size(description) > 100) {
      75;
    } else if (Text.size(description) > 50) {
      60;
    } else {
      40;
    };
  };
}
