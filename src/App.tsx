import React from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import UserPersonas from './components/UserPersonas';
import ProblemStatement from './components/ProblemStatement';
import SolutionOverview from './components/SolutionOverview';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';
import Statistics from './components/Statistics';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import ProblemBoard from './components/ProblemBoard';
import Pricing from './components/Pricing';
import BecomePartner from './components/BecomePartner';
import Chatbot from './components/Chatbot';
import { ChatbotProvider } from './components/ChatbotContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Authentication from './components/auth/Authentication';
import UserProfile from './components/auth/UserProfile';
import AuthTest from './components/auth/AuthTest';
import ErrorBoundary from './components/ErrorBoundary';

const AppContent: React.FC = () => {
  const { currentUser } = useAuth();
  
  // Check if we're on the auth test route
  const isAuthTestRoute = window.location.pathname === '/auth-test';

  if (isAuthTestRoute) {
    return <AuthTest />;
  }

  return (
    <ChatbotProvider>
      <div className="min-h-screen bg-white">
        <Navigation />
        <main>
          <Hero />
          <UserPersonas />
          <ProblemStatement />
          <SolutionOverview />
          <HowItWorks />
          <Testimonials />
          <Statistics />
          <ProblemBoard />
          <Pricing />
          <BecomePartner />
          <FAQ />
        </main>
        <Footer />
        <Chatbot />
      </div>
    </ChatbotProvider>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;