// Environment configuration for client-side
export const config = {
  geminiApiKey: import.meta.env.VITE_GEMINI_API_KEY || 'demo-key',
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
};
