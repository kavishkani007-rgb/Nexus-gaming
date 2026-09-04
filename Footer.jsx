import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Gamepad2, Radio, Send, CheckCircle2, Shield, Heart } from 'lucide-react';
import { useAudio } from '../context/AudioContext';

export const Footer = () => {
  const { playHoverSound, playClickSound, playSuccessSound } = useAudio();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      playSuccessSound();
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="relative bg-nexus-surface/90 border-t border-nexus-border/80 pt-16 pb-12 overflow-hidden z-10">
      {/* Background Neon Accent Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-nexus-neonCyan/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Col 1: Platform Brand Identity & Status */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-xl bg-nexus-card border border-nexus-neonCyan/40 shadow-[0_0_15px_rgba(0,240,255,0.2)]">
                <Gamepad2 className="w-6 h-6 text-nexus-neonCyan" />
              </div>
              <div>
                <span className="font-display font-black text-2xl tracking-wider text-white">
                  NEXUS
                </span>
                <span className="font-tech text-xs text-nexus-neonCyan font-bold tracking-widest block -mt-1">
                  GAMING
                </span>
              </div>
            </div>

            <p className="text-sm text-gray-400 font-sans max-w-sm leading-relaxed">
              The world's premier AAA gaming platform. Discover revolutionary virtual worlds, battle global champions, and conquer competitive arenas.
            </p>

            {/* System Status Pill */}
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-tech">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>ALL SYSTEMS OPERATIONAL — LATENCY 14ms</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider mb-4 border-l-2 border-nexus-neonCyan pl-2">
              PLATFORM
            </h4>
            <ul className="space-y-2 text-sm">
              {['Home', 'Games', 'Categories', 'Leaderboard', 'Community', 'About'].map((item) => (
                <li key={item}>
                  <NavLink
                    to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                    onMouseEnter={playHoverSound}
                    onClick={playClickSound}
                    className="text-gray-400 hover:text-nexus-neonCyan transition-colors hover:translate-x-1 inline-block transform"
                  >
                    {item}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Popular Categories */}
          <div>
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider mb-4 border-l-2 border-nexus-neonPurple pl-2">
              CATEGORIES
            </h4>
            <ul className="space-y-2 text-sm">
              {['Action', 'Adventure', 'Racing', 'RPG', 'Strategy', 'Multiplayer'].map((cat) => (
                <li key={cat}>
                  <NavLink
                    to={`/games?category=${cat}`}
                    onMouseEnter={playHoverSound}
                    onClick={playClickSound}
                    className="text-gray-400 hover:text-nexus-neonPurple transition-colors hover:translate-x-1 inline-block transform"
                  >
                    {cat} Arenas
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div>
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider mb-4 border-l-2 border-nexus-neonPink pl-2">
              COMMUNITY INTEL
            </h4>
            <p className="text-xs text-gray-400 mb-3">
              Subscribe for exclusive tournament invitations, beta access keys, and hardware giveaways.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="Enter your email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-nexus-card border border-nexus-border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-nexus-neonCyan transition-colors"
                />
                <button
                  type="submit"
                  onMouseEnter={playHoverSound}
                  className="absolute right-1 top-1 bottom-1 px-3 bg-nexus-neonCyan text-black font-tech font-bold text-xs rounded-lg hover:bg-white transition-colors cursor-pointer flex items-center"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>

              {subscribed && (
                <div className="flex items-center text-xs text-emerald-400 font-tech space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Subscribed to Nexus Intel!</span>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-8 border-t border-nexus-border/60 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 font-tech gap-4">
          <p>© {new Date().getFullYear()} NEXUS GAMING INC. ALL RIGHTS RESERVED.</p>

          <div className="flex items-center space-x-6">
            <a href="#" className="hover:text-nexus-neonCyan transition-colors">PRIVACY POLICY</a>
            <a href="#" className="hover:text-nexus-neonCyan transition-colors">TERMS OF SERVICE</a>
            <a href="#" className="hover:text-nexus-neonCyan transition-colors">SECURITY AUDIT</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
