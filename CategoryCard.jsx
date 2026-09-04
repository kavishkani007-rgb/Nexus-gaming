import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, Zap, Compass, Flame, Shield, Cpu, Trophy, Skull, Users } from 'lucide-react';
import { useAudio } from '../context/AudioContext';

const ICON_MAP = {
  Zap,
  Compass,
  Flame,
  Shield,
  Cpu,
  Trophy,
  Skull,
  Users
};

export const CategoryCard = ({ category }) => {
  const navigate = useNavigate();
  const { playHoverSound, playClickSound } = useAudio();
  const IconComponent = ICON_MAP[category.iconName] || Zap;

  const handleClick = () => {
    playClickSound();
    navigate(`/games?category=${category.name}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ y: -6 }}
      onClick={handleClick}
      onMouseEnter={playHoverSound}
      className={`group relative aspect-[4/3] rounded-2xl overflow-hidden border ${category.borderColor} bg-nexus-surface cursor-pointer shadow-xl transition-all duration-300`}
    >
      {/* Background Image with Zoom */}
      <img
        src={category.image}
        alt={category.name}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60 group-hover:opacity-80"
      />

      {/* Gradient Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-t from-nexus-bg via-nexus-bg/50 to-transparent opacity-90 group-hover:opacity-75 transition-opacity`} />

      {/* Top Header Pill */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
        <div className="p-2.5 rounded-xl bg-nexus-card/80 backdrop-blur-md border border-white/10 text-nexus-neonCyan group-hover:scale-110 transition-transform">
          <IconComponent className="w-5 h-5" style={{ color: category.color }} />
        </div>
        <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs font-tech font-bold text-gray-300">
          {category.gameCount} ARENAS
        </span>
      </div>

      {/* Bottom Content */}
      <div className="absolute bottom-4 left-4 right-4 z-10 space-y-1">
        <div className="flex items-center justify-between">
          <h3 className="font-display font-black text-xl md:text-2xl text-white group-hover:text-nexus-neonCyan transition-colors">
            {category.name}
          </h3>
          <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-nexus-neonCyan group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
        </div>
        <p className="text-xs text-gray-400 font-sans line-clamp-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {category.description}
        </p>
      </div>

      {/* Glow highlight */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-nexus-neonCyan/40 rounded-2xl pointer-events-none transition-colors" />
    </motion.div>
  );
};
