
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', className }) => {
  const sizeClasses = {
    sm: 'h-8',
    md: 'h-10',
    lg: 'h-14'
  };

  return (
    <Link to="/" className={cn('inline-block transition-transform duration-300 hover:scale-105', className)}>
      <img 
        src="/lovable-uploads/49b3608a-343f-4d76-af77-82cacc3e671c.png" 
        alt="TEST.IO Logo" 
        className={cn('', sizeClasses[size])}
      />
    </Link>
  );
};

export default Logo;
