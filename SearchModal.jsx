import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Star, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { GAMES_DATA } from '../data/games';
import { useAudio } from '../context/AudioContext';

export const SearchModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const { playHoverSound, playClickSound } = useAudio();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open search modal
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const filteredGames = query.trim() === ''
    ? GAMES_DATA.slice(0, 4)
    : GAMES_DATA.filter(g =>
        g.title.toLowerCase().includes(query.toLowerCase()) ||
        g.genre.toLowerCase().includes(query.toLowerCase()) ||
        g.developer.toLowerCase().includes(query.toLowerCase())
      );

  const handleSelectGame = (gameId) => {
    playClickSound();
    onClose();
    navigate(`/games/${gameId}`);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 md:pt-24 px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="relative w-full max-w-2xl bg-nexus-surface/95 border border-nexus-neonCyan/40 rounded-2xl shadow-[0_0_50px_rgba(0,240,255,0.2)] overflow-hidden z-10"
          >
            {/* Input Bar */}
            <div className="flex items-center px-4 py-4 border-b border-nexus-border">
              <Search className="w-6 h-6 text-nexus-neonCyan mr-3 shrink-0" />
              <input
                type="text"
                autoFocus
                placeholder="Search games by title, genre, developer... (Press Esc to exit)"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent text-white placeholder-gray-500 font-sans focus:outline-none text-base md:text-lg"
              />
              <button
                onClick={onClose}
                onMouseEnter={playHoverSound}
                className="p-1 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors ml-2"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content List */}
            <div className="p-4 max-h-[60vh] overflow-y-auto space-y-2">
              <div className="text-xs font-tech text-nexus-neonCyan uppercase tracking-widest px-2 mb-2">
                {query.trim() === '' ? 'Popular Search Suggestions' : `Found (${filteredGames.length}) Games`}
              </div>

              {filteredGames.length === 0 ? (
                <div className="py-12 text-center text-gray-400 font-sans">
                  No games matched your query "<span className="text-white">{query}</span>"
                </div>
              ) : (
                filteredGames.map((game) => (
                  <div
                    key={game.id}
                    onClick={() => handleSelectGame(game.id)}
                    onMouseEnter={playHoverSound}
                    className="flex items-center p-3 rounded-xl hover:bg-nexus-card border border-transparent hover:border-nexus-neonCyan/40 transition-all cursor-pointer group"
                  >
                    <img
                      src={game.image}
                      alt={game.title}
                      className="w-16 h-16 rounded-lg object-cover mr-4 shrink-0 group-hover:scale-105 transition-transform"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-display font-bold text-white text-base truncate group-hover:text-nexus-neonCyan transition-colors">
                          {game.title}
                        </h4>
                        <div className="flex items-center text-amber-400 text-xs font-bold shrink-0 ml-2">
                          <Star className="w-3.5 h-3.5 fill-amber-400 mr-1" />
                          {game.rating}
                        </div>
                      </div>
                      <p className="text-xs text-gray-400 truncate mb-1">{game.description}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] uppercase font-tech px-2 py-0.5 rounded bg-nexus-neonCyan/10 text-nexus-neonCyan border border-nexus-neonCyan/30">
                          {game.genre}
                        </span>
                        <span className="text-[10px] text-gray-500 font-tech">
                          {game.developer}
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-nexus-neonCyan group-hover:translate-x-1 transition-all ml-3 shrink-0" />
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="px-4 py-3 bg-nexus-bg/80 border-t border-nexus-border flex items-center justify-between text-xs text-gray-500 font-tech">
              <span>Pro Tip: Press <kbd className="px-1.5 py-0.5 rounded bg-nexus-card border border-nexus-border text-gray-300">Ctrl + K</kbd> anytime to open</span>
              <span>NEXUS SEARCH V2.4</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
