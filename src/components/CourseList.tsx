import React, { useState } from 'react';

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
        blurb: 'Vector spaces, linear transformations, eigenvalues, and standard matrix factorizations with rigorous proof writing. Core mathematical language for data systems, graphics, and ML research.' },
      { code: 'MATH 240', name: 'Introduction to Discrete Mathematics', credits: 3,
        blurb: 'Logic, sets, recursion, graph theory, and asymptotic analysis with a focus on discrete structures. Direct foundation for algorithm design and database query reasoning.' },
      { code: 'MATH 431', name: 'Introduction to the Theory of Probability', credits: 3,
        blurb: 'Probability axioms, discrete and continuous distributions, expectation, moment generating functions, conditional probability, multivariate distributions, and the central limit theorem. Provides the probabilistic foundations relevant to statistical learning and stochastic analysis in research.' },
    ],
  },
  {
    theme: 'Systems & Architecture',
    accent: 'text-sky-500 dark:text-sky-400',
    accentColor: '#38bdf8',
    courses: [
      { code: 'ECE 252', name: 'Introduction to Computer Engineering', credits: 3,
        blurb: 'Transistor-level logic, combinational and sequential circuit design, and introductory assembly programming. Establishes the hardware substrate that systems software runs on.' },
      { code: 'CS 354', name: 'Machine Organization and Programming', credits: 3,
        blurb: 'C programming, virtual memory, the memory hierarchy, caching, assembly, and linkers. Essential low-level knowledge directly applicable to database storage engines and OS internals.' },
      { code: 'CS 537', name: 'Introduction to Operating Systems', credits: 4,
        blurb: 'Scheduling, virtual memory, file systems, synchronization, and I/O handling through xv6 implementation. Directly informs the concurrency and storage layer work in database systems research.',
        deck: { cards: [
          { front: 'What is the key difference between a process and a thread?',          back: 'A process has its own address space; threads share the address space of their parent process but have independent stacks and registers.' },
          { front: "What problem does Peterson's algorithm solve?",                       back: 'Mutual exclusion for two processes sharing a critical section, using only shared memory and without hardware atomics.' },
          { front: 'What is a TLB shootdown?',                                            back: 'When a page mapping changes, all CPUs caching that mapping in their TLBs must be notified via IPI to invalidate the stale entry.' },
          { front: 'What is the difference between internal and external fragmentation?', back: 'Internal: wasted space inside an allocated block. External: free memory exists but is split into non-contiguous chunks too small to satisfy a request.' },
          { front: 'Why does xv6 use a linked list for the free page list?',              back: 'Simplicity — allocation and free are O(1) without needing to scan a bitmap. The tradeoff is no efficient range queries.' },
        ]}
      },
      { code: 'CS 640', name: 'Introduction to Computer Networks', credits: 3,
        blurb: 'Protocol layering, reliable transmission, congestion control, routing, and widely deployed protocols including TCP/IP and HTTP. Foundation for understanding communication in distributed systems.' },
      { code: 'CS 536', name: 'Introduction to Programming Languages and Compilers', credits: 3, planned: true,
        blurb: 'Lexing, parsing, semantic analysis, and code generation through a full compiler implementation. Deepens understanding of language runtimes and low-level code optimization relevant to query compilation.' },
      { code: 'CS 642', name: 'Introduction to Information Security', credits: 3, planned: true,
        blurb: 'Cryptographic primitives, authentication protocols, and system-level security including memory and OS vulnerabilities. Complements systems knowledge with an adversarial perspective.' },
      { code: 'CS 759', name: 'High Performance Computing for Applications in Engineering', credits: 3, graduate: true, planned: true,
        blurb: 'Parallel computing on emerging hardware architectures including GPU programming. Direct application to CUDA-based query execution operator development in the Sirius DB research project.' },
    ],
  },
  {
    theme: 'Data Systems & Databases',
    accent: 'text-emerald-500 dark:text-emerald-400',
    accentColor: '#34d399',
    courses: [
      { code: 'CS 564', name: 'Database Management Systems: Design and Implementation', credits: 4,
        blurb: 'Relational algebra, B-tree indexing, buffer pool management, query processing, concurrency control, and recovery. Direct foundation for the open-source SQL engine work at the UW Systems Lab.' },
      { code: 'CS 544', name: 'Introduction to Big Data Systems', credits: 3,
        blurb: 'Distributed storage and computation using Spark, Kafka, and HDFS with Python. Connects database internals knowledge to production-scale analytical workload patterns.' },
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
        blurb: 'Search, knowledge representation, probabilistic reasoning, and machine learning fundamentals. Broadens perspective on data-driven approaches alongside systems-focused coursework.' },
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
        blurb: 'Balanced search trees, graphs, hash tables, and complexity analysis in professional-grade Java. Bridges foundational data structures with the performance-critical implementations found in systems research.' },
    ],
  },
  {
    theme: 'Statistics',
    accent: 'text-cyan-500 dark:text-cyan-400',
    accentColor: '#22d3ee',
    courses: [
      { code: 'STAT 240', name: 'Data Science Modeling I', credits: 4,
        blurb: 'Data management, probability distributions, statistical inference, and simple linear regression using R. Builds the quantitative reasoning used in empirical systems evaluation.' },
      { code: 'STAT 303', name: 'R for Statistics I', credits: 1,
        blurb: 'Practical R programming for data manipulation and exploratory analysis. Supports reproducible data pipelines in research and statistical computing workflows.' },
    ],
  },
];


