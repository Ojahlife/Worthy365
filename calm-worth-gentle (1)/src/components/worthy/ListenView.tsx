import React, { useState, useEffect } from 'react';
import { guidedMeditations, spokenAffirmations, voiceArtist } from '@/data/worthyMessages';

import AudioPlayer from './AudioPlayer';


type TabType = 'meditations' | 'affirmations';

const ListenView: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('meditations');
  const [selectedMeditation, setSelectedMeditation] = useState<number | null>(null);
  const [selectedAffirmation, setSelectedAffirmation] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);


  // Direct image URL - crow silhouette at golden hour provided by user
  const crowImageUrl = 'https://d64gsuwffb70l.cloudfront.net/6875c375b32d29dcca02e02a_1769196581589_7f70ecf5.png';



  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleCloseMeditation = () => {
    setSelectedMeditation(null);
    setIsPlaying(false);
  };

  const handleCloseAffirmation = () => {
    setSelectedAffirmation(null);
    setIsPlaying(false);
  };

  const getThemeIcon = (theme: string) => {
    switch (theme) {
      case 'worth':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <circle cx="12" cy="12" r="4"/>
          </svg>
        );
      case 'doubt':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>
          </svg>
        );
      case 'grounding':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <line x1="2" y1="12" x2="22" y2="12"/>
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
          </svg>
        );
      case 'remembering':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <polyline points="12 6 12 12 16 14"/>
          </svg>
        );
      case 'presence':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="4"/>
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
          </svg>
        );
      default:
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18V5l12-2v13"/>
            <circle cx="6" cy="18" r="3"/>
            <circle cx="18" cy="16" r="3"/>
          </svg>
        );
    }
  };

  // Get the text to speak for meditations (use transcript)
  const getMeditationTextToSpeak = (index: number) => {
    const meditation = guidedMeditations[index];
    return meditation.transcript || meditation.description;
  };

  // Get the text to speak for affirmations
  const getAffirmationTextToSpeak = (index: number) => {
    const affirmation = spokenAffirmations[index];
    return affirmation.text;
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
              <path d="M9 18V5l12-2v13"/>
              <circle cx="6" cy="18" r="3"/>
              <circle cx="18" cy="16" r="3"/>
            </svg>
          </div>
          <h1 
            className="text-2xl font-light tracking-wide text-[#8B7355] mb-2"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Listen
          </h1>
          <p 
            className="text-sm text-[#A0826D]/70 max-w-xs mx-auto"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Guided audio to help you re-member your worth
          </p>
        </div>
      </header>

      {/* Voice Artist Attribution */}
      <div 
        className={`relative z-10 mx-6 mb-6 transition-all duration-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <div className="p-4 bg-[#A8CBDA]/10 rounded-xl border border-[#A8CBDA]/20">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#A8CBDA]/40 to-[#D4A574]/30 flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8B7355" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                <line x1="12" y1="19" x2="12" y2="23"/>
                <line x1="8" y1="23" x2="16" y2="23"/>
              </svg>
            </div>
            <div>
              <p 
                className="text-sm font-medium text-[#5C4A3D]"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                Voice by {voiceArtist.name}
              </p>
              <p 
                className="text-xs text-[#A0826D]/70"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                {voiceArtist.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Switcher */}
      <div 
        className={`relative z-10 mx-6 mb-6 transition-all duration-500 delay-100 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <div className="flex gap-2 p-1 bg-white/40 rounded-xl border border-[#D4A574]/15">
          <button
            onClick={() => setActiveTab('meditations')}
            className={`flex-1 py-2.5 px-4 rounded-lg text-sm transition-all duration-300 ${
              activeTab === 'meditations'
                ? 'bg-white shadow-sm text-[#5C4A3D]'
                : 'text-[#8B7355]/70 hover:text-[#8B7355]'
            }`}
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Meditations
          </button>
          <button
            onClick={() => setActiveTab('affirmations')}
            className={`flex-1 py-2.5 px-4 rounded-lg text-sm transition-all duration-300 ${
              activeTab === 'affirmations'
                ? 'bg-white shadow-sm text-[#5C4A3D]'
                : 'text-[#8B7355]/70 hover:text-[#8B7355]'
            }`}
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Affirmations
          </button>
        </div>
      </div>

      {/* Selected Meditation Player */}
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
            isPlaying={isPlaying}
            onPlayPause={handlePlayPause}
            onClose={handleCloseMeditation}
            transcript={guidedMeditations[selectedMeditation].transcript}
            voiceArtist={voiceArtist.name}
            audioUrl={guidedMeditations[selectedMeditation].audioUrl}
            textToSpeak={getMeditationTextToSpeak(selectedMeditation)}
          />

        </div>
      )}

      {/* Selected Affirmation Player */}
      {selectedAffirmation !== null && activeTab === 'affirmations' && (
        <div 
          className={`relative z-10 mx-6 mb-6 transition-all duration-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <AudioPlayer
            title="Spoken Affirmation"
            subtitle={spokenAffirmations[selectedAffirmation].text}
            duration={spokenAffirmations[selectedAffirmation].duration}
            durationSeconds={spokenAffirmations[selectedAffirmation].durationSeconds}
            isPlaying={isPlaying}
            onPlayPause={handlePlayPause}
            onClose={handleCloseAffirmation}
            voiceArtist={voiceArtist.name}
            audioUrl={spokenAffirmations[selectedAffirmation].audioUrl}
            textToSpeak={getAffirmationTextToSpeak(selectedAffirmation)}
          />

        </div>
      )}

      {/* Content */}
      <div className="relative z-10 px-6">
        {activeTab === 'meditations' && selectedMeditation === null && (
          <div className="space-y-4">
            {guidedMeditations.map((meditation, index) => (
              <div 
                key={meditation.id}
                className={`transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: `${(index + 2) * 100}ms` }}
              >
                <button
                  onClick={() => {
                    setSelectedMeditation(index);
                    setIsPlaying(false);
                  }}
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
                        {getThemeIcon(meditation.theme)}
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 
                            className="text-lg text-[#5C4A3D]"
                            style={{ fontFamily: 'Georgia, serif' }}
                          >
                            {meditation.title}
                          </h3>
                          <span 
                            className="text-xs text-[#A0826D]/60 bg-[#D4A574]/10 px-2 py-1 rounded-full"
                            style={{ fontFamily: 'Georgia, serif' }}
                          >
                            {meditation.duration}
                          </span>
                        </div>
                        <p 
                          className="text-xs text-[#A0826D]/70 mb-2"
                          style={{ fontFamily: 'Georgia, serif' }}
                        >
                          {meditation.subtitle}
                        </p>
                        <p 
                          className="text-sm text-[#5C4A3D]/70 line-clamp-2"
                          style={{ fontFamily: 'Georgia, serif' }}
                        >
                          {meditation.description}
                        </p>
                      </div>

                      {/* Play indicator */}
                      <div className="w-10 h-10 rounded-full bg-[#A8CBDA]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#A8CBDA]/40 transition-colors">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="#8B7355" stroke="#8B7355" strokeWidth="2" className="ml-0.5">
                          <polygon points="5 3 19 12 5 21 5 3"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'affirmations' && selectedAffirmation === null && (
          <div className="space-y-3">
            <p 
              className="text-sm text-[#A0826D]/70 mb-4"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              Short spoken reminders to carry with you
            </p>
            {spokenAffirmations.map((affirmation, index) => (
              <div 
                key={affirmation.id}
                className={`transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: `${(index + 2) * 50}ms` }}
              >
                <button
                  onClick={() => {
                    setSelectedAffirmation(index);
                    setIsPlaying(false);
                  }}
                  className="w-full text-left group"
                >
                  <div className="rounded-xl bg-white/40 border border-[#D4A574]/20 p-4 hover:bg-white/60 hover:border-[#D4A574]/40 transition-all duration-300 group-hover:shadow-sm">
                    <div className="flex items-center gap-3">
                      {/* Play button */}
                      <div className="w-8 h-8 rounded-full bg-[#A8CBDA]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#A8CBDA]/40 transition-colors">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="#8B7355" stroke="#8B7355" strokeWidth="2" className="ml-0.5">
                          <polygon points="5 3 19 12 5 21 5 3"/>
                        </svg>
                      </div>
                      
                      {/* Text */}
                      <p 
                        className="flex-1 text-sm text-[#5C4A3D]/90"
                        style={{ fontFamily: 'Georgia, serif' }}
                      >
                        "{affirmation.text}"
                      </p>

                      {/* Duration */}
                      <span 
                        className="text-xs text-[#A0826D]/50 flex-shrink-0"
                        style={{ fontFamily: 'Georgia, serif' }}
                      >
                        {affirmation.duration}
                      </span>
                    </div>
                  </div>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Crow Image */}
      <div 
        className={`relative z-10 mt-10 px-6 transition-all duration-700 delay-700 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="max-w-xs mx-auto">
          <div className="relative rounded-2xl overflow-hidden opacity-50">
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
              alt="Crow in flight - presence and watchfulness"
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
        </div>
      </div>



      {/* Bottom Message */}
      <div 
        className={`relative z-10 mt-6 px-6 text-center transition-all duration-700 delay-800 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <p 
          className="text-sm text-[#A0826D]/60 max-w-xs mx-auto"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          Let these words land wherever they need to land.
        </p>
      </div>
    </div>
  );
};

export default ListenView;
