import React, { useState } from 'react';
import { 
  Sliders, 
  Image, 
  Film, 
  Palette, 
  Grid, 
  Check, 
  RotateCcw,
  BookOpen,
  Info,
  Layers,
  Sparkles,
  User,
  Mail,
  Phone,
  Briefcase,
  Camera
} from 'lucide-react';

type Wallpaper = {
  type: 'image' | 'video' | 'gradient' | 'pattern';
  value: string;
  name: string;
  thumbnail?: string;
  style?: React.CSSProperties;
};

type SettingsViewProps = {
  cardOpacity: number;
  setCardOpacity: (opacity: number) => void;
  sidebarOpacity: number;
  setSidebarOpacity: (opacity: number) => void;
  background: Wallpaper;
  setBackground: (bg: Wallpaper) => void;
  profileName: string;
  setProfileName: (name: string) => void;
  profileAvatar: string;
  setProfileAvatar: (avatar: string) => void;
  profileRole: string;
  setProfileRole: (role: string) => void;
  profileEmail: string;
  setProfileEmail: (email: string) => void;
  profilePhone: string;
  setProfilePhone: (phone: string) => void;
};

const AVATAR_PRESETS = [
  "https://i.pravatar.cc/150?u=roberto",
  "https://i.pravatar.cc/150?u=alex",
  "https://i.pravatar.cc/150?u=sarah",
  "https://i.pravatar.cc/150?u=jack",
  "https://i.pravatar.cc/150?u=lisa",
  "https://i.pravatar.cc/150?u=maria"
];

const IMAGE_WALLPAPERS: Wallpaper[] = [
  { type: 'image', value: "https://i.ibb.co/G47jTb1g/minimalist-white-background-3840x2160-bright-space-clean-aesthetic-27644.jpg", name: "Trắng tối giản" },
  { type: 'image', value: "https://i.ibb.co/q2X19rq/geometric-mountain-wallpaper-3840x2160-calming-visuals-simple-patterns-26760.jpg", name: "Núi hình học" },
  { type: 'image', value: "https://i.ibb.co/R4P1zff0/ta-i-xu-ng-15.jpg", name: "Thanh tịnh 15" },
  { type: 'image', value: "https://i.ibb.co/TDnD5NB1/ta-i-xu-ng-14.jpg", name: "Thanh tịnh 14" },
  { type: 'image', value: "https://i.ibb.co/S49fBKcv/ta-i-xu-ng-13.jpg", name: "Thanh tịnh 13" },
  { type: 'image', value: "https://i.ibb.co/04qypw8/ta-i-xu-ng-12.jpg", name: "Thanh tịnh 12" },
  { type: 'image', value: "https://i.ibb.co/ch1yf4Dz/AVv-Xs-Egn6ve-Lq-M6aj-Fr-XO6-YYuy-NTs-Wt-x9-qxb2w-O8-Xt-OWdn-JECETXTri7-Ps-rnb2-Td-Jnln6xu-kddyc-Yisi1xf.jpg", name: "Huyền ảo mộng mơ" },
  { type: 'image', value: "https://i.ibb.co/d0Fw0xdW/Best-wallpaper-1.jpg", name: "Tinh vân 1" },
  { type: 'image', value: "https://i.ibb.co/rKL4ffH2/2.jpg", name: "Tinh vân 2" },
  { type: 'image', value: "https://i.ibb.co/nq9GHB11/ta-i-xu-ng-12.jpg", name: "Thanh tịnh 12 Alt" },
  { type: 'image', value: "https://i.ibb.co/PZhKjDjP/Abstract-minimalistic-background-image-with-minimal-details-in-silvery-pearlescent-hues-subtle-tex.jpg", name: "Bạc tối giản" },
  { type: 'image', value: "https://i.ibb.co/Fc1dczn/Wallpaper.jpg", name: "Cổ điển" },
  { type: 'image', value: "https://i.ibb.co/DDCj9TBk/ta-i-xu-ng-15.jpg", name: "Thanh tịnh 15 Alt" },
  { type: 'image', value: "https://i.ibb.co/jPN1bS9c/Pastel-Minimal-Wallpaper-Clean-Aesthetic-for-Mac-Book.jpg", name: "MacBook Pastel" },
  { type: 'image', value: "https://i.ibb.co/chRZYCFs/ta-i-xu-ng-14.jpg", name: "Thanh tịnh 14 Alt" },
  { type: 'image', value: "https://i.ibb.co/k2jTwnTp/ta-i-xu-ng-13.jpg", name: "Thanh tịnh 13 Alt" },
  { type: 'image', value: "https://i.ibb.co/G4tGQZbB/ta-i-xu-ng-16.jpg", name: "Thanh tịnh 16" },
  { type: 'image', value: "https://i.ibb.co/r2w5qZCT/Download-Abstract-Gradient-Circle-Background-for-free.jpg", name: "Vòng tròn dốc" },
  { type: 'image', value: "https://i.ibb.co/zhc5bK7G/Ton-mental-a-aussi-besoin-de-repos.jpg", name: "Chữa lành tâm hồn" }
];

