
import React from 'react';

const InfinityGraphic: React.FC = () => {
  return (
    <div className="relative flex items-center justify-center w-full">
      <div className="relative z-10 flex justify-between items-center w-full">
        <div className="flex items-center text-white">
          <div className="text-6xl md:text-8xl font-bold leading-none">10</div>
          <div className="text-xl md:text-2xl ml-2">Questions,<br/>Minutes</div>
        </div>
        
        <div className="text-3xl md:text-4xl mx-4 font-bold">=</div>
        
        <div className="flex flex-col items-end text-app-pink">
          <div className="text-2xl md:text-3xl font-medium text-right">Learnings,</div>
          <div className="text-2xl md:text-3xl font-medium text-right">Analysis &</div>
          <div className="text-2xl md:text-3xl font-medium text-right">Opportunities</div>
        </div>
      </div>
    </div>
  );
};

export default InfinityGraphic;
