
import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <img src='./public/greektrans-removebg.png'></img>
  );
};

export default Logo;
