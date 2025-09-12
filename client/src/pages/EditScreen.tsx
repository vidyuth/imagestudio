import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, History, MousePointer2, PaintRoller, Download, Trash2, RotateCcw, Share, Undo2, Redo2 } from "lucide-react";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import EditScreenMobile from "./EditScreen.mobile";
import { useIsMobile } from "../hooks/use-mobile";

interface EditScreenProps {
  onBack: () => void;
  prompt?: string;
  beforeImage?: string;
  afterImage?: string;
}

export default function EditScreen({ onBack, prompt = "", beforeImage = "", afterImage = "" }: EditScreenProps) {
  const [activeTab, setActiveTab] = useState<"edit" | "beforeAfter">("edit");
  const isMobile = useIsMobile();

  // Use mobile version on mobile devices
  if (isMobile) {
    return (
      <EditScreenMobile 
        onBack={onBack}
        prompt={prompt}
        beforeImage={beforeImage}
        afterImage={afterImage}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Debug indicator for desktop */}
      <div className="fixed top-0 right-0 bg-red-500 text-white px-2 py-1 text-xs z-50">
        DESKTOP
      </div>
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            {/* Left - Logo and Back */}
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onBack}
                className="flex items-center gap-2"
                data-testid="button-create-new-stage"
              >
                <ArrowLeft className="h-4 w-4" />
                Create a New Stage
              </Button>
            </div>

            {/* Center - Tabs */}
            <div className="flex items-center">
              <div className="flex bg-muted rounded-lg p-1">
                <button
                  onClick={() => setActiveTab("beforeAfter")}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === "beforeAfter" 
                      ? "bg-background text-foreground shadow-sm" 
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  data-testid="tab-before-after"
                >
                  Before & After
                </button>
                <button
                  onClick={() => setActiveTab("edit")}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === "edit" 
                      ? "bg-primary text-primary-foreground shadow-sm" 
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  data-testid="tab-edit"
                >
                  Edit
                </button>
              </div>
            </div>

            {/* Right - Top toolbar controls */}
            <div className="flex items-center space-x-2">
              <Button size="icon" variant="ghost" data-testid="button-share">
                <Share className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost" data-testid="button-download-header">
                <Download className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost" data-testid="button-undo">
                <Undo2 className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost" data-testid="button-redo">
                <Redo2 className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost" data-testid="button-reset">
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-64px)]">
        {/* Main Content */}
        <div className={`flex-1 flex flex-col ${activeTab === "edit" ? "mr-80" : ""}`}>
          {/* Image Area */}
          <div className="flex-1 bg-muted/20 relative">
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <div className="w-full h-full flex items-center justify-center">
                {activeTab === "beforeAfter" && beforeImage && afterImage ? (
                  <div className="w-full h-full max-h-[80vh]">
                    <BeforeAfterSlider 
                      beforeImage={beforeImage}
                      afterImage={afterImage}
                    />
                  </div>
                ) : (
                  <div className="aspect-video bg-muted rounded-lg border-2 border-dashed border-muted-foreground/25 flex items-center justify-center max-w-4xl w-full">
                    <div className="text-center text-muted-foreground">
                      <p className="text-lg font-medium mb-2">
                        {activeTab === "edit" ? "Image Editor Area" : "Before & After View"}
                      </p>
                      <p className="text-sm">
                        {activeTab === "edit" 
                          ? "Interactive editing tools and canvas" 
                          : beforeImage && afterImage 
                            ? "Loading comparison..." 
                            : "Upload images to see before/after comparison"
                        }
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Bottom Download Button */}
          <div className="p-4 border-t border-border bg-background">
            <div className="max-w-4xl mx-auto flex justify-center">
              <Button className="bg-primary text-primary-foreground" data-testid="button-download-version">
                <Download className="h-4 w-4 mr-2" />
                {activeTab === "beforeAfter" ? "Download AI Result" : "Download Edited Version"}
              </Button>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Only visible in Edit mode */}
        {activeTab === "edit" && (
          <div className="w-80 border-l border-border bg-card">
            {/* Tools Section */}
            <div className="p-4 border-b border-border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">Tools</h3>
              </div>
              <div className="flex gap-2">
                <Button size="icon" variant="outline" data-testid="tool-history">
                  <History className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="outline" data-testid="tool-pointer">
                  <MousePointer2 className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="outline" data-testid="tool-paint">
                  <PaintRoller className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* History Panel */}
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <History className="h-4 w-4" />
                  <span className="font-medium">History</span>
                </div>
                <span className="text-sm text-muted-foreground">v1.01</span>
              </div>

              {/* Reference Image Section */}
              <div className="mb-6">
                <h4 className="text-sm font-medium mb-2">Reference Image</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Your prompt: {prompt || "No prompt provided"}
                </p>
                
                {/* Reference Image Placeholder */}
                <div className="bg-muted rounded-lg p-4 mb-4">
                  <div className="aspect-video bg-muted-foreground/10 rounded border-2 border-dashed border-muted-foreground/25 flex items-center justify-center">
                    <span className="text-xs text-muted-foreground">Reference Image</span>
                  </div>
                </div>

                {/* Thumbnail Grid */}
                <div className="grid grid-cols-4 gap-2 mb-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div 
                      key={i} 
                      className="aspect-square bg-muted rounded border-2 border-dashed border-muted-foreground/25 flex items-center justify-center"
                    >
                      <span className="text-xs text-muted-foreground">{i}</span>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="space-y-2">
                  <Button className="w-full bg-primary text-primary-foreground" data-testid="button-download">
                    <Download className="h-4 w-4 mr-2" />
                    Download This Version
                  </Button>
                  <Button variant="outline" className="w-full" data-testid="button-edit-image">
                    Edit this image
                  </Button>
                  <Button variant="outline" className="w-full text-destructive" data-testid="button-delete">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}