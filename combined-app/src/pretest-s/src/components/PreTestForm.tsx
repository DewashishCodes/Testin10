import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface PreTestFormProps {
  topicName: string;
}

const PreTestForm: React.FC<PreTestFormProps> = ({ topicName }) => {
  const [difficulty, setDifficulty] = useState<number[]>([50]);
  const [additionalContext, setAdditionalContext] = useState<string>('');
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Store form data in session storage or state management
    const testConfig = {
      topic: topicName,
      difficulty: difficulty[0],
      additionalContext
    };
    
    sessionStorage.setItem('testConfig', JSON.stringify(testConfig));
    
    toast({
      title: "Test is ready!",
      description: "Launching your customized test...",
      duration: 2000,
    });
    
    // Navigate to the quiz page after a short delay
    setTimeout(() => {
      navigate('/quiz');
    }, 1000);
  };

  const getDifficultyLabel = (value: number) => {
    if (value < 25) return 'Beginner';
    if (value < 50) return 'Intermediate';
    if (value < 75) return 'Advanced';
    return 'Expert';
  };

  return (
    <motion.form 
      onSubmit={handleSubmit}
      className="w-full max-w-lg mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="space-y-8">
        {/* Topic Name */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 flex items-center">
            <span className="bg-gradient-to-r from-quiz-pink to-quiz-purple bg-clip-text text-transparent">{topicName}</span>
          </h2>
          <p className="text-gray-300 text-sm md:text-base">
            Customize the test to your own needs
          </p>
        </motion.div>

        {/* Difficulty Selector */}
        <motion.div 
          className="space-y-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="flex justify-between items-center">
            <label htmlFor="difficulty" className="block text-white text-sm md:text-base font-medium">
              Proficiency Meter:
            </label>
            <span className="text-quiz-pink font-medium bg-quiz-pink/10 px-3 py-1 rounded-full text-sm">
              {getDifficultyLabel(difficulty[0])}
            </span>
          </div>
          <div className="px-1 py-2">
            <Slider
              id="difficulty"
              defaultValue={[50]}
              max={100}
              step={1}
              className="cursor-pointer"
              onValueChange={setDifficulty}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-400">
            <span>Beginner</span>
            <span>Expert</span>
          </div>
        </motion.div>

        {/* Additional Context */}
        <motion.div 
          className="space-y-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <label htmlFor="additionalContext" className="block text-white text-sm md:text-base font-medium">
            Additional Context:
          </label>
          <p className="text-gray-300 text-xs">
            Add some information which you think is useful for us to remember while designing the test
          </p>
          <Textarea
            id="additionalContext"
            value={additionalContext}
            onChange={(e) => setAdditionalContext(e.target.value)}
            className="h-24 bg-gray-100/10 border-gray-700 focus:border-quiz-pink text-gray-200 rounded-xl"
            placeholder="Any specific areas you want to focus on?"
          />
        </motion.div>

        {/* Launch Button */}
        <motion.div
          className="pt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          whileHover={{ scale: 1.03 }}
        >
          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-quiz-purple to-quiz-pink hover:opacity-90 text-white py-6 rounded-full focus-effect"
          >
            LAUNCH MY TEST
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </div>
    </motion.form>
  );
};

export default PreTestForm;
