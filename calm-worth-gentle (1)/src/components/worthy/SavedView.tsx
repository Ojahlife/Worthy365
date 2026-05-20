import React, { useState, useEffect } from 'react';
import { SavedMessage } from '@/hooks/useSavedMessages';

interface SavedViewProps {
  savedMessages: SavedMessage[];
  onUnsave: (messageId: number) => void;
  isMessageSaved: (messageId: number) => boolean;
}

const SavedView: React.FC<SavedViewProps> = ({ savedMessages, onUnsave, isMessageSaved }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [expandedMessage, setExpandedMessage] = useState<number | null>(null);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const themes = ['all', 'presence', 'belonging', 'becoming', 'rest', 'trust', 'release'];

  const getThemeColor = (theme: string) => {
    const colors: Record<string, string> = {
      presence: '#A8CBDA',
      belonging: '#D4A574',
      becoming: '#C4B7A6',
      rest: '#B8C4B8',
      trust: '#DBC8B8',
      release: '#C9D4E0',
      all: '#8B7355',
    };
    return colors[theme] || '#D4A574';
  };

  const filteredMessages = activeFilter === 'all' 
    ? savedMessages 
    : savedMessages.filter(m => m.theme === activeFilter);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
    });
  };

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
      <header className="relative z-10 pt-12 pb-4 px-6">
        <div className="text-center">
          <div className="flex justify-center mb-3">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="#D4A574" stroke="#8B7355" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-80">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </div>
          <h1 
            className="text-2xl font-light tracking-wide text-[#8B7355] mb-2"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Your Collection
          </h1>
          <p 
            className="text-sm text-[#A0826D]/70 mb-1"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            {savedMessages.length} {savedMessages.length === 1 ? 'message' : 'messages'} that resonated
          </p>
          <p 
            className="text-xs text-[#D4A574]/70 italic"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Words to re-member when you need them
          </p>
        </div>
      </header>


      {/* Filter Pills */}
      <div className="relative z-10 px-4 mb-6">
        <div className="flex gap-2 overflow-x-auto hide-scrollbar py-2">
          {themes.map((theme) => {
            const count = theme === 'all' 
              ? savedMessages.length 
              : savedMessages.filter(m => m.theme === theme).length;
            const isActive = activeFilter === theme;
            
            return (
              <button
                key={theme}
                onClick={() => setActiveFilter(theme)}
                className={`flex-shrink-0 px-4 py-2 rounded-full border transition-all duration-300 ${
                  isActive 
                    ? 'bg-white/70 border-[#D4A574]/40 shadow-sm' 
                    : 'bg-white/30 border-[#D4A574]/20 hover:bg-white/50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div 
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: getThemeColor(theme) }}
                  />
                  <span 
                    className={`text-xs capitalize ${isActive ? 'text-[#5C4A3D]' : 'text-[#A0826D]'}`}
                    style={{ fontFamily: 'Georgia, serif' }}
                  >
                    {theme}
                  </span>
                  {count > 0 && (
                    <span 
                      className={`text-[10px] ${isActive ? 'text-[#8B7355]' : 'text-[#A0826D]/50'}`}
                      style={{ fontFamily: 'Georgia, serif' }}
                    >
                      {count}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Empty State */}
      {filteredMessages.length === 0 && (
        <div 
          className={`relative z-10 px-8 py-16 text-center transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="flex justify-center mb-6">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#D4A574" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="opacity-30">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </div>
          <h3 
            className="text-lg text-[#8B7355] mb-2"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            {activeFilter === 'all' ? 'No saved messages yet' : `No ${activeFilter} messages saved`}
          </h3>
          <p 
            className="text-sm text-[#A0826D]/60 max-w-xs mx-auto"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            {activeFilter === 'all' 
              ? 'Tap the heart on any message that resonates with you to save it here.'
              : 'Try selecting a different theme or save more messages.'}
          </p>
        </div>
      )}

      {/* Saved Messages List */}
      <div className="relative z-10 px-6 space-y-4">
        {filteredMessages.map((message, index) => {
          const isExpanded = expandedMessage === message.id;
          
          return (
            <div 
              key={message.id}
              className={`transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <div 
                className={`rounded-xl border transition-all duration-300 ${
                  isExpanded
                    ? 'bg-white/70 border-[#D4A574]/40 shadow-md'
                    : 'bg-white/40 border-[#D4A574]/20'
                }`}
              >
                <button
                  onClick={() => setExpandedMessage(isExpanded ? null : message.id)}
                  className="w-full text-left p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <div 
                          className="w-2 h-2 rounded-full flex-shrink-0"
                          style={{ backgroundColor: getThemeColor(message.theme) }}
                        />
                        <span 
                          className="text-xs text-[#A0826D]/60 capitalize"
                          style={{ fontFamily: 'Georgia, serif' }}
                        >
                          {message.theme}
                        </span>
                        <span className="text-[#D4A574]/30">·</span>
                        <span 
                          className="text-xs text-[#A0826D]/50"
                          style={{ fontFamily: 'Georgia, serif' }}
                        >
                          {formatDate(message.savedAt)}
                        </span>
                      </div>
                      <p 
                        className={`text-[#5C4A3D] leading-relaxed ${isExpanded ? '' : 'line-clamp-2'}`}
                        style={{ fontFamily: 'Georgia, serif' }}
                      >
                        "{message.message}"
                      </p>
                    </div>
                    
                    {/* Heart button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onUnsave(message.id);
                      }}
                      className="flex-shrink-0 p-2 -mr-2 -mt-1 text-[#D4A574] hover:text-[#C49464] transition-colors group"
                      title="Remove from saved"
                    >
                      <svg 
                        width="20" 
                        height="20" 
                        viewBox="0 0 24 24" 
                        fill="currentColor" 
                        stroke="currentColor" 
                        strokeWidth="1.5" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                        className="group-hover:scale-110 transition-transform"
                      >
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                      </svg>
                    </button>
                  </div>
                </button>

                {/* Expanded Actions */}
                {isExpanded && (
                  <div className="px-5 pb-5 pt-0">
                    <div className="h-px bg-gradient-to-r from-transparent via-[#D4A574]/20 to-transparent mb-4" />
                    <div className="flex items-center justify-between">
                      <span 
                        className="text-xs text-[#A0826D]/50"
                        style={{ fontFamily: 'Georgia, serif' }}
                      >
                        Message #{message.id}
                      </span>
                      <button
                        onClick={() => onUnsave(message.id)}
                        className="text-xs text-[#A0826D]/60 hover:text-[#8B7355] transition-colors"
                        style={{ fontFamily: 'Georgia, serif' }}
                      >
                        Remove from saved
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom decoration */}
      {filteredMessages.length > 0 && (
        <div 
          className={`relative z-10 flex justify-center mt-10 transition-all duration-700 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <svg width="60" height="30" viewBox="0 0 60 30" className="text-[#D4A574]/20">
            <path d="M0 15 Q15 5 30 15 T60 15" fill="none" stroke="currentColor" strokeWidth="1"/>
            <circle cx="30" cy="15" r="2" fill="currentColor"/>
          </svg>
        </div>
      )}
    </div>
  );
};

export default SavedView;
