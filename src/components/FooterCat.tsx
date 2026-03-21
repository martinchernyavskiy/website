import React, { useState, useEffect, useRef } from 'react';

export default function FooterCat() {
  const [step, setStep]             = useState(0);
  const [isHiding, setIsHiding]     = useState(false);
  const [isSleeping, setIsSleeping] = useState(false);
  const [speech, setSpeech]         = useState('MEOW!');
  const observerRef  = useRef<HTMLDivElement>(null);
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);

  const resetIdleTimer = () => {
    setIsSleeping(false);
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    idleTimerRef.current = setTimeout(() => {
      if (step >= 2 && !isHiding) setIsSleeping(true);
    }, 15000);
  };

  useEffect(() => {
    window.addEventListener('mousemove', resetIdleTimer);
    window.addEventListener('keydown',   resetIdleTimer);
    window.addEventListener('scroll',    resetIdleTimer);
    resetIdleTimer();
    return () => {
      window.removeEventListener('mousemove', resetIdleTimer);
      window.removeEventListener('keydown',   resetIdleTimer);
      window.removeEventListener('scroll',    resetIdleTimer);
    };
  }, [step, isHiding]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && step === 0) {
          setStep(1);
          setTimeout(() => setStep(2), 400);
          setTimeout(() => setStep(3), 1000);
          setTimeout(() => setStep(4), 1200);
        }
      },
      { threshold: 0.1 }
    );
    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [step]);

  const handleClick = () => {
    if (isHiding || step < 4) return;
    if (isSleeping) { setIsSleeping(false); resetIdleTimer(); return; }

    setSpeech('Ope! 💨');
    setTimeout(() => setIsHiding(true), 400);
    setTimeout(() => {
      setIsHiding(false);
      setSpeech("DON'T TOUCH ME! 😠");
      setTimeout(() => setSpeech('MEOW!'), 3000);
    }, 2500);
  };

  return (
    <div ref={observerRef} className="relative w-32 h-24 cursor-pointer group" onClick={handleClick}>

      {isSleeping && !isHiding && (
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 pointer-events-none select-none z-50">
          <span className="animate-zzz font-bold text-sky-400 dark:text-sky-500" style={{ fontSize: '8px', left: '0px', top: '0px', animationDelay: '0s' }}>z</span>
          <span className="animate-zzz font-bold text-sky-400 dark:text-sky-500" style={{ fontSize: '10px', left: '0px', top: '0px', animationDelay: '1s' }}>z</span>
          <span className="animate-zzz font-bold text-sky-400 dark:text-sky-500" style={{ fontSize: '13px', left: '0px', top: '0px', animationDelay: '2s' }}>Z</span>
        </div>
      )}

      <div className={`absolute bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white dark:bg-sky-800 text-sky-900 dark:text-sky-100 px-2.5 py-1 rounded-xl text-[10px] font-black tracking-widest uppercase border border-sky-200 dark:border-sky-700 transition-all duration-500 shadow-sm z-30 origin-bottom ${step >= 4 && !isHiding && !isSleeping ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-50'}`}>
        {speech}
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white dark:bg-sky-800 border-r border-b border-sky-200 dark:border-sky-700 rotate-45"></div>
      </div>

      <div className="absolute bottom-0 w-full h-14 overflow-hidden">
        <div className={`absolute bottom-0 left-[38px] transition-transform duration-500 ease-out ${step >= 1 && !isHiding ? 'translate-y-[1.5px]' : 'translate-y-full'}`}>
          <svg width="14" height="10" viewBox="0 0 22 14" fill="none" className="text-sky-500 dark:text-sky-400">
            <path d="M 2 14 Q 2 2 11 2 Q 20 2 20 14" fill="white" className="dark:fill-sky-950" stroke="currentColor" strokeWidth="2" />
            <path d="M 7 6 v 4 M 11 5 v 5 M 15 6 v 4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
          </svg>
        </div>
        <div className={`absolute bottom-0 right-[38px] transition-transform duration-500 ease-out ${step >= 1 && !isHiding ? 'translate-y-[1.5px]' : 'translate-y-full'}`}>
          <svg width="14" height="10" viewBox="0 0 22 14" fill="none" className="text-sky-500 dark:text-sky-400">
            <path d="M 2 14 Q 2 2 11 2 Q 20 2 20 14" fill="white" className="dark:fill-sky-950" stroke="currentColor" strokeWidth="2" />
            <path d="M 7 6 v 4 M 11 5 v 5 M 15 6 v 4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
          </svg>
        </div>

        <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 transition-transform duration-500 ease-out ${step >= 2 && !isHiding ? 'translate-y-[5px]' : 'translate-y-[120%]'}`}>
          <div className={`origin-bottom transition-transform duration-500 ${step >= 3 && !isHiding && !isSleeping ? 'animate-cat-playful' : ''} ${isSleeping && !isHiding ? 'animate-snore' : ''}`}>
            <svg width="46" height="38" viewBox="-2 0 28 22" className="text-sky-500 dark:text-sky-400">
              <path d="M12 5c.67 0 1.35.09 2 .26 1.78-2 5.03-2.84 6.42-2.26 1.4.58-.42 7-.42 7 .57 1.07 1 2.24 1 3.44C21 17.9 16.97 21 12 21s-9-3.1-9-7.56c0-1.25.5-2.4 1-3.44 0 0-1.89-6.42-.5-7 1.39-.58 4.69.23 6.5 2.23A9.04 9.04 0 0 1 12 5Z" fill="white" className="dark:fill-sky-950" stroke="currentColor" strokeWidth="1.2" />
              {isSleeping ? (
                <>
                  <path d="M7 13.5 Q 8.5 15 10 13.5"  fill="none" stroke="currentColor" strokeWidth="1" />
                  <path d="M14 13.5 Q 15.5 15 17 13.5" fill="none" stroke="currentColor" strokeWidth="1" />
                </>
              ) : (
                <>
                  <circle cx="8.5"  cy="13.5" r="1.2" fill="currentColor" stroke="none" />
                  <circle cx="15.5" cy="13.5" r="1.2" fill="currentColor" stroke="none" />
                </>
              )}
              <path d="M 11 15 h 2 l -1 1.2 z" fill="currentColor" stroke="none" />
              <path d="M 4 12.5 l 2 0.5 M 3 14 l 3 0 M 4 15.5 l 2 -0.5" stroke="currentColor" strokeWidth="0.6" strokeLinecap="round" opacity="0.6" />
              <path d="M 20 12.5 l -2 0.5 M 21 14 l -3 0 M 20 15.5 l -2 -0.5" stroke="currentColor" strokeWidth="0.6" strokeLinecap="round" opacity="0.6" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}