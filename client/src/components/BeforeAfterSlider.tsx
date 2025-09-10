import { useState, useRef } from "react";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
}

export default function BeforeAfterSlider({ beforeImage, afterImage }: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    
    setSliderPosition(Math.max(0, Math.min(100, percentage)));
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-96 overflow-hidden rounded-lg bg-muted cursor-ew-resize"
      onMouseMove={handleMouseMove}
      data-testid="before-after-slider"
    >
      {/* Before Image */}
      <div className="absolute inset-0">
        <img 
          src={beforeImage} 
          alt="Before" 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* After Image with clip path */}
      <div 
        className="absolute inset-0"
        style={{
          clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`
        }}
      >
        <img 
          src={afterImage} 
          alt="After" 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Slider Line */}
      <div 
        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg z-10"
        style={{ left: `${sliderPosition}%` }}
      >
        {/* Slider Handle */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
          <div className="w-1 h-4 bg-gray-400 rounded"></div>
          <div className="w-1 h-4 bg-gray-400 rounded ml-1"></div>
        </div>
      </div>
      
      {/* Labels */}
      <div className="absolute top-4 left-4 bg-black/50 text-white px-2 py-1 rounded text-sm">
        Before
      </div>
      <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-sm">
        After
      </div>
    </div>
  );
}