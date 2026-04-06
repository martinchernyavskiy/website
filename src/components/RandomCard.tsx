import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ALL_FLAT_CARDS, GROUP_LABELS, type FlatCard } from '../lib/flashcards';

const GROUP_COLORS: Record<string, string> = {
  'hardware':     '#38bdf8',
  'systems-prog': '#22d3ee',
  'memory':       '#818cf8',
  'os':           '#a78bfa',
  'concurrency':  '#f472b6',
  'data':         '#34d399',
  'networking':   '#fbbf24',
  'distributed':  '#fb923c',
  'ai':           '#f87171',
};

const ALL_GROUPS = Object.keys(GROUP_LABELS);
const TOTAL_CARDS    = ALL_FLAT_CARDS.length;
const TOTAL_CONCEPTS = new Set(ALL_FLAT_CARDS.map(c => c.conceptLabel)).size;
const TOTAL_GROUPS   = ALL_GROUPS.length;

function pickRandom(pool: FlatCard[], exclude?: FlatCard): FlatCard {
  if (pool.length === 1) return pool[0];
  let card: FlatCard;
  do { card = pool[Math.floor(Math.random() * pool.length)]; }
  while (card === exclude && pool.length > 1);
  return card;
}

function CategorySelector({ onStart }: { onStart: (groups: Set<string>) => void }) {
  const [selected, setSelected] = useState<Set<string>>(new Set(ALL_GROUPS));
  const toggle = (g: string) => setSelected(prev => {
    const next = new Set(prev);
    if (next.has(g)) { if (next.size > 1) next.delete(g); } else next.add(g);
    return next;
  });
  const totalCards = ALL_FLAT_CARDS.filter(c => selected.has(c.group)).length;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <p style={{ fontSize: '14px', fontWeight: 600, color: '#e0f2fe', marginBottom: '4px' }}>Choose categories</p>
        <p style={{ fontSize: '12px', color: '#38bdf8' }}>{totalCards} cards in selection</p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {ALL_GROUPS.map(g => {
          const isOn = selected.has(g);
          const color = GROUP_COLORS[g];
          const count = ALL_FLAT_CARDS.filter(c => c.group === g).length;
          return (
            <button key={g} onClick={() => toggle(g)}
              style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                padding: '8px 12px', borderRadius: '8px',
                cursor: 'pointer', textAlign: 'left', border: 'none',
                background: isOn ? color + '18' : 'none',
                outline: '1px solid ' + (isOn ? color + '60' : '#1e3a5f'),
                transition: 'all 0.15s',
                WebkitAppearance: 'none', appearance: 'none', boxSizing: 'border-box',
              }}>
              <span style={{
                width: '10px', height: '10px', borderRadius: '50%', flexShrink: 0,
                background: isOn ? color : '#1e3a5f',
                boxShadow: isOn ? ('0 0 6px ' + color + '80') : 'none',
                transition: 'all 0.15s',
              }} />
              <span style={{ flex: 1, fontSize: '11px', fontFamily: 'monospace', fontWeight: 600, color: isOn ? color : '#475569' }}>
                {GROUP_LABELS[g]}
              </span>
              <span style={{ fontSize: '10px', fontFamily: 'monospace', fontVariantNumeric: 'tabular-nums', color: isOn ? color + 'aa' : '#334155' }}>
                {count}
              </span>
              {isOn && (
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M1.5 5.5l2.5 2.5 5-5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>
          );
        })}
      </div>
      <div style={{ display: 'flex', gap: '8px', paddingTop: '4px' }}>
        <button onClick={() => setSelected(new Set(ALL_GROUPS))}
          style={{
            flex: 1, padding: '6px 0', borderRadius: '8px',
            fontSize: '10px', fontFamily: 'monospace', fontWeight: 700,
            textTransform: 'uppercase', letterSpacing: '0.1em',
            cursor: 'pointer', border: '1px solid #1e3a5f',
            background: 'none', color: '#38bdf8',
            transition: 'border-color 0.2s',
            WebkitAppearance: 'none', appearance: 'none',
          }}>
          All
        </button>
        <button onClick={() => onStart(selected)} disabled={totalCards === 0}
          style={{
            flex: 2, padding: '6px 0', borderRadius: '8px',
            fontSize: '11px', fontFamily: 'monospace', fontWeight: 700,
            textTransform: 'uppercase', letterSpacing: '0.1em',
            cursor: 'pointer', border: 'none',
            background: '#0ea5e9', color: '#fff',
            opacity: totalCards === 0 ? 0.4 : 1,
          }}>
          Start → {totalCards} cards
        </button>
      </div>
    </div>
  );
}

