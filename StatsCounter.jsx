import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export const StatsCounter = ({ value, label, sublabel, prefix = '', suffix = '' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState(0);

  const numericTarget = typeof value === 'number' ? value : parseFloat(value.toString().replace(/,/g, '')) || 100;

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const stepTime = 30;
      const steps = duration / stepTime;
      const increment = numericTarget / steps;

      const timer = setInterval(() => {
        start += increment;
        if (start >= numericTarget) {
          setDisplayValue(numericTarget);
          clearInterval(timer);
        } else {
          setDisplayValue(Math.floor(start));
        }
      }, stepTime);

      return () => clearInterval(timer);
    }
  }, [isInView, numericTarget]);

  return (
    <div ref={ref} className="text-center p-6 rounded-2xl bg-nexus-surface/60 border border-nexus-border/60 glass-panel-hover">
      <div className="font-display font-black text-3xl md:text-4xl text-gradient-cyan mb-1">
        {prefix}{displayValue.toLocaleString()}{suffix}
      </div>
      <div className="font-display font-bold text-sm text-white tracking-wider uppercase mb-1">
        {label}
      </div>
      {sublabel && (
        <div className="font-tech text-xs text-gray-400">
          {sublabel}
        </div>
      )}
    </div>
  );
};
