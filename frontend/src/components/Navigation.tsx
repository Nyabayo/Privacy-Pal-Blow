import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Shield, Eye, Users, MessageCircle, Bookmark, Info } from "lucide-react";
// import { useAnonymousId } from "@/hooks/useAnonymousId";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  // const { anonymousId, loading } = useAnonymousId();

  const navItems = [
    { href: "/", label: "Home", icon: Shield },
    { href: "/submit", label: "Submit Blow", icon: Eye },
    { href: "/pulse", label: "The Pulse", icon: Users },
    { href: "/causepods", label: "CausePods", icon: MessageCircle },
    { href: "/vault", label: "Vault", icon: Bookmark },
    { href: "/about", label: "About", icon: Info },
  ];

  const NavLinks = ({ mobile = false }) => (
    <>
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.href;
        return (
          <Link
            key={item.href}
            to={item.href}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
              mobile ? "text-gray-700 hover:bg-gray-100" : "text-white hover:bg-white/10"
            } ${isActive ? (mobile ? "bg-blue-50 text-blue-700" : "bg-white/20") : ""}`}
            onClick={() => mobile && setIsOpen(false)}
          >
            <Icon className="h-4 w-4" />
            {item.label}
          </Link>
        );
      })}
    </>
  );

  return (
    <nav className="bg-blue-900 border-b border-blue-800">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-orange-400" />
            <span className="text-xl font-bold text-white">Privacy Pal</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <NavLinks />
          </div>

          {/* Session ID Display */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="text-sm text-blue-200">
              Session:{" "}
              <span className="font-mono text-orange-300">
                {/* {loading ? "Loading..." : anonymousId} */}
                User#Static
              </span>
            </div>
            <Link to="/submit">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                Submit Blow
              </Button>
            </Link>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col space-y-4 mt-8">
                  <div className="text-sm text-gray-500 border-b border-gray-200 pb-4">
                    Session:{" "}
                    <span className="font-mono text-blue-600">
                      {/* {loading ? "Loading..." : anonymousId} */}
                      User#Static
                    </span>
                  </div>
                  <NavLinks mobile />
                  <Link to="/submit" onClick={() => setIsOpen(false)}>
                    <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                      Submit Blow
                    </Button>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
