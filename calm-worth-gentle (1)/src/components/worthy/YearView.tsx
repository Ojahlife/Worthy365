import React, { useState, useEffect } from 'react';
import { yearlyThemes, getCurrentMonthTheme } from '@/data/worthyMessages';

const YearView: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(yearlyThemes[0]);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);

  useEffect(() => {
    setCurrentMonth(getCurrentMonthTheme());
    setSelectedMonth(new Date().getMonth());
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const getMonthColor = (index: number) => {
    const colors = [
      '#8FA8C2', // January - crisp winter blue
      '#D49A7A', // February - warm terracotta
      '#8FB48A', // March - spring green
      '#A8C99A', // April - fresh leaf green
      '#E0B088', // May - bloom peach
      '#E8C97A', // June - sunlit gold
      '#D9B574', // July - warm wheat
      '#C99560', // August - amber gold
      '#B07A55', // September - harvest rust
      '#8E5A3C', // October - earthen brown
      '#9C7A5C', // November - oak bark
      '#6FA0C2', // December - deep winter blue
    ];
    return colors[index];
  };


  const currentMonthIndex = new Date().getMonth();

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
          <p 
            className="text-xs tracking-[0.2em] uppercase text-[#A0826D]/60 mb-2"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            {new Date().getFullYear()}
          </p>
          <h1 
            className="text-2xl font-light tracking-wide text-[#8B7355] mb-2"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            This Year
          </h1>
          <p 
            className="text-sm text-[#A0826D]/70 mb-1"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            A journey through twelve themes
          </p>
          <p 
            className="text-xs text-[#D4A574]/70 italic"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Re-calling your worth, season by season
          </p>
        </div>
      </header>


      {/* Current Month Highlight */}
      <div 
        className={`relative z-10 mx-6 mb-8 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <div 
          className="relative rounded-2xl overflow-hidden p-8"
          style={{
            background: `linear-gradient(135deg, ${getMonthColor(currentMonthIndex)}80 0%, ${getMonthColor(currentMonthIndex)}40 100%)`,
          }}
        >
          {/* Decorative sun/moon */}
          <div className="absolute top-4 right-4 opacity-30">
            <svg width="60" height="60" viewBox="0 0 60 60">
              <circle cx="30" cy="30" r="25" fill="none" stroke="#8B7355" strokeWidth="1"/>
              <circle cx="30" cy="30" r="18" fill="none" stroke="#8B7355" strokeWidth="0.5"/>
              <circle cx="30" cy="30" r="10" fill="#D4A574" opacity="0.5"/>
            </svg>
          </div>
          
          <p 
            className="text-xs tracking-[0.3em] uppercase text-[#5C4A3D]/60 mb-1"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Now
          </p>
          <h2 
            className="text-2xl font-light text-[#5C4A3D] mb-1"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            {currentMonth.month}
          </h2>
          <p 
            className="text-lg text-[#8B7355] mb-4"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            {currentMonth.theme}
          </p>
          <p 
            className="text-[#5C4A3D]/80 leading-relaxed"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            "{currentMonth.message}"
          </p>
        </div>
      </div>

      {/* Year Circle */}
      <div 
        className={`relative z-10 mx-6 mb-8 transition-all duration-700 delay-200 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <div className="relative aspect-square max-w-xs mx-auto">
          {/* Center */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p 
                className="text-xs tracking-[0.2em] uppercase text-[#A0826D]/60"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                Month
              </p>
              <p 
                className="text-3xl font-light text-[#8B7355]"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                {currentMonthIndex + 1}
              </p>
              <p 
                className="text-xs text-[#A0826D]/60"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                of 12
              </p>
            </div>
          </div>
          
          {/* Month dots in a circle */}
          {yearlyThemes.map((theme, index) => {
            const angle = (index * 30 - 90) * (Math.PI / 180);
            const radius = 45;
            const x = 50 + radius * Math.cos(angle);
            const y = 50 + radius * Math.sin(angle);
            const isCurrentMonth = index === currentMonthIndex;
            const isPast = index < currentMonthIndex;
            const isSelected = selectedMonth === index;
            
            return (
              <button
                key={index}
                onClick={() => setSelectedMonth(isSelected ? null : index)}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 group"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                }}
              >
                <div 
                  className={`rounded-full transition-all duration-300 ${
                    isCurrentMonth 
                      ? 'w-8 h-8 ring-2 ring-[#D4A574]/50 ring-offset-2 ring-offset-[#F5F1E8]' 
                      : isSelected
                        ? 'w-7 h-7'
                        : 'w-5 h-5 group-hover:w-6 group-hover:h-6'
                  }`}
                  style={{
                    backgroundColor: isPast || isCurrentMonth 
                      ? getMonthColor(index) 
                      : `${getMonthColor(index)}40`,
                  }}
                />
                {(isCurrentMonth || isSelected) && (
                  <span 
                    className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 text-[10px] text-[#8B7355] whitespace-nowrap"
                    style={{ fontFamily: 'Georgia, serif' }}
                  >
                    {theme.month.slice(0, 3)}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Month Details */}
      {selectedMonth !== null && selectedMonth !== currentMonthIndex && (
        <div 
          className={`relative z-10 mx-6 mb-8 transition-all duration-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div 
            className="rounded-xl p-6 border border-[#D4A574]/20"
            style={{
              backgroundColor: `${getMonthColor(selectedMonth)}20`,
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 
                className="text-lg text-[#5C4A3D]"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                {yearlyThemes[selectedMonth].month}
              </h3>
              <span 
                className="text-sm text-[#8B7355]"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                {yearlyThemes[selectedMonth].theme}
              </span>
            </div>
            <p 
              className="text-[#5C4A3D]/80 text-sm leading-relaxed"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              "{yearlyThemes[selectedMonth].message}"
            </p>
          </div>
        </div>
      )}

      {/* Year Progress */}
      <div 
        className={`relative z-10 mx-6 transition-all duration-700 delay-400 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="flex-1 h-1 bg-[#D4A574]/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#A8CBDA] to-[#D4A574] rounded-full transition-all duration-1000"
              style={{ width: `${((currentMonthIndex + 1) / 12) * 100}%` }}
            />
          </div>
          <span 
            className="text-xs text-[#A0826D]/60"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            {Math.round(((currentMonthIndex + 1) / 12) * 100)}%
          </span>
        </div>
        <p 
          className="text-center text-xs text-[#A0826D]/50"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          {12 - currentMonthIndex - 1} months remaining in this cycle
        </p>
      </div>

      {/* Decorative element */}
      <div className="relative z-10 flex justify-center mt-8">
        <svg width="80" height="40" viewBox="0 0 80 40" className="text-[#D4A574]/20">
          <path d="M0 20 Q20 0 40 20 T80 20" fill="none" stroke="currentColor" strokeWidth="1"/>
          <circle cx="40" cy="20" r="3" fill="currentColor"/>
        </svg>
      </div>
    </div>
  );
};

export default YearView;
