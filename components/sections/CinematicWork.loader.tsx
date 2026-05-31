'use client';

import { useEffect, useState } from 'react';

interface LoaderProps {
  isLoading: boolean;
}

export default function CinematicLoader({ isLoading }: LoaderProps) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => setShow(false), 600);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  if (!show) return null;

  return (
    <div
      className={`absolute inset-0 z-[50] bg-black transition-opacity duration-500 ${
        isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
        <span
          className="block w-2 h-2 rounded-full bg-white"
          style={{ animation: 'cinematicPulse 1s ease-in-out infinite' }}
        />
      </div>
      <style>{`
        @keyframes cinematicPulse {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(2); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
