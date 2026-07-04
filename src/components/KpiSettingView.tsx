import React, { useState } from 'react';
import { 
  Activity, 
  Plus, 
  Search, 
  Filter, 
  TrendingUp, 
  TrendingDown, 
  Check, 
  Trash2, 
  AlertCircle, 
  Clock, 
  User, 
  Settings, 
  CheckSquare, 
  Sparkles, 
  Info, 
  Layers, 
  HelpCircle, 
  BarChart2, 
  ChevronRight, 
  Bookmark, 
  GitCommit, 
  Target,
  ArrowUpRight,
  RefreshCw,
  Award
} from 'lucide-react';
import { cn } from '../lib/utils';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell, Legend } from 'recharts';

export type KpiTargetType = 'higher_better' | 'lower_better' | 'maintain_range';
export type KpiFrequency = 'weekly' | 'monthly' | 'quarterly' | 'yearly';
export type KpiCategory = 'Finance' | 'Sales' | 'Marketing' | 'HR' | 'Operations' | 'Engineering';
export type KpiStatus = 'Excellent' | 'On Track' | 'At Risk' | 'Off Track';

export interface KpiHistoryItem {
  id: string;
  date: string;
  value: number;
  note: string;
  author: string;
}

export interface KpiItem {
  id: string;
  code: string;
  name: string;
  description: string;
  category: KpiCategory;
  department: string;
  frequency: KpiFrequency;
  unit: string;
  targetType: KpiTargetType;
  
  // Target limits
  startValue: number;
  targetValue: number;
  currentValue: number;
  warnThreshold: number; // Below this/above this is At Risk
  critThreshold: number; // Below this/above this is Off Track
  
  ownerName: string;
  ownerAvatar: string;
  linkedOkrId?: string;
  linkedOkrName?: string;
  history: KpiHistoryItem[];
}

// Initial mockup data aligned with standard Profit.co dashboards
const INITIAL_KPIS: KpiItem[] = [
  {
    id: 'kpi-1',
    code: 'KPI-FIN-01',
    name: 'Doanh thu định kỳ hàng tháng (MRR)',
    description: 'Tổng doanh thu đăng ký sử dụng dịch vụ được ghi nhận hàng tháng.',
    category: 'Finance',
    department: 'Ban Tài chính',
    frequency: 'monthly',
    unit: 'USD',
    targetType: 'higher_better',
    startValue: 60000,
    targetValue: 120000,
    currentValue: 95000,
    warnThreshold: 90000,
    critThreshold: 80000,
    ownerName: 'Roberto Canevari',
    ownerAvatar: 'https://i.pravatar.cc/150?u=roberto',
    linkedOkrId: 'obj-1',
    linkedOkrName: 'Tăng trưởng doanh thu Quý 3 thêm 20%',
    history: [
      { id: 'h-1-1', date: '2026-04-30', value: 72000, note: 'Doanh thu tăng trưởng ổn định từ tệp khách hàng SME.', author: 'Roberto Canevari' },
      { id: 'h-1-2', date: '2026-05-31', value: 85000, note: 'Có thêm 3 hợp đồng Enterprise lớn được kích hoạt.', author: 'Roberto Canevari' },
      { id: 'h-1-3', date: '2026-06-30', value: 95000, note: 'Khép lại tháng 6 với kết quả vượt kỳ vọng.', author: 'Roberto Canevari' }
    ]
  },
  {
    id: 'kpi-2',
    code: 'KPI-SLS-02',
    name: 'Tỷ lệ chuyển đổi khách hàng tiềm năng (Win Rate)',
    description: 'Tỷ lệ phần trăm cơ hội bán hàng chuyển đổi thành hợp đồng thành công.',
    category: 'Sales',
    department: 'Phòng Kinh doanh',
    frequency: 'weekly',
    unit: '%',
    targetType: 'higher_better',
    startValue: 10,
    targetValue: 25,
    currentValue: 18,
    warnThreshold: 20,
    critThreshold: 15,
    ownerName: 'Alice Nguyen',
    ownerAvatar: 'https://i.pravatar.cc/150?u=alice',
    linkedOkrId: 'obj-1',
    linkedOkrName: 'Tăng trưởng doanh thu Quý 3 thêm 20%',
    history: [
      { id: 'h-2-1', date: '2026-06-07', value: 12, note: 'Đầu tháng tỷ lệ chuyển đổi còn thấp do thiếu chiến dịch marketing hỗ trợ.', author: 'Alice Nguyen' },
      { id: 'h-2-2', date: '2026-06-14', value: 15, note: 'Cải thiện kỹ năng telesales và tư vấn sâu.', author: 'Alice Nguyen' },
      { id: 'h-2-3', date: '2026-06-21', value: 16, note: 'Duy trì chăm sóc khách hàng VIP chu đáo.', author: 'Alice Nguyen' },
      { id: 'h-2-4', date: '2026-06-28', value: 18, note: 'Ký được một vài hợp đồng bổ sung hữu ích.', author: 'Alice Nguyen' }
    ]
  },
  {
    id: 'kpi-3',
    code: 'KPI-ENG-03',
    name: 'Thời gian phản hồi API trung bình (Avg Response Time)',
    description: 'Đo lường tốc độ phản hồi trung bình của hệ thống API (Càng thấp càng tốt).',
    category: 'Engineering',
    department: 'Phòng Công nghệ',
    frequency: 'weekly',
    unit: 'ms',
    targetType: 'lower_better',
    startValue: 400,
    targetValue: 200,
    currentValue: 240,
    warnThreshold: 280, // For lower_better, warn is above this
    critThreshold: 350, // and crit is above this
    ownerName: 'David Tran',
    ownerAvatar: 'https://i.pravatar.cc/150?u=david',
    linkedOkrId: 'obj-2',
    linkedOkrName: 'Ra mắt ứng dụng di động phiên bản 3.0 đúng hạn',
    history: [
      { id: 'h-3-1', date: '2026-06-05', value: 380, note: 'Bắt đầu tối ưu hóa database index.', author: 'David Tran' },
      { id: 'h-3-2', date: '2026-06-12', value: 310, note: 'Áp dụng bộ nhớ đệm Redis cho các truy vấn phổ biến.', author: 'David Tran' },
      { id: 'h-3-3', date: '2026-06-19', value: 260, note: 'Tái cấu trúc luồng xử lý đồng thời.', author: 'David Tran' },
      { id: 'h-3-4', date: '2026-06-26', value: 240, note: 'Tiếp tục tinh chỉnh CDN và nén tệp truyền tải dữ liệu.', author: 'David Tran' }
    ]
  },
  {
    id: 'kpi-4',
    code: 'KPI-OPS-04',
    name: 'Chỉ số khách hàng hài lòng (NPS Score)',
    description: 'Mức độ sẵn sàng giới thiệu sản phẩm/dịch vụ của khách hàng cho người khác.',
    category: 'Operations',
    department: 'Chăm sóc khách hàng',
    frequency: 'quarterly',
    unit: 'điểm',
    targetType: 'higher_better',
    startValue: 30,
    targetValue: 70,
    currentValue: 72,
    warnThreshold: 60,
    critThreshold: 50,
    ownerName: 'Elena Rostova',
    ownerAvatar: 'https://i.pravatar.cc/150?u=elena',
    history: [
      { id: 'h-4-1', date: '2026-03-31', value: 55, note: 'Kết quả khảo sát Quý 1.', author: 'Elena Rostova' },
      { id: 'h-4-2', date: '2026-06-30', value: 72, note: 'Tăng vọt nhờ quy trình phản hồi nhanh trong vòng 5 phút.', author: 'Elena Rostova' }
    ]
  },
  {
    id: 'kpi-5',
    code: 'KPI-HR-05',
    name: 'Tỷ lệ gắn kết của nhân viên (Employee Engagement Rate)',
    description: 'Chỉ số gắn kết nội bộ thông qua các kỳ khảo sát định kỳ hàng năm.',
    category: 'HR',
    department: 'Phòng Nhân sự',
    frequency: 'yearly',
    unit: '%',
    targetType: 'higher_better',
    startValue: 50,
    targetValue: 85,
    currentValue: 88,
    warnThreshold: 75,
    critThreshold: 65,
    ownerName: 'Minh Thư',
    ownerAvatar: 'https://i.pravatar.cc/150?u=thu',
    history: [
      { id: 'h-5-1', date: '2025-12-31', value: 74, note: 'Đánh giá cuối năm ngoái.', author: 'Minh Thư' },
      { id: 'h-5-2', date: '2026-06-15', value: 88, note: 'Cải tiến mạnh mẽ nhờ chương trình chăm sóc sức khỏe toàn diện cho nhân viên.', author: 'Minh Thư' }
    ]
  }
];

