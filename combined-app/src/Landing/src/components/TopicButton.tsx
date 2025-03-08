
import React from 'react';

interface TopicButtonProps {
  name: string;
  onClick: () => void;
}

const TopicButton: React.FC<TopicButtonProps> = ({ name, onClick }) => {
  return (
    <button 
      onClick={onClick}
      className="topic-button bg-white/10 text-white w-full py-3 rounded-lg md:rounded-xl hover:bg-white/15 transition-all duration-300"
    >
      <div className="topic-button-shimmer"></div>
      <span className="text-app-cyan mr-2 text-lg md:text-xl">📊</span>
      <span className="text-app-pink text-base md:text-lg font-medium">{name}</span>
    </button>
  );
};

export default TopicButton;
