import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ALL_DECKS } from '../lib/flashcards';

// Build per-course card pool
const COURSE_DECKS: Record<string, { title: string; cards: { front: string; back: string }[] }> = {};
ALL_DECKS.forEach(d => {
  d.courses.forEach(code => {
    if (!COURSE_DECKS[code]) COURSE_DECKS[code] = { title: code, cards: [] };
    COURSE_DECKS[code].cards.push(...d.cards);
  });
});

interface FlashCard { front: string; back: string; }
interface Course {
  id: string; code: string; name: string;
  credits: number; group: string; blurb: string;
  x: number; y: number; graduate?: boolean; planned?: boolean;
  deck?: { title: string; cards: FlashCard[]; };
}
interface Edge { from: string; to: string; }
interface PhysNode { id: string; x: number; y: number; vx: number; vy: number; }

const GROUP_COLORS: Record<string, { stroke: string; fill: string; text: string; dot: string }> = {
  math:    { stroke: '#a78bfa', fill: '#1e1b4b', text: '#c4b5fd', dot: '#7c3aed' },
  systems: { stroke: '#38bdf8', fill: '#0c1a2e', text: '#7dd3fc', dot: '#0284c7' },
  data:    { stroke: '#34d399', fill: '#022c22', text: '#6ee7b7', dot: '#059669' },
  algo:    { stroke: '#fbbf24', fill: '#1c1400', text: '#fde68a', dot: '#d97706' },
  prog:    { stroke: '#fb7185', fill: '#1f0a10', text: '#fda4af', dot: '#e11d48' },
  stat:    { stroke: '#22d3ee', fill: '#001f2b', text: '#67e8f9', dot: '#0891b2' },
};
const GROUP_LABELS: Record<string, string> = {
  math: 'Mathematics', systems: 'Systems & Architecture',
  data: 'Data Systems & Databases', algo: 'Algorithms & Theory',
  prog: 'Programming Foundations', stat: 'Statistics',
};

