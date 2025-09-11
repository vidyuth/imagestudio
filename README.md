# ImageStudio

A modern image editing application built with React, TypeScript, and Tailwind CSS featuring smooth theme animations and a responsive design.

## ✨ Features

- 🎨 **Modern UI/UX** - Clean interface with shadcn/ui components
- 🌓 **Smooth Theme Switching** - Beautiful circular animations using View Transitions API
- 📱 **Fully Responsive** - Mobile-first design with touch-friendly interactions
- 🎯 **OKLCH Color System** - Modern color space for consistent theming
- ⚡ **Fast Performance** - Vite-powered development and optimized builds
- 🔧 **TypeScript** - Full type safety throughout the application
- 🎭 **Poppins Typography** - Clean, modern font integration

## 🚀 Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Express.js, Node.js
- **Database**: Drizzle ORM with PostgreSQL
- **UI Components**: shadcn/ui
- **Build Tool**: Vite
- **Animation**: Custom View Transitions API implementation
- **State Management**: TanStack Query

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/ImageStudio.git
   cd ImageStudio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5000`

## 📁 Project Structure

```
ImageStudio/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   │   ├── ui/        # shadcn/ui components
│   │   │   └── ...        # Custom components
│   │   ├── pages/         # Application pages
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utility functions
│   │   └── config/        # Configuration files
├── server/                # Backend Express application
├── shared/                # Shared types and schemas
└── ...
```

## 🎨 Design System

### Colors (OKLCH)
- **Light Mode**: Clean whites and subtle grays
- **Dark Mode**: Rich darks with proper contrast
- **Primary**: Warm orange accent (#orange)
- **Secondary**: Cool blue highlights

### Typography
- **Font Family**: Poppins (Google Fonts)
- **Font Sizes**: Responsive scale from 12px to 64px
- **Font Weights**: 300, 400, 500, 600, 700

### Components
- All components follow shadcn/ui patterns
- Custom styling with Tailwind CSS
- Accessible design with proper ARIA labels

## 🌙 Theme Animation

The application features a custom theme switching animation using the modern View Transitions API:

- **Modern Browsers**: Circular expansion animation from the toggle button
- **Fallback**: Smooth CSS transitions for older browsers
- **Persistence**: Theme preference saved to localStorage
- **System Detection**: Automatically detects system theme preference

## 📱 Mobile Experience

- **Touch-Friendly**: Minimum 44px touch targets
- **Responsive Layout**: Breakpoint-based design
- **Mobile Menu**: Collapsible navigation for small screens
- **Optimized Performance**: Fast loading and smooth scrolling

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run check` - Run TypeScript checks
- `npm run db:push` - Push database schema changes

### Code Quality

- **TypeScript**: Strict type checking enabled
- **ESLint**: Code linting and formatting
- **Prettier**: Consistent code formatting

## 🚀 Deployment

The application is ready for deployment to various platforms:

- **Vercel**: Recommended for frontend
- **Railway/Render**: Good options for full-stack deployment
- **Docker**: Container support available

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the component system
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [React](https://react.dev/) for the framework
- [Vite](https://vitejs.dev/) for the build tool

---

**Built with ❤️ using modern web technologies**