const VIDEO_WALLPAPERS: Wallpaper[] = [
  { type: 'video', value: "https://cdn.dribbble.com/userupload/18230475/file/original-d7ab36998c2277e97c1996d837a4673c.mp4", name: "Năng lượng động" },
  { type: 'video', value: "https://cdn.dribbble.com/userupload/9438742/file/original-9334dd4051bb585cc561e8be06870b39.mp4", name: "Dải cát ngân hà" },
  { type: 'video', value: "https://cdn.dribbble.com/userupload/4241992/file/original-1fcb82b5ace105f3ec88a2deb08e842d.mp4", name: "Ánh sáng neon" },
  { type: 'video', value: "https://cdn.dribbble.com/userupload/34993295/file/original-2ea4b30fcd7c6eac3ca0f4d5bfd3d67b.mp4", name: "Lõi tương lai" },
  { type: 'video', value: "https://cdn.dribbble.com/userupload/32536603/file/original-db8060ba2540c3bf1cd2f30b4984cd51.mp4", name: "Làn sóng tím" },
  { type: 'video', value: "https://cdn.dribbble.com/userupload/32480516/file/original-f4a88d4031fee315e3175bf1834c24b4.mp4", name: "Không gian 3D" },
  { type: 'video', value: "https://cdn.dribbble.com/userupload/32404914/file/original-57644971c47c0d16f90a68404a5e65c1.mp4", name: "Bàn cờ trừu tượng" },
  { type: 'video', value: "https://cdn.dribbble.com/userupload/16365481/file/original-527fee647d12f31fce8a309ad136c4bb.mp4", name: "Mây nhẹ nhàng" },
  { type: 'video', value: "https://cdn.dribbble.com/userupload/15594644/file/original-6008d4b0ddcff73c116cb7989a144a71.mp4", name: "Hạt bụi vàng" },
  { type: 'video', value: "https://cdn.dribbble.com/userupload/14779635/file/original-1aca59fc5dc52bee9dcd291a27effcbf.mp4", name: "Sóng âm thanh" },
  { type: 'video', value: "https://cdn.dribbble.com/userupload/10782874/file/original-06f7280dda982b62cd9452b0da032598.mp4", name: "Lưu lượng dữ liệu" },
  { type: 'video', value: "https://cdn.dribbble.com/userupload/32524948/file/original-3c68e4ad227ae70e1875ef71289be2b0.mp4", thumbnail: "https://i.postimg.cc/jS3rSGdF/videoframe-8901.png", name: "Không gian vũ trụ" },
  { type: 'video', value: "https://cdn.dribbble.com/userupload/13498087/file/original-b120f6a1a15d71e493f8d4b2d13b0296.mp4", thumbnail: "https://i.postimg.cc/BnmJ1jNN/videoframe-3046.png", name: "Núi tuyết cực quang" },
  { type: 'video', value: "https://cdn.dribbble.com/userupload/16718734/file/original-f2df9314dbf922d5452d7a8a5885d744.mp4", thumbnail: "https://i.postimg.cc/NfYtJ6zp/videoframe-1990.png", name: "Hành tinh ảo ảnh" },
  { type: 'video', value: "https://cdn.dribbble.com/userupload/43797830/file/original-b9bafe56dd75a7ae175f827cfc662738.mp4", thumbnail: "https://i.postimg.cc/yNJW1hB0/videoframe-3097.png", name: "Mặt trời mọc 3D" },
  { type: 'video', value: "https://cdn.dribbble.com/userupload/16365364/file/original-dcc3ad4c0f5802c6670d36fcca720e5e.mp4", thumbnail: "https://i.postimg.cc/vBgPtKyD/videoframe-4678.png", name: "Vết dầu loang cực đẹp" },
  { type: 'video', value: "https://cdn.dribbble.com/userupload/43797856/file/original-46c91cbdf46a3cbc3f30a85f061ed817.mp4", thumbnail: "https://i.postimg.cc/L6TVLSPN/videoframe-3537.png", name: "Thiết kế tương lai" },
  { type: 'video', value: "https://cdn.dribbble.com/userupload/12532568/file/original-816b8af88c5a4336e9f0467a7848033e.mp4", name: "Cảnh đồi mờ" },
  { type: 'video', value: "https://cdn.dribbble.com/userupload/9535990/file/original-3a87c5fdf2433287d096795a11fa9ee4.mp4", name: "Hàng triệu điểm ảnh" },
  { type: 'video', value: "https://cdn.dribbble.com/userupload/13253460/file/original-85659da2508a303a516780470e3ae354.mp4", name: "Hạt sáng lung linh" },
  { type: 'video', value: "https://cdn.dribbble.com/userupload/9783516/file/original-47f57ffecea5c7874ff6d6c2f0ce42bf.mp4", name: "Sương mù huyền ảo" }
];