const ALL_COURSES: Course[] = [
  { id: 'math234', code: 'MATH 234',  name: 'Calculus — Several Variables',               credits: 4, group: 'math',    x: 110, y: 110,
    blurb: 'Multivariable calculus covering parameterized curves, partial derivatives, multiple integrals, and vector calculus. Provides the optimization geometry underlying numerical methods and machine learning.' },
  { id: 'math341', code: 'MATH 341',  name: 'Linear Algebra',                              credits: 3, group: 'math',    x: 240, y: 60,
    blurb: 'Vector spaces, linear transformations, eigenvalues, and standard matrix factorizations with rigorous proof writing. Core mathematical language for data systems, graphics, and ML research.' },
  { id: 'math240', code: 'MATH 240',    name: 'Discrete Mathematics',                        credits: 3, group: 'math',    x: 140, y: 220,
    blurb: 'Logic, sets, recursion, graph theory, and asymptotic analysis with a focus on discrete structures. Direct foundation for algorithm design and database query reasoning.' },
  { id: 'math431', code: 'MATH 431', name: 'Intro to Theory of Probability',             credits: 3, group: 'math',    x: 245, y: 165,
    blurb: 'Probability axioms, discrete and continuous distributions, expectation, moment generating functions, conditional probability, multivariate distributions, and the central limit theorem. Provides the probabilistic foundations relevant to statistical learning and stochastic analysis in research.' },
  { id: 'stat240', code: 'STAT 240',  name: 'Data Science Modeling I',                     credits: 4, group: 'stat',    x: 100, y: 390,
    blurb: 'Data management, probability distributions, statistical inference, and simple linear regression using R. Builds the quantitative reasoning used in empirical systems evaluation.' },
  { id: 'stat303', code: 'STAT 303',  name: 'R for Statistics I',                          credits: 1, group: 'stat',    x: 100, y: 510,
    blurb: 'Practical R programming for data manipulation and exploratory analysis. Supports reproducible data pipelines in research and statistical computing workflows.' },
  { id: 'cs252',   code: 'ECE 252',   name: 'Intro to Computer Engineering',               credits: 3, group: 'systems', x: 620, y: 70,
    blurb: 'Transistor-level logic, combinational and sequential circuit design, and introductory assembly programming. Establishes the hardware substrate that systems software runs on.',
    deck: COURSE_DECKS['ECE 252'] },
  { id: 'cs300',   code: 'CS 300',    name: 'Programming II',                              credits: 3, group: 'prog',    x: 370, y: 300,
    blurb: 'Object-oriented design, linked data structures, abstract data types, and introductory complexity analysis in Java. Builds the programming foundations required for advanced systems coursework.' },
  { id: 'cs400',   code: 'CS 400',    name: 'Programming III',                             credits: 3, group: 'prog',    x: 450, y: 415,
    blurb: 'Balanced search trees, graphs, hash tables, and complexity analysis in professional-grade Java. Bridges foundational data structures with the performance-critical implementations found in systems research.' },
  { id: 'cs354',   code: 'CS 354',    name: 'Machine Organization',                        credits: 3, group: 'systems', x: 740, y: 170,
    blurb: 'C programming, virtual memory, the memory hierarchy, caching, assembly, and linkers. Essential low-level knowledge directly applicable to database storage engines and OS internals.',
    deck: COURSE_DECKS['CS 354'] },
  { id: 'cs537',   code: 'CS 537',    name: 'Operating Systems',                           credits: 4, group: 'systems', x: 680, y: 310,
    blurb: 'Scheduling, virtual memory, file systems, synchronization, and I/O handling through xv6 implementation. Directly informs the concurrency and storage layer work in database systems research.',
    deck: COURSE_DECKS['CS 537'] },
  { id: 'cs640',   code: 'CS 640',    name: 'Computer Networks',                           credits: 3, group: 'systems', x: 790, y: 400,
    blurb: 'Protocol layering, reliable transmission, congestion control, routing, and widely deployed protocols including TCP/IP and HTTP. Foundation for understanding communication in distributed systems.',
    deck: COURSE_DECKS['CS 640'] },
  { id: 'cs577',   code: 'CS 577',    name: 'Introduction to Algorithms',                  credits: 4, group: 'algo',    x: 355, y: 165,
    blurb: 'Algorithm design paradigms including greedy, divide-and-conquer, dynamic programming, and reductions to NP-completeness. Provides the analytical framework for evaluating query plan complexity.' },
  { id: 'cs540',   code: 'CS 540',    name: 'Intro to Artificial Intelligence',            credits: 3, group: 'algo',    x: 515, y: 235,
    blurb: 'Search, knowledge representation, probabilistic reasoning, and machine learning fundamentals. Broadens perspective on data-driven approaches alongside systems-focused coursework.',
    deck: COURSE_DECKS['CS 540'] },
  { id: 'cs564',   code: 'CS 564',    name: 'Database Management Systems',                 credits: 4, group: 'data',    x: 310, y: 480,
    blurb: 'Relational algebra, B-tree indexing, buffer pool management, query processing, concurrency control, and recovery. Direct foundation for the open-source SQL engine work at the UW Systems Lab.',
    deck: COURSE_DECKS['CS 564'] },
  { id: 'cs544',   code: 'CS 544',    name: 'Intro to Big Data Systems',                   credits: 3, group: 'data',    x: 530, y: 530,
    blurb: 'Distributed storage and computation using Spark, Kafka, and HDFS with Python. Connects database internals knowledge to production-scale analytical workload patterns.',
    deck: COURSE_DECKS['CS 544'] },
  { id: 'cs536',   code: 'CS 536',    name: 'Programming Languages and Compilers',         credits: 3, group: 'systems', x: 845, y: 230, planned: true,
    blurb: 'Lexing, parsing, semantic analysis, and code generation through a full compiler implementation. Deepens understanding of language runtimes and low-level code optimization relevant to query compilation.' },
  { id: 'cs642',   code: 'CS 642',    name: 'Introduction to Information Security',        credits: 3, group: 'systems', x: 620, y: 430, planned: true,
    blurb: 'Cryptographic primitives, authentication protocols, and system-level security including memory and OS vulnerabilities. Complements systems knowledge with an adversarial perspective.' },
  { id: 'cs759',   code: 'CS 759',    name: 'High Performance Computing for Engineering',  credits: 3, group: 'systems', x: 845, y: 510, graduate: true, planned: true,
    blurb: 'Parallel computing on emerging hardware architectures including GPU programming. Direct application to CUDA-based query execution operator development in the Sirius DB research project.' },
];

