import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Play, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAudio } from '../context/AudioContext';

export const GameCard = ({ game, onPlayClick }) => {
  const navigate = useNavigate();
  const { playHoverSound, playClickSound } = useAudio();
  const [transformStyle, setTransformStyle] = useState('perspective(1000px) rotateX(0deg) rotateY(0deg)');

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left;
    const y = e.clientY - box.top;
    const centerX = box.width / 2;
    const centerY = box.height / 2;

    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    setTransformStyle(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
  };

  const handleMouseLeave = () => {
    setTransformStyle('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      style={{ transform: transformStyle, transition: 'transform 0.15s ease-out' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={playHoverSound}
      className="group relative bg-nexus-surface border border-nexus-border hover:border-nexus-neonCyan/60 rounded-2xl overflow-hidden shadow-xl hover:shadow-[0_0_30px_rgba(0,240,255,0.25)] transition-colors duration-300 flex flex-col h-full"
    >
      {/* Top Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-nexus-card">
        <img
          src={game.image}
          alt={game.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-nexus-surface via-nexus-surface/20 to-transparent" />

        {/* Rating Badge */}
        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-amber-500/40 text-amber-400 font-display text-xs font-bold flex items-center shadow-lg">
          <Star className="w-3.5 h-3.5 fill-amber-400 mr-1" />
          {game.rating}
        </div>

        {/* Genre Pill */}
        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-nexus-neonCyan/20 border border-nexus-neonCyan/40 backdrop-blur-md text-nexus-neonCyan font-tech text-xs font-bold uppercase tracking-wider">
          {game.genre}
        </div>

        {/* Play Overlay Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            playClickSound();
            if (onPlayClick) onPlayClick(game);
          }}
          className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
        >
          <div className="w-14 h-14 rounded-full bg-nexus-neonCyan text-black flex items-center justify-center shadow-[0_0_25px_#00f0ff] transform scale-75 group-hover:scale-100 transition-transform duration-300">
            <Play className="w-6 h-6 fill-black ml-1" />
          </div>
        </button>
      </div>

      {/* Card Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-center justify-between text-xs text-gray-400 font-tech mb-1">
            <span>{game.developer}</span>
            <span>{game.releaseYear}</span>
          </div>

          <h3 className="font-display font-bold text-lg text-white group-hover:text-nexus-neonCyan transition-colors line-clamp-1">
            {game.title}
          </h3>

          <p className="text-xs text-gray-400 font-sans line-clamp-2 leading-relaxed mt-1">
            {game.description}
          </p>
        </div>

        {/* Platforms & Details CTA */}
        <div className="pt-3 border-t border-nexus-border/60 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {game.platforms.map((platform) => (
              <span
                key={platform}
                className="text-[10px] font-tech px-2 py-0.5 rounded bg-nexus-card border border-nexus-border text-gray-300"
              >
                {platform}
              </span>
            ))}
          </div>

          <button
            onClick={() => {
              playClickSound();
              navigate(`/games/${game.id}`);
            }}
            className="flex items-center space-x-1 text-xs font-tech font-bold text-nexus-neonCyan group-hover:text-white transition-colors cursor-pointer"
          >
            <span>DETAILS</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