function CardViewer({ pool, onClose, onBack }: { pool: FlatCard[]; onClose: () => void; onBack: () => void }) {
  const [card,    setCard]    = useState<FlatCard>(() => pickRandom(pool));
  const [flipped, setFlipped] = useState(false);
  const historyRef = useRef<FlatCard[]>([]);
  const cursorRef  = useRef(0);
  const pendingRef = useRef(false);

  useEffect(() => { historyRef.current = [card]; }, []);

  const navigate = useCallback((dir: 1 | -1) => {
    if (pendingRef.current) return;
    pendingRef.current = true;
    setFlipped(false);
    setTimeout(() => {
      if (dir === 1) {
        const newCard = pickRandom(pool, historyRef.current[historyRef.current.length - 1]);
        historyRef.current = [...historyRef.current.slice(0, cursorRef.current + 1), newCard];
        cursorRef.current += 1;
        setCard(newCard);
      } else {
        if (cursorRef.current === 0) { pendingRef.current = false; return; }
        cursorRef.current -= 1;
        setCard(historyRef.current[cursorRef.current]);
      }
      pendingRef.current = false;
    }, 120);
  }, [pool]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape')                      { e.preventDefault(); onClose(); }
      if (e.key === ' ' || e.key === 'Enter')      { e.preventDefault(); setFlipped(f => !f); }
      if (e.key === 'ArrowRight' || e.key === 'n') { e.preventDefault(); navigate(1); }
      if (e.key === 'ArrowLeft'  || e.key === 'p') { e.preventDefault(); navigate(-1); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, navigate]);

  const canPrev = cursorRef.current > 0;

  const color   = GROUP_COLORS[card.group] ?? '#38bdf8';
  

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '9px', fontFamily: 'monospace', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', padding: '2px 8px', borderRadius: '4px', border: '1px solid ' + color + '50', color, background: color + '15' }}>
              {card.groupLabel}
            </span>
            {card.courses.map(c => (
              <span key={c} style={{ fontSize: '9px', fontFamily: 'monospace', border: '1px solid ' + color + '30', borderRadius: '4px', padding: '2px 6px', color: color + 'aa' }}>
                {c}
              </span>
            ))}
          </div>
          <p style={{ fontSize: '11px', fontFamily: 'monospace', fontWeight: 600, color: '#7dd3fc', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginTop: '4px' }}>{card.conceptLabel}</p>
          <p style={{ fontSize: '9px', fontFamily: 'monospace', color: '#0369a1' }}>{pool.length} cards in pool</p>
        </div>
        <button onClick={onClose}
          style={{ width: '24px', height: '24px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', background: 'rgba(14,165,233,0.2)', border: 'none', cursor: 'pointer' }}>
          <svg width="9" height="9" viewBox="0 0 8 8" fill="none">
            <path d="M1 1L7 7M7 1L1 7" stroke="#7dd3fc" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <div className="rc-card-face" style={{ border: '1px solid ' + color + '40' }}
        onClick={() => setFlipped(f => !f)}>
        {[false, true].map(side => (
          <div key={String(side)}
            style={{
              gridArea: '1 / 1',
              display: flipped === side ? 'flex' : 'none',
              flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              padding: '16px 20px', textAlign: 'center',
            }}>
            <span style={{ fontSize: '8px', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '12px', color: color + '60' }}>
              {side ? 'back' : 'front — tap to reveal'}
            </span>
            <p style={{ lineHeight: 1.6, fontSize: '14px', fontWeight: side ? 400 : 600, color: side ? '#bae6fd' : '#f0f9ff' }}>
              {side ? card.back : card.front}
            </p>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
        <p className="hidden sm:block" style={{ fontSize: '9px', fontFamily: 'monospace', color: '#0369a1' }}>
          space to flip · arrows navigate · esc close
        </p>
        <div style={{ display: 'flex', gap: '8px', marginLeft: 'auto' }}>
          <button onClick={() => navigate(-1)} disabled={!canPrev}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px', borderRadius: '8px', fontSize: '10px', fontFamily: 'monospace', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', border: '1px solid ' + (canPrev ? color + '40' : '#1e3a5f'), color: canPrev ? color : '#334155', background: canPrev ? color + '12' : 'transparent', opacity: canPrev ? 1 : 0.4, cursor: canPrev ? 'pointer' : 'default' }}>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M8 5H2M4.5 2.5L2 5l2.5 2.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Prev
          </button>
          <button onClick={() => navigate(1)}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px', borderRadius: '8px', fontSize: '10px', fontFamily: 'monospace', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', border: '1px solid ' + color + '40', color, background: color + '12', cursor: 'pointer' }}>
            Next
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M2 5h6M5.5 2.5L8 5l-2.5 2.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function RandomCard() {
  const [phase, setPhase] = useState<'closed' | 'select' | 'cards'>('closed');
  const [pool,  setPool]  = useState<FlatCard[]>([]);
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleStart = (groups: Set<string>) => {
    setPool(ALL_FLAT_CARDS.filter(c => groups.has(c.group)));
    setPhase('cards');
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && phase !== 'closed') {
        e.preventDefault();
        setPhase('closed');
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [phase]);

  return (
    <>

      <button onClick={() => setPhase('select')}
        ref={btnRef}
        className="rc-btn"
        style={{
          display: 'flex', alignItems: 'center', gap: '10px',
          padding: '10px 20px', borderRadius: '12px',
          fontWeight: 700, fontSize: '14px', cursor: 'pointer',
        }}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <rect x="1" y="1" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.3" />
          <rect x="8" y="1" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.3" />
          <rect x="1" y="8" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.3" />
          <rect x="8" y="8" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.3" />
          <circle cx="10.5" cy="10.5" r="1" fill="currentColor" />
          <circle cx="3.5" cy="3.5" r="1" fill="currentColor" />
        </svg>
        Random Card
      </button>

      {phase !== 'closed' && (
        <div className="rc-overlay" onClick={() => setPhase('closed')}>
          <div className="rc-backdrop" />
          <div className="rc-panel" onClick={e => e.stopPropagation()}>
            <div className="rc-panel-header">
              <div>
                <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#e0f2fe' }}>
                  {phase === 'select' ? 'Flashcard Practice' : 'Random Card'}
                </h2>
                <p style={{ fontSize: '10px', fontFamily: 'monospace', color: 'rgba(14,165,233,0.5)', marginTop: '2px' }}>{TOTAL_CARDS} cards · {TOTAL_CONCEPTS} concepts · {TOTAL_GROUPS} groups</p>
              </div>
              {phase === 'cards' && (
                <button onClick={() => setPhase('select')}
                  style={{ fontSize: '9px', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(14,165,233,0.5)', background: 'none', border: 'none', cursor: 'pointer' }}>
                  change
                </button>
              )}
            </div>
            {phase === 'select'
              ? <CategorySelector onStart={handleStart} />
              : <CardViewer pool={pool} onClose={() => setPhase('closed')} onBack={() => setPhase('select')} />
            }
          </div>
        </div>
      )}
    </>
  );
}