export function KpiSettingView({ cardOpacity }: { cardOpacity: number }) {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'setup' | 'reports'>('dashboard');
  const [kpis, setKpis] = useState<KpiItem[]>(INITIAL_KPIS);
  const [selectedKpi, setSelectedKpi] = useState<KpiItem | null>(null);
  
  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  // Check-In State
  const [checkInOpen, setCheckInOpen] = useState(false);
  const [checkInVal, setCheckInVal] = useState<number>(0);
  const [checkInNote, setCheckInNote] = useState('');
  const [checkInDate, setCheckInDate] = useState(new Date().toISOString().split('T')[0]);

  // Form State for creating KPI
  const [kpiName, setKpiName] = useState('');
  const [kpiCode, setKpiCode] = useState('');
  const [kpiDesc, setKpiDesc] = useState('');
  const [kpiCat, setKpiCat] = useState<KpiCategory>('Sales');
  const [kpiDept, setKpiDept] = useState('Phòng Kinh doanh');
  const [kpiFreq, setKpiFreq] = useState<KpiFrequency>('monthly');
  const [kpiUnit, setKpiUnit] = useState('%');
  const [kpiTargetType, setKpiTargetType] = useState<KpiTargetType>('higher_better');
  const [kpiStartVal, setKpiStartVal] = useState<number>(0);
  const [kpiTargetVal, setKpiTargetVal] = useState<number>(100);
  const [kpiCurrentVal, setKpiCurrentVal] = useState<number>(0);
  const [kpiWarnThresh, setKpiWarnThresh] = useState<number>(80);
  const [kpiCritThresh, setKpiCritThresh] = useState<number>(60);
  const [kpiOwner, setKpiOwner] = useState('Roberto Canevari');
  const [kpiLinkOkr, setKpiLinkOkr] = useState('');

  // Auto calculate progress % based on Target Type
  const calculateProgress = (kpi: KpiItem) => {
    const { startValue, targetValue, currentValue, targetType } = kpi;
    if (targetType === 'higher_better') {
      const deltaTotal = targetValue - startValue;
      if (deltaTotal === 0) return 0;
      const progress = ((currentValue - startValue) / deltaTotal) * 100;
      return Math.min(100, Math.max(0, Math.round(progress)));
    } else if (targetType === 'lower_better') {
      const deltaTotal = startValue - targetValue;
      if (deltaTotal === 0) return 0;
      const progress = ((startValue - currentValue) / deltaTotal) * 100;
      return Math.min(100, Math.max(0, Math.round(progress)));
    }
    return 100; // maintain_range defaults
  };

  // Determine Status based on thresholds
  const getKpiStatus = (kpi: KpiItem): KpiStatus => {
    const { currentValue, targetValue, warnThreshold, critThreshold, targetType } = kpi;
    if (targetType === 'higher_better') {
      if (currentValue >= targetValue) return 'Excellent';
      if (currentValue >= warnThreshold) return 'On Track';
      if (currentValue >= critThreshold) return 'At Risk';
      return 'Off Track';
    } else {
      // Lower is better
      if (currentValue <= targetValue) return 'Excellent';
      if (currentValue <= warnThreshold) return 'On Track'; // Under warn is good
      if (currentValue <= critThreshold) return 'At Risk';
      return 'Off Track';
    }
  };

  // Get status color helper
  const getStatusBadge = (status: KpiStatus) => {
    switch (status) {
      case 'Excellent':
        return <span className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-extrabold text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm flex items-center space-x-1"><Award size={12} /><span>Xuất sắc</span></span>;
      case 'On Track':
        return <span className="bg-emerald-500 text-white font-extrabold text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">Đúng tiến độ</span>;
      case 'At Risk':
        return <span className="bg-amber-500 text-white font-extrabold text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">Có rủi ro</span>;
      case 'Off Track':
        return <span className="bg-rose-500 text-white font-extrabold text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">Chậm trễ</span>;
    }
  };

  // KPI Categories list
  const CATEGORIES: KpiCategory[] = ['Finance', 'Sales', 'Marketing', 'HR', 'Operations', 'Engineering'];

  // Handle Check-In submit
  const submitCheckIn = () => {
    if (!selectedKpi) return;

    const newHistoryItem: KpiHistoryItem = {
      id: `h-new-${Date.now()}`,
      date: checkInDate,
      value: Number(checkInVal),
      note: checkInNote || 'Cập nhật định kỳ chỉ số KPI',
      author: 'Roberto Canevari'
    };

    const updatedKpis = kpis.map(k => {
      if (k.id === selectedKpi.id) {
        return {
          ...k,
          currentValue: Number(checkInVal),
          history: [newHistoryItem, ...k.history]
        };
      }
      return k;
    });

    setKpis(updatedKpis);
    setCheckInOpen(false);
    setSelectedKpi(null);
  };

  // Handle Delete KPI
  const handleDeleteKpi = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Bạn có chắc chắn muốn xóa chỉ số KPI này không?')) {
      setKpis(kpis.filter(k => k.id !== id));
      if (selectedKpi?.id === id) setSelectedKpi(null);
    }
  };

  // Handle Create KPI
  const handleCreateKpi = (e: React.FormEvent) => {
    e.preventDefault();
    if (!kpiName.trim() || !kpiCode.trim()) return;

    const newKpi: KpiItem = {
      id: `kpi-new-${Date.now()}`,
      code: kpiCode.toUpperCase(),
      name: kpiName,
      description: kpiDesc,
      category: kpiCat,
      department: kpiDept,
      frequency: kpiFreq,
      unit: kpiUnit,
      targetType: kpiTargetType,
      startValue: Number(kpiStartVal),
      targetValue: Number(kpiTargetVal),
      currentValue: Number(kpiCurrentVal),
      warnThreshold: Number(kpiWarnThresh),
      critThreshold: Number(kpiCritThresh),
      ownerName: kpiOwner,
      ownerAvatar: 'https://i.pravatar.cc/150?u=roberto',
      linkedOkrName: kpiLinkOkr || undefined,
      history: [
        {
          id: `h-init-${Date.now()}`,
          date: new Date().toISOString().split('T')[0],
          value: Number(kpiCurrentVal),
          note: 'Thiết lập chỉ số ban đầu.',
          author: kpiOwner
        }
      ]
    };

    setKpis([newKpi, ...kpis]);
    
    // Reset Form Fields
    setKpiName('');
    setKpiCode('');
    setKpiDesc('');
    setKpiStartVal(0);
    setKpiTargetVal(100);
    setKpiCurrentVal(0);
    setActiveTab('dashboard');
  };

  // KPI filters applying
  const filteredKpis = kpis.filter(k => {
    const matchesSearch = k.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          k.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          k.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || k.category === categoryFilter;
    
    const status = getKpiStatus(k);
    const matchesStatus = statusFilter === 'All' || status === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  // KPI Calculations statistics
  const totalCount = kpis.length;
  const excellentCount = kpis.filter(k => getKpiStatus(k) === 'Excellent').length;
  const onTrackCount = kpis.filter(k => getKpiStatus(k) === 'On Track').length;
  const atRiskCount = kpis.filter(k => getKpiStatus(k) === 'At Risk').length;
  const offTrackCount = kpis.filter(k => getKpiStatus(k) === 'Off Track').length;

  const totalProgressSum = kpis.reduce((sum, k) => sum + calculateProgress(k), 0);
  const averageProgress = totalCount > 0 ? Math.round(totalProgressSum / totalCount) : 0;

  // Chart preparation
  const getChartData = () => {
    if (!selectedKpi || selectedKpi.history.length === 0) return [];
    return [...selectedKpi.history].reverse().map(h => ({
      date: h.date,
      value: h.value,
      target: selectedKpi.targetValue
    }));
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#f8fafc]/90 overflow-hidden">
      
      {/* SECTION HEADER */}
      <div className="bg-white border-b border-slate-200/80 px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0 shrink-0 select-none">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-xl text-white shadow-md shadow-cyan-500/20">
            <Activity size={22} className="animate-spin-slow" />
          </div>
          <div>
            <h1 className="text-lg font-extrabold text-slate-800 tracking-tight flex items-center space-x-1.5">
              <span>Quản trị Chỉ số Hiệu suất (KPIs)</span>
              <span className="text-[10px] bg-cyan-500 text-white font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                Profit.co Metrics
              </span>
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              Thiết lập và bám sát các chỉ số vận hành cốt lõi (KPI) liên thông, tự động đồng bộ hóa cùng OKRs.
            </p>
          </div>
        </div>

        {/* SUB NAVIGATION TABS */}
        <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200/50 self-start md:self-auto">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={cn(
              "px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center space-x-1.5",
              activeTab === 'dashboard' 
                ? "bg-white text-cyan-600 shadow-sm" 
                : "text-slate-500 hover:text-slate-800"
            )}
          >
            <BarChart2 size={14} />
            <span>Tổng quan & Chỉ số</span>
          </button>
          
          <button
            onClick={() => setActiveTab('setup')}
            className={cn(
              "px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center space-x-1.5",
              activeTab === 'setup' 
                ? "bg-white text-cyan-600 shadow-sm" 
                : "text-slate-500 hover:text-slate-800"
            )}
          >
            <Plus size={14} />
            <span>Thiết lập KPI mới</span>
          </button>

          <button
            onClick={() => setActiveTab('reports')}
            className={cn(
              "px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center space-x-1.5",
              activeTab === 'reports' 
                ? "bg-white text-cyan-600 shadow-sm" 
                : "text-slate-500 hover:text-slate-800"
            )}
          >
            <TrendingUp size={14} />
            <span>Báo cáo Xu hướng</span>
          </button>
        </div>
      </div>

      {/* BODY CONTENT SCROLLER */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">

        {/* SUMMARY KPI CARDS PANEL */}
        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            
            <div className="bg-white rounded-xl border border-slate-200/60 p-4 shadow-sm flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">Tổng chỉ số KPI</span>
                <p className="text-2xl font-black text-slate-800">{totalCount}</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg text-slate-500">
                <Activity size={18} />
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200/60 p-4 shadow-sm flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-[10px] text-emerald-500 font-extrabold uppercase tracking-wider">Đạt & Xuất sắc</span>
                <p className="text-2xl font-black text-emerald-600">{(excellentCount + onTrackCount)}</p>
              </div>
              <div className="p-3 bg-emerald-50 rounded-lg text-emerald-500">
                <Check size={18} />
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200/60 p-4 shadow-sm flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-[10px] text-amber-500 font-extrabold uppercase tracking-wider">Có rủi ro</span>
                <p className="text-2xl font-black text-amber-600">{atRiskCount}</p>
              </div>
              <div className="p-3 bg-amber-50 rounded-lg text-amber-500">
                <AlertCircle size={18} />
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200/60 p-4 shadow-sm flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-[10px] text-rose-500 font-extrabold uppercase tracking-wider">Chậm tiến độ</span>
                <p className="text-2xl font-black text-rose-600">{offTrackCount}</p>
              </div>
              <div className="p-3 bg-rose-50 rounded-lg text-rose-500">
                <TrendingDown size={18} />
              </div>
            </div>

            <div className="bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-xl p-4 shadow-sm flex items-center justify-between text-white col-span-2 lg:col-span-1">
              <div className="space-y-1">
                <span className="text-[10px] text-white/80 font-extrabold uppercase tracking-wider">Hiệu suất TB</span>
                <p className="text-2xl font-black">{averageProgress}%</p>
              </div>
              <div className="p-3 bg-white/10 rounded-lg">
                <TrendingUp size={18} />
              </div>
            </div>

          </div>
        )}

        {/* TAB 1: KPI CATALOG / BROWSER & CHECK-IN */}
        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
            
            {/* KPI list column */}
            <div className="xl:col-span-2 space-y-4">
              
              {/* FILTER BAR */}
              <div className="bg-white rounded-xl border border-slate-200/60 p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-sm">
                <div className="relative flex-1">
                  <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Tìm kiếm mã, tên KPI, bộ phận phụ trách..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-slate-50/50"
                  />
                </div>

                <div className="flex items-center space-x-2 flex-wrap gap-y-2">
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  >
                    <option value="All">Tất cả danh mục</option>
                    {CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>

                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  >
                    <option value="All">Tất cả tình trạng</option>
                    <option value="Excellent">Xuất sắc</option>
                    <option value="On Track">Đúng tiến độ</option>
                    <option value="At Risk">Có rủi ro</option>
                    <option value="Off Track">Chậm trễ</option>
                  </select>
                </div>
              </div>

              {/* KPI ITEMS LIST */}
              <div className="space-y-3">
                {filteredKpis.map(kpi => {
                  const progress = calculateProgress(kpi);
                  const status = getKpiStatus(kpi);
                  const isSelected = selectedKpi?.id === kpi.id;

                  return (
                    <div 
                      key={kpi.id} 
                      onClick={() => {
                        setSelectedKpi(kpi);
                        setCheckInVal(kpi.currentValue);
                      }}
                      className={cn(
                        "bg-white rounded-xl border p-4 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 group",
                        isSelected ? "border-cyan-500 ring-2 ring-cyan-500/10" : "border-slate-200/80"
                      )}
                    >
                      <div className="flex items-start space-x-3 flex-1 min-w-0">
                        <div className="p-2 bg-slate-50 rounded-lg shrink-0 mt-0.5 border border-slate-100 group-hover:bg-cyan-50 group-hover:text-cyan-600 transition-colors">
                          <Activity size={18} />
                        </div>
                        <div className="space-y-1 min-w-0">
                          <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                            <span className="text-[9px] font-black tracking-widest text-slate-400">{kpi.code}</span>
                            <span className="text-[10px] bg-slate-100 border border-slate-200/50 px-1.5 py-0.5 rounded text-slate-500 font-bold">{kpi.category}</span>
                            <span className="text-[10px] bg-cyan-50/50 border border-cyan-100 px-1.5 py-0.5 rounded text-cyan-700 font-bold">{kpi.frequency.toUpperCase()}</span>
                          </div>
                          <h4 className="text-xs font-extrabold text-slate-800 truncate">{kpi.name}</h4>
                          <p className="text-[11px] text-slate-400 font-medium truncate max-w-md">{kpi.description}</p>
                          
                          {kpi.linkedOkrName && (
                            <div className="flex items-center space-x-1 text-[10px] text-blue-600 font-bold pt-1">
                              <Target size={11} className="shrink-0" />
                              <span>Liên kết OKR:</span>
                              <span className="text-slate-600 font-semibold truncate max-w-xs">"{kpi.linkedOkrName}"</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Right values & actions */}
                      <div className="flex items-center space-x-4 shrink-0 self-end sm:self-auto pl-11 sm:pl-0 justify-between sm:justify-end w-full sm:w-auto">
                        <div className="text-right space-y-1">
                          <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Tiến độ</div>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs font-black text-slate-700">{progress}%</span>
                            <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200/30">
                              <div 
                                className="h-full bg-cyan-500 rounded-full" 
                                style={{ width: `${progress}%` }}
                              />
                            </div>
                          </div>
                          <p className="text-[10px] text-slate-500 font-semibold">
                            {kpi.currentValue} / {kpi.targetValue} {kpi.unit}
                          </p>
                        </div>

                        <div className="flex flex-col items-end space-y-1.5">
                          {getStatusBadge(status)}
                          <div className="flex items-center space-x-1.5">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedKpi(kpi);
                                setCheckInVal(kpi.currentValue);
                                setCheckInNote('');
                                setCheckInOpen(true);
                              }}
                              className="text-[10px] bg-cyan-500 hover:bg-cyan-600 text-white font-extrabold px-2 py-1 rounded cursor-pointer transition-all"
                            >
                              Check-in
                            </button>
                            <button
                              onClick={(e) => handleDeleteKpi(kpi.id, e)}
                              className="p-1 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded transition-all cursor-pointer"
                              title="Xóa KPI"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </div>
                      </div>

                    </div>
                  );
                })}

                {filteredKpis.length === 0 && (
                  <div className="bg-white rounded-xl border border-slate-200 p-12 text-center space-y-3">
                    <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400 animate-pulse">
                      <Activity size={24} />
                    </div>
                    <h4 className="text-sm font-bold text-slate-700">Không tìm thấy chỉ số KPI nào</h4>
                    <p className="text-xs text-slate-400">Hãy thay đổi bộ lọc hoặc thêm chỉ số KPI của doanh nghiệp để quản lý và bám sát tiến độ vận hành.</p>
                  </div>
                )}
              </div>

            </div>

            {/* Expanded KPI detailed view or general guide column */}
            <div className="space-y-6">
              {selectedKpi ? (
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-5 space-y-5">
                  <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-black tracking-widest text-cyan-600 uppercase">{selectedKpi.code}</span>
                      <h3 className="text-sm font-extrabold text-slate-800">{selectedKpi.name}</h3>
                    </div>
                    {getStatusBadge(getKpiStatus(selectedKpi))}
                  </div>

                  {/* Tracking progress parameters */}
                  <div className="space-y-2">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Thông số đo lường</p>
                    <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200/50 text-xs">
                      <div>
                        <span className="text-slate-400 block font-medium">Khởi điểm:</span>
                        <span className="font-bold text-slate-700">{selectedKpi.startValue} {selectedKpi.unit}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block font-medium">Chỉ tiêu:</span>
                        <span className="font-bold text-slate-700">{selectedKpi.targetValue} {selectedKpi.unit}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block font-medium">Hiện tại:</span>
                        <span className="font-bold text-cyan-600">{selectedKpi.currentValue} {selectedKpi.unit}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block font-medium">Tần suất đo:</span>
                        <span className="font-bold text-slate-700 capitalize">{selectedKpi.frequency}</span>
                      </div>
                    </div>
                  </div>

                  {/* Micro Chart (Recharts) */}
                  <div className="space-y-2">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Biểu đồ tiến trình KPI</p>
                    <div className="h-32 bg-slate-50/50 rounded-xl p-2 border border-slate-200/40">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={getChartData()} margin={{ top: 5, right: 5, left: -25, bottom: 5 }}>
                          <defs>
                            <linearGradient id="kpiProgressGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.2}/>
                              <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                          <XAxis dataKey="date" tickStyle={{ fontSize: 8 }} />
                          <YAxis tickStyle={{ fontSize: 8 }} />
                          <Tooltip contentStyle={{ fontSize: 10 }} />
                          <Area type="monotone" dataKey="value" stroke="#06b6d4" strokeWidth={2} fillOpacity={1} fill="url(#kpiProgressGrad)" name="Thực tế" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Check-In History list */}
                  <div className="space-y-3">
                    <h4 className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Lịch sử Check-in ({selectedKpi.history.length})</h4>
                    <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                      {selectedKpi.history.map((hist, index) => (
                        <div key={hist.id} className="p-3 bg-slate-50/30 border border-slate-100 rounded-lg space-y-1 relative pl-6">
                          {/* Dot line item icon */}
                          <div className="absolute left-2.5 top-3.5 w-1.5 h-1.5 rounded-full bg-cyan-500" />
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-black text-slate-700">{hist.value} {selectedKpi.unit}</span>
                            <span className="text-[9px] text-slate-400 font-semibold">{hist.date}</span>
                          </div>
                          <p className="text-[10px] text-slate-500 italic">"{hist.note}"</p>
                          <span className="text-[8px] text-slate-400 block font-bold text-right">Cập nhật bởi: {hist.author}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              ) : (
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-center space-y-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto text-cyan-500 shadow-sm border border-slate-100">
                    <Activity size={20} />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xs font-extrabold text-slate-800">Chọn một chỉ số KPI để phân tích</h4>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      Khi chọn chỉ số, bạn có thể thực hiện Check-in nhanh dữ liệu mới, theo dõi lịch sử cập nhật và xem đồ thị xu hướng phát triển thực tế so với mục tiêu đề ra.
                    </p>
                  </div>
                </div>
              )}

              {/* Profit.co Standard Methodology Banner */}
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 text-white rounded-2xl p-5 space-y-3 shadow-md border border-slate-700">
                <div className="flex items-center space-x-2">
                  <Sparkles size={16} className="text-amber-400 animate-pulse" />
                  <span className="text-[11px] font-black tracking-widest text-amber-400 uppercase">Triết lý Profit.co</span>
                </div>
                <h4 className="text-xs font-extrabold">Cách kết hợp KPIs cùng OKRs</h4>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Các chỉ số **KPIs** đo lường sức khỏe hiện tại của tổ chức (Run the business), trong khi **OKRs** quản lý các dự án cải tiến mang tính đột phá (Change the business).
                </p>
                <div className="text-[10px] bg-slate-700/50 p-2.5 rounded-lg border border-slate-600/50 text-slate-300 space-y-1">
                  <p className="font-bold text-white flex items-center space-x-1">
                    <CheckSquare size={10} className="text-emerald-400" />
                    <span>Làm thế nào để liên thông?</span>
                  </p>
                  <p>Khi một chỉ số KPI suy yếu (Ví dụ: Win Rate sụt giảm), bạn kiến tạo một OKR mới để sửa đổi và cải tiến quy trình đó ngay lập tức.</p>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* TAB 2: SETUP NEW KPI FORM */}
        {activeTab === 'setup' && (
          <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-slate-200/80 shadow-md p-6 md:p-8 space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-base font-extrabold text-slate-800 flex items-center space-x-2">
                <Settings size={18} className="text-cyan-500 animate-spin-slow" />
                <span>Thiết lập Chỉ số KPI chuẩn quốc tế (Profit.co Standard)</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Tạo mới các thước đo sức khỏe vận hành kinh doanh và định hình mục tiêu tối ưu hóa hành trình.
              </p>
            </div>

            <form onSubmit={handleCreateKpi} className="space-y-6">
              
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-cyan-600 uppercase tracking-widest flex items-center space-x-1.5 border-b border-cyan-50 pb-1.5">
                  <Bookmark size={14} />
                  <span>Bước 1: Định nghĩa Chỉ số KPI</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-600">Mã KPI (KPI Code)</label>
                    <input
                      type="text"
                      required
                      placeholder="Ví dụ: KPI-FIN-01, KPI-MKT-03"
                      value={kpiCode}
                      onChange={(e) => setKpiCode(e.target.value)}
                      className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-slate-50/55 font-bold uppercase"
                    />
                  </div>

                  <div className="md:col-span-2 space-y-1.5">
                    <label className="text-xs font-bold text-slate-600">Tên Chỉ số KPI (KPI Name)</label>
                    <input
                      type="text"
                      required
                      placeholder="Ví dụ: Chỉ số hài lòng của khách hàng (NPS)"
                      value={kpiName}
                      onChange={(e) => setKpiName(e.target.value)}
                      className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-slate-50/55 font-bold"
                    />
                  </div>

                  <div className="md:col-span-3 space-y-1.5">
                    <label className="text-xs font-bold text-slate-600">Mô tả chi tiết (Description)</label>
                    <textarea
                      placeholder="Mô tả cụ thể về công thức tính, ý nghĩa và nguồn cấp dữ liệu cho chỉ số này..."
                      value={kpiDesc}
                      onChange={(e) => setKpiDesc(e.target.value)}
                      className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-slate-50/55 min-h-[60px]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-600">Danh mục đo lường (Category)</label>
                    <select
                      value={kpiCat}
                      onChange={(e: any) => setKpiCat(e.target.value)}
                      className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-slate-50/55"
                    >
                      {CATEGORIES.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-600">Phòng ban vận hành (Department)</label>
                    <input
                      type="text"
                      required
                      value={kpiDept}
                      onChange={(e) => setKpiDept(e.target.value)}
                      className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-slate-50/55"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-600">Tần suất báo cáo (Frequency)</label>
                    <select
                      value={kpiFreq}
                      onChange={(e: any) => setKpiFreq(e.target.value)}
                      className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-slate-50/55"
                    >
                      <option value="weekly">Hàng tuần</option>
                      <option value="monthly">Hàng tháng</option>
                      <option value="quarterly">Hàng quý</option>
                      <option value="yearly">Hàng năm</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Thresholds and Targets setting */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-cyan-600 uppercase tracking-widest flex items-center space-x-1.5 border-b border-cyan-50 pb-1.5">
                  <TrendingUp size={14} />
                  <span>Bước 2: Thiết lập Mục tiêu & Ngưỡng Đo lường</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-600">Đơn vị đo lường (Unit)</label>
                    <input
                      type="text"
                      required
                      placeholder="%, USD, VND, Giờ, Lượt, Điểm..."
                      value={kpiUnit}
                      onChange={(e) => setKpiUnit(e.target.value)}
                      className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-slate-50/55"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-600">Kịch bản Mục tiêu (Target Type)</label>
                    <select
                      value={kpiTargetType}
                      onChange={(e: any) => setKpiTargetType(e.target.value)}
                      className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-slate-50/55"
                    >
                      <option value="higher_better">Càng cao càng tốt (Higher is Better)</option>
                      <option value="lower_better">Càng thấp càng tốt (Lower is Better)</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-600">Chỉ số khởi điểm (Start Value)</label>
                    <input
                      type="number"
                      required
                      value={kpiStartVal}
                      onChange={(e) => setKpiStartVal(Number(e.target.value))}
                      className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-slate-50/55"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-600">Chỉ tiêu phấn đấu (Target Value)</label>
                    <input
                      type="number"
                      required
                      value={kpiTargetVal}
                      onChange={(e) => setKpiTargetVal(Number(e.target.value))}
                      className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-slate-50/55"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-600">Giá trị hiện thời (Current Value)</label>
                    <input
                      type="number"
                      required
                      value={kpiCurrentVal}
                      onChange={(e) => setKpiCurrentVal(Number(e.target.value))}
                      className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-slate-50/55"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-600">Ngưỡng rủi ro / Cảnh báo (Warning)</label>
                    <input
                      type="number"
                      required
                      value={kpiWarnThresh}
                      onChange={(e) => setKpiWarnThresh(Number(e.target.value))}
                      className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-slate-50/55"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-600">Ngưỡng chậm trễ / Khẩn cấp (Critical)</label>
                    <input
                      type="number"
                      required
                      value={kpiCritThresh}
                      onChange={(e) => setKpiCritThresh(Number(e.target.value))}
                      className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-slate-50/55"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-600">Người sở hữu (Owner)</label>
                    <input
                      type="text"
                      required
                      value={kpiOwner}
                      onChange={(e) => setKpiOwner(e.target.value)}
                      className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-slate-50/55"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-600">Liên kết mục tiêu OKR (Tùy chọn)</label>
                    <input
                      type="text"
                      placeholder="Ví dụ: Tăng trưởng doanh thu Quý 3 thêm 20%"
                      value={kpiLinkOkr}
                      onChange={(e) => setKpiLinkOkr(e.target.value)}
                      className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-slate-50/55"
                    />
                  </div>
                </div>
              </div>

              {/* Form Footer */}
              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setActiveTab('dashboard')}
                  className="bg-white border border-slate-200 text-slate-600 px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-slate-50 cursor-pointer transition-all"
                >
                  Quay lại bảng chỉ số
                </button>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-2.5 rounded-xl text-xs font-bold hover:from-cyan-600 hover:to-blue-700 cursor-pointer transition-all shadow-md shadow-cyan-500/10"
                >
                  Thiết lập KPI này
                </button>
              </div>

            </form>
          </div>
        )}

        {/* TAB 3: TREND REPORTS & CHARTS */}
        {activeTab === 'reports' && (
          <div className="space-y-6 max-w-5xl mx-auto select-none">
            
            {/* Visual Analytics Hub Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Category distribution */}
              <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm space-y-4">
                <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center space-x-2">
                  <BarChart2 size={16} className="text-cyan-500" />
                  <span>Cơ cấu KPI theo Nhóm chức năng</span>
                </h3>
                <div className="h-64 flex items-end justify-between px-6 pb-2">
                  {CATEGORIES.map(cat => {
                    const count = kpis.filter(k => k.category === cat).length;
                    const maxCount = Math.max(...CATEGORIES.map(c => kpis.filter(k => k.category === c).length), 1);
                    const heightPercent = (count / maxCount) * 100;
                    return (
                      <div key={cat} className="flex flex-col items-center space-y-2 flex-1">
                        <div className="relative w-8 bg-slate-50 rounded-t-lg h-48 flex items-end overflow-hidden border border-slate-100">
                          <div 
                            className="bg-gradient-to-t from-cyan-500 to-blue-500 w-full rounded-t-lg transition-all duration-700" 
                            style={{ height: `${heightPercent}%` }}
                          />
                          <span className="absolute inset-x-0 bottom-2 text-[10px] font-black text-center text-slate-800 drop-shadow-sm">{count}</span>
                        </div>
                        <span className="text-[9px] font-bold text-slate-500 tracking-wider rotate-12">{cat}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Status Breakdown Bar chart */}
              <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm space-y-4">
                <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center space-x-2">
                  <TrendingUp size={16} className="text-cyan-500" />
                  <span>Phân bổ Trạng thái Hiệu quả</span>
                </h3>
                
                <div className="h-64 bg-slate-50/50 rounded-xl p-4 flex flex-col justify-center space-y-4">
                  
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-600">
                      <span className="flex items-center space-x-1.5"><div className="w-2.5 h-2.5 rounded-full bg-emerald-500" /><span>Xuất sắc (Excellent / Vượt chỉ tiêu)</span></span>
                      <span>{excellentCount} KPIs ({Math.round(excellentCount / totalCount * 100)}%)</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden border border-slate-200/30">
                      <div className="h-full bg-emerald-500" style={{ width: `${(excellentCount/totalCount)*100}%` }} />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-600">
                      <span className="flex items-center space-x-1.5"><div className="w-2.5 h-2.5 rounded-full bg-teal-400" /><span>Đúng tiến độ (On Track)</span></span>
                      <span>{onTrackCount} KPIs ({Math.round(onTrackCount / totalCount * 100)}%)</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden border border-slate-200/30">
                      <div className="h-full bg-teal-400" style={{ width: `${(onTrackCount/totalCount)*100}%` }} />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-600">
                      <span className="flex items-center space-x-1.5"><div className="w-2.5 h-2.5 rounded-full bg-amber-500" /><span>Có rủi ro (At Risk)</span></span>
                      <span>{atRiskCount} KPIs ({Math.round(atRiskCount / totalCount * 100)}%)</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden border border-slate-200/30">
                      <div className="h-full bg-amber-500" style={{ width: `${(atRiskCount/totalCount)*100}%` }} />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-600">
                      <span className="flex items-center space-x-1.5"><div className="w-2.5 h-2.5 rounded-full bg-rose-500" /><span>Chậm trễ (Off Track)</span></span>
                      <span>{offTrackCount} KPIs ({Math.round(offTrackCount / totalCount * 100)}%)</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden border border-slate-200/30">
                      <div className="h-full bg-rose-500" style={{ width: `${(offTrackCount/totalCount)*100}%` }} />
                    </div>
                  </div>

                </div>
              </div>

            </div>

            {/* General KPI guidelines card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
              <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-widest flex items-center space-x-2">
                <Info size={16} className="text-blue-500" />
                <span>Cẩm nang quản lý KPI theo chuẩn Profit.co</span>
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Profit.co chuẩn hóa KPI qua việc chia nhỏ các cột mốc thực thi, quy định rõ ràng người phụ trách chịu trách nhiệm cho từng kết quả và tạo điều kiện cập nhật số liệu thường xuyên. Đồ thị xu hướng trực tuyến hỗ trợ nhà lãnh đạo đưa ra quyết định dựa trên dữ liệu một cách trực quan, chính xác nhất.
              </p>
            </div>

          </div>
        )}

      </div>

      {/* MODAL / CHECK-IN OVERLAY POPUP */}
      {checkInOpen && selectedKpi && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 max-w-md w-full shadow-2xl p-6 space-y-5">
            <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
              <div className="flex items-center space-x-2 text-cyan-600">
                <Activity size={18} className="animate-pulse" />
                <h3 className="text-sm font-extrabold text-slate-800">Check-in Chỉ số KPI</h3>
              </div>
              <span className="text-[10px] bg-slate-100 font-bold px-2 py-0.5 rounded text-slate-500 uppercase">{selectedKpi.code}</span>
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-wider">Tên chỉ số KPI</span>
                <p className="text-xs font-bold text-slate-800">{selectedKpi.name}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-wider">Chỉ tiêu đề ra</span>
                  <p className="text-xs font-extrabold text-slate-700">{selectedKpi.targetValue} {selectedKpi.unit}</p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-wider">Bắt đầu từ</span>
                  <p className="text-xs font-extrabold text-slate-700">{selectedKpi.startValue} {selectedKpi.unit}</p>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600">Giá trị đo lường mới ({selectedKpi.unit})</label>
                <input
                  type="number"
                  value={checkInVal}
                  onChange={(e) => setCheckInVal(Number(e.target.value))}
                  className="w-full px-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-slate-50/50 font-bold"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600">Ngày ghi nhận số liệu</label>
                <input
                  type="date"
                  value={checkInDate}
                  onChange={(e) => setCheckInDate(e.target.value)}
                  className="w-full px-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-slate-50/50"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600">Ghi chú tiến trình (Check-in Note)</label>
                <textarea
                  required
                  placeholder="Mô tả nguyên nhân tăng trưởng/suy thoái hoặc các bước hành động tiếp theo..."
                  value={checkInNote}
                  onChange={(e) => setCheckInNote(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-slate-50/50 min-h-[70px]"
                />
              </div>
            </div>

            <div className="flex items-center justify-end space-x-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => {
                  setCheckInOpen(false);
                  setSelectedKpi(null);
                }}
                className="bg-white border border-slate-200 hover:bg-slate-50 px-4 py-2 rounded-xl text-xs font-bold text-slate-500 cursor-pointer"
              >
                Hủy bỏ
              </button>
              <button
                type="button"
                onClick={submitCheckIn}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-600 hover:to-blue-700 px-5 py-2 rounded-xl text-xs font-bold cursor-pointer shadow-md shadow-cyan-500/10"
              >
                Lưu kết quả
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
