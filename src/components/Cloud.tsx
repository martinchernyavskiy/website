import React, { useState, useEffect, useRef, useCallback } from 'react';

type HoverCb = (x: number, y: number) => void;
const hoverCallbacks = new Set<HoverCb>();
let listenerAttached = false;

function ensureMouseListener() {
  if (listenerAttached) return;
  listenerAttached = true;
  let last = 0;
  window.addEventListener('mousemove', (e: MouseEvent) => {
    const now = Date.now();
    if (now - last < 48) return;
    last = now;
    hoverCallbacks.forEach(cb => cb(e.clientX, e.clientY));
  }, { passive: true });
}

const MIN_SPAWN_SPACING = 0.12;
const recentSpawns: number[] = [];

function getSpacedFraction(): number {
  for (let attempt = 0; attempt < 10; attempt++) {
    const f = 0.05 + Math.random() * 0.88;
    const tooClose = recentSpawns.some(s => Math.abs(s - f) < MIN_SPAWN_SPACING);
    if (!tooClose) {
      recentSpawns.push(f);
      if (recentSpawns.length > 5) recentSpawns.shift();
      return f;
    }
  }
  const f = 0.05 + Math.random() * 0.88;
  recentSpawns.push(f);
  if (recentSpawns.length > 5) recentSpawns.shift();
  return f;
}

interface CloudProps {
  top: number;
  size: number;
  duration: number;
  delay: number;
  colorClass: string;
  path: string;
}

type Status = 'drifting' | 'poofing' | 'poofed' | 'fading-in';

export default function Cloud({ top: initialTop, size, duration, delay: initialDelay, colorClass, path }: CloudProps) {
  const [status, setStatus] = useState<Status>('drifting');
  const [config, setConfig] = useState({ top: initialTop, delay: initialDelay });
  const [animKey, setAnimKey] = useState(0);
  const [fadingOpacity, setFadingOpacity] = useState(0);
  const [poofPos, setPoofPos] = useState<{ left: number; top: number } | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status === 'poofing') {
      const t = setTimeout(() => setStatus('poofed'), 800);
      return () => clearTimeout(t);
    }

    if (status === 'poofed') {
      const t = setTimeout(() => {
        const fraction = getSpacedFraction();
        setConfig({ top: 16 + Math.random() * 70, delay: -(fraction * duration) });
        setFadingOpacity(0);
        setPoofPos(null);
        setAnimKey(k => k + 1);
        setStatus('fading-in');
      }, 3000 + Math.random() * 5000);
      return () => clearTimeout(t);
    }

    if (status === 'fading-in') {
      const t1 = setTimeout(() => setFadingOpacity(1), 60);
      const t2 = setTimeout(() => setStatus('drifting'), 1500);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    }
  }, [status, duration]);

  const handlePoof = useCallback(() => {
    if (status !== 'drifting') return;
    if (wrapRef.current) {
      const r = wrapRef.current.getBoundingClientRect();
      setPoofPos({ left: r.left, top: r.top });
    }
    setStatus('poofing');
  }, [status]);

  useEffect(() => {
    if (status !== 'drifting') return;
    const cb: HoverCb = (x, y) => {
      if (!svgRef.current) return;
      const r = svgRef.current.getBoundingClientRect();
      if (x >= r.left && x <= r.right && y >= r.top && y <= r.bottom) {
        handlePoof();
      }
    };
    ensureMouseListener();
    hoverCallbacks.add(cb);
    return () => { hoverCallbacks.delete(cb); };
  }, [status, handlePoof]);

  const isPoofing = status === 'poofing';
  const fadingX = status === 'fading-in' ? (-config.delay / duration) * 140 : 0;

  return (
    <div
      key={animKey}
      ref={wrapRef}
      className={`absolute pointer-events-none ${colorClass}`}
      style={{
        top: poofPos && (status === 'poofing' || status === 'poofed') ? `${poofPos.top}px` : `${config.top}%`,
        left: poofPos && (status === 'poofing' || status === 'poofed') ? `${poofPos.left}px` : '-20vw',
        width: `${size}px`,
        position: poofPos && (status === 'poofing' || status === 'poofed') ? 'fixed' : 'absolute',
        animation: status === 'drifting' ? `drift ${duration}s linear infinite` : 'none',
        animationDelay: status === 'drifting' ? `${config.delay}s` : undefined,
        transform: status === 'fading-in' ? `translateX(${fadingX}vw)` : undefined,
        opacity: status === 'fading-in' ? fadingOpacity : status === 'poofed' ? 0 : 1,
        transition: status === 'fading-in' ? 'opacity 1.3s ease-in' : undefined,
      }}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        {isPoofing && (
          <div className="absolute top-1/2 left-1/2 w-0 h-0 z-50">
            {[...Array(10)].map((_, i) => {
              const angle = (i / 10) * Math.PI * 2 + (Math.random() - 0.5) * 0.6;
              const dist = 25 + Math.random() * 45;
              const pSize = size / 6 + Math.random() * (size / 5);
              const dur = 0.8 + Math.random() * 0.5;
              return (
                <div
                  key={i}
                  className="cloud-particle bg-sky-200/50 dark:bg-sky-600/40"
                  style={{
                    width: `${pSize}px`,
                    height: `${pSize}px`,
                    left: `-${pSize / 2}px`,
                    top: `-${pSize / 2}px`,
                    filter: `blur(${3 + Math.random() * 4}px)`,
                    '--tw-x': `${Math.cos(angle) * dist}px`,
                    '--tw-y': `${Math.sin(angle) * dist}px`,
                    '--duration': `${dur}s`,
                  } as React.CSSProperties}
                />
              );
            })}
          </div>
        )}

        <svg
          ref={svgRef}
          viewBox="0 0 180 80"
          className="fill-current w-full h-auto"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            display: 'block',
            pointerEvents: 'none',
            opacity: isPoofing ? 0 : 1,
            transform: isPoofing ? 'scale(1.15)' : 'scale(1)',
            transition: 'opacity 0.1s ease-out, transform 0.2s ease-out',
          }}
        >
          <path d={path} />
        </svg>
      </div>
    </div>
  );
}