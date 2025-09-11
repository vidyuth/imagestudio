# Overview

ImageStage is a web application for AI-powered image editing and staging, specifically focused on room staging and design. The application allows users to upload images (up to 2 files), select room presets, input custom prompts, and view before/after comparisons of their edited images. Built with a modern React frontend and Express.js backend, it emphasizes a clean, productivity-focused user experience with smooth animations and intuitive workflows.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite for fast development and building
- **Routing**: Wouter for lightweight client-side routing
- **UI Components**: Comprehensive shadcn/ui component library with Radix UI primitives
- **Styling**: Tailwind CSS with custom design system following amber minimal theme
- **State Management**: React Query (@tanstack/react-query) for server state management
- **Animations**: Framer Motion for smooth page transitions and interactions
- **Form Handling**: React Hook Form with Zod validation resolvers

## Backend Architecture
- **Framework**: Express.js with TypeScript for API server
- **Database**: PostgreSQL with Neon Database serverless driver
- **ORM**: Drizzle ORM for type-safe database operations and migrations
- **Storage Interface**: Abstracted storage layer with in-memory implementation for development
- **Development**: Vite integration for hot module replacement in development mode

## Data Storage Solutions
- **Database**: PostgreSQL configured through Drizzle with schema-first approach
- **Schema Definition**: Centralized schema in `/shared/schema.ts` with Zod validation
- **Migrations**: Drizzle Kit for database schema migrations
- **Session Storage**: PostgreSQL-based session storage with connect-pg-simple

## Design System
- **Component Library**: shadcn/ui with "new-york" style variant
- **Color Palette**: Amber minimal theme with neutral backgrounds
- **Typography**: Inter font family with consistent sizing tokens
- **Spacing**: 8px-based spacing system for visual consistency
- **Responsive Design**: Mobile-first approach with proper breakpoints

## Core Features
- **Image Upload**: Drag-and-drop interface supporting PNG, JPG, WEBP (max 2 files)
- **Room Presets**: Predefined room types (Living Room, Dining Room, Bedroom, Kitchen)
- **Custom Prompts**: Text input for custom editing instructions
- **Before/After Comparison**: Interactive slider for comparing original vs edited images
- **Image Processing Workflow**: Smooth transitions between upload and edit screens

# External Dependencies

## Core Framework Dependencies
- **React Ecosystem**: React 18, React DOM, TypeScript
- **Build Tools**: Vite with React plugin and TypeScript support
- **Routing**: Wouter for lightweight client-side routing

## UI and Styling
- **Component Library**: Complete shadcn/ui component suite with Radix UI primitives
- **Styling**: Tailwind CSS with PostCSS and Autoprefixer
- **Icons**: Lucide React icon library
- **Animations**: Framer Motion for page transitions and interactions

## Backend and Database
- **Server**: Express.js with TypeScript compilation via tsx
- **Database**: Neon Database serverless PostgreSQL
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Session Management**: connect-pg-simple for PostgreSQL session storage

## Development and Tooling
- **Package Manager**: npm with package-lock.json
- **TypeScript**: Strict configuration with path mapping
- **Development**: Replit-specific plugins for development environment
- **Build Process**: esbuild for server bundling, Vite for client building

## State Management and Data Fetching
- **Server State**: TanStack React Query for caching and synchronization
- **Form Handling**: React Hook Form with Hookform Resolvers
- **Validation**: Zod schema validation library
- **Date Handling**: date-fns for date manipulation utilities

## Utility Libraries
- **CSS Utilities**: clsx and tailwind-merge for conditional styling
- **Class Variance Authority**: cva for component variant management
- **Command Palette**: cmdk for search and command interfaces
- **Carousel**: Embla Carousel React for image galleries