
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { MessageCircle, Users, Shield, Clock, Send, Plus, Hash } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

interface CausePod {
  id: string;
  name: string;
  description: string;
  activeMembers: number;
  tags: string[];
  lastActivity: string;
  isJoined: boolean;
}

interface Message {
  id: string;
  content: string;
  timestamp: string;
  anonymousId: string;
}

const mockPods: CausePod[] = [
  {
    id: "1",
    name: "Education Reform Kenya",
    description: "Discussing corruption in education sector, school funding issues, and teacher welfare across Kenya.",
    activeMembers: 47,
    tags: ["education", "corruption", "teachers"],
    lastActivity: "5 minutes ago",
    isJoined: false
  },
  {
    id: "2",
    name: "Healthcare Whistleblowers",
    description: "Safe space for healthcare workers to report malpractice, drug shortages, and patient safety issues.",
    activeMembers: 32,
    tags: ["healthcare", "safety", "drugs"],
    lastActivity: "12 minutes ago",
    isJoined: true
  },
  {
    id: "3",
    name: "Police Accountability",
    description: "Reporting police misconduct, extortion, and advocating for law enforcement transparency.",
    activeMembers: 89,
    tags: ["police", "accountability", "rights"],
    lastActivity: "3 minutes ago",
    isJoined: false
  },
  {
    id: "4",
    name: "Environmental Justice",
    description: "Exposing illegal dumping, deforestation, and environmental crimes affecting our communities.",
    activeMembers: 56,
    tags: ["environment", "pollution", "climate"],
    lastActivity: "1 hour ago",
    isJoined: false
  }
];

const mockMessages: Message[] = [
  {
    id: "1",
    content: "Just witnessed another case of drug shortage at Kenyatta Hospital. Patients being told to buy expensive alternatives outside.",
    timestamp: "2 mins ago",
    anonymousId: "User#k4x9"
  },
  {
    id: "2", 
    content: "Similar situation in Mombasa. The procurement system seems deliberately flawed to benefit certain suppliers.",
    timestamp: "5 mins ago",
    anonymousId: "User#m2p7"
  },
  {
    id: "3",
    content: "I have documents showing inflated drug prices. How can we safely share this evidence?",
    timestamp: "8 mins ago",
    anonymousId: "User#r8q3"
  }
];

const CausePods = () => {
  const [selectedPod, setSelectedPod] = useState<CausePod | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPods = mockPods.filter(pod =>
    pod.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pod.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const joinPod = (podId: string) => {
    // In real app, this would update backend state
    console.log(`Joining pod ${podId}`);
  };

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    
    // In real app, this would send to backend
    console.log("Sending message:", newMessage);
    setNewMessage("");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
              <MessageCircle className="h-10 w-10 text-blue-500" />
              CausePods
            </h1>
            <p className="text-lg text-gray-600">
              Anonymous community discussions organized by cause. Join conversations, share insights, stay protected.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Pod List */}
            <div className="lg:col-span-1 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Find Your Cause</CardTitle>
                </CardHeader>
                <CardContent>
                  <Input
                    placeholder="Search pods by name or tags..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="mb-4"
                  />
                  <Button className="w-full bg-blue-500 hover:bg-blue-600">
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Pod
                  </Button>
                </CardContent>
              </Card>

              <div className="space-y-3">
                {filteredPods.map((pod) => (
                  <Card 
                    key={pod.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedPod?.id === pod.id ? 'ring-2 ring-blue-500' : ''
                    }`}
                    onClick={() => setSelectedPod(pod)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-gray-900 text-sm">{pod.name}</h3>
                        {pod.isJoined && (
                          <Badge className="bg-green-100 text-green-800 text-xs">
                            Joined
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                        {pod.description}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {pod.activeMembers}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {pod.lastActivity}
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {pod.tags.slice(0, 2).map((tag, index) => (
                          <span 
                            key={index}
                            className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            <div className="lg:col-span-2">
              {selectedPod ? (
                <Card className="h-[600px] flex flex-col">
                  {/* Pod Header */}
                  <CardHeader className="pb-3 border-b">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-xl">{selectedPod.name}</CardTitle>
                        <p className="text-sm text-gray-600 mt-1">{selectedPod.description}</p>
                      </div>
                      {!selectedPod.isJoined && (
                        <Button 
                          onClick={() => joinPod(selectedPod.id)}
                          className="bg-blue-500 hover:bg-blue-600"
                        >
                          Join Pod
                        </Button>
                      )}
                    </div>
                    
                    {/* Security Indicator */}
                    <div className="flex items-center gap-4 mt-3 text-sm">
                      <div className="flex items-center gap-1 text-green-600">
                        <Shield className="h-4 w-4" />
                        End-to-end encrypted
                      </div>
                      <div className="flex items-center gap-1 text-blue-600">
                        <Users className="h-4 w-4" />
                        {selectedPod.activeMembers} anonymous members
                      </div>
                    </div>
                  </CardHeader>

                  {/* Messages */}
                  <CardContent className="flex-1 overflow-y-auto p-4">
                    <div className="space-y-4">
                      {mockMessages.map((message) => (
                        <div key={message.id} className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-blue-600">
                              {message.anonymousId}
                            </span>
                            <span className="text-xs text-gray-500">
                              {message.timestamp}
                            </span>
                          </div>
                          <p className="text-sm text-gray-700">
                            {message.content}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>

                  {/* Message Input */}
                  {selectedPod.isJoined && (
                    <div className="p-4 border-t">
                      <div className="flex gap-2">
                        <Input
                          placeholder="Share your insights anonymously..."
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                          className="flex-1"
                        />
                        <Button onClick={sendMessage} disabled={!newMessage.trim()}>
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        Your message will be anonymous and encrypted. Session: User#7gxh48
                      </p>
                    </div>
                  )}
                </Card>
              ) : (
                <Card className="h-[600px] flex items-center justify-center">
                  <div className="text-center">
                    <Hash className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">
                      Select a CausePod
                    </h3>
                    <p className="text-gray-500">
                      Choose a community from the list to join anonymous discussions
                    </p>
                  </div>
                </Card>
              )}
            </div>
          </div>

          {/* Safety Notice */}
          <Card className="mt-6 bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-blue-800 mb-1">Your Safety in CausePods</h4>
                  <p className="text-sm text-blue-700">
                    All conversations are end-to-end encrypted. No member lists or real identities are stored. 
                    Messages are ephemeral and moderated by our decentralized DAO system.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CausePods;
