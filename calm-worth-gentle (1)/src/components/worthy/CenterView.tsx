import React, { useState, useEffect } from 'react';
import { returnToCenterPractices, voiceArtist, guidedMeditations } from '@/data/worthyMessages';

import AudioPlayer from './AudioPlayer';


const CenterView: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activePractice, setActivePractice] = useState<number | null>(null);
  const [timerActive, setTimerActive] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [showAudioOption, setShowAudioOption] = useState(false);
  const [selectedMeditation, setSelectedMeditation] = useState<number | null>(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);


  // Direct image URL - crow silhouette at golden hour provided by user
  const crowImageUrl = '/images/crow-art.png';



  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timerActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            setTimerActive(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive, timeRemaining]);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'earth':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <line x1="2" y1="12" x2="22" y2="12"/>
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
          </svg>
        );
      case 'wind':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"/>
          </svg>
        );
      case 'feather':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"/>
            <line x1="16" y1="8" x2="2" y2="22"/>
            <line x1="17.5" y1="15" x2="9" y2="15"/>
          </svg>
        );
      case 'anchor':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="5" r="3"/>
            <line x1="12" y1="22" x2="12" y2="8"/>
            <path d="M5 12H2a10 10 0 0 0 20 0h-3"/>
          </svg>
        );
      case 'sky':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>
          </svg>
        );
      default:
        return null;
    }
  };

  const startPractice = (index: number) => {
    setActivePractice(index);
    const durationMinutes = parseInt(returnToCenterPractices[index].duration);
    setTimeRemaining(durationMinutes * 60);
    setTimerActive(true);
  };

  const stopPractice = () => {
    setTimerActive(false);
    setActivePractice(null);
    setTimeRemaining(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Get the grounding meditation for audio option
  const groundingMeditation = guidedMeditations.find(m => m.theme === 'grounding');

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
              <circle cx="12" cy="5" r="3"/>
              <line x1="12" y1="22" x2="12" y2="8"/>
              <path d="M5 12H2a10 10 0 0 0 20 0h-3"/>
            </svg>
          </div>
          <h1 
            className="text-2xl font-light tracking-wide text-[#8B7355] mb-2"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Return to Center
          </h1>
          <p 
            className="text-sm text-[#A0826D]/70 max-w-xs mx-auto"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Simple practices to bring you back to yourself
          </p>
        </div>
      </header>

      {/* Guided Audio Player (shown when a meditation is selected) */}
      {selectedMeditation !== null && (
        <div
          className={`relative z-10 mx-6 mb-6 transition-all duration-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <AudioPlayer
            title={guidedMeditations[selectedMeditation].title}
            subtitle={guidedMeditations[selectedMeditation].subtitle}
            duration={guidedMeditations[selectedMeditation].duration}
            durationSeconds={guidedMeditations[selectedMeditation].durationSeconds}
            isPlaying={isAudioPlaying}
            onPlayPause={() => setIsAudioPlaying(!isAudioPlaying)}
            onClose={() => {
              setSelectedMeditation(null);
              setIsAudioPlaying(false);
            }}
            transcript={guidedMeditations[selectedMeditation].transcript}
            voiceArtist={voiceArtist.name}
            audioUrl={guidedMeditations[selectedMeditation].audioUrl}
            textToSpeak={guidedMeditations[selectedMeditation].transcript || guidedMeditations[selectedMeditation].description}
          />
        </div>
      )}


      {/* Active Practice Overlay */}
      {activePractice !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6 overflow-y-auto"
          style={{ backgroundColor: '#F5F1E8' }}
        >

          <div className="max-w-md w-full text-center">
            {/* Timer Circle */}
            <div className="relative w-48 h-48 mx-auto mb-8">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  fill="none"
                  stroke="#D4A574"
                  strokeWidth="2"
                  opacity="0.2"
                />
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  fill="none"
                  stroke="#A8CBDA"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray={553}
                  strokeDashoffset={553 * (1 - timeRemaining / (parseInt(returnToCenterPractices[activePractice].duration) * 60))}
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span 
                  className="text-4xl font-light text-[#8B7355]"
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  {formatTime(timeRemaining)}
                </span>
                <span 
                  className="text-sm text-[#A0826D]/60 mt-1"
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  remaining
                </span>
              </div>
            </div>

            {/* Practice Title */}
            <h2 
              className="text-2xl font-light text-[#5C4A3D] mb-4"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              {returnToCenterPractices[activePractice].title}
            </h2>

            {/* Instructions */}
            <p 
              className="text-[#5C4A3D]/80 leading-relaxed mb-8"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              {returnToCenterPractices[activePractice].instruction}
            </p>

            {/* Stop Button */}
            <button
              onClick={stopPractice}
              className="px-8 py-3 rounded-full bg-[#D4A574]/20 border border-[#D4A574]/30 text-[#8B7355] hover:bg-[#D4A574]/30 transition-colors"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              {timeRemaining === 0 ? 'Complete' : 'End Practice'}
            </button>

            {timeRemaining === 0 && (
              <p 
                className="mt-6 text-sm text-[#A0826D]/60"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                Well done. You showed up for yourself.
              </p>
            )}
          </div>
        </div>
      )}

      {/* Practice Cards */}
      {selectedMeditation === null && (
        <div className="relative z-10 px-6 space-y-4">
          {returnToCenterPractices.map((practice, index) => (
            <div 
              key={index}
              className={`transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: `${(index + 1) * 100}ms` }}
            >
              <button
                onClick={() => startPractice(index)}
                className="w-full text-left group"
              >
                <div className="rounded-xl bg-white/40 border border-[#D4A574]/20 p-5 hover:bg-white/60 hover:border-[#D4A574]/40 transition-all duration-300 group-hover:shadow-md">
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 text-[#8B7355] group-hover:scale-110 transition-transform duration-300"
                      style={{
                        background: `linear-gradient(135deg, #A8CBDA30 0%, #DBC8B830 100%)`,
                      }}
                    >
                      {getIcon(practice.icon)}
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 
                          className="text-lg text-[#5C4A3D]"
                          style={{ fontFamily: 'Georgia, serif' }}
                        >
                          {practice.title}
                        </h3>
                        <span 
                          className="text-xs text-[#A0826D]/60 bg-[#D4A574]/10 px-2 py-1 rounded-full"
                          style={{ fontFamily: 'Georgia, serif' }}
                        >
                          {practice.duration}
                        </span>
                      </div>
                      <p 
                        className="text-sm text-[#5C4A3D]/70 line-clamp-2"
                        style={{ fontFamily: 'Georgia, serif' }}
                      >
                        {practice.instruction}
                      </p>
                    </div>
                  </div>
                </div>
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Crow Image */}
      <div 
        className={`relative z-10 mt-10 px-6 transition-all duration-700 delay-600 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="max-w-xs mx-auto">
          <div className="relative rounded-2xl overflow-hidden opacity-60">
            {/* Loading placeholder */}
            {!imageLoaded && (
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
              alt="Crow medicine - the crow watches, waits, and returns to center"
              className={`w-full h-auto transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setImageLoaded(true)}
            />


            <div 
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(to top, #F5F1E8 0%, transparent 50%)',
              }}
            />
          </div>
          <p 
            className="text-center mt-2 text-xs text-[#8B7355]/80 italic"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            The crow watches without judgment. Return to center.
          </p>

        </div>
      </div>


      {/* Bottom Message */}
      <div 
        className={`relative z-10 mt-6 px-6 text-center transition-all duration-700 delay-700 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <p 
          className="text-sm text-[#A0826D]/60 max-w-xs mx-auto"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          You can always come back here. This space holds you.
        </p>
      </div>
    </div>
  );
};

export default CenterView;
