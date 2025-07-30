import React, { useState } from 'react';

interface ProblinxLogoProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  animated?: boolean;
  variant?: 'default' | 'dark' | 'white';
}

const ProblinxLogo: React.FC<ProblinxLogoProps> = ({
  className = '',
  size = 'md',
  showText = false, // Default to false
  animated = false,
  variant = 'default'
}) => {
  const [imageError, setImageError] = useState(false);

  const sizeClasses = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  const textSizes = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-2xl'
  };

  const getColors = () => {
    switch (variant) {
      case 'dark':
        return {
          primary: 'text-[#002D62]',
          secondary: 'text-[#DAA520]'
        };
      case 'white':
        return {
          primary: 'text-white',
          secondary: 'text-[#DAA520]'
        };
      default:
        return {
          primary: 'text-[#002D62]',
          secondary: 'text-[#DAA520]'
        };
    }
  };

  const colors = getColors();

  const handleImageError = () => {
    setImageError(true);
  };

  if (imageError) {
    // Fallback to text-only logo if image fails to load
    return (
      <div className={`flex items-center space-x-3 isolate problinx-logo-container ${className}`}>
        <div className={`${sizeClasses[size]} ${animated ? 'animate-spin' : ''} flex-shrink-0 bg-[#DAA520] rounded-lg flex items-center justify-center`}>
          <span className="text-white font-bold text-xs">P</span>
        </div>
        {showText && (
          <span className={`font-bold ${colors.primary} ${textSizes[size]} tracking-wide flex-shrink-0`}>
            PROBLINX
          </span>
        )}
      </div>
    );
  }

  return (
    <div className={`flex items-center space-x-3 isolate problinx-logo-container ${className}`}>
      <div className={`relative ${sizeClasses[size]} ${animated ? 'animate-spin' : ''} flex-shrink-0`}>
        <img
          src="/logo.png"
          alt="PROBLINX Logo"
          className="w-full h-full object-contain"
          style={{ isolation: 'isolate' }}
          onError={handleImageError}
        />
      </div>
      {showText && (
        <span className={`font-bold ${colors.primary} ${textSizes[size]} tracking-wide flex-shrink-0`}>
          PROBLINX
        </span>
      )}
    </div>
  );
};

export default ProblinxLogo; 