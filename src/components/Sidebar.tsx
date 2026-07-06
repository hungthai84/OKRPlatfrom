import React, { useState } from 'react';
import { cn } from '../lib/utils';
import {
  Home,
  Target,
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
  FolderOpen,
  Search,
} from 'lucide-react';

// Grouped Menu Items by Theme/Category
const MENU_GROUPS = [
  {
    title: 'Tổng quan',
    items: [
      { name: 'Trang chủ', icon: Home },
      { name: 'Bảng điểm', icon: LayoutDashboard },
    ]
  },
  {
    title: 'Chiến lược',
    items: [
      { name: 'Lộ trình', icon: Map },
      { name: 'Mục tiêu', icon: Target },
      { name: 'Phát triển', icon: Flag },
      { name: 'Chỉ số', icon: Activity },
      { name: 'Danh mục', icon: Briefcase },
    ]
  },
  {
    title: 'Vận hành',
    items: [
      { name: 'Dự án', icon: FolderOpen },
      { name: 'Cuộc họp', icon: Calendar },
      { name: 'Ghi chú', icon: FileText },
      { name: 'Báo cáo', icon: FileBarChart },
    ]
  },
  {
    title: 'Đánh giá & Phát triển',
    items: [
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
      { name: 'Khen thưởng', icon: Award },
      { name: 'Khảo sát', icon: ClipboardList },
    ]
  }
];

type SidebarProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cardOpacity: number;
  profileName: string;
  profileAvatar: string;
  profileRole: string;
};