const edges: Edge[] = [
  { from: 'math234', to: 'math341' }, { from: 'cs252',   to: 'cs300'   },
  { from: 'cs252',   to: 'cs354'   }, { from: 'cs300',   to: 'cs354'   },
  { from: 'cs300',   to: 'cs400'   }, { from: 'cs300',   to: 'cs540'   },
  { from: 'math341', to: 'cs540'   }, { from: 'math240', to: 'cs577'   },
  { from: 'cs400',   to: 'cs577'   }, { from: 'cs354',   to: 'cs537'   },
  { from: 'cs400',   to: 'cs537'   }, { from: 'cs354',   to: 'cs536'   },
  { from: 'cs400',   to: 'cs536'   }, { from: 'cs354',   to: 'cs564'   },
  { from: 'cs400',   to: 'cs564'   }, { from: 'cs354',   to: 'cs640'   },
  { from: 'cs400',   to: 'cs640'   }, { from: 'cs400',   to: 'cs544'   },
  { from: 'cs537',   to: 'cs642'   }, { from: 'cs400',   to: 'cs759'   },
  { from: 'stat240', to: 'stat303' },
  { from: 'math234', to: 'math431'  },
];

const W = 930; const H = 630; const R = 28;
const REPULSION = 11000; const SPRING_K = 0.028; const SPRING_LEN = 220;
const DAMPING = 0.88; const CENTER_K = 0.004; const BOUND_PAD = 60; const BOUND_K = 0.18;
const ZOOM_MIN = 0.4; const ZOOM_MAX = 2.5; const ZOOM_STEP = 0.3;
const PAN_LIMIT = 350;

function hexPoints(r: number): string {
  return Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i - Math.PI / 2;
    return `${(r * Math.cos(a)).toFixed(2)},${(r * Math.sin(a)).toFixed(2)}`;
  }).join(' ');
}

function getAncestors(id: string, courseList: Course[]): Set<string> {
  const visited = new Set<string>();
  const stack   = [id];
  const ids     = new Set(courseList.map(c => c.id));
  while (stack.length) {
    const cur = stack.pop()!;
    for (const e of edges) {
      if (e.to === cur && ids.has(e.from) && !visited.has(e.from)) {
        visited.add(e.from);
        stack.push(e.from);
      }
    }
  }
  return visited;
}

