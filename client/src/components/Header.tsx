import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Moon, Sun, Menu, X } from "lucide-react";
import { LABELS } from "@/config/labels";
import { useState, useEffect, useRef } from "react";

export default function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Initialize theme
  useEffect(() => {
    const savedTheme = localStorage.getItem('imagestudio-theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialDark = savedTheme === 'dark' || (!savedTheme && systemPrefersDark);
    
    setIsDarkMode(initialDark);
    document.documentElement.classList.toggle('dark', initialDark);
  }, []);

  const toggleTheme = () => {
    const newDarkMode = !isDarkMode;
    
    // Create animation effect
    if (buttonRef.current && 'startViewTransition' in document) {
      const transition = (document as any).startViewTransition(() => {
        setIsDarkMode(newDarkMode);
        document.documentElement.classList.toggle('dark', newDarkMode);
        localStorage.setItem('imagestudio-theme', newDarkMode ? 'dark' : 'light');
      });
    } else {
      // Fallback for browsers without View Transitions API
      document.documentElement.style.transition = 'background-color 0.3s ease';
      setIsDarkMode(newDarkMode);
      document.documentElement.classList.toggle('dark', newDarkMode);
      localStorage.setItem('imagestudio-theme', newDarkMode ? 'dark' : 'light');
    }
  };

  return (
    <header className="border-b border-border bg-background px-4 sm:px-6 lg:px-8 h-14 sm:h-16">
      <div className="grid grid-cols-[auto_1fr_auto] items-center h-full max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/">
            <span className="text-lg sm:text-xl font-bold text-primary" data-testid="logo">
              {LABELS.SITE_NAME}
            </span>
          </Link>
        </div>

        {/* Desktop Navigation - Hidden on mobile */}
        <nav className="hidden lg:flex items-center justify-self-center">
          <div className="flex items-center space-x-8">
            <Link href="/features">
              <span className="text-foreground hover:text-primary transition-colors" data-testid="link-features">
                {LABELS.NAV.FEATURES}
              </span>
            </Link>
            <Link href="/pricing">
              <span className="text-foreground hover:text-primary transition-colors" data-testid="link-pricing">
                {LABELS.NAV.PRICING}
              </span>
            </Link>
            <Link href="/help">
              <span className="text-foreground hover:text-primary transition-colors" data-testid="link-help">
                {LABELS.NAV.HELP}
              </span>
            </Link>
          </div>
        </nav>
            
        {/* Right side - Theme + Auth + Mobile Menu */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Theme Switcher */}
          <Button
            ref={buttonRef}
            onClick={toggleTheme}
            size="icon"
            variant="ghost"
            className="w-8 h-8 sm:w-9 sm:h-9"
            aria-label={LABELS.ARIA.TOGGLE_THEME}
            data-testid="button-theme-toggle"
          >
            {isDarkMode ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>
          
          {/* Desktop Auth Buttons */}
          <div className="hidden sm:flex items-center space-x-2">
            <Button variant="outline" size="sm" data-testid="button-login">
              {LABELS.AUTH.LOGIN}
            </Button>
            <Button size="sm" data-testid="button-signup">
              {LABELS.AUTH.SIGN_UP}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden w-8 h-8 sm:w-9 sm:h-9"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-background">
          <div className="px-4 py-3 space-y-3">
            {/* Mobile Navigation Links */}
            <div className="space-y-2">
              <Link href="/features">
                <div className="block py-2 text-foreground hover:text-primary transition-colors" data-testid="mobile-link-features">
                  {LABELS.NAV.FEATURES}
                </div>
              </Link>
              <Link href="/pricing">
                <div className="block py-2 text-foreground hover:text-primary transition-colors" data-testid="mobile-link-pricing">
                  {LABELS.NAV.PRICING}
                </div>
              </Link>
              <Link href="/help">
                <div className="block py-2 text-foreground hover:text-primary transition-colors" data-testid="mobile-link-help">
                  {LABELS.NAV.HELP}
                </div>
              </Link>
            </div>
            
            {/* Mobile Auth Buttons */}
            <div className="pt-3 border-t border-border">
              <div className="flex flex-col space-y-2 sm:hidden">
                <Button variant="outline" size="sm" className="w-full" data-testid="mobile-button-login">
                  {LABELS.AUTH.LOGIN}
                </Button>
                <Button size="sm" className="w-full" data-testid="mobile-button-signup">
                  {LABELS.AUTH.SIGN_UP}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}