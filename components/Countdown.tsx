
import React, { useState, useEffect, useRef } from 'react';

const FlipCard = ({ value, label }: { value: number; label: string }) => {
  const displayValue = value.toString().padStart(2, '0');
  const prevValueRef = useRef(displayValue);
  const [flipping, setFlipping] = useState(false);
  const [currentDisplay, setCurrentDisplay] = useState(displayValue);
  const [nextDisplay, setNextDisplay] = useState(displayValue);

  useEffect(() => {
    if (displayValue !== prevValueRef.current) {
      setNextDisplay(displayValue);
      setFlipping(true);

      const timeout = setTimeout(() => {
        setCurrentDisplay(displayValue);
        setFlipping(false);
        prevValueRef.current = displayValue;
      }, 750);

      return () => clearTimeout(timeout);
    }
  }, [displayValue]);

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flip-clock-card">
        {/* Top half - static, shows current (or next after flip) */}
        <div className="flip-half flip-top">
          <div className="flip-half-inner">
            <span>{flipping ? nextDisplay : currentDisplay}</span>
          </div>
        </div>

        {/* Bottom half - static, shows current */}
        <div className="flip-half flip-bottom">
          <div className="flip-half-inner">
            <span>{currentDisplay}</span>
          </div>
        </div>

        {/* Flipping top half - folds down revealing new number */}
        {flipping && (
          <>
            {/* Front of flip (old number top half, folds down) */}
            <div className="flip-panel flip-panel-front" key={`front-${nextDisplay}`}>
              <div className="flip-half-inner">
                <span>{currentDisplay}</span>
              </div>
            </div>
            {/* Back of flip (new number bottom half, revealed) */}
            <div className="flip-panel flip-panel-back" key={`back-${nextDisplay}`}>
              <div className="flip-half-inner">
                <span>{nextDisplay}</span>
              </div>
            </div>
          </>
        )}

        {/* Center divider line */}
        <div className="flip-divider" />
      </div>
      <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-purple-300/50">
        {label}
      </span>
    </div>
  );
};

const Countdown: React.FC = () => {
  const targetDate = new Date('2026-02-23T00:00:00').getTime();

  const calcTimeLeft = () => {
    const now = new Date().getTime();
    const distance = Math.max(0, targetDate - now);
    return {
      days: Math.floor(distance / (1000 * 60 * 60 * 24)),
      hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((distance % (1000 * 60)) / 1000)
    };
  };

  const [timeLeft, setTimeLeft] = useState(calcTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calcTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex gap-4 md:gap-8 justify-center items-center mt-12 mb-8">
      <FlipCard value={timeLeft.days} label="Days" />
      <FlipCard value={timeLeft.hours} label="Hours" />
      <FlipCard value={timeLeft.minutes} label="Minutes" />
      <FlipCard value={timeLeft.seconds} label="Seconds" />
    </div>
  );
};

export default Countdown;
