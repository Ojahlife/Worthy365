import React, { useState, useEffect } from 'react';
import { crowMedicine } from '@/data/worthyMessages';


interface CrowMedicineViewProps {
  onBack?: () => void;
}

const CrowMedicineView: React.FC<CrowMedicineViewProps> = ({ onBack }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [expandedTeaching, setExpandedTeaching] = useState<number | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);


  // Direct image URL - crow silhouette at golden hour provided by user
  const crowImageUrl = '/images/crow-art.png';



  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const toggleTeaching = (index: number) => {
    setExpandedTeaching(expandedTeaching === index ? null : index);
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

      {/* Header with back button */}
      <header className="relative z-10 pt-12 pb-6 px-6">
        {onBack && (
          <button
            onClick={onBack}
            className="absolute left-4 top-12 p-2 text-[#8B7355]/70 hover:text-[#8B7355] transition-colors"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </button>
        )}
        
        <div className="text-center">
          {/* Crow icon */}
          <div className="mb-4 flex justify-center">
            <svg width="40" height="40" viewBox="0 0 60 40" className="text-[#8B7355]/60">
              <path 
                d="M30 8 C25 8, 20 12, 18 18 C16 22, 14 26, 10 28 L8 28 C6 28, 4 30, 4 32 L10 32 C14 32, 18 30, 22 26 C24 24, 26 22, 28 22 L32 22 C34 22, 36 24, 38 26 C42 30, 46 32, 50 32 L56 32 C56 30, 54 28, 52 28 L50 28 C46 26, 44 22, 42 18 C40 12, 35 8, 30 8 Z"
                fill="currentColor"
              />
              <circle cx="26" cy="14" r="1.5" fill="#F5F1E8" />
            </svg>
          </div>
          
          <h1 
            className="text-2xl font-light tracking-[0.2em] text-[#8B7355] mb-2"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            {crowMedicine.title}
          </h1>
          <p 
            className="text-sm text-[#A0826D]/70 italic"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            {crowMedicine.subtitle}
          </p>
        </div>
      </header>

      {/* Main Image */}
      <div 
        className={`relative z-10 px-6 mb-8 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <div className="relative max-w-md mx-auto">
          {/* Watercolor wash background */}
          <div 
            className="absolute inset-0 rounded-3xl opacity-20"
            style={{
              background: 'radial-gradient(ellipse at center, #D4A574 0%, transparent 70%)',
              transform: 'scale(1.3)',
            }}
          />
          
          <div className="relative rounded-2xl overflow-hidden shadow-xl">
            <div 
              className="absolute inset-0 border-2 border-[#D4A574]/30 rounded-2xl pointer-events-none z-10"
              style={{
                boxShadow: 'inset 0 0 40px rgba(212, 165, 116, 0.15)',
              }}
            />
            
            {/* Loading placeholder */}
            {!imageLoaded && (
              <div className="w-full aspect-square bg-gradient-to-b from-[#D4A574]/10 to-[#A8CBDA]/10 flex items-center justify-center">
                <div className="animate-pulse">
                  <svg width="80" height="60" viewBox="0 0 60 40" className="text-[#8B7355]/20">
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
              alt="Crow rising with spread wings toward the sun - wisdom, transition, and self-trust"
              className={`w-full h-auto object-cover transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setImageLoaded(true)}
            />

            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at center, transparent 40%, rgba(245, 241, 232, 0.4) 100%)',
              }}
            />
          </div>
        </div>
      </div>

      {/* Introduction */}

      <div 
        className={`relative z-10 px-6 mb-10 transition-all duration-1000 delay-200 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <div className="max-w-md mx-auto">
          <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-6 border border-[#D4A574]/15 shadow-sm">
            {crowMedicine.introduction.split('\n\n').map((paragraph, index) => (
              <p 
                key={index}
                className="text-[#5C4A3D]/90 leading-relaxed mb-4 last:mb-0"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative divider */}
      <div className="flex items-center justify-center mb-10 px-6">
        <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#D4A574]/30" />
        <svg width="24" height="24" viewBox="0 0 24 24" className="mx-4 text-[#D4A574]/40">
          <path 
            d="M12 4 L14 8 L18 8 L15 11 L16 15 L12 13 L8 15 L9 11 L6 8 L10 8 Z" 
            fill="currentColor"
          />
        </svg>
        <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#D4A574]/30" />
      </div>

      {/* Teachings Section */}
      <div 
        className={`relative z-10 px-6 mb-10 transition-all duration-1000 delay-400 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <div className="max-w-md mx-auto">
          <h2 
            className="text-center text-lg tracking-[0.15em] text-[#8B7355] mb-6"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            THE TEACHINGS
          </h2>
          
          <div className="space-y-3">
            {crowMedicine.teachings.map((teaching, index) => (
              <div 
                key={index}
                className="bg-white/50 backdrop-blur-sm rounded-xl border border-[#D4A574]/15 overflow-hidden shadow-sm transition-all duration-300"
              >
                <button
                  onClick={() => toggleTeaching(index)}
                  className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-white/30 transition-colors"
                >
                  <span 
                    className="text-[#5C4A3D] font-medium"
                    style={{ fontFamily: 'Georgia, serif' }}
                  >
                    {teaching.title}
                  </span>
                  <svg 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="#A0826D" 
                    strokeWidth="1.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className={`transition-transform duration-300 ${expandedTeaching === index ? 'rotate-180' : ''}`}
                  >
                    <path d="M6 9l6 6 6-6"/>
                  </svg>
                </button>
                
                {expandedTeaching === index && (
                  <div className="px-5 pb-5 pt-0 animate-fade-in">
                    <p 
                      className="text-[#5C4A3D]/80 leading-relaxed mb-4 text-sm"
                      style={{ fontFamily: 'Georgia, serif' }}
                    >
                      {teaching.description}
                    </p>
                    
                    {/* Reflection prompt */}
                    <div className="bg-[#A8CBDA]/15 rounded-lg p-4 border border-[#A8CBDA]/20">
                      <p 
                        className="text-xs text-[#8B7355]/60 uppercase tracking-wider mb-2"
                        style={{ fontFamily: 'Georgia, serif' }}
                      >
                        Reflection
                      </p>
                      <p 
                        className="text-[#5C4A3D]/70 italic text-sm"
                        style={{ fontFamily: 'Georgia, serif' }}
                      >
                        {teaching.reflection}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Invocation */}
      <div className="relative z-10 px-6 mb-10">
        <div className="max-w-md mx-auto">
          <div 
            className="bg-gradient-to-b from-[#8B7355]/5 to-[#D4A574]/10 rounded-2xl p-8 border border-[#D4A574]/20 text-center"
          >
            <h3 
              className="text-sm tracking-[0.2em] text-[#8B7355]/70 uppercase mb-6"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              An Invocation
            </h3>
            
            <div className="space-y-2">
              {crowMedicine.invocation.split('\n').map((line, index) => (
                <p 
                  key={index}
                  className={`text-[#5C4A3D] leading-relaxed ${line === '' ? 'h-4' : ''}`}
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  {line}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Closing Message */}
      <div className="relative z-10 px-6 mb-8">
        <div className="max-w-md mx-auto text-center">
          <div className="flex items-center justify-center mb-6">
            <svg width="100" height="20" viewBox="0 0 100 20" className="text-[#D4A574]/30">
              <path 
                d="M0 10 Q25 0, 50 10 T100 10" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1"
              />
            </svg>
          </div>
          
          <p 
            className="text-[#5C4A3D]/80 leading-relaxed italic"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            {crowMedicine.closingMessage}
          </p>
          
          {/* Final crow silhouette */}
          <div className="mt-8 flex justify-center">
            <svg width="80" height="50" viewBox="0 0 80 50" className="text-[#8B7355]/10">
              <path 
                d="M40 10 C33 10, 26 15, 23 23 C20 29, 17 35, 12 38 L8 38 C5 38, 2 41, 2 44 L12 44 C18 44, 24 41, 30 35 C33 32, 36 29, 38 29 L42 29 C44 29, 47 32, 50 35 C56 41, 62 44, 68 44 L78 44 C78 41, 75 38, 72 38 L68 38 C63 35, 60 29, 57 23 C54 15, 47 10, 40 10 Z"
                fill="currentColor"
              />
              <circle cx="34" cy="18" r="2" fill="#F5F1E8" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrowMedicineView;
