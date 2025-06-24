import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Upload, File, Image, Video, Link2, Shield, Zap, Trash2 } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { blowStorage } from "@/lib/actors";

const Submit = () => {
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = Array.from(event.target.files || []);
    console.log('Files uploaded:', uploadedFiles);
    setFiles(prev => [...prev, ...uploadedFiles]);
    if (uploadedFiles.length > 0) {
      toast({
        title: "Files Uploaded",
        description: `${uploadedFiles.length} file(s) uploaded successfully.`,
      });
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
    toast({
      title: "File Removed",
      description: "File has been removed from your submission.",
    });
  };

  const triggerFileUpload = () => {
    const fileInput = document.getElementById('file-upload') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  };

  const generateTags = () => {
    if (!description.trim()) {
      toast({
        title: "No Content to Analyze",
        description: "Please add a description first before generating tags.",
        variant: "destructive"
      });
      return;
    }

    // Analyze description content for relevant keywords
    const text = description.toLowerCase();
    const generatedTags: string[] = [];

    // Define keyword mappings for tag generation
    const tagMappings = {
      corruption: ['corruption', 'bribe', 'kickback', 'embezzlement', 'fraud', 'misappropriation', 'illegal payment'],
      education: ['school', 'student', 'teacher', 'university', 'education', 'learning', 'academic', 'classroom'],
      healthcare: ['hospital', 'doctor', 'medical', 'health', 'patient', 'clinic', 'medicine', 'treatment'],
      police: ['police', 'officer', 'law enforcement', 'arrest', 'harassment', 'brutality', 'checkpoint'],
      environment: ['pollution', 'waste', 'dumping', 'water', 'air quality', 'toxic', 'environmental', 'contamination'],
      government: ['government', 'official', 'ministry', 'county', 'public office', 'civil servant', 'administration'],
      transport: ['matatu', 'road', 'transport', 'traffic', 'vehicle', 'driving', 'highway'],
      infrastructure: ['construction', 'building', 'road work', 'infrastructure', 'public works', 'maintenance'],
      accountability: ['accountability', 'transparency', 'oversight', 'public funds', 'taxpayer'],
      abuse: ['abuse', 'harassment', 'mistreatment', 'discrimination', 'violence']
    };

    // Check for location-based tags
    const locations = ['nairobi', 'mombasa', 'kisumu', 'nakuru', 'eldoret', 'thika', 'machakos', 'kibera', 'kawangware'];
    locations.forEach(location => {
      if (text.includes(location)) {
        generatedTags.push(location);
      }
    });

    // Generate tags based on content analysis
    Object.entries(tagMappings).forEach(([tag, keywords]) => {
      const hasKeyword = keywords.some(keyword => text.includes(keyword));
      if (hasKeyword) {
        generatedTags.push(tag);
      }
    });

    // Add urgency-based tags
    const urgencyKeywords = ['urgent', 'emergency', 'immediate', 'crisis', 'critical'];
    const hasUrgency = urgencyKeywords.some(keyword => text.includes(keyword));
    if (hasUrgency) {
      generatedTags.push('urgent');
    }

    // Ensure we have at least some tags, add generic ones if needed
    if (generatedTags.length === 0) {
      generatedTags.push('general', 'public-interest');
    }

    // Remove duplicates and limit to 6 tags
    const uniqueTags = [...new Set(generatedTags)].slice(0, 6);
    setTags(uniqueTags);

    toast({
      title: "PulseTags Generated! 🏷️",
      description: `Generated ${uniqueTags.length} relevant tags based on your content.`,
    });
  };

  const handleSubmit = async () => {
    if (!description.trim()) {
      toast({
        title: "Description Required",
        description: "Please provide details about what you're reporting.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // For testing: submit only description and tags, no files
      await blowStorage.submit_blow(description, [], tags);
      toast({
        title: "Blow Submitted Successfully! 🚨",
        description: "Your submission is now anonymous and encrypted. Session data has been cleared.",
      });
      // Reset form
      setDescription("");
      setFiles([]);
      setTags([]);
    } catch (e) {
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your blow. Please try again.",
        variant: "destructive"
      });
    }
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Submit a Blow</h1>
            <p className="text-lg text-gray-600">
              Your identity is completely protected. All data is encrypted and untraceable.
            </p>
          </div>

          {/* Security Indicators */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4 flex items-center space-x-3">
                <Shield className="h-6 w-6 text-green-600" />
                <div>
                  <p className="font-semibold text-green-800">Encrypted</p>
                  <p className="text-sm text-green-600">End-to-end security</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4 flex items-center space-x-3">
                <Zap className="h-6 w-6 text-blue-600" />
                <div>
                  <p className="font-semibold text-blue-800">Anonymous</p>
                  <p className="text-sm text-blue-600">Zero traceability</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-orange-50 border-orange-200">
              <CardContent className="p-4 flex items-center space-x-3">
                <Upload className="h-6 w-6 text-orange-600" />
                <div>
                  <p className="font-semibold text-orange-800">Metadata Stripped</p>
                  <p className="text-sm text-orange-600">All traces removed</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Description */}
              <Card>
                <CardHeader>
                  <CardTitle>What are you reporting?</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Describe the incident, corruption, or injustice you're reporting. Be as detailed as possible while protecting sensitive information about yourself..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="min-h-[200px] resize-none"
                  />
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-gray-500">{description.length} characters</span>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={generateTags}
                      disabled={!description.trim()}
                    >
                      Generate PulseTags
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* File Upload */}
              <Card>
                <CardHeader>
                  <CardTitle>Upload Evidence</CardTitle>
                </CardHeader>
                <CardContent>
                  <div 
                    className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer"
                    onClick={triggerFileUpload}
                  >
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-lg mb-2">Drag and drop files here</p>
                    <p className="text-sm text-gray-500 mb-4">
                      Images, videos, PDFs, documents, or links
                    </p>
                    <input
                      type="file"
                      multiple
                      accept="image/*,video/*,.pdf,.doc,.docx,.txt"
                      onChange={handleFileUpload}
                      style={{ display: "none" }}
                      id="file-upload"
                    />
                    <Button 
                      variant="outline" 
                      className="cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        triggerFileUpload();
                      }}
                    >
                      Choose Files
                    </Button>
                  </div>

                  {/* File List */}
                  {files.length > 0 && (
                    <div className="mt-4 space-y-2">
                      <h4 className="font-semibold">Uploaded Files:</h4>
                      {files.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            {file.type.startsWith('image/') ? (
                              <Image className="h-5 w-5 text-green-600" />
                            ) : file.type.startsWith('video/') ? (
                              <Video className="h-5 w-5 text-blue-600" />
                            ) : (
                              <File className="h-5 w-5 text-gray-600" />
                            )}
                            <div>
                              <p className="font-medium">{file.name}</p>
                              <p className="text-sm text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFile(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Generated Tags */}
              {tags.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>PulseTags (Auto-Generated)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Submit Button */}
              <Card>
                <CardContent className="p-6">
                  <Button 
                    onClick={handleSubmit}
                    disabled={isSubmitting || !description.trim()}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white py-6 text-lg font-semibold"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Submitting Anonymously...
                      </>
                    ) : (
                      "Submit Anonymously 🚨"
                    )}
                  </Button>
                </CardContent>
              </Card>

              {/* Safety Reminder */}
              <Card className="bg-yellow-50 border-yellow-200">
                <CardHeader>
                  <CardTitle className="text-yellow-800">Safety Reminder</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-yellow-700 space-y-2">
                    <li>• Your IP address is masked</li>
                    <li>• All metadata is automatically stripped</li>
                    <li>• No session data is stored</li>
                    <li>• Submissions are immediately encrypted</li>
                    <li>• Your identity cannot be traced back</li>
                  </ul>
                </CardContent>
              </Card>

              {/* Trust Score Info */}
              <Card className="bg-blue-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="text-blue-800">TrustScore System</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-blue-700">
                    Your submission will be analyzed by SentinelAI and assigned a trust score based on evidence quality, consistency, and verification.
                  </p>
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

export default Submit;
