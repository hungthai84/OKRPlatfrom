import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { HomeView } from './components/HomeView';
import { SettingsView } from './components/SettingsView';
import { PlaceholderView } from './components/PlaceholderView';
import { GoalSettingView } from './components/GoalSettingView';
import { KpiSettingView } from './components/KpiSettingView';
import { DevGoalSettingView } from './components/DevGoalSettingView';
import { MeetingSettingView } from './components/MeetingSettingView';
import PerformanceReviewView from './components/PerformanceReviewView';
import RewardRecognitionView from './components/RewardRecognitionView';
import PulseSurveyView from './components/PulseSurveyView';
import IdeaProjectView from './components/IdeaProjectView';
import { ProjectManagementView } from './components/ProjectManagementView';
import { RoadmapView } from './components/RoadmapView';
import { ScorecardView } from './components/ScorecardView';
import { NotesView } from './components/NotesView';
import { ReportsView } from './components/ReportsView';
import { cn } from './lib/utils';

type Wallpaper = {
  type: 'image' | 'video' | 'gradient' | 'pattern';
  value: string;
  name: string;
  thumbnail?: string;
  style?: React.CSSProperties;
};

const BORDER_COLORS = [
  '#3b82f6', // Xanh dương
  '#10b981', // Xanh lá
  '#f59e0b', // Vàng hổ phách
  '#ec4899', // Hồng cánh sen
  '#8b5cf6', // Tím oải hương
  '#ef4444', // Đỏ san hô
  '#f97316', // Cam sáng
];