function FlashCardViewer({ deck, color }: { deck: NonNullable<Course['deck']>; color: typeof GROUP_COLORS[string] }) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlip] = useState(false);
  const total = deck.cards.length;
  const card  = deck.cards[index];
  const go = (dir: 1 | -1, e: React.MouseEvent) => { e.stopPropagation(); setFlip(false); setTimeout(() => setIndex(i => (i + dir + total) % total), 150); };
  return (
    <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <span style={{ fontSize: '9px', fontFamily: 'monospace', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: color.text + '80' }}>Anki · {index + 1} / {total}</span>
      <div style={{ position: 'relative', width: '100%', cursor: 'pointer', userSelect: 'none', borderRadius: '8px', border: '1px solid ' + color.stroke + '40', overflow: 'hidden', background: color.fill, display: 'grid' }}
        onClick={e => { e.stopPropagation(); setFlip(f => !f); }}>
        {[false, true].map(side => (
          <div key={String(side)}
            style={{
              gridArea: '1 / 1',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              padding: '16px 12px', textAlign: 'center',
              opacity: flipped === side ? 1 : 0,
              transition: 'opacity 0.18s ease',
              pointerEvents: flipped === side ? 'auto' : 'none',
              visibility: flipped === side ? 'visible' : 'hidden',
            }}>
            <span style={{ fontSize: '8px', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.12em', opacity: 0.4, marginBottom: '6px', color: color.text }}>{side ? 'back' : 'front · tap to flip'}</span>
            <p style={{ fontSize: '12px', lineHeight: 1.4, fontWeight: side ? 400 : 500, color: color.text }}>{side ? card.back : card.front}</p>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '2px' }}>
        <button onClick={e => go(-1, e)} style={{ fontSize: '9px', fontFamily: 'monospace', fontWeight: 700, padding: '2px 8px', borderRadius: '4px', border: '1px solid ' + color.stroke + '40', opacity: 0.5, cursor: 'pointer', color: color.text, background: 'none', WebkitAppearance: 'none', appearance: 'none' }}>← prev</button>
        <span style={{ fontSize: '9px', fontFamily: 'monospace', fontVariantNumeric: 'tabular-nums', opacity: 0.5, color: color.text }}>{index + 1} / {total}</span>
        <button onClick={e => go(1, e)} style={{ fontSize: '9px', fontFamily: 'monospace', fontWeight: 700, padding: '2px 8px', borderRadius: '4px', border: '1px solid ' + color.stroke + '40', opacity: 0.5, cursor: 'pointer', color: color.text, background: 'none', WebkitAppearance: 'none', appearance: 'none' }}>next →</button>
      </div>
    </div>
  );
}

function DetailPanel({ course, onClose }: { course: Course; onClose: () => void }) {
  const col = GROUP_COLORS[course.group];
  return (
    <div style={{ borderRadius: '12px', border: '1px solid ' + col.stroke + '60', padding: '16px', position: 'relative', background: col.fill + 'ec' }}>
      <button onClick={onClose}
        style={{ position: 'absolute', top: '12px', right: '12px', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', opacity: 0.4, cursor: 'pointer', color: col.text, background: col.stroke + '30', border: 'none', WebkitAppearance: 'none', appearance: 'none' }}
        aria-label="Close">
        <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1 1L7 7M7 1L1 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
      </button>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', paddingRight: '24px', flexWrap: 'wrap' }}>
        <span style={{ fontSize: '9px', fontFamily: 'monospace', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: col.text }}>{course.code}</span>
        <span style={{ fontSize: '8px', fontFamily: 'monospace', fontWeight: 700, border: '1px solid ' + col.stroke + '40', borderRadius: '4px', padding: '2px 6px', color: col.text + '99' }}>{course.credits} cr</span>
        {course.graduate && <span style={{ fontSize: '8px', fontFamily: 'monospace', fontWeight: 700, border: '1px solid ' + col.stroke + '60', borderRadius: '4px', padding: '2px 6px', color: col.stroke, background: col.stroke + '18' }}>Graduate</span>}
        {course.planned  && <span style={{ fontSize: '8px', fontFamily: 'monospace', fontWeight: 700, border: '1px solid ' + col.dot + '40', borderRadius: '4px', padding: '2px 6px', color: col.dot + 'cc', background: col.dot + '12' }}>Planned</span>}
        {course.deck     && <span style={{ fontSize: '8px', fontFamily: 'monospace', fontWeight: 700, border: '1px solid ' + col.dot + '60', borderRadius: '4px', padding: '2px 6px', color: col.dot, background: col.dot + '20' }}>Anki deck</span>}
      </div>
      <p style={{ fontSize: '14px', fontWeight: 700, lineHeight: 1.3, marginBottom: '8px', color: col.text }}>{course.name}</p>
      <p style={{ fontSize: '12px', lineHeight: 1.6, color: col.text + 'b0' }}>{course.blurb}</p>
      {course.deck && <FlashCardViewer deck={course.deck} color={col} />}
    </div>
  );
}

export default function CourseGraph() {
  const [hovered,      setHovered]      = useState<string | null>(null);
  const [selected,     setSelected]     = useState<string | null>(null);
  const [showPlanned,  setShowPlanned]  = useState(false);
  const [zoom,         setZoom]         = useState(1.0);
  const [pan,          setPan]          = useState({ x: 0, y: 0 });
  const [dragging,     setDragging]     = useState(false);
  const [panning,      setPanning]      = useState(false);
  const [positions,    setPositions]    = useState<Record<string, { x: number; y: number }>>(() =>
    Object.fromEntries(ALL_COURSES.map(c => [c.id, { x: c.x, y: c.y }]))
  );

  const courses = showPlanned ? ALL_COURSES : ALL_COURSES.filter(c => !c.planned);

  const physRef     = useRef<PhysNode[]>(ALL_COURSES.map(c => ({ id: c.id, x: c.x, y: c.y, vx: 0, vy: 0 })));
  const dragRef     = useRef<{ id: string; ox: number; oy: number } | null>(null);
  const panStartRef = useRef<{ mx: number; my: number; px: number; py: number } | null>(null);
  const panRef      = useRef({ x: 0, y: 0 });
  const zoomRef     = useRef(1.0);
  const svgRef      = useRef<SVGSVGElement>(null);
  const rafRef      = useRef<number>(0);

  const clampPan = (x: number, y: number) => {
    const limit = PAN_LIMIT * zoomRef.current;
    return {
      x: Math.max(-limit, Math.min(limit, x)),
      y: Math.max(-limit, Math.min(limit, y)),
    };
  };

  const doFit = () => { zoomRef.current = 1.0; panRef.current = { x: 0, y: 0 }; setZoom(1.0); setPan({ x: 0, y: 0 }); };
  const doSetZoom = (fn: (z: number) => number) => { const nz = fn(zoomRef.current); zoomRef.current = nz; setZoom(nz); };

  useEffect(() => {
    const nodeIdx = new Map(physRef.current.map((n, i) => [n.id, i]));
    const tick = () => {
      const ns     = physRef.current;
      const active = new Set(courses.map(c => c.id));
      const forces = ns.map(() => ({ fx: 0, fy: 0 }));
      for (let i = 0; i < ns.length; i++) {
        if (!active.has(ns[i].id)) continue;
        for (let j = i + 1; j < ns.length; j++) {
          if (!active.has(ns[j].id)) continue;
          const dx = (ns[j].x - ns[i].x) || 0.01, dy = (ns[j].y - ns[i].y) || 0.01;
          const d2 = dx * dx + dy * dy, d = Math.sqrt(d2) || 1, f = REPULSION / d2;
          forces[i].fx -= (dx / d) * f; forces[i].fy -= (dy / d) * f;
          forces[j].fx += (dx / d) * f; forces[j].fy += (dy / d) * f;
        }
      }
      for (const e of edges) {
        if (!active.has(e.from) || !active.has(e.to)) continue;
        const fi = nodeIdx.get(e.from)!, ti = nodeIdx.get(e.to)!;
        const dx = ns[ti].x - ns[fi].x, dy = ns[ti].y - ns[fi].y;
        const d = Math.sqrt(dx * dx + dy * dy) || 1, f = SPRING_K * (d - SPRING_LEN);
        forces[fi].fx += (dx / d) * f; forces[fi].fy += (dy / d) * f;
        forces[ti].fx -= (dx / d) * f; forces[ti].fy -= (dy / d) * f;
      }
      const cx = W / 2, cy = H / 2;
      for (let i = 0; i < ns.length; i++) {
        if (!active.has(ns[i].id)) continue;
        forces[i].fx += (cx - ns[i].x) * CENTER_K;
        forces[i].fy += (cy - ns[i].y) * CENTER_K;
      }
      for (let i = 0; i < ns.length; i++) {
        const n = ns[i];
        if (!active.has(n.id)) continue;
        if (dragRef.current?.id === n.id) { n.vx = 0; n.vy = 0; continue; }
        n.vx = (n.vx + forces[i].fx) * DAMPING; n.vy = (n.vy + forces[i].fy) * DAMPING;
        if (n.x < BOUND_PAD)     n.vx += BOUND_K * (BOUND_PAD - n.x);
        if (n.x > W - BOUND_PAD) n.vx += BOUND_K * (W - BOUND_PAD - n.x);
        if (n.y < BOUND_PAD)     n.vy += BOUND_K * (BOUND_PAD - n.y);
        if (n.y > H - BOUND_PAD) n.vy += BOUND_K * (H - BOUND_PAD - n.y);
        n.x += n.vx; n.y += n.vy;
      }
      setPositions(Object.fromEntries(ns.map(n => [n.id, { x: n.x, y: n.y }])));
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [showPlanned]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setSelected(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    const el = svgRef.current; if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault(); e.stopPropagation();
      const delta = e.deltaY < 0 ? ZOOM_STEP : -ZOOM_STEP;
      const next  = Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, +(zoomRef.current + delta).toFixed(2)));
      zoomRef.current = next; setZoom(next);
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  const toWorld = useCallback((clientX: number, clientY: number) => {
    const svg = svgRef.current; if (!svg) return { x: 0, y: 0 };
    const rect = svg.getBoundingClientRect();
    const lx = (clientX - rect.left) * (W / rect.width);
    const ly = (clientY - rect.top)  * (H / rect.height);
    const z = zoomRef.current, px = panRef.current.x, py = panRef.current.y;
    return { x: (lx - (W / 2 + px)) / z + W / 2, y: (ly - (H / 2 + py)) / z + H / 2 };
  }, []);

  const onNodePointerDown = (e: React.PointerEvent, id: string) => {
    e.stopPropagation();
    (e.target as Element).setPointerCapture(e.pointerId);
    const w = toWorld(e.clientX, e.clientY);
    const n = physRef.current.find(n => n.id === id)!;
    dragRef.current = { id, ox: w.x - n.x, oy: w.y - n.y };
    setDragging(true);
  };

  const onSvgPointerDown = (e: React.PointerEvent) => {
    if (dragRef.current) return;
    (e.currentTarget as Element).setPointerCapture(e.pointerId);
    panStartRef.current = { mx: e.clientX, my: e.clientY, px: panRef.current.x, py: panRef.current.y };
    setPanning(true);
  };

  const onSvgPointerMove = (e: React.PointerEvent) => {
    if (dragRef.current) {
      const w = toWorld(e.clientX, e.clientY);
      const n = physRef.current.find(n => n.id === dragRef.current!.id)!;
      n.x = w.x - dragRef.current.ox; n.y = w.y - dragRef.current.oy; n.vx = 0; n.vy = 0;
    } else if (panStartRef.current) {
      const svg = svgRef.current; if (!svg) return;
      const rect = svg.getBoundingClientRect(), scaleX = W / rect.width;
      const dx = (e.clientX - panStartRef.current.mx) * scaleX;
      const dy = (e.clientY - panStartRef.current.my) * scaleX;
      const clamped = clampPan(panStartRef.current.px + dx, panStartRef.current.py + dy);
      panRef.current = clamped; setPan(clamped);
    }
  };

  const onSvgPointerUp = () => { dragRef.current = null; panStartRef.current = null; setDragging(false); setPanning(false); };

  const ancestors      = selected ? getAncestors(selected, courses) : new Set<string>();
  const selectedCourse = courses.find(c => c.id === selected) ?? null;

  const activeId    = hovered ?? selected;
  const connected   = activeId ? (() => {
    const s = new Set<string>();
    edges.forEach(e => { if (e.from === activeId) s.add(e.to); if (e.to === activeId) s.add(e.from); });
    return s;
  })() : new Set<string>();

  const edgeIsActive = (e: Edge) => !!(activeId && (e.from === activeId || e.to === activeId));
  const edgeIsAncestor = (e: Edge) => selected ? (ancestors.has(e.from) && (ancestors.has(e.to) || e.to === selected)) : false;

  const nodeOpacity = (id: string) => {
    if (!activeId) return 1;
    if (id === activeId || connected.has(id) || ancestors.has(id)) return 1;
    return 0.12;
  };

  const edgeOpacity = (e: Edge) => {
    if (!activeId) return 0.2;
    if (edgeIsActive(e) || edgeIsAncestor(e)) return 0.95;
    return 0.04;
  };

  const zT = `translate(${W / 2 + pan.x},${H / 2 + pan.y}) scale(${zoom}) translate(${-W / 2},${-H / 2})`;

  const btnBase = "w-7 h-7 flex items-center justify-center rounded-lg text-xs font-bold cursor-pointer transition-all duration-150 border border-sky-200 dark:border-sky-700 bg-white/80 dark:bg-sky-900/80 backdrop-blur-sm text-sky-700 dark:text-sky-300 hover:border-sky-400 dark:hover:border-sky-500 hover:bg-white dark:hover:bg-sky-800 shadow-sm select-none";

  return (
    <div className="w-full space-y-4 pb-20">
      <div className="flex flex-wrap gap-x-4 gap-y-2 mb-2 items-center">
        {Object.entries(GROUP_LABELS).map(([key, label]) => (
          <div key={key} className="flex items-center gap-1.5">
            <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ background: GROUP_COLORS[key].dot }} />
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-sky-600/60 dark:text-sky-400/50">{label}</span>
          </div>
        ))}
        <div className="flex items-center gap-1.5">
          <span className="inline-flex items-center justify-center w-4 h-4 rounded-full text-white text-[7px] font-black" style={{ background: '#0284c7' }}>A</span>
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-sky-600/60 dark:text-sky-400/50">Anki</span>
        </div>
        <div className="flex items-center gap-1.5">
          <svg width="16" height="16" viewBox="-14 -14 28 28"><polygon points={hexPoints(11)} fill="none" stroke="#38bdf8" strokeWidth="1.5" /></svg>
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-sky-600/60 dark:text-sky-400/50">Graduate</span>
        </div>
        <div className="flex items-center gap-1.5">
          <svg width="16" height="16" viewBox="-14 -14 28 28"><circle r="11" fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 2" /></svg>
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-sky-600/60 dark:text-sky-400/50">Planned</span>
        </div>
        <div className="flex items-center gap-1.5">
          <svg width="28" height="10" viewBox="0 0 28 10">
            <defs><marker id="arr-leg" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L0,6 L6,3 z" fill="#38bdf8" /></marker></defs>
            <line x1="2" y1="5" x2="20" y2="5" stroke="#38bdf8" strokeWidth="1.2" markerEnd="url(#arr-leg)" />
          </svg>
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-sky-600/60 dark:text-sky-400/50">Prerequisite</span>
        </div>
        <button
          onClick={() => { setShowPlanned(s => !s); setSelected(null); }}
          className={`ml-auto text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-lg border cursor-pointer transition-all duration-200 ${
            showPlanned
              ? 'bg-sky-100 dark:bg-sky-900 text-sky-700 dark:text-sky-300 border-sky-300 dark:border-sky-600'
              : 'text-sky-400 dark:text-sky-600 border-sky-200 dark:border-sky-800 hover:border-sky-400 dark:hover:border-sky-600'
          }`}>
          {showPlanned ? 'Hide planned' : 'Show planned'}
        </button>
      </div>

      <div className="relative w-full rounded-2xl border border-sky-200 dark:border-sky-800 overflow-hidden">
        <div className="absolute top-3 right-3 z-10 hidden md:flex flex-col gap-1">
          <button onClick={() => doSetZoom(z => Math.min(ZOOM_MAX, +(z + ZOOM_STEP).toFixed(2)))} className={btnBase} title="Zoom in">+</button>
          <button onClick={doFit} className={btnBase} title="Reset view" style={{ fontSize: '9px', letterSpacing: '0.05em' }}>FIT</button>
          <button onClick={() => doSetZoom(z => Math.max(ZOOM_MIN, +(z - ZOOM_STEP).toFixed(2)))} className={btnBase} title="Zoom out">−</button>
          <div className="text-center text-[8px] font-mono text-sky-500/50 dark:text-sky-500/40 mt-0.5">{Math.round(zoom * 100)}%</div>
        </div>

        <svg ref={svgRef} viewBox={`0 0 ${W} ${H}`} className="w-full h-auto block"
          style={{ cursor: dragging || panning ? 'grabbing' : 'grab', touchAction: 'none' }}
          onPointerDown={onSvgPointerDown} onPointerMove={onSvgPointerMove}
          onPointerUp={onSvgPointerUp} onPointerLeave={onSvgPointerUp}>
          <defs>
            <marker id="arr"    markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L0,6 L6,3 z" fill="#38bdf860" /></marker>
            <marker id="arr-on" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L0,6 L6,3 z" fill="#7dd3fc"   /></marker>
            <marker id="arr-anc" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L0,6 L6,3 z" fill="#fbbf24"  /></marker>
            <filter id="glow-filter" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur in="SourceGraphic" result="blur">
                <animate attributeName="stdDeviation" values="3;9;3" dur="2s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" />
              </feGaussianBlur>
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          <g transform={zT}>
            {edges.map((e, i) => {
              const fp = positions[e.from] ?? { x: 0, y: 0 }, tp = positions[e.to] ?? { x: 0, y: 0 };
              const visFrom = courses.find(c => c.id === e.from), visTo = courses.find(c => c.id === e.to);
              if (!visFrom || !visTo) return null;
              const dx = tp.x - fp.x, dy = tp.y - fp.y, d = Math.sqrt(dx*dx + dy*dy) || 1;
              const x1 = fp.x + (dx/d)*R, y1 = fp.y + (dy/d)*R;
              const x2 = tp.x - (dx/d)*(R+5), y2 = tp.y - (dy/d)*(R+5);
              const mx = (x1+x2)/2 - dy*0.12, my = (y1+y2)/2 + dx*0.12;
              const active   = edgeIsActive(e);
              const ancestor = edgeIsAncestor(e);
              const col      = GROUP_COLORS[visFrom.group];
              return (
                <g key={i} style={{ opacity: edgeOpacity(e), transition: 'opacity 0.2s' }}>
                  <path d={`M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`} fill="none"
                    stroke={ancestor ? '#fbbf24' : active ? col.dot : '#38bdf8'}
                    strokeWidth={ancestor ? 2 : active ? 1.8 : 1}
                    strokeDasharray={active || ancestor ? undefined : '4 4'}
                    markerEnd={ancestor ? 'url(#arr-anc)' : active ? 'url(#arr-on)' : 'url(#arr)'} />
                </g>
              );
            })}

            {courses.map(course => {
              const pos      = positions[course.id] ?? { x: course.x, y: course.y };
              const col      = GROUP_COLORS[course.group];
              const isActive  = course.id === activeId;
              const isGrad    = !!course.graduate;
              const isPlanned = !!course.planned;
              const isAnc     = ancestors.has(course.id);
              const hasDeck   = !!course.deck;
              const r         = isActive ? R + 5 : R;
              const fillColor = isPlanned ? col.fill + '99' : col.fill;
              return (
                <g key={course.id} transform={`translate(${pos.x},${pos.y})`}
                  style={{ opacity: nodeOpacity(course.id), transition: 'opacity 0.2s', cursor: dragging && dragRef.current?.id === course.id ? 'grabbing' : 'grab' }}
                  onMouseEnter={() => { if (!dragRef.current && !panStartRef.current) setHovered(course.id); }}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => { if (!dragRef.current && !panStartRef.current) setSelected(prev => prev === course.id ? null : course.id); }}
                  onPointerDown={e => onNodePointerDown(e, course.id)}>

                  {isGrad ? (
                    <>
                      <polygon points={hexPoints(r)} fill={fillColor} stroke={col.stroke}
                        strokeWidth={isActive ? 2.2 : 1.8} style={{ transition: 'all 0.2s' }}
                        filter="url(#glow-filter)" />
                      {isPlanned && <polygon points={hexPoints(r)} fill="none" stroke={col.stroke} strokeWidth="1.2" strokeDasharray="4 3" opacity="0.7" />}
                    </>
                  ) : isPlanned ? (
                    <>
                      <circle r={r} fill={fillColor} stroke={col.stroke}
                        strokeWidth={isActive ? 2.2 : 1.2} strokeDasharray="4 3"
                        style={{ transition: 'r 0.2s, stroke-width 0.2s' }}
                        filter={isActive ? `drop-shadow(0 0 10px ${col.dot})` : undefined} />
                    </>
                  ) : (
                    <circle r={r} fill={col.fill} stroke={col.stroke}
                      strokeWidth={isActive ? 2.2 : 1.2}
                      style={{ transition: 'r 0.2s, stroke-width 0.2s' }}
                      filter={isActive || isAnc ? `drop-shadow(0 0 ${isAnc ? 8 : 10}px ${isAnc ? '#fbbf24' : col.dot})` : undefined} />
                  )}

                  {isActive && !isGrad && !isPlanned && <circle r={R+11} fill="none" stroke={col.dot} strokeWidth="0.6" opacity="0.28" />}
                  {isAnc && !isGrad && <circle r={R+9} fill="none" stroke="#fbbf24" strokeWidth="0.8" opacity="0.4" />}

                  {hasDeck && <>
                    <circle cx={R-4} cy={-(R-4)} r="6" fill={col.dot} opacity="0.9" />
                    <text x={R-4} y={-(R-4)} textAnchor="middle" dominantBaseline="middle" fontSize="7" fill="white" fontWeight="800" style={{ pointerEvents: 'none' }}>A</text>
                  </>}
                  <text textAnchor="middle" dominantBaseline="middle" fontSize={isActive ? '9' : '8.5'}
                    fontFamily="monospace" fontWeight="700" fill={isPlanned ? col.text + 'aa' : col.text}
                    letterSpacing="0.03em" style={{ pointerEvents: 'none', userSelect: 'none' }}>
                    {course.code}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>

        {selectedCourse && (
          <div className="absolute bottom-4 right-4 w-72 hidden md:block">
            <DetailPanel course={selectedCourse} onClose={() => setSelected(null)} />
          </div>
        )}
        {!selectedCourse && (
          <div className="absolute bottom-4 left-4 text-[10px] font-mono text-sky-600/40 dark:text-sky-500/30 pointer-events-none select-none hidden md:block">
            drag to pan · drag nodes · scroll to zoom · click to trace prerequisites · esc to close
          </div>
        )}
      </div>

      <div className="md:hidden flex items-center justify-center gap-2 pt-1">
        <button onClick={() => doSetZoom(z => Math.min(ZOOM_MAX, +(z + ZOOM_STEP).toFixed(2)))} className={btnBase}>+</button>
        <button onClick={doFit} className={`${btnBase} px-3`} style={{ width: 'auto', fontSize: '9px', letterSpacing: '0.05em' }}>FIT</button>
        <button onClick={() => doSetZoom(z => Math.max(ZOOM_MIN, +(z - ZOOM_STEP).toFixed(2)))} className={btnBase}>−</button>
        <span className="text-[9px] font-mono text-sky-500/50 dark:text-sky-500/40 ml-1">{Math.round(zoom * 100)}%</span>
      </div>

      {selectedCourse && (
        <div className="md:hidden mt-1">
          <DetailPanel course={selectedCourse} onClose={() => setSelected(null)} />
        </div>
      )}
      {!selectedCourse && (
        <div className="md:hidden text-[10px] font-mono text-sky-600/40 dark:text-sky-500/30 select-none text-center pt-1">
          drag to pan · tap a node to trace prerequisites · pinch or use buttons to zoom
        </div>
      )}
    </div>
  );
}