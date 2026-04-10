import React, { useState, useEffect, useCallback } from 'react';

const cards = [
  { id: 1, src: '/photos/1.JPG', label: 'lake mendota', scale: 1.25, objectPosition: 'center 40%' },
  { id: 2, src: '/photos/2.JPG', label: 'beijing',      scale: 1.0, objectPosition: 'center top'  },
  { id: 3, src: '/photos/3.JPG', label: 'my cats',          scale: 1.0, objectPosition: 'center top'  },
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
                        transition-all duration-700 origin-bottom
                        ${getCardStyle(index)}
                        ${relativeIndex === 0 ? 'group-hover/deck:rotate-0' : ''}`}
          >
            <div className="w-full h-full rounded-sm overflow-hidden">
              <img
                src={card.src}
                alt={card.label}
                draggable={false}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: card.objectPosition,
                  transform: `scale(${card.scale})`,
                  transformOrigin: 'center center',
                }}
              />
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