const GRADIENT_WALLPAPERS: Wallpaper[] = [
  { type: 'gradient', value: "linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)", name: "Chuyển màu sống động (Chuyển động)" },
  { type: 'gradient', value: "linear-gradient(45deg, #6a11cb 0%, #2575fc 100%)", name: "Hoàng hôn tím" },
  { type: 'gradient', value: "linear-gradient(45deg, #13547a 0%, #80d0c7 100%)", name: "Đại dương xanh" },
  { type: 'gradient', value: "linear-gradient(45deg, #ed6ea0 0%, #ec8c69 100%)", name: "Cam san hô" },
  { type: 'gradient', value: "linear-gradient(45deg, #000428 0%, #004e92 100%)", name: "Đêm sâu thẳm" },
  { type: 'gradient', value: "linear-gradient(45deg, #0f2027 0%, #203a43 50%, #2c5364 100%)", name: "Rừng đêm tối" },
  { type: 'gradient', value: "linear-gradient(45deg, #373b44 0%, #4286f4 100%)", name: "Xanh thép" },
  { type: 'gradient', value: "linear-gradient(45deg, #7028e4 0%, #e5b2ca 100%)", name: "Lãng mạn tím hồng" },
  { type: 'gradient', value: "linear-gradient(45deg, #1e3c72 0%, #2a5298 100%)", name: "Hải quân vương giả" },
  { type: 'gradient', value: "linear-gradient(45deg, #a8edea 0%, #fed6e3 100%)", name: "Kẹo ngọt Pastel" },
  { type: 'gradient', value: "linear-gradient(45deg, #0250c5 0%, #d43f8d 100%)", name: "Nổi loạn Magenta" }
];

