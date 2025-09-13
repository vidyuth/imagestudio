import React from 'react';
import { CornerUpLeft, Download, History, PaintRoller, Eraser } from 'lucide-react';
import { Button } from './ui/button';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from './ui/drawer';
import { useAppStore } from '../../../nano-backend/store/useAppStore';

interface EditScreenToolbarProps {
  variant: 'mobile' | 'desktop';
  onBack: () => void;
  onHistoryToggle?: () => void;
  showHistory?: boolean;
  onPaintRoller?: () => void;
  onEraser?: () => void;
  onDownload?: () => void;
  // History drawer props for mobile
  versions?: Array<{
    id: number;
    name: string;
    prompt: string;
    image?: string;
  }>;
  selectedVersion?: number;
  onVersionSelect?: (id: number) => void;
}

export default function EditScreenToolbar({
  variant,
  onBack,
  onHistoryToggle,
  showHistory,
  onPaintRoller = () => {},
  onEraser = () => {},
  onDownload = () => {},
  versions = [],
  selectedVersion = 1,
  onVersionSelect = () => {}
}: EditScreenToolbarProps) {
  
  // Use AppStore for mask mode functionality
  const { selectedTool, setSelectedTool, clearBrushStrokes } = useAppStore();
  
  const handlePaintRoller = () => {
    // Toggle mask mode or call the original handler for compatibility
    if (selectedTool === 'mask') {
      setSelectedTool('edit'); // Exit mask mode
    } else {
      setSelectedTool('mask'); // Enter mask mode
    }
    onPaintRoller(); // Keep compatibility with existing handlers
  };
  
  const handleEraser = () => {
    // Clear brush strokes or call the original handler
    clearBrushStrokes();
    onEraser(); // Keep compatibility with existing handlers
  };
  
  if (variant === 'mobile') {
    return (
      <div className="bg-card border-b border-border px-4 py-3 flex-shrink-0">
        <div className="flex items-center justify-between">
          {/* Left - Back button + First Group - Editing Tools */}
          <div className="flex items-center gap-2">
            {/* Back Button */}
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onBack}
              className="p-2"
            >
              <CornerUpLeft className="h-4 w-4" />
            </Button>
            
            {/* Separator line */}
            <div className="h-6 w-px bg-border mx-1" />
            
            <Button variant="ghost" size="sm" className="p-2" onClick={handlePaintRoller}>
              <PaintRoller className={`h-4 w-4 ${selectedTool === 'mask' ? 'text-primary' : ''}`} />
            </Button>
            
            <Button variant="ghost" size="sm" className="p-2" onClick={handleEraser}>
              <Eraser className="h-4 w-4" />
            </Button>
            
            {/* Version History */}
            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="ghost" size="sm" className="p-2">
                  <History className="h-4 w-4" />
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Reference Image</DrawerTitle>
                </DrawerHeader>
                <div className="p-4 space-y-4">
                  {/* Selected Version Info */}
                  <div className="space-y-2">
                    <h3 className="font-medium">{versions[selectedVersion - 1]?.name}</h3>
                    <div className="text-sm text-muted-foreground">
                      <p><span className="font-medium">Your prompt:</span></p>
                      <p>{versions[selectedVersion - 1]?.prompt}</p>
                    </div>
                  </div>
                  
                  {/* Large Preview Image */}
                  <div className="bg-muted rounded-lg p-4">
                    <div className="aspect-video bg-muted-foreground/10 rounded border-2 border-dashed border-muted-foreground/25 flex items-center justify-center">
                      {versions[selectedVersion - 1]?.image ? (
                        <img 
                          src={versions[selectedVersion - 1].image} 
                          alt="Reference" 
                          className="max-w-full max-h-full object-contain rounded"
                        />
                      ) : (
                        <span className="text-muted-foreground text-sm">Reference Image</span>
                      )}
                    </div>
                  </div>
                  
                  {/* Version Thumbnails */}
                  <div className="grid grid-cols-3 gap-2">
                    {versions.map((version) => (
                      <button
                        key={version.id}
                        onClick={() => onVersionSelect(version.id)}
                        className={`aspect-square rounded-lg border-2 transition-colors ${
                          selectedVersion === version.id 
                            ? 'border-primary bg-primary/10' 
                            : 'border-muted bg-muted hover:border-muted-foreground/50'
                        }`}
                      >
                        {version.image ? (
                          <img 
                            src={version.image} 
                            alt={version.name}
                            className="w-full h-full object-cover rounded-md"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">
                            {version.id}
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="space-y-2 pt-2">
                    <Button onClick={onDownload} className="w-full">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                    <Button variant="outline" className="w-full">
                      Edit this image
                    </Button>
                    <Button variant="link" className="w-full text-sm text-muted-foreground">
                      Delete
                    </Button>
                  </div>
                </div>
              </DrawerContent>
            </Drawer>
          </div>

          {/* Right - Download */}
          <Button variant="ghost" size="sm" onClick={onDownload} className="p-2">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }

  // Desktop variant
  return (
    <header className="relative flex justify-between items-center gap-2">
      <Button variant="outline" onClick={onBack}>
        <CornerUpLeft className="mr-2 h-4 w-4" />
        Create a New Stage
      </Button>
      
      {/* Centered Icons */}
      <div className="flex items-center gap-4 absolute left-1/2 transform -translate-x-1/2">
        <Button variant="ghost" size="icon" aria-label="Paint Roller" onClick={handlePaintRoller}>
          <PaintRoller className={`h-4 w-4 ${selectedTool === 'mask' ? 'text-primary' : ''}`} />
        </Button>
        <Button variant="ghost" size="icon" aria-label="Eraser" onClick={handleEraser}>
          <Eraser className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          aria-label="Version History"
          onClick={onHistoryToggle}
        >
          <History className="h-4 w-4" />
        </Button>
      </div>

      {/* Right side */}
      <Button size="sm" onClick={onDownload}>
        <Download className="mr-2 h-4 w-4" />
        Download
      </Button>
    </header>
  );
}
