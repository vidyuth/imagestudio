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
import MaskCanvas from '../components/MaskCanvas';
import { useAppStore } from '../../../nano-backend/store/useAppStore';
import { useImageEditing } from '../../../nano-backend/hooks/useImageGeneration';

interface EditScreenMobileProps {
  onBack: () => void;
  prompt?: string;
  beforeImage?: string;
  afterImage?: string;
}

export default function EditScreenMobile({ onBack, prompt = "", beforeImage = "", afterImage = "" }: EditScreenMobileProps) {
  const [selectedVersion, setSelectedVersion] = useState<number>(1);
  const [editPrompt, setEditPrompt] = useState<string>("");

  // Use AppStore for mask mode
  const { selectedTool } = useAppStore();
  const { edit, isEditing } = useImageEditing();

  // Determine if we're in mask mode
  const isMaskMode = selectedTool === 'mask';

  // Handle the Update button click
  const handleUpdate = () => {
    if (editPrompt.trim()) {
      edit(editPrompt.trim());
      setEditPrompt(""); // Clear prompt after sending
    }
  };

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
      {/* Toolbar - Fixed height */}
      <div className="flex-shrink-0">
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
      </div>

      {/* Main Content Area - Takes remaining space */}
      <div className="flex-1 flex flex-col p-4 overflow-hidden min-h-0">
        {/* Image Display Area - Takes available space */}
        <div className="flex-1 w-full mb-4 overflow-hidden min-h-0">
          {isMaskMode && afterImage ? (
            /* Mask Mode - Show only after image with painting canvas */
            <div className="h-full rounded-lg border overflow-hidden flex flex-col">
              <div className="flex-1 overflow-hidden min-h-0">
                <MaskCanvas 
                  imageUrl={afterImage}
                  className="w-full h-full"
                />
              </div>
              {/* Instruction text for mask mode */}
              <div className="p-3 bg-muted/50 border-t flex-shrink-0">
                <p className="text-sm text-center text-muted-foreground">
                  Use the paintbrush to select an area on the photo
                </p>
              </div>
            </div>
          ) : beforeImage && afterImage ? (
            /* Normal Mode - Show before/after comparison */
            <div className="w-full h-full rounded-lg border overflow-hidden">
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
            <div className="w-full h-full rounded-lg border bg-muted flex items-center justify-center">
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

        {/* Prompt Composer Section - Fixed height at bottom */}
        <div className="flex-shrink-0 flex flex-col gap-3">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter your prompt here..."
              value={editPrompt}
              onChange={(e) => setEditPrompt(e.target.value)}
              className="flex-1 px-4 py-3 bg-muted border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <Button 
            variant="default" 
            className="w-full py-3" 
            onClick={handleUpdate}
            disabled={isEditing || !editPrompt.trim()}
          >
            <Wand2 className="h-4 w-4 mr-2" />
            {isEditing ? 'Updating...' : 'Update'}
          </Button>
        </div>
      </div>
    </div>
  );
}
