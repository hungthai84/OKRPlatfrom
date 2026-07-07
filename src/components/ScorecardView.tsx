import React, { useState, useEffect } from 'react';
import { 
  Trophy, 
  Sparkles, 
  Search, 
  Plus, 
  TrendingUp, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  Target,
  ArrowUpRight,
  Sliders,
  ChevronRight,
  TrendingDown,
  User,
  Building,
  Star,
  Activity,
  Award,
  Layers,
  ChevronDown,
  HelpCircle,
  BarChart3,
  Percent
} from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

export interface ScorecardItem {
  id: string;
  name: string;
  avatar: string;
  role: string;
  department: string;
  okrScore: number; // 0 - 100
  kpiScore: number; // 0 - 100
  taskScore: number; // 0 - 100
  valuesScore: number; // 0 - 5 stars
  overallScore: number; // calculated weighted average
  status: 'Excellent' | 'Good' | 'Average' | 'Needs Improvement';
}

const INITIAL_SCORECARDS: ScorecardItem[] = [
  {
    id: 'sc-1',
    name: 'Roberto Canevari',
    avatar: 'https://i.pravatar.cc/150?u=roberto',
    role: 'Giám đốc Điều hành (CEO)',
    department: 'Sales & BD',
    okrScore: 92,
    kpiScore: 88,
    taskScore: 95,
    valuesScore: 4.8,
    overallScore: 91,
    status: 'Excellent'
  },
  {
    id: 'sc-2',
    name: 'Nguyễn Văn A',
    avatar: 'https://i.pravatar.cc/150?u=architect',
    role: 'Solutions Architect',
    department: 'Tech & Engineering',
    okrScore: 85,
    kpiScore: 90,
    taskScore: 88,
    valuesScore: 4.5,
    overallScore: 87,
    status: 'Excellent'
  },
  {
    id: 'sc-3',
    name: 'Elena Rostova',
    avatar: 'https://i.pravatar.cc/150?u=elena',
    role: 'Trưởng phòng Chăm sóc Khách hàng',
    department: 'Customer Experience',
    okrScore: 78,
    kpiScore: 82,
    taskScore: 91,
    valuesScore: 4.7,
    overallScore: 82,
    status: 'Good'
  },
  {
    id: 'sc-4',
    name: 'David Tran',
    avatar: 'https://i.pravatar.cc/150?u=david',
    role: 'Kỹ sư Bảo mật Cloud',
    department: 'Tech & Engineering',
    okrScore: 65,
    kpiScore: 70,
    taskScore: 80,
    valuesScore: 4.2,
    overallScore: 71,
    status: 'Good'
  },
  {
    id: 'sc-5',
    name: 'Alice Nguyen',
    avatar: 'https://i.pravatar.cc/150?u=alice',
    role: 'Trưởng bộ phận Tài chính',
    department: 'Finance',
    okrScore: 55,
    kpiScore: 60,
    taskScore: 75,
    valuesScore: 4.0,
    overallScore: 61,
    status: 'Average'
  },
  {
    id: 'sc-6',
    name: 'Lê Văn C',
    avatar: 'https://i.pravatar.cc/150?u=sales',
    role: 'Nhân viên Kinh doanh Enterprise',
    department: 'Sales & BD',
    okrScore: 45,
    kpiScore: 50,
    taskScore: 62,
    valuesScore: 3.8,
    overallScore: 51,
    status: 'Needs Improvement'
  }
];

const TREND_DATA = [
  { name: 'T1', OKR: 60, KPI: 65, Task: 70 },
  { name: 'T2', OKR: 68, KPI: 72, Task: 75 },
  { name: 'T3', OKR: 75, KPI: 78, Task: 80 },
  { name: 'T4', OKR: 80, KPI: 82, Task: 82 },
  { name: 'T5', OKR: 82, KPI: 85, Task: 88 },
  { name: 'T6', OKR: 88, KPI: 89, Task: 91 }
];

