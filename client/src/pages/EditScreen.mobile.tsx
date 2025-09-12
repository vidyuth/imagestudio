import React, { useState } from 'react';
import { CornerUpLeft, Download, History, PaintRoller, Eraser, Wand2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '../components/ui/drawer';
import { ScrollArea } from '../components/ui/scroll-area';
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
  ReactCompareSliderHandle,
} from 'react-compare-slider';

interface EditScreenMobileProps {
  onBack: () => void;
  prompt?: string;
  beforeImage?: string;
  afterImage?: string;
}

export default function EditScreenMobile({ onBack, prompt = "", beforeImage = "", afterImage = "" }: EditScreenMobileProps) {
  const [selectedVersion, setSelectedVersion] = useState<number>(1);
  const [editPrompt, setEditPrompt] = useState<string>("");

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
    <div className="h-screen bg-background flex flex-col overflow-hidden">
      {/* Toolbar - Combined with back button */}
      <div className="sticky top-14 sm:top-16 z-40 bg-card border-b border-border px-4 py-3 flex-shrink-0">
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
          <Button variant="secondary" className="px-4 py-2">
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </div>
      </div>

      {/* Main Content Area - Simplified Structure */}
      <div className="flex-1 flex flex-col p-4">
        {/* Image Display Area */}
        <div className="w-full mb-4">
          {beforeImage && afterImage ? (
            <div className="rounded-lg border overflow-hidden">
              <ReactCompareSlider
                itemOne={
                  <ReactCompareSliderImage
                    src={beforeImage}
                    alt="Before"
                    style={{ objectFit: 'contain' }}
                  />
                }
                itemTwo={
                  <ReactCompareSliderImage
                    src={afterImage}
                    alt="After"
                    style={{ objectFit: 'contain' }}
                  />
                }
                handle={<ReactCompareSliderHandle style={{color: 'white'}}/>}
              />
            </div>
          ) : (
            /* Single Image Display */
            <div className="w-full aspect-square rounded-lg border bg-muted flex items-center justify-center">
              {beforeImage || afterImage ? (
                <img 
                  src={afterImage || beforeImage} 
                  alt="Image" 
                  className="max-w-full max-h-full object-contain rounded-lg" 
                />
              ) : (
                <div className="text-muted-foreground">No image loaded</div>
              )}
            </div>
          )}
        </div>

        {/* Prompt Composer Section - Below Image */}
        <div className="flex flex-col gap-3">
          <Textarea
            placeholder="Use the paintbrush to select an area on the photo"
            value={editPrompt}
            onChange={(e) => setEditPrompt(e.target.value)}
            className="w-full bg-muted border-0 rounded-lg resize-none"
            rows={3}
          />
          <Button variant="secondary" className="w-full">
            <Wand2 className="h-4 w-4 mr-2" />
            Update
          </Button>
        </div>
      </div>
    </div>
  );
}
