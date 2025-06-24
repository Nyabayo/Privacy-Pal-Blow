import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { TrendingUp, Flag, ArrowUp, Search, Filter, Eye, AlertTriangle, ThumbsUp, ThumbsDown } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { blowStorage } from "@/lib/actors";
import { Actor, HttpAgent } from "@dfinity/agent";
import { idlFactory as backendIdl, canisterId as backendCanisterId } from "declarations/backend";

interface Blow {
  id: string;
  title: string;
  preview: string;
  tags: string[];
  trustScore: number;
  uplifts: number;
  flags: number;
  category: "education" | "corruption" | "environment" | "healthcare" | "general";
  urgency: "low" | "medium" | "high";
  verified: boolean;
  timeAgo: string;
}

interface BlowStorageBlow {
  id: bigint;
  description: string;
  files: Array<{
    contentType: string;
    data: Uint8Array;
    name: string;
  }>;
  tags: string[];
  timestamp: bigint;
  trustScore?: bigint;
  upvotes: bigint;
  downvotes: bigint;
  visibility: bigint;
  flagged: boolean;
}

const mockBlows: Blow[] = [
  {
    id: "1",
    title: "School funds misappropriation in Nairobi County",
    preview: "Evidence of systematic diversion of school lunch program funds affecting over 2,000 students across 15 schools...",
    tags: ["education", "corruption", "nairobi"],
    trustScore: 87,
    uplifts: 156,
    flags: 3,
    category: "education",
    urgency: "high",
    verified: true,
    timeAgo: "2 hours ago"
  },
  {
    id: "2", 
    title: "Illegal dumping of medical waste near residential area",
    preview: "Private hospital disposing hazardous materials in Kibera slums, exposing families to serious health risks...",
    tags: ["healthcare", "environment", "kibera"],
    trustScore: 92,
    uplifts: 234,
    flags: 1,
    category: "healthcare",
    urgency: "high",
    verified: true,
    timeAgo: "4 hours ago"
  },
  {
    id: "3",
    title: "Police harassment at checkpoint",
    preview: "Systematic extortion of matatu drivers along Thika Road, with recorded evidence of illegal fee collection...",
    tags: ["police", "corruption", "transport"],
    trustScore: 74,
    uplifts: 89,
    flags: 7,
    category: "general",
    urgency: "medium",
    verified: false,
    timeAgo: "6 hours ago"
  },
  {
    id: "4",
    title: "Water shortage crisis in Machakos",
    preview: "Community borehole project funds diverted while residents travel 10km daily for clean water access...",
    tags: ["infrastructure", "corruption", "machakos"],
    trustScore: 91,
    uplifts: 301,
    flags: 2,
    category: "environment",
    urgency: "high",
    verified: true,
    timeAgo: "8 hours ago"
  }
];

const host = process.env.DFX_NETWORK === "ic"
  ? "https://icp-api.io"
  : "http://localhost:8000";

const agent = new HttpAgent({ host });

if (process.env.DFX_NETWORK !== "ic") {
  agent.fetchRootKey().catch(err => {
    console.warn("Unable to fetch root key. Check to ensure that your local replica is running");
    console.error(err);
  });
}

export const blowStorageActor = Actor.createActor(backendIdl, {
  agent,
  canisterId: backendCanisterId,
});