export function ScorecardView({ cardOpacity }: { cardOpacity: number }) {
  const [scorecards, setScorecards] = useState<ScorecardItem[]>(() => {
    const saved = localStorage.getItem('power_scorecards_data');
    return saved ? JSON.parse(saved) : INITIAL_SCORECARDS;
  });

  const [activeTab, setActiveTab] = useState<'employees' | 'departments'>('employees');
  const [deptFilter, setDeptFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState<ScorecardItem | null>(null);

  // Sync with LocalStorage
  useEffect(() => {
    localStorage.setItem('power_scorecards_data', JSON.stringify(scorecards));
  }, [scorecards]);

  const getStatusBadge = (status: ScorecardItem['status']) => {
    switch (status) {
      case 'Excellent': return 'bg-emerald-50 text-emerald-600 border-emerald-200';
      case 'Good': return 'bg-blue-50 text-blue-600 border-blue-200';
      case 'Average': return 'bg-amber-50 text-amber-600 border-amber-200';
      case 'Needs Improvement': return 'bg-rose-50 text-rose-600 border-rose-200';
    }
  };

  const getStatusLabel = (status: ScorecardItem['status']) => {
    switch (status) {
      case 'Excellent': return 'Xuất sắc';
      case 'Good': return 'Tốt';
      case 'Average': return 'Trung bình';
      case 'Needs Improvement': return 'Cần cải thiện';
    }
  };

  const filteredItems = scorecards.filter(item => {
    const matchesDept = deptFilter === 'All' || item.department === deptFilter;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.department.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDept && matchesSearch;
  });

  // Calculate high-level stats
  const totalEmployees = filteredItems.length;
  const avgOkr = totalEmployees > 0 ? Math.round(filteredItems.reduce((acc, c) => acc + c.okrScore, 0) / totalEmployees) : 0;
  const avgKpi = totalEmployees > 0 ? Math.round(filteredItems.reduce((acc, c) => acc + c.kpiScore, 0) / totalEmployees) : 0;
  const avgTask = totalEmployees > 0 ? Math.round(filteredItems.reduce((acc, c) => acc + c.taskScore, 0) / totalEmployees) : 0;
  const avgOverall = totalEmployees > 0 ? Math.round(filteredItems.reduce((acc, c) => acc + c.overallScore, 0) / totalEmployees) : 0;

  const cardStyle = { 
    backgroundColor: 'rgba(255, 255, 255, 0.45)',
    backdropFilter: 'blur(12px)'
  };

  return (
    <div className="flex-1 overflow-auto p-6 space-y-6 flex flex-col select-none">
      
      {/* 1. HEADER SECTION WITH GRADIENT BANNER */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-800 to-slate-900 rounded-[10px] shadow-lg p-6 text-white relative overflow-hidden transition-all duration-300 shrink-0">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 z-10 relative">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center animate-pulse">
              <Trophy size={26} className="text-orange-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Bảng điểm Hiệu suất (Scorecard)</h2>
              <p className="text-xs text-blue-200">
                Chuẩn hóa đánh giá hiệu suất đa chiều toàn diện từ chỉ số OKR, KPI vận hành và hành động chuẩn quốc tế giống Profit.co.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 flex-wrap">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60" size={14} />
              <input
                type="text"
                placeholder="Tìm nhân sự, chức danh..."
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
            <button 
              onClick={() => setActiveTab('employees')}
              className={cn(
                "pb-1 border-b-2 cursor-pointer transition-all",
                activeTab === 'employees' ? "border-orange-500 text-slate-800 dark:text-slate-200 font-bold" : "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:text-slate-200"
              )}
            >
              Bảng điểm cá nhân ({scorecards.length})
            </button>
            <button 
              onClick={() => setActiveTab('departments')}
              className={cn(
                "pb-1 border-b-2 cursor-pointer transition-all",
                activeTab === 'departments' ? "border-orange-500 text-slate-800 dark:text-slate-200 font-bold" : "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:text-slate-200"
              )}
            >
              Bảng điểm theo phòng ban
            </button>
          </div>
        
        </div>
      </div>


      {/* 2. STATS STRIP CARD LAYOUT */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 shrink-0">
        <div className="bg-white p-3.5 rounded-xl border border-slate-200/60 flex items-center space-x-3">
          <div className="p-2.5 bg-blue-50 rounded-lg text-blue-600 shrink-0">
            <Percent size={18} />
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase">Hiệu suất Chung</p>
            <p className="text-base font-black text-slate-800">{avgOverall}%</p>
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200/60 flex items-center space-x-3">
          <div className="p-2.5 bg-purple-50 rounded-lg text-purple-600 shrink-0">
            <Target size={18} />
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase">Điểm mục tiêu OKR</p>
            <p className="text-base font-black text-slate-800">{avgOkr}%</p>
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200/60 flex items-center space-x-3">
          <div className="p-2.5 bg-sky-50 rounded-lg text-sky-600 shrink-0">
            <Activity size={18} />
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase">Điểm vận hành KPI</p>
            <p className="text-base font-black text-slate-800">{avgKpi}%</p>
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200/60 flex items-center space-x-3">
          <div className="p-2.5 bg-emerald-50 rounded-lg text-emerald-600 shrink-0">
            <CheckCircle size={18} />
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase">Tiến độ công việc</p>
            <p className="text-base font-black text-slate-800">{avgTask}%</p>
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200/60 col-span-2 md:col-span-1 flex items-center space-x-3">
          <div className="p-2.5 bg-amber-50 rounded-lg text-amber-600 shrink-0">
            <Star size={18} className="fill-amber-400 text-amber-500 animate-pulse" />
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase">Điểm Giá trị cốt lõi</p>
            <p className="text-base font-black text-slate-800">4.5 / 5</p>
          </div>
        </div>
      </div>

      {/* 3. MAIN SECTION WITH CHARTS AND DETAILED TABLE */}
      {activeTab === 'employees' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-[400px]">
          
          {/* Detailed Scorecard Table */}
          <div className="lg:col-span-2 flex flex-col space-y-4">
            <div style={cardStyle} className="rounded-[10px] border border-slate-200/60 p-5 shadow-sm flex flex-col flex-1">
              
              {/* Header and filters */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-4 border-b border-slate-100">
                <div>
                  <h3 className="text-xs font-black uppercase text-slate-500 tracking-wider">Danh sách bảng điểm cá nhân</h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">Phân tích trọng số điểm tổng hợp của từng thành viên.</p>
                </div>

                {/* Dept select filter */}
                <div className="flex items-center space-x-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200 shrink-0">
                  {['All', 'Sales & BD', 'Tech & Engineering', 'Customer Experience', 'Finance'].map((d) => (
                    <button
                      key={d}
                      onClick={() => setDeptFilter(d)}
                      className={cn(
                        "px-2.5 py-1 text-[10px] font-bold rounded-md transition-all cursor-pointer",
                        deptFilter === d ? "bg-white text-slate-800 shadow-sm" : "text-slate-500 hover:text-slate-800"
                      )}
                    >
                      {d === 'All' ? 'Tất cả' : d}
                    </button>
                  ))}
                </div>
              </div>

              {/* Table */}
              <div className="flex-1 overflow-auto mt-4 max-h-[400px]">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-slate-100 text-[10px] text-slate-400 font-bold uppercase">
                      <th className="py-3 px-2">Nhân viên</th>
                      <th className="py-3 px-2 text-center">OKRs</th>
                      <th className="py-3 px-2 text-center">KPIs</th>
                      <th className="py-3 px-2 text-center">Công việc</th>
                      <th className="py-3 px-2 text-center">Giá trị</th>
                      <th className="py-3 px-2 text-center">Điểm chung</th>
                      <th className="py-3 px-2 text-right">Phân loại</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredItems.map((item) => (
                      <tr 
                        key={item.id} 
                        className="hover:bg-slate-50/50 cursor-pointer transition-colors"
                        onClick={() => setSelectedItem(item)}
                      >
                        <td className="py-3 px-2 flex items-center space-x-2.5">
                          <img src={item.avatar} alt={item.name} className="w-8 h-8 rounded-full border border-slate-200 object-cover" />
                          <div>
                            <p className="font-bold text-slate-800 leading-tight">{item.name}</p>
                            <p className="text-[10px] text-slate-400 mt-0.5">{item.role}</p>
                          </div>
                        </td>
                        <td className="py-3 px-2 text-center font-bold text-slate-700">{item.okrScore}%</td>
                        <td className="py-3 px-2 text-center font-bold text-slate-700">{item.kpiScore}%</td>
                        <td className="py-3 px-2 text-center font-bold text-slate-700">{item.taskScore}%</td>
                        <td className="py-3 px-2 text-center font-bold text-amber-500">★ {item.valuesScore}</td>
                        <td className="py-3 px-2 text-center">
                          <span className="font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded text-[11px]">
                            {item.overallScore}%
                          </span>
                        </td>
                        <td className="py-3 px-2 text-right">
                          <span className={cn("px-2 py-0.5 rounded-full border text-[9px] font-black uppercase tracking-wider", getStatusBadge(item.status))}>
                            {getStatusLabel(item.status)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          </div>

          {/* Performance analysis chart sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div style={cardStyle} className="rounded-[10px] border border-slate-200/60 p-5 shadow-sm space-y-4">
              <div>
                <h3 className="text-xs font-black uppercase text-slate-500 tracking-wider">Xu hướng Hiệu suất</h3>
                <p className="text-[11px] text-slate-400 mt-0.5">Biểu đồ tiến độ trung bình qua 6 tháng gần nhất.</p>
              </div>

              <div className="h-44 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={TREND_DATA} margin={{ top: 5, right: 5, left: -25, bottom: 5 }}>
                    <defs>
                      <linearGradient id="colorOkr" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorKpi" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" stroke="#94a3b8" fontSize={9} />
                    <YAxis stroke="#94a3b8" fontSize={9} />
                    <Tooltip contentStyle={{ fontSize: '10px', borderRadius: '8px' }} />
                    <Area type="monotone" dataKey="OKR" stroke="#3b82f6" fillOpacity={1} fill="url(#colorOkr)" strokeWidth={2} />
                    <Area type="monotone" dataKey="KPI" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorKpi)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="flex justify-around text-[10px] pt-2 border-t border-slate-100">
                <div className="flex items-center space-x-1.5 font-bold">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shrink-0" />
                  <span className="text-slate-600">Độ hoàn thành OKR</span>
                </div>
                <div className="flex items-center space-x-1.5 font-bold">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-500 shrink-0" />
                  <span className="text-slate-600">Sức khỏe KPI</span>
                </div>
              </div>
            </div>

            {/* Profit.co Standard Methodology Banner */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 text-white rounded-2xl p-5 space-y-3 shadow-md border border-slate-700">
              <div className="flex items-center space-x-2">
                <Sparkles size={16} className="text-amber-400 animate-pulse" />
                <span className="text-[10px] font-black tracking-widest text-amber-400 uppercase">Triết lý Quản trị</span>
              </div>
              <h4 className="text-xs font-extrabold">Bộ chỉ số KPI & OKR tích hợp</h4>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                Profit.co khuyến nghị đánh giá nhân sự dựa trên kết quả thực thi chiến dịch (OKRs) song hành cùng chất lượng năng lực cốt lõi hàng ngày (KPIs) để đạt trạng thái phát triển bền vững.
              </p>
              <div className="bg-slate-700/50 p-2.5 rounded-xl flex items-center justify-between text-[10px]">
                <span className="font-bold text-amber-300">Công thức trọng số đề xuất</span>
                <span className="font-mono text-white">40% OKR + 40% KPI + 20% Task</span>
              </div>
            </div>
          </div>

        </div>
      ) : (
        /* Department View */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 flex-1">
          {[
            { name: 'Phòng Công nghệ (IT)', lead: 'David Tran', members: 12, okr: 85, kpi: 90, status: 'Excellent', rating: 4.6 },
            { name: 'Kinh doanh & Phát triển (Sales & BD)', lead: 'Roberto Canevari', members: 18, okr: 78, kpi: 80, status: 'Good', rating: 4.4 },
            { name: 'Chăm sóc Khách hàng (CX)', lead: 'Elena Rostova', members: 8, okr: 82, kpi: 85, status: 'Good', rating: 4.7 },
            { name: 'Ban Tài chính (Finance)', lead: 'Alice Nguyen', members: 4, okr: 68, kpi: 70, status: 'Average', rating: 4.2 }
          ].map((d, index) => (
            <div key={index} style={cardStyle} className="rounded-[10px] border border-slate-200/60 p-5 shadow-sm flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-extrabold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100 uppercase tracking-widest">
                    {d.members} Thành viên
                  </span>
                  <span className={cn("px-2 py-0.5 rounded-full border text-[9px] font-black uppercase tracking-wider", getStatusBadge(d.status as ScorecardItem['status']))}>
                    {getStatusLabel(d.status as ScorecardItem['status'])}
                  </span>
                </div>
                <h4 className="text-sm font-black text-slate-800 mt-2">{d.name}</h4>
                <p className="text-[10px] text-slate-400 mt-1">Trưởng bộ phận: <strong className="text-slate-600">{d.lead}</strong></p>
              </div>

              <div className="space-y-2 border-t border-b border-slate-100 py-3">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-500 font-bold">Điểm OKRs</span>
                  <span className="font-extrabold text-slate-700">{d.okr}%</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-full rounded-full" style={{ width: `${d.okr}%` }} />
                </div>

                <div className="flex items-center justify-between text-[11px] pt-1">
                  <span className="text-slate-500 font-bold">Độ khỏe KPIs</span>
                  <span className="font-extrabold text-slate-700">{d.kpi}%</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-purple-500 h-full rounded-full" style={{ width: `${d.kpi}%` }} />
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center space-x-1">
                  <Star size={12} className="fill-amber-400 text-amber-500" />
                  <span className="text-xs font-black text-slate-700">{d.rating}</span>
                </div>
                <button 
                  onClick={() => setActiveTab('employees')}
                  className="text-[10px] font-bold text-blue-600 hover:text-blue-700 hover:underline flex items-center space-x-0.5 cursor-pointer"
                >
                  <span>Xem thành viên</span>
                  <ChevronRight size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 4. DETAILS DRAWER MODAL */}
      <AnimatePresence>
        {selectedItem && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="absolute inset-0 bg-black z-40"
            />
            
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-[420px] bg-white border-l border-slate-200 shadow-2xl z-50 flex flex-col overflow-hidden"
            >
              <div className="p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
                <div>
                  <span className="text-[9px] font-extrabold uppercase text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                    Bản phân tích điểm chi tiết
                  </span>
                  <h3 className="text-sm font-black text-slate-800 mt-1">{selectedItem.name}</h3>
                </div>
                <button onClick={() => setSelectedItem(null)} className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-400 hover:text-slate-700 cursor-pointer">
                  <XAxis size={16} /> {/* Standard X can be replaced by normal X */}
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-5 space-y-6 text-xs">
                {/* Employee Header */}
                <div className="flex items-center space-x-3.5">
                  <img src={selectedItem.avatar} alt={selectedItem.name} className="w-14 h-14 rounded-full border-2 border-slate-200 object-cover" />
                  <div>
                    <h4 className="text-sm font-black text-slate-800 leading-snug">{selectedItem.name}</h4>
                    <p className="text-slate-400 leading-none mt-1">{selectedItem.role}</p>
                    <p className="text-[10px] text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100 inline-block mt-2">
                      {selectedItem.department}
                    </p>
                  </div>
                </div>

                {/* Score Summary Box */}
                <div className="bg-slate-900 text-white p-5 rounded-2xl shadow-lg space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-300">Điểm số tổng hợp</span>
                    <span className="text-xl font-black text-amber-400">{selectedItem.overallScore}%</span>
                  </div>

                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-amber-400 to-orange-500 h-full rounded-full" style={{ width: `${selectedItem.overallScore}%` }} />
                  </div>

                  <div className="flex justify-between text-[10px] text-slate-400 font-bold pt-1">
                    <span>Xếp hạng: {getStatusLabel(selectedItem.status)}</span>
                    <span className="text-white uppercase tracking-wider bg-slate-800 px-2 py-0.5 rounded">Q2 2026</span>
                  </div>
                </div>

                {/* Detailed components */}
                <div className="space-y-4 pt-2">
                  <h5 className="font-extrabold text-slate-800 border-b border-slate-100 pb-2 text-[11px] uppercase tracking-wider">Cơ cấu điểm thành phần</h5>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-600">1. Tiến độ mục tiêu chiến lược (OKRs)</span>
                      <span className="font-black text-slate-800">{selectedItem.okrScore}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-blue-500 h-full" style={{ width: `${selectedItem.okrScore}%` }} />
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="font-bold text-slate-600">2. Kết quả chỉ số sức khỏe vận hành (KPIs)</span>
                      <span className="font-black text-slate-800">{selectedItem.kpiScore}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-purple-500 h-full" style={{ width: `${selectedItem.kpiScore}%` }} />
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="font-bold text-slate-600">3. Tỷ lệ hoàn thành công việc liên kết</span>
                      <span className="font-black text-slate-800">{selectedItem.taskScore}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-sky-500 h-full" style={{ width: `${selectedItem.taskScore}%` }} />
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="font-bold text-slate-600">4. Thể hiện Giá trị cốt lõi (Core Values)</span>
                      <span className="font-black text-slate-800">★ {selectedItem.valuesScore} / 5</span>
                    </div>
                  </div>
                </div>

                {/* Peer recognition notes */}
                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <h5 className="font-extrabold text-slate-800 text-[11px] uppercase tracking-wider">Nhận xét đồng nghiệp & quản lý</h5>
                  <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl italic text-slate-500 leading-relaxed">
                    "Là nhân sự xuất sắc, luôn hành động kỷ luật cao và đóng góp nhiều sáng kiến cải tiến công nghệ chất lượng cho hệ thống."
                  </div>
                </div>

              </div>

              <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
                <button 
                  onClick={() => setSelectedItem(null)}
                  className="px-4 py-2 bg-slate-800 text-white rounded-lg font-bold text-xs hover:bg-slate-900 transition-all cursor-pointer"
                >
                  Đóng phân tích
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}
