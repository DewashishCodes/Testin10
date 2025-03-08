
import React from 'react';
import { useQuiz } from '@/context/QuizContext';
import { QuizQuestion } from '@/types/quiz';
import NavButtons from './NavButtons';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuestionCardProps {
  question: QuizQuestion;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question }) => {
  const { selectOption, deselectOption, state } = useQuiz();
  const selectedOptions = state.answers[question.id] || [];
  const { darkMode } = state;
  
  const handleOptionClick = (optionIndex: number) => {
    // Since we're now supporting only single answer questions,
    // we can simplify the logic:
    selectOption(question.id, optionIndex);
  };
  
  const isSelected = (optionIndex: number) => {
    return selectedOptions.includes(optionIndex);
  };

  return (
    <div className="animate-scale-up w-full max-w-3xl mx-auto">
      <div className={`testio-card p-6 md:p-8 ${!darkMode ? 'light-mode-card' : ''}`}>
        <div className="mb-6">
          <h2 className={`${darkMode ? 'text-white' : 'text-gray-800'} text-lg font-medium mb-2`}>Question Text:</h2>
          <p className={`text-xl md:text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{question.text}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {question.options.map((option, index) => (
            <div
              key={index}
              onClick={() => handleOptionClick(index)}
              className={cn(
                "checkbox-option group", 
                isSelected(index) ? "selected" : "",
                !darkMode ? "light-mode-option" : ""
              )}
            >
              <div className={cn(
                "w-6 h-6 rounded-md border-2 flex items-center justify-center transition-colors",
                isSelected(index) 
                  ? `border-white ${darkMode ? 'bg-white bg-opacity-20' : 'bg-testio-neon-light bg-opacity-20'}`
                  : `${darkMode ? 'border-testio-neon bg-black bg-opacity-20' : 'border-testio-neon-light bg-white bg-opacity-20'}`
              )}>
                {isSelected(index) && <Check className={`w-4 h-4 ${darkMode ? 'text-white' : 'text-gray-800'}`} />}
              </div>
              <span className={`ml-3 ${darkMode ? 'text-white' : 'text-gray-800'} text-lg font-medium`}>{option}</span>
            </div>
          ))}
        </div>
        
        <NavButtons 
          questionId={question.id} 
          hasAnswers={selectedOptions.length > 0}
        />
      </div>
    </div>
  );
};

export default QuestionCard;
