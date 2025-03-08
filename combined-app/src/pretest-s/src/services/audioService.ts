
// Audio player service

// A simple in-memory state for tracking the audio instance
let audioInstance: HTMLAudioElement | null = null;

// Initialize the audio player with a source file
export const initAudio = (audioSrc: string): HTMLAudioElement => {
  if (audioInstance) {
    audioInstance.pause();
    audioInstance = null;
  }
  
  audioInstance = new Audio(audioSrc);
  audioInstance.loop = true;
  return audioInstance;
};

// Play the current audio
export const playAudio = (): void => {
  if (audioInstance) {
    audioInstance.play().catch(error => {
      console.error('Error playing audio:', error);
    });
  }
};

// Pause the current audio
export const pauseAudio = (): void => {
  if (audioInstance) {
    audioInstance.pause();
  }
};

// Toggle play/pause
export const toggleAudio = (): boolean => {
  if (!audioInstance) return false;
  
  if (audioInstance.paused) {
    playAudio();
    return true;
  } else {
    pauseAudio();
    return false;
  }
};

// Check if audio is playing
export const isAudioPlaying = (): boolean => {
  return audioInstance ? !audioInstance.paused : false;
};

// Clean up the audio instance
export const cleanupAudio = (): void => {
  if (audioInstance) {
    audioInstance.pause();
    audioInstance = null;
  }
};
