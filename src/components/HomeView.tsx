import React, { useState } from 'react';
import { 
  Home, 
  Target, 
  CheckSquare, 
  Calendar, 
  Award, 
  ArrowUpRight, 
  TrendingUp, 
  Heart, 
  BookOpen, 
  Filter, 
  Sparkles,
  Search,
  Bell,
  Activity
} from 'lucide-react';

type HomeViewProps = {
  onNavigate: (tab: string) => void;
  cardOpacity: number;
};

export function HomeView({ onNavigate, cardOpacity }: HomeViewProps) {
  const [filterType, setFilterType] = useState('Tất cả');
  const [showGuide, setShowGuide] = useState(false);

  const cardStyle = { 
    backgroundColor: 'rgba(255, 255, 255, 0.45)',
    backdropFilter: 'blur(12px)'
  };

  const quickStats = [
    { label: "OKRs cá nhân hoạt động", value: "8", icon: Target, color: "text-blue-500", bg: "bg-blue-50", tab: "Mục tiêu & Kết quả (OKRs)" },
    { label: "Chỉ số KPI vận hành", value: "5 chỉ số", icon: Activity, color: "text-cyan-500", bg: "bg-cyan-50", tab: "Chỉ số KPI" },
    { label: "Công việc cần làm", value: "14", icon: CheckSquare, color: "text-emerald-500", bg: "bg-emerald-50", tab: "Công việc" },
    { label: "Cuộc họp kế tiếp", value: "14:00", icon: Calendar, color: "text-purple-500", bg: "bg-purple-50", tab: "Cuộc họp" }
  ];

  const recentActivities = [
    { user: "Sarah Jenkins", action: "đã bình luận về Kết quả then chốt của bạn", target: "'Đóng 10 hợp đồng doanh nghiệp lớn'", time: "2 giờ trước" },
    { user: "Minh Trần", action: "đã nâng tiến độ lên 90% cho", target: "'Hoàn thành thử nghiệm bản Beta'", time: "4 giờ trước" },
    { user: "Hoàng Nguyễn", action: "đã gửi lời khen ngợi bạn về", target: "'Hợp tác xuất sắc & Tinh thần đồng đội'", time: "Hôm qua" }
  ];

  return (
    <div className="flex-1 overflow-auto p-6 space-y-6">
      
      {/* 7. BỐ CỤC TRANG NỘI DUNG: BANNER BO CONG 4 GÓC 10PX */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-800 to-slate-900 rounded-[10px] shadow-lg p-6 text-white relative overflow-hidden transition-all duration-300">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 z-10 relative">
          
          {/* Chứa Icon đại diện cho tiêu đề có hiệu ứng động & tiêu đề chính dưới có tiêu đề phụ */}
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center animate-bounce duration-1000">
              <Home size={28} className="text-orange-400 animate-pulse" />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Trang chủ quản trị</h2>
              <p className="text-xs text-blue-200">Chào mừng bạn trở lại, Roberto! Toàn hệ thống đang vận hành hoàn hảo.</p>
            </div>
          </div>

          {/* Nút Tài liệu hướng dẫn */}
          <div className="flex space-x-3 shrink-0">
            <button 
              onClick={() => setShowGuide(!showGuide)}
              className="bg-white/15 hover:bg-white/25 border border-white/20 transition-all font-bold text-xs px-4 py-2.5 rounded-lg flex items-center space-x-2 cursor-pointer shadow-md"
            >
              <BookOpen size={14} className="text-orange-400" />
              <span>Tài liệu hướng dẫn</span>
            </button>
            <button 
              onClick={() => onNavigate('Bảng điều khiển')}
              className="bg-orange-500 hover:bg-orange-600 transition-all font-bold text-xs px-4 py-2.5 rounded-lg flex items-center space-x-2 cursor-pointer shadow-md"
            >
              <Sparkles size={14} />
              <span>Phân tích hiệu suất</span>
            </button>
          </div>
        </div>

        {/* Banner chứa các nút tính năng như filter, nút tính năng */}
        <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-2 text-xs">
            <span className="text-blue-200">Phân loại dữ liệu:</span>
            {['Tất cả', 'Cá nhân', 'Nhóm', 'Công ty'].map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-3 py-1 rounded-full font-semibold transition-all ${
                  filterType === type 
                    ? 'bg-orange-500 text-white' 
                    : 'bg-white/10 text-gray-300 hover:bg-white/15'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm kiếm nhanh..."
                className="bg-white/10 border border-white/15 rounded-lg pl-8 pr-4 py-1.5 text-xs text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-orange-400"
              />
              <Search size={12} className="text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Quick Guide / Tài liệu hướng dẫn popup-like panel */}
      {showGuide && (
        <div className="p-5 rounded-[10px] border border-blue-200 bg-blue-50/95 shadow-md space-y-3 animate-in slide-in-from-top-4 duration-300">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-sm text-blue-900 flex items-center space-x-2">
              <BookOpen size={16} className="text-orange-500" />
              <span>Tài liệu hướng dẫn sử dụng nhanh (Power Service)</span>
            </h4>
            <button 
              onClick={() => setShowGuide(false)}
              className="text-xs text-blue-600 hover:underline font-bold"
            >
              Đóng hướng dẫn
            </button>
          </div>
          <p className="text-xs text-blue-800 leading-relaxed">
            Hệ thống quản trị hiệu suất Profit.co giúp bạn căn chỉnh các mục tiêu dài hạn (Objectives) và các kết quả cốt lõi (Key Results) của doanh nghiệp. Bạn có thể cập nhật kết quả hàng tuần, đánh giá hiệu suất của cấp dưới tại mục <strong>Hiệu suất</strong> và tùy biến giao diện trực quan trong phần <strong>Cài đặt</strong>.
          </p>
        </div>
      )}

      {/* Grid: Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat, i) => (
          <div 
            key={i} 
            onClick={() => onNavigate(stat.tab)}
            style={cardStyle}
            className="p-5 rounded-[10px] border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-between cursor-pointer group"
          >
            <div className="space-y-1">
              <span className="text-[11px] text-gray-500 font-bold uppercase tracking-wider block group-hover:text-blue-600 transition-colors">{stat.label}</span>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
            </div>
            <div className={`${stat.bg} ${stat.color} p-3 rounded-full shadow-inner transition-transform group-hover:scale-110`}>
              <stat.icon size={22} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side: Performance Hub & Activities */}
        <div className="lg:col-span-2 space-y-6">
          {/* Priority Tasks Card */}
          <div 
            style={cardStyle}
            className="p-5 rounded-[10px] border border-gray-100 shadow-sm space-y-4"
          >
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-gray-800 font-bold text-sm flex items-center space-x-2">
                <CheckSquare size={16} className="text-emerald-500" />
                <span>Công việc ưu tiên hàng đầu trong tuần</span>
              </h3>
              <span className="text-xs text-blue-600 hover:underline cursor-pointer font-bold" onClick={() => onNavigate('Công việc')}>Xem tất cả</span>
            </div>
            
            <div className="divide-y divide-gray-100">
              <div className="py-3 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer" />
                  <span className="text-xs text-gray-700 font-medium">Nộp bản tự đánh giá hiệu suất làm việc quý 3</span>
                </div>
                <span className="text-[10px] bg-red-100 text-red-700 px-2.5 py-0.5 rounded-full font-bold">Quan trọng</span>
              </div>
              <div className="py-3 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer" />
                  <span className="text-xs text-gray-700 font-medium">Thống nhất kết quả với các Trưởng nhóm Kỹ thuật</span>
                </div>
                <span className="text-[10px] bg-amber-100 text-amber-700 px-2.5 py-0.5 rounded-full font-bold">Trung bình</span>
              </div>
              <div className="py-3 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer" />
                  <span className="text-xs text-gray-700 font-medium">Lên kế hoạch tổ chức hội thảo căn chỉnh OKR quý mới</span>
                </div>
                <span className="text-[10px] bg-blue-100 text-blue-700 px-2.5 py-0.5 rounded-full font-bold">Thấp</span>
              </div>
            </div>
          </div>

          {/* Activity Feed */}
          <div 
            style={cardStyle}
            className="p-5 rounded-[10px] border border-gray-100 shadow-sm space-y-4"
          >
            <h3 className="text-gray-800 font-bold text-sm flex items-center space-x-2">
              <TrendingUp size={16} className="text-blue-500" />
              <span>Cập nhật hoạt động từ nhóm của bạn</span>
            </h3>
            <div className="space-y-4">
              {recentActivities.map((act, idx) => (
                <div key={idx} className="flex items-start space-x-3 text-xs border-b border-gray-50 pb-3 last:border-b-0 last:pb-0">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center font-bold text-xs text-white shrink-0 shadow-sm">
                    {act.user.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-700 leading-relaxed">
                      <span className="font-bold text-gray-900">{act.user}</span> {act.action} <span className="font-semibold text-blue-600">{act.target}</span>
                    </p>
                    <span className="text-[10px] text-gray-400 mt-0.5 block">{act.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Quick Recognition & Stats */}
        <div className="space-y-6">
          <div 
            style={cardStyle}
            className="p-5 rounded-[10px] border border-gray-100 shadow-sm space-y-4"
          >
            <h3 className="text-gray-800 font-bold text-sm flex items-center space-x-2">
              <Award size={16} className="text-amber-500" />
              <span>Gửi lời khen ngợi đồng nghiệp</span>
            </h3>
            <p className="text-[11px] text-gray-400 leading-relaxed">Tuyên dương những đóng góp xuất sắc của đồng nghiệp để gắn kết văn hóa doanh nghiệp vững mạnh.</p>
            
            <div className="space-y-3">
              <input 
                type="text" 
                placeholder="Ai là người bạn muốn vinh danh?" 
                className="w-full text-xs border border-gray-200 rounded-lg px-3 py-2 bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <textarea 
                placeholder="Nội dung tuyên dương xuất sắc..." 
                rows={3}
                className="w-full text-xs border border-gray-200 rounded-lg px-3 py-2 bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              ></textarea>
              <button 
                type="button"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs py-2.5 rounded-lg transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-md"
              >
                <Heart size={12} className="fill-current text-white" />
                <span>Gửi khen ngợi ngay</span>
              </button>
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-50/90 to-blue-50/90 backdrop-blur-md p-5 rounded-[10px] border border-indigo-100 shadow-sm space-y-3">
            <div className="flex items-center space-x-2 text-indigo-700">
              <TrendingUp size={18} className="animate-pulse" />
              <h4 className="font-bold text-sm">Căn chỉnh chiến lược</h4>
            </div>
            <p className="text-xs text-indigo-900 leading-relaxed">
              Chúng tôi kết nối 100% công việc hàng ngày với tiến độ thực tế để tối đa hóa hiệu suất toàn tổ chức.
            </p>
            <div className="pt-2 border-t border-indigo-100/50 flex justify-between text-xs font-bold text-indigo-700">
              <span>96% Căn chỉnh</span>
              <span className="cursor-pointer hover:underline" onClick={() => onNavigate('Lộ trình chiến lược')}>Lộ trình →</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
