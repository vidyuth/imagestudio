# Design Guidelines: Image Staging Application

## Design Approach
**System-Based Approach**: Following shadcn's amber minimal theme with utility-focused design principles for a productivity-oriented image editing tool.

## Core Design Elements

### Color Palette
- **Primary**: Uses shadcn amber minimal theme's primary tokens for logo and primary buttons
- **Background**: Clean neutral backgrounds following shadcn's default color system
- **Accent**: Minimal use of accent colors, relying on the amber theme's built-in hierarchy

### Typography
- **Font Family**: Inter (shadcn default)
- **Hierarchy**: shadcn's text size tokens (text-sm, text-base, text-lg, text-xl)
- **Weight**: Regular (400) for body text, medium (500) for labels, semibold (600) for headings

### Layout System
- **Spacing**: Primarily 8px units (space-2, space-4, space-6, space-8) for consistency
- **Grid**: Center-aligned content with max-width containers
- **Responsive**: Mobile-first approach with proper breakpoints

### Component Library

#### Header
- Logo on left using primary color
- Navigation links on far right
- Two buttons: primary "Sign Up" and outline "Login"
- Clean, minimal spacing

#### Content Area
- **Upload Section**: Drag-and-drop interface supporting max 2 images (PNG, JPG, WEBP)
- **Image Cards**: Two cards displaying uploaded files with file details
- **Accordion**: "Preset" heading with room buttons (Living Room, Dining Room, Bedroom, Kitchen)
- **Prompt Composer**: Label with text input and primary "Stage It" button

#### Second Screen (After Animation)
- **Before/After Slider**: Interactive slider showing original vs edited image
- **Toolbar**: Control bar above the image preview
- **Same Layout**: Maintains header/footer consistency

#### Footer
- Simple placeholder footer maintaining layout balance

### Animations
- **Slide Transition**: Smooth horizontal slide animation when "Stage It" is clicked
- **Duration**: 300-400ms ease-in-out transition
- **Direction**: Content slides left to reveal new section

### Mobile Responsiveness
- Stack navigation items vertically on mobile
- Adjust image card layout for smaller screens
- Maintain accordion and prompt composer usability
- Ensure before/after slider works on touch devices

### Key Design Principles
1. **Utility-First**: Prioritize functionality over decorative elements
2. **Consistency**: Maintain shadcn's design language throughout
3. **Clarity**: Clear visual hierarchy using spacing and typography
4. **Efficiency**: Streamlined workflow from upload to editing preview