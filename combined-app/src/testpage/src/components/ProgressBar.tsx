
import { useQuiz } from '@/context/QuizContext';
import { QuestionStatus } from '@/types/quiz';

const ProgressBar = () => {
  const { state, goToQuestion } = useQuiz();
  const { questions, status, darkMode } = state;
  
  const handleIndicatorClick = (index: number) => {
    goToQuestion(index);
  };
  
  const getStatusColor = (questionStatus: QuestionStatus) => {
    if (darkMode) {
      switch (questionStatus) {
        case QuestionStatus.CONFIRMED:
          return 'bg-testio-confirmed';
        case QuestionStatus.REVIEW:
          return 'bg-testio-review';
        case QuestionStatus.CURRENT:
          return 'bg-testio-current';
        default:
          return 'bg-testio-unanswered';
      }
    } else {
      switch (questionStatus) {
        case QuestionStatus.CONFIRMED:
          return 'bg-testio-confirmed-light';
        case QuestionStatus.REVIEW:
          return 'bg-testio-review-light';
        case QuestionStatus.CURRENT:
          return 'bg-testio-current-light';
        default:
          return 'bg-testio-unanswered-light';
      }
    }
  };
  
  if (!questions.length) return null;
  
  return (
    <div className="w-full max-w-3xl mx-auto mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className={`text-sm ${darkMode ? 'text-white' : 'text-gray-800'}`}>Progress</span>
        <span className={`text-sm ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          {state.currentQuestionIndex + 1} of {questions.length}
        </span>
      </div>
      
      <div className="flex gap-1">
        {questions.map((question, index) => {
          const questionStatus = status[question.id] || QuestionStatus.UNANSWERED;
          
          return (
            <div 
              key={question.id}
              className={`flex-1 cursor-pointer`}
              onClick={() => handleIndicatorClick(index)}
            >
              <div 
                className={`progress-indicator ${getStatusColor(questionStatus)}`}
                title={`Question ${index + 1}: ${questionStatus}`}
              />
            </div>
          );
        })}
      </div>
      
      <div className="flex justify-between mt-2 text-xs text-gray-400">
        <div className="flex items-center gap-1">
          <div className={`w-3 h-3 rounded-full ${darkMode ? 'bg-testio-confirmed' : 'bg-testio-confirmed-light'}`} />
          <span>Confirmed</span>
        </div>
        <div className="flex items-center gap-1">
          <div className={`w-3 h-3 rounded-full ${darkMode ? 'bg-testio-review' : 'bg-testio-review-light'}`} />
          <span>Review</span>
        </div>
        <div className="flex items-center gap-1">
          <div className={`w-3 h-3 rounded-full ${darkMode ? 'bg-testio-current' : 'bg-testio-current-light'}`} />
          <span>Current</span>
        </div>
        <div className="flex items-center gap-1">
          <div className={`w-3 h-3 rounded-full ${darkMode ? 'bg-testio-unanswered' : 'bg-testio-unanswered-light'}`} />
          <span>Unanswered</span>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
