import { Link } from "react-router-dom";
import { Shield, Globe } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Shield className="h-8 w-8 text-orange-400" />
              <span className="text-xl font-bold">Privacy Pal</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Kenya's first AI-powered decentralized whistleblowing platform. 
              Empowering citizens to expose truth while maintaining complete anonymity.
            </p>
            <p className="text-orange-400 font-semibold text-lg">
              "Zero trace. Full truth."
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Access</h3>
            <div className="space-y-2">
              <Link to="/submit" className="block text-gray-300 hover:text-white transition-colors">
                Submit Blow
              </Link>
              <Link to="/pulse" className="block text-gray-300 hover:text-white transition-colors">
                The Pulse
              </Link>
              <Link to="/causepods" className="block text-gray-300 hover:text-white transition-colors">
                CausePods
              </Link>
              <Link to="/about" className="block text-gray-300 hover:text-white transition-colors">
                About & Safety
              </Link>
            </div>
          </div>

          {/* Language & Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Language</h3>
            <div className="flex items-center space-x-4 mb-6">
              <button className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors">
                <Globe className="h-4 w-4" />
                <span>EN</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors">
                <Globe className="h-4 w-4" />
                <span>SW</span>
              </button>
            </div>
            <div className="text-sm text-gray-400">
              <p>No cookies. No logs.</p>
              <p>No user accounts.</p>
              <p className="text-orange-400 font-semibold">Complete anonymity guaranteed.</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Privacy Pal. Built for truth, powered by community.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
