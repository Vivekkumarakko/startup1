// Environment configuration
export const config = {
  GEMINI_API_KEY: import.meta.env.VITE_GEMINI_API_KEY || 'AIzaSyA5Qak-w3LO0KhuowCllj6dJgF-17N4joI',
  GEMINI_API_URL: import.meta.env.VITE_GEMINI_API_URL || 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent',
  APP_NAME: import.meta.env.VITE_APP_NAME || 'Problinx',
  SUPPORT_EMAIL: import.meta.env.VITE_SUPPORT_EMAIL || 'support@problinx.com',
  SUPPORT_PHONE: import.meta.env.VITE_SUPPORT_PHONE || '+1 (555) 123-4567',
  BASE_PRICE: import.meta.env.VITE_BASE_PRICE || '$29/month'
}; 