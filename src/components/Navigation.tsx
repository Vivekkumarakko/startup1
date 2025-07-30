import React, { useState, useEffect } from 'react';
import { Menu, X, Zap, User, LogOut, LogIn, UserPlus } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Authentication from './auth/Authentication';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { currentUser, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      // Update active section based on scroll position
      const sections = ['home', 'problems', 'how-it-works', 'partner', 'pricing'];
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once to set initial state
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: 'Home', href: '#home' },
    { name: 'Problem Board', href: '#problems' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Become a Partner', href: '#partner' },
    { name: 'Pricing', href: '#pricing' }
  ];

  const handleNavClick = (href: string) => {
    const targetId = href.substring(1);
    const element = document.getElementById(targetId);
    if (element) {
      const offsetTop = element.offsetTop - 80; // Account for fixed nav height
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
      setShowUserMenu(false);
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-xl border-b border-gray-200/20 py-3' 
        : 'bg-transparent py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => handleNavClick('#home')}>
            <div className="relative">
              <Zap className={`h-8 w-8 transition-all duration-300 ${
                isScrolled ? 'text-[#DAA520]' : 'text-[#DAA520] drop-shadow-lg'
              }`} />
              <div className={`absolute inset-0 h-8 w-8 bg-[#DAA520] rounded-full blur-sm transition-opacity duration-300 ${
                isScrolled ? 'opacity-10' : 'opacity-30'
              }`}></div>
            </div>
            <span className={`text-xl font-bold transition-all duration-300 ${
              isScrolled ? 'text-[#002D62]' : 'text-white drop-shadow-lg'
            }`}>
              Problinx
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            {menuItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                className={`text-sm font-medium transition-all duration-300 relative group ${
                  activeSection === item.href.substring(1)
                    ? isScrolled 
                      ? 'text-[#DAA520]' 
                      : 'text-[#DAA520]'
                    : isScrolled 
                      ? 'text-gray-700 hover:text-[#DAA520]' 
                      : 'text-white/90 hover:text-[#DAA520] drop-shadow-sm'
                }`}
              >
                {item.name}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-[#DAA520] transition-all duration-300 group-hover:w-full ${
                  activeSection === item.href.substring(1) ? 'w-full' : ''
                }`}></span>
              </button>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                    isScrolled 
                      ? 'text-[#002D62] hover:bg-gray-100 hover:scale-105' 
                      : 'text-white hover:bg-white/10 hover:scale-105 drop-shadow-sm'
                  }`}
                >
                  <User className="w-4 h-4" />
                  <span>{currentUser.displayName || 'User'}</span>
                </button>
                
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <div className="px-4 py-2 text-sm text-gray-700 border-b">
                      {currentUser.email}
                    </div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <button 
                  onClick={() => setShowAuthModal(true)}
                  className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                    isScrolled 
                      ? 'text-[#002D62] hover:bg-gray-100 hover:scale-105' 
                      : 'text-white hover:bg-white/10 hover:scale-105 drop-shadow-sm'
                  }`}
                >
                  <LogIn className="w-4 h-4" />
                  <span>Login</span>
                </button>
                <button 
                  onClick={() => setShowAuthModal(true)}
                  className="flex items-center space-x-2 px-6 py-2 bg-[#DAA520] text-white text-sm font-medium rounded-lg hover:bg-[#B8860B] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Sign Up</span>
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-2 rounded-md transition-all duration-300 hover:scale-110 ${
              isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
            }`}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isMobileMenuOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
        }`}>
          <div className="pb-4 border-t border-gray-200/20">
            <div className="pt-4 space-y-3">
              {menuItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className={`block w-full text-left px-3 py-2 text-base font-medium rounded-md transition-all duration-300 ${
                    activeSection === item.href.substring(1)
                      ? isScrolled
                        ? 'text-[#DAA520] bg-gray-100'
                        : 'text-[#DAA520] bg-white/10'
                      : isScrolled 
                        ? 'text-gray-700 hover:bg-gray-100 hover:text-[#DAA520]' 
                        : 'text-white hover:bg-white/10 hover:text-[#DAA520]'
                  }`}
                >
                  {item.name}
                </button>
              ))}
              <div className="pt-4 space-y-3">
                {currentUser ? (
                  <>
                    <div className="px-3 py-2 text-sm text-gray-600 border-b">
                      {currentUser.email}
                    </div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full text-left px-3 py-2 text-base font-medium rounded-md transition-all duration-300 text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign out
                    </button>
                  </>
                ) : (
                  <>
                    <button 
                      onClick={() => {
                        setShowAuthModal(true);
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex items-center w-full text-left px-3 py-2 text-base font-medium rounded-md transition-all duration-300 text-gray-700 hover:bg-gray-100"
                    >
                      <LogIn className="w-4 h-4 mr-2" />
                      Login
                    </button>
                    <button 
                      onClick={() => {
                        setShowAuthModal(true);
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex items-center w-full text-left px-3 py-2 bg-[#DAA520] text-white text-base font-medium rounded-md hover:bg-[#B8860B] transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      <UserPlus className="w-4 h-4 mr-2" />
                      Sign Up
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Authentication Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-semibold text-gray-900">Authentication</h2>
              <button
                onClick={() => setShowAuthModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-4">
              <Authentication onClose={() => setShowAuthModal(false)} />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;