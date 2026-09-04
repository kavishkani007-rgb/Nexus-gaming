import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gamepad2, ShieldAlert } from 'lucide-react';

export const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('INITIALIZING CORE ENGINE...');

  useEffect(() => {
    const statuses = [
      'INITIALIZING CORE ENGINE...',
      'CONNECTING TO NEXUS NET MESH...',
      'LOADING 3D GRAPHICS SHADERS...',
      'SYNCING LEADERBOARD DATA...',
      'SYSTEM READY — WELCOME OPERATIVE'
    ];

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.floor(Math.random() * 15) + 5;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 400);
          return 100;
        }

        const idx = Math.min(Math.floor((next / 100) * statuses.length), statuses.length - 1);
        setStatusText(statuses[idx]);
        return next;
      });
    }, 120);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6 } }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-nexus-bg text-white selection:bg-none"
    >
      {/* Background Cyber Grid Lines */}
      <div className="absolute inset-0 scanline-bg opacity-30 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,240,255,0.08)_0,transparent_70%)]" />

      {/* Main Logo & Loader */}
      <div className="relative z-10 flex flex-col items-center max-w-md w-full px-6">
        <motion.div
          animate={{ scale: [0.95, 1.05, 0.95], rotate: [0, 5, -5, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
          className="relative mb-8 p-4 rounded-2xl bg-nexus-surface/80 border border-nexus-neonCyan/40 shadow-[0_0_40px_rgba(0,240,255,0.3)]"
        >
          <Gamepad2 className="w-16 h-16 text-nexus-neonCyan" />
          <div className="absolute inset-0 rounded-2xl border border-nexus-neonPurple/50 animate-pulse" />
        </motion.div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-extrabold font-display tracking-widest text-center mb-2">
          <span className="text-gradient-cyan">NEXUS</span> GAMING
        </h1>
        <p className="text-xs font-tech text-nexus-neonCyan tracking-wider uppercase mb-8">
          ENTER THE NEXT LEVEL
        </p>

        {/* Progress Bar Container */}
        <div className="w-full bg-nexus-card border border-nexus-border rounded-full h-3 p-0.5 relative overflow-hidden mb-4 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-nexus-neonCyan via-nexus-neonBlue to-nexus-neonPurple shadow-[0_0_12px_#00f0ff]"
            style={{ width: `${progress}%` }}
            transition={{ ease: 'easeOut' }}
          />
        </div>

        {/* Status text & Percentage */}
        <div className="w-full flex justify-between items-center text-xs font-tech text-gray-400 tracking-wider">
          <span className="truncate pr-2">{statusText}</span>
          <span className="text-nexus-neonCyan font-bold text-sm font-display">{progress}%</span>
        </div>
      </div>
    </motion.div>
  );
};
