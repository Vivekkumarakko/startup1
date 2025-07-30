import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { 
  User, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  sendPasswordResetEmail,
  updateProfile
} from 'firebase/auth';
import { auth, googleProvider, facebookProvider } from '../config/firebase';
import { trackEvents } from '../services/analyticsService';

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  signup: (email: string, password: string, displayName?: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginWithFacebook: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const signup = async (email: string, password: string, displayName?: string) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      if (displayName && result.user) {
        await updateProfile(result.user, { displayName });
      }
      
      // Track signup event
      trackEvents.signUp('email');
      trackEvents.setUser(result.user.uid, {
        email: result.user.email || '',
        display_name: displayName || '',
        signup_method: 'email'
      });
    } catch (error: any) {
      // Track error
      trackEvents.error('signup_error', error.message);
      throw new Error(error.message);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      
      // Track login event
      trackEvents.login('email');
      trackEvents.setUser(result.user.uid, {
        email: result.user.email || '',
        display_name: result.user.displayName || '',
        login_method: 'email'
      });
    } catch (error: any) {
      // Track error
      trackEvents.error('login_error', error.message);
      throw new Error(error.message);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      
      // Track logout event
      trackEvents.custom('logout', {
        user_id: currentUser?.uid
      });
    } catch (error: any) {
      // Track error
      trackEvents.error('logout_error', error.message);
      throw new Error(error.message);
    }
  };

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      
      // Track login event
      trackEvents.login('google');
      trackEvents.setUser(result.user.uid, {
        email: result.user.email || '',
        display_name: result.user.displayName || '',
        login_method: 'google'
      });
    } catch (error: any) {
      // Track error
      trackEvents.error('google_login_error', error.message);
      throw new Error(error.message);
    }
  };

  const loginWithFacebook = async () => {
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      
      // Track login event
      trackEvents.login('facebook');
      trackEvents.setUser(result.user.uid, {
        email: result.user.email || '',
        display_name: result.user.displayName || '',
        login_method: 'facebook'
      });
    } catch (error: any) {
      // Track error
      trackEvents.error('facebook_login_error', error.message);
      throw new Error(error.message);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
      
      // Track password reset event
      trackEvents.custom('password_reset_requested', {
        email: email
      });
    } catch (error: any) {
      // Track error
      trackEvents.error('password_reset_error', error.message);
      throw new Error(error.message);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
      
      // Track user state change
      if (user) {
        trackEvents.setUser(user.uid, {
          email: user.email || '',
          display_name: user.displayName || '',
          email_verified: user.emailVerified.toString()
        });
      }
    });

    return unsubscribe;
  }, []);

  const value: AuthContextType = {
    currentUser,
    loading,
    signup,
    login,
    logout,
    loginWithGoogle,
    loginWithFacebook,
    resetPassword
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}; 