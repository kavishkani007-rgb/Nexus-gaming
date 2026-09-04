import React, { createContext, useContext, useState } from 'react';

const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const [isMuted, setIsMuted] = useState(false);

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  const playSound = (soundUrl) => {
    if (!isMuted && soundUrl) {
      const audio = new Audio(soundUrl);
      audio.play().catch((err) => console.log('Audio playback prevented:', err));
    }
  };

  return (
    <AudioContext.Provider value={{ isMuted, toggleMute, playSound }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => useContext(AudioContext);

export default AudioContext;
