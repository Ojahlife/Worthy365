import React, { useState, useEffect } from 'react';
import { getCurrentWeekReflection, weeklyReflections } from '@/data/worthyMessages';

const WeekView: React.FC = () => {
  const [currentReflection, setCurrentReflection] = useState(weeklyReflections[0]);
  const [isVisible, setIsVisible] = useState(false);
  const [expandedSection, setExpandedSection] = useState<'reflection' | 'practice' | null>('reflection');

  useEffect(() => {
    setCurrentReflection(getCurrentWeekReflection());
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const getWeekNumber = () => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 1);
    const diff = now.getTime() - start.getTime();
    const oneWeek = 1000 * 60 * 60 * 24 * 7;
    return Math.ceil(diff / oneWeek);
  };

  const getWeekDateRange = () => {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - dayOfWeek);
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    
    const formatDate = (date: Date) => {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };
    
    return `${formatDate(startOfWeek)} – ${formatDate(endOfWeek)}`;
  };

  const getDayNames = () => ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  return (
    <div className="min-h-screen pb-32">
      {/* Paper texture overlay */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-20 z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Header */}
      <header className="relative z-10 pt-12 pb-6 px-6">
        <div className="text-center">
          <p 
            className="text-xs tracking-[0.2em] uppercase text-[#A0826D]/60 mb-2"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Week {getWeekNumber()}
          </p>
          <h1 
            className="text-2xl font-light tracking-wide text-[#8B7355] mb-2"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            This Week
          </h1>
          <p 
            className="text-sm text-[#A0826D]/70 mb-1"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            {getWeekDateRange()}
          </p>
          <p 
            className="text-xs text-[#D4A574]/70 italic"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Re-membering your worth, day by day
          </p>
        </div>
      </header>


      {/* Theme Banner */}
      <div 
        className={`relative z-10 mx-6 mb-8 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <div 
          className="relative rounded-2xl overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #A8CBDA 0%, #C9D4E0 50%, #DBC8B8 100%)',
          }}
        >
          {/* Watercolor texture overlay */}
          <div 
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.5' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
            }}
          />
          
          <div className="relative p-8 text-center">
            <div className="flex items-center justify-center mb-4">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#5C4A3D" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="opacity-60">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                <path d="M2 17l10 5 10-5"/>
                <path d="M2 12l10 5 10-5"/>
              </svg>
            </div>
            <p 
              className="text-xs tracking-[0.3em] uppercase text-[#5C4A3D]/60 mb-2"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              Weekly Theme
            </p>
            <h2 
              className="text-3xl font-light text-[#5C4A3D]"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              {currentReflection.theme}
            </h2>
          </div>
        </div>
      </div>

      {/* Reflection Section */}
      <div 
        className={`relative z-10 mx-6 mb-6 transition-all duration-700 delay-200 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <button
          onClick={() => setExpandedSection(expandedSection === 'reflection' ? null : 'reflection')}
          className="w-full text-left"
        >
          <div className="flex items-center justify-between p-4 bg-white/50 rounded-xl border border-[#D4A574]/20 hover:bg-white/70 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#A8CBDA]/30 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8B7355" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
                </svg>
              </div>
              <span 
                className="text-lg text-[#5C4A3D]"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                Reflection
              </span>
            </div>
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="#A0826D" 
              strokeWidth="1.5"
              className={`transition-transform duration-300 ${expandedSection === 'reflection' ? 'rotate-180' : ''}`}
            >
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </div>
        </button>
        
        <div 
          className={`overflow-hidden transition-all duration-500 ${
            expandedSection === 'reflection' ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="p-6 bg-white/30 rounded-b-xl border-x border-b border-[#D4A574]/20 -mt-2">
            <p 
              className="text-[#5C4A3D]/90 leading-relaxed"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              {currentReflection.reflection}
            </p>
          </div>
        </div>
      </div>

      {/* Practice Section */}
      <div 
        className={`relative z-10 mx-6 mb-8 transition-all duration-700 delay-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <button
          onClick={() => setExpandedSection(expandedSection === 'practice' ? null : 'practice')}
          className="w-full text-left"
        >
          <div className="flex items-center justify-between p-4 bg-white/50 rounded-xl border border-[#D4A574]/20 hover:bg-white/70 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#D4A574]/20 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8B7355" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 8h1a4 4 0 0 1 0 8h-1"/>
                  <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
                  <line x1="6" y1="1" x2="6" y2="4"/>
                  <line x1="10" y1="1" x2="10" y2="4"/>
                  <line x1="14" y1="1" x2="14" y2="4"/>
                </svg>
              </div>
              <span 
                className="text-lg text-[#5C4A3D]"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                Weekly Practice
              </span>
            </div>
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="#A0826D" 
              strokeWidth="1.5"
              className={`transition-transform duration-300 ${expandedSection === 'practice' ? 'rotate-180' : ''}`}
            >
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </div>
        </button>
        
        <div 
          className={`overflow-hidden transition-all duration-500 ${
            expandedSection === 'practice' ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="p-6 bg-white/30 rounded-b-xl border-x border-b border-[#D4A574]/20 -mt-2">
            <p 
              className="text-[#5C4A3D]/90 leading-relaxed italic"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              {currentReflection.practice}
            </p>
          </div>
        </div>
      </div>

      {/* Week Progress */}
      <div 
        className={`relative z-10 mx-6 transition-all duration-700 delay-400 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <p 
          className="text-center text-xs text-[#A0826D]/60 mb-4"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          Your week
        </p>
        <div className="flex justify-center gap-4">
          {getDayNames().map((day, index) => {
            const today = new Date().getDay();
            const isPast = index < today;
            const isToday = index === today;
            
            return (
              <div key={index} className="flex flex-col items-center gap-2">
                <span 
                  className="text-xs text-[#A0826D]/50"
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  {day}
                </span>
                <div 
                  className={`w-4 h-4 rounded-full transition-all duration-300 ${
                    isToday 
                      ? 'bg-[#D4A574] scale-125 ring-2 ring-[#D4A574]/30 ring-offset-2 ring-offset-[#F5F1E8]' 
                      : isPast 
                        ? 'bg-[#A8CBDA]' 
                        : 'bg-[#D4A574]/20'
                  }`}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Decorative Crow Feather */}
      <div 
        className={`relative z-10 flex justify-center mt-10 transition-all duration-700 delay-500 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <svg width="50" height="80" viewBox="0 0 50 80" className="text-[#8B7355]/15">
          <path 
            d="M25 0 C25 0 20 15 16 30 C12 45 8 60 25 80 C42 60 38 45 34 30 C30 15 25 0 25 0 Z" 
            fill="currentColor"
          />
          <line x1="25" y1="8" x2="25" y2="72" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
        </svg>
      </div>
    </div>
  );
};

export default WeekView;
