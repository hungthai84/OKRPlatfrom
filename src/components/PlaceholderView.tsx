import React, { useState } from 'react';
import { 
  Target, 
  LayoutDashboard, 
  Map, 
  Flag, 
  Activity, 
  CheckSquare, 
  Calendar, 
  Award, 
  ClipboardList, 
  Briefcase, 
  FileText, 
  FileBarChart, 
  Settings, 
  ArrowUpRight,
  BookOpen,
  Users,
  Search,
  UserCheck
} from 'lucide-react';

type PlaceholderViewProps = {
  tabName: string;
  cardOpacity: number;
};

const TAB_METADATA: Record<string, { desc: string, icon: any, stats: { l: string, v: string }[] }> = {
  'Bảng điểm cân bằng': {
    desc: 'Đánh giá hiệu suất chiến lược thông qua các khía cạnh tài chính, khách hàng, quy trình nội bộ, và học hỏi & phát triển.',
    icon: LayoutDashboard,
    stats: [
      { l: 'Chỉ số tài chính', v: '92.4' },
      { l: 'Điểm NPS khách hàng', v: '78' },
      { l: 'Hiệu suất quy trình', v: '88%' }
    ]
  },
  'Lộ trình chiến lược': {
    desc: 'Trực quan hóa và căn chỉnh chiến lược dài hạn, mốc thời gian thực hiện và các sáng kiến cốt lõi của doanh nghiệp.',
    icon: Map,
    stats: [
      { l: 'Sáng kiến hoạt động', v: '5' },
      { l: 'Mốc mốc hoàn thành', v: '18' },
      { l: 'Phân bổ nguồn lực', v: '94%' }
    ]
  },
  'Mục tiêu & Kết quả (OKRs)': {
    desc: 'Mục tiêu cấp công ty, phòng ban và cá nhân được căn chỉnh trực tiếp với các chỉ tiêu định lượng có thể đo lường.',
    icon: Target,
    stats: [
      { l: 'OKRs công ty', v: '12' },
      { l: 'OKRs phòng ban', v: '42' },
      { l: 'OKRs cá nhân', v: '8' }
    ]
  },
  'Mục tiêu phát triển': {
    desc: 'Thiết lập và giám sát các chỉ tiêu số lượng dài hạn, thành tích hoạt động quan trọng và các cột mốc ý nghĩa.',
    icon: Flag,
    stats: [
      { l: 'Mục tiêu hoạt động', v: '538' },
      { l: 'Mục tiêu rủi ro', v: '51' },
      { l: 'Tỷ lệ hoàn thành', v: '84.6%' }
    ]
  },
  'Chỉ số KPI': {
    desc: 'Theo dõi các chỉ số vận hành chính, hiệu suất kinh doanh, điểm chuẩn hiệu quả và ngưỡng cam kết SLA thời gian thực.',
    icon: Activity,
    stats: [
      { l: 'Chỉ số theo dõi', v: '24' },
      { l: 'Trạng thái cảnh báo', v: '2' },
      { l: 'Tỷ lệ SLA trung bình', v: '99.8%' }
    ]
  },
  'Công việc': {
    desc: 'Quản lý và ưu tiên các công việc hàng tuần, nhiệm vụ giao phó và tiến độ hành động liên kết trực tiếp với các Kết quả then chốt.',
    icon: CheckSquare,
    stats: [
      { l: 'Được giao cho tôi', v: '14' },
      { l: 'Hạn chót hôm nay', v: '2' },
      { l: 'Đã hoàn tất', v: '89' }
    ]
  },
  'Cuộc họp': {
    desc: 'Lên lịch trình và lưu trữ biên bản các cuộc họp 1-1, đồng bộ hóa hiệu suất tuần, đánh giá quý và họp căn chỉnh mục tiêu.',
    icon: Calendar,
    stats: [
      { l: 'Cuộc họp tiếp theo', v: '14:00' },
      { l: 'Đã họp tuần này', v: '6' },
      { l: 'Ý kiến đóng góp', v: '4' }
    ]
  },
  'Ghi nhận & Khen thưởng': {
    desc: 'Vinh danh những đóng góp xuất sắc, thể hiện sự trân trọng đồng nghiệp và xây dựng văn hóa làm việc tích cực gắn kết giá trị cốt lõi.',
    icon: Award,
    stats: [
      { l: 'Điểm nhận được', v: '240' },
      { l: 'Điểm có sẵn để tặng', v: '500' },
      { l: 'Đồng nghiệp vinh danh', v: '8' }
    ]
  },
  'Khảo sát ý kiến': {
    desc: 'Tương tác thông qua các biểu khảo sát phản hồi của nhân viên, câu hỏi định kỳ, chỉ số hài lòng và đo lường eNPS nhóm.',
    icon: ClipboardList,
    stats: [
      { l: 'Khảo sát chờ trả lời', v: '1' },
      { l: 'Tỷ lệ tham gia trước', v: '100%' },
      { l: 'Điểm eNPS hiện tại', v: '45' }
    ]
  },
  'Danh mục & Dự án': {
    desc: 'Giám sát các danh mục đầu tư chiến lược, trạng thái dự án đầu tư lớn, phân chia nhiệm vụ vận hành và quản trị tiến độ.',
    icon: Briefcase,
    stats: [
      { l: 'Danh mục hoạt động', v: '3' },
      { l: 'Sức khỏe ngân sách', v: '98%' },
      { l: 'Bàn giao đúng hạn', v: '91.2%' }
    ]
  },
  'Ghi chú cá nhân': {
    desc: 'Soạn thảo và lưu trữ các ý tưởng cá nhân, nhiệm vụ nhanh, lời nhắc nhở, biên bản tóm tắt ý kiến và chương trình cuộc họp.',
    icon: FileText,
    stats: [
      { l: 'Ghi chú cá nhân', v: '16' },
      { l: 'Bản thảo chia sẻ', v: '4' },
      { l: 'Cập nhật mới nhất', v: 'Hôm nay' }
    ]
  },
  'Báo cáo phân tích': {
    desc: 'Kết xuất báo cáo phân tích toàn diện, dashboard báo cáo ban điều hành, tổng hợp tuân thủ và nhật ký lịch sử hoạt động.',
    icon: FileBarChart,
    stats: [
      { l: 'Mẫu báo cáo sẵn có', v: '18' },
      { l: 'Lịch xuất báo cáo tự động', v: '4' },
      { l: 'Dung lượng lưu trữ', v: '12%' }
    ]
  },
  // Sub-items for 'Hiệu suất'
  'Quản trị nhân sự': {
    desc: 'Theo dõi tổng quan cơ cấu tổ chức, phân bổ nhân sự, quản trị lộ trình thăng tiến và định mức năng lực nhân sự.',
    icon: Users,
    stats: [
      { l: 'Tổng số nhân viên', v: '120' },
      { l: 'Phòng ban vận hành', v: '8' },
      { l: 'Tỷ lệ nhân lực trống', v: '2.4%' }
    ]
  },
  'Đánh giá': {
    desc: 'Thực hiện đánh giá hiệu suất định kỳ (Review), quy trình tự đánh giá cá nhân và đánh giá 360 độ từ đồng nghiệp.',
    icon: UserCheck,
    stats: [
      { l: 'Đợt đánh giá kế tiếp', v: 'Qúy 3' },
      { l: 'Tự đánh giá', v: 'Hoàn thành' },
      { l: 'Đồng nghiệp đánh giá', v: '2/3' }
    ]
  },
  'Hiệu chuẩn': {
    desc: 'Đồng bộ hóa các kết quả đánh giá năng lực, thảo luận và phê duyệt điểm số hiệu chuẩn đồng đều giữa các nhóm.',
    icon: Settings,
    stats: [
      { l: 'Lớp hiệu chuẩn', v: '2' },
      { l: 'Trạng thái đồng thuận', v: '94%' },
      { l: 'Ngày họp', v: '15/07' }
    ]
  },
  'Mục tiêu cá nhân': {
    desc: 'Thiết lập mục tiêu phát triển năng lực cá nhân, rèn luyện kỹ năng mềm và cải tiến chuyên môn nghề nghiệp.',
    icon: Flag,
    stats: [
      { l: 'Mục tiêu cá nhân', v: '4' },
      { l: 'Đã hoàn thành', v: '2' },
      { l: 'Đang theo học', v: '2' }
    ]
  },
  'Kế hoạch phát triển': {
    desc: 'Xây dựng kế hoạch đào tạo cá nhân hóa, các khóa học kỹ năng cốt lõi và lộ trình phát triển sự nghiệp dài hạn.',
    icon: ClipboardList,
    stats: [
      { l: 'Khóa đào tạo hoạt động', v: '3' },
      { l: 'Chứng chỉ đạt được', v: '8' },
      { l: 'Giờ học tích lũy', v: '42h' }
    ]
  }
};

