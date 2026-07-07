import React, { createContext, useContext, useState, useEffect } from 'react';

interface AppContextType {
  cardOpacity: number;
  sidebarOpacity: number;
  contentOpacity: number;
  background: string;
  setCardOpacity: (val: number) => void;
  setSidebarOpacity: (val: number) => void;
  setContentOpacity: (val: number) => void;
  setBackground: (val: string) => void;
  playTactileSound: () => void;
  // Profile State
  profileName: string;
  setProfileName: (val: string) => void;
  profileAvatar: string;
  setProfileAvatar: (val: string) => void;
  profileRole: string;
  setProfileRole: (val: string) => void;
  profileEmail: string;
  setProfileEmail: (val: string) => void;
  profilePhone: string;
  setProfilePhone: (val: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cardOpacity, setCardOpacity] = useState(85);
  const [sidebarOpacity, setSidebarOpacity] = useState(90);
  const [contentOpacity, setContentOpacity] = useState(25);
  const [background, setBackground] = useState('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop');

  // Profile State
  const [profileName, setProfileName] = useState(() => localStorage.getItem('profile_name') || 'Roberto Canevari');
  const [profileAvatar, setProfileAvatar] = useState(() => localStorage.getItem('profile_avatar') || 'https://i.pravatar.cc/150?u=roberto');
  const [profileRole, setProfileRole] = useState(() => localStorage.getItem('profile_role') || 'Quản trị viên');
  const [profileEmail, setProfileEmail] = useState(() => localStorage.getItem('profile_email') || 'roberto@powerservice.vn');
  const [profilePhone, setProfilePhone] = useState(() => localStorage.getItem('profile_phone') || '0901234567');

  useEffect(() => {
    localStorage.setItem('profile_name', profileName);
    localStorage.setItem('profile_avatar', profileAvatar);
    localStorage.setItem('profile_role', profileRole);
    localStorage.setItem('profile_email', profileEmail);
    localStorage.setItem('profile_phone', profilePhone);
  }, [profileName, profileAvatar, profileRole, profileEmail, profilePhone]);

  // Web Audio API Sound Implementation
  const playTactileSound = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(1200, audioCtx.currentTime); 
      
      gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.04);

      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.04);
    } catch (e) {
      console.error('Audio context error:', e);
    }
  };

  return (
    <AppContext.Provider value={{ 
      cardOpacity, 
      sidebarOpacity, 
      contentOpacity,
      background, 
      setCardOpacity, 
      setSidebarOpacity, 
      setContentOpacity,
      setBackground,
      playTactileSound,
      profileName, setProfileName,
      profileAvatar, setProfileAvatar,
      profileRole, setProfileRole,
      profileEmail, setProfileEmail,
      profilePhone, setProfilePhone
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
