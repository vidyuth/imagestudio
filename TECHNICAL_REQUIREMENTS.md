# 🔧 Technical Requirements Document - ImageStudio Backend Integration

## 📋 Project Overview

**Goal**: Integrate NanoBananaEditor's AI image editing capabilities into ImageStudio with a simplified versioning workflow.

**User Flow**: Upload → Auto-process to Version 1 → Paint + Edit → Version 2+ → Repeat

**Timeline**: ~1 week development

---

## 🎯 Core Functions from NanoBananaEditor We Need

### **1. Essential Backend Services**

#### **From `nano-backend/services/geminiService.ts`:**
```typescript
// Primary function we need
async function editImage(params: {
  baseImage: string,      // Base64 or URL
  mask?: string,          // Base64 mask (painted areas)
  prompt: string,         // User description
  temperature?: number,   // Creativity level
  seed?: number          // Reproducibility
}): Promise<string>      // Returns edited image as base64

// Secondary functions (nice to have)
async function generateImage(prompt: string): Promise<string>
async function validateApiKey(): Promise<boolean>
```

#### **From `nano-backend/services/imageProcessing.ts`:**
```typescript
// Image utilities we need
function resizeImage(base64: string, maxSize: number): string
function convertToBase64(file: File): Promise<string>
function createMaskFromCanvas(canvas: HTMLCanvasElement): string
function overlayMask(image: string, mask: string): string
```

#### **From `nano-backend/services/cacheService.ts`:**
```typescript
// Optional - for performance
function cacheImage(key: string, imageData: string): void
function getCachedImage(key: string): string | null
function clearCache(): void
```

### **2. State Management Functions**

#### **From `nano-backend/store/useAppStore.ts`:**
```typescript
// Version management (our simplified approach)
interface ImageVersion {
  id: string
  imageData: string     // Base64
  prompt: string
  timestamp: number
  parentId?: string     // For branching
}

// Store functions we need
addVersion(version: ImageVersion): void
selectVersion(id: string): void
getVersionHistory(): ImageVersion[]
deleteVersion(id: string): void
```

### **3. Canvas/Painting Functions**

#### **From `nano-backend/hooks/useImageGeneration.ts`:**
```typescript
// Mask painting functionality
interface BrushStroke {
  x: number
  y: number
  size: number
  pressure?: number
}

// Canvas functions we need
function addBrushStroke(stroke: BrushStroke): void
function clearMask(): void
function getMaskAsBase64(): string
function setBrushSize(size: number): void
function toggleMaskVisibility(): void
```

---

## 🏗️ Integration Mapping

### **Phase 1: Basic Integration (Day 1)**

#### **Connect PromptComposer to Backend**
```typescript
// In PromptComposer.tsx - modify onStageIt handler
const handleStageIt = async (prompt: string) => {
  const selectedVersion = getCurrentVersion()
  const maskData = getMaskFromCanvas()
  
  const newImageData = await geminiService.editImage({
    baseImage: selectedVersion.imageData,
    mask: maskData,
    prompt: prompt,
    temperature: 0.7
  })
  
  const newVersion: ImageVersion = {
    id: generateId(),
    imageData: newImageData,
    prompt: prompt,
    timestamp: Date.now(),
    parentId: selectedVersion.id
  }
  
  addVersion(newVersion)
  selectVersion(newVersion.id)
}
```

#### **Upload Auto-processing**
```typescript
// In ImageUpload.tsx - auto-process uploaded image
const handleFileUpload = async (file: File) => {
  const base64 = await convertToBase64(file)
  
  // Auto-process to Version 1 (optional enhancement)
  const processedImage = await geminiService.editImage({
    baseImage: base64,
    prompt: "Enhance and optimize this image",
    temperature: 0.3
  })
  
  const version1: ImageVersion = {
    id: generateId(),
    imageData: processedImage,
    prompt: "Original upload (enhanced)",
    timestamp: Date.now()
  }
  
  addVersion(version1)
  navigateToEditScreen()
}
```

### **Phase 2: Canvas Implementation (Days 2-3)**

#### **Paint Tool Integration**
```typescript
// New component: PaintCanvas.tsx
export function PaintCanvas({ 
  imageData, 
  onMaskChange,
  brushSize = 20,
  isVisible = true 
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  
  // Canvas painting logic
  const handleMouseDown = (e) => { /* Start drawing */ }
  const handleMouseMove = (e) => { /* Continue drawing */ }
  const handleMouseUp = () => { /* Stop drawing */ }
  
  return (
    <canvas
      ref={canvasRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      className="absolute inset-0 z-10"
    />
  )
}
```

#### **Integrate Paint Tool with Toolbar**
```typescript
// In EditScreenToolbar.tsx - connect PaintRoller button
const handlePaintRoller = () => {
  setIsPaintMode(!isPaintMode)
  // Show/hide paint canvas overlay
}
```

### **Phase 3: History Management (Day 4)**

