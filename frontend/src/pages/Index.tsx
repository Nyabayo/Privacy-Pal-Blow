import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Eye, Users, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Truth Without <span className="text-orange-400">Traces</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 leading-relaxed">
              Kenya's first AI-powered anonymous whistleblowing platform. 
              Expose corruption, report injustice, spark change—all while staying completely invisible.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/submit">
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 transform hover:scale-105">
                  Submit a Blow 🚨
                </Button>
              </Link>
              <Link to="/pulse">
                <Button variant="outline" size="lg" className="border-2 border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 text-lg rounded-full transition-all duration-300">
                  View The Pulse
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Why Whistleblowers Need Anonymity
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              In Kenya, speaking truth to power often comes with devastating consequences. 
              Teachers who report corruption face job loss. Activists face intimidation. 
              Civil servants face career destruction. Privacy Pal changes this.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="p-6 border-l-4 border-l-orange-500">
                <CardContent className="p-0">
                  <Users className="h-12 w-12 text-orange-500 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">For Teachers</h3>
                  <p className="text-gray-600">Report school fund misuse, corrupt administrators, and unsafe learning environments without fear.</p>
                </CardContent>
              </Card>
              <Card className="p-6 border-l-4 border-l-blue-500">
                <CardContent className="p-0">
                  <Shield className="h-12 w-12 text-blue-500 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">For Activists</h3>
                  <p className="text-gray-600">Expose human rights violations and systemic injustices while protecting your identity and safety.</p>
                </CardContent>
              </Card>
              <Card className="p-6 border-l-4 border-l-green-500">
                <CardContent className="p-0">
                  <Eye className="h-12 w-12 text-green-500 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">For Civil Servants</h3>
                  <p className="text-gray-600">Report internal corruption, misuse of public funds, and unethical practices anonymously.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
              How Privacy Pal Works
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-blue-900 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">1</div>
                <h3 className="text-lg font-semibold mb-2">Submit Anonymously</h3>
                <p className="text-gray-600">Upload evidence with zero traceability. No accounts, no logs, no digital fingerprints.</p>
              </div>
              <div className="text-center">
                <div className="bg-orange-500 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">2</div>
                <h3 className="text-lg font-semibold mb-2">AI Verification</h3>
                <p className="text-gray-600">SentinelAI analyzes submissions for authenticity and assigns trust scores automatically.</p>
              </div>
              <div className="text-center">
                <div className="bg-green-500 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">3</div>
                <h3 className="text-lg font-semibold mb-2">Community Review</h3>
                <p className="text-gray-600">Anonymous community members vote to verify, flag, or escalate important revelations.</p>
              </div>
              <div className="text-center">
                <div className="bg-purple-500 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">4</div>
                <h3 className="text-lg font-semibold mb-2">Amplify Truth</h3>
                <p className="text-gray-600">Verified blows gain visibility, sparking public discourse and driving accountability.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Blow the Whistle?</h2>
          <p className="text-xl mb-8 opacity-90">Your truth matters. Your safety is guaranteed. Your voice will be heard.</p>
          <Link to="/submit">
            <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 transform hover:scale-105">
              Submit Your First Blow
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
