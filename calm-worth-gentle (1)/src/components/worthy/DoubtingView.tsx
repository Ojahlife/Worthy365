import React, { useState, useEffect } from 'react';
import { doubtingMessages } from '@/data/worthyMessages';

const DoubtingView: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<number | null>(null);
  const [breathingActive, setBreathingActive] = useState(false);
  const [breathPhase, setBreathPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  useEffect(() => {
    if (breathingActive && selectedMessage !== null) {
      const phases = ['inhale', 'hold', 'exhale'] as const;
      let currentPhaseIndex = 0;
      
      const interval = setInterval(() => {
        currentPhaseIndex = (currentPhaseIndex + 1) % 3;
        setBreathPhase(phases[currentPhaseIndex]);
      }, 4000);
      
      return () => clearInterval(interval);
    }
  }, [breathingActive, selectedMessage]);

  const handleCardClick = (index: number) => {
    if (selectedMessage === index) {
      setSelectedMessage(null);
      setBreathingActive(false);
    } else {
      setSelectedMessage(index);
      setBreathingActive(false);
    }
  };

  const startBreathing = () => {
    setBreathingActive(true);
    setBreathPhase('inhale');
  };

  return (
    <div className="min-h-screen pb-32">
      {/* Paper texture overlay */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-30 z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Header */}
      <header className="relative z-10 pt-12 pb-6 px-6">
        <div className="text-center">
          <div className="flex justify-center mb-3">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#8B7355" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-60">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </div>
          <h1 
            className="text-2xl font-light tracking-wide text-[#8B7355] mb-2"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            When You Forget
          </h1>
          <p 
            className="text-sm text-[#A0826D]/70 max-w-xs mx-auto mb-1"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Choose what you need to re-member right now
          </p>
          <p 
            className="text-xs text-[#D4A574]/70 italic"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Your worth was never lost—only forgotten
          </p>
        </div>
      </header>


      {/* Message Cards */}
      <div className="relative z-10 px-6 space-y-4">
        {doubtingMessages.map((item, index) => {
          const isSelected = selectedMessage === index;
          
          return (
            <div 
              key={index}
              className={`transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <button
                onClick={() => handleCardClick(index)}
                className={`w-full text-left transition-all duration-300 ${
                  isSelected ? '' : 'hover:scale-[1.02]'
                }`}
              >
                <div 
                  className={`rounded-xl border transition-all duration-300 ${
                    isSelected 
                      ? 'bg-white/70 border-[#D4A574]/40 shadow-lg' 
                      : 'bg-white/40 border-[#D4A574]/20 hover:bg-white/60'
                  }`}
                >
                  <div className="p-5">
                    <div className="flex items-center justify-between">
                      <h3 
                        className="text-lg text-[#5C4A3D]"
                        style={{ fontFamily: 'Georgia, serif' }}
                      >
                        {item.title}
                      </h3>
                      <svg 
                        width="20" 
                        height="20" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="#A0826D" 
                        strokeWidth="1.5"
                        className={`transition-transform duration-300 ${isSelected ? 'rotate-180' : ''}`}
                      >
                        <polyline points="6 9 12 15 18 9"/>
                      </svg>
                    </div>
                  </div>
                  
                  {/* Expanded Content */}
                  <div 
                    className={`overflow-hidden transition-all duration-500 ${
                      isSelected ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="px-5 pb-5 space-y-4">
                      {/* Divider */}
                      <div className="h-px bg-gradient-to-r from-transparent via-[#D4A574]/30 to-transparent" />
                      
                      {/* Message */}
                      <p 
                        className="text-[#5C4A3D]/90 leading-relaxed"
                        style={{ fontFamily: 'Georgia, serif' }}
                      >
                        {item.message}
                      </p>
                      
                      {/* Breathing Exercise */}
                      <div 
                        className="rounded-xl p-4 mt-4"
                        style={{
                          background: 'linear-gradient(135deg, #A8CBDA30 0%, #DBC8B830 100%)',
                        }}
                      >
                        <p 
                          className="text-xs tracking-[0.15em] uppercase text-[#8B7355]/60 mb-3"
                          style={{ fontFamily: 'Georgia, serif' }}
                        >
                          Breathwork
                        </p>
                        
                        {!breathingActive ? (
                          <div className="text-center">
                            <p 
                              className="text-sm text-[#5C4A3D]/80 mb-3"
                              style={{ fontFamily: 'Georgia, serif' }}
                            >
                              {item.breath}
                            </p>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                startBreathing();
                              }}
                              className="px-6 py-2 rounded-full bg-[#D4A574]/20 border border-[#D4A574]/30 text-[#8B7355] text-sm hover:bg-[#D4A574]/30 transition-colors"
                              style={{ fontFamily: 'Georgia, serif' }}
                            >
                              Begin Breathing
                            </button>
                          </div>
                        ) : (
                          <div className="text-center">
                            {/* Breathing Animation */}
                            <div className="relative w-24 h-24 mx-auto mb-4">
                              <div 
                                className={`absolute inset-0 rounded-full border-2 border-[#A8CBDA] transition-all duration-[4000ms] ease-in-out ${
                                  breathPhase === 'inhale' 
                                    ? 'scale-100 opacity-100' 
                                    : breathPhase === 'hold'
                                      ? 'scale-100 opacity-80'
                                      : 'scale-75 opacity-60'
                                }`}
                              />
                              <div 
                                className={`absolute inset-2 rounded-full bg-[#A8CBDA]/30 transition-all duration-[4000ms] ease-in-out ${
                                  breathPhase === 'inhale' 
                                    ? 'scale-100' 
                                    : breathPhase === 'hold'
                                      ? 'scale-100'
                                      : 'scale-50'
                                }`}
                              />
                              <div className="absolute inset-0 flex items-center justify-center">
                                <span 
                                  className="text-sm text-[#5C4A3D] capitalize"
                                  style={{ fontFamily: 'Georgia, serif' }}
                                >
                                  {breathPhase}
                                </span>
                              </div>
                            </div>
                            
                            <p 
                              className="text-xs text-[#A0826D]/60 mb-3"
                              style={{ fontFamily: 'Georgia, serif' }}
                            >
                              {item.breath}
                            </p>
                            
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setBreathingActive(false);
                              }}
                              className="text-xs text-[#8B7355]/60 underline"
                              style={{ fontFamily: 'Georgia, serif' }}
                            >
                              Stop
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            </div>
          );
        })}
      </div>

      {/* Crow Wisdom */}
      <div 
        className={`relative z-10 mt-8 px-6 transition-all duration-700 delay-600 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="max-w-xs mx-auto text-center">
          {/* Crow silhouette */}
          <div className="flex justify-center mb-4">
            <svg width="60" height="40" viewBox="0 0 60 40" className="text-[#8B7355]/20">
              <path 
                d="M30 8 C25 8, 20 12, 18 18 C16 22, 14 26, 10 28 L8 28 C6 28, 4 30, 4 32 L10 32 C14 32, 18 30, 22 26 C24 24, 26 22, 28 22 L32 22 C34 22, 36 24, 38 26 C42 30, 46 32, 50 32 L56 32 C56 30, 54 28, 52 28 L50 28 C46 26, 44 22, 42 18 C40 12, 35 8, 30 8 Z"
                fill="currentColor"
              />
              <circle cx="26" cy="14" r="1.5" fill="#F5F1E8" />
            </svg>
          </div>
          <p 
            className="text-xs text-[#A0826D]/50 italic"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            The crow sits on the branch and watches the storm pass. It doesn't become the storm. Neither must you.
          </p>
        </div>
      </div>

      {/* Bottom Encouragement */}
      <div 
        className={`relative z-10 mt-6 px-6 text-center transition-all duration-700 delay-700 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <p 
          className="text-sm text-[#A0826D]/60 max-w-xs mx-auto"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          Remember: doubt is not truth. It is weather passing through.
        </p>
      </div>
    </div>
  );
};

export default DoubtingView;