export default function App() {
  const [currentTab, setCurrentTab] = useState('Trang chủ');
  const [cardOpacity, setCardOpacity] = useState(90);
  const [sidebarOpacity, setSidebarOpacity] = useState(90);
  const [borderColorIndex, setBorderColorIndex] = useState(0);
  const [background, setBackground] = useState<Wallpaper>({
    type: 'gradient',
    value: 'linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)',
    name: 'Chuyển màu sống động (Chuyển động)',
  });

  // User Profile States
  const [profileName, setProfileName] = useState(() => localStorage.getItem('profile_name') || 'Roberto Canevari');
  const [profileAvatar, setProfileAvatar] = useState(() => localStorage.getItem('profile_avatar') || 'https://i.pravatar.cc/150?u=roberto');
  const [profileRole, setProfileRole] = useState(() => localStorage.getItem('profile_role') || 'Quản trị viên');
  const [profileEmail, setProfileEmail] = useState(() => localStorage.getItem('profile_email') || 'roberto@powerservice.vn');
  const [profilePhone, setProfilePhone] = useState(() => localStorage.getItem('profile_phone') || '0901234567');

  // Border color transitions - changes every 1 minute (60,000 milliseconds)
  useEffect(() => {
    const interval = setInterval(() => {
      setBorderColorIndex((prev) => (prev + 1) % BORDER_COLORS.length);
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const renderContent = () => {
    switch (currentTab) {
      case 'Trang chủ':
        return <HomeView onNavigate={setCurrentTab} cardOpacity={cardOpacity} />;
      case 'Bảng điều khiển':
        return <Dashboard cardOpacity={cardOpacity} />;
      case 'Lộ trình':
        return <RoadmapView cardOpacity={cardOpacity} />;
      case 'Mục tiêu':
        return <GoalSettingView cardOpacity={cardOpacity} />;
      case 'Phát triển':
        return <DevGoalSettingView cardOpacity={cardOpacity} />;
      case 'Chỉ số':
        return <KpiSettingView cardOpacity={cardOpacity} />;
      case 'Cuộc họp':
        return <MeetingSettingView cardOpacity={cardOpacity} />;
      case 'Hiệu suất':
      case 'Đánh giá':
      case 'Hiệu chuẩn':
        return <PerformanceReviewView cardOpacity={cardOpacity} />;
      case 'Khen thưởng':
        return <RewardRecognitionView cardOpacity={cardOpacity} />;
      case 'Khảo sát':
        return <PulseSurveyView cardOpacity={cardOpacity} />;
      case 'Danh mục':
        return <IdeaProjectView cardOpacity={cardOpacity} />;
      case 'Dự án':
        return <ProjectManagementView cardOpacity={cardOpacity} initialTab="projects" />;
      case 'Bảng điểm':
        return <ScorecardView cardOpacity={cardOpacity} />;
      case 'Ghi chú':
        return <NotesView cardOpacity={cardOpacity} />;
      case 'Báo cáo':
        return <ReportsView cardOpacity={cardOpacity} />;
      case 'Cài đặt':
        return (
          <SettingsView
            cardOpacity={cardOpacity}
            setCardOpacity={setCardOpacity}
            sidebarOpacity={sidebarOpacity}
            setSidebarOpacity={setSidebarOpacity}
            background={background}
            setBackground={setBackground}
            profileName={profileName}
            setProfileName={setProfileName}
            profileAvatar={profileAvatar}
            setProfileAvatar={setProfileAvatar}
            profileRole={profileRole}
            setProfileRole={setProfileRole}
            profileEmail={profileEmail}
            setProfileEmail={setProfileEmail}
            profilePhone={profilePhone}
            setProfilePhone={setProfilePhone}
          />
        );
      default:
        return <PlaceholderView tabName={currentTab} cardOpacity={cardOpacity} />;
    }
  };

  return (
    <div className="w-screen h-screen p-[15px] overflow-hidden flex flex-col justify-center items-center relative box-border bg-slate-900 font-sans select-none">
      
      {/* BACKGROUND RENDERERS */}
      {background.type === 'image' && (
        <div
          className="absolute inset-0 z-0 bg-cover bg-center transition-all duration-1000"
          style={{ backgroundImage: `url(${background.value})` }}
        />
      )}

      {background.type === 'video' && (
        <video
          key={background.value}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-1000"
        >
          <source src={background.value} type="video/mp4" />
        </video>
      )}

      {background.type === 'gradient' && (
        <div
          className={cn(
            'absolute inset-0 z-0 transition-all duration-1000',
            background.value.includes('-45deg') ? 'animate-gradient' : ''
          )}
          style={{ background: background.value }}
        />
      )}

      {background.type === 'pattern' && (
        <div
          className="absolute inset-0 z-0 transition-all duration-1000"
          style={
            background.value === 'orbiting-planets'
              ? {
                  backgroundImage: 'url(https://images.pexels.com/photos/1655166/pexels-photo-1655166.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }
              : background.value === 'dotted-pattern'
              ? {
                  backgroundImage: 'radial-gradient(circle at 25% 25%, #a3b1c6 15%, transparent 15%), radial-gradient(circle at 75% 75%, #a3b1c6 15%, transparent 15%)',
                  backgroundColor: '#e0e7ed',
                  backgroundSize: '10px 10px',
                }
              : {
                  backgroundImage: 'radial-gradient(circle, rgba(255, 255, 255, 0.2) 1px, transparent 1px)',
                  backgroundColor: '#1d1f20',
                  backgroundSize: '11px 11px',
                }
          }
        />
      )}

      {/* Glassmorphism subtle overlay to soften backgrounds */}
      <div className="absolute inset-0 bg-black/5 backdrop-blur-[2px] z-[1] pointer-events-none" />

      {/* MAIN WEBSITE CARD ENVELOPE: 
          - Bo cong 4 góc 10px
          - Full chiều rộng & chiều cao (inside padding 15px)
          - Hiệu ứng nổi 3D (shadows)
          - Viền 1px tự động đổi màu sau mỗi 1 phút
      */}
      <div
        style={{
          borderColor: BORDER_COLORS[borderColorIndex],
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 40px rgba(0, 0, 0, 0.2)',
        }}
        className="w-full h-full rounded-[10px] border-[1px] flex overflow-hidden transition-all duration-[2000ms] relative z-10 bg-slate-900/10 backdrop-blur-[4px]"
      >
        {/* Sidebar Menu - left portion of the card */}
        <Sidebar 
          activeTab={currentTab} 
          setActiveTab={setCurrentTab} 
          cardOpacity={sidebarOpacity} 
          profileName={profileName}
          profileAvatar={profileAvatar}
          profileRole={profileRole}
        />

        {/* Content area - right portion of the card */}
        <div 
          style={{
            backgroundColor: `rgba(255, 255, 255, ${cardOpacity / 100})`,
            backdropFilter: 'blur(8px)',
          }}
          className="flex-1 flex flex-col min-w-0 h-full relative overflow-hidden"
        >
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
