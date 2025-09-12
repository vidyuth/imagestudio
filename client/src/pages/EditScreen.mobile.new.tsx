import React, { useState } from 'react';
import { CornerUpLeft, Download, RotateCcw, RotateCw, Crop, Palette, Sun, Contrast, Maximize2, Minimize2, PaintBucket, Filter, Focus, Eraser, Settings, Layers, History, Menu, Sliders, Zap, Sparkles, Layers2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Toggle } from '../components/ui/toggle';
import { Slider } from '../components/ui/slider';
import { ScrollArea } from '../components/ui/scroll-area';

interface EditScreenMobileProps {
  onBack: () => void;
  prompt?: string;
  beforeImage?: string;
  afterImage?: string;
}

interface EditTool {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  type: 'adjust' | 'filter' | 'transform';
}

const leftTools: EditTool[] = [
  { id: 'brightness', name: 'Brightness', icon: Sun, description: 'Adjust image brightness', type: 'adjust' },
  { id: 'contrast', name: 'Contrast', icon: Contrast, description: 'Adjust image contrast', type: 'adjust' },
  { id: 'rotate-left', name: 'Rotate Left', icon: RotateCcw, description: 'Rotate image left', type: 'transform' },
  { id: 'crop', name: 'Crop', icon: Crop, description: 'Crop image', type: 'transform' },
];

const rightTools: EditTool[] = [
  { id: 'filters', name: 'Filters', icon: Filter, description: 'Apply filters', type: 'filter' },
  { id: 'effects', name: 'Effects', icon: Sparkles, description: 'Special effects', type: 'filter' },
  { id: 'enhance', name: 'Enhance', icon: Zap, description: 'Auto enhance', type: 'adjust' },
  { id: 'adjust', name: 'Adjust', icon: Sliders, description: 'Fine adjustments', type: 'adjust' },
];

export default function EditScreenMobile({ onBack, prompt = "", beforeImage = "", afterImage = "" }: EditScreenMobileProps) {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [isOverlayMode, setIsOverlayMode] = useState(false);
  const [overlayOpacity, setOverlayOpacity] = useState([50]);

  return (
    <div className="h-screen bg-background flex flex-col">
      {/* Debug indicator for mobile */}
      <div className="fixed top-0 right-0 bg-green-500 text-white px-2 py-1 text-xs z-50">
        MOBILE
      </div>

      {/* Header - Streamlined */}
      <div className="bg-card border-b border-border px-4 py-3 flex-shrink-0">
        <div className="flex items-center justify-between">
          {/* Left - Back Button */}
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onBack}
            className="p-2"
          >
            <CornerUpLeft className="h-4 w-4" />
          </Button>

          {/* Center - Title */}
          <h1 className="text-lg font-semibold">Edit Image</h1>

          {/* Right - Layer Toggle (always show when both images available) */}
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
                /* Side-by-Side Mode - when overlay is OFF */
                <div className="grid grid-cols-2 gap-0 min-h-full">
                  {/* Before Image Section */}
                  <div className="relative border-r border-border">
                    <div className="absolute top-2 left-2 z-10 bg-black/70 text-white px-2 py-1 rounded text-xs font-medium">
                      Before
                    </div>
                    <img 
                      src={beforeImage} 
                      alt="Before" 
                      className="w-full h-auto min-h-full object-cover"
                    />
                  </div>
                  
                  {/* After Image Section */}
                  <div className="relative">
                    <div className="absolute top-2 left-2 z-10 bg-black/70 text-white px-2 py-1 rounded text-xs font-medium">
                      After
                    </div>
                    <img 
                      src={afterImage} 
                      alt="After" 
                      className="w-full h-auto min-h-full object-cover"
                    />
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

        {/* Editing Tools - Always show */}
        <div className="border-t border-border bg-card p-4">
          <div className="grid grid-cols-4 gap-3">
            {/* Left Tools */}
            {leftTools.map((tool) => (
              <Button
                key={tool.id}
                variant={selectedTool === tool.id ? "default" : "outline"}
                size="sm"
                className="flex flex-col gap-1 h-auto py-3"
                onClick={() => setSelectedTool(selectedTool === tool.id ? null : tool.id)}
              >
                <tool.icon className="h-4 w-4" />
                <span className="text-xs">{tool.name}</span>
              </Button>
            ))}
          </div>
          
          <div className="grid grid-cols-4 gap-3 mt-3">
            {/* Right Tools */}
            {rightTools.map((tool) => (
              <Button
                key={tool.id}
                variant={selectedTool === tool.id ? "default" : "outline"}
                size="sm"
                className="flex flex-col gap-1 h-auto py-3"
                onClick={() => setSelectedTool(selectedTool === tool.id ? null : tool.id)}
              >
                <tool.icon className="h-4 w-4" />
                <span className="text-xs">{tool.name}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Opacity Slider - Moved to bottom for better mobile ergonomics */}
      {isOverlayMode && beforeImage && afterImage && (
        <div className="bg-card border-t border-border px-4 py-3 flex-shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground font-medium">Opacity:</span>
            <Slider
              value={overlayOpacity}
              onValueChange={setOverlayOpacity}
              max={100}
              min={0}
              step={1}
              className="flex-1"
            />
            <span className="text-xs text-muted-foreground min-w-[3ch] font-medium">{overlayOpacity[0]}%</span>
          </div>
        </div>
      )}

      {/* Download Button - Fixed at bottom */}
      <div className="bg-card border-t border-border p-4 flex-shrink-0">
        <Button className="w-full bg-primary text-primary-foreground">
          <Download className="h-4 w-4 mr-2" />
          Download Result
        </Button>
      </div>
    </div>
  );
}
