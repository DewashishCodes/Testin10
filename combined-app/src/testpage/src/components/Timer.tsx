
import React from 'react';
import { useQuiz } from '@/context/QuizContext';
import { Clock } from 'lucide-react';

const Timer: React.FC = () => {
  const { state } = useQuiz();
  const { timeRemaining, darkMode } = state;
  
  // Format seconds to MM:SS
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    
    return `${formattedMinutes}:${formattedSeconds}`;
  };
  
  // Determine timer color based on remaining time
  const getTimerColor = (): string => {
    if (timeRemaining <= 60) { // Last minute
      return 'text-red-500';
    } else if (timeRemaining <= 180) { // Last 3 minutes
      return 'text-yellow-500';
    } else {
      return darkMode ? 'text-white' : 'text-gray-800';
    }
  };
  
  return (
    <div className={`flex items-center gap-2 ${darkMode ? 'bg-black bg-opacity-30' : 'bg-white bg-opacity-30'} px-3 py-1 rounded-full backdrop-blur-sm`}>
      <Clock className={`w-5 h-5 ${darkMode ? 'text-testio-neon' : 'text-testio-neon-light'}`} />
      <span className={`font-mono text-lg font-bold ${getTimerColor()}`}>
        {formatTime(timeRemaining)}
      </span>
    </div>
  );
};

export default Timer;
