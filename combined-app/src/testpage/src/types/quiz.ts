
export interface QuizQuestion {
  id: number;
  text: string;
  options: string[];
  multipleAnswer: boolean; // Keep for backward compatibility, but not used in new implementation
}

export interface QuizState {
  questions: QuizQuestion[];
  currentQuestionIndex: number;
  answers: Record<number, number[]>;
  status: Record<number, QuestionStatus>;
  loading: boolean;
  error: string | null;
  soundEnabled: boolean;
  timeRemaining: number;
  darkMode: boolean; // Add darkMode state
}

export enum QuestionStatus {
  UNANSWERED = "unanswered",
  CONFIRMED = "confirmed",
  REVIEW = "review",
  CURRENT = "current",
}

export interface QuizContextType {
  state: QuizState;
  selectOption: (questionId: number, optionIndex: number) => void;
  deselectOption: (questionId: number, optionIndex: number) => void;
  confirmAndNext: () => void;
  reviewAndNext: () => void;
  next: () => void;
  previous: () => void;
  goToQuestion: (index: number) => void;
  loadQuestions: () => Promise<void>;
  submitQuiz: () => Promise<{ success: boolean; score?: number }>;
  toggleSound: () => void;
  toggleDarkMode: () => void; // Add toggleDarkMode function
}
