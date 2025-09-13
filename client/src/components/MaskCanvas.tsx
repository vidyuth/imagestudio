import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useAppStore } from '../../../nano-backend/store/useAppStore';
import { generateId } from '../../../nano-backend/utils/imageUtils';

interface MaskCanvasProps {
  imageUrl: string;
  className?: string;
}

export default function MaskCanvas({ imageUrl, className = "" }: MaskCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPoint, setLastPoint] = useState<{ x: number; y: number } | null>(null);
  
  // Get AppStore state and actions
  const { 
    brushStrokes, 
    addBrushStroke, 
    brushSize, 
    showMasks 
  } = useAppStore();

  // Current stroke being drawn
  const [currentStroke, setCurrentStroke] = useState<{ x: number; y: number }[]>([]);

  // Load and setup image
  useEffect(() => {
    const img = imageRef.current;
    const canvas = canvasRef.current;
    if (!img || !canvas) return;

    img.onload = () => {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Set canvas size to match image
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      
      // Draw the base image
      ctx.drawImage(img, 0, 0);
      
      // Redraw all existing brush strokes
      redrawMask();
    };

    img.src = imageUrl;
  }, [imageUrl]);

  // Redraw mask overlay whenever brush strokes change
  useEffect(() => {
    redrawMask();
  }, [brushStrokes, showMasks]);

  const redrawMask = useCallback(() => {
    const canvas = canvasRef.current;
    const img = imageRef.current;
    if (!canvas || !img) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear and redraw base image
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);

    if (!showMasks) return;

    // Draw mask overlay
    ctx.globalCompositeOperation = 'source-over';
    ctx.strokeStyle = '#A855F7'; // Purple color
    ctx.globalAlpha = 0.6;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // Draw all brush strokes
    brushStrokes.forEach(stroke => {
      if (stroke.points.length >= 4) {
        ctx.lineWidth = stroke.brushSize;
        ctx.beginPath();
        ctx.moveTo(stroke.points[0], stroke.points[1]);
        
        for (let i = 2; i < stroke.points.length; i += 2) {
          ctx.lineTo(stroke.points[i], stroke.points[i + 1]);
        }
        ctx.stroke();
      }
    });

    // Draw current stroke being drawn
    if (currentStroke.length >= 2) {
      ctx.lineWidth = brushSize;
      ctx.beginPath();
      ctx.moveTo(currentStroke[0].x, currentStroke[0].y);
      
      for (let i = 1; i < currentStroke.length; i++) {
        ctx.lineTo(currentStroke[i].x, currentStroke[i].y);
      }
      ctx.stroke();
    }

    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = 'source-over';
  }, [brushStrokes, showMasks, currentStroke, brushSize]);

  const getCanvasCoordinates = (event: MouseEvent | TouchEvent): { x: number; y: number } => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    let clientX: number, clientY: number;

    if ('touches' in event) {
      // Touch event
      clientX = event.touches[0].clientX;
      clientY = event.touches[0].clientY;
    } else {
      // Mouse event
      clientX = event.clientX;
      clientY = event.clientY;
    }

    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY
    };
  };

  const startDrawing = (event: React.MouseEvent | React.TouchEvent) => {
    event.preventDefault();
    setIsDrawing(true);
    
    const coords = getCanvasCoordinates(event.nativeEvent as MouseEvent | TouchEvent);
    setLastPoint(coords);
    setCurrentStroke([coords]);
  };

  const draw = (event: React.MouseEvent | React.TouchEvent) => {
    event.preventDefault();
    if (!isDrawing || !lastPoint) return;

    const coords = getCanvasCoordinates(event.nativeEvent as MouseEvent | TouchEvent);
    
    // Add point to current stroke
    setCurrentStroke(prev => [...prev, coords]);
    setLastPoint(coords);
    
    // Redraw to show the current stroke
    redrawMask();
  };

  const stopDrawing = () => {
    if (!isDrawing || currentStroke.length < 2) {
      setIsDrawing(false);
      setCurrentStroke([]);
      return;
    }

    // Convert current stroke to the format expected by AppStore
    const points: number[] = [];
    currentStroke.forEach(point => {
      points.push(point.x, point.y);
    });

    // Add stroke to AppStore
    const stroke = {
      id: generateId(),
      points,
      brushSize,
      color: '#A855F7'
    };

    addBrushStroke(stroke);
    
    // Reset drawing state
    setIsDrawing(false);
    setCurrentStroke([]);
    setLastPoint(null);
  };

  return (
    <div className={`relative ${className}`}>
      {/* Hidden image for reference */}
      <img
        ref={imageRef}
        src={imageUrl}
        alt="Mask reference"
        className="hidden"
      />
      
      {/* Canvas for mask painting */}
      <canvas
        ref={canvasRef}
        className="w-full h-auto cursor-crosshair touch-none"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
        style={{ maxWidth: '100%', height: 'auto' }}
      />
    </div>
  );
}
