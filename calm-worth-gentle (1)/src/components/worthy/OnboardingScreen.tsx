import React, { useState } from 'react';
import { voiceArtist } from '@/data/worthyMessages';

interface OnboardingScreenProps {
  onComplete: () => void;
}

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);


  // Direct image URL - crow silhouette at golden hour provided by user
  const crowImageUrl = '/images/crow-art.png';




  const steps = [
    {
      title: "Welcome to Worthy 365",
      subtitle: "Re-member. Re-call. Your worth.",
      message: "This is a space to remember your relationship to worthiness—not because it was ever lost, but because we sometimes forget what has always been true. Worthiness is not something you earn, achieve, or recover. It is who you are. At times, we simply lose our way, distracted by fear, doubt, or old stories. This space is an invitation to return—to remember, to re-root, and to stand once again in the knowing that you have been worthy all along.",
      attribution: "— Richelle",
    },
    {
      title: "A Daily Practice",
      subtitle: "Not productivity. Presence.",
      message: "Each day, a gentle message awaits you. Not to fix you—you don't need fixing. But to remind you of what you already know, deep down.",
    },
    {
      title: "Crow Medicine",
      subtitle: "Wisdom of the dark-winged messenger",
      message: "The crow is your companion here—a symbol of wisdom, transition, and self-trust. It doesn't question its place in the sky. Neither should you.",
    },
    {
      title: "Listen & Return",
      subtitle: "Guided by Richelle's voice",
      message: "When you need grounding, guided meditations and spoken affirmations are here. A calm hand on the back. A steady anchor for your nervous system.",
    },
    {
      title: "You Belong Here",
      subtitle: "Exactly as you are",
      message: "Opening Worthy 365 should feel like taking a slow breath. Like stepping into open sky. Like being met exactly where you are.",
    },
  ];


  const handleNext = () => {
    if (isAnimating) return;
    
    if (currentStep < steps.length - 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
        setIsAnimating(false);
      }, 300);
    } else {
      localStorage.setItem('worthy365_onboarded', 'true');
      onComplete();
    }
  };

  const handleSkip = () => {
    localStorage.setItem('worthy365_onboarded', 'true');
    onComplete();
  };

  const currentStepData = steps[currentStep];

  return (
    <div 
      className="min-h-screen flex flex-col relative overflow-hidden"
      style={{
        backgroundColor: '#F5F1E8',
        backgroundImage: `
          radial-gradient(ellipse at 30% 20%, rgba(168, 203, 218, 0.2) 0%, transparent 50%),
          radial-gradient(ellipse at 70% 80%, rgba(212, 165, 116, 0.15) 0%, transparent 50%)
        `,
      }}
    >
      {/* Paper texture overlay */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-20 z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Skip button */}
      <button
        onClick={handleSkip}
        className="absolute top-6 right-6 z-20 text-sm text-[#8B7355]/60 hover:text-[#8B7355] transition-colors"
        style={{ fontFamily: 'Georgia, serif' }}
      >
        Skip
      </button>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 py-12 relative z-10">
        {/* Image */}
        <div 
          className={`w-56 h-56 mb-8 rounded-2xl overflow-hidden shadow-xl transition-all duration-500 ${
            isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
          }`}
        >
          <div className="relative w-full h-full">
            {/* Loading placeholder */}
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gradient-to-b from-[#D4A574]/10 to-[#A8CBDA]/10 flex items-center justify-center">
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
              alt="Crow medicine - wisdom, transition, and self-trust"
              className={`w-full h-full object-cover transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setImageLoaded(true)}
              onError={(e) => {
                console.error('Image failed to load:', crowImageUrl);
                setImageLoaded(true); // Show placeholder styling
              }}
            />

            <div 
              className="absolute inset-0 border-2 border-[#D4A574]/20 rounded-2xl"
              style={{
                boxShadow: 'inset 0 0 30px rgba(212, 165, 116, 0.1)',
              }}
            />
          </div>
        </div>

        {/* Text content */}
        <div 
          className={`text-center max-w-sm transition-all duration-500 ${
            isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
          }`}
        >
          <h1 
            className="text-2xl font-light text-[#5C4A3D] mb-2"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            {currentStepData.title}
          </h1>
          <p 
            className="text-sm text-[#D4A574] tracking-wide mb-6"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            {currentStepData.subtitle}
          </p>
          <p 
            className={`text-base text-[#5C4A3D]/80 leading-relaxed ${currentStep === 0 ? 'text-sm' : ''}`}
            style={{ fontFamily: 'Georgia, serif' }}
          >
            {currentStepData.message}
          </p>
          {/* Attribution for first step quote */}
          {currentStep === 0 && currentStepData.attribution && (
            <p 
              className="mt-4 text-sm text-[#8B7355] italic"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              {currentStepData.attribution}
            </p>
          )}
        </div>


        {/* Voice attribution on listen step */}
        {currentStep === 3 && (
          <div 
            className={`mt-6 flex items-center gap-4 text-xs text-[#A0826D]/60 transition-all duration-500 ${
              isAnimating ? 'opacity-0' : 'opacity-100'
            }`}
            style={{ fontFamily: 'Georgia, serif' }}
          >
            <span>Voice by {voiceArtist.name}</span>
          </div>
        )}


        {/* Crow medicine hint on crow step */}
        {currentStep === 2 && (
          <div 
            className={`mt-6 text-center transition-all duration-500 ${
              isAnimating ? 'opacity-0' : 'opacity-100'
            }`}
          >
            <p 
              className="text-xs text-[#A0826D]/50 italic"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              Tap the crow image anytime to explore its medicine
            </p>
          </div>
        )}
      </div>

      {/* Progress dots */}
      <div className="flex justify-center gap-2 mb-6 relative z-10">
        {steps.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentStep
                ? 'bg-[#8B7355] w-6'
                : index < currentStep
                ? 'bg-[#D4A574]'
                : 'bg-[#D4A574]/30'
            }`}
          />
        ))}
      </div>

      {/* Continue button */}
      <div className="px-8 pb-12 relative z-10">
        <button
          onClick={handleNext}
          className="w-full py-4 rounded-xl bg-[#8B7355] text-[#F5F1E8] font-medium hover:bg-[#7A6548] transition-colors shadow-lg"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          {currentStep === steps.length - 1 ? 'Begin' : 'Continue'}
        </button>
      </div>

      {/* Decorative elements */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(168, 203, 218, 0.1) 0%, transparent 100%)',
        }}
      />
    </div>
  );
};

export default OnboardingScreen;
