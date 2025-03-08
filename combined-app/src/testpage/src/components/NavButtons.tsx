
import React from 'react';
import { useQuiz } from '@/context/QuizContext';
import { ChevronRight, ChevronLeft, Check, Flag } from 'lucide-react';

interface NavButtonsProps {
  questionId: number;
  hasAnswers: boolean;
}

const NavButtons: React.FC<NavButtonsProps> = ({ questionId, hasAnswers }) => {
  const { confirmAndNext, reviewAndNext, next, previous, state } = useQuiz();
  const { currentQuestionIndex, questions, darkMode } = state;
  
  const isFirstQuestion = currentQuestionIndex === 0;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  
  return (
    <div className="flex flex-col sm:flex-row justify-between mt-8 gap-3 sm:gap-6">
      <button
        onClick={previous}
        disabled={isFirstQuestion}
        className={`flex items-center justify-center py-2 px-4 rounded-lg transition-all ${
          isFirstQuestion
            ? 'opacity-50 cursor-not-allowed'
            : 'hover:bg-opacity-30'
        } ${
          darkMode 
            ? 'bg-black bg-opacity-20 text-white' 
            : 'bg-white bg-opacity-50 text-gray-800'
        }`}
      >
        <ChevronLeft className="w-5 h-5 mr-1" />
        Previous
      </button>
      
      <div className="flex flex-col sm:flex-row gap-3">
        {hasAnswers && (
          <>
            <button
              onClick={confirmAndNext}
              className={`flex items-center justify-center py-2 px-4 rounded-lg bg-testio-confirmed hover:bg-opacity-80 text-white transition-all`}
            >
              <Check className="w-5 h-5 mr-1" />
              Confirm & Next
            </button>
            
            <button
              onClick={reviewAndNext}
              className={`flex items-center justify-center py-2 px-4 rounded-lg bg-testio-review hover:bg-opacity-80 text-black transition-all`}
            >
              <Flag className="w-5 h-5 mr-1" />
              Review & Next
            </button>
          </>
        )}
        
        {!isLastQuestion && (
          <button
            onClick={next}
            className={`flex items-center justify-center py-2 px-4 rounded-lg transition-all ${
              darkMode 
                ? 'bg-testio-current text-white' 
                : 'bg-testio-current-light text-white'
            } hover:bg-opacity-80`}
          >
            Skip
            <ChevronRight className="w-5 h-5 ml-1" />
          </button>
        )}
      </div>
    </div>
  );
};

export default NavButtons;
