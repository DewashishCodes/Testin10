
import React from 'react';
import { Link } from 'react-router-dom';

const Logo: React.FC = () => {
  return (
    <Link to="/" className="flex items-center">
      <h1 className="text-app-coral font-pacifico text-4xl tracking-wider drop-shadow-md animate-pulse-soft">
        TESTin10
      </h1>
    </Link>
  );
};

export default Logo;
