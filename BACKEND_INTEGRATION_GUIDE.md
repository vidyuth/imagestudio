# 🚀 Backend Integration Guide for ImageStudio

## 📋 Current State Summary - Our Frontend (ImageStudio)

### ✅ Completed Frontend Features:
- **Clean EditScreen.tsx** - Removed unnecessary AI editing features
- **Shared EditScreenToolbar** - Reusable component for mobile/desktop
- **Mobile/Desktop Responsiveness** - Proper responsive design with `useIsMobile()`
- **Before/After Image Comparison** - Using ReactCompareSlider
- **History Panel** - Optimized spacing and layout
- **Sticky Headers** - Better navigation UX during scroll
- **File Upload System** - Basic file handling in ImageUpload component
- **Routing** - Home page → EditScreen transition working

### 🏗️ Current Frontend Architecture:
```
client/src/
├── components/
│   ├── EditScreenToolbar.tsx     # Shared toolbar (mobile/desktop variants)
│   ├── ImageUpload.tsx           # File upload component
│   ├── BeforeAfterSlider.tsx     # Image comparison component  
│   └── ui/                       # shadcn/ui components
├── pages/
│   ├── Home.tsx                  # Landing/upload page
│   ├── EditScreen.tsx            # Main edit interface (desktop)
│   └── EditScreen.mobile.tsx     # Mobile edit interface
├── hooks/
│   └── use-mobile.tsx            # Mobile detection hook
└── lib/
    └── utils.ts                  # Utility functions
```

---

## 🎯 Target Backend Integration - From NanoBananaEditor

### 📚 Reference Project: NanoBananaEditor
- **GitHub**: https://github.com/markfulton/NanoBananaEditor
- **Live Demo**: https://nanobananaeditor.dev/
- **Purpose**: Production-ready AI image editor using Gemini 2.5 Flash Image
- **License**: AGPL-3.0

### 🔑 Key Features to Integrate:

#### ✅ CORRECTED WORKFLOW - No Generate Needed:
**ImageStudio Flow**: Upload → Edit Mode → Update (trigger AI editing)
- **Upload Image**: User uploads existing image (real estate photo, room, etc.)
- **Direct Edit Mode**: Automatically transition to edit interface
- **Prompt Input**: Describe desired changes (already in our UI)
- **Paint Tool**: Mask areas to edit (need to verify in our UI)
- **Update Button**: Triggers backend edit functionality (not generate)

**Real Estate Example**: 
- Upload bland living room photo
- Mask the empty areas
- Prompt: "Add modern furniture and decorations"
- Update → AI edits only masked areas

#### 1. **AI Image Editing** (Primary Need)
- **Model**: `gemini-2.5-flash-image-preview`
- **Input**: Reference image + text prompt + mask selection
- **Output**: 1024×1024 PNG with edits applied only to masked areas
- **Parameters**: Temperature (creativity), seed (reproducibility)

#### 2. **AI Image Editing**
- **Conversational Editing**: Natural language instructions
- **Region-Aware Selection**: Paint masks for targeted editing
- **Style References**: Upload reference images for style guidance
- **Non-Destructive**: Preserves original image

#### 3. **Interactive Canvas System**
- **Brush Tools**: Variable brush sizes for mask painting
- **Canvas Interactions**: Zoom, pan, navigation
- **Mask Visualization**: Show/hide painted regions
- **Touch Optimized**: Mobile-friendly interactions

---

## 🛠️ Backend Services to Extract

### 1. **GeminiService** (`src/services/geminiService.ts`)
```typescript
// Core API integration
export class GeminiService {
  async generateImage(request: GenerationRequest): Promise<string[]>
  async editImage(request: EditRequest): Promise<string[]>
  async segmentImage(request: SegmentationRequest): Promise<any>
}

// Request/Response interfaces
interface GenerationRequest {
  prompt: string;
  referenceImages?: string[]; // base64 array
  temperature?: number;
  seed?: number;
}

interface EditRequest {
  instruction: string;
  originalImage: string; // base64
  referenceImages?: string[]; // base64 array
  maskImage?: string; // base64 mask
  temperature?: number;
  seed?: number;
}
```

