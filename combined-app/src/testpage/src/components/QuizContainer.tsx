
import React, { useState } from 'react';
import { useQuiz } from '@/context/QuizContext';
import ProgressBar from './ProgressBar';
import QuestionCard from './QuestionCard';
import Timer from './Timer';
import { Moon, Sun, User, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const QuizContainer: React.FC = () => {
  const { state, submitQuiz, toggleSound, toggleDarkMode } = useQuiz();
  const { questions, currentQuestionIndex, loading, soundEnabled, darkMode } = state;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  
  const currentQuestion = questions[currentQuestionIndex];
  
  const handleSubmitQuiz = async () => {
    try {
      setIsSubmitting(true);
      await submitQuiz();
    } catch (error) {
      console.error('Failed to submit quiz:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleSound = () => {
    toggleSound();
  };
  
  const handleToggleDarkMode = () => {
    toggleDarkMode();
  };
  
  const navigateToHome = () => {
    navigate('/');
  };
  
  if (loading && questions.length === 0) {
    return (
      <div className={`min-h-screen flex flex-col items-center justify-center testio-container ${!darkMode ? 'light-mode' : ''}`}>
        <div className="testio-card p-10 flex flex-col items-center">
          <div className="animate-pulse space-y-4">
            <div className="h-6 w-48 bg-testio-neon opacity-50 rounded"></div>
            <div className="h-4 w-64 bg-testio-neon opacity-30 rounded"></div>
            <div className="h-4 w-52 bg-testio-neon opacity-30 rounded"></div>
          </div>
          <p className="text-white mt-6 animate-pulse">Loading quiz questions...</p>
        </div>
      </div>
    );
  }
  
  if (questions.length === 0) {
    return (
      <div className={`min-h-screen flex flex-col items-center justify-center testio-container ${!darkMode ? 'light-mode' : ''}`}>
        <div className="testio-card p-10 flex flex-col items-center">
          <p className="text-white text-xl">No questions available</p>
          <Button 
            onClick={() => window.location.reload()}
            className="mt-4 neon-button"
          >
            Reload Quiz
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`min-h-screen flex flex-col testio-container pb-10 ${!darkMode ? 'light-mode' : ''}`} 
      style={{ backgroundImage: "url('/lovable-uploads/9e6e9f3e-ac1e-4678-b245-ac0fdca4d232.png')" }}
    >
      <header className="flex justify-between items-center p-4 md:p-6">
        <div className="flex-1">
          <img 
            src="/lovable-uploads/5201368d-1861-4378-b42a-b0fda34be950.png" 
            alt="TESTin10" 
            className="h-10 md:h-12 cursor-pointer"
            onClick={navigateToHome}
          />
        </div>
        <div className="flex items-center gap-4">
          <Timer />
          <button 
            className="p-2 rounded-full bg-white bg-opacity-10 hover:bg-opacity-20 transition-all"
            onClick={handleToggleSound}
            aria-label={soundEnabled ? "Disable sound" : "Enable sound"}
          >
            {soundEnabled ? (
              <Volume2 className="w-6 h-6 text-white" />
            ) : (
              <VolumeX className="w-6 h-6 text-white" />
            )}
          </button>
          <button 
            className="p-2 rounded-full bg-white bg-opacity-10 hover:bg-opacity-20 transition-all"
            onClick={handleToggleDarkMode}
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? (
              <Sun className="w-6 h-6 text-white" />
            ) : (
              <Moon className="w-6 h-6 text-white" />
            )}
          </button>
          <button 
            className="p-2 rounded-full bg-white bg-opacity-10 hover:bg-opacity-20 transition-all"
            onClick={() => toast({ title: "Profile", description: "User profile coming soon!" })}
          >
            <User className="w-6 h-6 text-white" />
          </button>
        </div>
      </header>
      
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-6">
        <ProgressBar />
        
        {currentQuestion && (
          <QuestionCard question={currentQuestion} />
        )}
        
        {/* Only show submit button on the last question */}
        {currentQuestionIndex === questions.length - 1 && (
          <div className="mt-8">
            <button
              onClick={handleSubmitQuiz}
              disabled={isSubmitting}
              className="neon-button bg-green-500 hover:bg-green-600 text-lg px-8 py-3"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Quiz'}
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default QuizContainer;
