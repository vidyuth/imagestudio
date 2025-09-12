# Design Guidelines: Image Staging Application

## Design Approach
**System-Based Approach**: Following shadcn's design system with OKLCH color space for modern, accessible color management. Utility-focused design principles for a productivity-oriented image editing tool with mobile-first responsive design.

## Core Design Elements

### Color Palette
- **Color System**: OKLCH color space with CSS custom properties for precise, perceptually uniform colors
- **Primary**: Orange-based primary colors (oklch(0.6838 0.1739 37.8994)) for branding and call-to-action elements
- **Background**: Clean neutral backgrounds using OKLCH values for better color consistency
- **Theme Support**: Full dark/light mode support with smooth View Transitions API animations
- **Accent**: Minimal use of accent colors, maintaining visual hierarchy through the OKLCH system

### Typography
- **Font Family**: Poppins (Google Fonts) - modern, friendly, and highly readable across devices
- **Hierarchy**: shadcn's text size tokens (text-sm, text-base, text-lg, text-xl) 
- **Weight**: Regular (400) for body text, medium (500) for labels, semibold (600) for headings
- **Mobile Optimization**: Optimized font sizes and line heights for mobile readability

### Layout System
- **Spacing**: Primarily 8px units (space-2, space-4, space-6, space-8) for consistency
- **Grid**: Center-aligned content with max-width containers
- **Responsive**: Mobile-first approach with proper breakpoints using useIsMobile hook
- **Header Height**: Standardized 48px height (h-12) across all screens
- **Mobile Considerations**: Touch-friendly button sizes (minimum 44px target areas)

### Component Library

#### Global Header
- **Branding**: "Staged" logo on left using primary orange color
- **Navigation**: Features, Pricing, Help links (desktop) / Hamburger menu (mobile)
- **Authentication**: Primary "Sign Up" and outline "Login" buttons
- **Theme Toggle**: Sun/Moon icon with smooth View Transitions API animation
- **Mobile Layout**: Responsive hamburger menu with proper z-index layering
- **Height**: Fixed 48px height with 8px padding for consistency

#### Content Area
- **Upload Section**: Drag-and-drop interface supporting max 2 images (PNG, JPG, WEBP)
- **Image Cards**: Two cards displaying uploaded files with file details and remove functionality
- **Room Presets**: Accordion-style "Preset" section with room buttons (Living Room, Dining Room, Bedroom, Kitchen)
- **Prompt Composer**: Label with text input and primary "Stage It" button
- **Centralized Labels**: All text content managed through LABELS configuration system

#### EditScreen Layout

##### Desktop Version
- **Header Integration**: Uses global header component for consistency
- **Tab System**: Before & After / Edit mode toggle in center header area
- **Toolbar**: Top toolbar with Share, Download, Undo, Redo, Reset controls
- **Sidebar**: 320px right sidebar (w-80) containing editing tools and version history
- **Image Canvas**: Central area for before/after slider or editing interface
- **Download Section**: Bottom section with "Download This Version" button

##### Mobile Version (Responsive)
- **Detection**: Automatic mobile detection using useIsMobile hook (768px breakpoint)
- **Streamlined Flow**: Direct transition from "Stage It" to unified edit interface
- **Single Toolbar Layout**: 
  - Left Group: Back button (CornerUpLeft) | Visual separator | Editing tools cluster
    - Paint Roller icon (ghost button) - Future painting functionality
    - Eraser icon (ghost button) - Future erasing functionality  
    - Layers2 icon (toggle button) - Active state controls overlay mode
    - History icon (ghost button) - Opens version history drawer
  - Right: Primary Download button with icon and label
- **Visual Hierarchy**: Clean separator line between back navigation and editing tools
- **Overlay Comparison System**:
  - **Toggle State**: Layers icon pressed = overlay mode active, shows opacity slider
  - **Side-by-Side Mode**: Layers icon unpressed = traditional split comparison view
  - **Opacity Control**: Bottom-positioned slider with "Before" and "After" labels for thumb-friendly access
  - **Image Labels**: Dynamic percentage indicators in overlay mode (Before 30% | After 70%)
- **Image Display**: Full-width ScrollArea with proper image containment
  - Overlay rendering with proper opacity blend modes
  - Responsive image scaling maintaining aspect ratios
  - Touch-friendly zoom and pan capabilities
