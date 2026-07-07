import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { ChevronDown, BarChart, BookOpen, Sparkles, Filter, Info, Plus } from 'lucide-react';
import { OkrList, initialOkrs, Okr } from './OkrList';
import { AddOkrModal } from './AddOkrModal';

const data = [
  { name: 'Chưa bắt đầu', value: 281, color: '#4da6ff' },
  { name: 'Đúng tiến độ', value: 182, color: '#38c5b8' },
  { name: 'Có rủi ro', value: 51, color: '#f39c12' },
  { name: 'Gặp trở ngại', value: 24, color: '#e74c3c' },
  { name: 'Đã hoàn thành', value: 13, color: '#27ae60' },
];

type DashboardProps = {
  cardOpacity: number;
};

export function Dashboard({ cardOpacity }: DashboardProps) {
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [okrs, setOkrs] = useState<Okr[]>(initialOkrs);

  const handleAddOkr = (newOkrData: { objective: string; targetDate: string; status: any; keyResults: { name: string; progress: number }[] }) => {
    const newOkr: Okr = {
      id: Math.random().toString(36).substr(2, 9),
      objective: newOkrData.objective,
      status: newOkrData.status,
      targetDate: newOkrData.targetDate,
      keyResults: newOkrData.keyResults.map((kr) => ({
        id: `kr-${Math.random().toString(36).substr(2, 9)}`,
        name: kr.name,
        progress: kr.progress,
      })),
    };
    setOkrs((prev) => [newOkr, ...prev]);
  };

  const cardStyle = { 
    backgroundColor: 'rgba(255, 255, 255, 0.45)',
    backdropFilter: 'blur(12px)'
  };

  return (
    <div className="flex-1 overflow-auto p-6 space-y-6 flex flex-col">
      
      {/* 7. BỐ CỤC TRANG NỘI DUNG: BANNER BO CONG 4 GÓC 10PX */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-800 to-slate-900 rounded-[10px] shadow-lg p-6 text-white relative overflow-hidden transition-all duration-300 shrink-0">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 z-10 relative">
          
          {/* Chứa Icon đại diện cho tiêu đề có hiệu ứng động & tiêu đề chính dưới có tiêu đề phụ */}
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center animate-spin-slow">
              <BarChart size={28} className="text-orange-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Bảng phân tích hiệu suất</h2>
              <p className="text-xs text-blue-200">Đánh giá mục tiêu và xem phân tích biểu đồ tiến độ thực tế.</p>
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
              onClick={() => setIsAddModalOpen(true)}
              className="bg-orange-500 hover:bg-orange-600 transition-all font-bold text-xs px-4 py-2.5 rounded-lg flex items-center space-x-2 cursor-pointer shadow-md"
            >
              <Plus size={14} />
              <span>Tạo OKR mới</span>
            </button>
          </div>
        </div>

        {/* Banner chứa các nút tính năng như filter, nút tính năng */}
        
      </div>

      {/* Sub-navigation Tabs */}
      <div className="flex border-b border-gray-200 dark:border-slate-800 mb-2 bg-white dark:bg-slate-900 rounded-xl p-1.5 shadow-sm border shrink-0">
        <div className="flex flex-wrap items-center justify-between gap-4 w-full px-2 py-1">
          
          <div className="flex space-x-6 text-sm font-semibold">
            <div className="pb-1 border-b-2 border-orange-500 text-slate-800 dark:text-slate-200 cursor-pointer flex items-center space-x-1">
              <span>Đánh giá mục tiêu</span>
            </div>
            <div className="pb-1 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:text-slate-200 cursor-pointer transition-colors">
              <span>Mục tiêu liên kết Kết quả</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 text-xs">
            <FilterDropdown label="Phòng ban" />
            <FilterDropdown label="Người sở hữu" />
            <FilterDropdown label="Quản lý" />
            <div className="relative group">
              <select
                value={filterStatus || ''}
                onChange={(e) => setFilterStatus(e.target.value || null)}
                className="appearance-none bg-slate-100 dark:bg-slate-800 border border-white/20 rounded-lg px-3 py-1.5 pr-8 cursor-pointer hover:bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs focus:outline-none focus:ring-1 focus:ring-orange-400"
              >
                <option value="" className="text-gray-800">Tất cả Trạng thái</option>
                <option value="On Track" className="text-gray-800">Đúng tiến độ</option>
                <option value="At Risk" className="text-gray-800">Có rủi ro</option>
                <option value="Off Track" className="text-gray-800">Chậm trễ</option>
              </select>
              <ChevronDown size={12} className="text-slate-800 dark:text-slate-200 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        
        </div>
      </div>


      {/* Guide Box */}
      {showGuide && (
        <div className="p-5 rounded-[10px] border border-orange-200 bg-orange-50/95 shadow-md space-y-3 animate-in slide-in-from-top-4 duration-300">
          <h4 className="font-bold text-sm text-orange-950 flex items-center space-x-2">
            <BookOpen size={16} className="text-orange-600" />
            <span>Tài liệu: Cách vận hành Bảng hiệu suất</span>
          </h4>
          <p className="text-xs text-orange-900 leading-relaxed">
            Xem tổng quan tất cả các mục tiêu hiệu suất đang hoạt động. Bạn có thể sử dụng các bộ lọc ở góc trên bên phải để theo dõi cụ thể tiến trình theo phòng ban hoặc trạng thái. Mỗi mục tiêu (Objective) chứa nhiều kết quả then chốt (Key Results) riêng biệt với tiến độ tương ứng.
          </p>
        </div>
      )}

      {/* KPI Cards & Overall Progress */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard title="Tổng số mục tiêu" value="551" cardStyle={cardStyle} />
        <KpiCard title="Mục tiêu đang hoạt động" value="538" cardStyle={cardStyle} />
        <KpiCard title="Mục tiêu hoàn thành" value="13" cardStyle={cardStyle} />
        <div style={cardStyle} className="rounded-[10px] shadow-sm border border-gray-100 p-4 flex flex-col transition-all">
          <h3 className="text-gray-600 font-bold text-xs mb-2 uppercase tracking-wider">Tiến độ tổng thể</h3>
          <div className="flex-1 flex items-center justify-center relative">
            <div className="w-16 h-16 rounded-full flex items-center justify-center relative shadow-inner"
                 style={{ background: `conic-gradient(#1d4ed8 24%, #e5e7eb 0)` }}>
              <div className="absolute inset-0 m-2 bg-white rounded-full flex items-center justify-center">
                <span className="text-[#1d4ed8] font-bold text-base">24%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div style={cardStyle} className="rounded-[10px] shadow-sm border border-gray-100 p-6 space-y-6 transition-all">
        <h3 className="text-gray-800 font-bold text-sm flex items-center space-x-2 pb-3 border-b border-gray-100/50">
          <Info size={16} className="text-blue-500" />
          <span>Mục tiêu phân theo Trạng thái</span>
        </h3>
        
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="h-64 w-full lg:w-1/2 flex justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={3}
                  dataKey="value"
                  stroke="none"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number, name: string) => [`${value} mục tiêu`, name]}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          {/* List/Table view */}
          <div className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {data.map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-gray-50/50 border border-gray-100/50 hover:bg-white transition-colors">
                <div className="flex items-center space-x-2 text-xs font-semibold text-gray-700">
                  <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: item.color }}></span>
                  <span>{item.name}</span>
                </div>
                <span className="text-xs font-bold" style={{ color: item.color }}>{item.value} mục tiêu</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* OKR List Section */}
      <div style={cardStyle} className="rounded-[10px] shadow-sm border border-gray-100 p-6 transition-all">
        <OkrList 
          filterStatus={filterStatus} 
          onAddClick={() => setIsAddModalOpen(true)} 
          okrs={okrs}
          setOkrs={setOkrs}
        />
      </div>

      <AddOkrModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        onAdd={handleAddOkr}
      />
    </div>
  );
}

function KpiCard({ title, value, cardStyle }: { title: string; value: string; cardStyle: React.CSSProperties }) {
  return (
    <div style={cardStyle} className="rounded-[10px] shadow-sm border border-gray-100 p-4 flex flex-col h-28 transition-all">
      <h3 className="text-gray-500 font-bold text-xs uppercase tracking-wider">{title}</h3>
      <div className="flex-1 flex items-center justify-center">
        <span className="text-4xl text-gray-800 font-bold tracking-tight">{value}</span>
      </div>
    </div>
  );
}

function FilterDropdown({ label }: { label: string }) {
  return (
    <div className="flex items-center space-x-1.5 bg-white/10 border border-white/20 rounded-lg px-3 py-1.5 cursor-pointer hover:bg-white/15 text-white transition-all">
      <span className="font-semibold text-xs">{label}</span>
      <ChevronDown size={12} className="text-white/80" />
    </div>
  );
}
