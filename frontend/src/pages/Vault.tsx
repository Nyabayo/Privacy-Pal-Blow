
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bookmark, Trash2, Eye, Download, AlertTriangle, Lock } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

interface SavedBlow {
  id: string;
  title: string;
  preview: string;
  tags: string[];
  savedAt: string;
  category: string;
  trustScore: number;
}

const mockSavedBlows: SavedBlow[] = [
  {
    id: "1",
    title: "School funds misappropriation in Nairobi County",
    preview: "Evidence of systematic diversion of school lunch program funds affecting over 2,000 students...",
    tags: ["education", "corruption", "nairobi"],
    savedAt: "2 days ago",
    category: "education",
    trustScore: 87
  },
  {
    id: "2",
    title: "Illegal dumping of medical waste near residential area", 
    preview: "Private hospital disposing hazardous materials in Kibera slums, exposing families to health risks...",
    tags: ["healthcare", "environment", "kibera"],
    savedAt: "1 week ago",
    category: "healthcare", 
    trustScore: 92
  },
  {
    id: "3",
    title: "Water shortage crisis in Machakos",
    preview: "Community borehole project funds diverted while residents travel 10km daily for clean water...",
    tags: ["infrastructure", "corruption", "machakos"],
    savedAt: "3 days ago",
    category: "environment",
    trustScore: 91
  }
];

const Vault = () => {
  const [savedBlows, setSavedBlows] = useState(mockSavedBlows);
  const [selectedBlow, setSelectedBlow] = useState<SavedBlow | null>(null);

  const removeBlow = (id: string) => {
    setSavedBlows(prev => prev.filter(blow => blow.id !== id));
    if (selectedBlow?.id === id) {
      setSelectedBlow(null);
    }
  };

  const exportData = () => {
    const data = JSON.stringify(savedBlows, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'privacy-pal-vault.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

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

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
              <Bookmark className="h-10 w-10 text-orange-500" />
              Your Vault
            </h1>
            <p className="text-lg text-gray-600">
              Privately bookmarked blows saved locally in your browser. No cloud storage, complete privacy.
            </p>
          </div>

          {/* Privacy Notice */}
          <Card className="mb-6 bg-green-50 border-green-200">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Lock className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-green-800 mb-1">Local Storage Only</h4>
                  <p className="text-sm text-green-700">
                    Your vault is stored exclusively in your browser's local storage. 
                    No data is sent to our servers. Clear your browser data to permanently delete everything.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Saved Blows List */}
            <div className="lg:col-span-2">
              {savedBlows.length > 0 ? (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-900">
                      Saved Blows ({savedBlows.length})
                    </h2>
                    <Button onClick={exportData} variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export Data
                    </Button>
                  </div>

                  {savedBlows.map((blow) => (
                    <Card 
                      key={blow.id}
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        selectedBlow?.id === blow.id ? 'ring-2 ring-orange-500' : ''
                      }`}
                      onClick={() => setSelectedBlow(blow)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                              {blow.title}
                            </h3>
                            <div className="flex items-center gap-2 mb-2">
                              <Badge className={getCategoryColor(blow.category)}>
                                {blow.category}
                              </Badge>
                              <span className="text-sm text-blue-600 font-medium">
                                Trust: {blow.trustScore}%
                              </span>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeBlow(blow.id);
                            }}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        <p className="text-gray-600 mb-3 line-clamp-2 text-sm">
                          {blow.preview}
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap gap-1">
                            {blow.tags.slice(0, 3).map((tag, index) => (
                              <span 
                                key={index}
                                className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                          <span className="text-xs text-gray-500">
                            Saved {blow.savedAt}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="p-12">
                  <div className="text-center">
                    <Bookmark className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">
                      No Saved Blows Yet
                    </h3>
                    <p className="text-gray-500 mb-4">
                      Start bookmarking important revelations to access them privately later.
                    </p>
                    <Button className="bg-orange-500 hover:bg-orange-600">
                      Browse The Pulse
                    </Button>
                  </div>
                </Card>
              )}
            </div>

            {/* Details Panel */}
            <div className="lg:col-span-1">
              {selectedBlow ? (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Blow Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">
                        {selectedBlow.title}
                      </h4>
                      <div className="flex items-center gap-2 mb-3">
                        <Badge className={getCategoryColor(selectedBlow.category)}>
                          {selectedBlow.category}
                        </Badge>
                        <span className="text-sm text-blue-600 font-medium">
                          {selectedBlow.trustScore}% Trust
                        </span>
                      </div>
                    </div>

                    <div>
                      <h5 className="font-medium text-gray-700 mb-2">Preview</h5>
                      <p className="text-sm text-gray-600">
                        {selectedBlow.preview}
                      </p>
                    </div>

                    <div>
                      <h5 className="font-medium text-gray-700 mb-2">Tags</h5>
                      <div className="flex flex-wrap gap-1">
                        {selectedBlow.tags.map((tag, index) => (
                          <span 
                            key={index}
                            className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <Button 
                        className="w-full mb-2"
                        onClick={() => {/* Navigate to full blow view */}}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Full Blow
                      </Button>
                      <Button 
                        variant="outline"
                        className="w-full text-red-600 hover:text-red-700"
                        onClick={() => removeBlow(selectedBlow.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Remove from Vault
                      </Button>
                    </div>

                    <div className="text-xs text-gray-500 pt-2 border-t">
                      Saved {selectedBlow.savedAt}
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="p-8 text-center">
                    <Eye className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <h4 className="font-semibold text-gray-600 mb-2">
                      Select a Blow
                    </h4>
                    <p className="text-sm text-gray-500">
                      Click on any saved blow to view its details
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Storage Info */}
              <Card className="mt-4 bg-yellow-50 border-yellow-200">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h5 className="font-semibold text-yellow-800 mb-1">Storage Warning</h5>
                      <p className="text-xs text-yellow-700">
                        Your vault data is stored locally. Clearing browser data, 
                        uninstalling your browser, or device failure will permanently delete all saved blows.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Vault;
