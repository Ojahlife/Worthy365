import React from 'react';

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  savedCount?: number;
}

const tabs = [
  { id: 'today', label: 'Today', icon: 'sun' },
  { id: 'week', label: 'Week', icon: 'calendar' },
  { id: 'year', label: 'Year', icon: 'circle' },
  { id: 'crow', label: 'Crow', icon: 'crow' },
  { id: 'listen', label: 'Listen', icon: 'audio' },
  { id: 'center', label: 'Center', icon: 'anchor' },
];

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onTabChange, savedCount = 0 }) => {
  const getIcon = (iconName: string, isActive: boolean) => {
    const color = isActive ? '#8B7355' : '#A0826D';
    
    switch (iconName) {
      case 'sun':
        return (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="4"/>
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
          </svg>
        );
      case 'calendar':
        return (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
            <line x1="16" y1="2" x2="16" y2="6"/>
            <line x1="8" y1="2" x2="8" y2="6"/>
            <line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
        );
      case 'circle':
        return (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 6v6l4 2"/>
          </svg>
        );
      case 'crow':
        // Wings image icon - detailed feather wing illustration
        return (
          <img 
            src="/images/crow-mark.webp" 
            alt="Crow" 
            width="26" 
            height="26" 
            className={`object-contain transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-60'}`}
            style={{ filter: isActive ? 'none' : 'grayscale(20%)' }}
          />
        );






      case 'audio':
        return (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18V5l12-2v13"/>
            <circle cx="6" cy="18" r="3"/>
            <circle cx="18" cy="16" r="3"/>
          </svg>
        );
      case 'heart':
        return (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        );
      case 'heart-filled':
        return (
          <svg width="22" height="22" viewBox="0 0 24 24" fill={isActive ? color : 'none'} stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        );
      case 'anchor':
        return (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="5" r="3"/>
            <line x1="12" y1="22" x2="12" y2="8"/>
            <path d="M5 12H2a10 10 0 0 0 20 0h-3"/>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50">
      {/* Gradient fade */}
      <div 
        className="absolute bottom-full left-0 right-0 h-8 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, #F5F1E8 0%, transparent 100%)',
        }}
      />
      
      <div className="bg-[#F5F1E8]/95 backdrop-blur-md border-t border-[#D4A574]/15 px-1 pt-2 pb-safe">
        <div className="flex justify-around items-center max-w-lg mx-auto">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const showBadge = tab.id === 'saved' && savedCount > 0 && !isActive;
            
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`relative flex flex-col items-center gap-0.5 px-2 py-2 rounded-xl transition-all duration-300 min-w-[48px] ${
                  isActive 
                    ? 'bg-[#D4A574]/10' 
                    : 'hover:bg-[#D4A574]/5 active:bg-[#D4A574]/10'
                }`}
              >
                <div className={`relative transition-transform duration-300 ${isActive ? 'scale-110' : ''}`}>
                  {getIcon(tab.icon, isActive)}
                  {/* Badge for saved count */}
                  {showBadge && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#D4A574] text-white text-[9px] font-medium rounded-full flex items-center justify-center">
                      {savedCount > 9 ? '9+' : savedCount}
                    </span>
                  )}
                </div>
                <span 
                  className={`text-[9px] font-medium tracking-wide transition-colors duration-300 text-center leading-tight ${
                    isActive ? 'text-[#8B7355]' : 'text-[#A0826D]/60'
                  }`}
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default TabNavigation;
