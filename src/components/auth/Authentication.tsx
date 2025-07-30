import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Login from './Login';
import Signup from './Signup';
import ForgotPassword from './ForgotPassword';

type AuthView = 'login' | 'signup' | 'forgot-password';

interface AuthenticationProps {
  onClose?: () => void;
}

const Authentication: React.FC<AuthenticationProps> = ({ onClose }) => {
  const [currentView, setCurrentView] = useState<AuthView>('login');
  const { currentUser } = useAuth();

  // Close modal when user is authenticated
  useEffect(() => {
    if (currentUser && onClose) {
      onClose();
    }
  }, [currentUser, onClose]);

  const switchToLogin = () => setCurrentView('login');
  const switchToSignup = () => setCurrentView('signup');
  const switchToForgotPassword = () => setCurrentView('forgot-password');

  return (
    <div className="w-full">
      {currentView === 'login' && (
        <Login 
          onSwitchToSignup={switchToSignup}
          onForgotPassword={switchToForgotPassword}
        />
      )}
      
      {currentView === 'signup' && (
        <Signup onSwitchToLogin={switchToLogin} />
      )}
      
      {currentView === 'forgot-password' && (
        <ForgotPassword onBackToLogin={switchToLogin} />
      )}
    </div>
  );
};

export default Authentication; 