function ListAnkiViewer({ deck, accentColor }: { deck: { cards: FlashCard[] }; accentColor: string }) {
  const [index, setIndex] = React.useState(0);
  const [flipped, setFlip] = React.useState(false);
  const total = deck.cards.length;
  const card  = deck.cards[index];
  const next = (e: React.MouseEvent) => { e.stopPropagation(); setFlip(false); setTimeout(() => setIndex(i => (i + 1) % total), 150); };
  const prev = (e: React.MouseEvent) => { e.stopPropagation(); setFlip(false); setTimeout(() => setIndex(i => (i - 1 + total) % total), 150); };
  return (
    <div className="mt-3 space-y-2 select-none" onClick={e => e.stopPropagation()}>
      <div className="flex items-center justify-between">
        <span className="text-[9px] font-mono font-bold uppercase tracking-widest opacity-50 text-sky-800 dark:text-sky-200">Anki · {index + 1} / {total}</span>
        <a href="#" onClick={e => e.preventDefault()} className="text-[9px] font-mono font-bold uppercase tracking-widest underline underline-offset-2 opacity-40 hover:opacity-80 transition-opacity text-sky-700 dark:text-sky-300">Download .apkg</a>
      </div>
      <div className="relative w-full cursor-pointer rounded-lg border overflow-hidden"
        style={{ height: '82px', borderColor: accentColor + '30', background: accentColor + '08' }}
        onClick={e => { e.stopPropagation(); setFlip(f => !f); }}>
        <div className="absolute inset-0 flex flex-col items-center justify-center px-3 py-2 text-center"
          style={{ opacity: flipped ? 0 : 1, transition: 'opacity 0.15s ease', pointerEvents: flipped ? 'none' : 'auto' }}>
          <span className="text-[8px] font-mono uppercase tracking-widest opacity-40 mb-1.5 text-sky-800 dark:text-sky-200">front · tap to flip</span>
          <p className="text-xs leading-snug font-medium text-sky-900 dark:text-sky-100">{card.front}</p>
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center px-3 py-2 text-center"
          style={{ opacity: flipped ? 1 : 0, transition: 'opacity 0.15s ease', pointerEvents: flipped ? 'auto' : 'none' }}>
          <span className="text-[8px] font-mono uppercase tracking-widest opacity-40 mb-1.5 text-sky-800 dark:text-sky-200">back</span>
          <p className="text-xs leading-snug text-sky-900 dark:text-sky-100">{card.back}</p>
        </div>
      </div>
      <div className="flex justify-between items-center pt-0.5">
        <button onClick={prev} className="text-[9px] font-mono font-bold px-2 py-0.5 rounded border opacity-50 hover:opacity-90 transition-opacity cursor-pointer text-sky-800 dark:text-sky-200" style={{ borderColor: accentColor + '40' }}>← prev</button>
        <div className="flex gap-1">{deck.cards.map((_, i) => <span key={i} className="w-1 h-1 rounded-full" style={{ background: accentColor, opacity: i === index ? 1 : 0.25 }} />)}</div>
        <button onClick={next} className="text-[9px] font-mono font-bold px-2 py-0.5 rounded border opacity-50 hover:opacity-90 transition-opacity cursor-pointer text-sky-800 dark:text-sky-200" style={{ borderColor: accentColor + '40' }}>next →</button>
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
          <span className="text-[11px] font-mono font-bold text-sky-600/60 dark:text-sky-400/50 uppercase tracking-widest">
            {takenCount} taken · {takenCredits} cr
          </span>
          {showPlanned && (
            <span className="text-[11px] font-mono font-bold text-sky-500/40 dark:text-sky-500/35 uppercase tracking-widest">
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
            <span className={`text-[10px] font-mono font-bold uppercase tracking-widest opacity-30 ${group.accent}`}>
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
                        <span className="text-[9px] font-mono font-bold text-sky-400/50 dark:text-sky-600/50 border border-sky-200 dark:border-sky-800 rounded px-1.5 py-0.5">
                          {course.credits} cr
                        </span>
                        {course.graduate && (
                          <span className="text-[9px] font-mono font-bold border rounded px-1.5 py-0.5 text-sky-500 dark:text-sky-400 border-sky-300 dark:border-sky-700 bg-sky-50 dark:bg-sky-900/40">
                            Graduate
                          </span>
                        )}
                        {course.planned && (
                          <span className="text-[9px] font-mono font-bold border border-dashed rounded px-1.5 py-0.5 text-sky-400/70 dark:text-sky-500/60 border-sky-300 dark:border-sky-700">
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
                    <p className="text-sm text-sky-700/80 dark:text-sky-300/70 leading-relaxed">{course.blurb}</p>
                    {course.deck && isOpen && (
                      <ListAnkiViewer deck={course.deck} accentColor={group.accentColor} />
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