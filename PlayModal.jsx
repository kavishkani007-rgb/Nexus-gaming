import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, ShieldCheck, Zap, Radio, Volume2 } from 'lucide-react';
import { useAudio } from '../context/AudioContext';

export const PlayModal = ({ isOpen, onClose, game }) => {
  const [isLaunching, setIsLaunching] = useState(false);
  const [launchProgress, setLaunchProgress] = useState(0);
  const { playClickSound, playSuccessSound } = useAudio();

  useEffect(() => {
    if (!isOpen) {
      setIsLaunching(false);
      setLaunchProgress(0);
    }
  }, [isOpen]);

  const handleLaunchGame = () => {
    playClickSound();
    setIsLaunching(true);
    let p = 0;
    const interval = setInterval(() => {
      p += 20;
      setLaunchProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        playSuccessSound();
      }
    }, 200);
  };

  if (!game) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative w-full max-w-4xl bg-nexus-surface border border-nexus-neonCyan/50 rounded-2xl shadow-[0_0_60px_rgba(0,240,255,0.3)] overflow-hidden z-10"
          >
            {/* Header Bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-nexus-border bg-nexus-card/50">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 rounded-full bg-nexus-neonCyan animate-ping" />
                <h3 className="font-display font-bold text-lg md:text-xl text-white">
                  LAUNCHING ARENA — {game.title}
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-1 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Video / Launch Content */}
            <div className="p-6">
              {isLaunching ? (
                <div className="py-16 flex flex-col items-center justify-center text-center">
                  <div className="relative mb-6">
                    <div className="w-24 h-24 rounded-full border-4 border-nexus-border border-t-nexus-neonCyan animate-spin flex items-center justify-center">
                      <Zap className="w-10 h-10 text-nexus-neonCyan animate-pulse" />
                    </div>
                  </div>
                  <h4 className="font-display text-2xl text-white mb-2">
                    {launchProgress < 100 ? 'CONNECTING TO HIGH-SPEED ARENA SERVER...' : 'CONNECTION ESTABLISHED!'}
                  </h4>
                  <p className="text-sm font-tech text-nexus-neonCyan mb-6">
                    SERVER PING: 12ms | ANTI-CHEAT STATUS: SECURE
                  </p>

                  <div className="w-full max-w-md bg-nexus-card border border-nexus-border rounded-full h-4 p-0.5 mb-4">
                    <div
                      className="h-full bg-gradient-to-r from-nexus-neonCyan to-nexus-neonPurple rounded-full transition-all duration-200"
                      style={{ width: `${launchProgress}%` }}
                    />
                  </div>

                  {launchProgress >= 100 && (
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="p-4 rounded-xl bg-nexus-neonCyan/10 border border-nexus-neonCyan/40 text-nexus-neonCyan font-bold font-display"
                    >
                      🎮 SESSION STARTED! HAPPY GAMING OPERATIVE.
                    </motion.div>
                  )}
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Embedded Trailer */}
                  <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-nexus-border shadow-2xl bg-black">
                    <iframe
                      className="w-full h-full"
                      src={`https://www.youtube.com/embed/${game.trailerId}?autoplay=1&mute=0`}
                      title={`${game.title} Official Trailer`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>

                  {/* Details Bar */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-3 rounded-xl bg-nexus-card border border-nexus-border flex items-center space-x-3">
                      <Radio className="w-6 h-6 text-nexus-neonCyan" />
                      <div>
                        <div className="text-[10px] text-gray-400 font-tech">SERVER REGION</div>
                        <div className="text-xs font-bold text-white font-display">US-EAST (VIRGINIA)</div>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-nexus-card border border-nexus-border flex items-center space-x-3">
                      <ShieldCheck className="w-6 h-6 text-emerald-400" />
                      <div>
                        <div className="text-[10px] text-gray-400 font-tech">ANTI-CHEAT</div>
                        <div className="text-xs font-bold text-emerald-400 font-display">NEXUS GUARD V4 ACTIVE</div>
                      </div>
                    </div>

                    <button
                      onClick={handleLaunchGame}
                      className="p-3 rounded-xl bg-gradient-to-r from-nexus-neonCyan via-nexus-neonBlue to-nexus-neonPurple text-black font-display font-extrabold flex items-center justify-center space-x-2 shadow-[0_0_20px_#00f0ff] hover:opacity-95 hover:scale-[1.02] transition-all cursor-pointer"
                    >
                      <Play className="w-5 h-5 fill-black" />
                      <span>LAUNCH GAME</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
