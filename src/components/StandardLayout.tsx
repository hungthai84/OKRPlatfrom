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
    <div className="flex flex-col h-full w-full overflow-hidden bg-slate-50">
      {/* LEVEL 1: Strategic Banner - Changed to professional blue */}
      <div className="relative h-40 flex-shrink-0 bg-white p-8 flex items-center justify-between border-b border-slate-200">
        <div className="flex items-center gap-6">
          {banner.icon && (
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl border border-indigo-100">
              {banner.icon}
            </div>
          )}
          <div className="flex flex-col gap-1">
            {banner.breadcrumb && (
              <div className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-1 uppercase tracking-wider">
                {banner.breadcrumb.map((b, i) => (
                  <React.Fragment key={i}>
                    <span>{b}</span>
                    {i < banner.breadcrumb.length - 1 && <span>/</span>}
                  </React.Fragment>
                ))}
              </div>
            )}
            <h1 className="font-display text-3xl font-bold text-slate-800 tracking-tight">
              {banner.title}
            </h1>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
           {/* Add buttons or actions here if passed */}
        </div>
      </div>

      {/* LEVEL 2: Sub-nav Tabs - Refined styling */}
      {tabs && tabs.length > 0 && (
        <div className="bg-white border-b border-slate-200 px-8 py-1 flex items-center gap-2 overflow-x-auto scrollbar-hide shrink-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`
                px-4 py-3 flex items-center gap-2 border-b-2 transition-all duration-300 whitespace-nowrap font-medium text-sm
                ${activeTabId === tab.id 
                  ? 'border-indigo-600 text-indigo-600' 
                  : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'}
              `}
            >
              {tab.icon && <span className="opacity-70">{tab.icon}</span>}
              <span className="tracking-wide uppercase text-xs">{tab.label}</span>
            </button>
          ))}
        </div>
      )}

      {/* Main Scrollable Content Wrapper */}
      <div className="flex-1 overflow-y-auto p-8 space-y-6 scroll-smooth">
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
          <div className="sticky top-0 z-10 bg-slate-50 py-2">
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
