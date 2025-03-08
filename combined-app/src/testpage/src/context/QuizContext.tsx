import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { QuizState, QuizContextType, QuestionStatus } from '../types/quiz';
import { fetchQuizQuestions, submitQuizAnswers } from '../services/quizService';
import { toast } from '@/hooks/use-toast';

// Initial state
const initialState: QuizState = {
  questions: [],
  currentQuestionIndex: 0,
  answers: {},
  status: {},
  loading: false,
  error: null,
  soundEnabled: true,
  timeRemaining: 10 * 60, // 10 minutes in seconds (changed from 15)
  darkMode: true, // Add dark mode state, default to true
};

// Action types
type Action =
  | { type: 'FETCH_QUESTIONS_START' }
  | { type: 'FETCH_QUESTIONS_SUCCESS'; payload: any[] }
  | { type: 'FETCH_QUESTIONS_ERROR'; payload: string }
  | { type: 'SELECT_OPTION'; payload: { questionId: number; optionIndex: number } }
  | { type: 'DESELECT_OPTION'; payload: { questionId: number; optionIndex: number } }
  | { type: 'CONFIRM_AND_NEXT'; payload: number }
  | { type: 'REVIEW_AND_NEXT'; payload: number }
  | { type: 'NEXT_QUESTION' }
  | { type: 'PREVIOUS_QUESTION' }
  | { type: 'GO_TO_QUESTION'; payload: number }
  | { type: 'SUBMIT_QUIZ_START' }
  | { type: 'SUBMIT_QUIZ_SUCCESS'; payload: { success: boolean; score?: number } }
  | { type: 'SUBMIT_QUIZ_ERROR'; payload: string }
  | { type: 'TOGGLE_SOUND' }
  | { type: 'TOGGLE_DARK_MODE' }
  | { type: 'DECREMENT_TIMER' };

