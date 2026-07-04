import React, { useState } from 'react';
import { cn } from '../lib/utils';
import {
  Home,
  Target,
  CheckSquare,
  Calendar,
  LineChart,
  Award,
  ClipboardList,
  Briefcase,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Map,
  Flag,
  Activity,
  FileBarChart,
  User,
} from 'lucide-react';

const MENU_ITEMS = [
  { name: 'Trang chủ', icon: Home },
  { name: 'Bảng điểm cân bằng', icon: LayoutDashboard },
  { name: 'Lộ trình chiến lược', icon: Map },
  { name: 'Mục tiêu & Kết quả (OKRs)', icon: Target },
  { name: 'Mục tiêu phát triển', icon: Flag },
  { name: 'Chỉ số KPI', icon: Activity },
  { name: 'Công việc', icon: CheckSquare },
  { name: 'Cuộc họp', icon: Calendar },
  {
    name: 'Hiệu suất',
    icon: LineChart,
    subItems: [
      { name: 'Bảng điều khiển' },
      { name: 'Quản trị nhân sự' },
      { name: 'Đánh giá' },
      { name: 'Hiệu chuẩn' },
      { name: 'Mục tiêu cá nhân' },
      { name: 'Kế hoạch phát triển' },
    ],
  },
  { name: 'Ghi nhận & Khen thưởng', icon: Award },
  { name: 'Khảo sát ý kiến', icon: ClipboardList },
  { name: 'Danh mục & Dự án', icon: Briefcase },
  { name: 'Ghi chú cá nhân', icon: FileText },
  { name: 'Báo cáo phân tích', icon: FileBarChart },
];

type SidebarProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cardOpacity: number;
};

