import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trophy, Shield, Flame, Award, Settings, UserCheck } from 'lucide-react';
import { useAudio } from '../context/AudioContext';

export const ProfileModal = ({ isOpen, onClose }) => {
  const { playHoverSound } = useAudio();

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative w-full max-w-lg bg-nexus-surface border border-nexus-neonPurple/50 rounded-2xl shadow-[0_0_50px_rgba(168,85,247,0.3)] overflow-hidden z-10"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-nexus-border bg-nexus-card/40">
              <div className="flex items-center space-x-2">
                <UserCheck className="w-5 h-5 text-nexus-neonPurple" />
                <h3 className="font-display font-bold text-lg text-white">OPERATIVE PROFILE</h3>
              </div>
              <button
                onClick={onClose}
                onMouseEnter={playHoverSound}
                className="p-1 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Profile Body */}
            <div className="p-6 space-y-6">
              {/* User Identity Header */}
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=200&auto=format&fit=crop"
                    alt="Cyber Operative Avatar"
                    className="w-20 h-20 rounded-2xl object-cover border-2 border-nexus-neonCyan shadow-[0_0_20px_#00f0ff]"
                  />
                  <span className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded-md bg-nexus-neonPurple text-black text-[10px] font-display font-extrabold shadow-md">
                    LVL 99
                  </span>
                </div>

                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="font-display font-extrabold text-xl text-white">VORTEX_PRIME</h4>
                    <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/40 text-[10px] font-tech font-bold uppercase">
                      PRO
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 font-sans">Alexey Volkov • Member since 2024</p>
                  <p className="text-xs text-nexus-neonCyan font-tech mt-1">RANK #1 GLOBAL LEADERBOARD</p>
                </div>
              </div>

              {/* Level XP Bar */}
              <div className="p-4 rounded-xl bg-nexus-card border border-nexus-border space-y-2">
                <div className="flex justify-between text-xs font-tech">
                  <span className="text-gray-400">LEVEL 99 XP PROGRESS</span>
                  <span className="text-nexus-neonPurple font-bold">14,250 / 15,000 XP</span>
                </div>
                <div className="w-full bg-nexus-bg rounded-full h-2 overflow-hidden border border-nexus-border">
                  <div className="h-full bg-gradient-to-r from-nexus-neonCyan to-nexus-neonPurple w-[95%]" />
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3 rounded-xl bg-nexus-card border border-nexus-border">
                  <Trophy className="w-5 h-5 text-amber-400 mx-auto mb-1" />
                  <div className="text-lg font-display font-bold text-white">984,500</div>
                  <div className="text-[10px] font-tech text-gray-400 uppercase">SCORE</div>
                </div>

                <div className="p-3 rounded-xl bg-nexus-card border border-nexus-border">
                  <Flame className="w-5 h-5 text-nexus-neonCyan mx-auto mb-1" />
                  <div className="text-lg font-display font-bold text-white">1,420</div>
                  <div className="text-[10px] font-tech text-gray-400 uppercase">MATCHES</div>
                </div>

                <div className="p-3 rounded-xl bg-nexus-card border border-nexus-border">
                  <Award className="w-5 h-5 text-nexus-neonPurple mx-auto mb-1" />
                  <div className="text-lg font-display font-bold text-white">89.4%</div>
                  <div className="text-[10px] font-tech text-gray-400 uppercase">WIN RATE</div>
                </div>
              </div>

              {/* Badges */}
              <div>
                <h5 className="text-xs font-tech text-nexus-neonCyan uppercase tracking-wider mb-2">
                  UNLOCKED BADGES
                </h5>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/40 text-xs font-tech font-bold">
                    🥇 GRANDMASTER
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-nexus-neonCyan/20 text-nexus-neonCyan border border-nexus-neonCyan/40 text-xs font-tech font-bold">
                    ⚡ LIGHT SPEED
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-nexus-neonPurple/20 text-nexus-neonPurple border border-nexus-neonPurple/40 text-xs font-tech font-bold">
                    💀 VOID SLAYER
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
