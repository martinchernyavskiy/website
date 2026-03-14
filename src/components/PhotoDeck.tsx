import React, { useState, useEffect, useCallback } from 'react';
import CatFace from './CatFace'; 

const cards = [
  { id: 1, label: 'photo_01', color: 'bg-sky-50 dark:bg-sky-950/40' },
  { id: 2, label: 'photo_02', color: 'bg-indigo-50 dark:bg-indigo-950/40' },
  { id: 3, label: 'photo_03', color: 'bg-slate-50 dark:bg-slate-900/40' },
];

export default function PhotoDeck() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lastInteraction, setLastInteraction] = useState(Date.now());

  const nextCard = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % cards.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      nextCard();
    }, 5000);
    return () => clearInterval(timer);
  }, [lastInteraction, nextCard]);

  const handleManualClick = () => {
    nextCard();
    setLastInteraction(Date.now());
  };

  const getCardStyle = (index: number) => {
    const relativeIndex = (index - activeIndex + cards.length) % cards.length;
    if (relativeIndex === 0) return "z-30 translate-x-0 translate-y-0 rotate-[-2deg] scale-100 opacity-100 shadow-xl";
    if (relativeIndex === 1) return "z-20 translate-x-4 translate-y-3 rotate-[4deg] scale-95 opacity-90 shadow-md";
    return "z-10 -translate-x-3 translate-y-5 rotate-[-5deg] scale-90 opacity-70 shadow-sm";
  };

  return (
    <div className="relative w-64 h-80 cursor-pointer group/deck" onClick={handleManualClick}>
      {cards.map((card, index) => {
        const relativeIndex = (index - activeIndex + cards.length) % cards.length;
        return (
          <div 
            key={card.id}
            className={`absolute inset-0 bg-white dark:bg-sky-900 p-3 pb-12 rounded-sm 
                        border border-slate-200 dark:border-sky-800 
                        transition-all duration-700 cubic-bezier(0.34, 1.56, 0.64, 1) origin-bottom
                        ${getCardStyle(index)} 
                        ${relativeIndex === 0 ? 'group-hover/deck:rotate-0' : ''}`}
          >
            <div className={`w-full h-full flex items-center justify-center rounded-sm transition-colors duration-700 ${card.color}`}>
              <CatFace size={80} className="text-sky-300 dark:text-sky-700 opacity-40" />
            </div>
            <div className="absolute bottom-3 left-0 right-0 text-center">
              <span className="text-xs font-mono uppercase tracking-widest text-slate-400 dark:text-sky-700">{card.label}</span>
            </div>
          </div>
        );
      })}
      <div className="absolute -inset-2 bg-sky-400/20 blur-2xl -z-10 rounded-full opacity-0 group-hover/deck:opacity-100 transition-opacity duration-500"></div>
    </div>
  );
}