export function PlaceholderView({ tabName, cardOpacity }: PlaceholderViewProps) {
  const [showGuide, setShowGuide] = useState(false);

  const meta = TAB_METADATA[tabName] || {
    desc: 'Xem và giám sát các thông tin chi tiết, số liệu hoạt động cũng như vận hành cho danh mục quản lý này.',
    icon: Target,
    stats: [
      { l: 'Số lượng hoạt động', v: '12' },
      { l: 'Chỉ số vận hành', v: 'Khỏe mạnh' },
      { l: 'Cập nhật mới nhất', v: 'Vừa xong' }
    ]
  };

  const Icon = meta.icon;

  const cardStyle = { 
    backgroundColor: 'rgba(255, 255, 255, 0.45)',
    backdropFilter: 'blur(12px)'
  };

  return (
    <div className="flex-1 overflow-auto p-6 space-y-6 flex flex-col select-none">
      
      {/* 7. BỐ CỤC TRANG NỘI DUNG: BANNER BO CONG 4 GÓC 10PX */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-800 to-slate-900 rounded-[10px] shadow-lg p-6 text-white relative overflow-hidden transition-all duration-300 shrink-0">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 z-10 relative">
          
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center animate-pulse">
              <Icon size={26} className="text-orange-400 hover:rotate-12 transition-transform duration-300" />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">{tabName}</h2>
              <p className="text-xs text-blue-200">Bảng điều khiển và danh sách hoạt động chính liên quan đến {tabName}.</p>
            </div>
          </div>

          <div className="flex space-x-3 shrink-0">
            <button 
              onClick={() => setShowGuide(!showGuide)}
              className="bg-white/15 hover:bg-white/25 border border-white/20 transition-all font-bold text-xs px-4 py-2.5 rounded-lg flex items-center space-x-2 cursor-pointer shadow-md"
            >
              <BookOpen size={14} className="text-orange-400" />
              <span>Tài liệu hướng dẫn</span>
            </button>
            <button 
              className="bg-orange-500 hover:bg-orange-600 transition-all font-bold text-xs px-4 py-2.5 rounded-lg flex items-center space-x-2 cursor-pointer shadow-md"
            >
              <ArrowUpRight size={14} />
              <span>Thiết lập {tabName}</span>
            </button>
          </div>
        </div>

        
      </div>

      {/* Sub-navigation Tabs */}
      <div className="flex border-b border-gray-200 dark:border-slate-800 mb-2 bg-white dark:bg-slate-900 rounded-xl p-1.5 shadow-sm border shrink-0">
        <div className="flex flex-wrap items-center justify-between gap-4 w-full px-2 py-1">
          
          <div className="flex space-x-6 text-sm font-semibold">
            <div className="pb-1 border-b-2 border-orange-500 text-slate-800 dark:text-slate-200 cursor-pointer">
              <span>Tổng quan số liệu</span>
            </div>
            <div className="pb-1 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:text-slate-200 cursor-pointer transition-colors">
              <span>Cấu hình quy chuẩn</span>
            </div>
          </div>
        
        </div>
      </div>


      {showGuide && (
        <div className="p-5 rounded-[10px] border border-blue-200 bg-blue-50/95 shadow-md space-y-3 animate-in slide-in-from-top-4 duration-300">
          <h4 className="font-bold text-sm text-blue-900 flex items-center space-x-2">
            <BookOpen size={16} className="text-orange-500" />
            <span>Hướng dẫn về {tabName}</span>
          </h4>
          <p className="text-xs text-blue-800 leading-relaxed">
            Mục này lưu giữ các thông tin cốt lõi hỗ trợ việc quản trị mục tiêu {tabName}. Bạn có thể thay đổi các tham số đo lường, xuất file PDF/Excel báo cáo, hoặc tùy chỉnh cấu hình phân vai thông qua tài liệu hướng dẫn.
          </p>
        </div>
      )}

      {/* Main Card Content */}
      <div 
        style={cardStyle}
        className="flex-1 rounded-[10px] border border-gray-100 shadow-sm p-8 flex flex-col items-center justify-center space-y-6 transition-all duration-300"
      >
        <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shadow-inner">
          <Icon size={32} />
        </div>
        
        <div className="space-y-2 text-center">
          <h2 className="text-xl font-bold text-gray-800">{tabName}</h2>
          <p className="text-xs text-gray-500 leading-relaxed max-w-lg mx-auto">{meta.desc}</p>
        </div>

        {/* Dynamic Metric Boxes */}
        <div className="grid grid-cols-3 gap-8 pt-6 border-t border-gray-100 w-full max-w-md">
          {meta.stats.map((stat, i) => (
            <div key={i} className="text-center">
              <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">{stat.l}</span>
              <span className="block text-lg font-bold text-gray-800 mt-1">{stat.v}</span>
            </div>
          ))}
        </div>

        <div className="pt-4">
          <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs px-5 py-2.5 rounded-lg shadow-md transition-all inline-flex items-center space-x-1.5 cursor-pointer">
            <span>Thiết lập {tabName} ngay</span>
            <ArrowUpRight size={14} />
          </button>
        </div>
      </div>

    </div>
  );
}