export function Sidebar({ activeTab, setActiveTab, cardOpacity, profileName, profileAvatar, profileRole }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(true); // Default to collapsed
  const [activePopup, setActivePopup] = useState<string | null>(null);

  const handleSearchClick = () => {
    const query = prompt('Nhập nội dung cần tìm kiếm nhanh trên Power Service:');
    if (query) {
      alert(`Đang tìm kiếm kết quả cho: "${query}"...\nKhông tìm thấy mục tiêu hay công việc nào trùng khớp.`);
    }
  };

  const handleItemClick = (item: any) => {
    if (item.subItems) {
      setActivePopup(activePopup === item.name ? null : item.name);
    } else {
      setActiveTab(item.name);
      setActivePopup(null);
    }
  };

  const isParentActive = (item: any) => {
    if (item.subItems) {
      return item.subItems.some((sub: any) => sub.name === activeTab);
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
      {/* PART 1: TOP (Logo & Search) */}
      <div className={cn("flex flex-col shrink-0 border-b border-slate-200/60", collapsed ? "p-4 space-y-4 items-center" : "p-4 space-y-3")}>
        {/* Logo */}
        <div className={cn("flex items-center w-full", collapsed ? "justify-center h-12" : "justify-start h-12")}>
          <a 
            href="https://ibb.co/4ZPkSBLg" 
            target="_blank" 
            rel="noreferrer"
            className="flex items-center w-full"
          >
            <div className="w-12 h-12 flex items-center justify-center shrink-0">
              <img 
                src="https://i.ibb.co/4ZPkSBLg/Logo-Tr-ng-removebg-preview.png" 
                alt="Power Service Logo" 
                className="w-10 h-10 object-contain hover:scale-105 transition-transform" 
              />
            </div>
            {!collapsed && (
              <span className="ml-1.5 font-bold text-lg tracking-wider text-slate-800 truncate">
                Power Service
              </span>
            )}
          </a>
        </div>

        {/* Search Bar - Styled exactly like other menu items */}
        <button
          onClick={handleSearchClick}
          className={cn(
            'flex items-center rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer h-12 text-slate-600 hover:bg-slate-900/5 hover:text-slate-900',
            collapsed ? 'justify-center w-12' : 'justify-start w-full'
          )}
          title={collapsed ? "Tìm kiếm" : undefined}
        >
          <div className="w-12 h-12 flex items-center justify-center shrink-0">
            <Search size={20} className="text-slate-400 shrink-0" />
          </div>
          {!collapsed && (
            <span className="ml-1.5 truncate text-sm font-bold text-slate-500">Tìm kiếm</span>
          )}
        </button>
      </div>

      {/* Toggle collapse button - round arrow in the middle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3.5 top-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full p-1.5 border border-white/20 text-white hover:scale-110 shadow-lg cursor-pointer z-40 transition-all"
        title={collapsed ? "Mở rộng" : "Thu gọn"}
      >
        {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      {/* PART 2: CENTER (Menu Items always aligned perfectly horizontally & vertically in the column) */}
      <div className="flex-1 flex flex-col justify-start py-4 overflow-y-auto scrollbar-none">
        <div className="space-y-6 w-full">
          {MENU_GROUPS.map((group, groupIdx) => (
            <div key={groupIdx} className="space-y-1 w-full">
              {/* Category Header (only shown when expanded) */}
              {!collapsed && (
                <div className="px-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 select-none">
                  {group.title}
                </div>
              )}
              {/* Theme Separator Divider (only shown when collapsed) */}
              {collapsed && groupIdx > 0 && (
                <div className="mx-4 border-t border-slate-200/60 my-2" />
              )}

              <ul className={cn("space-y-1 w-full flex flex-col", collapsed ? "items-center px-0" : "px-4")}>
                {group.items.map((item, idx) => {
                  const active = isParentActive(item);
                  const Icon = item.icon;

                  return (
                    <li key={idx} className="relative group/item flex justify-center w-full">
                      <button
                        onClick={() => handleItemClick(item)}
                        className={cn(
                          'flex items-center rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer h-12',
                          collapsed ? 'justify-center w-12' : 'justify-start w-full',
                          active 
                            ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600' 
                            : 'text-slate-600 hover:bg-slate-900/5 hover:text-slate-900'
                        )}
                        title={collapsed ? item.name : undefined}
                      >
                        <div className="w-12 h-12 flex items-center justify-center shrink-0">
                          <Icon size={20} className={cn("shrink-0", active ? "text-blue-600 scale-110" : "text-slate-400 group-hover/item:text-slate-600")} />
                        </div>
                        {!collapsed && (
                          <span className="ml-1.5 truncate text-sm font-bold">{item.name}</span>
                        )}
                        
                        {/* Small badge for Trang chủ if needed */}
                        {!collapsed && item.name === 'Trang chủ' && (
                          <span className="ml-auto mr-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full animate-pulse">
                            Mới
                          </span>
                        )}

                        {!collapsed && item.subItems && (
                          <ChevronRight 
                            size={14} 
                            className={cn(
                              "ml-auto mr-2 text-slate-400 transition-transform", 
                              activePopup === item.name && "rotate-90"
                            )} 
                          />
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
                            {item.subItems.map((sub, sidx) => {
                              const isSubActive = activeTab === sub.name;
                              return (
                                <li key={sidx}>
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
          ))}
        </div>
      </div>

      {/* PART 3: BOTTOM (Settings & User Profile) */}
      <div className={cn("shrink-0 border-t border-slate-200/60 flex flex-col space-y-2", collapsed ? "p-4 items-center" : "p-4")}>
        {/* Settings button */}
        <button
          onClick={() => {
            setActiveTab('Cài đặt');
            setActivePopup(null);
          }}
          className={cn(
            'flex items-center rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer h-12',
            collapsed ? 'justify-center w-12' : 'justify-start w-full',
            activeTab === 'Cài đặt' 
              ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600' 
              : 'text-slate-600 hover:bg-slate-900/5 hover:text-slate-900'
          )}
          title={collapsed ? "Cài đặt hệ thống" : undefined}
        >
          <div className="w-12 h-12 flex items-center justify-center shrink-0">
            <Settings size={20} className={activeTab === 'Cài đặt' ? "text-blue-600 animate-spin-slow" : "text-slate-400"} />
          </div>
          {!collapsed && <span className="ml-1.5 truncate">Cài đặt hệ thống</span>}
        </button>

        {/* User Profile */}
        <button
          type="button"
          onClick={() => {
            setActiveTab('Cài đặt');
            setActivePopup(null);
          }}
          className={cn(
            "flex items-center rounded-xl h-12 bg-slate-900/5 hover:bg-slate-900/10 border border-slate-200/50 transition-all text-left cursor-pointer",
            collapsed ? "justify-center w-12" : "w-full justify-start"
          )}
          title="Hồ sơ cá nhân & Cài đặt"
        >
          <div className="w-12 h-12 flex items-center justify-center shrink-0">
            <img
              src={profileAvatar}
              alt={profileName}
              className="w-8 h-8 rounded-full border border-orange-500/50 object-cover"
            />
          </div>
          {!collapsed && (
            <div className="text-left truncate min-w-0 ml-1.5">
              <p className="text-xs font-bold text-slate-800 truncate leading-none">{profileName}</p>
              <p className="text-[10px] text-slate-500 truncate mt-1 leading-none">{profileRole}</p>
            </div>
          )}
        </button>
      </div>
    </div>
  );
}
