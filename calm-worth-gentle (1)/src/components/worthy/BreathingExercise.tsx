import React, { useState, useEffect, useCallback } from 'react';

interface BreathingExerciseProps {
  isOpen: boolean;
  onClose: () => void;
}

const BreathingExercise: React.FC<BreathingExerciseProps> = ({ isOpen, onClose }) => {
  const [phase, setPhase] = useState<'ready' | 'inhale' | 'hold' | 'exhale' | 'complete'>('ready');
  const [cycleCount, setCycleCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const totalCycles = 3;

  const runBreathingCycle = useCallback(() => {
    setIsAnimating(true);
    
    // Inhale for 4 seconds
    setPhase('inhale');
    
    setTimeout(() => {
      // Hold for 4 seconds
      setPhase('hold');
      
      setTimeout(() => {
        // Exhale for 6 seconds
        setPhase('exhale');
        
        setTimeout(() => {
          setCycleCount(prev => {
            const newCount = prev + 1;
            if (newCount >= totalCycles) {
              setPhase('complete');
              setIsAnimating(false);
              return newCount;
            }
            // Start next cycle
            setPhase('inhale');
            return newCount;
          });
        }, 6000);
      }, 4000);
    }, 4000);
  }, []);

  useEffect(() => {
    if (isAnimating && phase === 'inhale' && cycleCount < totalCycles) {
      const timer = setTimeout(() => {
        setPhase('hold');
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isAnimating, phase, cycleCount]);

  const startExercise = () => {
    setCycleCount(0);
    runBreathingCycle();
  };

  const resetExercise = () => {
    setPhase('ready');
    setCycleCount(0);
    setIsAnimating(false);
  };

  if (!isOpen) return null;

  const getPhaseText = () => {
    switch (phase) {
      case 'ready':
        return 'Ready to begin';
      case 'inhale':
        return 'Breathe in...';
      case 'hold':
        return 'Hold...';
      case 'exhale':
        return 'Breathe out...';
      case 'complete':
        return 'Well done';
      default:
        return '';
    }
  };

  const getCircleScale = () => {
    switch (phase) {
      case 'inhale':
        return 'scale-100';
      case 'hold':
        return 'scale-100';
      case 'exhale':
        return 'scale-75';
      default:
        return 'scale-75';
    }
  };

  const getCircleDuration = () => {
    switch (phase) {
      case 'inhale':
        return 'duration-[4000ms]';
      case 'hold':
        return 'duration-[4000ms]';
      case 'exhale':
        return 'duration-[6000ms]';
      default:
        return 'duration-500';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#F5F1E8]/98 backdrop-blur-sm">
      {/* Paper texture */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 p-2 text-[#8B7355] hover:bg-[#D4A574]/10 rounded-full transition-colors"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"/>
          <line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>

      <div className="relative text-center px-8 max-w-md">
        {/* Breathing Circle */}
        <div className="relative w-64 h-64 mx-auto mb-10">
          {/* Outer ring */}
          <div className="absolute inset-0 rounded-full border border-[#D4A574]/20" />
          
          {/* Animated circle */}
          <div 
            className={`absolute inset-4 rounded-full transition-all ease-in-out ${getCircleScale()} ${getCircleDuration()}`}
            style={{
              background: 'radial-gradient(circle, #A8CBDA 0%, #A8CBDA80 50%, transparent 70%)',
            }}
          />
          
          {/* Inner glow */}
          <div 
            className={`absolute inset-8 rounded-full transition-all ease-in-out ${getCircleScale()} ${getCircleDuration()}`}
            style={{
              background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%)',
            }}
          />
          
          {/* Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span 
              className="text-lg text-[#5C4A3D]"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              {getPhaseText()}
            </span>
            {isAnimating && phase !== 'complete' && (
              <span 
                className="text-sm text-[#A0826D]/60 mt-1"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                {cycleCount + 1} of {totalCycles}
              </span>
            )}
          </div>
        </div>

        {/* Instructions */}
        {phase === 'ready' && (
          <div className="mb-8">
            <p 
              className="text-[#5C4A3D]/80 leading-relaxed mb-6"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              Take a moment to settle. When you're ready, we'll breathe together: 
              4 counts in, 4 counts hold, 6 counts out.
            </p>
            <button
              onClick={startExercise}
              className="px-8 py-3 rounded-full bg-[#8B7355] text-[#F5F1E8] font-medium hover:bg-[#7A6548] transition-colors"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              Begin
            </button>
          </div>
        )}

        {phase === 'complete' && (
          <div className="mb-8">
            <p 
              className="text-[#5C4A3D]/80 leading-relaxed mb-6"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              You showed up for yourself. That matters. Take this calm with you.
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={resetExercise}
                className="px-6 py-3 rounded-full bg-[#D4A574]/20 text-[#8B7355] font-medium hover:bg-[#D4A574]/30 transition-colors"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                Again
              </button>
              <button
                onClick={onClose}
                className="px-6 py-3 rounded-full bg-[#8B7355] text-[#F5F1E8] font-medium hover:bg-[#7A6548] transition-colors"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                Done
              </button>
            </div>
          </div>
        )}

        {/* Affirmation during breathing */}
        {isAnimating && phase !== 'complete' && (
          <p 
            className="text-sm text-[#A0826D]/60"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            The breath is always here. Always yours.
          </p>
        )}
      </div>
    </div>
  );
};

export default BreathingExercise;
