import { useState, useEffect } from 'react';

export const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
    normalizedX: 0, // -1 to 1
    normalizedY: 0, // -1 to 1
  });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = e.clientX;
      const y = e.clientY;
      const normalizedX = (x / innerWidth) * 2 - 1;
      const normalizedY = -(y / innerHeight) * 2 + 1;

      setMousePosition({
        x,
        y,
        normalizedX,
        normalizedY,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return mousePosition;
};
