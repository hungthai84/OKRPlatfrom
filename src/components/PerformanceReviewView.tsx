import React, { useState } from 'react';
import { 
  LineChart, 
  Calendar, 
  UserCheck, 
  Settings, 
  Plus, 
  Star, 
  ChevronRight, 
  ArrowUpRight, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  TrendingUp,
  Award,
  Users,
  Search,
  BookOpen
} from 'lucide-react';

type PerformanceReviewViewProps = {
  cardOpacity: number;
};

interface ReviewCycle {
  id: string;
  name: string;
  timeframe: string;
  status: 'Draft' | 'Active' | 'Calibrating' | 'Completed';
  participation: number; // Percentage
  dueDate: string;
  selfProgress: 'Not Started' | 'In Progress' | 'Submitted';
  peerProgress: string; // e.g. "2/3 Đã đánh giá"
}

interface Competency {
  name: string;
  category: string;
  description: string;
  selfScore: number;
  managerScore: number;
  peerScore: number;
}

interface CalibrationEmployee {
  id: string;
  name: string;
  role: string;
  avatar: string;
  performance: 'Low' | 'Medium' | 'High';
  potential: 'Low' | 'Medium' | 'High';
}

export default function PerformanceReviewView({ cardOpacity }: PerformanceReviewViewProps) {
  const [activeSubTab, setActiveSubTab] = useState<'cycles' | 'self' | 'calibration'>('cycles');
  const [showAddCycleModal, setShowAddCycleModal] = useState(false);
  
  // Fake state for review cycles
  const [cycles, setCycles] = useState<ReviewCycle[]>([
    {
      id: 'rc-1',
      name: 'Đánh giá Hiệu suất Toàn diện Q2 - 2026',
      timeframe: '01/04/2026 - 30/06/2026',
      status: 'Active',
      participation: 82,
      dueDate: '20/07/2026',
      selfProgress: 'In Progress',
      peerProgress: '1/3 Đã hoàn thành'
    },
    {
      id: 'rc-2',
      name: 'Đánh giá năng lực Khối Công nghệ - Định kỳ Hàng năm',
      timeframe: '01/01/2026 - 31/12/2026',
      status: 'Calibrating',
      participation: 95,
      dueDate: '10/07/2026',
      selfProgress: 'Submitted',
      peerProgress: '3/3 Đã hoàn thành'
    },
    {
      id: 'rc-3',
      name: 'Đánh giá Thử việc - Lập trình viên React & Fullstack',
      timeframe: '01/05/2026 - 30/06/2026',
      status: 'Completed',
      participation: 100,
      dueDate: '30/06/2026',
      selfProgress: 'Submitted',
      peerProgress: 'N/A'
    }
  ]);

  // Self assessment state
  const [competencies, setCompetencies] = useState<Competency[]>([
    {
      name: 'Chuyên môn Kỹ thuật (Technical Proficiency)',
      category: 'Năng lực cốt lõi',
      description: 'Khả năng thiết kế, tối ưu hóa hệ thống phần mềm và áp dụng kiến trúc sạch.',
      selfScore: 4,
      managerScore: 4,
      peerScore: 4.2
    },
    {
      name: 'Giải quyết vấn đề & Sáng kiến (Problem Solving & Innovation)',
      category: 'Năng lực cốt lõi',
      description: 'Nhạy bén phát hiện điểm nghẽn của khách hàng và đề xuất sáng kiến cải tiến tự động hóa.',
      selfScore: 3,
      managerScore: 4,
      peerScore: 3.8
    },
    {
      name: 'Kỹ năng Thương thuyết & Đàm phán (Negotiation & Influence)',
      category: 'Kỹ năng bổ trợ',
      description: 'Khả năng thương thảo hợp đồng, quản trị kỳ vọng khách hàng và đạt đồng thuận cao.',
      selfScore: 2,
      managerScore: 0, // Not yet rated
      peerScore: 3.0
    },
    {
      name: 'Tư duy Hướng khách hàng (Customer-Centric Mindset)',
      category: 'Năng lực Văn hóa',
      description: 'Luôn đặt trải nghiệm khách hàng lên hàng đầu trong mỗi dòng code và quy trình vận hành.',
      selfScore: 4,
      managerScore: 5,
      peerScore: 4.5
    }
  ]);

  // Calibration State (9-Box Matrix)
  const [employees, setEmployees] = useState<CalibrationEmployee[]>([
    { id: 'emp-1', name: 'Nguyễn Văn A', role: 'Solutions Architect', avatar: 'https://i.pravatar.cc/150?u=architect', performance: 'High', potential: 'High' },
    { id: 'emp-2', name: 'Trần Thị B', role: 'UX/UI Designer', avatar: 'https://i.pravatar.cc/150?u=designer', performance: 'High', potential: 'Medium' },
    { id: 'emp-3', name: 'Phạm Văn C', role: 'Fullstack Engineer', avatar: 'https://i.pravatar.cc/150?u=fullstack', performance: 'Medium', potential: 'High' },
    { id: 'emp-4', name: 'Lê Hoàng D', role: 'DevOps Specialist', avatar: 'https://i.pravatar.cc/150?u=devops', performance: 'Medium', potential: 'Medium' },
    { id: 'emp-5', name: 'Hoàng Văn E', role: 'Product Owner', avatar: 'https://i.pravatar.cc/150?u=product', performance: 'Low', potential: 'Medium' },
    { id: 'emp-6', name: 'Vũ Thị F', role: 'QA Automation', avatar: 'https://i.pravatar.cc/150?u=qa', performance: 'Medium', potential: 'Low' },
  ]);

  const [selectedCalibrationEmployee, setSelectedCalibrationEmployee] = useState<string>('');
  const [targetPerformance, setTargetPerformance] = useState<'Low' | 'Medium' | 'High'>('Medium');
  const [targetPotential, setTargetPotential] = useState<'Low' | 'Medium' | 'High'>('Medium');

  // New cycle form states
  const [newCycleName, setNewCycleName] = useState('');
  const [newCycleDueDate, setNewCycleDueDate] = useState('31/07/2026');

  const handleAddCycle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCycleName) return;
    const newCycle: ReviewCycle = {
      id: `rc-${Date.now()}`,
      name: newCycleName,
      timeframe: '01/07/2026 - 30/09/2026',
      status: 'Draft',
      participation: 0,
      dueDate: newCycleDueDate,
      selfProgress: 'Not Started',
      peerProgress: '0/3 Đã hoàn thành'
    };
    setCycles([newCycle, ...cycles]);
    setNewCycleName('');
    setShowAddCycleModal(false);
  };

  const handleCalibrationChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCalibrationEmployee) return;
    setEmployees(employees.map(emp => {
      if (emp.id === selectedCalibrationEmployee) {
        return { ...emp, performance: targetPerformance, potential: targetPotential };
      }
      return emp;
    }));
    setSelectedCalibrationEmployee('');
  };

  const updateSelfScore = (index: number, score: number) => {
    const updated = [...competencies];
    updated[index].selfScore = score;
    setCompetencies(updated);
  };

  // Get employees categorized by 9-Box
  const get9BoxCell = (perf: 'Low' | 'Medium' | 'High', pot: 'Low' | 'Medium' | 'High') => {
    return employees.filter(emp => emp.performance === perf && emp.potential === pot);
  };

  const cardStyle = { 
    backgroundColor: `rgba(255, 255, 255, ${cardOpacity / 100})`,
    backdropFilter: 'blur(12px)'
  };

  return (
    <div className="flex-1 overflow-auto p-6 space-y-6 flex flex-col select-none">
      
      {/* HEADER BANNER */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-800 to-slate-900 rounded-[10px] shadow-lg p-6 text-white relative overflow-hidden transition-all duration-300">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 z-10 relative">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center animate-pulse">
              <LineChart size={26} className="text-orange-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Hiệu suất phát triển</h2>
              <p className="text-xs text-blue-200">
                Chu trình đánh giá năng lực 360 độ, hiệu chuẩn ma trận 9-Box và định vị hiệu suất toàn diện
              </p>
            </div>
          </div>

          <div className="flex space-x-3 shrink-0">
            <button 
              onClick={() => setShowAddCycleModal(true)}
              className="bg-orange-500 hover:bg-orange-600 transition-all font-bold text-xs px-4 py-2.5 rounded-lg flex items-center space-x-2 cursor-pointer shadow-md"
            >
              <Plus size={14} />
              <span>Tạo chu kỳ đánh giá</span>
            </button>
          </div>
        </div>

        {/* SUB NAVIGATION TABS */}
        <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex space-x-6 text-sm font-semibold">
            <button 
              onClick={() => setActiveSubTab('cycles')}
              className={`pb-1 border-b-2 cursor-pointer transition-all ${
                activeSubTab === 'cycles' ? 'border-orange-500 text-white font-bold' : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              Chu kỳ đánh giá ({cycles.length})
            </button>
            <button 
              onClick={() => setActiveSubTab('self')}
              className={`pb-1 border-b-2 cursor-pointer transition-all ${
                activeSubTab === 'self' ? 'border-orange-500 text-white font-bold' : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              Tự đánh giá 360° của tôi
            </button>
            <button 
              onClick={() => setActiveSubTab('calibration')}
              className={`pb-1 border-b-2 cursor-pointer transition-all ${
                activeSubTab === 'calibration' ? 'border-orange-500 text-white font-bold' : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              Hiệu chuẩn & Ma trận 9-Box
            </button>
          </div>
        </div>
      </div>

      {/* RENDER ACTIVE TAB */}
      <div className="flex-1 flex flex-col space-y-6">
        {activeSubTab === 'cycles' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Col: Cycles List */}
            <div className="lg:col-span-2 space-y-4">
              {cycles.map((cycle) => (
                <div 
                  key={cycle.id}
                  style={cardStyle}
                  className="rounded-[10px] border border-slate-200/60 p-5 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center space-x-2.5">
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                        cycle.status === 'Active' ? 'bg-green-100 text-green-700 border border-green-200' :
                        cycle.status === 'Calibrating' ? 'bg-purple-100 text-purple-700 border border-purple-200' :
                        cycle.status === 'Completed' ? 'bg-gray-100 text-gray-700 border border-gray-200' :
                        'bg-orange-100 text-orange-700 border border-orange-200'
                      }`}>
                        {cycle.status === 'Active' ? 'Đang mở' :
                         cycle.status === 'Calibrating' ? 'Đang hiệu chuẩn' :
                         cycle.status === 'Completed' ? 'Đã đóng' : 'Bản nháp'}
                      </span>
                      <span className="text-xs text-slate-400 font-medium flex items-center">
                        <Calendar size={12} className="mr-1 text-slate-400" />
                        Hạn chót: {cycle.dueDate}
                      </span>
                    </div>
                    
                    <h3 className="font-bold text-slate-800 text-base">{cycle.name}</h3>
                    <p className="text-xs text-slate-400 font-medium">Khung thời gian dữ liệu: {cycle.timeframe}</p>
                    
                    {/* Participation bar */}
                    <div className="space-y-1 max-w-xs pt-2">
                      <div className="flex justify-between text-[10px] font-bold text-slate-500">
                        <span>Tỷ lệ tham gia hoàn tất</span>
                        <span>{cycle.participation}%</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                        <div 
                          className="bg-blue-600 h-full rounded-full transition-all duration-500"
                          style={{ width: `${cycle.participation}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="border-t md:border-t-0 md:border-l border-slate-200/60 pt-4 md:pt-0 md:pl-6 flex flex-col justify-center items-stretch space-y-2 min-w-[180px]">
                    <div className="text-xs text-slate-600 space-y-1">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Tự đánh giá:</span>
                        <span className={`font-bold ${cycle.selfProgress === 'Submitted' ? 'text-green-600' : 'text-orange-500'}`}>
                          {cycle.selfProgress === 'Submitted' ? 'Đã nộp' : cycle.selfProgress === 'In Progress' ? 'Đang làm' : 'Chưa mở'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Đồng nghiệp:</span>
                        <span className="font-bold text-slate-700">{cycle.peerProgress}</span>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => setActiveSubTab('self')}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] py-1.5 px-3 rounded-lg shadow-sm transition-colors text-center cursor-pointer"
                    >
                      {cycle.selfProgress === 'Submitted' ? 'Xem lại đánh giá' : 'Thực hiện Đánh giá'}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Col: Performance Analytics */}
            <div className="space-y-6">
              <div 
                style={cardStyle}
                className="rounded-[10px] border border-slate-200/60 p-5 shadow-sm space-y-4"
              >
                <h3 className="font-bold text-slate-800 text-sm flex items-center space-x-2">
                  <TrendingUp size={16} className="text-orange-500" />
                  <span>Tổng quan hiệu suất bộ phận</span>
                </h3>

                <div className="space-y-3 pt-2">
                  <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg flex justify-between items-center">
                    <div>
                      <span className="block text-[10px] font-bold text-slate-400 uppercase">Điểm trung bình Đơn vị</span>
                      <span className="text-xl font-black text-slate-800 mt-0.5">4.18 / 5.0</span>
                    </div>
                    <span className="text-green-600 text-xs font-bold bg-green-50 px-2 py-0.5 rounded border border-green-100 flex items-center">
                      +4.2% so với Q1
                    </span>
                  </div>

                  <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg flex justify-between items-center">
                    <div>
                      <span className="block text-[10px] font-bold text-slate-400 uppercase">Tỷ lệ hoàn tất kỳ đánh giá</span>
                      <span className="text-xl font-black text-slate-800 mt-0.5">89.6%</span>
                    </div>
                    <span className="text-blue-600 text-xs font-bold bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                      Tốt nhất khối
                    </span>
                  </div>
                </div>

                <div className="pt-2">
                  <h4 className="text-xs font-bold text-slate-600 mb-2">Thống kê xếp loại năng lực:</h4>
                  <div className="space-y-2">
                    {[
                      { l: 'Xuất sắc (A - Outstanding)', p: 15, c: 'bg-emerald-500' },
                      { l: 'Vượt mong đợi (B - High Performer)', p: 45, c: 'bg-blue-500' },
                      { l: 'Đạt yêu cầu (C - Met Expectations)', p: 35, c: 'bg-indigo-500' },
                      { l: 'Cần cải thiện (D - Needs Improvement)', p: 5, c: 'bg-orange-500' },
                    ].map((item, i) => (
                      <div key={i} className="space-y-1">
                        <div className="flex justify-between text-[11px] font-semibold text-slate-500">
                          <span>{item.l}</span>
                          <span>{item.p}%</span>
                        </div>
                        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                          <div className={`h-full ${item.c}`} style={{ width: `${item.p}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSubTab === 'self' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Col: Core Competencies Evaluation */}
            <div className="lg:col-span-2 space-y-4">
              <div 
                style={cardStyle}
                className="rounded-[10px] border border-slate-200/60 p-5 shadow-sm space-y-4"
              >
                <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                  <h3 className="font-bold text-slate-800 text-base">Đánh giá Năng lực Phát triển</h3>
                  <span className="text-xs text-orange-600 font-bold bg-orange-50 border border-orange-100 px-2.5 py-0.5 rounded-full">
                    Kỳ đánh giá Q2/2026
                  </span>
                </div>

                <div className="space-y-6 pt-2">
                  {competencies.map((comp, index) => (
                    <div key={index} className="space-y-2.5 border-b border-slate-100 pb-5 last:border-none last:pb-0">
                      <div>
                        <span className="text-[10px] font-bold text-blue-600 uppercase bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-md">
                          {comp.category}
                        </span>
                        <h4 className="font-bold text-slate-800 text-sm mt-1.5">{comp.name}</h4>
                        <p className="text-xs text-slate-400 font-medium leading-relaxed mt-1">{comp.description}</p>
                      </div>

                      {/* Score stars selection */}
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pt-2">
                        <div className="flex items-center space-x-2">
                          <span className="text-xs font-bold text-slate-500 w-24">Tự đánh giá:</span>
                          <div className="flex space-x-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                type="button"
                                onClick={() => updateSelfScore(index, star)}
                                className="cursor-pointer hover:scale-110 transition-transform"
                              >
                                <Star 
                                  size={18} 
                                  className={star <= comp.selfScore ? "text-orange-500 fill-orange-500" : "text-slate-300"} 
                                />
                              </button>
                            ))}
                          </div>
                          <span className="text-xs font-bold text-orange-600 ml-1">({comp.selfScore} / 5)</span>
                        </div>

                        {/* Benchmark Peer and Manager Scores if available */}
                        <div className="flex space-x-4 text-xs">
                          <div className="flex items-center space-x-1">
                            <span className="text-slate-400">Đồng nghiệp:</span>
                            <span className="font-bold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200/50">
                              {comp.peerScore} ★
                            </span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <span className="text-slate-400">Quản lý duyệt:</span>
                            <span className={`font-bold px-1.5 py-0.5 rounded border ${
                              comp.managerScore > 0 
                                ? 'bg-green-50 text-green-700 border-green-200' 
                                : 'bg-amber-50 text-amber-600 border-amber-200'
                            }`}>
                              {comp.managerScore > 0 ? `${comp.managerScore} ★` : 'Chưa chấm'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 flex justify-between items-center border-t border-slate-100">
                  <div className="text-xs text-slate-400 font-medium flex items-center">
                    <Clock size={14} className="mr-1 text-slate-400" />
                    Lưu bản nháp tự động lúc vừa xong
                  </div>
                  <button 
                    onClick={() => alert('Chúc mừng Anh đã nộp bảng Tự đánh giá năng lực thành công! Quản lý của Anh đã nhận được thông báo để bắt đầu bước phản biện.')}
                    className="bg-green-600 hover:bg-green-700 text-white font-bold text-xs px-5 py-2.5 rounded-lg shadow-md transition-all cursor-pointer"
                  >
                    Gửi bảng Tự đánh giá
                  </button>
                </div>
              </div>
            </div>

            {/* Right Col: Mentor & Reviewer list */}
            <div className="space-y-6">
              <div 
                style={cardStyle}
                className="rounded-[10px] border border-slate-200/60 p-5 shadow-sm space-y-4"
              >
                <h3 className="font-bold text-slate-800 text-sm flex items-center space-x-2">
                  <Users size={16} className="text-blue-600" />
                  <span>Người phản biện đánh giá của bạn</span>
                </h3>

                <div className="space-y-3 pt-2">
                  {[
                    { name: 'Roberto Carlos', role: 'Giám đốc Điều hành (Quản lý trực tiếp)', avatar: 'https://i.pravatar.cc/150?u=roberto', type: 'Primary Manager', status: 'Pending Review' },
                    { name: 'David Beckham', role: 'Solutions Architect (Đồng nghiệp)', avatar: 'https://i.pravatar.cc/150?u=david', type: 'Peer Reviewer', status: 'Completed' },
                    { name: 'Elena Rostova', role: 'CX Senior Mentor (Cố vấn chuyên môn)', avatar: 'https://i.pravatar.cc/150?u=elena', type: 'Peer Reviewer', status: 'Pending' }
                  ].map((reviewer, i) => (
                    <div key={i} className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-100 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <img src={reviewer.avatar} alt={reviewer.name} className="w-9 h-9 rounded-full border border-white shadow" />
                        <div>
                          <span className="block font-bold text-slate-800 text-xs">{reviewer.name}</span>
                          <span className="block text-[10px] text-slate-400 font-semibold">{reviewer.role}</span>
                        </div>
                      </div>
                      <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${
                        reviewer.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-slate-200 text-slate-600'
                      }`}>
                        {reviewer.status === 'Completed' ? 'Xong' : 'Chờ'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSubTab === 'calibration' && (
          <div className="space-y-6">
            {/* Calibration Admin controller */}
            <div 
              style={cardStyle}
              className="rounded-[10px] border border-slate-200/60 p-5 shadow-sm space-y-4"
            >
              <h3 className="font-bold text-slate-800 text-base">Bộ công cụ Hiệu chuẩn Hội đồng Quản trị</h3>
              <p className="text-xs text-slate-400 font-medium">
                Sử dụng ma trận 9-Box để thống nhất định vị năng lực (Performance) và tiềm năng phát triển (Potential) của từng nhân sự, hạn chế thiên vị chủ quan từ quản lý trực tiếp.
              </p>

              <form onSubmit={handleCalibrationChange} className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-slate-50 border border-slate-100 rounded-xl p-4">
                <div className="flex flex-col space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase">Chọn nhân sự hiệu chuẩn</label>
                  <select 
                    value={selectedCalibrationEmployee}
                    onChange={(e) => setSelectedCalibrationEmployee(e.target.value)}
                    className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs font-bold text-slate-700 outline-none cursor-pointer"
                  >
                    <option value="">-- Chọn nhân sự --</option>
                    {employees.map(emp => (
                      <option key={emp.id} value={emp.id}>
                        {emp.name} ({emp.role}) - Hiện tại: {emp.performance}/{emp.potential}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase">Năng lực đánh giá (Performance)</label>
                  <select 
                    value={targetPerformance}
                    onChange={(e) => setTargetPerformance(e.target.value as any)}
                    className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs font-bold text-slate-700 outline-none cursor-pointer"
                  >
                    <option value="Low">Thấp (Below Target)</option>
                    <option value="Medium">Đạt (On Target)</option>
                    <option value="High">Cao (Outstanding)</option>
                  </select>
                </div>

                <div className="flex flex-col space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase">Tiềm năng phát triển (Potential)</label>
                  <select 
                    value={targetPotential}
                    onChange={(e) => setTargetPotential(e.target.value as any)}
                    className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs font-bold text-slate-700 outline-none cursor-pointer"
                  >
                    <option value="Low">Thấp (Limited Potential)</option>
                    <option value="Medium">Vừa (Growth Potential)</option>
                    <option value="High">Cao (High Potential)</option>
                  </select>
                </div>

                <div className="flex items-end">
                  <button 
                    type="submit"
                    disabled={!selectedCalibrationEmployee}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold text-xs py-2 px-4 rounded-lg shadow-md transition-all cursor-pointer h-[38px] flex items-center justify-center space-x-1.5"
                  >
                    <Settings size={14} />
                    <span>Hiệu chuẩn Ngay</span>
                  </button>
                </div>
              </form>
            </div>

            {/* 9-BOX MATRIX GRAPHICS - GORGEOUS GRID */}
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
              
              <div className="xl:col-span-3 bg-white border border-slate-200/60 rounded-[10px] shadow-sm overflow-hidden flex flex-col">
                <div className="bg-slate-800 text-white p-4 flex justify-between items-center">
                  <h4 className="font-bold text-xs uppercase tracking-widest flex items-center space-x-2">
                    <TrendingUp size={14} className="text-orange-400" />
                    <span>Ma trận 9-Box Calibration (Power Service)</span>
                  </h4>
                  <span className="text-[10px] text-slate-300 font-bold">Y-Axis: Tiềm năng | X-Axis: Năng lực</span>
                </div>

                {/* 9-Box Grid */}
                <div className="p-6 bg-slate-50 flex-1 flex flex-col min-h-[450px]">
                  
                  {/* Grid layout */}
                  <div className="grid grid-cols-3 gap-3 flex-1">
                    
                    {/* Row 1: Potential High */}
                    {/* Pot High, Perf Low: Kẻ Mơ Mộng (Enigma) */}
                    <div className="bg-amber-50/70 border border-amber-200/70 rounded-lg p-3 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] font-bold text-amber-700 uppercase">Tiềm năng Cao | Năng lực Thấp</span>
                        <span className="text-[9px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-bold">Kẻ Mơ Mộng</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 py-2">
                        {get9BoxCell('Low', 'High').map(emp => (
                          <div key={emp.id} className="flex items-center space-x-1 bg-white border border-slate-200/50 rounded-full px-2 py-0.5 shadow-sm" title={`${emp.name} - ${emp.role}`}>
                            <img src={emp.avatar} className="w-4.5 h-4.5 rounded-full" />
                            <span className="text-[10px] font-bold text-slate-700 truncate max-w-[70px]">{emp.name}</span>
                          </div>
                        ))}
                        {get9BoxCell('Low', 'High').length === 0 && <span className="text-[10px] text-slate-400 italic">Trống</span>}
                      </div>
                    </div>

                    {/* Pot High, Perf Med: Ngôi sao đang lên (High Potential) */}
                    <div className="bg-blue-50 border border-blue-200/70 rounded-lg p-3 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] font-bold text-blue-700 uppercase">Tiềm năng Cao | Năng lực Đạt</span>
                        <span className="text-[9px] bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded font-bold">Ngôi Sao Mới</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 py-2">
                        {get9BoxCell('Medium', 'High').map(emp => (
                          <div key={emp.id} className="flex items-center space-x-1 bg-white border border-slate-200/50 rounded-full px-2 py-0.5 shadow-sm" title={`${emp.name} - ${emp.role}`}>
                            <img src={emp.avatar} className="w-4.5 h-4.5 rounded-full" />
                            <span className="text-[10px] font-bold text-slate-700 truncate max-w-[70px]">{emp.name}</span>
                          </div>
                        ))}
                        {get9BoxCell('Medium', 'High').length === 0 && <span className="text-[10px] text-slate-400 italic">Trống</span>}
                      </div>
                    </div>

                    {/* Pot High, Perf High: Siêu sao cốt lõi (Star Performer) */}
                    <div className="bg-green-50 border border-green-200/80 rounded-lg p-3 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] font-bold text-green-700 uppercase">Tiềm năng Cao | Năng lực Cao</span>
                        <span className="text-[9px] bg-green-100 text-green-800 px-1.5 py-0.5 rounded font-bold">Siêu Sao (Star)</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 py-2">
                        {get9BoxCell('High', 'High').map(emp => (
                          <div key={emp.id} className="flex items-center space-x-1 bg-white border border-slate-200/50 rounded-full px-2 py-0.5 shadow-sm" title={`${emp.name} - ${emp.role}`}>
                            <img src={emp.avatar} className="w-4.5 h-4.5 rounded-full" />
                            <span className="text-[10px] font-bold text-slate-700 truncate max-w-[70px]">{emp.name}</span>
                          </div>
                        ))}
                        {get9BoxCell('High', 'High').length === 0 && <span className="text-[10px] text-slate-400 italic">Trống</span>}
                      </div>
                    </div>

                    {/* Row 2: Potential Medium */}
                    {/* Pot Med, Perf Low: Nhân sự cần cải thiện (Dilemma) */}
                    <div className="bg-slate-100/70 border border-slate-200 rounded-lg p-3 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] font-bold text-slate-500 uppercase">Tiềm năng Đạt | Năng lực Thấp</span>
                        <span className="text-[9px] bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded font-bold">Khó Khăn</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 py-2">
                        {get9BoxCell('Low', 'Medium').map(emp => (
                          <div key={emp.id} className="flex items-center space-x-1 bg-white border border-slate-200/50 rounded-full px-2 py-0.5 shadow-sm" title={`${emp.name} - ${emp.role}`}>
                            <img src={emp.avatar} className="w-4.5 h-4.5 rounded-full" />
                            <span className="text-[10px] font-bold text-slate-700 truncate max-w-[70px]">{emp.name}</span>
                          </div>
                        ))}
                        {get9BoxCell('Low', 'Medium').length === 0 && <span className="text-[10px] text-slate-400 italic">Trống</span>}
                      </div>
                    </div>

                    {/* Pot Med, Perf Med: Người đóng góp cốt lõi (Key Player) */}
                    <div className="bg-blue-50/50 border border-blue-200/50 rounded-lg p-3 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] font-bold text-blue-600 uppercase">Tiềm năng Đạt | Năng lực Đạt</span>
                        <span className="text-[9px] bg-blue-100/50 text-blue-700 px-1.5 py-0.5 rounded font-bold">Chủ Lực (Key Player)</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 py-2">
                        {get9BoxCell('Medium', 'Medium').map(emp => (
                          <div key={emp.id} className="flex items-center space-x-1 bg-white border border-slate-200/50 rounded-full px-2 py-0.5 shadow-sm" title={`${emp.name} - ${emp.role}`}>
                            <img src={emp.avatar} className="w-4.5 h-4.5 rounded-full" />
                            <span className="text-[10px] font-bold text-slate-700 truncate max-w-[70px]">{emp.name}</span>
                          </div>
                        ))}
                        {get9BoxCell('Medium', 'Medium').length === 0 && <span className="text-[10px] text-slate-400 italic">Trống</span>}
                      </div>
                    </div>

                    {/* Pot Med, Perf High: Người làm xuất sắc chuyên môn (High Performer) */}
                    <div className="bg-green-50/50 border border-green-200/50 rounded-lg p-3 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] font-bold text-green-600 uppercase">Tiềm năng Đạt | Năng lực Cao</span>
                        <span className="text-[9px] bg-green-100/50 text-green-700 px-1.5 py-0.5 rounded font-bold">Hiệu Suất Cao</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 py-2">
                        {get9BoxCell('High', 'Medium').map(emp => (
                          <div key={emp.id} className="flex items-center space-x-1 bg-white border border-slate-200/50 rounded-full px-2 py-0.5 shadow-sm" title={`${emp.name} - ${emp.role}`}>
                            <img src={emp.avatar} className="w-4.5 h-4.5 rounded-full" />
                            <span className="text-[10px] font-bold text-slate-700 truncate max-w-[70px]">{emp.name}</span>
                          </div>
                        ))}
                        {get9BoxCell('High', 'Medium').length === 0 && <span className="text-[10px] text-slate-400 italic">Trống</span>}
                      </div>
                    </div>

                    {/* Row 3: Potential Low */}
                    {/* Pot Low, Perf Low: Rủi ro đào thải (Underperformer) */}
                    <div className="bg-red-50/70 border border-red-200/70 rounded-lg p-3 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] font-bold text-red-700 uppercase">Tiềm năng Thấp | Năng lực Thấp</span>
                        <span className="text-[9px] bg-red-100 text-red-800 px-1.5 py-0.5 rounded font-bold">Rủi Ro Cao</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 py-2">
                        {get9BoxCell('Low', 'Low').map(emp => (
                          <div key={emp.id} className="flex items-center space-x-1 bg-white border border-slate-200/50 rounded-full px-2 py-0.5 shadow-sm" title={`${emp.name} - ${emp.role}`}>
                            <img src={emp.avatar} className="w-4.5 h-4.5 rounded-full" />
                            <span className="text-[10px] font-bold text-slate-700 truncate max-w-[70px]">{emp.name}</span>
                          </div>
                        ))}
                        {get9BoxCell('Low', 'Low').length === 0 && <span className="text-[10px] text-slate-400 italic">Trống</span>}
                      </div>
                    </div>

                    {/* Pot Low, Perf Med: Người lao động thầm lặng (Solid Citizen) */}
                    <div className="bg-slate-100/50 border border-slate-200/50 rounded-lg p-3 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] font-bold text-slate-500 uppercase">Tiềm năng Thấp | Năng lực Đạt</span>
                        <span className="text-[9px] bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded font-bold">Chăm Chỉ</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 py-2">
                        {get9BoxCell('Medium', 'Low').map(emp => (
                          <div key={emp.id} className="flex items-center space-x-1 bg-white border border-slate-200/50 rounded-full px-2 py-0.5 shadow-sm" title={`${emp.name} - ${emp.role}`}>
                            <img src={emp.avatar} className="w-4.5 h-4.5 rounded-full" />
                            <span className="text-[10px] font-bold text-slate-700 truncate max-w-[70px]">{emp.name}</span>
                          </div>
                        ))}
                        {get9BoxCell('Medium', 'Low').length === 0 && <span className="text-[10px] text-slate-400 italic">Trống</span>}
                      </div>
                    </div>

                    {/* Pot Low, Perf High: Chuyên gia ổn định kỹ năng (Workhorse) */}
                    <div className="bg-orange-50/50 border border-orange-200/50 rounded-lg p-3 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] font-bold text-orange-600 uppercase">Tiềm năng Thấp | Năng lực Cao</span>
                        <span className="text-[9px] bg-orange-100 text-orange-800 px-1.5 py-0.5 rounded font-bold">Chuyên Gia</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 py-2">
                        {get9BoxCell('High', 'Low').map(emp => (
                          <div key={emp.id} className="flex items-center space-x-1 bg-white border border-slate-200/50 rounded-full px-2 py-0.5 shadow-sm" title={`${emp.name} - ${emp.role}`}>
                            <img src={emp.avatar} className="w-4.5 h-4.5 rounded-full" />
                            <span className="text-[10px] font-bold text-slate-700 truncate max-w-[70px]">{emp.name}</span>
                          </div>
                        ))}
                        {get9BoxCell('High', 'Low').length === 0 && <span className="text-[10px] text-slate-400 italic">Trống</span>}
                      </div>
                    </div>

                  </div>
                </div>
              </div>

              {/* Sidebar calibration rules */}
              <div 
                style={cardStyle}
                className="rounded-[10px] border border-slate-200/60 p-5 shadow-sm flex flex-col justify-between space-y-4"
              >
                <div>
                  <h4 className="font-bold text-slate-800 text-sm flex items-center space-x-1.5 border-b border-slate-100 pb-2">
                    <Award size={16} className="text-orange-500" />
                    <span>Quy tắc Xếp loại Ma trận</span>
                  </h4>
                  <ul className="text-xs text-slate-500 space-y-3 mt-3 font-medium">
                    <li>
                      <strong className="text-slate-700 block mb-0.5">⭐ Siêu Sao (Top-Right)</strong>
                      Những nhân sự vượt bậc cả về năng lực lẫn tiềm năng phát triển. Cần ưu tiên thăng tiến và cấp cổ phiếu thưởng (ESOP).
                    </li>
                    <li>
                      <strong className="text-slate-700 block mb-0.5">📈 Ngôi sao mới & Hiệu suất Cao</strong>
                      Cột trụ vận hành cốt lõi của doanh nghiệp. Cần đầu tư đào tạo lãnh đạo và gia tăng phúc lợi giữ chân.
                    </li>
                    <li>
                      <strong className="text-slate-700 block mb-0.5">⚠️ Rủi ro (Bottom-Left)</strong>
                      Nhân sự suy giảm cả năng lực lẫn thái độ cầu tiến. Cần lập tức áp dụng PIP (Kế hoạch Cải thiện Hiệu suất 3 tháng).
                    </li>
                  </ul>
                </div>
                
                <div className="bg-slate-50 border border-slate-100 p-3 rounded-lg text-xs text-slate-400 font-semibold italic text-center">
                  Nhấn "Hiệu chuẩn Ngay" bên trên để đồng bộ hóa vị trí nhân viên thời gian thực.
                </div>
              </div>

            </div>
          </div>
        )}
      </div>

      {/* CREATE CYCLE MODAL */}
      {showAddCycleModal && (
        <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-200">
          <div className="bg-white border border-slate-200 rounded-[10px] p-6 max-w-md w-full shadow-2xl space-y-4">
            <h3 className="font-bold text-slate-800 text-lg">Thiết lập Chu kỳ Đánh giá mới</h3>
            <form onSubmit={handleAddCycle} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 block">Tên chu kỳ đánh giá</label>
                <input 
                  type="text" 
                  required
                  placeholder="Ví dụ: Đánh giá Hiệu suất Q3 - 2026"
                  value={newCycleName}
                  onChange={(e) => setNewCycleName(e.target.value)}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs font-medium text-slate-700 focus:border-blue-500 outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 block">Hạn hoàn thành</label>
                <input 
                  type="text" 
                  value={newCycleDueDate}
                  onChange={(e) => setNewCycleDueDate(e.target.value)}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs font-medium text-slate-700 focus:border-blue-500 outline-none"
                />
              </div>

              <div className="flex space-x-2 pt-2 justify-end">
                <button 
                  type="button" 
                  onClick={() => setShowAddCycleModal(false)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs px-4 py-2 rounded-lg cursor-pointer"
                >
                  Hủy
                </button>
                <button 
                  type="submit" 
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs px-4 py-2 rounded-lg cursor-pointer shadow-md"
                >
                  Kích hoạt Chu kỳ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
