
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Shield, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white">
      <div className="text-center max-w-md mx-auto px-6">
        <div className="mb-8">
          <Shield className="h-24 w-24 text-orange-400 mx-auto mb-6 opacity-50" />
          <h1 className="text-6xl font-bold mb-4">404</h1>
          <h2 className="text-2xl font-semibold mb-4">This trail has gone cold.</h2>
          <p className="text-blue-200 mb-8">
            The page you're looking for doesn't exist or has been moved to maintain anonymity.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link to="/">
            <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Return to Safety
            </Button>
          </Link>
          
          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <Link to="/submit">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-900">
                Submit a Blow
              </Button>
            </Link>
            <Link to="/pulse">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-900">
                View The Pulse
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-12 text-sm text-blue-300">
          <p>Session: <span className="font-mono text-orange-300">User#7gxh48</span></p>
          <p className="mt-2 opacity-75">Your anonymity remains protected.</p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
