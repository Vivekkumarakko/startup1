import React, { useState, useEffect } from 'react';
import { Menu, X, User, LogOut, LogIn, UserPlus, Shield } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Authentication from './auth/Authentication';
import ProblinxLogo from './ProblinxLogo';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { currentUser, currentAdmin, logout } = useAuth();

  const menuItems = [
    { name: 'Home', href: '#home' },
    { name: 'Problem Board', href: '#problems' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Become a Partner', href: '#partner' },
    { name: 'Pricing', href: '#pricing' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 20);

      // Update active section based on scroll position
      const sections = menuItems.map(item => item.href.substring(1));
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [menuItems]);

  const handleNavClick = (href: string) => {
    const element = document.getElementById(href.substring(1));
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
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
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200/20' 
        : 'bg-transparent'
    }`}>
      {/* Main Navigation Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo Section - Left */}
          <div className="flex-shrink-0">
            <button 
              onClick={() => handleNavClick('#home')}
              className="flex items-center transition-all duration-300 hover:scale-105"
            >
              <ProblinxLogo 
                size="lg"
                variant={isScrolled ? 'dark' : 'white'}
                className="cursor-pointer"
              />
            </button>
          </div>

          {/* Desktop Navigation Links - Center */}
          <div className="hidden lg:flex items-center space-x-8">
            {menuItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                className={`text-sm font-semibold transition-all duration-300 relative group px-3 py-2 rounded-lg ${
                  activeSection === item.href.substring(1)
                    ? isScrolled 
                      ? 'text-[#DAA520] bg-[#DAA520]/10' 
                      : 'text-[#DAA520] bg-white/10'
                    : isScrolled 
                      ? 'text-gray-700 hover:text-[#DAA520] hover:bg-gray-100' 
                      : 'text-white/90 hover:text-[#DAA520] hover:bg-white/10 drop-shadow-sm'
                }`}
              >
                {item.name}
                {/* Active/Hover underline */}
                <span className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 h-0.5 bg-[#DAA520] transition-all duration-300 ${
                  activeSection === item.href.substring(1) ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
              </button>
            ))}
          </div>

          {/* Desktop Auth Section - Right */}
          <div className="hidden lg:flex items-center space-x-4">
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className={`flex items-center space-x-3 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                    isScrolled 
                      ? 'text-[#002D62] hover:bg-gray-100 hover:scale-105' 
                      : 'text-white hover:bg-white/10 hover:scale-105 drop-shadow-sm'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    currentAdmin ? 'bg-blue-600' : 'bg-[#DAA520]'
                  }`}>
                    {currentAdmin ? (
                      <Shield className="w-4 h-4 text-white" />
                    ) : (
                      <User className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <div className="flex flex-col items-start">
                    <span>{currentUser.displayName || 'User'}</span>
                    {currentAdmin && (
                      <span className="text-xs text-blue-600 font-medium">Admin</span>
                    )}
                  </div>
                </button>
                
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl py-2 z-50 border border-gray-200">
                                      <div className="px-4 py-3 text-sm text-gray-700 border-b border-gray-100">
                    <div className="font-medium flex items-center space-x-2">
                      {currentUser.displayName || 'User'}
                      {currentAdmin && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          <Shield className="w-3 h-3 mr-1" />
                          Admin
                        </span>
                      )}
                    </div>
                    <div className="text-gray-500">{currentUser.email}</div>
                  </div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                    >
                      <LogOut className="w-4 h-4 mr-3" />
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
                  className="flex items-center space-x-2 px-4 py-2 bg-[#DAA520] text-white text-sm font-medium rounded-lg hover:bg-[#B8860B] transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Sign Up</span>
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 ${
                isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
              }`}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="pb-6 border-t border-gray-200/20">
            <div className="pt-4 space-y-3">
              {menuItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className={`block w-full text-left px-4 py-3 text-base font-medium rounded-lg transition-all duration-300 ${
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
              <div className="pt-4 space-y-3 border-t border-gray-200/20">
                {currentUser ? (
                  <>
                    <div className="px-4 py-3 text-sm text-gray-600 border-b border-gray-100">
                      <div className="font-medium">{currentUser.displayName || 'User'}</div>
                      <div className="text-gray-500">{currentUser.email}</div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full text-left px-4 py-3 text-base font-medium rounded-lg transition-all duration-300 text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="w-4 h-4 mr-3" />
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
                      className="flex items-center w-full text-left px-4 py-3 text-base font-medium rounded-lg transition-all duration-300 text-gray-700 hover:bg-gray-100"
                    >
                      <LogIn className="w-4 h-4 mr-3" />
                      Login
                    </button>
                    <button 
                      onClick={() => {
                        setShowAuthModal(true);
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex items-center w-full text-left px-4 py-3 bg-[#DAA520] text-white text-base font-medium rounded-lg hover:bg-[#B8860B] transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      <UserPlus className="w-4 h-4 mr-3" />
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
          <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Welcome to PROBLINX</h2>
              <button
                onClick={() => setShowAuthModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6">
              <Authentication onClose={() => setShowAuthModal(false)} />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;