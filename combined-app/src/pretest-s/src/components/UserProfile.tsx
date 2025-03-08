
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Award, BarChart2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface UserProfileProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ isOpen, onClose }) => {
  // Mock data - in a real app, this would come from a user context or API
  const userData = {
    username: 'Marcus',
    email: 'marcus@example.com',
    totalTests: 27,
    averageScore: 82,
    joined: 'January 2023'
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed top-16 right-4 z-50 w-80"
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <div className="glass-effect rounded-xl overflow-hidden shadow-lg">
            <div className="flex justify-between items-center p-4 border-b border-white/10">
              <h3 className="text-lg font-medium text-white">Profile</h3>
              <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-300 hover:text-white">
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="p-6">
              <div className="flex items-center space-x-4 mb-6">
                <Avatar className="h-16 w-16 border-2 border-quiz-pink">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-quiz-darker text-white text-xl">
                    M
                  </AvatarFallback>
                </Avatar>
                
                <div>
                  <h3 className="text-xl font-bold text-white">{userData.username}</h3>
                  <p className="text-gray-300 text-sm">{userData.email}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-gray-200">
                  <Award className="h-5 w-5 text-quiz-pink" />
                  <div>
                    <p className="text-sm text-gray-400">Total Tests</p>
                    <p className="font-medium">{userData.totalTests}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 text-gray-200">
                  <BarChart2 className="h-5 w-5 text-quiz-pink" />
                  <div>
                    <p className="text-sm text-gray-400">Average Score</p>
                    <p className="font-medium">{userData.averageScore}%</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 text-gray-200">
                  <User className="h-5 w-5 text-quiz-pink" />
                  <div>
                    <p className="text-sm text-gray-400">Member Since</p>
                    <p className="font-medium">{userData.joined}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UserProfile;