// Reducer
const quizReducer = (state: QuizState, action: Action): QuizState => {
  switch (action.type) {
    case 'FETCH_QUESTIONS_START':
      return { ...state, loading: true, error: null };
    
    case 'FETCH_QUESTIONS_SUCCESS':
      const status: Record<number, QuestionStatus> = {};
      action.payload.forEach((q, index) => {
        status[q.id] = index === 0 ? QuestionStatus.CURRENT : QuestionStatus.UNANSWERED;
      });
      
      return {
        ...state,
        questions: action.payload,
        loading: false,
        status,
      };
    
    case 'FETCH_QUESTIONS_ERROR':
      return { ...state, loading: false, error: action.payload };
    
    case 'SELECT_OPTION': {
      const { questionId, optionIndex } = action.payload;
      
      // All questions are single answer now, so always replace existing selection
      return {
        ...state,
        answers: {
          ...state.answers,
          [questionId]: [optionIndex],
        },
      };
    }
    
    case 'DESELECT_OPTION': {
      const { questionId, optionIndex } = action.payload;
      const existingAnswers = state.answers[questionId] || [];
      
      return {
        ...state,
        answers: {
          ...state.answers,
          [questionId]: existingAnswers.filter(index => index !== optionIndex),
        },
      };
    }
    
    case 'CONFIRM_AND_NEXT': {
      const currentQuestionId = action.payload;
      const nextIndex = Math.min(state.currentQuestionIndex + 1, state.questions.length - 1);
      const updatedStatus = { ...state.status };
      
      // Mark current as confirmed
      updatedStatus[currentQuestionId] = QuestionStatus.CONFIRMED;
      
      // Mark next as current (if not at the end)
      if (nextIndex !== state.currentQuestionIndex) {
        const nextQuestionId = state.questions[nextIndex].id;
        updatedStatus[nextQuestionId] = QuestionStatus.CURRENT;
      }
      
      return {
        ...state,
        currentQuestionIndex: nextIndex,
        status: updatedStatus,
      };
    }
    
    case 'REVIEW_AND_NEXT': {
      const currentQuestionId = action.payload;
      const nextIndex = Math.min(state.currentQuestionIndex + 1, state.questions.length - 1);
      const updatedStatus = { ...state.status };
      
      // Mark current for review
      updatedStatus[currentQuestionId] = QuestionStatus.REVIEW;
      
      // Mark next as current (if not at the end)
      if (nextIndex !== state.currentQuestionIndex) {
        const nextQuestionId = state.questions[nextIndex].id;
        updatedStatus[nextQuestionId] = QuestionStatus.CURRENT;
      }
      
      return {
        ...state,
        currentQuestionIndex: nextIndex,
        status: updatedStatus,
      };
    }
    
    case 'NEXT_QUESTION': {
      const nextIndex = Math.min(state.currentQuestionIndex + 1, state.questions.length - 1);
      
      if (nextIndex === state.currentQuestionIndex) return state;
      
      const currentQuestionId = state.questions[state.currentQuestionIndex].id;
      const nextQuestionId = state.questions[nextIndex].id;
      const updatedStatus = { ...state.status };
      
      // Keep current as is (unanswered) if not already confirmed or reviewed
      if (updatedStatus[currentQuestionId] === QuestionStatus.CURRENT) {
        updatedStatus[currentQuestionId] = QuestionStatus.UNANSWERED;
      }
      
      // Mark next as current
      updatedStatus[nextQuestionId] = QuestionStatus.CURRENT;
      
      return {
        ...state,
        currentQuestionIndex: nextIndex,
        status: updatedStatus,
      };
    }
    
    case 'PREVIOUS_QUESTION': {
      const prevIndex = Math.max(state.currentQuestionIndex - 1, 0);
      
      if (prevIndex === state.currentQuestionIndex) return state;
      
      const currentQuestionId = state.questions[state.currentQuestionIndex].id;
      const prevQuestionId = state.questions[prevIndex].id;
      const updatedStatus = { ...state.status };
      
      // If current is only marked as current (not answered), mark it unanswered
      if (updatedStatus[currentQuestionId] === QuestionStatus.CURRENT) {
        updatedStatus[currentQuestionId] = QuestionStatus.UNANSWERED;
      }
      
      // Mark previous as current now
      updatedStatus[prevQuestionId] = QuestionStatus.CURRENT;
      
      return {
        ...state,
        currentQuestionIndex: prevIndex,
        status: updatedStatus,
      };
    }
    
    case 'GO_TO_QUESTION': {
      const newIndex = action.payload;
      
      if (newIndex === state.currentQuestionIndex || 
          newIndex < 0 || 
          newIndex >= state.questions.length) {
        return state;
      }
      
      const currentQuestionId = state.questions[state.currentQuestionIndex].id;
      const newQuestionId = state.questions[newIndex].id;
      const updatedStatus = { ...state.status };
      
      // If current is only marked as current (not answered), mark it unanswered
      if (updatedStatus[currentQuestionId] === QuestionStatus.CURRENT) {
        updatedStatus[currentQuestionId] = QuestionStatus.UNANSWERED;
      }
      
      // Mark new as current
      updatedStatus[newQuestionId] = QuestionStatus.CURRENT;
      
      return {
        ...state,
        currentQuestionIndex: newIndex,
        status: updatedStatus,
      };
    }
    
    case 'SUBMIT_QUIZ_START':
      return { ...state, loading: true, error: null };
    
    case 'SUBMIT_QUIZ_SUCCESS':
      return { ...state, loading: false };
    
    case 'SUBMIT_QUIZ_ERROR':
      return { ...state, loading: false, error: action.payload };
    
    case 'TOGGLE_SOUND':
      return { ...state, soundEnabled: !state.soundEnabled };
      
    case 'TOGGLE_DARK_MODE':
      return { ...state, darkMode: !state.darkMode };
      
    case 'DECREMENT_TIMER':
      return { 
        ...state, 
        timeRemaining: Math.max(0, state.timeRemaining - 1) 
      };
    
    default:
      return state;
  }
};