- **Version History Drawer**: Bottom drawer preserving original functionality:
  - Title: "Reference Image"  
  - Large preview area for selected version
  - 3 thumbnail grid (Edit #1, #2, #3) with selection states
  - Prompt display showing original text for each version
  - Action buttons: Download This Version, Edit this image, Delete
- **Mobile Ergonomics**:
  - Opacity slider positioned at bottom to avoid hand occlusion
  - Touch targets minimum 44px for accessibility compliance
  - Single-handed operation optimized layout
  - No redundant header text to maximize image viewing space

#### Streamlined User Flow
- **Upload → Edit**: Direct transition eliminating tab confusion
- **Unified Interface**: Both comparison and editing in single coherent view
- **Tool Integration**: Essential editing tools always accessible without mode switching
- **Progressive Enhancement**: Overlay toggle provides advanced comparison without complexity

#### Version History System
- **Maximum Versions**: Limited to 3 versions for optimal mobile UX
- **Naming Convention**: Edit #1, Edit #2, Edit #3
- **Preview System**: Large preview updates when thumbnail is selected
- **Prompt Display**: Shows original prompt for each version
- **Selection States**: Visual feedback with primary border for active version
- **Mobile Access**: History icon in unified toolbar opens bottom drawer interface

#### Toolbar Design Philosophy
- **Functional Grouping**: Visual separation between navigation, editing tools, and actions
- **Icon Consistency**: Lucide icons throughout for visual coherence
- **State Management**: Toggle buttons show clear active/inactive states
- **Accessibility**: Ghost button styling for secondary actions, primary styling for main CTA
- **Space Efficiency**: Single row eliminates redundant headers while maintaining tool access

#### Footer
- Simple placeholder footer maintaining layout balance
- Consistent with overall design system

### Animations & Interactions

#### Theme Switching
- **Technology**: Custom View Transitions API implementation with CSS fallbacks
- **Animation**: Smooth color transitions using CSS custom properties
- **Duration**: 300ms ease-in-out transitions
- **Fallback**: Graceful degradation for browsers without View Transitions support

#### Page Transitions
- **Slide Transition**: Smooth horizontal slide animation when "Stage It" is clicked
- **Duration**: 300-400ms ease-in-out transition using Framer Motion
- **Direction**: Content slides left to reveal EditScreen section
- **States**: AnimatePresence for proper exit/enter animations

#### Component Interactions
- **Sheet Panels**: Slide-in animations for mobile tool panels
- **Drawer**: Bottom-up animation for history drawer
- **Button States**: Hover and active states with smooth transitions
- **Toggle Components**: Visual feedback for Before/After and Edit mode switches

### Mobile Responsiveness

#### Breakpoints
- **Mobile Detection**: useIsMobile hook with 768px breakpoint
- **Component Switching**: Conditional rendering between desktop/mobile layouts
- **Touch Interactions**: Optimized for mobile gestures and touch targets

#### Mobile-Specific Features
- **Navigation**: Hamburger menu in global header
- **Edit Tools**: Floating panels to maximize image viewing area
- **Version History**: Bottom drawer for easy thumb navigation
- **Button Sizing**: Minimum 44px touch targets for accessibility
- **Image Display**: Full-width responsive images with proper aspect ratios

### Technical Architecture

#### Component Organization
- **Responsive Strategy**: Separate mobile components (EditScreen.mobile.tsx)
- **Shared Logic**: Common functionality between desktop/mobile versions
- **State Management**: Consistent state handling across responsive breakpoints

#### shadcn Integration
- **Component Library**: Full shadcn/ui v4 component usage
- **Customization**: Proper component variants and size configurations
- **Theming**: CSS custom properties integration with shadcn's design tokens

### Key Design Principles
1. **Mobile-First**: Priority on mobile experience with streamlined single-screen workflow
2. **Utility-First**: Essential functionality over decorative elements, unified toolbar approach
3. **Consistency**: Maintain shadcn's design language with custom OKLCH color system
4. **Clarity**: Clear visual hierarchy using functional grouping and proper spacing
5. **Efficiency**: Direct upload-to-edit flow with integrated comparison and editing tools
6. **Accessibility**: Touch-friendly targets, clear states, proper contrast ratios
7. **Performance**: Optimized overlay rendering and responsive image handling
8. **Ergonomics**: Hand-friendly control positioning for optimal mobile usability
9. **Progressive Enhancement**: Advanced features (overlay mode) discoverable but not required

### Color Accessibility
- **OKLCH Benefits**: Perceptually uniform color space for better accessibility
- **Contrast Ratios**: Meeting WCAG guidelines across light/dark themes
- **Color Blindness**: Tested color combinations for various color vision types
- **Theme Consistency**: Seamless light/dark mode transitions with proper contrast

### User Experience Patterns
- **Streamlined Flow**: Single-screen editing eliminating mode confusion
- **Progressive Disclosure**: Advanced features (overlay mode) discoverable through toggle
- **Contextual Actions**: Version-specific actions accessible via history drawer
- **Immediate Feedback**: Visual confirmation for tool states and opacity changes
- **Touch Optimization**: Ergonomic control placement preventing hand occlusion
- **Error Prevention**: Clear UI states and logical tool grouping