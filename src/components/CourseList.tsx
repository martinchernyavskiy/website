import React, { useState } from 'react';
import { ALL_DECKS } from '../lib/flashcards';

const COURSE_DECKS: Record<string, { cards: { front: string; back: string }[] }> = {};
ALL_DECKS.forEach(d => {
  d.courses.forEach(code => {
    if (!COURSE_DECKS[code]) COURSE_DECKS[code] = { cards: [] };
    COURSE_DECKS[code].cards.push(...d.cards);
  });
});


interface FlashCard { front: string; back: string; }

interface Course {
  code: string;
  name: string;
  credits: number;
  blurb: string;
  graduate?: boolean;
  planned?: boolean;
  deck?: { cards: FlashCard[] };
}

interface Group {
  theme: string;
  accent: string;
  accentColor: string;
  courses: Course[];
}

const ALL_GROUPS: Group[] = [
  {
    theme: 'Mathematics',
    accent: 'text-violet-500 dark:text-violet-400',
    accentColor: '#8b5cf6',
    courses: [
      { code: 'MATH 234', name: 'Calculus — Functions of Several Variables', credits: 4,
        blurb: 'Multivariable calculus covering parameterized curves, partial derivatives, multiple integrals, and vector calculus. Provides the optimization geometry underlying numerical methods and machine learning.' },
      { code: 'MATH 341', name: 'Linear Algebra', credits: 3,
        blurb: 'Vector spaces, linear transformations, eigenvalues, and standard matrix factorizations with rigorous proof writing. Core mathematical language for data systems, machine learning, and graphics.' },
      { code: 'MATH 240', name: 'Introduction to Discrete Mathematics', credits: 3,
        blurb: 'Logic, sets, recursion, graph theory, and asymptotic analysis with a focus on discrete structures. Direct foundation for algorithm design and database query reasoning.' },
      { code: 'MATH 431', name: 'Introduction to the Theory of Probability', credits: 3,
        blurb: 'Probability axioms, discrete and continuous distributions, expectation, moment generating functions, conditional probability, multivariate distributions, and the central limit theorem.' },
    ],
  },
  {
    theme: 'Systems & Architecture',
    accent: 'text-sky-500 dark:text-sky-400',
    accentColor: '#38bdf8',
    courses: [
      { code: 'ECE 252', name: 'Introduction to Computer Engineering', credits: 3,
        blurb: 'Transistor-level logic, combinational and sequential circuit design, and introductory assembly programming. Establishes the hardware substrate that systems software runs on.',
        deck: COURSE_DECKS['ECE 252']  },
      { code: 'CS 354', name: 'Machine Organization and Programming', credits: 3,
        blurb: 'C programming, virtual memory, the memory hierarchy, caching, assembly, and linkers. Essential low-level knowledge directly applicable to database storage engines and OS internals.',
        deck: COURSE_DECKS['CS 354']  },
      { code: 'CS 537', name: 'Introduction to Operating Systems', credits: 4,
        blurb: 'Scheduling, virtual memory, file systems, synchronization, and I/O handling through xv6 implementation. Covers the core abstractions that operating systems provide to user-space programs.',
        deck: COURSE_DECKS['CS 537']
      },
      { code: 'CS 640', name: 'Introduction to Computer Networks', credits: 3,
        blurb: 'Protocol layering, reliable transmission, congestion control, routing, and widely deployed protocols including TCP/IP and HTTP. Foundation for understanding communication in distributed systems.',
        deck: COURSE_DECKS['CS 640']  },
      { code: 'CS 536', name: 'Introduction to Programming Languages and Compilers', credits: 3, planned: true,
        blurb: 'Lexing, parsing, semantic analysis, and code generation through a full compiler implementation. Develops a concrete understanding of how high-level programs become executable machine code.' },
      { code: 'CS 642', name: 'Introduction to Information Security', credits: 3, planned: true,
        blurb: 'Cryptographic primitives, authentication protocols, and system-level security including memory and OS vulnerabilities. Complements systems knowledge with an adversarial perspective.' },
      { code: 'CS 759', name: 'High Performance Computing for Applications in Engineering', credits: 3, graduate: true, planned: true,
        blurb: 'Parallel computing on emerging hardware architectures including GPU programming, shared-memory parallelism, and performance analysis of compute-intensive workloads.' },
    ],
  },
  {
    theme: 'Data Systems & Databases',
    accent: 'text-emerald-500 dark:text-emerald-400',
    accentColor: '#34d399',
    courses: [
      { code: 'CS 564', name: 'Database Management Systems: Design and Implementation', credits: 4,
        blurb: 'Relational algebra, B-tree indexing, buffer pool management, query processing, concurrency control, and recovery. Covers both the theory and the engineering decisions behind real database systems.',
        deck: COURSE_DECKS['CS 564']  },
      { code: 'CS 544', name: 'Introduction to Big Data Systems', credits: 3,
        blurb: 'Distributed storage and computation using Spark, Kafka, and HDFS with Python. Connects database internals knowledge to production-scale analytical workload patterns.',
        deck: COURSE_DECKS['CS 544']  },
    ],
  },
  {
    theme: 'Algorithms & Theory',
    accent: 'text-amber-500 dark:text-amber-400',
    accentColor: '#fbbf24',
    courses: [
      { code: 'CS 577', name: 'Introduction to Algorithms', credits: 4,
        blurb: 'Algorithm design paradigms including greedy, divide-and-conquer, dynamic programming, and reductions to NP-completeness. Provides the analytical framework for evaluating query plan complexity.' },
      { code: 'CS 540', name: 'Introduction to Artificial Intelligence', credits: 3,
        blurb: 'Search, knowledge representation, probabilistic reasoning, and machine learning fundamentals. Broadens perspective on data-driven approaches alongside systems-focused coursework.',
        deck: COURSE_DECKS['CS 540']  },
    ],
  },
  {
    theme: 'Programming Foundations',
    accent: 'text-rose-500 dark:text-rose-400',
    accentColor: '#fb7185',
    courses: [
      { code: 'CS 300', name: 'Programming II', credits: 3,
        blurb: 'Object-oriented design, linked data structures, abstract data types, and introductory complexity analysis in Java. Builds the programming foundations required for advanced systems coursework.' },
      { code: 'CS 400', name: 'Programming III', credits: 3,
        blurb: 'Balanced search trees, graphs, hash tables, and complexity analysis in professional-grade Java. Bridges foundational data structures with performance-critical production implementations.' },
    ],
  },
  {
    theme: 'Statistics',
    accent: 'text-cyan-500 dark:text-cyan-400',
    accentColor: '#22d3ee',
    courses: [
      { code: 'STAT 240', name: 'Data Science Modeling I', credits: 4,
        blurb: 'Data management, probability distributions, statistical inference, and simple linear regression using R.' },
      { code: 'STAT 303', name: 'R for Statistics I', credits: 1,
        blurb: 'Practical R programming for data manipulation, exploratory analysis, and visualization.' },
    ],
  },
];


