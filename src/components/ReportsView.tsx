import React, { useState } from 'react';
import { 
  FileBarChart, 
  Search, 
  Calendar, 
  Printer, 
  Download, 
  Sparkles, 
  CheckCircle, 
  TrendingUp, 
  AlertTriangle, 
  X,
  Target,
  BarChart3,
  GitFork,
  Activity,
  Layers,
  ChevronRight,
  ShieldAlert,
  Percent
} from 'lucide-react';
import { cn } from '../lib/utils';
import { ResponsiveContainer, BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export interface ReportCard {
  id: string;
  title: string;
  description: string;
  category: 'OKR' | 'KPI' | 'Task' | 'Audit';
  metric: string;
  trend: 'up' | 'down' | 'stable';
  trendValue: string;
}

const INITIAL_REPORTS: ReportCard[] = [
  {
    id: 'rep-1',
    title: 'Báo cáo Tiến độ hoàn thành OKRs Doanh nghiệp',
    description: 'Phân tích tổng hợp tỷ lệ hoàn thành mục tiêu chiến lược ở cấp độ toàn công ty và các phòng ban liên quan.',
    category: 'OKR',
    metric: 'Độ hoàn thành: 82%',
    trend: 'up',
    trendValue: '+4.2%'
  },
  {
    id: 'rep-2',
    title: 'Báo cáo Sức khỏe Chỉ số KPI Vận hành',
    description: 'Bản đồ trực quan hóa tỉ lệ KPIs đạt trạng thái tối ưu (Xanh lá) song song với các chỉ số đang ở trạng thái rủi ro.',
    category: 'KPI',
    metric: 'Chỉ số tốt: 89%',
    trend: 'up',
    trendValue: '+2.1%'
  },
  {
    id: 'rep-3',
    title: 'Báo cáo Tần suất Check-in & Cập nhật Tiến độ',
    description: 'Báo cáo tính chủ động và kỷ luật check-in mục tiêu định kỳ của nhân sự toàn chuỗi Power Service.',
    category: 'Audit',
    metric: 'Tần suất: 4.8 lần/tháng',
    trend: 'stable',
    trendValue: 'Duy trì đều'
  },
  {
    id: 'rep-4',
    title: 'Báo cáo Hiệu suất giải quyết Công việc',
    description: 'Kiểm toán tiến độ đóng task, xử lý công việc liên kết trực tiếp tới các kết quả then chốt (KRs) của dự án.',
    category: 'Task',
    metric: 'Task đúng hạn: 94%',
    trend: 'up',
    trendValue: '+1.5%'
  },
  {
    id: 'rep-5',
    title: 'Báo cáo Phân phối Cấp bậc & Sơ đồ dòng thác',
    description: 'Tổng kiểm tra phân bố mục tiêu liên kết đa tầng giữa cấp Tập đoàn, Cấp bộ phận và các cá nhân độc lập.',
    category: 'OKR',
    metric: 'Độ liên kết: 100%',
    trend: 'stable',
    trendValue: 'Hoàn chỉnh'
  }
];

const DISTRIBUTION_DATA = [
  { name: 'Sales & BD', OKRs: 85, KPIs: 78, Tasks: 90 },
  { name: 'Tech & Eng', OKRs: 92, KPIs: 88, Tasks: 95 },
  { name: 'Customer Exp', OKRs: 78, KPIs: 84, Tasks: 91 },
  { name: 'Finance', OKRs: 70, KPIs: 75, Tasks: 80 }
];

export function ReportsView({ cardOpacity }: { cardOpacity: number }) {
  const [reports, setReports] = useState<ReportCard[]>(INITIAL_REPORTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [quarterFilter, setQuarterFilter] = useState('Q2 2026');

  const filteredReports = reports.filter(r => {
    const matchesSearch = r.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          r.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || r.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const getCategoryBadge = (cat: ReportCard['category']) => {
    switch (cat) {
      case 'OKR': return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'KPI': return 'bg-purple-50 text-purple-600 border-purple-100';
      case 'Task': return 'bg-sky-50 text-sky-600 border-sky-100';
      case 'Audit': return 'bg-amber-50 text-amber-600 border-amber-100';
    }
  };

  const cardStyle = { 
    backgroundColor: 'rgba(255, 255, 255, 0.45)',
    backdropFilter: 'blur(12px)'
  };

  const handleExportMock = (title: string, type: 'PDF' | 'CSV') => {
    alert(`Đang khởi tạo hệ thống xuất báo cáo dữ liệu lớn...\nBản báo cáo "${title}" định dạng ${type} đang được đóng gói tự động và sẽ gửi về email quản trị trong ít giây.`);
  };

  return (
    <div className="flex-1 overflow-auto p-6 space-y-6 flex flex-col select-none">
      
      {/* 1. HEADER GRADIENT BANNER */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-800 to-slate-900 rounded-[10px] shadow-lg p-6 text-white relative overflow-hidden transition-all duration-300 shrink-0">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 z-10 relative">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center animate-pulse">
              <FileBarChart size={26} className="text-orange-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Trung tâm Báo cáo Chiến lược (Reports)</h2>
              <p className="text-xs text-blue-200">
                Xuất bản các phân tích tổng hợp trực quan về tiến trình OKRs, KPIs và tình trạng thực thi toàn doanh nghiệp giống Profit.co.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 flex-wrap">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60" size={14} />
              <input
                type="text"
                placeholder="Tìm tiêu đề báo cáo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 pr-4 py-1.5 text-xs bg-white/10 hover:bg-white/15 focus:bg-white/20 border border-white/20 rounded-lg focus:outline-none text-white placeholder-white/60 w-[200px] font-medium transition-all"
              />
            </div>
          </div>
        </div>

        {/* SUB NAVIGATION TABS */}
        
      </div>

      {/* Sub-navigation Tabs */}
      <div className="flex border-b border-gray-200 dark:border-slate-800 mb-2 bg-white dark:bg-slate-900 rounded-xl p-1.5 shadow-sm border shrink-0">
        <div className="flex flex-wrap items-center justify-between gap-4 w-full px-2 py-1">
          
          <div className="flex space-x-6 text-sm font-semibold">
            <button className="pb-1 border-b-2 border-orange-500 text-slate-800 dark:text-slate-200 font-bold cursor-pointer transition-all">
              Báo cáo hiệu suất định kỳ ({filteredReports.length})
            </button>
          </div>
        
        </div>
      </div>


      {/* 2. STATS & ANALYTIC CHART SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 shrink-0">
        
        {/* Left/Middle: BarChart of department distribution */}
        <div style={cardStyle} className="lg:col-span-2 rounded-[10px] border border-slate-200/60 p-5 shadow-sm space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-slate-100">
            <div>
              <h3 className="text-xs font-black uppercase text-slate-500 tracking-wider">Hiệu suất Phân phối Phòng ban</h3>
              <p className="text-[11px] text-slate-400 mt-0.5">Thống kê so sánh chỉ số giữa các đơn vị nghiệp vụ trong Quý hiện tại.</p>
            </div>

            {/* Quarter Filter */}
            <select 
              value={quarterFilter} 
              onChange={(e) => setQuarterFilter(e.target.value)}
              className="px-3 py-1 bg-slate-100 border border-slate-200 rounded-lg text-[10px] font-black text-slate-600 focus:outline-none cursor-pointer"
            >
              <option value="Q1 2026">Quý I / 2026</option>
              <option value="Q2 2026">Quý II / 2026 (Hiện tại)</option>
              <option value="Q3 2026">Quý III / 2026</option>
              <option value="Q4 2026">Quý IV / 2026</option>
            </select>
          </div>

          <div className="h-56 w-full text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={DISTRIBUTION_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} />
                <YAxis stroke="#94a3b8" fontSize={10} />
                <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '8px' }} />
                <Legend iconSize={8} iconType="circle" wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }} />
                <Bar dataKey="OKRs" fill="#3b82f6" name="Mục tiêu OKRs (%)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="KPIs" fill="#8b5cf6" name="Chỉ số KPIs (%)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Tasks" fill="#0ea5e9" name="Công việc (%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right: Profit.co standard explanation box */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 text-white rounded-2xl p-5 flex flex-col justify-between shadow-md border border-slate-700">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Sparkles size={16} className="text-amber-400 animate-pulse" />
              <span className="text-[10px] font-black tracking-widest text-amber-400 uppercase">Quy chuẩn Báo cáo</span>
            </div>
            <h4 className="text-xs font-extrabold">Tính đồng bộ dữ liệu cấp thời</h4>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              Hệ thống kết xuất báo cáo tự động kéo dữ liệu từ các chu kỳ check-in, lịch sử hoàn thành công việc liên kết của nhân viên, giúp nhà lãnh đạo có cái nhìn đa chiều về sức khỏe thực thi chiến lược.
            </p>
          </div>

          <div className="bg-slate-700/45 p-3 rounded-xl space-y-2 mt-4 text-[10px]">
            <div className="flex justify-between items-center text-slate-300">
              <span>Độ tin cậy dữ liệu</span>
              <span className="font-mono text-emerald-400 font-bold">● 100% Khớp</span>
            </div>
            <div className="w-full bg-slate-600 h-1 rounded-full overflow-hidden">
              <div className="bg-emerald-400 h-full w-[100%]" />
            </div>
          </div>
        </div>

      </div>

      {/* 3. DETAILED REPORT CATEGORIES & REPORTS GRID */}
      <div className="space-y-4">
        
        {/* Filter Categories Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div className="flex items-center space-x-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200">
            {['All', 'OKR', 'KPI', 'Task', 'Audit'].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={cn(
                  "px-3 py-1.5 text-[10px] font-black rounded-md transition-all cursor-pointer uppercase tracking-wider",
                  categoryFilter === cat ? "bg-white text-slate-800 shadow-sm" : "text-slate-500 hover:text-slate-800"
                )}
              >
                {cat === 'All' ? 'Tất cả báo cáo' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Reports Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReports.map((report) => (
            <div 
              key={report.id} 
              style={cardStyle} 
              className="rounded-[10px] border border-slate-200/60 p-5 shadow-sm flex flex-col justify-between space-y-4 hover:scale-[1.01] transition-all duration-200"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={cn("px-2 py-0.5 rounded-full border text-[9px] font-black uppercase tracking-wider", getCategoryBadge(report.category))}>
                    Phân nhóm {report.category}
                  </span>
                  <div className="flex items-center space-x-1.5 text-[10px] text-emerald-600 font-bold">
                    <TrendingUp size={11} />
                    <span>{report.trendValue}</span>
                  </div>
                </div>

                <h4 className="text-sm font-black text-slate-800 leading-snug">{report.title}</h4>
                <p className="text-xs text-slate-400 font-medium leading-relaxed">{report.description}</p>
              </div>

              {/* Action and metric */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <span className="font-black text-indigo-600 bg-indigo-50/50 px-2.5 py-1 rounded">
                    {report.metric}
                  </span>
                </div>

                <div className="flex items-center space-x-1.5 shrink-0">
                  <button 
                    onClick={() => handleExportMock(report.title, 'PDF')}
                    className="p-1.5 bg-slate-100 hover:bg-slate-200 rounded text-slate-600 cursor-pointer transition-all"
                    title="Xuất định dạng PDF"
                  >
                    <Download size={13} />
                  </button>
                  <button 
                    onClick={() => handleExportMock(report.title, 'CSV')}
                    className="p-1.5 bg-slate-100 hover:bg-slate-200 rounded text-slate-600 cursor-pointer transition-all"
                    title="In bản cứng"
                  >
                    <Printer size={13} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
}
