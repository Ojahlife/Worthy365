import React, { useState } from 'react';
import { voiceArtist } from '@/data/worthyMessages';


interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [notificationTime, setNotificationTime] = useState('08:00');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [activeSection, setActiveSection] = useState<'settings' | 'credits' | 'values'>('settings');

  if (!isOpen) return null;

  const handleSave = () => {
    setShowConfirmation(true);
    setTimeout(() => {
      setShowConfirmation(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#5C4A3D]/30 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div 
        className="relative w-full max-w-md mx-4 mb-4 sm:mb-0 bg-[#F5F1E8] rounded-2xl shadow-2xl overflow-hidden animate-fade-in max-h-[85vh] flex flex-col"
        style={{
          boxShadow: '0 25px 50px -12px rgba(92, 74, 61, 0.25)',
        }}
      >
        {/* Paper texture */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Header */}
        <div className="relative p-6 border-b border-[#D4A574]/20 flex-shrink-0">
          <div className="flex items-center justify-between">
            <h2 
              className="text-xl font-light text-[#5C4A3D]"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              {activeSection === 'settings' && 'Settings'}
              {activeSection === 'credits' && 'Credits'}
              {activeSection === 'values' && 'Our Values'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 -mr-2 text-[#8B7355] hover:bg-[#D4A574]/10 rounded-full transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>

          {/* Section tabs */}
          <div className="flex gap-2 mt-4">
            {['settings', 'credits', 'values'].map((section) => (
              <button
                key={section}
                onClick={() => setActiveSection(section as typeof activeSection)}
                className={`px-3 py-1.5 rounded-full text-xs transition-all duration-300 ${
                  activeSection === section
                    ? 'bg-[#D4A574]/20 text-[#5C4A3D]'
                    : 'text-[#8B7355]/60 hover:text-[#8B7355]'
                }`}
                style={{ fontFamily: 'Georgia, serif' }}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Content - Scrollable */}
        <div className="relative flex-1 overflow-y-auto">
          {/* Settings Section */}
          {activeSection === 'settings' && (
            <div className="p-6 space-y-6">
              {/* Daily Reminder */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 
                      className="text-base text-[#5C4A3D] mb-1"
                      style={{ fontFamily: 'Georgia, serif' }}
                    >
                      Daily Reminder
                    </h3>
                    <p 
                      className="text-xs text-[#A0826D]/70"
                      style={{ fontFamily: 'Georgia, serif' }}
                    >
                      A gentle nudge to re-member your worth
                    </p>
                  </div>
                  <button
                    onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                    className={`relative w-12 h-7 rounded-full transition-colors duration-300 ${
                      notificationsEnabled ? 'bg-[#A8CBDA]' : 'bg-[#D4A574]/30'
                    }`}
                  >
                    <div 
                      className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-300 ${
                        notificationsEnabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
                
                {notificationsEnabled && (
                  <div className="pl-4 border-l-2 border-[#D4A574]/20">
                    <label 
                      className="block text-sm text-[#A0826D]/70 mb-2"
                      style={{ fontFamily: 'Georgia, serif' }}
                    >
                      Reminder time
                    </label>
                    <input
                      type="time"
                      value={notificationTime}
                      onChange={(e) => setNotificationTime(e.target.value)}
                      className="px-4 py-2 bg-white/50 border border-[#D4A574]/20 rounded-lg text-[#5C4A3D] focus:outline-none focus:border-[#D4A574]/50 transition-colors"
                      style={{ fontFamily: 'Georgia, serif' }}
                    />
                    <p 
                      className="mt-2 text-xs text-[#A0826D]/50"
                      style={{ fontFamily: 'Georgia, serif' }}
                    >
                      "A message is waiting for you"
                    </p>
                  </div>
                )}
              </div>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-[#D4A574]/30 to-transparent" />

              {/* About */}
              <div>
                <h3 
                  className="text-base text-[#5C4A3D] mb-2"
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  About Worthy 365
                </h3>
                <p 
                  className="text-sm text-[#A0826D]/70 leading-relaxed"
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  A gentle, expansive companion designed to help you re-member your worth. 
                  Not just in moments of doubt, but as a daily practice of re-calling your relationship to worthiness.
                </p>
              </div>

              {/* Crow wisdom */}
              <div className="p-4 bg-[#A8CBDA]/10 rounded-xl border border-[#A8CBDA]/20">
                <p 
                  className="text-sm text-[#5C4A3D]/80 italic text-center"
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  "The crow is a symbol of wisdom, transition, presence, and self-trust."
                </p>
              </div>
            </div>
          )}

          {/* Credits Section */}
          {activeSection === 'credits' && (
            <div className="p-6 space-y-6">
              {/* Voice Artist */}
              <div className="p-5 bg-white/40 rounded-xl border border-[#D4A574]/20">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#A8CBDA]/40 to-[#D4A574]/30 flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8B7355" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
                      <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                      <line x1="12" y1="19" x2="12" y2="23"/>
                      <line x1="8" y1="23" x2="16" y2="23"/>
                    </svg>
                  </div>
                  <div>
                    <h3 
                      className="text-base text-[#5C4A3D]"
                      style={{ fontFamily: 'Georgia, serif' }}
                    >
                      Voice
                    </h3>
                    <p 
                      className="text-lg text-[#8B7355]"
                      style={{ fontFamily: 'Georgia, serif' }}
                    >
                      {voiceArtist.name}
                    </p>
                  </div>
                </div>
                <p 
                  className="text-sm text-[#A0826D]/70 leading-relaxed"
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  {voiceArtist.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {voiceArtist.qualities.map((quality, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 text-xs bg-[#A8CBDA]/15 text-[#5C4A3D]/70 rounded-full"
                      style={{ fontFamily: 'Georgia, serif' }}
                    >
                      {quality}
                    </span>
                  ))}
                </div>
              </div>



              {/* Gratitude */}
              <div className="p-4 bg-[#D4A574]/10 rounded-xl border border-[#D4A574]/20 text-center">
                <p 
                  className="text-sm text-[#5C4A3D]/80 italic"
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  "The voice, visuals, and written content form one ecosystem—<br/>
                  each element medicine, not decoration."
                </p>
              </div>
            </div>
          )}

          {/* Values Section */}
          {activeSection === 'values' && (
            <div className="p-6 space-y-5">
              <p 
                className="text-sm text-[#A0826D]/80 leading-relaxed"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                Worthy 365 is built on these principles:
              </p>

              {[
                {
                  title: "Worthiness, not productivity",
                  description: "This is not about becoming your best self. It's about remembering you are already worthy."
                },
                {
                  title: "Presence, not performance",
                  description: "We don't measure success. We practice presence."
                },
                {
                  title: "Grounded, not hype",
                  description: "No toxic positivity. No hustle language. Just gentle, honest reminders."
                },
                {
                  title: "Trauma-aware",
                  description: "We understand that worthiness can feel complicated. We hold space for that."
                },
                {
                  title: "Ritual, not content",
                  description: "This is not a feed to scroll. It's a practice to return to."
                },
                {
                  title: "Spaciousness",
                  description: "If something feels extra, we remove it. Less is more."
                }
              ].map((value, index) => (
                <div 
                  key={index}
                  className="p-4 bg-white/40 rounded-xl border border-[#D4A574]/15"
                >
                  <h4 
                    className="text-base text-[#5C4A3D] mb-1"
                    style={{ fontFamily: 'Georgia, serif' }}
                  >
                    {value.title}
                  </h4>
                  <p 
                    className="text-sm text-[#A0826D]/70"
                    style={{ fontFamily: 'Georgia, serif' }}
                  >
                    {value.description}
                  </p>
                </div>
              ))}

              {/* Final note */}
              <div className="pt-4 text-center">
                <p 
                  className="text-sm text-[#5C4A3D]/60 italic"
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  "You don't need to earn your worth."
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {activeSection === 'settings' && (
          <div className="relative p-6 border-t border-[#D4A574]/20 flex-shrink-0">
            <button
              onClick={handleSave}
              disabled={showConfirmation}
              className={`w-full py-3 rounded-xl font-medium transition-all duration-300 ${
                showConfirmation
                  ? 'bg-[#B8C4B8] text-white'
                  : 'bg-[#8B7355] text-[#F5F1E8] hover:bg-[#7A6548]'
              }`}
              style={{ fontFamily: 'Georgia, serif' }}
            >
              {showConfirmation ? 'Saved' : 'Save Changes'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsModal;
