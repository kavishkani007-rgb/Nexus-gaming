import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AudioProvider } from './context/AudioContext.jsx';
import { Navbar } from './components/Navbar.jsx';
import { Footer } from './components/Footer.jsx';
import { CustomCursor } from './components/CustomCursor.jsx';
import { LoadingScreen } from './components/LoadingScreen.jsx';

import { Home } from './pages/Home.jsx';
import { Games } from './pages/Games.jsx';
import { GameDetails } from './pages/GameDetails.jsx';
import { Categories } from './pages/Categories.jsx';
import { Leaderboard } from './pages/Leaderboard.jsx';
import { Community } from './pages/Community.jsx';
import { About } from './pages/About.jsx';
import { NotFound } from './pages/NotFound.jsx';

// Helper component to reset scroll position on route changes
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/games" element={<Games />} />
        <Route path="/games/:id" element={<GameDetails />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/community" element={<Community />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <AudioProvider>
      {/* Initial Cyberpunk Boot Loader */}
      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <Router>
        <ScrollToTop />
        <CustomCursor />

        <div className="flex flex-col min-h-screen bg-nexus-bg text-gray-100 font-sans selection:bg-nexus-neonCyan selection:text-black">
          <Navbar />
          <main className="flex-grow">
            <AnimatedRoutes />
          </main>
          <Footer />
        </div>
      </Router>
    </AudioProvider>
  );
}
