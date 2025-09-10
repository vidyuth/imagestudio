import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Header() {
  return (
    <header className="border-b border-border bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/">
              <span className="text-2xl font-bold text-primary" data-testid="logo">
                ImageStage
              </span>
            </Link>
          </div>

          {/* Navigation and Auth */}
          <div className="flex items-center space-x-4">
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/features">
                <span className="text-foreground hover:text-primary transition-colors" data-testid="link-features">
                  Features
                </span>
              </Link>
              <Link href="/pricing">
                <span className="text-foreground hover:text-primary transition-colors" data-testid="link-pricing">
                  Pricing
                </span>
              </Link>
              <Link href="/help">
                <span className="text-foreground hover:text-primary transition-colors" data-testid="link-help">
                  Help
                </span>
              </Link>
            </nav>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" data-testid="button-login">
                Login
              </Button>
              <Button size="sm" data-testid="button-signup">
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}