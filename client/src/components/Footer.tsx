export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-between items-center">
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