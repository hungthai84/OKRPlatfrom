import React from 'react';
import { ChevronRight, ChevronLeft, MoreHorizontal } from 'lucide-react';

type HeaderProps = {
  activeTab: string;
};

const PERFORMANCE_SUBITEMS = [
  'Dashboard',
  'HR Administration',
  'Reviews',
  'Calibration',
  'Goals',
  'Development Plans',
];

export function Header({ activeTab }: HeaderProps) {
  const isPerformance = PERFORMANCE_SUBITEMS.includes(activeTab);

  return (
    <div className="flex items-center justify-between h-14 px-6 bg-white border-b border-gray-200 shrink-0">
      <div className="flex items-center text-sm">
        {isPerformance ? (
          <>
            <span className="text-gray-500">Performance</span>
            <ChevronRight size={14} className="mx-2 text-gray-400 animate-fade-in" />
            <span className="text-blue-600 font-medium">{activeTab}</span>
          </>
        ) : (
          <span className="text-blue-600 font-medium">{activeTab}</span>
        )}

        {/* Calendar picker - keep this beautiful UI element */}
        <div className="flex items-center ml-6 border border-gray-200 rounded-md px-2 py-1 bg-gray-50">
          <div className="flex items-center space-x-1">
            <button className="p-0.5 text-gray-400 hover:text-gray-600">
              <ChevronLeft size={14} />
            </button>
            <span className="text-xs text-gray-600 font-medium px-1">Q3-2026</span>
            <button className="p-0.5 text-gray-400 hover:text-gray-600">
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
      
      <div>
        <button className="p-1.5 text-gray-400 hover:bg-gray-100 rounded transition-colors" title="Options">
          <MoreHorizontal size={20} />
        </button>
      </div>
    </div>
  );
}