const PATTERN_WALLPAPERS: Wallpaper[] = [
  {
    type: 'pattern',
    value: "orbiting-planets",
    name: "Hành tinh quỹ đạo",
    thumbnail: "https://images.pexels.com/photos/1655166/pexels-photo-1655166.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    style: {
      backgroundImage: "url(https://images.pexels.com/photos/1655166/pexels-photo-1655166.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500)",
      backgroundSize: "cover",
      backgroundPosition: "center"
    }
  },
  {
    type: 'pattern',
    value: "dotted-pattern",
    name: "Họa tiết chấm sáng",
    style: {
      backgroundImage: "radial-gradient(circle at 25% 25%, #a3b1c6 15%, transparent 15%), radial-gradient(circle at 75% 75%, #a3b1c6 15%, transparent 15%)",
      backgroundColor: "#e0e7ed",
      backgroundSize: "10px 10px"
    }
  },
  {
    type: 'pattern',
    value: "dark-dotted-pattern",
    name: "Họa tiết chấm tối",
    style: {
      backgroundImage: "radial-gradient(circle, rgba(255, 255, 255, 0.2) 1px, transparent 1px)",
      backgroundColor: "#1d1f20",
      backgroundSize: "11px 11px"
    }
  }
];

export function SettingsView({ 
  cardOpacity, 
  setCardOpacity, 
  sidebarOpacity,
  setSidebarOpacity,
  background, 
  setBackground,
  profileName,
  setProfileName,
  profileAvatar,
  setProfileAvatar,
  profileRole,
  setProfileRole,
  profileEmail,
  setProfileEmail,
  profilePhone,
  setProfilePhone
}: SettingsViewProps) {
  const [activeTab, setActiveTab] = useState<'profile' | 'appearance' | 'instructions'>('profile');
  const [toastMessage, setToastMessage] = useState('');

  const isSelected = (wp: Wallpaper) => {
    return background.type === wp.type && background.value === wp.value;
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3000);
  };

  const saveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('profile_name', profileName);
    localStorage.setItem('profile_avatar', profileAvatar);
    localStorage.setItem('profile_role', profileRole);
    localStorage.setItem('profile_email', profileEmail);
    localStorage.setItem('profile_phone', profilePhone);
    showToast("Đã lưu thông tin hồ sơ thành công!");
  };

  const resetToDefault = () => {
    setCardOpacity(90);
    setSidebarOpacity(90);
    setBackground({
      type: 'gradient',
      value: 'linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)',
      name: 'Chuyển màu sống động (Chuyển động)',
    });
    showToast("Đã đặt lại giao diện mặc định!");
  };

  const cardStyle = { 
    backgroundColor: `rgba(255, 255, 255, ${cardOpacity / 100})`,
    backdropFilter: 'blur(12px)'
  };

  return (
    <div className="flex-1 overflow-auto p-6 space-y-6 flex flex-col select-none">
      
      {/* 7. BỐ CỤC TRANG NỘI DUNG: BANNER BO CONG 4 GÓC 10PX */}
      <div className="bg-gradient-to-r from-slate-700 via-slate-800 to-slate-900 rounded-[10px] shadow-lg p-6 text-white relative overflow-hidden transition-all duration-300 shrink-0">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 z-10 relative">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center animate-pulse">
              <User size={26} className="text-blue-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Cấu hình Cá nhân & Hệ thống</h2>
              <p className="text-xs text-slate-300">
                Tùy chỉnh thông tin hồ sơ cá nhân và cấu hình không gian làm việc số: thanh menu, thẻ nội dung, ảnh nền nghệ thuật.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 flex-wrap">
            <button 
              onClick={resetToDefault}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-4 py-2.5 rounded-lg text-xs font-bold shadow-md hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
            >
              <RotateCcw className="w-4 h-4 text-orange-400" /> Đặt lại mặc định
            </button>
          </div>
        </div>

        {/* SUB NAVIGATION TABS */}
        <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex space-x-6 text-sm font-semibold">
            <button 
              onClick={() => setActiveTab('profile')}
              className={`pb-1 border-b-2 cursor-pointer transition-all ${
                activeTab === 'profile' ? 'border-orange-500 text-white font-bold' : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              Hồ sơ cá nhân
            </button>
            <button 
              onClick={() => setActiveTab('appearance')}
              className={`pb-1 border-b-2 cursor-pointer transition-all ${
                activeTab === 'appearance' ? 'border-orange-500 text-white font-bold' : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              Tùy chỉnh Giao diện
            </button>
            <button 
              onClick={() => setActiveTab('instructions')}
              className={`pb-1 border-b-2 cursor-pointer transition-all ${
                activeTab === 'instructions' ? 'border-orange-500 text-white font-bold' : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              Hướng dẫn Sử dụng
            </button>
          </div>
        </div>
      </div>

      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-24 right-10 bg-slate-900 text-white font-bold px-4 py-2.5 rounded-xl shadow-2xl z-50 border border-slate-700 text-xs animate-in fade-in slide-in-from-top-4 duration-200">
          ✨ {toastMessage}
        </div>
      )}

      {/* CORE CONTENT */}
      <div className="flex-1 flex flex-col gap-6 min-h-0">
        
        {/* TAB 1: PROFILE EDITOR */}
        {activeTab === 'profile' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
            {/* Visual Live Preview Card */}
            <div style={cardStyle} className="rounded-[10px] border border-slate-200/60 p-6 shadow-sm flex flex-col items-center justify-center text-center space-y-4">
              <div className="text-xs font-black uppercase text-slate-500 tracking-wider">
                Xem trước thẻ hiển thị
              </div>
              <div className="relative">
                <img 
                  src={profileAvatar} 
                  alt={profileName} 
                  className="w-24 h-24 rounded-full border-4 border-orange-500 shadow-xl object-cover"
                />
                <div className="absolute bottom-0 right-0 bg-orange-500 text-white p-1.5 rounded-full shadow-md">
                  <Camera size={14} />
                </div>
              </div>
              <div>
                <h3 className="font-extrabold text-lg text-slate-800">{profileName}</h3>
                <p className="text-xs text-slate-500 bg-slate-100 px-3 py-1 rounded-full mt-1.5 inline-block font-semibold">
                  {profileRole}
                </p>
              </div>
              <div className="w-full border-t border-slate-200/50 pt-4 space-y-2 text-left text-xs text-slate-600">
                <div className="flex items-center space-x-2">
                  <Mail size={14} className="text-slate-400 shrink-0" />
                  <span className="truncate">{profileEmail}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone size={14} className="text-slate-400 shrink-0" />
                  <span>{profilePhone}</span>
                </div>
              </div>
            </div>

            {/* Editor Form */}
            <div style={cardStyle} className="lg:col-span-2 rounded-[10px] border border-slate-200/60 p-6 shadow-sm">
              <form onSubmit={saveProfile} className="space-y-4">
                <div className="flex items-center space-x-2 border-b border-slate-100 pb-3 mb-2">
                  <User size={18} className="text-orange-500" />
                  <h3 className="font-extrabold text-base text-slate-800">Cập nhật thông tin chi tiết</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-600">Họ và tên</label>
                    <input
                      type="text"
                      required
                      value={profileName}
                      onChange={(e) => {
                        setProfileName(e.target.value);
                        localStorage.setItem('profile_name', e.target.value);
                      }}
                      className="w-full text-xs font-bold px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-600">Chức vụ</label>
                    <input
                      type="text"
                      required
                      value={profileRole}
                      onChange={(e) => {
                        setProfileRole(e.target.value);
                        localStorage.setItem('profile_role', e.target.value);
                      }}
                      className="w-full text-xs font-bold px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-600">Địa chỉ Email</label>
                    <input
                      type="email"
                      required
                      value={profileEmail}
                      onChange={(e) => {
                        setProfileEmail(e.target.value);
                        localStorage.setItem('profile_email', e.target.value);
                      }}
                      className="w-full text-xs font-bold px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-600">Số điện thoại</label>
                    <input
                      type="text"
                      required
                      value={profilePhone}
                      onChange={(e) => {
                        setProfilePhone(e.target.value);
                        localStorage.setItem('profile_phone', e.target.value);
                      }}
                      className="w-full text-xs font-bold px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600">Đường dẫn ảnh đại diện (URL)</label>
                  <input
                    type="url"
                    required
                    value={profileAvatar}
                    onChange={(e) => {
                      setProfileAvatar(e.target.value);
                      localStorage.setItem('profile_avatar', e.target.value);
                    }}
                    className="w-full text-xs font-bold px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                  />
                </div>

                <div className="space-y-2 pt-2">
                  <label className="text-xs font-bold text-slate-600 block">Chọn ảnh đại diện nhanh</label>
                  <div className="flex space-x-3">
                    {AVATAR_PRESETS.map((preset, idx) => (
                      <button
                        type="button"
                        key={idx}
                        onClick={() => {
                          setProfileAvatar(preset);
                          localStorage.setItem('profile_avatar', preset);
                        }}
                        className={`w-10 h-10 rounded-full border-2 overflow-hidden transition-all hover:scale-110 cursor-pointer ${
                          profileAvatar === preset ? 'border-orange-500 scale-105 ring-2 ring-orange-500/20' : 'border-transparent'
                        }`}
                      >
                        <img src={preset} alt="preset" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="submit"
                    className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs px-5 py-2.5 rounded-lg shadow-md transition-all active:scale-95 cursor-pointer"
                  >
                    Lưu thông tin hồ sơ
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* TAB 2: APPEARANCE CUSTOMIZER */}
        {activeTab === 'appearance' && (
          <div className="space-y-6 animate-fade-in">
            {/* 1. DOUBLE TRANSPARENCY SLIDERS */}
            <div 
              style={cardStyle}
              className="rounded-[10px] border border-slate-200/60 p-6 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {/* Card opacity */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-slate-800">
                  <div className="bg-blue-50 text-blue-600 p-2 rounded-xl">
                    <Sliders size={18} />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm text-slate-800">Độ trong suốt thẻ nội dung</h3>
                    <p className="text-[10px] text-slate-500">Mức độ mờ kính Glassmorphism của các phân vùng làm việc.</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 pt-1">
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={cardOpacity}
                    onChange={(e) => setCardOpacity(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="bg-blue-600 text-white font-bold px-2.5 py-1 rounded-lg text-xs shrink-0 shadow-sm">
                    {cardOpacity}%
                  </div>
                </div>
              </div>

              {/* Sidebar opacity */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-slate-800">
                  <div className="bg-orange-50 text-orange-600 p-2 rounded-xl">
                    <Layers size={18} />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm text-slate-800">Độ trong suốt thanh menu (Sidebar)</h3>
                    <p className="text-[10px] text-slate-500">Mức độ mờ kính của thanh điều hướng menu bên trái.</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 pt-1">
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={sidebarOpacity}
                    onChange={(e) => setSidebarOpacity(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
                  />
                  <div className="bg-orange-500 text-white font-bold px-2.5 py-1 rounded-lg text-xs shrink-0 shadow-sm">
                    {sidebarOpacity}%
                  </div>
                </div>
              </div>
            </div>

            {/* 2. BACKGROUND SELECTION AREA */}
            <div 
              style={cardStyle}
              className="rounded-[10px] border border-slate-200/60 p-6 shadow-sm space-y-8"
            >
              <div className="flex items-center space-x-3 text-slate-800 border-b border-slate-100 pb-4">
                <div className="bg-orange-50 text-orange-600 p-2.5 rounded-xl">
                  <Palette size={20} />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-slate-800">Cấu hình hình nền toàn trang</h3>
                  <p className="text-xs text-slate-500">Thay đổi ảnh nền tĩnh sắc nét, video phong cảnh chuyển động nghệ thuật, hoặc dải sắc gradient.</p>
                </div>
              </div>

              {/* STATIC IMAGE WALLPAPERS */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-xs font-black uppercase text-slate-500 tracking-wider">
                  <Image size={15} className="text-blue-500" />
                  <span>Hình nền Ảnh tĩnh (Image)</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {IMAGE_WALLPAPERS.map((wp, idx) => (
                    <button
                      key={idx}
                      onClick={() => setBackground(wp)}
                      className={`relative rounded-xl overflow-hidden h-20 border-2 transition-all group cursor-pointer ${
                        isSelected(wp) ? 'border-blue-600 ring-2 ring-blue-600/30 scale-[0.97]' : 'border-transparent hover:border-slate-300'
                      }`}
                      title={wp.name}
                    >
                      <img src={wp.value} alt={wp.name} className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500" />
                      <div className="absolute inset-x-0 bottom-0 bg-black/60 py-1 px-1.5 text-[9px] text-white truncate text-center font-bold">
                        {wp.name}
                      </div>
                      {isSelected(wp) && (
                        <div className="absolute top-1.5 right-1.5 bg-blue-600 text-white p-1 rounded-full shadow-md">
                          <Check size={8} className="stroke-[4]" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* VIDEO WALLPAPERS */}
              <div className="space-y-3 pt-6 border-t border-slate-100">
                <div className="flex items-center space-x-2 text-xs font-black uppercase text-slate-500 tracking-wider">
                  <Film size={15} className="text-orange-500" />
                  <span>Hình nền Video nghệ thuật (Video Live)</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {VIDEO_WALLPAPERS.map((wp, idx) => (
                    <button
                      key={idx}
                      onClick={() => setBackground(wp)}
                      className={`relative rounded-xl overflow-hidden h-24 border-2 transition-all group cursor-pointer ${
                        isSelected(wp) ? 'border-orange-500 ring-2 ring-orange-500/30 scale-[0.97]' : 'border-transparent hover:border-slate-300'
                      }`}
                      title={wp.name}
                    >
                      {wp.thumbnail ? (
                        <img src={wp.thumbnail} alt={wp.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-slate-900 flex flex-col items-center justify-center text-slate-500">
                          <Film size={20} className="mb-1" />
                          <span className="text-[9px]">Video Mp4</span>
                        </div>
                      )}
                      <span className="absolute top-1.5 left-1.5 bg-black/60 rounded px-1 text-[8px] font-bold text-orange-400">
                        MOV
                      </span>
                      <div className="absolute inset-x-0 bottom-0 bg-black/60 py-1 px-1.5 text-[9px] text-white truncate text-center font-bold">
                        {wp.name}
                      </div>
                      {isSelected(wp) && (
                        <div className="absolute top-1.5 right-1.5 bg-orange-500 text-white p-1 rounded-full shadow-md">
                          <Check size={8} className="stroke-[4]" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* GRADIENT WALLPAPERS */}
              <div className="space-y-3 pt-6 border-t border-slate-100">
                <div className="flex items-center space-x-2 text-xs font-black uppercase text-slate-500 tracking-wider">
                  <Palette size={15} className="text-pink-500" />
                  <span>Hình nền Dải màu CSS (Dynamic Gradient)</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {GRADIENT_WALLPAPERS.map((wp, idx) => (
                    <button
                      key={idx}
                      onClick={() => setBackground(wp)}
                      className={`relative rounded-xl overflow-hidden h-16 border-2 transition-all group cursor-pointer ${
                        isSelected(wp) ? 'border-pink-500 ring-2 ring-pink-500/30 scale-[0.97]' : 'border-transparent hover:border-slate-300'
                      }`}
                      style={{ background: wp.value }}
                      title={wp.name}
                    >
                      <div className="absolute inset-x-0 bottom-0 bg-black/40 py-1 px-1.5 text-[9px] text-white truncate text-center font-black">
                        {wp.name}
                      </div>
                      {isSelected(wp) && (
                        <div className="absolute top-1.5 right-1.5 bg-pink-500 text-white p-1 rounded-full shadow-md">
                          <Check size={8} className="stroke-[4]" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* CUSTOM PATTERNS */}
              <div className="space-y-3 pt-6 border-t border-slate-100">
                <div className="flex items-center space-x-2 text-xs font-black uppercase text-slate-500 tracking-wider">
                  <Grid size={15} className="text-emerald-500" />
                  <span>Hình nền Họa tiết đặc biệt (Patterns)</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {PATTERN_WALLPAPERS.map((wp, idx) => (
                    <button
                      key={idx}
                      onClick={() => setBackground(wp)}
                      className={`relative rounded-xl overflow-hidden h-20 border-2 transition-all group cursor-pointer ${
                        isSelected(wp) ? 'border-emerald-500 ring-2 ring-emerald-500/30 scale-[0.97]' : 'border-transparent hover:border-slate-300'
                      }`}
                      style={wp.style}
                      title={wp.name}
                    >
                      <div className="absolute inset-x-0 bottom-0 bg-black/60 py-1 px-1.5 text-[9px] text-white truncate text-center font-bold">
                        {wp.name}
                      </div>
                      {isSelected(wp) && (
                        <div className="absolute top-1.5 right-1.5 bg-emerald-500 text-white p-1 rounded-full shadow-md">
                          <Check size={8} className="stroke-[4]" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: INSTRUCTIONS */}
        {activeTab === 'instructions' && (
          <div 
            style={cardStyle}
            className="rounded-[10px] border border-slate-200/60 p-8 shadow-sm space-y-6 text-slate-700 text-xs leading-relaxed animate-fade-in"
          >
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <BookOpen className="w-5 h-5 text-indigo-600" />
              <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">
                HƯỚNG DẪN TRẢI NGHIỆM KHÔNG GIAN SỐ POWER SERVICE
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-extrabold text-slate-800 text-sm flex items-center gap-1.5 pb-1">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-black">1</span>
                  Hiệu ứng Glassmorphism & Bo góc
                </h4>
                <p className="text-slate-600 pl-6">
                  Toàn bộ khung giao diện chính được thiết kế bo cong đồng bộ <strong>10px (rounded-[10px])</strong> mang đến vẻ thanh lịch, hài hòa. Hiệu ứng mờ đục "kính mờ" (Glassmorphism) hòa quyện tuyệt vời với hình nền chuyển động nghệ thuật mà vẫn duy trì tính dễ đọc thông tin.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-extrabold text-slate-800 text-sm flex items-center gap-1.5 pb-1">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-black">2</span>
                  Đồng bộ đổi viền 3D tự động
                </h4>
                <p className="text-slate-600 pl-6">
                  Viền ngoài của trang web được lập trình chuyển sắc <strong>tự động sau mỗi 1 phút (60 giây)</strong> giúp kích hoạt sự tập trung, tăng cường trải nghiệm thị giác thú vị và đổi mới năng lượng tích cực suốt ngày làm việc.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-extrabold text-slate-800 text-sm flex items-center gap-1.5 pb-1">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-black">3</span>
                  Hình nền nghệ thuật đa dạng
                </h4>
                <p className="text-slate-600 pl-6">
                  Người dùng có thể lựa chọn 4 loại hình nền thích hợp tùy theo tâm trạng làm việc: ảnh phong cảnh tối giản tĩnh lặng, video động nghệ thuật tuần hoàn, dải màu gradient dốc đa chiều chuyển sắc, hoặc họa tiết chấm tối giản.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-extrabold text-slate-800 text-sm flex items-center gap-1.5 pb-1">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-black">4</span>
                  Khám phá các phân hệ OKRs & KPIs
                </h4>
                <p className="text-slate-600 pl-6">
                  Dễ dàng phối hợp giữa mục tiêu chiến lược <strong>OKRs</strong> của doanh nghiệp với các chỉ số đo lường hiệu suất thực tế <strong>KPIs</strong>, cùng phân rã sang các nhóm <strong>Dự án</strong> và <strong>Công việc</strong> của cá nhân.
                </p>
              </div>
            </div>

            <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100 flex items-start gap-2.5 mt-4">
              <Sparkles className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-extrabold text-indigo-800 mb-1">
                  Mẹo cấu hình tốt nhất
                </p>
                <p className="text-indigo-950 font-medium text-[11px]">
                  Nếu bạn lựa chọn hình nền <strong>Video nghệ thuật</strong> chuyển động, hãy đặt độ trong suốt của thẻ nội dung về khoảng <strong>80% - 90%</strong> để cảm nhận trọn vẹn vẻ dải hạt sáng lấp lánh và cát lún ngân hà.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
