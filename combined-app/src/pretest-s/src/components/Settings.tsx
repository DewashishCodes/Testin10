
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Bell, BellOff, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

interface SettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

const Settings: React.FC<SettingsProps> = ({ isOpen, onClose }) => {
  const [darkMode, setDarkMode] = React.useState(true);
  const [notifications, setNotifications] = React.useState(true);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // In a real app, you would update the theme here
    // For example, document.documentElement.classList.toggle('dark');
  };

  const toggleNotifications = () => {
    setNotifications(!notifications);
    // In a real app, you would update notification settings
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
              <h3 className="text-lg font-medium text-white">Settings</h3>
              <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-300 hover:text-white">
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {darkMode ? (
                    <Moon className="h-5 w-5 text-quiz-pink" />
                  ) : (
                    <Sun className="h-5 w-5 text-quiz-pink" />
                  )}
                  <span className="text-gray-200">Dark Mode</span>
                </div>
                <Switch
                  checked={darkMode}
                  onCheckedChange={toggleDarkMode}
                  className="data-[state=checked]:bg-quiz-pink"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {notifications ? (
                    <Bell className="h-5 w-5 text-quiz-pink" />
                  ) : (
                    <BellOff className="h-5 w-5 text-quiz-pink" />
                  )}
                  <span className="text-gray-200">Notifications</span>
                </div>
                <Switch
                  checked={notifications}
                  onCheckedChange={toggleNotifications}
                  className="data-[state=checked]:bg-quiz-pink"
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Settings;
