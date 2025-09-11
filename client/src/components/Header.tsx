import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useThemeAnimation } from "@space-man/react-theme-animation";
import { Moon, Sun } from "lucide-react";

export default function Header() {
  const { theme, toggleTheme, ref } = useThemeAnimation();

  return (
    <header className="border-b border-border bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-[auto_1fr_auto] items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/">
              <span className="text-2xl font-bold text-primary" data-testid="logo">
                ImageStage
              </span>
            </Link>
          </div>

          {/* Centered Navigation */}
          <nav className="hidden md:flex items-center justify-self-center">
            <div className="flex items-center space-x-6">
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
            </div>
          </nav>
            
          {/* Theme Switcher and Auth - with 24px gap */}
          <div className="flex items-center gap-6">
            <Button
              ref={ref as unknown as React.RefObject<HTMLButtonElement>}
              onClick={toggleTheme}
              size="icon"
              variant="ghost"
              aria-label="Toggle theme"
              data-testid="button-theme-toggle"
            >
              {theme === 'dark' ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>
            
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