// Create context
const QuizContext = createContext<QuizContextType | undefined>(undefined);

// Provider component
export const QuizProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  // Load questions automatically when component mounts
  useEffect(() => {
    loadQuestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Timer countdown effect
  useEffect(() => {
    const timerInterval = setInterval(() => {
      dispatch({ type: 'DECREMENT_TIMER' });
    }, 1000);
    
    return () => clearInterval(timerInterval);
  }, []);

  // Effect to handle timer expiration
  useEffect(() => {
    if (state.timeRemaining === 0 && state.questions.length > 0) {
      // Auto-submit quiz when timer expires
      submitQuiz().catch(error => {
        console.error('Error auto-submitting quiz:', error);
      });
      
      toast({
        title: "Time's Up!",
        description: "Your quiz has been automatically submitted.",
        variant: "destructive"
      });
    }
  }, [state.timeRemaining]);

  // Helper to save responses to localStorage
  useEffect(() => {
    if (state.questions.length > 0) {
      localStorage.setItem('quiz-answers', JSON.stringify(state.answers));
      localStorage.setItem('quiz-status', JSON.stringify(state.status));
      localStorage.setItem('quiz-current', String(state.currentQuestionIndex));
      localStorage.setItem('quiz-sound', String(state.soundEnabled));
      localStorage.setItem('quiz-time', String(state.timeRemaining));
      localStorage.setItem('quiz-dark-mode', String(state.darkMode));
    }
  }, [state.answers, state.status, state.currentQuestionIndex, state.questions, state.soundEnabled, state.timeRemaining, state.darkMode]);

  // Function to load saved responses from localStorage
  useEffect(() => {
    const savedAnswers = localStorage.getItem('quiz-answers');
    const savedStatus = localStorage.getItem('quiz-status');
    const savedCurrent = localStorage.getItem('quiz-current');
    const savedSound = localStorage.getItem('quiz-sound');
    const savedTime = localStorage.getItem('quiz-time');
    const savedDarkMode = localStorage.getItem('quiz-dark-mode');

    if (savedAnswers && savedStatus && savedCurrent && state.questions.length > 0) {
      try {
        const parsedAnswers = JSON.parse(savedAnswers);
        const parsedStatus = JSON.parse(savedStatus);
        const parsedCurrent = parseInt(savedCurrent, 10);
        
        // Update state with saved data
        dispatch({ 
          type: 'FETCH_QUESTIONS_SUCCESS', 
          payload: state.questions 
        });

        // Restore sound preference if available
        if (savedSound !== null) {
          const isEnabled = savedSound === 'true';
          if (isEnabled !== state.soundEnabled) {
            dispatch({ type: 'TOGGLE_SOUND' });
          }
        }
        
        // Restore timer if available
        if (savedTime !== null) {
          const parsedTime = parseInt(savedTime, 10);
          if (!isNaN(parsedTime) && parsedTime > 0) {
            // We don't have a direct action to set time, so we'll adjust the initial state
            // This is a limitation of the current implementation
          }
        }

        // Restore dark mode preference if available
        if (savedDarkMode !== null) {
          const isDarkMode = savedDarkMode === 'true';
          if (isDarkMode !== state.darkMode) {
            dispatch({ type: 'TOGGLE_DARK_MODE' });
          }
        }

        // Manually update state after a slight delay to ensure questions are loaded first
        setTimeout(() => {
          state.questions.forEach((q, index) => {
            if (parsedAnswers[q.id]) {
              parsedAnswers[q.id].forEach((optionIndex: number) => {
                dispatch({
                  type: 'SELECT_OPTION',
                  payload: { questionId: q.id, optionIndex }
                });
              });
            }
          });

          // Set current question index
          if (!isNaN(parsedCurrent) && parsedCurrent >= 0 && parsedCurrent < state.questions.length) {
            dispatch({ 
              type: 'GO_TO_QUESTION', 
              payload: parsedCurrent 
            });
          }
        }, 500);
      } catch (error) {
        console.error('Error loading saved quiz state:', error);
      }
    }
  }, [state.questions.length]);

  const loadQuestions = async () => {
    dispatch({ type: 'FETCH_QUESTIONS_START' });
    try {
      const questions = await fetchQuizQuestions();
      dispatch({ type: 'FETCH_QUESTIONS_SUCCESS', payload: questions });
    } catch (error) {
      console.error(error);
      dispatch({ 
        type: 'FETCH_QUESTIONS_ERROR', 
        payload: 'Failed to load quiz questions. Please try again.' 
      });
      toast({
        title: "Error",
        description: "Failed to load quiz questions. Please try again.",
        variant: "destructive"
      });
    }
  };

  const selectOption = (questionId: number, optionIndex: number) => {
    dispatch({
      type: 'SELECT_OPTION',
      payload: { questionId, optionIndex },
    });
  };

  const deselectOption = (questionId: number, optionIndex: number) => {
    dispatch({
      type: 'DESELECT_OPTION',
      payload: { questionId, optionIndex },
    });
  };

  const confirmAndNext = () => {
    const currentQuestionId = state.questions[state.currentQuestionIndex].id;
    dispatch({ type: 'CONFIRM_AND_NEXT', payload: currentQuestionId });
    
    // Show success toast
    toast({
      title: "Answer Confirmed",
      description: "Your answer has been confirmed.",
      variant: "default"
    });
  };

  const reviewAndNext = () => {
    const currentQuestionId = state.questions[state.currentQuestionIndex].id;
    dispatch({ type: 'REVIEW_AND_NEXT', payload: currentQuestionId });
    
    // Show info toast
    toast({
      title: "Marked for Review",
      description: "This question has been marked for review.",
      variant: "default"
    });
  };

  const next = () => {
    dispatch({ type: 'NEXT_QUESTION' });
  };

  const previous = () => {
    dispatch({ type: 'PREVIOUS_QUESTION' });
  };

  const goToQuestion = (index: number) => {
    dispatch({ type: 'GO_TO_QUESTION', payload: index });
  };

  const toggleSound = () => {
    dispatch({ type: 'TOGGLE_SOUND' });
    
    toast({
      title: `Sound ${state.soundEnabled ? 'Disabled' : 'Enabled'}`,
      description: `Quiz sound has been ${state.soundEnabled ? 'turned off' : 'turned on'}.`,
      variant: "default"
    });
  };

  const toggleDarkMode = () => {
    dispatch({ type: 'TOGGLE_DARK_MODE' });
    
    toast({
      title: `${state.darkMode ? 'Light' : 'Dark'} Mode Activated`,
      description: `Switched to ${state.darkMode ? 'light' : 'dark'} mode.`,
      variant: "default"
    });
  };

  const submitQuiz = async () => {
    dispatch({ type: 'SUBMIT_QUIZ_START' });
    try {
      const result = await submitQuizAnswers(state.answers);
      dispatch({ type: 'SUBMIT_QUIZ_SUCCESS', payload: result });
      
      // Show success toast
      toast({
        title: "Quiz Submitted Successfully",
        description: `Your score: ${result.score}%`,
        variant: "default"
      });
      
      return result;
    } catch (error) {
      console.error(error);
      dispatch({ 
        type: 'SUBMIT_QUIZ_ERROR', 
        payload: 'Failed to submit quiz. Please try again.' 
      });
      
      // Show error toast
      toast({
        title: "Submission Failed",
        description: "Failed to submit quiz. Please try again.",
        variant: "destructive"
      });
      
      throw error;
    }
  };

  const value = {
    state,
    selectOption,
    deselectOption,
    confirmAndNext,
    reviewAndNext,
    next,
    previous,
    goToQuestion,
    loadQuestions,
    submitQuiz,
    toggleSound,
    toggleDarkMode,
  };

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};

// Custom hook to use the quiz context
export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};
