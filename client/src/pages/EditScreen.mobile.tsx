import React, { useState } from 'react';
import { Wand2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { ScrollArea } from '../components/ui/scroll-area';
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
  ReactCompareSliderHandle,
} from 'react-compare-slider';
import EditScreenToolbar from '../components/EditScreenToolbar';

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
    <div className="h-screen bg-background flex flex-col overflow-hidden pt-4 sm:pt-8">
      {/* Toolbar */}
      <EditScreenToolbar
        variant="mobile"
        onBack={onBack}
        versions={versions}
        selectedVersion={selectedVersion}
        onVersionSelect={setSelectedVersion}
        onDownload={() => console.log('Download clicked')}
        onPaintRoller={() => console.log('Paint roller clicked')}
        onEraser={() => console.log('Eraser clicked')}
      />

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