### 2. **ImageProcessing** (`src/services/imageProcessing.ts`)
```typescript
export class ImageProcessor {
  static async createMaskFromClick(image: HTMLImageElement, x: number, y: number): Promise<SegmentationMask>
  static applyFeathering(mask: SegmentationMask, featherRadius: number): ImageData
  static imageDataToBase64(imageData: ImageData): string
}
```

### 3. **CacheService** (`src/services/cacheService.ts`)
```typescript
export class CacheService {
  static async saveProject(project: Project): Promise<void>
  static async getProject(id: string): Promise<Project | null>
  static async cacheAsset(asset: Asset, data: Blob): Promise<void>
  static async getCachedAsset(assetId: string): Promise<{ asset: Asset; data: Blob } | null>
}
```

### 4. **State Management** (`src/store/useAppStore.ts`)
```typescript
interface AppState {
  // Project & Generation Management
  currentProject: Project | null;
  selectedGenerationId: string | null;
  selectedEditId: string | null;
  
  // Canvas & Image State
  canvasImage: string | null;
  canvasZoom: number;
  canvasPan: { x: number; y: number };
  
  // Brush & Mask System
  brushStrokes: BrushStroke[];
  brushSize: number;
  showMasks: boolean;
  
  // Generation Parameters
  currentPrompt: string;
  temperature: number;
  seed: number | null;
  isGenerating: boolean;
}
```

### 5. **Custom Hooks** (`src/hooks/useImageGeneration.ts`)
```typescript
export const useImageGeneration = () => {
  const { generate, isGenerating, error } = useMutation({
    mutationFn: async (request: GenerationRequest) => {
      const images = await geminiService.generateImage(request);
      return images;
    }
  });
  return { generate, isGenerating, error };
};

export const useImageEditing = () => {
  const { edit, isEditing, error } = useMutation({
    mutationFn: async (instruction: string) => {
      // Create mask from brush strokes
      // Send edit request to Gemini
      // Return edited images
    }
  });
  return { edit, isEditing, error };
};
```

---

## 📊 Data Models & Types

### Core Data Structures:
```typescript
interface Asset {
  id: string;
  type: 'original' | 'mask' | 'output';
  url: string;
  mime: string;
  width: number;
  height: number;
  checksum: string;
}

interface Generation {
  id: string;
  prompt: string;
  parameters: { seed?: number; temperature?: number; };
  sourceAssets: Asset[];      // Reference images
  outputAssets: Asset[];      // Generated results
  modelVersion: string;
  timestamp: number;
}

interface Edit {
  id: string;
  parentGenerationId: string;
  maskAssetId?: string;
  maskReferenceAsset?: Asset;
  instruction: string;
  outputAssets: Asset[];
  timestamp: number;
}

interface Project {
  id: string;
  title: string;
  generations: Generation[];
  edits: Edit[];
  createdAt: number;
  updatedAt: number;
}

interface BrushStroke {
  id: string;
  points: number[];    // [x1, y1, x2, y2, ...] coordinate pairs
  brushSize: number;
  color: string;
}
```

---

## 🔧 Environment Configuration

