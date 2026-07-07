import React from 'react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';

interface StandardLayoutProps {
  banner: {
    title: string;
    description?: string;
    icon?: React.ReactNode;
    breadcrumb?: string[];
  };
  tabs?: {
    id: string;
    label: string;
    icon?: React.ReactNode;
  }[];
  activeTabId?: string;
  onTabChange?: (id: string) => void;
  stats?: React.ReactNode;
  toolbar?: React.ReactNode;
  children: React.ReactNode;
}

export const StandardLayout: React.FC<StandardLayoutProps> = ({
  banner,
  tabs,
  activeTabId,
  onTabChange,
  stats,
  toolbar,
  children
}) => {
  const { cardOpacity, playTactileSound } = useApp();

  const handleTabClick = (id: string) => {
    playTactileSound();
    onTabChange?.(id);
  };

  return (
    <div className="flex flex-col h-full w-full overflow-hidden">
      {/* LEVEL 1: Strategic Banner */}
      <div className="relative h-48 flex-shrink-0 bg-gradient-to-br from-indigo-900/60 via-purple-900/60 to-slate-900/60 p-8 flex items-end justify-between border-b border-white/10">
        <div className="flex items-center gap-6">
          {banner.icon && (
            <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl">
              {banner.icon}
            </div>
          )}
          <div className="flex flex-col gap-1">
            {banner.breadcrumb && (
              <div className="flex items-center gap-2 text-xs font-mono text-indigo-300/80 mb-2 uppercase tracking-widest">
                {banner.breadcrumb.map((b, i) => (
                  <React.Fragment key={i}>
                    <span>{b}</span>
                    {i < banner.breadcrumb.length - 1 && <span>/</span>}
                  </React.Fragment>
                ))}
              </div>
            )}
            <h1 className="font-display text-5xl text-white tracking-tighter uppercase italic drop-shadow-2xl">
              {banner.title}
            </h1>
            {banner.description && (
              <p className="text-indigo-100/60 font-sans max-w-xl line-clamp-2">
                {banner.description}
              </p>
            )}
          </div>
        </div>
        
        {/* Slot for Right Side Actions if needed */}
        <div className="flex items-center gap-3">
           {/* Add buttons or actions here if passed */}
        </div>
      </div>

      {/* LEVEL 2: Sub-nav Tabs */}
      {tabs && tabs.length > 0 && (
        <div className="bg-white/5 backdrop-blur-sm border-b border-white/5 px-8 py-1 flex items-center gap-2 overflow-x-auto scrollbar-hide shrink-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`
                px-6 py-4 flex items-center gap-2 border-b-2 transition-all duration-300 whitespace-nowrap
                ${activeTabId === tab.id 
                  ? 'border-indigo-500 text-white bg-white/5 font-semibold' 
                  : 'border-transparent text-white/40 hover:text-white/70 hover:bg-white/2 hover:border-white/10'}
              `}
            >
              {tab.icon && <span className="opacity-70">{tab.icon}</span>}
              <span className="text-sm tracking-wide uppercase">{tab.label}</span>
            </button>
          ))}
        </div>
      )}

      {/* Main Scrollable Content Wrapper */}
      <div className="flex-1 overflow-y-auto p-8 space-y-8 scroll-smooth">
        {/* LEVEL 3: Statistics Dashboard */}
        {stats && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {stats}
          </motion.div>
        )}

        {/* LEVEL 4: Toolbar */}
        {toolbar && (
          <div className="sticky top-0 z-10">
            {toolbar}
          </div>
        )}

        {/* LEVEL 5: Main Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="pb-12"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
};
