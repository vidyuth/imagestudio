// Centralized labels and text content configuration
export const LABELS = {
  // Site branding
  SITE_NAME: "Staged",
  
  // Header navigation
  NAV: {
    FEATURES: "Features",
    PRICING: "Pricing", 
    HELP: "Help",
  },
  
  // Authentication
  AUTH: {
    LOGIN: "Login",
    SIGN_UP: "Sign Up",
    LOGOUT: "Logout",
  },
  
  // Accessibility labels
  ARIA: {
    TOGGLE_THEME: "Toggle theme",
    MAIN_LOGO: "Staged - Go to homepage",
  },
  
  // Common actions
  ACTIONS: {
    UPLOAD: "Upload",
    DOWNLOAD: "Download", 
    SAVE: "Save",
    CANCEL: "Cancel",
    DELETE: "Delete",
    EDIT: "Edit",
    STAGE_IT: "Stage It",
    BROWSE_FILES: "Browse Files",
  },

  // Image Upload Component
  IMAGE_UPLOAD: {
    TITLE: "Browse images to upload",
    DESCRIPTION: "PNG, JPG, WEBP • Max 2 images",
    MAX_FILES_MESSAGE: "Maximum 2 images allowed",
  },

  // Prompt Composer Component
  PROMPT_COMPOSER: {
    LABEL: "How do you want to edit this picture?",
    PLACEHOLDER: "e.g. Add some nice furniture...",
  },
  
  // Placeholders for future content
  PAGES: {
    HOME: {
      TITLE: "AI-Powered Image Staging",
      SUBTITLE: "Transform your spaces with intelligent design",
    },
    FEATURES: {
      TITLE: "Features",
    },
    PRICING: {
      TITLE: "Pricing",
    },
    HELP: {
      TITLE: "Help & Support",
    },
  },
} as const;

// Type for autocomplete and type safety
export type LabelsType = typeof LABELS;