const Pulse = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [filterBy, setFilterBy] = useState("all");
  const [selectedBlow, setSelectedBlow] = useState<Blow | null>(null);
  const [blows, setBlows] = useState<BlowStorageBlow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlows = async () => {
      try {
        const result = await blowStorage.get_blows();
        setBlows(result as BlowStorageBlow[]);
      } catch (e) {
        console.error("Error fetching blows:", e);
        setBlows([]);
      }
      setLoading(false);
    };
    fetchBlows();
  }, []);

  const handleUpvote = async (blowId: bigint) => {
    try {
      await blowStorage.upvote_blow(blowId);
      // Refresh the blows list
      const result = await blowStorage.get_blows();
      setBlows(result as BlowStorageBlow[]);
    } catch (e) {
      console.error("Error upvoting:", e);
    }
  };

  const handleDownvote = async (blowId: bigint) => {
    try {
      await blowStorage.downvote_blow(blowId);
      // Refresh the blows list
      const result = await blowStorage.get_blows();
      setBlows(result as BlowStorageBlow[]);
    } catch (e) {
      console.error("Error downvoting:", e);
    }
  };

  const filteredBlows = mockBlows.filter(blow => {
    const matchesSearch = blow.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blow.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    if (filterBy === "verified") return matchesSearch && blow.verified;
    if (filterBy === "high-urgency") return matchesSearch && blow.urgency === "high";
    return matchesSearch;
  });

  const sortedBlows = [...filteredBlows].sort((a, b) => {
    switch (sortBy) {
      case "uplifts":
        return b.uplifts - a.uplifts;
      case "trust-score":
        return b.trustScore - a.trustScore;
      default:
        return 0; // newest (already in chronological order)
    }
  });

  const getCategoryColor = (category: string) => {
    const colors = {
      education: "bg-blue-100 text-blue-800",
      corruption: "bg-red-100 text-red-800", 
      environment: "bg-green-100 text-green-800",
      healthcare: "bg-purple-100 text-purple-800",
      general: "bg-gray-100 text-gray-800"
    };
    return colors[category as keyof typeof colors] || colors.general;
  };

  const getUrgencyColor = (urgency: string) => {
    const colors = {
      low: "bg-gray-100 text-gray-700",
      medium: "bg-yellow-100 text-yellow-700",
      high: "bg-red-100 text-red-700"
    };
    return colors[urgency as keyof typeof colors];
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
              <TrendingUp className="h-10 w-10 text-orange-500" />
              The Pulse
            </h1>
            <p className="text-lg text-gray-600">
              Real-time feed of anonymous whistleblowing reports
            </p>
          </div>

          {/* Controls */}
          <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search blows by keywords or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="uplifts">Most Uplifted</SelectItem>
                  <SelectItem value="trust-score">Highest Trust Score</SelectItem>
                </SelectContent>
              </Select>

              {/* Filter */}
              <Select value={filterBy} onValueChange={setFilterBy}>
                <SelectTrigger className="w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Blows</SelectItem>
                  <SelectItem value="verified">Verified Only</SelectItem>
                  <SelectItem value="high-urgency">High Urgency</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Blows Grid */}
          {loading ? (
            <div className="text-center py-12">Loading...</div>
          ) : blows.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">No blows found.</p>
              <p className="text-sm text-gray-500">Submit a blow to see it appear here!</p>
            </div>
          ) : (
            <div className="grid lg:grid-cols-2 gap-6">
              {blows.map((blow, idx) => (
                <Card key={blow.id.toString() || idx} className={`mb-4 ${blow.flagged ? 'border-red-200 bg-red-50' : ''}`}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="flex-1">
                        {blow.description.slice(0, 60)}...
                      </CardTitle>
                      {blow.flagged && (
                        <AlertTriangle className="h-5 w-5 text-red-500" title="Flagged content" />
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-2">
                      <strong>Tags:</strong>{" "}
                      {blow.tags.map((tag: string, i: number) => (
                        <Badge key={i} className="mr-1">#{tag}</Badge>
                      ))}
                    </div>
                    <div className="mb-2">
                      <strong>Files:</strong> {blow.files.length}
                    </div>
                    <div className="mb-2">
                      <strong>Trust Score:</strong> {blow.trustScore ? Number(blow.trustScore) : "N/A"}
                    </div>
                    <div className="mb-2">
                      <strong>Visibility:</strong> {blow.visibility ? Number(blow.visibility) : 0}%
                    </div>
                    <div className="mb-2">
                      <strong>Timestamp:</strong>{" "}
                      {new Date(Number(blow.timestamp) / 1_000_000).toLocaleString()}
                    </div>
                    
                    {/* Voting Section */}
                    <div className="flex items-center gap-4 mt-4 pt-4 border-t">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleUpvote(blow.id)}
                          className="flex items-center gap-1"
                        >
                          <ThumbsUp className="h-4 w-4" />
                          {blow.upvotes ? Number(blow.upvotes) : 0}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDownvote(blow.id)}
                          className="flex items-center gap-1"
                        >
                          <ThumbsDown className="h-4 w-4" />
                          {blow.downvotes ? Number(blow.downvotes) : 0}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Pulse;
