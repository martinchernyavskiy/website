import React, { useState, useEffect, useCallback } from 'react';

interface FlashCard { front: string; back: string; }
interface DeckEntry { courseCode: string; courseName: string; cards: FlashCard[]; }

const ALL_DECKS: DeckEntry[] = [
  {
    courseCode: 'CS 537',
    courseName: 'Operating Systems',
    cards: [
      { front: 'What is the key difference between a process and a thread?',          back: 'A process has its own address space; threads share the address space of their parent process but have independent stacks and registers.' },
      { front: "What problem does Peterson's algorithm solve?",                       back: 'Mutual exclusion for two processes sharing a critical section, using only shared memory and without hardware atomics.' },
      { front: 'What is a TLB shootdown?',                                            back: 'When a page mapping changes, all CPUs caching that mapping in their TLBs must be notified via IPI to invalidate the stale entry.' },
      { front: 'What is the difference between internal and external fragmentation?', back: 'Internal: wasted space inside an allocated block. External: free memory exists but is split into non-contiguous chunks too small to satisfy a request.' },
      { front: 'Why does xv6 use a linked list for the free page list?',              back: 'Simplicity — allocation and free are O(1) without needing to scan a bitmap. The tradeoff is no efficient range queries.' },
    ],
  },
];

const ALL_CARDS: Array<FlashCard & { courseCode: string; courseName: string }> =
  ALL_DECKS.flatMap(d => d.cards.map(c => ({ ...c, courseCode: d.courseCode, courseName: d.courseName })));

function pickRandom(exclude?: number): number {
  if (ALL_CARDS.length <= 1) return 0;
  let idx: number;
  do { idx = Math.floor(Math.random() * ALL_CARDS.length); } while (idx === exclude);
  return idx;
}

export default function RandomCard() {
  const [open,    setOpen]    = useState(false);
  const [idx,     setIdx]     = useState(() => pickRandom());
  const [flipped, setFlipped] = useState(false);

  const card = ALL_CARDS[idx];

  const next = useCallback(() => {
    setFlipped(false);
    setTimeout(() => setIdx(i => pickRandom(i)), 120);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
      if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); setFlipped(f => !f); }
      if (e.key === 'ArrowRight' || e.key === 'n') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, next]);

  const openModal = () => { setIdx(pickRandom()); setFlipped(false); setOpen(true); };

  return (
    <>
      <button
        onClick={openModal}
        className="cursor-pointer flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-mono font-bold uppercase tracking-widest transition-all duration-200 border border-sky-200 dark:border-sky-800 text-sky-500 dark:text-sky-400 hover:border-sky-400 dark:hover:border-sky-500 hover:bg-sky-50 dark:hover:bg-sky-900/30 hover:text-sky-600 dark:hover:text-sky-300"
      >
        <svg width="11" height="11" viewBox="0 0 12 12" fill="none" className="flex-shrink-0">
          <path d="M2 2h2v2H2zM5 2h2v2H5zM8 2h2v2H8zM2 5h2v2H2zM5 5h2v2H5zM8 5h2v2H8zM2 8h2v2H2zM5 8h2v2H5zM8 8h2v2H8z" fill="currentColor" opacity="0.5" />
          <path d="M5 5h2v2H5z" fill="currentColor" />
        </svg>
        Random card
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setOpen(false)}
        >
          <div className="absolute inset-0 bg-sky-950/60 backdrop-blur-sm" />

          <div
            className="relative z-10 w-full max-w-md rounded-2xl border border-sky-700/50 bg-sky-950 shadow-2xl shadow-sky-950/80 p-6 space-y-5"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-0.5">
                <p className="text-[9px] font-mono font-bold uppercase tracking-widest text-sky-500">
                  {card.courseCode} · {card.courseName}
                </p>
                <p className="text-[9px] font-mono text-sky-700 uppercase tracking-widest">
                  {ALL_CARDS.length} cards across {ALL_DECKS.length} deck{ALL_DECKS.length !== 1 ? 's' : ''}
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-6 h-6 flex-shrink-0 flex items-center justify-center rounded-full bg-sky-800/50 hover:bg-sky-700/50 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <svg width="9" height="9" viewBox="0 0 8 8" fill="none">
                  <path d="M1 1L7 7M7 1L1 7" stroke="#7dd3fc" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <div
              className="relative rounded-xl border border-sky-800/60 bg-sky-900/50 overflow-hidden cursor-pointer select-none"
              style={{ minHeight: '130px' }}
              onClick={() => setFlipped(f => !f)}
            >
              <div
                className="absolute inset-0 flex flex-col items-center justify-center px-5 py-4 text-center"
                style={{ opacity: flipped ? 0 : 1, transition: 'opacity 0.15s ease', pointerEvents: flipped ? 'none' : 'auto' }}
              >
                <span className="text-[8px] font-mono uppercase tracking-widest text-sky-600 mb-3">
                  front · tap to reveal
                </span>
                <p className="text-sm font-semibold text-sky-100 leading-snug">{card.front}</p>
              </div>
              <div
                className="absolute inset-0 flex flex-col items-center justify-center px-5 py-4 text-center"
                style={{ opacity: flipped ? 1 : 0, transition: 'opacity 0.15s ease', pointerEvents: flipped ? 'auto' : 'none' }}
              >
                <span className="text-[8px] font-mono uppercase tracking-widest text-sky-600 mb-3">back</span>
                <p className="text-sm text-sky-200 leading-relaxed">{card.back}</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-[9px] font-mono text-sky-700">
                space / enter to flip · → or n for next · esc to close
              </p>
              <button
                onClick={next}
                className="cursor-pointer flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold uppercase tracking-widest border border-sky-700/60 text-sky-400 hover:border-sky-500 hover:text-sky-300 transition-all"
              >
                Next
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M2 5h6M5.5 2.5L8 5l-2.5 2.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}