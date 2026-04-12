import React from 'react';

interface LogoProps {
    size?: number;
    className?: string;
}

const Logo: React.FC<LogoProps>= ({size = 50, className = ''}) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://w3.org"
      role='img'
      aria-labelledby='LogoTitle'
      className={'text-white cursor-pointer ${className}'}
    >
      <title id='LogoTitle'>Логотип агрегатора медиаконтента</title>
      <path 
        d="M15 85V20L50 60L85 20V85" 
        stroke="currentColor" 
        strokeWidth="8" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d="M15 85L50 15L85 85" 
        stroke="currentColor" 
        strokeWidth="8" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Logo;