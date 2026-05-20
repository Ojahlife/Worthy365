import React, { useState, useEffect, useRef } from 'react';


interface AudioPlayerProps {
  title: string;
  subtitle?: string;
  duration: string;
  durationSeconds: number;
  isPlaying: boolean;
  onPlayPause: () => void;
  onClose?: () => void;
  transcript?: string;
  voiceArtist?: string;
  textToSpeak?: string; // The text to convert to speech (TTS fallback)
  audioUrl?: string; // Static audio file URL (e.g., '/audio/meditation-1.mp3')
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({
  title,
  subtitle,
  duration,
  durationSeconds,
  isPlaying,
  onPlayPause,
  onClose,
  transcript,
  voiceArtist = "Richelle",
  textToSpeak,
  audioUrl: staticAudioUrl
}) => {
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [showTranscript, setShowTranscript] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [actualDuration, setActualDuration] = useState(durationSeconds);
  const [audioSource, setAudioSource] = useState<'static' | 'tts' | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Try to load static audio file first, then fall back to TTS
  useEffect(() => {
    if (staticAudioUrl && !audioSrc && !isLoading) {
      loadStaticAudio(staticAudioUrl);
    } else if (!staticAudioUrl && textToSpeak && !audioSrc && !isLoading) {
      // No static file, go straight to TTS
      generateAudio(textToSpeak);
    }
    
    return () => {
      // Only revoke blob URLs (TTS-generated), not static file URLs
      if (audioSrc && audioSource === 'tts') {
        URL.revokeObjectURL(audioSrc);
      }
    };
  }, [staticAudioUrl, textToSpeak]);

  // Handle play/pause state changes
  useEffect(() => {
    if (audioRef.current && audioSrc) {
      if (isPlaying) {
        audioRef.current.play().catch(err => {
          console.error('Error playing audio:', err);
          onPlayPause(); // Reset playing state on error
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, audioSrc]);

  // Load a static audio file from /public/audio/
  // Tries the given URL first, then alternate extensions (.mp3 <-> .m4a)
  const loadStaticAudio = async (url: string) => {
    setIsLoading(true);
    setError(null);
    
    // Build a list of URLs to try: original, then alternate extension
    const urlsToTry = [url];
    if (url.endsWith('.mp3')) {
      urlsToTry.push(url.replace(/\.mp3$/, '.m4a'));
    } else if (url.endsWith('.m4a')) {
      urlsToTry.push(url.replace(/\.m4a$/, '.mp3'));
    } else {
      // No recognized extension — also try with .m4a and .mp3 appended
      urlsToTry.push(url + '.m4a', url + '.mp3');
    }

    for (const tryUrl of urlsToTry) {
      try {
        const response = await fetch(tryUrl, { method: 'HEAD' });
        if (response.ok) {
          // File exists — use it directly
          setAudioSrc(tryUrl);
          setAudioSource('static');
          console.log(`Loaded static audio: ${tryUrl}`);
          setIsLoading(false);
          return;
        }
      } catch (err) {
        // Continue to next URL
        console.log(`Could not load: ${tryUrl}, trying next...`);
      }
    }

    // None of the static files worked — fall back to TTS
    console.log(`No static audio found for ${url}, falling back to TTS`);
    if (textToSpeak) {
      await generateAudio(textToSpeak);
    } else {
      setError('Audio file not found');
    }
    setIsLoading(false);
  };


  // Generate audio via TTS (fallback)
  const generateAudio = async (text: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Use direct fetch for binary audio response (more reliable than supabase.functions.invoke for binary data)
      const supabaseUrl = 'https://jyupwjwcvjvprimilrkx.databasepad.com';
      const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjkwOWE4MjdjLTRlYTYtNDU5ZS04M2Q1LTllMTQzNTA2YjliZiJ9.eyJwcm9qZWN0SWQiOiJqeXVwd2p3Y3ZqdnByaW1pbHJreCIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzY3MTI4MTcxLCJleHAiOjIwODI0ODgxNzEsImlzcyI6ImZhbW91cy5kYXRhYmFzZXBhZCIsImF1ZCI6ImZhbW91cy5jbGllbnRzIn0.Q0MhxG1ExvwmZACYnEUF9nt5KlvH9BC9NbR1tTgdapE';
      
      const response = await fetch(`${supabaseUrl}/functions/v1/text-to-speech`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseKey}`,
          'apikey': supabaseKey,
        },
        body: JSON.stringify({ text: text.substring(0, 5000) }), // Truncate to avoid API limits
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error('TTS error response:', response.status, errorData);
        throw new Error(`Failed to generate audio (${response.status})`);
      }

      const contentType = response.headers.get('content-type');
      
      // If the response is JSON, it's an error
      if (contentType?.includes('application/json')) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate audio');
      }

      // Get audio as blob
      const audioBlob = await response.blob();
      const url = URL.createObjectURL(audioBlob);
      setAudioSrc(url);
      setAudioSource('tts');
      
      // Create audio element to get actual duration
      const audio = new Audio(url);
      audio.addEventListener('loadedmetadata', () => {
        if (audio.duration && !isNaN(audio.duration)) {
          setActualDuration(audio.duration);
        }
      });
      
    } catch (err) {
      console.error('Error generating audio:', err);
      setError(err instanceof Error ? err.message : 'Failed to generate audio');
    } finally {
      setIsLoading(false);
    }
  };


  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const total = audioRef.current.duration || actualDuration;
      setCurrentTime(current);
      setProgress((current / total) * 100);
    }
  };

  const handleEnded = () => {
    setCurrentTime(0);
    setProgress(0);
    onPlayPause(); // Stop playing
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current && audioRef.current.duration) {
      setActualDuration(audioRef.current.duration);
    }
  };

  const handleAudioError = () => {
    // If static file fails to load/play, try TTS fallback
    if (audioSource === 'static' && textToSpeak) {
      console.log('Static audio failed to play, falling back to TTS');
      setAudioSrc(null);
      setAudioSource(null);
      generateAudio(textToSpeak);
    } else {
      setError('Unable to play audio');
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current && audioSrc) {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const percentage = clickX / rect.width;
      const newTime = percentage * (audioRef.current.duration || actualDuration);
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleSkipBack = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 15);
    }
  };

  const handleSkipForward = () => {
    if (audioRef.current) {
      const maxTime = audioRef.current.duration || actualDuration;
      audioRef.current.currentTime = Math.min(maxTime, audioRef.current.currentTime + 15);
    }
  };

  const handlePlayPauseClick = () => {
    if (isLoading) return;
    
    // If no audio yet, try to load/generate it
    if (!audioSrc && !isLoading) {
      if (staticAudioUrl) {
        loadStaticAudio(staticAudioUrl);
      } else if (textToSpeak) {
        generateAudio(textToSpeak);
      }
      return;
    }
    
    onPlayPause();
  };

  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-[#D4A574]/20 overflow-hidden shadow-lg">
      {/* Hidden audio element */}
      {audioSrc && (
        <audio
          ref={audioRef}
          src={audioSrc}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleEnded}
          onLoadedMetadata={handleLoadedMetadata}
          onError={handleAudioError}
          preload="metadata"
        />
      )}

      {/* Header */}
      <div className="p-5 pb-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 
              className="text-lg text-[#5C4A3D] mb-1"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              {title}
            </h3>
            {subtitle && (
              <p 
                className="text-sm text-[#A0826D]/70"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                {subtitle}
              </p>
            )}
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="p-2 -mr-2 -mt-1 text-[#8B7355]/60 hover:text-[#8B7355] transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          )}
        </div>

        {/* Voice attribution + audio source indicator */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-6 h-6 rounded-full bg-[#A8CBDA]/30 flex items-center justify-center">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#8B7355" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
              <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
              <line x1="12" y1="19" x2="12" y2="23"/>
              <line x1="8" y1="23" x2="16" y2="23"/>
            </svg>
          </div>
          <span 
            className="text-xs text-[#A0826D]/60"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Voice by {voiceArtist}
          </span>
          {audioSource === 'static' && (
            <span className="text-[10px] text-[#A8CBDA]/60 bg-[#A8CBDA]/10 px-1.5 py-0.5 rounded-full">
              HD
            </span>
          )}
        </div>

        {/* Loading state */}
        {isLoading && (
          <div className="flex items-center justify-center gap-3 h-16 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#A8CBDA] animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-2 h-2 rounded-full bg-[#A8CBDA] animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 rounded-full bg-[#A8CBDA] animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
            <span className="text-sm text-[#8B7355]/70" style={{ fontFamily: 'Georgia, serif' }}>
              Preparing audio...
            </span>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="flex items-center justify-center gap-2 h-16 mb-4 px-4">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <span className="text-sm text-[#8B7355]/70" style={{ fontFamily: 'Georgia, serif' }}>
              {error}
            </span>
            <button
              onClick={() => {
                if (staticAudioUrl) {
                  loadStaticAudio(staticAudioUrl);
                } else if (textToSpeak) {
                  generateAudio(textToSpeak);
                }
              }}
              className="text-xs text-[#A8CBDA] underline hover:text-[#8B7355] transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {/* Waveform visualization */}
        {!isLoading && !error && (
          <div className="flex items-center justify-center gap-1 h-16 mb-4">
            {Array.from({ length: 40 }).map((_, i) => {
              const height = Math.sin((i / 40) * Math.PI * 3 + (isPlaying ? currentTime * 0.5 : 0)) * 0.5 + 0.5;
              const isActive = (i / 40) * 100 <= progress;
              return (
                <div
                  key={i}
                  className={`w-1 rounded-full transition-all duration-150 ${
                    isActive ? 'bg-[#A8CBDA]' : 'bg-[#D4A574]/20'
                  }`}
                  style={{
                    height: `${20 + height * 40}px`,
                    opacity: isActive ? 1 : 0.5,
                  }}
                />
              );
            })}
          </div>
        )}

        {/* Progress bar */}
        <div 
          className="h-1.5 bg-[#D4A574]/15 rounded-full cursor-pointer mb-3"
          onClick={handleProgressClick}
        >
          <div 
            className="h-full bg-gradient-to-r from-[#A8CBDA] to-[#D4A574] rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Time display */}
        <div className="flex justify-between text-xs text-[#A0826D]/60" style={{ fontFamily: 'Georgia, serif' }}>
          <span>{formatTime(currentTime)}</span>
          <span>{audioSrc ? formatTime(actualDuration) : duration}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="px-5 pb-5">
        <div className="flex items-center justify-center gap-6">
          {/* Rewind 15s */}
          <button
            onClick={handleSkipBack}
            disabled={!audioSrc || isLoading}
            className="p-2 text-[#8B7355]/60 hover:text-[#8B7355] transition-colors disabled:opacity-30"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 4v6h6"/>
              <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/>
              <text x="12" y="14" fontSize="6" fill="currentColor" textAnchor="middle" style={{ fontFamily: 'sans-serif' }}>15</text>
            </svg>
          </button>

          {/* Play/Pause */}
          <button
            onClick={handlePlayPauseClick}
            disabled={isLoading}
            className="w-16 h-16 rounded-full bg-gradient-to-br from-[#A8CBDA] to-[#D4A574]/60 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : isPlaying ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="2">
                <rect x="6" y="4" width="4" height="16" rx="1"/>
                <rect x="14" y="4" width="4" height="16" rx="1"/>
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="2" className="ml-1">
                <polygon points="5 3 19 12 5 21 5 3"/>
              </svg>
            )}
          </button>

          {/* Forward 15s */}
          <button
            onClick={handleSkipForward}
            disabled={!audioSrc || isLoading}
            className="p-2 text-[#8B7355]/60 hover:text-[#8B7355] transition-colors disabled:opacity-30"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M23 4v6h-6"/>
              <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
              <text x="12" y="14" fontSize="6" fill="currentColor" textAnchor="middle" style={{ fontFamily: 'sans-serif' }}>15</text>
            </svg>
          </button>
        </div>
      </div>

      {/* Transcript toggle */}
      {transcript && (
        <div className="border-t border-[#D4A574]/15">
          <button
            onClick={() => setShowTranscript(!showTranscript)}
            className="w-full px-5 py-3 flex items-center justify-between text-sm text-[#8B7355]/70 hover:text-[#8B7355] transition-colors"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            <span>Read transcript</span>
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className={`transition-transform duration-300 ${showTranscript ? 'rotate-180' : ''}`}
            >
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </button>
          
          {showTranscript && (
            <div className="px-5 pb-5">
              <div className="p-4 bg-[#F5F1E8]/80 rounded-xl max-h-64 overflow-y-auto">
                <p 
                  className="text-sm text-[#5C4A3D]/80 leading-relaxed whitespace-pre-line"
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  {transcript}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AudioPlayer;
