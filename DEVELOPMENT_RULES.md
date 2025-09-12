# ImageStudio Development Rules & Quality Checklist

## 🔍 Pre-Deployment Checklist

### 1. **UI Component Duplication Check**
- [ ] **Headers**: Ensure no duplicate headers in nested components
- [ ] **Footers**: Check for multiple footer instances
- [ ] **Navigation**: Verify single navigation bar
- [ ] **Toolbars**: Confirm no repeated toolbar elements

### 2. **Layout Structure Validation**
- [ ] **Mobile Responsiveness**: Test on mobile viewport (< 768px)
- [ ] **Desktop Layout**: Verify desktop layout (> 1024px)
- [ ] **Sticky Elements**: Ensure sticky headers don't overlap content
- [ ] **Z-index Conflicts**: Check layer ordering is correct

### 3. **Component Reusability**
- [ ] **DRY Principle**: No duplicate functionality across components
- [ ] **Shared Components**: Use shared components instead of copying code
- [ ] **Props Interface**: Consistent prop naming and typing
- [ ] **Variant System**: Use variants for different layouts (mobile/desktop)

### 4. **Routing & Navigation**
- [ ] **Route Testing**: Test all routes individually
- [ ] **Back Navigation**: Ensure back buttons work correctly
- [ ] **State Management**: Verify component state persists correctly
- [ ] **URL Parameters**: Check route parameters are handled properly

### 5. **Visual Testing**
- [ ] **Simple Browser Test**: Always test in Simple Browser before committing
- [ ] **Multiple Routes**: Test main routes: `/`, `/edit`, `/test-mobile`, `/test-desktop`
- [ ] **Cross-Component**: Verify shared components work in all contexts
- [ ] **Error States**: Check error boundaries and loading states

### 6. **Code Quality**
- [ ] **TypeScript Errors**: Zero TypeScript compilation errors
- [ ] **Import Cleanup**: Remove unused imports
- [ ] **Console Errors**: No runtime errors in browser console
- [ ] **Lint Warnings**: Address ESLint warnings

### 7. **Performance Checks**
- [ ] **Bundle Size**: Check for unnecessary dependencies
- [ ] **Image Optimization**: Verify image sizes and formats
- [ ] **Component Lazy Loading**: Use lazy loading where appropriate
- [ ] **Memory Leaks**: Clean up event listeners and subscriptions

## 🚨 Common Issues to Prevent

### Header/Navigation Duplication
```tsx
// ❌ BAD: Multiple headers
function HomePage() {
  return (
    <div>
      <Header />
      <main>
        <EditScreen /> {/* This also renders Header */}
      </main>
    </div>
  );
}

// ✅ GOOD: Single header responsibility
function HomePage() {
  return (
    <div>
      <Header />
      <main>
        <EditScreenContent /> {/* No header inside */}
      </main>
    </div>
  );
}
```

### Component Reusability
```tsx
// ❌ BAD: Duplicate toolbar code
function MobileEditScreen() {
  return <div>{/* Mobile toolbar code */}</div>;
}
function DesktopEditScreen() {
  return <div>{/* Same toolbar code */}</div>;
}

// ✅ GOOD: Shared component with variants
function EditScreen() {
  return <EditScreenToolbar variant={isMobile ? "mobile" : "desktop"} />;
}
```

## 🔄 Testing Workflow

1. **Local Development**
   - Run `npm run dev`
   - Test in Simple Browser at minimum 3 routes
   - Check mobile and desktop viewports

2. **Component Integration**
   - Test shared components in isolation
   - Verify all prop variations work
   - Check edge cases and error states

3. **Visual Verification**
   - Screenshot before/after changes
   - Compare layouts across different screen sizes
   - Verify no duplicate UI elements

4. **Git Workflow**
   - Commit small, focused changes
   - Test each commit individually
   - Use descriptive commit messages

## 📋 File Structure Rules

### Component Organization
```
components/
  ui/           # Base UI components (Button, Input, etc.)
  EditScreenToolbar.tsx  # Shared business components
  Header.tsx    # Layout components
pages/
  EditScreen.tsx        # Main route components
  EditScreen.mobile.tsx # Platform-specific variants
```

### Import Rules
- Use absolute imports from `@/components`
- Remove unused imports before committing
- Group imports: React → Libraries → Local components

## 🎯 Quality Gates

Before any commit:
1. **Build Check**: `npm run build` succeeds
2. **Type Check**: `npm run type-check` passes
3. **Visual Test**: Simple Browser verification
4. **Route Test**: Test all affected routes

## 📝 Documentation Requirements

- Document component props and usage
- Update README for new features
- Comment complex logic
- Maintain this rules file as project evolves

---
*This rules file should be updated as the project grows and new patterns emerge.*
