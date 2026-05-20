import React, { useState, useEffect } from 'react';
import { getTodaysMessage, WorthyMessage, primaryCrowImage } from '@/data/worthyMessages';


interface TodayViewProps {
  onSaveMessage?: (message: WorthyMessage) => void;
  isMessageSaved?: (messageId: number) => boolean;
  onToggleSaved?: (message: WorthyMessage) => void;
  onNavigateToCrow?: () => void;
}

const TodayView: React.FC<TodayViewProps> = ({ 
  onSaveMessage, 
  isMessageSaved,
  onToggleSaved,
  onNavigateToCrow
}) => {
  const [message, setMessage] = useState<WorthyMessage | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [heartAnimating, setHeartAnimating] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const todaysMessage = getTodaysMessage();
    setMessage(todaysMessage);
    
    // Fade in animation
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const formatDate = () => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    };
    return now.toLocaleDateString('en-US', options);
  };

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

  const handleHeartClick = () => {
    if (!message || !onToggleSaved) return;
    
    setHeartAnimating(true);
    onToggleSaved(message);
    
    setTimeout(() => setHeartAnimating(false), 300);
  };

  if (!message) return null;

  const isSaved = isMessageSaved ? isMessageSaved(message.id) : false;


  // Direct image URL - crow silhouette at golden hour provided by user
  const crowImageUrl = 'https://d64gsuwffb70l.cloudfront.net/6875c375b32d29dcca02e02a_1769196581589_7f70ecf5.png';



  return (
    <div className="min-h-screen flex flex-col">
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
          <h1 
            className="text-3xl font-light tracking-[0.3em] text-[#8B7355] mb-1"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            WORTHY
          </h1>
          <div className="flex items-center justify-center gap-2">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#D4A574]/50" />
            <span 
              className="text-xs tracking-[0.2em] text-[#A0826D]/70"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              365
            </span>
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-[#D4A574]/50" />
          </div>
        </div>
      </header>

      {/* Date */}
      <div className="relative z-10 text-center px-6 mb-6">
        <p 
          className="text-sm text-[#A0826D]/80 tracking-wide"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          {formatDate()}
        </p>
      </div>

      {/* Primary Crow Image */}
      <div 
        className={`relative z-10 px-6 mb-8 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <div className="relative max-w-sm mx-auto">
          {/* Watercolor wash background */}
          <div 
            className="absolute inset-0 rounded-3xl opacity-30"
            style={{
              background: `radial-gradient(ellipse at center, ${getThemeColor(message.theme)} 0%, transparent 70%)`,
              transform: 'scale(1.3)',
            }}
          />
          
          {/* Image container with organic border */}
          <button 
            onClick={onNavigateToCrow}
            className="relative rounded-2xl overflow-hidden shadow-xl block w-full transition-transform duration-300 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#D4A574]/50 focus:ring-offset-2 focus:ring-offset-[#F5F1E8]"
          >
            {/* Inner glow border */}
            <div 
              className="absolute inset-0 border-2 border-[#D4A574]/30 rounded-2xl pointer-events-none z-10"
              style={{
                boxShadow: 'inset 0 0 40px rgba(212, 165, 116, 0.15)',
              }}
            />
            
            {/* Loading placeholder */}
            {!imageLoaded && !imageError && (
              <div className="w-full aspect-square bg-gradient-to-b from-[#D4A574]/10 to-[#A8CBDA]/10 flex items-center justify-center">
                <div className="animate-pulse">
                  <svg width="60" height="40" viewBox="0 0 60 40" className="text-[#8B7355]/20">
                    <path 
                      d="M30 8 C25 8, 20 12, 18 18 C16 22, 14 26, 10 28 L8 28 C6 28, 4 30, 4 32 L10 32 C14 32, 18 30, 22 26 C24 24, 26 22, 28 22 L32 22 C34 22, 36 24, 38 26 C42 30, 46 32, 50 32 L56 32 C56 30, 54 28, 52 28 L50 28 C46 26, 44 22, 42 18 C40 12, 35 8, 30 8 Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              </div>
            )}
            
            <img 
              src={crowImageUrl}
              alt={primaryCrowImage.alt}
              className={`w-full h-auto object-cover transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
            />

            
            {/* Error state */}
            {imageError && (
              <div className="w-full aspect-square bg-gradient-to-b from-[#D4A574]/10 to-[#A8CBDA]/10 flex flex-col items-center justify-center p-6">
                <svg width="80" height="60" viewBox="0 0 60 40" className="text-[#8B7355]/30 mb-4">
                  <path 
                    d="M30 8 C25 8, 20 12, 18 18 C16 22, 14 26, 10 28 L8 28 C6 28, 4 30, 4 32 L10 32 C14 32, 18 30, 22 26 C24 24, 26 22, 28 22 L32 22 C34 22, 36 24, 38 26 C42 30, 46 32, 50 32 L56 32 C56 30, 54 28, 52 28 L50 28 C46 26, 44 22, 42 18 C40 12, 35 8, 30 8 Z"
                    fill="currentColor"
                  />
                  <circle cx="26" cy="14" r="1.5" fill="#F5F1E8" />
                </svg>
                <p 
                  className="text-sm text-[#8B7355]/60 text-center"
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  The crow awaits...
                </p>
              </div>
            )}
            
            {/* Soft vignette */}
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at center, transparent 40%, rgba(245, 241, 232, 0.4) 100%)',
              }}
            />
            
            {/* Subtle hint to tap */}
            {imageLoaded && (
              <div className="absolute bottom-3 right-3 bg-white/85 backdrop-blur-sm px-2.5 py-1 rounded-full shadow-sm border border-[#D4A574]/25">
                <span 
                  className="text-[10px] font-medium text-[#6B5444] tracking-wide"
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  Tap for Crow Medicine
                </span>
              </div>
            )}




          </button>
        </div>
      </div>



      {/* Daily Message */}
      <div 
        className={`relative z-10 flex-1 px-8 pb-36 transition-all duration-1000 delay-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <div className="max-w-md mx-auto text-center">
          {/* Decorative line */}
          <div className="flex items-center justify-center mb-8">
            <svg width="140" height="24" viewBox="0 0 140 24" className="text-[#D4A574]/40">
              <path 
                d="M0 12 Q35 2, 70 12 T140 12" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1"
              />
              <circle cx="70" cy="12" r="2" fill="currentColor" />
            </svg>
          </div>

          {/* Message with Save Button */}
          <div className="relative">
            {/* Heart/Save Button */}
            {onToggleSaved && (
              <button
                onClick={handleHeartClick}
                className={`absolute -top-2 -right-2 p-3 rounded-full transition-all duration-300 ${
                  isSaved 
                    ? 'text-[#D4A574]' 
                    : 'text-[#D4A574]/40 hover:text-[#D4A574]/70'
                } ${heartAnimating ? 'scale-125' : 'scale-100'}`}
                title={isSaved ? 'Remove from saved' : 'Save this message'}
              >
                <svg 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill={isSaved ? 'currentColor' : 'none'} 
                  stroke="currentColor" 
                  strokeWidth="1.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className={`transition-all duration-300 ${heartAnimating ? 'scale-110' : ''}`}
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              </button>
            )}

            {/* Message */}
            <blockquote className="mb-8">
              <p 
                className="text-2xl md:text-3xl leading-relaxed text-[#5C4A3D] font-light"
                style={{ 
                  fontFamily: 'Georgia, serif',
                  textShadow: '0 1px 2px rgba(255,255,255,0.5)',
                  lineHeight: '1.5',
                }}
              >
                "{message.message}"
              </p>
            </blockquote>
          </div>

          {/* Theme tag */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/50 border border-[#D4A574]/20 shadow-sm">
            <div 
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: getThemeColor(message.theme) }}
            />
            <span 
              className="text-xs tracking-[0.2em] uppercase text-[#8B7355]/80"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              {message.theme}
            </span>
          </div>

          {/* Save confirmation */}
          {isSaved && (
            <p 
              className="mt-4 text-xs text-[#D4A574]/70"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              Saved to your collection
            </p>
          )}

          {/* Decorative bottom element - crow silhouette */}
          <div className="mt-10 flex justify-center">
            <svg width="60" height="40" viewBox="0 0 60 40" className="text-[#8B7355]/15">
              {/* Simplified crow silhouette */}
              <path 
                d="M30 8 C25 8, 20 12, 18 18 C16 22, 14 26, 10 28 L8 28 C6 28, 4 30, 4 32 L10 32 C14 32, 18 30, 22 26 C24 24, 26 22, 28 22 L32 22 C34 22, 36 24, 38 26 C42 30, 46 32, 50 32 L56 32 C56 30, 54 28, 52 28 L50 28 C46 26, 44 22, 42 18 C40 12, 35 8, 30 8 Z"
                fill="currentColor"
              />
              {/* Eye */}
              <circle cx="26" cy="14" r="1.5" fill="#F5F1E8" />
            </svg>
          </div>

          {/* Gentle reminder */}
          <p 
            className="mt-6 text-xs text-[#A0826D]/50 tracking-wide"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Re-member. A new message awaits you tomorrow.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TodayView;
