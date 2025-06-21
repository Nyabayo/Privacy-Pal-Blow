
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Zap, Users, Eye, Lock, CheckCircle, AlertTriangle, Cpu } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const About = () => {
  const securityFeatures = [
    {
      icon: Shield,
      title: "Zero-Knowledge Architecture",
      description: "No user accounts, no login credentials, no personal data collection. Your identity remains completely unknown to us."
    },
    {
      icon: Lock,
      title: "End-to-End Encryption",
      description: "All submissions and communications are encrypted using military-grade encryption before leaving your device."
    },
    {
      icon: Eye,
      title: "Metadata Stripping",
      description: "All files are automatically cleaned of metadata, EXIF data, and digital fingerprints that could identify you."
    },
    {
      icon: Zap,
      title: "Ephemeral Sessions",
      description: "Temporary session IDs that refresh automatically. No persistent tracking or session storage."
    }
  ];

  const competitors = [
    {
      feature: "Anonymous Submissions",
      privacyPal: true,
      traditional: false,
      socialMedia: false
    },
    {
      feature: "No User Accounts",
      privacyPal: true,
      traditional: false,
      socialMedia: false
    },
    {
      feature: "AI-Powered Verification",
      privacyPal: true,
      traditional: false,
      socialMedia: false
    },
    {
      feature: "Community Moderation",
      privacyPal: true,
      traditional: true,
      socialMedia: true
    },
    {
      feature: "Local Data Storage",
      privacyPal: true,
      traditional: false,
      socialMedia: false
    },
    {
      feature: "Decentralized Governance",
      privacyPal: true,
      traditional: false,
      socialMedia: false
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About Privacy Pal
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Kenya's first AI-powered decentralized whistleblowing platform designed for 
              complete anonymity, community-driven truth verification, and unstoppable accountability.
            </p>
          </div>

          {/* Mission Statement */}
          <Card className="mb-8 bg-gradient-to-r from-blue-50 to-orange-50 border-none">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">Our Mission</h2>
              <p className="text-lg text-gray-700 text-center leading-relaxed">
                To create a safe, secure, and anonymous platform where Kenyan citizens can expose corruption, 
                report injustice, and spark meaningful change without fear of retaliation or persecution.
              </p>
            </CardContent>
          </Card>

          {/* Security Features */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
              How We Protect You
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {securityFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card key={index} className="border-l-4 border-l-blue-500">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="bg-blue-100 p-3 rounded-full">
                          <Icon className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {feature.title}
                          </h3>
                          <p className="text-gray-600">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* SentinelAI Explanation */}
          <Card className="mb-12 bg-purple-50 border-purple-200">
            <CardHeader>
              <CardTitle className="text-2xl text-center flex items-center justify-center gap-3">
                <Cpu className="h-8 w-8 text-purple-600" />
                How SentinelAI Works
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold text-purple-800 mb-3">Automated Verification</h4>
                  <ul className="space-y-2 text-purple-700">
                    <li>• Analyzes evidence authenticity using advanced AI</li>
                    <li>• Cross-references claims with public databases</li>
                    <li>• Detects deepfakes and manipulated content</li>
                    <li>• Assigns trust scores based on evidence quality</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-purple-800 mb-3">Community Protection</h4>
                  <ul className="space-y-2 text-purple-700">
                    <li>• Filters spam and malicious content automatically</li>
                    <li>• Escalates high-impact revelations to DAO review</li>
                    <li>• Maintains community guidelines enforcement</li>
                    <li>• Preserves anonymity during moderation process</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Privacy Guarantees */}
          <Card className="mb-12 bg-green-50 border-green-200">
            <CardHeader>
              <CardTitle className="text-2xl text-center text-green-800">
                Our Privacy Guarantees
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl font-bold text-green-600">0</span>
                  </div>
                  <h4 className="font-semibold text-green-800 mb-2">Zero Logs</h4>
                  <p className="text-sm text-green-700">No server logs, no access logs, no activity tracking</p>
                </div>
                <div className="text-center">
                  <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl font-bold text-green-600">0</span>
                  </div>
                  <h4 className="font-semibold text-green-800 mb-2">Zero Cookies</h4>
                  <p className="text-sm text-green-700">No tracking cookies, no analytics, no behavioral data</p>
                </div>
                <div className="text-center">
                  <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl font-bold text-green-600">0</span>
                  </div>
                  <h4 className="font-semibold text-green-800 mb-2">Zero Accounts</h4>
                  <p className="text-sm text-green-700">No user registration, no profiles, no personal data</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Comparison Table */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="text-2xl text-center">
                Privacy Pal vs Traditional Platforms
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2">
                      <th className="text-left py-3 px-4">Feature</th>
                      <th className="text-center py-3 px-4 text-orange-600 font-bold">Privacy Pal</th>
                      <th className="text-center py-3 px-4">Traditional Whistleblowing</th>
                      <th className="text-center py-3 px-4">Social Media</th>
                    </tr>
                  </thead>
                  <tbody>
                    {competitors.map((row, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-3 px-4 font-medium">{row.feature}</td>
                        <td className="text-center py-3 px-4">
                          {row.privacyPal ? (
                            <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                          ) : (
                            <span className="text-gray-300">—</span>
                          )}
                        </td>
                        <td className="text-center py-3 px-4">
                          {row.traditional ? (
                            <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                          ) : (
                            <span className="text-gray-300">—</span>
                          )}
                        </td>
                        <td className="text-center py-3 px-4">
                          {row.socialMedia ? (
                            <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                          ) : (
                            <span className="text-gray-300">—</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Target Audience */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="border-l-4 border-l-blue-500">
              <CardContent className="p-6">
                <Users className="h-8 w-8 text-blue-500 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Teachers & Educators</h3>
                <p className="text-gray-600 text-sm">
                  Report school corruption, fund misuse, and administrative misconduct without career risks.
                </p>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-orange-500">
              <CardContent className="p-6">
                <Shield className="h-8 w-8 text-orange-500 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Activists & Journalists</h3>
                <p className="text-gray-600 text-sm">
                  Expose human rights violations and corruption while maintaining source protection.
                </p>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-green-500">
              <CardContent className="p-6">
                <Eye className="h-8 w-8 text-green-500 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Civil Servants</h3>
                <p className="text-gray-600 text-sm">
                  Report internal corruption and unethical practices without compromising job security.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Final CTA */}
          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white border-none">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Ready to Make a Difference?</h3>
              <p className="text-lg mb-6 opacity-90">
                Join thousands of anonymous truth-tellers working to build a more transparent Kenya.
              </p>
              <Badge className="bg-white text-orange-600 text-lg px-4 py-2">
                Zero trace. Full truth. Real impact.
              </Badge>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;
