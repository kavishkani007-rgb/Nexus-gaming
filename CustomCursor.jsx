import React, { useEffect, useState } from 'react';
import { useMousePosition } from '../hooks/useMousePosition';

export const CustomCursor = () => {
  const { x, y } = useMousePosition();
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on non-touch devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    setIsVisible(true);
    document.body.classList.add('custom-cursor-enabled');

    const handleMouseOver = (e) => {
      const target = e.target;
      const isInteractive = target.closest('a, button, input, select, textarea, [role="button"], .interactive-cursor');
      setIsHovered(!!isInteractive);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.body.classList.remove('custom-cursor-enabled');
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Inner Glowing Cursor Dot */}
      <div
        className={`fixed top-0 left-0 w-3 h-3 rounded-full bg-nexus-neonCyan transition-transform duration-75 ease-out shadow-[0_0_12px_#00f0ff] ${
          isClicking ? 'scale-75' : isHovered ? 'scale-150 bg-nexus-neonPurple shadow-[0_0_15px_#a855f7]' : 'scale-100'
        }`}
        style={{
          transform: `translate3d(${x - 6}px, ${y - 6}px, 0)`,
        }}
      />

      {/* Outer Trailing Ring */}
      <div
        className={`fixed top-0 left-0 w-8 h-8 rounded-full border border-nexus-neonCyan/60 transition-all duration-300 ease-out pointer-events-none ${
          isHovered
            ? 'w-14 h-14 border-nexus-neonPurple bg-nexus-neonPurple/10 scale-110 shadow-[0_0_20px_rgba(168,85,247,0.3)]'
            : isClicking
            ? 'w-6 h-6 border-nexus-neonCyan scale-90'
            : 'scale-100'
        }`}
        style={{
          transform: `translate3d(${isHovered ? x - 28 : x - 16}px, ${isHovered ? y - 28 : y - 16}px, 0)`,
        }}
      />
    </div>
  );
};
