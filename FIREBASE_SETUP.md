# Firebase Authentication Setup Guide

## Overview
This project already has a complete Firebase authentication system implemented with the following features:

- Email/Password authentication
- Google OAuth authentication
- Facebook OAuth authentication
- Password reset functionality
- User profile management
- Protected routes and components

## Current Implementation

### 1. Authentication Context (`src/contexts/AuthContext.tsx`)
- Manages authentication state
- Provides authentication methods (signup, login, logout, etc.)
- Handles social login (Google, Facebook)
- Password reset functionality

### 2. Authentication Components
- **Login** (`src/components/auth/Login.tsx`): Email/password and social login
- **Signup** (`src/components/auth/Signup.tsx`): User registration with password validation
- **ForgotPassword** (`src/components/auth/ForgotPassword.tsx`): Password reset functionality
- **UserProfile** (`src/components/auth/UserProfile.tsx`): User profile display
- **Authentication** (`src/components/auth/Authentication.tsx`): Modal wrapper for auth forms

### 3. Navigation Integration
- Authentication buttons in navigation
- User menu with logout functionality
- Modal-based authentication flow

## Setup Instructions

### Step 1: Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter your project name (e.g., "problinx-app")
4. Follow the setup wizard

### Step 2: Enable Authentication
1. In Firebase Console, go to "Authentication" → "Sign-in method"
2. Enable the following providers:
   - **Email/Password**: Enable and configure
   - **Google**: Enable and configure OAuth consent screen
   - **Facebook**: Enable and configure Facebook App

### Step 3: Configure Google OAuth
1. In Google Cloud Console, create OAuth 2.0 credentials
2. Add authorized domains
3. Configure OAuth consent screen
4. Add authorized redirect URIs

### Step 4: Configure Facebook OAuth
1. Create a Facebook App in [Facebook Developers](https://developers.facebook.com/)
2. Add Facebook Login product
3. Configure OAuth redirect URIs
4. Get App ID and App Secret

### Step 5: Environment Variables
Create a `.env` file in your project root with the following variables:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef123456

# Other Configuration
VITE_GEMINI_API_KEY=your_gemini_api_key_here
VITE_GEMINI_API_URL=https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent
VITE_APP_NAME=Problinx
VITE_SUPPORT_EMAIL=support@problinx.com
VITE_SUPPORT_PHONE=+1 (555) 123-4567
VITE_BASE_PRICE=$29/month
```

### Step 6: Get Firebase Configuration
1. In Firebase Console, go to Project Settings
2. Scroll down to "Your apps" section
3. Click the web app icon (</>) to add a web app
4. Register your app and copy the configuration
5. Replace the placeholder values in your `.env` file

## Features Available

### Authentication Methods
- **Email/Password**: Traditional signup/login
- **Google OAuth**: One-click Google sign-in
- **Facebook OAuth**: One-click Facebook sign-in

### User Management
- User registration with validation
- Password strength requirements
- Email verification (can be enabled in Firebase)
- Password reset via email
- User profile display
- Account logout

### Security Features
- Password strength validation
- Form validation
- Error handling
- Loading states
- Protected routes

### UI/UX Features
- Responsive design
- Modal-based authentication
- Social login buttons
- Password visibility toggle
- Loading indicators
- Error messages
- Success notifications

## Usage Examples

### Using Authentication in Components
```tsx
import { useAuth } from '../contexts/AuthContext';

const MyComponent = () => {
  const { currentUser, login, logout } = useAuth();

  if (currentUser) {
    return <div>Welcome, {currentUser.displayName}!</div>;
  }

  return <div>Please log in</div>;
};
```

### Protected Routes
```tsx
const ProtectedComponent = () => {
  const { currentUser, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!currentUser) return <div>Please log in to access this page</div>;

  return <div>Protected content here</div>;
};
```

## Troubleshooting

### Common Issues
1. **Firebase not initialized**: Check your environment variables
2. **OAuth not working**: Verify OAuth configuration in Firebase Console
3. **CORS errors**: Add your domain to authorized domains in Firebase
4. **Environment variables not loading**: Ensure variables start with `VITE_`

### Testing Authentication
1. Start the development server: `npm run dev`
2. Click "Login" or "Sign Up" in the navigation
3. Test email/password authentication
4. Test social login (Google/Facebook)
5. Test password reset functionality

## Security Best Practices

1. **Environment Variables**: Never commit API keys to version control
2. **Input Validation**: All forms include client-side validation
3. **Error Handling**: Proper error messages without exposing sensitive data
4. **Loading States**: Prevent multiple submissions during authentication
5. **Secure Logout**: Properly clear authentication state

## Next Steps

1. Set up your Firebase project with the configuration above
2. Configure OAuth providers (Google, Facebook)
3. Test all authentication flows
4. Customize the UI to match your brand
5. Add additional security features as needed

The authentication system is fully functional and ready to use once you configure your Firebase project! 