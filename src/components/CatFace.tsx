import React from 'react';

interface Props {
  size?: number;
  className?: string;
}

export default function CatFace({ size = 46, className = "" }: Props) {
  const height = (size * 38) / 46;

  return (
    <svg 
      width={size} 
      height={height} 
      viewBox="-2 0 28 22" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Main Head */}
      <path 
        d="M12 5c.67 0 1.35.09 2 .26 1.78-2 5.03-2.84 6.42-2.26 1.4.58-.42 7-.42 7 .57 1.07 1 2.24 1 3.44C21 17.9 16.97 21 12 21s-9-3.1-9-7.56c0-1.25.5-2.4 1-3.44 0 0-1.89-6.42-.5-7 1.39-.58 4.69.23 6.5 2.23A9.04 9.04 0 0 1 12 5Z" 
        fill="white" 
        className="dark:fill-sky-950" 
        stroke="currentColor" 
        strokeWidth="1.2" 
      />
      
      {/* Ear Pockets */}
      <path d="M 6 5.5 L 8 8 L 5 8 Z" fill="currentColor" opacity="0.3" />
      <path d="M 18 5.5 L 16 8 L 19 8 Z" fill="currentColor" opacity="0.3" />

      {/* Face Details */}
      <circle cx="8.5" cy="13.5" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="15.5" cy="13.5" r="1.2" fill="currentColor" stroke="none" />
      <path d="M 11 15 h 2 l -1 1.2 z" fill="currentColor" stroke="none" />

      {/* Whiskers */}
      <path d="M 4 12.5 l 2 0.5 M 3 14 l 3 0 M 4 15.5 l 2 -0.5" stroke="currentColor" strokeWidth="0.6" strokeLinecap="round" opacity="0.6" />
      <path d="M 20 12.5 l -2 0.5 M 21 14 l -3 0 M 20 15.5 l -2 -0.5" stroke="currentColor" strokeWidth="0.6" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}