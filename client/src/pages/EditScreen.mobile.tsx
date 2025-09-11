import React, { useState } from 'react';
import { CornerUpLeft, Download, RotateCcw, RotateCw, Crop, Palette, Sun, Contrast, Maximize2, Minimize2, PaintBucket, Filter, Focus, Eraser, Settings, Layers, History, Menu, Sliders, Zap, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../components/ui/sheet';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '../components/ui/drawer';
import { Toggle } from '../components/ui/toggle';
import { Slider } from '../components/ui/slider';
import { Separator } from '../components/ui/separator';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import { LABELS } from '../config/labels';

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
  const [viewMode, setViewMode] = useState<'beforeAfter' | 'edit'>('beforeAfter');
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [selectedVersion, setSelectedVersion] = useState<number>(1);

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
    <div className="h-screen bg-background grid grid-rows-[auto_1fr_auto]">
      {/* Tab Bar - Right after header */}
      <div className="bg-card border-b border-border px-4 py-3">
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

          {/* Center - Mode Toggle */}
          <div className="bg-muted rounded-lg p-1 flex">
            <Toggle
              pressed={viewMode === 'beforeAfter'}
              onPressedChange={() => setViewMode('beforeAfter')}
              className="px-4 py-2 text-sm font-medium data-[state=on]:bg-background data-[state=on]:text-foreground data-[state=on]:shadow-sm"
            >
              Before & After
            </Toggle>
            <Toggle
              pressed={viewMode === 'edit'}
              onPressedChange={() => setViewMode('edit')}
              className="px-4 py-2 text-sm font-medium data-[state=on]:bg-primary data-[state=on]:text-primary-foreground data-[state=on]:shadow-sm"
            >
              Edit
            </Toggle>
          </div>

          {/* Right - Version History */}
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
      </div>

      {/* Main Content Area - Fixed height */}
      <div className="bg-muted/20 relative overflow-hidden">
        {/* Floating Left Tool Panel - Only visible in Edit mode */}
        {viewMode === 'edit' && (
          <Sheet>
            <SheetTrigger asChild>
              <Button 
                variant="secondary" 
                size="sm"
                className="absolute top-4 left-4 z-10 bg-card/90 backdrop-blur-sm border shadow-lg"
              >
                <Settings className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 sm:w-96">
              <SheetHeader>
                <SheetTitle>Edit Tools</SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-4">
                {leftTools.map((tool) => (
                  <div key={tool.id} className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Button
                        variant={selectedTool === tool.id ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setSelectedTool(selectedTool === tool.id ? null : tool.id)}
                        className="flex items-center gap-2"
                      >
                        <tool.icon className="h-4 w-4" />
                        {tool.name}
                      </Button>
                    </div>
                    
                    {selectedTool === tool.id && tool.type === 'adjust' && (
                      <div className="pl-4 space-y-2">
                        <div className="space-y-1">
                          <label className="text-sm text-muted-foreground">Intensity</label>
                          <Slider defaultValue={[50]} max={100} step={1} className="w-full" />
                        </div>
                      </div>
                    )}
                    
                    <Separator />
                  </div>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        )}

        {/* Floating Right Tool Panel - Only visible in Edit mode */}
        {viewMode === 'edit' && (
          <Sheet>
            <SheetTrigger asChild>
              <Button 
                variant="secondary" 
                size="sm"
                className="absolute top-4 right-4 z-10 bg-card/90 backdrop-blur-sm border shadow-lg"
              >
                <Palette className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 sm:w-96">
              <SheetHeader>
                <SheetTitle>Filters & Effects</SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-4">
                {rightTools.map((tool) => (
                  <div key={tool.id} className="space-y-3">
                    <Button
                      variant={selectedTool === tool.id ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setSelectedTool(selectedTool === tool.id ? null : tool.id)}
                      className="w-full flex items-center gap-2 justify-start"
                    >
                      <tool.icon className="h-4 w-4" />
                      {tool.name}
                    </Button>
                    
                    {selectedTool === tool.id && (
                      <div className="pl-4">
                        <p className="text-sm text-muted-foreground mb-2">{tool.description}</p>
                        {tool.type === 'adjust' && (
                          <div className="space-y-1">
                            <label className="text-sm text-muted-foreground">Intensity</label>
                            <Slider defaultValue={[50]} max={100} step={1} className="w-full" />
                          </div>
                        )}
                      </div>
                    )}
                    
                    <Separator />
                  </div>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        )}

        {/* Central Image Area */}
        <div className="absolute inset-0 p-4">
          {viewMode === 'beforeAfter' && beforeImage && afterImage ? (
            <div className="w-full h-full">
              <BeforeAfterSlider 
                beforeImage={beforeImage}
                afterImage={afterImage}
              />
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Card className="aspect-square bg-muted border-2 border-dashed border-muted-foreground/25 flex items-center justify-center max-w-md w-full">
                <div className="text-center text-muted-foreground p-6">
                  <p className="text-sm font-medium mb-2">
                    {viewMode === 'edit' ? 'Image Editor' : 'Before & After'}
                  </p>
                  <p className="text-xs">
                    {viewMode === 'edit' 
                      ? 'Tap tools to edit' 
                      : beforeImage && afterImage 
                        ? 'Loading...' 
                        : 'Upload images to compare'
                    }
                  </p>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Download Button */}
      <div className="bg-card border-t border-border p-4 pb-8 shrink-0">
        <Button className="w-full bg-primary text-primary-foreground">
          <Download className="h-4 w-4 mr-2" />
          {viewMode === 'beforeAfter' ? 'Download AI Result' : 'Download Edited Version'}
        </Button>
      </div>
    </div>
  );
}
