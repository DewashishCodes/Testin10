
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Logo from '@/components/Logo';
import UserAvatar from '@/components/UserAvatar';
import PreTestForm from '@/components/PreTestForm';
import Settings from '@/components/Settings';
import UserProfile from '@/components/UserProfile';
import { Button } from '@/components/ui/button';
import { Settings as SettingsIcon, Volume2, VolumeX } from 'lucide-react';
import { toast } from 'sonner';
import * as audioService from '@/services/audioService';

// Sample background music - in a real app, you would have a proper audio file
const BACKGROUND_MUSIC = '/path/to/your/audio.mp3'; // Replace with actual audio path

const PreTest = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [topic, setTopic] = useState<string>('JavaScript');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);
  const [profileOpen, setProfileOpen] = useState<boolean>(false);

  useEffect(() => {
    // Get the topic from location state or use default
    if (location.state?.topic) {
      setTopic(location.state.topic);
    } else {
      // If no topic was provided, redirect back to home
      toast.error('Please select a topic first');
      setTimeout(() => navigate('/'), 1500);
    }

    // Initialize audio
    // Commented out as we don't have an actual audio file yet
    // audioService.initAudio(BACKGROUND_MUSIC);

    // Page enter animation
    document.body.classList.add('page-transition');
    
    return () => {
      document.body.classList.remove('page-transition');
      // Clean up audio
      audioService.cleanupAudio();
    };
  }, [location.state, navigate]);

  const toggleSound = () => {
    // If we had a proper audio file, we would uncomment this
    // const isPlaying = audioService.toggleAudio();
    // setSoundEnabled(isPlaying);
    
    // For now, just toggle the state
    setSoundEnabled(!soundEnabled);
    toast.success(soundEnabled ? 'Sound disabled' : 'Sound enabled');
  };

  const toggleSettings = () => {
    setSettingsOpen(!settingsOpen);
    if (profileOpen) setProfileOpen(false);
  };

  const toggleProfile = () => {
    setProfileOpen(!profileOpen);
    if (settingsOpen) setSettingsOpen(false);
  };

  return (
    <div className="min-h-screen bg-quiz-dark text-white overflow-hidden relative">
      {/* Background with character image */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-radial from-quiz-darker to-quiz-dark"></div>
        <div className="absolute top-0 right-0 bottom-0 w-full md:w-1/2 lg:w-2/5 overflow-hidden">
          <div className="absolute -inset-1 bg-gradient-to-r from-quiz-pink to-quiz-purple opacity-20 blur-xl rounded-3xl"></div>
          <img 
            src="/lovable-uploads/e2ed2f71-90bf-4cb5-a1dd-e7ac2b327d37.png" 
            alt="Student character with mint hair looking worried while studying" 
            className="w-full h-full object-contain animate-float opacity-80"
          />
        </div>
      </div>
      
      {/* Header */}
      <motion.header 
        className="relative z-10 py-4 px-6 flex justify-between items-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Logo size="md" />
        <div className="flex items-center space-x-3">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleSound}
            className="text-gray-300 hover:text-white hover:bg-white/10"
            aria-label={soundEnabled ? "Disable sound" : "Enable sound"}
          >
            {soundEnabled ? (
              <Volume2 className="h-5 w-5" />
            ) : (
              <VolumeX className="h-5 w-5" />
            )}
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-gray-300 hover:text-white hover:bg-white/10"
            aria-label="Settings"
            onClick={toggleSettings}
          >
            <SettingsIcon className="h-5 w-5" />
          </Button>
          <div onClick={toggleProfile}>
            <UserAvatar userInitials="M" />
          </div>
        </div>
      </motion.header>

      {/* Settings overlay - only displayed when settings button is clicked */}
      <Settings isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
      
      {/* User profile overlay - only displayed when avatar is clicked */}
      <UserProfile isOpen={profileOpen} onClose={() => setProfileOpen(false)} />

      {/* Main Content - Left Aligned */}
      <div className="container mx-auto px-4 md:px-6 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Form Content */}
          <div className="md:col-span-7 lg:col-span-5 md:ml-6 lg:ml-12">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-quiz-purple to-quiz-pink opacity-20 blur-xl rounded-3xl"></div>
              <div className="relative glass-effect p-6 rounded-3xl">
                <PreTestForm topicName={topic} />
              </div>
            </div>
          </div>
          
          {/* Empty space for the character that's now in the background */}
          <div className="md:col-span-5 lg:col-span-7"></div>
        </div>
      </div>
    </div>
  );
};

export default PreTest;
