import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Separator } from '../components/ui/separator';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import EditScreenToolbar from '../components/EditScreenToolbar';
import EditScreenMobile from "./EditScreen.mobile";
import { useIsMobile } from "../hooks/use-mobile";
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
  ReactCompareSliderHandle,
} from 'react-compare-slider';

interface EditScreenProps {
  onBack: () => void;
  prompt?: string;
  beforeImage?: string;
  afterImage?: string;
}

export default function EditScreen({ 
  onBack, 
  prompt = "Remove this frame on the door, its placed on the door", 
  beforeImage = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjFGNUY5Ii8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNjM3NDhBIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiPk9yaWdpbmFsIEltYWdlPC90ZXh0Pgo8L3N2Zz4=",
  afterImage = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRkJFQ0IzIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOTI0MDBEIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiPkVkaXRlZCBJbWFnZTwvdGV4dD4KPC9zdmc+"
}: EditScreenProps) {
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

  // Desktop version state
  const [selectedVersion, setSelectedVersion] = useState<number>(1);
  const [showHistory, setShowHistory] = useState<boolean>(true);

  // Mock version data
  const versions = [
    { 
      id: 1, 
      name: 'Edit #1', 
      prompt: prompt,
      image: beforeImage
    },
    { 
      id: 2, 
      name: 'Edit #2', 
      prompt: 'Enhance lighting and contrast',
      image: beforeImage
    },
    { 
      id: 3, 
      name: 'Edit #3', 
      prompt: 'Add warm color tone',
      image: beforeImage
    }
  ];

  const handleBack = () => {
    onBack();
  };

  // Desktop implementation - just toolbar, image comparison, and history panel
  return (
    <div className="min-h-screen bg-background">
      {/* Main Layout Container */}
      <div className="flex min-h-screen">
        {/* Main Content */}
        <div className="flex-1 max-w-7xl mx-auto p-6">
          <div className="flex flex-col gap-4">
            
            {/* Toolbar */}
            <EditScreenToolbar
              variant="desktop"
              onBack={handleBack}
              onHistoryToggle={() => setShowHistory(!showHistory)}
              showHistory={showHistory}
              onDownload={() => console.log('Download clicked')}
              onPaintRoller={() => console.log('Paint roller clicked')}
              onEraser={() => console.log('Eraser clicked')}
            />

            <Separator />

            {/* Main Content Area - Only Image Comparison */}
            <main className="flex flex-col gap-4">
              {/* Image Area */}
              <div className="aspect-video bg-card border border-border rounded-lg overflow-hidden">
                <ReactCompareSlider
                  itemOne={<ReactCompareSliderImage src={beforeImage} alt="Original image" />}
                  itemTwo={<ReactCompareSliderImage src={afterImage} alt="Edited image" />}
                  handle={
                    <ReactCompareSliderHandle
                      buttonStyle={{
                        backdropFilter: undefined,
                        background: 'white',
                        border: 0,
                        color: '#222',
                      }}
                    />
                  }
                />
              </div>
            </main>
          </div>
        </div>

        {/* History Sidebar */}
        {showHistory && (
          <aside className="w-80 bg-sidebar border-l border-border flex flex-col">
            {/* History Panel Header */}
            <div className="p-3 border-b border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div>
                    <h3 className="text-sm font-semibold text-sidebar-foreground">History</h3>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-sidebar-foreground" 
                  aria-label="Close History"
                  onClick={() => setShowHistory(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* History Panel Content */}
            <div className="p-2 flex-1 overflow-y-auto">
              <Card className="w-full h-full flex flex-col bg-card text-card-foreground border-0">
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-base font-medium">Reference Image</CardTitle>
                  <CardDescription className="text-sm pt-1 text-muted-foreground">
                    Your prompt: <br /> {versions[selectedVersion - 1]?.prompt}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="p-3 flex-grow flex flex-col items-center gap-2">
                  {/* Large Preview */}
                  <div className="w-full aspect-square relative bg-muted rounded-md overflow-hidden">
                    {versions[selectedVersion - 1]?.image ? (
                      <img
                        src={versions[selectedVersion - 1].image}
                        alt="Reference Image"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                        Reference Image
                      </div>
                    )}
                  </div>
                  
                  {/* Thumbnail Grid */}
                  <div className="flex justify-between w-full mt-2">
                    {versions.map((version) => (
                      <div key={version.id} className="flex flex-col items-center gap-1">
                        <button
                          onClick={() => setSelectedVersion(version.id)}
                          className={`w-[64px] h-[64px] relative overflow-hidden rounded-md border-2 transition-colors ${
                            selectedVersion === version.id 
                              ? 'border-primary bg-primary/10' 
                              : 'border-muted bg-muted hover:border-muted-foreground/50'
                          }`}
                        >
                          {version.image ? (
                            <img
                              src={version.image}
                              alt={version.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">
                              {version.id}
                            </div>
                          )}
                        </button>
                        <p className="text-xs text-center text-card-foreground">{version.name}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
                
                <CardFooter className="flex-col items-center gap-3 p-3 pt-1">
                  <div className="w-full flex flex-col gap-2">
                    <Button className="w-full" size="sm">Download</Button>
                    <Button variant="outline" className="w-full" size="sm">Edit this image</Button>
                  </div>
                  <Button variant="link" className="text-sm font-normal text-foreground h-auto p-0">
                    Delete
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
