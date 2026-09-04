import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, User, Menu, X, Gamepad2, Volume2, VolumeX } from 'lucide-react';
import { useScrollProgress } from '../hooks/useScrollProgress';
import { useAudio } from '../context/AudioContext';
import { SearchModal } from './SearchModal';
import { ProfileModal } from './ProfileModal';

export const Navbar = () => {
  const { isScrolled } = useScrollProgress();
  const { isMuted, toggleMute, playHoverSound, playClickSound } = useAudio();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Games', path: '/games' },
    { name: 'Categories', path: '/categories' },
    { name: 'Leaderboard', path: '/leaderboard' },
    { name: 'Community', path: '/community' },
    { name: 'About', path: '/about' },
  ];

  const handleNavClick = () => {
    playClickSound();
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-nexus-bg/85 backdrop-blur-md border-b border-nexus-border/60 shadow-[0_10px_30px_rgba(0,0,0,0.8)] py-3'
            : 'bg-gradient-to-b from-nexus-bg/90 via-nexus-bg/50 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <NavLink
            to="/"
            onClick={handleNavClick}
            onMouseEnter={playHoverSound}
            className="flex items-center space-x-3 group cursor-pointer"
          >
            <div className="relative p-2 rounded-xl bg-nexus-surface border border-nexus-neonCyan/40 group-hover:border-nexus-neonCyan group-hover:shadow-[0_0_20px_#00f0ff] transition-all">
              <Gamepad2 className="w-6 h-6 text-nexus-neonCyan group-hover:scale-110 transition-transform" />
              <div className="absolute inset-0 rounded-xl bg-nexus-neonCyan/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div>
              <span className="font-display font-black text-xl md:text-2xl tracking-wider text-white">
                NEXUS
              </span>
              <span className="font-tech text-xs text-nexus-neonCyan font-bold tracking-widest block -mt-1">
                GAMING
              </span>
            </div>
          </NavLink>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-1 glass-panel px-4 py-1.5 rounded-full border-nexus-border/50">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onMouseEnter={playHoverSound}
                onClick={handleNavClick}
                className={({ isActive }) =>
                  `relative px-4 py-2 text-sm font-sans font-semibold transition-all duration-200 ${
                    isActive
                      ? 'text-nexus-neonCyan'
                      : 'text-gray-300 hover:text-white'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{link.name}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-nexus-neonCyan to-nexus-neonPurple rounded-full shadow-[0_0_8px_#00f0ff]"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Right Utilities (Audio, Search, Profile, Hamburger) */}
          <div className="flex items-center space-x-2 md:space-x-3">
            {/* Audio Toggle */}
            <button
              onClick={toggleMute}
              onMouseEnter={playHoverSound}
              aria-label="Toggle UI Audio SFX"
              title={isMuted ? "Enable Sound Effects" : "Mute Sound Effects"}
              className="p-2.5 rounded-xl bg-nexus-surface/80 border border-nexus-border hover:border-nexus-neonCyan text-gray-300 hover:text-nexus-neonCyan transition-all cursor-pointer"
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5 text-nexus-neonCyan animate-pulse" />}
            </button>

            {/* Search Trigger */}
            <button
              onClick={() => {
                playClickSound();
                setIsSearchOpen(true);
              }}
              onMouseEnter={playHoverSound}
              aria-label="Search games"
              className="p-2.5 rounded-xl bg-nexus-surface/80 border border-nexus-border hover:border-nexus-neonCyan text-gray-300 hover:text-nexus-neonCyan transition-all cursor-pointer flex items-center space-x-2"
            >
              <Search className="w-5 h-5" />
              <span className="hidden md:inline-block text-xs font-tech text-gray-400">SEARCH</span>
            </button>

            {/* Profile Trigger */}
            <button
              onClick={() => {
                playClickSound();
                setIsProfileOpen(true);
              }}
              onMouseEnter={playHoverSound}
              aria-label="View user profile"
              className="p-2.5 rounded-xl bg-nexus-surface/80 border border-nexus-neonPurple/40 hover:border-nexus-neonPurple text-nexus-neonPurple hover:shadow-[0_0_15px_rgba(168,85,247,0.4)] transition-all cursor-pointer"
            >
              <User className="w-5 h-5" />
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => {
                playClickSound();
                setIsMobileMenuOpen(!isMobileMenuOpen);
              }}
              aria-label="Toggle navigation drawer"
              className="lg:hidden p-2.5 rounded-xl bg-nexus-surface border border-nexus-border text-white cursor-pointer"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-30 bg-nexus-bg/95 backdrop-blur-xl lg:hidden flex flex-col pt-24 px-6 pb-8"
          >
            <nav className="flex flex-col space-y-4 my-auto">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={handleNavClick}
                  className={({ isActive }) =>
                    `text-2xl font-display font-bold py-3 px-4 rounded-xl border transition-all ${
                      isActive
                        ? 'bg-nexus-neonCyan/10 border-nexus-neonCyan text-nexus-neonCyan shadow-[0_0_20px_rgba(0,240,255,0.2)]'
                        : 'border-transparent text-gray-300 hover:text-white hover:bg-nexus-surface'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </nav>

            <div className="pt-6 border-t border-nexus-border flex flex-col space-y-4 text-center">
              <p className="text-xs text-gray-400 font-tech">NEXUS GAMING PLATFORM V2.4</p>
              <button
                onClick={() => {
                  handleNavClick();
                  setIsSearchOpen(true);
                }}
                className="w-full py-3 rounded-xl bg-nexus-surface border border-nexus-neonCyan text-nexus-neonCyan font-display font-bold"
              >
                🔍 QUICK SEARCH
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modals */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <ProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
    </>
  );
};
