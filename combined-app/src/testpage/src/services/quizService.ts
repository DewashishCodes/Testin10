
import { QuizQuestion } from "../types/quiz";

// Mock API service - in a real app, this would call an actual API
export const fetchQuizQuestions = async (): Promise<QuizQuestion[]> => {
  // Simulate network request
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Return mock data with all questions as single option (multipleAnswer: false)
  return [
    {
      id: 1,
      text: "What is the primary purpose of Test.io?",
      options: [
        "Website development",
        "Quality assurance testing",
        "Graphic design",
        "Social media marketing"
      ],
      multipleAnswer: false
    },
    {
      id: 2,
      text: "Which of the following is a valid testing methodology?",
      options: [
        "Black box testing",
        "Rainbow testing",
        "Square testing",
        "Diamond testing"
      ],
      multipleAnswer: false
    },
    {
      id: 3,
      text: "What is regression testing?",
      options: [
        "Testing new features only",
        "Testing that previously fixed bugs haven't returned",
        "Testing performance under heavy load",
        "Testing user interfaces exclusively"
      ],
      multipleAnswer: false
    },
    {
      id: 4,
      text: "Which of these is the most critical bug severity level?",
      options: [
        "Critical",
        "Important",
        "Low",
        "Cosmetic"
      ],
      multipleAnswer: false
    },
    {
      id: 5,
      text: "What is the main advantage of automated testing?",
      options: [
        "It's always more accurate than manual testing",
        "It can run repetitive tests quickly and consistently",
        "It requires no maintenance",
        "It's less expensive to implement initially"
      ],
      multipleAnswer: false
    },
    {
      id: 6,
      text: "Which of the following is NOT a type of functional testing?",
      options: [
        "Integration testing",
        "Performance testing",
        "Unit testing",
        "Acceptance testing"
      ],
      multipleAnswer: false
    },
    {
      id: 7,
      text: "What does UAT stand for in software testing?",
      options: [
        "Universal Acceptance Testing",
        "User Accountability Testing",
        "User Acceptance Testing",
        "Unified Application Testing"
      ],
      multipleAnswer: false
    },
    {
      id: 8,
      text: "Which example below is a non-functional testing type?",
      options: [
        "Feature testing",
        "Security testing",
        "Unit testing",
        "Compatibility testing"
      ],
      multipleAnswer: false
    },
    {
      id: 9,
      text: "What is the purpose of a test plan document?",
      options: [
        "To list all the bugs found during testing",
        "To outline the testing approach, objectives, and resources",
        "To replace actual testing with documentation",
        "To provide developers with coding guidelines"
      ],
      multipleAnswer: false
    },
    {
      id: 10,
      text: "Which testing approach is typically conducted without detailed test cases or plans?",
      options: [
        "Regression testing",
        "Exploratory testing",
        "Smoke testing",
        "Sanity testing"
      ],
      multipleAnswer: false
    }
  ];
};

export const submitQuizAnswers = async (answers: Record<number, number[]>): Promise<{ success: boolean, score?: number }> => {
  // Simulate network request
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Calculate mock score (this would be done server-side in a real app)
  const totalQuestions = 10;
  const answeredQuestions = Object.keys(answers).length;
  const mockScore = Math.floor((answeredQuestions / totalQuestions) * 100);
  
  return {
    success: true,
    score: mockScore
  };
};