function ListAnkiViewer({ deck, accentColor, courseCode }: { deck: { cards: FlashCard[] }; accentColor: string; courseCode: string }) {
  const [index, setIndex] = React.useState(0);
  const [flipped, setFlip] = React.useState(false);
  const total = deck.cards.length;
  const card  = deck.cards[index];
  const go = (dir: 1 | -1, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setFlip(false);
    setTimeout(() => setIndex(i => (i + dir + total) % total), 150);
  };

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'n') { e.preventDefault(); go(1); }
      if (e.key === 'ArrowLeft'  || e.key === 'p') { e.preventDefault(); go(-1); }
      if (e.key === ' ')                            { e.preventDefault(); setFlip(f => !f); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [total, index]);

  const downloadCards = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Anki-importable tab-separated text: front[tab]back, one card per line.
    // Import via Anki → File → Import, set field separator to Tab.
    const header = `#separator:tab\n#html:false\n#notetype:Basic\n#deck:${courseCode}\n`;
    const rows = deck.cards
      .map(c => `${c.front.replace(/\t/g, ' ')}\t${c.back.replace(/\t/g, ' ')}`)
      .join('\n');
    const blob = new Blob([header + rows], { type: 'text/plain;charset=utf-8' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = `${courseCode.replace(/\s+/g, '_')}_flashcards.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px', userSelect: 'none' }}
      onClick={e => e.stopPropagation()}>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '9px', fontFamily: 'monospace', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.5, color: accentColor }}>
          Anki · {index + 1} / {total}
        </span>
        <button onClick={downloadCards}
          style={{ fontSize: '9px', fontFamily: 'monospace', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', opacity: 0.5, color: accentColor, background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', textUnderlineOffset: '2px', WebkitAppearance: 'none', appearance: 'none' }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.9')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '0.5')}>
          Download .txt
        </button>
      </div>

      <div style={{ width: '100%', cursor: 'pointer', borderRadius: '8px', border: '1px solid ' + accentColor + '30', background: accentColor + '08' }}
        onClick={e => { e.stopPropagation(); setFlip(f => !f); }}>
        {[false, true].map(side => (
          <div key={String(side)}
            style={{
              display: flipped === side ? 'flex' : 'none',
              flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              padding: '12px', textAlign: 'center', minHeight: '72px',
            }}>
            <span style={{ fontSize: '8px', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.4, marginBottom: '6px', color: accentColor }}>
              {side ? 'back' : 'front · tap to flip'}
            </span>
            <p style={{ fontSize: '12px', lineHeight: 1.4, fontWeight: side ? 400 : 500, color: side ? 'inherit' : 'inherit', overflowWrap: 'break-word', wordBreak: 'break-word', maxWidth: '100%' }}>
              {side ? card.back : card.front}
            </p>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '2px' }}>
        <button onClick={e => go(-1, e)}
          style={{ fontSize: '9px', fontFamily: 'monospace', fontWeight: 700, padding: '2px 8px', borderRadius: '4px', border: '1px solid ' + accentColor + '40', opacity: 0.5, cursor: 'pointer', background: 'none', color: 'inherit', WebkitAppearance: 'none', appearance: 'none' }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.9')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '0.5')}>
          ← prev
        </button>
        <span style={{ fontSize: '9px', fontFamily: 'monospace', opacity: 0.4 }}>{index + 1} / {total}</span>
        <button onClick={e => go(1, e)}
          style={{ fontSize: '9px', fontFamily: 'monospace', fontWeight: 700, padding: '2px 8px', borderRadius: '4px', border: '1px solid ' + accentColor + '40', opacity: 0.5, cursor: 'pointer', background: 'none', color: 'inherit', WebkitAppearance: 'none', appearance: 'none' }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.9')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '0.5')}>
          next →
        </button>
      </div>
    </div>
  );
}

export default function CourseList() {
  const [expanded,    setExpanded]    = useState<string | null>(null);
  const [showPlanned, setShowPlanned] = useState(false);

  const toggle = (key: string) => setExpanded(prev => prev === key ? null : key);

  const groups = ALL_GROUPS.map(g => ({
    ...g,
    courses: showPlanned ? g.courses : g.courses.filter(c => !c.planned),
  })).filter(g => g.courses.length > 0);

  const takenCredits   = ALL_GROUPS.flatMap(g => g.courses).filter(c => !c.planned).reduce((s, c) => s + c.credits, 0);
  const plannedCredits = ALL_GROUPS.flatMap(g => g.courses).filter(c =>  c.planned).reduce((s, c) => s + c.credits, 0);
  const takenCount     = ALL_GROUPS.flatMap(g => g.courses).filter(c => !c.planned).length;
  const plannedCount   = ALL_GROUPS.flatMap(g => g.courses).filter(c =>  c.planned).length;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex gap-4">
          <span className="text-[11px] font-mono font-bold text-sky-600 dark:text-sky-400/50 uppercase tracking-widest">
            {takenCount} taken · {takenCredits} cr
          </span>
          {showPlanned && (
            <span className="text-[11px] font-mono font-bold text-sky-500/60 dark:text-sky-500/35 uppercase tracking-widest">
              +{plannedCount} planned · +{plannedCredits} cr
            </span>
          )}
        </div>
        <button
          onClick={() => setShowPlanned(s => !s)}
          className={`text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-lg border cursor-pointer transition-all duration-200 ${
            showPlanned
              ? 'bg-sky-100 dark:bg-sky-900 text-sky-700 dark:text-sky-300 border-sky-300 dark:border-sky-600'
              : 'text-sky-400 dark:text-sky-600 border-sky-200 dark:border-sky-800 hover:border-sky-400 dark:hover:border-sky-600'
          }`}>
          {showPlanned ? 'Hide planned' : 'Show planned'}
        </button>
      </div>

      {groups.map((group) => (
        <section key={group.theme}>
          <div className="flex items-center gap-3 mb-4">
            <span className={`text-[10px] font-mono font-bold uppercase tracking-widest ${group.accent}`}>{group.theme}</span>
            <span className={`text-[10px] font-mono font-bold uppercase tracking-widest opacity-50 ${group.accent}`}>
              — {group.courses.length} course{group.courses.length !== 1 ? 's' : ''}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {group.courses.map((course) => {
              const key    = course.code;
              const isOpen = expanded === key;
              return (
                <button
                  key={key}
                  onClick={() => toggle(key)}
                  className={`text-left w-full rounded-xl border px-5 py-4 transition-all duration-300 cursor-pointer
                    ${course.planned ? 'border-dashed' : ''}
                    ${isOpen
                      ? 'border-sky-400 dark:border-sky-500 bg-white dark:bg-sky-900/40 shadow-lg shadow-sky-500/10'
                      : 'border-sky-200 dark:border-sky-800 hover:border-sky-400 dark:hover:border-sky-600 hover:bg-white dark:hover:bg-sky-900/20 hover:shadow-md hover:shadow-sky-500/5 hover:-translate-y-0.5'
                    }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                        <span className={`text-[10px] font-mono font-bold tracking-widest ${group.accent} ${course.planned ? 'opacity-70' : ''}`}>
                          {course.code}
                        </span>
                        <span className="text-[9px] font-mono font-bold text-sky-500 dark:text-sky-600/50 border border-sky-200 dark:border-sky-800 rounded px-1.5 py-0.5">
                          {course.credits} cr
                        </span>
                        {course.graduate && (
                          <span className="text-[9px] font-mono font-bold border rounded px-1.5 py-0.5 text-sky-500 dark:text-sky-400 border-sky-300 dark:border-sky-700 bg-sky-50 dark:bg-sky-900/40">
                            Graduate
                          </span>
                        )}
                        {course.planned && (
                          <span className="text-[9px] font-mono font-bold border border-dashed rounded px-1.5 py-0.5 text-sky-500 dark:text-sky-500/60 border-sky-300 dark:border-sky-700">
                            Planned
                          </span>
                        )}
                        {course.deck && (
                          <span className="text-[9px] font-mono font-bold rounded-full px-2 py-0.5 text-white" style={{ background: group.accentColor + 'cc' }}>
                            A
                          </span>
                        )}
                      </div>
                      <p className={`text-sm font-bold text-sky-950 dark:text-sky-100 leading-snug ${course.planned ? 'opacity-70' : ''}`}>
                        {course.name}
                      </p>
                    </div>
                    <div className={`flex-shrink-0 mt-0.5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-sky-400 dark:text-sky-600">
                        <path d="M2.5 5L7 9.5L11.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>

                  <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[600px] mt-3 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className={`w-full h-px mb-3 ${group.accent} opacity-20`} style={{ background: 'currentColor' }} />
                    <p className="text-sm text-sky-700 dark:text-sky-300/80 leading-relaxed">{course.blurb}</p>
                    {course.deck && isOpen && (
                      <ListAnkiViewer deck={course.deck} accentColor={group.accentColor} courseCode={course.code} />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}