#### **Enhanced History Panel**
```typescript
// Update history panel to show versions
function VersionHistory({ versions, selectedId, onSelect }) {
  return (
    <div className="space-y-2">
      {versions.map(version => (
        <div 
          key={version.id}
          className={`p-2 border rounded ${selectedId === version.id ? 'bg-blue-100' : ''}`}
          onClick={() => onSelect(version.id)}
        >
          <img src={version.imageData} className="w-16 h-16 object-cover" />
          <p className="text-xs">{version.prompt}</p>
          <p className="text-xs text-gray-500">
            {new Date(version.timestamp).toLocaleTimeString()}
          </p>
        </div>
      ))}
    </div>
  )
}
```

---

## 📁 File Structure Plan

### **New Files to Create:**
```
client/src/
├── services/
│   ├── geminiService.ts       # AI API integration
│   ├── imageProcessing.ts     # Image utilities  
│   └── cacheService.ts        # Optional caching
├── store/
│   └── useVersionStore.ts     # Version management
├── components/
│   ├── PaintCanvas.tsx        # Mask painting component
│   └── VersionHistory.tsx     # Enhanced history panel
├── hooks/
│   ├── useImageEditing.ts     # Main editing logic
│   └── usePaintCanvas.ts      # Canvas painting logic
└── types/
    └── imageTypes.ts          # TypeScript interfaces
```

### **Files to Modify:**
```
client/src/components/
├── PromptComposer.tsx         # Connect onStageIt to backend
├── EditScreenToolbar.tsx      # Add paint mode toggle
├── ImageUpload.tsx            # Add auto-processing
└── BeforeAfterSlider.tsx      # Connect to version store

client/src/pages/
├── EditScreen.tsx             # Add canvas overlay
└── EditScreen.mobile.tsx      # Mobile canvas support
```

---

## 🔧 Environment Setup Required

### **1. Dependencies to Install:**
```bash
npm install @google/generative-ai  # Gemini API
npm install fabric                 # Canvas library (alternative)
npm install zustand               # State management (or keep existing)
npm install uuid                  # ID generation
```

### **2. Environment Variables:**
```env
VITE_GEMINI_API_KEY=your_api_key_here
VITE_GEMINI_MODEL=gemini-2.5-flash-image-preview
```

### **3. API Key Setup:**
- Get Gemini API key from Google AI Studio
- Add to environment variables
- Test API connection

---

## 🚀 Implementation Checklist

### **Pre-Development:**
- [ ] Review NanoBananaEditor code in `nano-backend/`
- [ ] Set up Gemini API key
- [ ] Install required dependencies
- [ ] Create file structure

### **Phase 1: Core Integration**
- [ ] Extract `geminiService.ts` from nano-backend
- [ ] Create `useVersionStore.ts` for state management
- [ ] Connect PromptComposer to backend
- [ ] Test basic edit functionality

### **Phase 2: Canvas Painting**
- [ ] Create `PaintCanvas.tsx` component
- [ ] Implement brush painting logic
- [ ] Connect to EditScreenToolbar
- [ ] Add mask visibility toggle

### **Phase 3: Version Management**
- [ ] Enhance history panel for versions
- [ ] Add version selection logic
- [ ] Implement branching from any version
- [ ] Add version deletion

### **Phase 4: Polish & Testing**
- [ ] Mobile canvas support
- [ ] Error handling and loading states
- [ ] Performance optimization
- [ ] User testing and refinement

---

## 🎨 UI/UX Considerations

### **Canvas Integration:**
- Overlay canvas on top of image
- Semi-transparent mask visualization
- Touch-friendly on mobile
- Brush size controls
- Clear mask button

### **Version Display:**
- Thumbnail grid in history panel
- Version numbering (V1, V2, V3...)
- Timestamp and prompt display
- Quick comparison between versions

### **User Feedback:**
- Loading states during AI processing
- Progress indicators
- Error messages for API failures
- Success confirmations

---

## 🔍 Testing Strategy

### **Unit Tests:**
- Image processing functions
- Version store operations
- Canvas painting logic

### **Integration Tests:**
- Full edit workflow
- API connectivity
- State persistence

### **User Testing:**
- Real estate agent workflow
- Mobile usability
- Performance on large images

---

## 📚 Reference Documentation

### **NanoBananaEditor Files to Study:**
- `nano-backend/services/geminiService.ts` - API integration patterns
- `nano-backend/store/useAppStore.ts` - State management approach
- `nano-backend/hooks/useImageGeneration.ts` - Edit workflow logic
- `nano-backend/utils/imageUtils.ts` - Image processing utilities

### **External Resources:**
- [Gemini API Documentation](https://ai.google.dev/docs)
- [HTML5 Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [Zustand Documentation](https://github.com/pmndrs/zustand)

---

## 🎯 Success Criteria

### **Minimum Viable Product:**
- [ ] Upload image → Edit with prompt → See result
- [ ] Basic mask painting functionality
- [ ] Version history with selection

### **Full Feature Set:**
- [ ] Multi-version workflow with branching
- [ ] Mobile-optimized canvas painting
- [ ] Performance optimization for large images
- [ ] Comprehensive error handling

### **User Experience Goals:**
- [ ] Intuitive workflow (no mode confusion)
- [ ] Fast response times (< 30 seconds per edit)
- [ ] Mobile-friendly interface
- [ ] Professional results for real estate use case

---

**Ready for implementation! This document serves as the complete blueprint for the next development phase.**
