
import React from 'react';
import QuizContainer from '@/components/QuizContainer';
import { QuizProvider } from '@/context/QuizContext';
import { Toaster } from '@/components/ui/toaster';

const Index = () => {
  return (
    <>
      <QuizProvider>
        <QuizContainer />
      </QuizProvider>
      <Toaster />
    </>
  );
};

export default Index;