export function Sidebar({ activeTab, setActiveTab, cardOpacity }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(true); // Default to collapsed
  const [activePopup, setActivePopup] = useState<string | null>(null);

  const handleItemClick = (item: typeof MENU_ITEMS[0]) => {
    if (item.subItems) {
      setActivePopup(activePopup === item.name ? null : item.name);
    } else {
      setActiveTab(item.name);
      setActivePopup(null);
    }
  };

  const isParentActive = (item: typeof MENU_ITEMS[0]) => {
    if (item.subItems) {
      return item.subItems.some((sub) => sub.name === activeTab);
    }
    return item.name === activeTab;
  };

  return (
    <div
      style={{
        backgroundColor: `rgba(255, 255, 255, ${cardOpacity / 100})`,
        backdropFilter: 'blur(8px)',
      }}
      className={cn(
        'flex flex-col text-slate-800 border-r border-slate-200/60 transition-all duration-300 relative h-full select-none shadow-2xl shrink-0 z-30',
        collapsed ? 'w-20' : 'w-64'
      )}
    >
      {/* TOP: Logo & Công ty */}
      <div className="flex items-center h-20 px-4 shrink-0 border-b border-slate-200/60">
        <a 
          href="https://ibb.co/4ZPkSBLg" 
          target="_blank" 
          rel="noreferrer"
          className={cn("flex items-center space-x-3 w-full", collapsed ? "justify-center" : "justify-start pl-2")}
        >
          <img 
            src="https://i.ibb.co/4ZPkSBLg/Logo-Tr-ng-removebg-preview.png" 
            alt="Logo-Tr-ng-removebg-preview" 
            className="w-10 h-10 object-contain hover:scale-105 transition-transform" 
          />
          {!collapsed && (
            <div className="flex flex-col">
              <span className="font-bold text-lg tracking-wider text-slate-800">Power Service</span>
              <span className="text-[10px] text-orange-600 font-bold uppercase tracking-widest -mt-1">PROFIT.CO</span>
            </div>
          )}
        </a>
      </div>

      {/* Toggle collapse button - round arrow in the middle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3.5 top-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full p-1.5 border border-white/20 text-white hover:scale-110 shadow-lg cursor-pointer z-40 transition-all"
        title={collapsed ? "Mở rộng" : "Thu gọn"}
      >
        {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      {/* CENTER: Menu Items (Vertically and Horizontally Centered) */}
      <div className="flex-1 flex flex-col justify-center py-6 overflow-y-auto scrollbar-none">
        <ul className="space-y-2 w-full px-2">
          {MENU_ITEMS.map((item, index) => {
            const active = isParentActive(item);
            const Icon = item.icon;

            return (
              <li key={index} className="relative group/item flex justify-center w-full">
                <button
                  onClick={() => handleItemClick(item)}
                  className={cn(
                    'flex items-center rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer w-full py-2.5',
                    collapsed ? 'justify-center px-0 w-12 h-12' : 'px-4 justify-start',
                    active 
                      ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600' 
                      : 'text-slate-600 hover:bg-slate-900/5 hover:text-slate-900'
                  )}
                  title={collapsed ? item.name : undefined}
                >
                  <Icon size={20} className={cn("shrink-0", active ? "text-blue-600 scale-110" : "text-slate-400 group-hover/item:text-slate-600")} />
                  {!collapsed && (
                    <span className="ml-3 truncate text-sm font-bold">{item.name}</span>
                  )}
                  
                  {/* Small badge for Trang chủ or OKRs if needed */}
                  {!collapsed && item.name === 'Trang chủ' && (
                    <span className="ml-auto bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full animate-pulse">
                      Mới
                    </span>
                  )}
                </button>

                {/* Sub-menu Popup - Highest Z-Index layer, centered relative to the parent icon */}
                {activePopup === item.name && item.subItems && (
                  <div
                    className="absolute left-[calc(100%+12px)] top-1/2 -translate-y-1/2 z-50 bg-white border border-slate-200/80 rounded-xl shadow-2xl p-3 min-w-[220px] text-left animate-in fade-in slide-in-from-left-2 duration-150"
                    onMouseLeave={() => setActivePopup(null)}
                  >
                    <div className="text-xs font-bold text-orange-600 mb-2 uppercase tracking-wider border-b border-slate-100 pb-1.5">
                      {item.name}
                    </div>
                    <ul className="space-y-1">
                      {item.subItems.map((sub, idx) => {
                        const isSubActive = activeTab === sub.name;
                        return (
                          <li key={idx}>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveTab(sub.name);
                                setActivePopup(null);
                              }}
                              className={cn(
                                'w-full text-left px-3 py-2 text-xs rounded-lg transition-colors font-bold',
                                isSubActive
                                  ? 'bg-blue-50 text-blue-600 border-l-4 border-orange-500'
                                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                              )}
                            >
                              {sub.name}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      {/* BOTTOM: Profile and Settings */}
      <div className="p-3 shrink-0 border-t border-slate-200/60 space-y-2">
        {/* Settings button */}
        <button
          onClick={() => {
            setActiveTab('Cài đặt');
            setActivePopup(null);
          }}
          className={cn(
            'flex items-center rounded-lg text-sm font-bold transition-all duration-200 cursor-pointer w-full py-2.5',
            collapsed ? 'justify-center w-12 h-12 mx-auto' : 'px-4 justify-start',
            activeTab === 'Cài đặt' 
              ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600' 
              : 'text-slate-600 hover:bg-slate-900/5 hover:text-slate-900'
          )}
          title={collapsed ? "Cài đặt hệ thống" : undefined}
        >
          <Settings size={20} className={activeTab === 'Cài đặt' ? "text-blue-600 animate-spin-slow" : "text-slate-400"} />
          {!collapsed && <span className="ml-3 truncate">Cài đặt hệ thống</span>}
        </button>

        {/* User Profile */}
        <div
          className={cn(
            "flex items-center rounded-xl p-2 bg-slate-900/5 border border-slate-200/50 transition-all",
            collapsed ? "justify-center w-12 h-12 mx-auto" : "space-x-3"
          )}
        >
          <img
            src="https://i.pravatar.cc/150?u=roberto"
            alt="Roberto"
            className="w-8 h-8 rounded-full border border-orange-500/50 shrink-0"
          />
          {!collapsed && (
            <div className="text-left truncate min-w-0">
              <p className="text-xs font-bold text-slate-800 truncate">Roberto Canevari</p>
              <p className="text-[10px] text-slate-500 truncate">Quản trị viên</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
