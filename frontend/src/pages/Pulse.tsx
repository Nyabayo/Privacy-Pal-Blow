
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { TrendingUp, Flag, ArrowUp, Search, Filter, Eye, AlertTriangle } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

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

const Pulse = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [filterBy, setFilterBy] = useState("all");
  const [selectedBlow, setSelectedBlow] = useState<Blow | null>(null);

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
              Real-time feed of verified whistleblowing reports from across Kenya
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
          <div className="grid lg:grid-cols-2 gap-6">
            {sortedBlows.map((blow) => (
              <Card 
                key={blow.id} 
                className="hover:shadow-lg transition-all duration-300 cursor-pointer border-l-4 border-l-orange-500"
                onClick={() => setSelectedBlow(blow)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                        {blow.title}
                      </h3>
                      <div className="flex items-center gap-2 mb-3">
                        <Badge className={getCategoryColor(blow.category)}>
                          {blow.category}
                        </Badge>
                        <Badge className={getUrgencyColor(blow.urgency)}>
                          {blow.urgency} priority
                        </Badge>
                        {blow.verified && (
                          <Badge className="bg-green-100 text-green-800">
                            ✓ Verified
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-blue-600 mb-1">
                        Trust: {blow.trustScore}%
                      </div>
                      <div className="text-xs text-gray-500">
                        {blow.timeAgo}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {blow.preview}
                  </p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {blow.tags.map((tag, index) => (
                      <span 
                        key={index}
                        className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-700">
                        <ArrowUp className="h-4 w-4 mr-1" />
                        {blow.uplifts}
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                        <Flag className="h-4 w-4 mr-1" />
                        {blow.flags}
                      </Button>
                    </div>
                    <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                      <Eye className="h-4 w-4 mr-1" />
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* No results */}
          {sortedBlows.length === 0 && (
            <div className="text-center py-12">
              <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No blows found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Pulse;
