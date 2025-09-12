import React, { useState } from 'react';
import { CornerUpLeft, Download, History, Layers2, PaintRoller, Eraser } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '../components/ui/drawer';
import { Toggle } from '../components/ui/toggle';
import { Slider } from '../components/ui/slider';
import { ScrollArea } from '../components/ui/scroll-area';

interface EditScreenMobileProps {
  onBack: () => void;
  prompt?: string;
  beforeImage?: string;
  afterImage?: string;
}

export default function EditScreenMobile({ onBack, prompt = "", beforeImage = "", afterImage = "" }: EditScreenMobileProps) {
  const [selectedVersion, setSelectedVersion] = useState<number>(1);
  const [isOverlayMode, setIsOverlayMode] = useState(false);
  const [overlayOpacity, setOverlayOpacity] = useState([50]);

  // Mock version data - in real app this would come from props/state
  const versions = [
    { 
      id: 1, 
      name: 'Edit #1', 
      prompt: prompt || 'Remove this frame on the door, its placed on the door',
      image: beforeImage || afterImage
    },
    { 
      id: 2, 
      name: 'Edit #2', 
      prompt: 'Enhance lighting and contrast',
      image: beforeImage || afterImage
    },
    { 
      id: 3, 
      name: 'Edit #3', 
      prompt: 'Add warm color tone',
      image: beforeImage || afterImage
    }
  ];

  return (
    <div className="h-screen bg-background flex flex-col">
      {/* Debug indicator for mobile */}
      <div className="fixed top-0 right-0 bg-green-500 text-white px-2 py-1 text-xs z-50">
        MOBILE
      </div>

      {/* Toolbar - Combined with back button */}
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
            
            <Button variant="ghost" size="sm" className="p-2">
              <PaintRoller className="h-4 w-4" />
            </Button>
            
            <Button variant="ghost" size="sm" className="p-2">
              <Eraser className="h-4 w-4" />
            </Button>
            
            {/* Layer Toggle - Active when overlay mode is on */}
            {beforeImage && afterImage && (
              <Toggle
                pressed={isOverlayMode}
                onPressedChange={setIsOverlayMode}
                size="sm"
                className="p-2"
              >
                <Layers2 className="h-4 w-4" />
              </Toggle>
            )}
            
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
                          alt={versions[selectedVersion - 1].name}
                          className="w-full h-full object-cover rounded"
                        />
                      ) : (
                        <span className="text-xs text-muted-foreground">Reference Image</span>
                      )}
                    </div>
                  </div>

                  {/* Thumbnail Grid - Only 3 versions */}
                  <div className="grid grid-cols-3 gap-3">
                    {versions.map((version) => (
                      <div key={version.id} className="space-y-1">
                        <button
                          onClick={() => setSelectedVersion(version.id)}
                          className={`w-full aspect-square bg-muted rounded border-2 flex items-center justify-center transition-colors ${
                            selectedVersion === version.id 
                              ? 'border-primary bg-primary/10' 
                              : 'border-dashed border-muted-foreground/25 hover:border-muted-foreground/50'
                          }`}
                        >
                          {version.image ? (
                            <img 
                              src={version.image} 
                              alt={version.name}
                              className="w-full h-full object-cover rounded"
                            />
                          ) : (
                            <span className="text-xs text-muted-foreground">{version.id}</span>
                          )}
                        </button>
                        <p className="text-xs text-center text-muted-foreground">{version.name}</p>
                      </div>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-4 space-y-2">
                    <Button className="w-full bg-primary text-primary-foreground">
                      <Download className="h-4 w-4 mr-2" />
                      Download This Version
                    </Button>
                    <Button className="w-full" variant="outline">
                      Edit this image
                    </Button>
                    <Button className="w-full text-destructive" variant="outline">
                      Delete
                    </Button>
                  </div>
                </div>
              </DrawerContent>
            </Drawer>
          </div>

          {/* Right - Download Button */}
          <Button className="bg-primary text-primary-foreground px-4 py-2">
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </div>
      </div>

      {/* Main Content Area - Always show image and editing tools */}
      <div className="flex-1 flex flex-col">
        {/* Image Display Area */}
        <div className="flex-1 p-4">
          {beforeImage && afterImage ? (
            <ScrollArea className="h-full w-full rounded-lg border">
              {isOverlayMode ? (
                /* Overlay Mode - Single image with opacity overlay */
                <div className="relative min-h-full">
                  {/* Show After image as base when opacity is 0, otherwise show Before */}
                  {overlayOpacity[0] === 0 ? (
                    <img 
                      src={afterImage} 
                      alt="After" 
                      className="w-full h-auto min-h-full object-contain"
                    />
                  ) : (
                    <>
                      {/* Base Image (Before) */}
                      <img 
                        src={beforeImage} 
                        alt="Before" 
                        className="w-full h-auto min-h-full object-contain"
                      />
                      
                      {/* Overlay Image (After) with opacity */}
                      <div 
                        className="absolute inset-0"
                        style={{ opacity: overlayOpacity[0] / 100 }}
                      >
                        <img 
                          src={afterImage} 
                          alt="After" 
                          className="w-full h-auto min-h-full object-contain"
                        />
                      </div>
                    </>
                  )}
                  
                  {/* Fixed Labels with percentages - only in overlay mode */}
                  <div className="absolute top-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs font-medium">
                    Before ({100 - overlayOpacity[0]}%)
                  </div>
                  <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs font-medium">
                    After ({overlayOpacity[0]}%)
                  </div>
                </div>
              ) : (
                /* Default Mode - Show only After image for editing */
                <div className="relative min-h-full">
                  <img 
                    src={afterImage} 
                    alt="Edited Image" 
                    className="w-full h-auto min-h-full object-contain"
                  />
                  
                  {/* Simple label for the current edit */}
                  <div className="absolute top-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs font-medium">
                    Current Edit
                  </div>
                </div>
              )}
            </ScrollArea>
          ) : (
            /* Single Image Display */
            <div className="h-full w-full rounded-lg border bg-muted flex items-center justify-center">
              {beforeImage || afterImage ? (
                <img 
                  src={afterImage || beforeImage} 
                  alt="Image" 
                  className="max-w-full max-h-full object-contain" 
                />
              ) : (
                <div className="text-muted-foreground">No image loaded</div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Opacity Slider - Moved to bottom for better mobile ergonomics */}
      {isOverlayMode && beforeImage && afterImage && (
        <div className="bg-card border-t border-border px-4 py-3 flex-shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground font-medium">Before</span>
            <Slider
              value={overlayOpacity}
              onValueChange={setOverlayOpacity}
              max={100}
              min={0}
              step={1}
              className="flex-1"
            />
            <span className="text-xs text-muted-foreground min-w-[3ch] font-medium">After</span>
          </div>
        </div>
      )}
    </div>
  );
}