### Required Environment Variables:
```bash
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

### API Configuration:
- **Model**: `gemini-2.5-flash-image-preview`
- **Output Format**: 1024×1024 PNG
- **Input Formats**: PNG, JPEG, WebP
- **Temperature Range**: 0-1 (0 = deterministic, 1 = creative)

---

## 🎯 Integration Workflow

### Phase 1: Core API Integration
1. **Extract GeminiService** → Add to our `server/` directory
2. **Add Environment Config** → Update `.env` with Gemini API key
3. **Create API Routes** → `/api/generate`, `/api/edit` endpoints
4. **Test Basic Generation** → Text-to-image functionality

### Phase 2: Image Editing System
1. **Canvas Integration** → Interactive brush tools for masking
2. **Mask Processing** → Convert brush strokes to base64 masks
3. **Edit Workflow** → Original image + mask + instruction → edited result
4. **Before/After Display** → Show results in our ReactCompareSlider

### Phase 3: Project Management
1. **History System** → Track generations and edits
2. **Asset Management** → Store and retrieve images
3. **Caching Layer** → IndexedDB for offline access
4. **Project Persistence** → Save/load user projects

### Phase 4: Advanced Features
1. **Reference Images** → Support for style guidance
2. **Keyboard Shortcuts** → Efficient workflow navigation
3. **Mobile Optimization** → Touch-friendly mask painting
4. **Performance** → Image compression and lazy loading

---

## 🚨 Critical Integration Points

### 1. **File Upload Flow**
- **Current**: Basic file selection in ImageUpload component
- **Target**: Convert to base64, validate formats, handle multiple files
- **Code Location**: `client/src/components/ImageUpload.tsx`

### 2. **EditScreen Integration**
- **Current**: Mock before/after images with ReactCompareSlider
- **Target**: Real generated/edited images from Gemini API
- **Code Location**: `client/src/pages/EditScreen.tsx`

### 3. **Canvas System**
- **Missing**: Interactive brush tools for mask painting
- **Need**: Konva.js or similar canvas library for brush interactions
- **Target**: Paint masks → convert to base64 → send to API

### 4. **State Management**
- **Current**: Basic React state
- **Target**: Zustand store for complex project/generation state
- **Need**: Migrate from local state to global store

---

## 📱 Mobile Considerations

### Touch Interactions:
- **Brush Tools**: Touch-friendly mask painting
- **Canvas Navigation**: Pinch-to-zoom, pan gestures
- **UI Adaptation**: Drawer-based panels for small screens

### Performance:
- **Image Compression**: Optimize for mobile bandwidth
- **Lazy Loading**: Load images on demand
- **Caching**: Store frequently used assets locally

---

## 🔐 Security & Production Notes

### API Security:
- **Current**: Direct client-side API calls (development only)
- **Production**: Backend proxy to hide API keys
- **Rate Limiting**: Implement usage quotas
- **Authentication**: User accounts for project management

### Asset Management:
- **Current**: Base64 data URLs (memory intensive)
- **Production**: Cloud storage (AWS S3, Cloudinary)
- **Caching**: IndexedDB for offline access
- **Compression**: Optimize image sizes

---

## 🎯 Next Steps for New Chat

### 1. **Immediate Actions**:
- Copy NanoBananaEditor backend folder into our workspace
- Extract core services (GeminiService, ImageProcessor, CacheService)
- Set up environment variables and API configuration

### 2. **Integration Priority**:
1. Basic image generation (text-to-image)
2. File upload and base64 conversion
3. Display generated images in our EditScreen
4. Add brush tools for mask painting
5. Implement image editing workflow

### 3. **Testing Strategy**:
- Start with simple text-to-image generation
- Test with our existing before/after comparison UI
- Gradually add mask painting and editing features
- Ensure mobile responsiveness throughout

---

## 💻 Development Environment

### Current Stack:
- **Frontend**: React 18 + TypeScript + Tailwind CSS
- **Build Tool**: Vite
- **Components**: shadcn/ui
- **State**: React hooks (ready to migrate to Zustand)
- **Routing**: React Router

### Integration Stack:
- **AI Service**: Google Generative AI SDK (Gemini 2.5 Flash Image)
- **State Management**: Zustand + React Query
- **Canvas**: Konva.js for interactive painting
- **Storage**: IndexedDB for offline caching
- **Image Processing**: Canvas API + custom utilities

---

## 🎯 UI Workflow Mapping: NanoBananaEditor vs ImageStudio

### � **CORRECTED WORKFLOW** - Upload → Edit → Update

#### **Our Actual Workflow**:
1. **Upload Image** → Immediate transition to Edit Mode
2. **Edit Mode Interface**:
   - Prompt input (✅ already exists)
   - Paint tool for masking (need to verify)
   - **Update button** (triggers edit, not generate)
3. **Result**: Edited image with changes applied only to masked areas

#### **Key UI Components We Need**:

| **Component** | **NanoBananaEditor Function** | **ImageStudio Status** | **Priority** |
|---------------|------------------------------|------------------------|--------------|
| **Prompt Input** | Text area for AI instructions | ✅ **EXISTS** - PromptComposer.tsx | ✅ Ready |
| **"Stage It" Button** | Triggers `geminiService.editImage()` | ✅ **EXISTS** - "Stage It" in PromptComposer | 🔥 **Need to connect to backend** |
| **Paint Tool** | Mask selection for editing areas | ✅ **EXISTS** - PaintRoller icon in toolbar | 🔥 **Need to implement painting canvas** |
| **Image Upload** | Upload reference image | ✅ **EXISTS** - ImageUpload component | ✅ Ready |
| **Before/After View** | Compare original vs edited | ✅ **EXISTS** - ReactCompareSlider | ✅ Ready |

### 📱 **Simplified Integration Requirements**

#### **1. Edit Functionality (Primary Need)**
| Button/Action | Current Status | Backend Function | Integration Need |
|---------------|----------------|------------------|------------------|
| **"Stage It"** button | ✅ PromptComposer.tsx | `geminiService.editImage()` | 🔥 **Connect onStageIt to backend** |
| **PaintRoller** tool | ✅ Icon exists in toolbar | Canvas mask painting | 🔥 **Add canvas painting functionality** |
| **File Upload** | ✅ ImageUpload.tsx | Reference image input | ✅ **Ready** |
| **Prompt Input** | ✅ Textarea in PromptComposer | Edit instructions | ✅ **Ready** |

#### **2. What We Actually Need to Build:**
1. **Connect "Stage It"** → NanoBananaEditor's edit functionality  
2. **Implement Paint Canvas** → Allow users to mask areas for editing
3. **Wire up image flow** → Upload → Edit → Display result

#### **3. What's Already Perfect:**
- ✅ **Upload workflow** - Direct transition to edit mode
- ✅ **Prompt input** - Text area for describing changes  
- ✅ **Before/after comparison** - ReactCompareSlider ready
- ✅ **Mobile/desktop responsive** - UI works on all devices

---

## 🎯 **INTEGRATION SUMMARY** - Minimal Requirements

### **Current Workflow is Almost Ready!**

**What works perfectly:**
1. User uploads image → Goes to EditScreen 
2. PromptComposer shows with textarea + "Stage It" button
3. Toolbar has PaintRoller icon for masking
4. ReactCompareSlider ready for before/after

**What needs backend connection:**
1. **"Stage It" button** → Connect to `geminiService.editImage()`
2. **PaintRoller tool** → Add canvas painting for masks
3. **Image flow** → Send uploaded image + prompt + mask to backend

### **Simplified Versioning System (Better than NanoBananaEditor):**

**Your Clean Workflow:**
1. **Upload** bland living room → **Version 1** (AI baseline processing)
2. **Paint furniture areas** + "Add modern sofa" → **Version 2** 
3. **Paint walls** + "Change to blue walls" → **Version 3**
4. **Select Version 1** + paint windows + "Add curtains" → **Version 4**

**Advantages over NanoBananaEditor:**
- ✅ **Intuitive versioning** - Users understand "Version 1, 2, 3"
- ✅ **Any version as base** - Can branch from any previous version
- ✅ **Single workflow** - No confusing Generate/Edit modes
- ✅ **Real estate perfect** - Progressive staging improvements

**Implementation:**
1. Upload → Auto-process to Version 1 ✅ 
2. Paint + Edit → Version 2 🔥
3. History shows all versions for selection ✅
4. Before/after comparison for any two versions ✅

### **Development Priority:**
1. **Phase 1**: Upload → Auto-generate Version 1 (1 day)
2. **Phase 2**: Paint canvas + Edit → Version 2+ (2-3 days)  
3. **Phase 3**: Version selection + History management (1 day)
4. **Phase 4**: Polish and optimize (1 day)

**Total estimate**: ~1 week for full integration

**Backend Connection:**
- Connect PromptComposer's `onStageIt` to `geminiService.editImage()`
- Pass: `currentVersion + paintedMask + prompt` → Get: `newVersion`
- Store each result as new version in history

#### **2. Canvas System (ImageCanvas)**
| Button/Action | Triggers | Backend Function | ImageStudio Equivalent |
|---------------|----------|------------------|------------------------|
| **Zoom In/Out** | `setCanvasZoom()` | Canvas navigation | ❌ **MISSING** - Need zoom controls |
| **Pan** | `setCanvasPan()` | Canvas navigation | ❌ **MISSING** - Need pan functionality |
| **Brush Tool** | `addBrushStroke()` | Mask painting | ❌ **MISSING** - Need brush system |
| **Show/Hide Masks** | `setShowMasks()` | Mask visibility | ❌ **MISSING** - Need mask toggle |
| **Clear Masks** | `clearBrushStrokes()` | Reset masks | ❌ **MISSING** - Need clear function |
| **Brush Size** | `setBrushSize()` | Adjust brush | ❌ **MISSING** - Need size control |

#### **3. History Panel (HistoryPanel)**
| Button/Action | Triggers | Backend Function | ImageStudio Equivalent |
|---------------|----------|------------------|------------------------|
| **Toggle History** | `setShowHistory()` | Panel visibility | ✅ **EXISTS** - History toggle button |
| **Select Generation** | `selectGeneration()` | Load image variant | ❌ **MISSING** - Need generation grid |
| **Select Edit** | `selectEdit()` | Load edited version | ❌ **MISSING** - Need edit history |
| **Download** | Download function | Save image | ❌ **MISSING** - Need download button |
| **Delete** | Remove from history | Asset cleanup | ❌ **MISSING** - Need delete function |

#### **4. Advanced Controls**
| Button/Action | Triggers | Backend Function | ImageStudio Equivalent |
|---------------|----------|------------------|------------------------|
| **Temperature Slider** | `setTemperature()` | AI creativity control | ❌ **MISSING** - Need creativity slider |
| **Seed Input** | `setSeed()` | Reproducible results | ❌ **MISSING** - Need seed control |
| **Model Selection** | API configuration | Model switching | ❌ **MISSING** - Usually fixed model |

#### **5. Keyboard Shortcuts**
| Shortcut | Triggers | Backend Function | ImageStudio Equivalent |
|----------|----------|------------------|------------------------|
| **E** | Switch to Edit mode | `setSelectedTool('edit')` | ❌ **MISSING** - Need keyboard hooks |
| **G** | Switch to Generate mode | `setSelectedTool('generate')` | ❌ **MISSING** - Need keyboard hooks |
| **M** | Switch to Mask mode | `setSelectedTool('mask')` | ❌ **MISSING** - Need keyboard hooks |
| **H** | Toggle history panel | `setShowHistory()` | ❌ **MISSING** - Need keyboard hooks |
| **P** | Toggle prompt panel | `setShowPromptPanel()` | ❌ **MISSING** - Need keyboard hooks |

---

### ✅ **What ImageStudio Currently Has**

#### **Existing UI Components:**
1. **✅ EditScreenToolbar** - Shared component with mobile/desktop variants
2. **✅ ImageUpload** - File selection and upload
3. **✅ BeforeAfterSlider** - ReactCompareSlider for image comparison
4. **✅ History Panel** - Basic structure with toggle button
5. **✅ Mobile Detection** - useIsMobile() hook
6. **✅ Responsive Design** - Mobile/desktop layouts

#### **Existing Buttons & Actions:**
1. **✅ Back Button** - `onBack()` navigation
2. **✅ History Toggle** - `onHistoryToggle()` panel visibility
3. **✅ Download Button** - Basic download functionality
4. **✅ Paint Roller Icon** - Ready for brush tool integration
5. **✅ Eraser Icon** - Ready for clear/reset functionality

---

### ❌ **What's Missing from ImageStudio**

#### **Critical Missing Components:**
1. **🔴 Generate Button** - Main text-to-image trigger
2. **🔴 Edit Button** - Image editing with instructions
3. **🔴 Tool Mode Selector** - Generate/Edit/Mask switching
4. **🔴 Prompt Input** - Text area for AI instructions
5. **🔴 Interactive Canvas** - Brush tools for mask painting
6. **🔴 Reference Image Upload** - Style guidance images
7. **🔴 Generation History Grid** - Variant selection
8. **🔴 Advanced Controls** - Temperature, seed, model settings

#### **Missing Functionality:**
1. **🔴 Brush System** - Paint masks for targeted editing
2. **🔴 Canvas Navigation** - Zoom, pan, reset
3. **🔴 Keyboard Shortcuts** - Efficient workflow navigation
4. **🔴 State Management** - Zustand store integration
5. **🔴 API Integration** - Gemini service connection
6. **🔴 Project Management** - Save/load generations and edits
7. **🔴 Asset Caching** - IndexedDB offline storage

---

### 🛠️ **Integration Priority Matrix**

#### **Phase 1: Core Generation (High Priority)**
- [ ] **Prompt Input Component** - Text area for AI instructions
- [ ] **Generate Button** - Connect to `geminiService.generateImage()`
- [ ] **Basic API Integration** - Environment setup + API calls
- [ ] **Result Display** - Show generated images in BeforeAfterSlider

#### **Phase 2: Image Editing (Medium Priority)**
- [ ] **Edit Mode Toggle** - Switch between generate/edit modes
- [ ] **Edit Button** - Connect to `geminiService.editImage()`
- [ ] **Canvas Integration** - Basic image display with editing capability
- [ ] **Brush Tools** - Paint masks for targeted editing

#### **Phase 3: Advanced Features (Lower Priority)**
- [ ] **Generation History** - Grid of variants with selection
- [ ] **Reference Images** - Style guidance upload
- [ ] **Advanced Controls** - Temperature, seed, model settings
- [ ] **Keyboard Shortcuts** - Efficient navigation
- [ ] **Project Management** - Save/load functionality

#### **Phase 4: Polish & Optimization (Final)**
- [ ] **Canvas Navigation** - Zoom, pan, reset tools
- [ ] **Asset Caching** - IndexedDB integration
- [ ] **Mobile Optimization** - Touch-friendly interactions
- [ ] **Performance** - Image compression, lazy loading

---

### 🎯 **Quick Integration Checklist**

#### **Immediate Actions (Start with these):**
1. **✅ Add Prompt Input** - Replace mock prompt with real text area
2. **✅ Add Generate Button** - Connect to backend API
3. **✅ Environment Setup** - Add VITE_GEMINI_API_KEY
4. **✅ API Integration** - Import and connect geminiService
5. **✅ State Management** - Migrate to Zustand store

#### **Current UI Mapping:**
```typescript
// Our Current EditScreenToolbar props:
interface EditScreenToolbarProps {
  onBack: () => void;              // ✅ Working
  onHistoryToggle: () => void;     // ✅ Working
  onDownload: () => void;          // ✅ Ready for backend
  onPaintRoller: () => void;       // ❌ Need brush system
  onEraser: () => void;            // ❌ Need clear function
  showHistory: boolean;            // ✅ Working
  variant: 'mobile' | 'desktop';   // ✅ Working
}

// Target: NanoBananaEditor Integration
interface TargetToolbarProps {
  onGenerate: () => void;          // ❌ MISSING - Priority 1
  onEdit: () => void;              // ❌ MISSING - Priority 1  
  onToolChange: (tool) => void;    // ❌ MISSING - Priority 2
  prompt: string;                  // ❌ MISSING - Priority 1
  onPromptChange: (text) => void;  // ❌ MISSING - Priority 1
  isGenerating: boolean;           // ❌ MISSING - Priority 1
  // ... existing props
}
```

This comprehensive mapping provides a clear roadmap for integrating NanoBananaEditor's functionality into our existing clean UI structure! 🚀
