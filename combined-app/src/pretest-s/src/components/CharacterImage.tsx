import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface CharacterImageProps {
  className?: string;
}

// This component is no longer used in PreTest.tsx as the image is now directly embedded there
// Keeping this for potential future use in other components
const CharacterImage: React.FC<CharacterImageProps> = ({ className }) => {
  return (
    <motion.div
      className={cn('relative', className)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.3 }}
    >
      <div className="relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-quiz-pink to-quiz-purple opacity-30 blur-xl rounded-full"></div>
        <img 
          src="/lovable-uploads/e2ed2f71-90bf-4cb5-a1dd-e7ac2b327d37.png" 
          alt="Student character with mint hair looking worried while studying" 
          className="relative w-full h-auto object-contain animate-float"
        />
      </div>
    </motion.div>
  );
};

export default CharacterImage;
