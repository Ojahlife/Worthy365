import React, { useState, useEffect } from 'react';
import TabNavigation from './worthy/TabNavigation';
import TodayView from './worthy/TodayView';
import WeekView from './worthy/WeekView';
import YearView from './worthy/YearView';
import CenterView from './worthy/CenterView';
import ArchiveView from './worthy/ArchiveView';
import SettingsModal from './worthy/SettingsModal';
import OnboardingScreen from './worthy/OnboardingScreen';
import SavedView from './worthy/SavedView';
import ListenView from './worthy/ListenView';
import CrowMedicineView from './worthy/CrowMedicineView';
import DoubtingView from './worthy/DoubtingView';
import useSavedMessages from '@/hooks/useSavedMessages';

const AppLayout: React.FC = () => {
  const [activeTab, setActiveTab] = useState('today');
  const [showArchive, setShowArchive] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showCrowMedicine, setShowCrowMedicine] = useState(false);

  const {
    savedMessages,
    toggleSaved,
    unsaveMessage,
    isMessageSaved,
  } = useSavedMessages();

  useEffect(() => {
    // Check if user has completed onboarding
    const hasOnboarded = localStorage.getItem('worthy365_onboarded');
    if (!hasOnboarded) {
      setShowOnboarding(true);
    }
  }, []);

  const handleNavigateToCrow = () => {
    setActiveTab('crow');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'today':
        return (
          <TodayView 
            onToggleSaved={toggleSaved}
            isMessageSaved={isMessageSaved}
            onNavigateToCrow={handleNavigateToCrow}
          />
        );
      case 'week':
        return <WeekView />;
      case 'year':
        return <YearView />;
      case 'crow':
        return <CrowMedicineView />;
      case 'listen':
        return <ListenView />;
      case 'saved':
        return (
          <SavedView 
            savedMessages={savedMessages}
            onUnsave={unsaveMessage}
            isMessageSaved={isMessageSaved}
          />
        );
      case 'center':
        return <CenterView />;
      case 'doubting':
        return <DoubtingView />;
      default:
        return (
          <TodayView 
            onToggleSaved={toggleSaved}
            isMessageSaved={isMessageSaved}
            onNavigateToCrow={handleNavigateToCrow}
          />
        );
    }
  };

  if (showOnboarding) {
    return <OnboardingScreen onComplete={() => setShowOnboarding(false)} />;
  }

  return (
    <div 
      className="min-h-screen relative overflow-x-hidden"
      style={{
        backgroundColor: '#F5F1E8',
        backgroundImage: `
          radial-gradient(ellipse at 20% 20%, rgba(168, 203, 218, 0.15) 0%, transparent 50%),
          radial-gradient(ellipse at 80% 80%, rgba(212, 165, 116, 0.1) 0%, transparent 50%),
          radial-gradient(ellipse at 50% 50%, rgba(200, 190, 175, 0.05) 0%, transparent 70%)
        `,
      }}
    >
      {/* Watercolor wash effect at top */}
      <div 
        className="fixed top-0 left-0 right-0 h-64 pointer-events-none z-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(168, 203, 218, 0.2) 0%, transparent 100%)',
        }}
      />

      {/* Top action buttons */}
      <div className="fixed top-4 right-4 z-40 flex items-center gap-2">
        {activeTab === 'today' && (
          <button
            onClick={() => setShowArchive(true)}
            className="p-2.5 bg-white/50 backdrop-blur-sm rounded-full border border-[#D4A574]/20 text-[#8B7355] hover:bg-white/70 transition-all duration-300 shadow-sm"
            title="Past messages"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
          </button>
        )}
        <button
          onClick={() => setShowSettings(true)}
          className="p-2.5 bg-white/50 backdrop-blur-sm rounded-full border border-[#D4A574]/20 text-[#8B7355] hover:bg-white/70 transition-all duration-300 shadow-sm"
          title="Settings"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3"/>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
          </svg>
        </button>
      </div>

      {/* Main Content */}
      <main className="relative z-10">
        {renderContent()}
      </main>

      {/* Tab Navigation */}
      <TabNavigation 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        savedCount={savedMessages.length}
      />

      {/* Archive View */}
      {showArchive && (
        <ArchiveView 
          onClose={() => setShowArchive(false)}
          onToggleSaved={toggleSaved}
          isMessageSaved={isMessageSaved}
        />
      )}

      {/* Settings Modal */}
      <SettingsModal 
        isOpen={showSettings} 
        onClose={() => setShowSettings(false)} 
      />
    </div>
  );
};

export default AppLayout;
