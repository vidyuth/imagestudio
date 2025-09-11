export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        {/* Mobile Layout - Stacked */}
        <div className="flex flex-col space-y-4 sm:hidden">
          <div className="text-sm text-muted-foreground text-center">
            © 2025 ImageStage. All rights reserved.
          </div>
          <div className="flex justify-center items-center space-x-6">
            <span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
              Privacy
            </span>
            <span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
              Terms
            </span>
            <span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
              Support
            </span>
          </div>
        </div>

        {/* Desktop Layout - Single Row */}
        <div className="hidden sm:flex justify-between items-center">
          <div className="text-sm text-muted-foreground">
            © 2025 ImageStage. All rights reserved.
          </div>
          <div className="flex items-center space-x-6">
            <span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
              Privacy
            </span>
            <span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
              Terms
            </span>
            <span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
              Support
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}