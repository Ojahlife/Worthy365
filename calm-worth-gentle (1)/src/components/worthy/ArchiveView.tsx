import React, { useState, useEffect } from 'react';
import { dailyMessages, WorthyMessage } from '@/data/worthyMessages';

interface ArchiveViewProps {
  onClose: () => void;
  onToggleSaved?: (message: WorthyMessage) => void;
  isMessageSaved?: (messageId: number) => boolean;
}

const ArchiveView: React.FC<ArchiveViewProps> = ({ onClose, onToggleSaved, isMessageSaved }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<WorthyMessage | null>(null);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const getThemeColor = (theme: string) => {
    const colors: Record<string, string> = {
      presence: '#A8CBDA',
      belonging: '#D4A574',
      becoming: '#C4B7A6',
      rest: '#B8C4B8',
      trust: '#DBC8B8',
      release: '#C9D4E0',
    };
    return colors[theme] || '#D4A574';
  };

  const getPastDays = () => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    
    const days = [];
    for (let i = 0; i < Math.min(dayOfYear, 30); i++) {
      const messageIndex = (dayOfYear - i) % dailyMessages.length;
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      days.push({
        date,
        message: dailyMessages[messageIndex],
        isToday: i === 0,
      });
    }
    return days;
  };

  const pastDays = getPastDays();

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#F5F1E8] overflow-hidden">
      {/* Paper texture */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Header */}
      <header className="relative z-10 pt-12 pb-4 px-6 flex items-center justify-between">
        <button
          onClick={onClose}
          className="p-2 -ml-2 text-[#8B7355] hover:bg-[#D4A574]/10 rounded-full transition-colors"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"/>
            <polyline points="12 19 5 12 12 5"/>
          </svg>
        </button>
        <h1 
          className="text-xl font-light tracking-wide text-[#8B7355]"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          Past Messages
        </h1>
        <div className="w-10" />
      </header>

      {/* Message List */}
      <div className="relative z-10 overflow-y-auto h-[calc(100vh-100px)] px-6 pb-32 hide-scrollbar">
        <div className="max-w-md mx-auto space-y-3">
          {pastDays.map((day, index) => {
            const isSaved = isMessageSaved ? isMessageSaved(day.message.id) : false;
            
            return (
              <button
                key={index}
                onClick={() => setSelectedMessage(selectedMessage?.id === day.message.id ? null : day.message)}
                className={`w-full text-left transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <div 
                  className={`rounded-xl border p-4 transition-all duration-300 ${
                    selectedMessage?.id === day.message.id
                      ? 'bg-white/70 border-[#D4A574]/40 shadow-md'
                      : 'bg-white/40 border-[#D4A574]/20 hover:bg-white/60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span 
                      className="text-xs text-[#A0826D]/60"
                      style={{ fontFamily: 'Georgia, serif' }}
                    >
                      {day.isToday ? 'Today' : formatDate(day.date)}
                    </span>
                    <div className="flex items-center gap-2">
                      {isSaved && (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="#D4A574" stroke="#D4A574" strokeWidth="1.5">
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                        </svg>
                      )}
                      <div 
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: getThemeColor(day.message.theme) }}
                      />
                    </div>
                  </div>
                  <p 
                    className={`text-[#5C4A3D] transition-all duration-300 ${
                      selectedMessage?.id === day.message.id ? 'text-base' : 'text-sm line-clamp-2'
                    }`}
                    style={{ fontFamily: 'Georgia, serif' }}
                  >
                    "{day.message.message}"
                  </p>
                  {selectedMessage?.id === day.message.id && (
                    <div className="mt-3 pt-3 border-t border-[#D4A574]/20 flex items-center justify-between">
                      <span 
                        className="text-xs tracking-[0.15em] uppercase text-[#8B7355]/60"
                        style={{ fontFamily: 'Georgia, serif' }}
                      >
                        {day.message.theme}
                      </span>
                      {onToggleSaved && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleSaved(day.message);
                          }}
                          className={`flex items-center gap-1.5 text-xs transition-colors ${
                            isSaved ? 'text-[#D4A574]' : 'text-[#A0826D]/60 hover:text-[#D4A574]'
                          }`}
                          style={{ fontFamily: 'Georgia, serif' }}
                        >
                          <svg 
                            width="14" 
                            height="14" 
                            viewBox="0 0 24 24" 
                            fill={isSaved ? 'currentColor' : 'none'} 
                            stroke="currentColor" 
                            strokeWidth="1.5"
                          >
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                          </svg>
                          {isSaved ? 'Saved' : 'Save'}
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ArchiveView;
