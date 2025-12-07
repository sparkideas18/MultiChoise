import React from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const Logo: React.FC<LogoProps> = ({ className = '', showText = true, size = 'md' }) => {
  // Size mapping for the SVG container
  const iconSizes = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-16 w-16',
    xl: 'h-24 w-24'
  };

  // Size mapping for the text
  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-4xl',
    xl: 'text-5xl'
  };

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      <div className={`relative ${iconSizes[size]} shrink-0 transition-all duration-300`}>
        <svg 
          viewBox="0 0 40 40" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg" 
          className="w-full h-full drop-shadow-md"
        >
          {/* Back Layer - Indigo */}
          <rect x="6" y="6" width="18" height="18" rx="5" className="fill-indigo-500" fillOpacity="0.9" />
          
          {/* Middle Layer - Purple */}
          <rect x="14" y="10" width="18" height="18" rx="5" className="fill-purple-500" fillOpacity="0.85" />
          
          {/* Front Layer - Pink/Rose */}
          <rect x="10" y="16" width="18" height="18" rx="5" className="fill-rose-500" fillOpacity="0.9" />
          
          {/* Subtle Shine/Highlight on top rect */}
          <path d="M11 17C11 16.4477 11.4477 16 12 16H27C27.5523 16 28 16.4477 28 17V20C28 20 20 20 10 28V18C10 17.4477 10.4477 17 11 17Z" fill="white" fillOpacity="0.1"/>
        </svg>
      </div>
      
      {showText && (
        <div className={`font-bold tracking-tight leading-none ${textSizes[size]}`}>
          <span className="text-transparent bg-clip-text bg-gradient-to-br from-indigo-400 via-purple-400 to-rose-400">
            Multi
          </span>
          <span className="text-slate-100">Choice</span>
        </div>
      )}
    </div>
  );
};

export default Logo;