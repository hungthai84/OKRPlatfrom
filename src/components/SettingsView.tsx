import React from 'react';
import { Sliders, Image, Film, Palette, Grid, Check, Heart, HelpCircle, FileText } from 'lucide-react';

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
  background: Wallpaper;
  setBackground: (bg: Wallpaper) => void;
};

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

export function SettingsView({ cardOpacity, setCardOpacity, background, setBackground }: SettingsViewProps) {
  
  const isSelected = (wp: Wallpaper) => {
    return background.type === wp.type && background.value === wp.value;
  };

  return (
    <div className="flex-1 overflow-auto p-6 space-y-8 select-none">
      
      {/* 1. CARD TRANSPARENCY SLIDER */}
      <div className="bg-white/90 backdrop-blur-md rounded-xl p-6 border border-gray-100 shadow-sm space-y-4">
        <div className="flex items-center space-x-3 text-gray-800">
          <div className="bg-blue-50 text-blue-600 p-2 rounded-lg">
            <Sliders size={20} />
          </div>
          <div>
            <h3 className="font-bold text-base">Độ trong suốt của thẻ nội dung</h3>
            <p className="text-xs text-gray-400">Điều chỉnh độ hiển thị mờ đục hoặc trong suốt của hộp chứa thông tin.</p>
          </div>
        </div>

        <div className="flex items-center space-x-6 pt-2">
          <input
            type="range"
            min="10"
            max="100"
            value={cardOpacity}
            onChange={(e) => setCardOpacity(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <div className="bg-blue-600 text-white font-bold px-3 py-1.5 rounded-lg text-sm shrink-0 shadow-sm">
            {cardOpacity}%
          </div>
        </div>
        <div className="text-xs text-gray-400 italic">
          * Thẻ nội dung được thiết kế nền màu trắng. Giảm độ phần trăm để nhìn thấy hình nền hoặc video động ở phía sau.
        </div>
      </div>

      {/* 2. BACKGROUND SELECTION AREA */}
      <div className="bg-white/90 backdrop-blur-md rounded-xl p-6 border border-gray-100 shadow-sm space-y-6">
        <div className="flex items-center space-x-3 text-gray-800 border-b border-gray-100 pb-4">
          <div className="bg-orange-50 text-orange-600 p-2 rounded-lg">
            <Palette size={20} />
          </div>
          <div>
            <h3 className="font-bold text-base">Cấu hình hình nền toàn trang</h3>
            <p className="text-xs text-gray-400">Thay đổi ảnh nền tĩnh, video nghệ thuật động, dải màu gradient hoặc họa tiết chấm.</p>
          </div>
        </div>

        {/* STATIC IMAGE WALLPAPERS */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2 text-sm font-bold text-gray-700">
            <Image size={16} className="text-blue-500" />
            <span>Hình nền Ảnh tĩnh (Image Wallpapers)</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {IMAGE_WALLPAPERS.map((wp, idx) => (
              <button
                key={idx}
                onClick={() => setBackground(wp)}
                className={`relative rounded-lg overflow-hidden h-20 border-2 transition-all group ${
                  isSelected(wp) ? 'border-blue-600 ring-2 ring-blue-600/30 scale-[0.98]' : 'border-transparent hover:border-gray-300'
                }`}
                title={wp.name}
              >
                <img src={wp.value} alt={wp.name} className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500" />
                <div className="absolute inset-x-0 bottom-0 bg-black/60 py-1 px-1.5 text-[9px] text-white truncate text-center font-medium">
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
        <div className="space-y-3 pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-2 text-sm font-bold text-gray-700">
            <Film size={16} className="text-orange-500" />
            <span>Hình nền Video nghệ thuật (Video Wallpapers)</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {VIDEO_WALLPAPERS.map((wp, idx) => (
              <button
                key={idx}
                onClick={() => setBackground(wp)}
                className={`relative rounded-lg overflow-hidden h-24 border-2 transition-all group ${
                  isSelected(wp) ? 'border-orange-500 ring-2 ring-orange-500/30 scale-[0.98]' : 'border-transparent hover:border-gray-300'
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
                {/* Visual marker of video */}
                <span className="absolute top-1.5 left-1.5 bg-black/60 rounded px-1 text-[8px] font-bold text-orange-400">
                  MOV
                </span>
                <div className="absolute inset-x-0 bottom-0 bg-black/60 py-1 px-1.5 text-[9px] text-white truncate text-center font-medium">
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
        <div className="space-y-3 pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-2 text-sm font-bold text-gray-700">
            <Palette size={16} className="text-pink-500" />
            <span>Hình nền Dải màu CSS (Gradient Wallpapers)</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {GRADIENT_WALLPAPERS.map((wp, idx) => (
              <button
                key={idx}
                onClick={() => setBackground(wp)}
                className={`relative rounded-lg overflow-hidden h-16 border-2 transition-all group ${
                  isSelected(wp) ? 'border-pink-500 ring-2 ring-pink-500/30 scale-[0.98]' : 'border-transparent hover:border-gray-300'
                }`}
                style={{ background: wp.value }}
                title={wp.name}
              >
                <div className="absolute inset-x-0 bottom-0 bg-black/40 py-1 px-1.5 text-[9px] text-white truncate text-center font-semibold">
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
        <div className="space-y-3 pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-2 text-sm font-bold text-gray-700">
            <Grid size={16} className="text-emerald-500" />
            <span>Hình nền Họa tiết đặc biệt (Custom Patterns)</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {PATTERN_WALLPAPERS.map((wp, idx) => (
              <button
                key={idx}
                onClick={() => setBackground(wp)}
                className={`relative rounded-lg overflow-hidden h-20 border-2 transition-all group ${
                  isSelected(wp) ? 'border-emerald-500 ring-2 ring-emerald-500/30 scale-[0.98]' : 'border-transparent hover:border-gray-300'
                }`}
                style={wp.style}
                title={wp.name}
              >
                <div className="absolute inset-x-0 bottom-0 bg-black/60 py-1 px-1.5 text-[9px] text-white truncate text-center font-semibold">
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
  );
}
