
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronRight } from 'lucide-react';

const topics = [
  { id: 1, name: 'JavaScript', icon: '💻' },
  { id: 2, name: 'React', icon: '⚛️' },
  { id: 3, name: 'Python', icon: '🐍' },
  { id: 4, name: 'Data Science', icon: '📊' },
  { id: 5, name: 'Machine Learning', icon: '🤖' },
  { id: 6, name: 'Web Development', icon: '🌐' },
];

const Index = () => {
  const navigate = useNavigate();
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const handleTopicSelect = (topicName: string) => {
    setSelectedTopic(topicName);
  };

  const handleContinue = () => {
    if (selectedTopic) {
      navigate('/pre-test', { state: { topic: selectedTopic } });
    }
  };

  return (
    <div className="min-h-screen bg-quiz-dark flex flex-col">
      <header className="py-6 px-8">
        <Logo size="lg" />
      </header>
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-3">Welcome to TEST.IO</h1>
          <p className="text-xl text-gray-300">Select a topic to start your test</p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {topics.map((topic, index) => (
            <motion.div
              key={topic.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card 
                className={`hover:border-quiz-pink transition-all duration-300 cursor-pointer h-full 
                  ${selectedTopic === topic.name 
                    ? 'bg-white/10 border-quiz-pink' 
                    : 'bg-white/5 border-white/10'}`}
                onClick={() => handleTopicSelect(topic.name)}
              >
                <CardHeader>
                  <div className="text-3xl mb-2">{topic.icon}</div>
                  <CardTitle className="text-white">{topic.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-300">
                    Test your {topic.name} knowledge with our adaptive quiz system.
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <Button 
            onClick={handleContinue}
            disabled={!selectedTopic}
            className="bg-quiz-pink hover:bg-quiz-pink/90 text-white px-8 py-6 rounded-full text-lg focus-effect"
          >
            Continue
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
          {!selectedTopic && (
            <p className="mt-3 text-gray-400 text-sm">Please select a topic to continue</p>
          )}
        </motion.div>
      </main>
      
      <footer className="py-6 text-center text-gray-400">
        <p>© {new Date().getFullYear()} TEST.IO - All rights reserved</p>
      </footer>
    </div>
  );
};

export default Index;
