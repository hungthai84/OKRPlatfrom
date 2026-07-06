import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { 
  LayoutGrid, 
  List, 
  Download, 
  Trash2, 
  Edit3, 
  Plus, 
  Search,
  CheckCircle2,
  Clock,
  FileText,
  X,
  Briefcase,
  GitFork,
  CheckSquare,
  Building,
  BookOpen
} from 'lucide-react';
import { TaskSettingView } from './TaskSettingView';

export interface ProjectData {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'completed' | 'on_hold';
  dueDate: string;
  startDate?: string;
  parentProjectId?: string;
  taskListIds?: string[];
  department?: string;
}

const fallbackProjects: ProjectData[] = [
  {
    id: 'proj-1',
    name: 'Nâng cấp Hệ thống Nhân sự Core',
    description: 'Nâng cấp toàn diện cơ sở hạ tầng, tối ưu hóa các quy trình quản lý thông tin nhân viên.',
    status: 'active',
    dueDate: '2026-08-31',
    department: 'HR'
  },
  {
    id: 'proj-2',
    name: 'Đo lường & Đồng bộ OKRs doanh nghiệp',
    description: 'Xây dựng giải pháp phần mềm tự động giúp theo dõi mục tiêu then chốt của từng phòng ban.',
    status: 'active',
    dueDate: '2026-09-15',
    department: 'IT'
  },
  {
    id: 'proj-2-sub-1',
    name: 'Tích hợp phân tích dữ liệu tự động AI',
    description: 'Xây dựng mô-đun đề xuất chỉ số then chốt thông minh.',
    status: 'active',
    dueDate: '2026-09-10',
    parentProjectId: 'proj-2',
    department: 'IT'
  },
  {
    id: 'proj-3',
    name: 'Chiến dịch Quảng bá Sản phẩm 2026',
    description: 'Phát triển thương hiệu số thông qua các kênh truyền thông trực tuyến và sự kiện khách hàng.',
    status: 'on_hold',
    dueDate: '2026-10-01',
    department: 'Marketing'
  },
  {
    id: 'proj-4',
    name: 'Tối ưu hóa SLA kỹ thuật',
    description: 'Giảm thời gian phản hồi yêu cầu hỗ trợ khách hàng từ 4 giờ xuống còn dưới 1 giờ.',
    status: 'completed',
    dueDate: '2026-06-30',
    department: 'IT'
  }
];

interface ProjectManagementViewProps {
  cardOpacity: number;
  initialTab?: 'projects' | 'tasks';
}

export function ProjectManagementView({ cardOpacity, initialTab = 'projects' }: ProjectManagementViewProps) {
  const [projects, setProjects] = useState<ProjectData[]>(() => {
    const saved = localStorage.getItem('mock_projects');
    return saved ? JSON.parse(saved) : fallbackProjects;
  });

  const [activeTab, setActiveTab] = useState<'projects' | 'tasks'>(initialTab);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);
  const [toastMessage, setToastMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [dueDateFilter, setDueDateFilter] = useState<'all' | 'overdue' | 'this_week' | 'this_month'>('all');
  const [viewMode, setViewMode] = useState<'list' | 'timeline'>('list');
  const [statsTab, setStatsTab] = useState<'chart' | 'flowchart'>('chart');

  // Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDocModal, setShowDocModal] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [currentProject, setCurrentProject] = useState<Partial<ProjectData>>({
    status: 'active',
    name: '',
    description: '',
    department: 'None'
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 2500);
  };

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (modalMode === 'add') {
        const newProj: ProjectData = {
          ...currentProject,
          id: `proj-${Date.now()}`,
          dueDate: currentProject.dueDate || new Date().toISOString().split('T')[0],
          status: currentProject.status || 'active',
          name: currentProject.name || '',
          description: currentProject.description || '',
          department: currentProject.department || 'None'
        } as ProjectData;

        const updated = [...projects, newProj];
        setProjects(updated);
        localStorage.setItem('mock_projects', JSON.stringify(updated));
        showToast('Đã thêm dự án mới thành công!');
      } else if (currentProject.id) {
        const updated = projects.map(p => p.id === currentProject.id ? { ...p, ...currentProject } as ProjectData : p);
        setProjects(updated);
        localStorage.setItem('mock_projects', JSON.stringify(updated));
        showToast('Đã cập nhật dự án thành công!');
      }
      setShowAddModal(false);
    } catch (error) {
      console.error('Error saving project:', error);
      showToast('Có lỗi xảy ra khi lưu dự án.');
    }
  };

  const handleDeleteProject = (id: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa dự án này và tất cả các dự án con liên quan?')) {
      try {
        const updated = projects.filter(p => p.id !== id && p.parentProjectId !== id);
        setProjects(updated);
        localStorage.setItem('mock_projects', JSON.stringify(updated));
        showToast('Đã xóa dự án thành công.');
      } catch (error) {
        console.error('Error deleting project:', error);
        showToast('Có lỗi xảy ra khi xóa dự án.');
      }
    }
  };

  const getFilteredProjects = () => {
    return projects.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           p.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDept = selectedDepartment === 'all' || p.department === selectedDepartment;
      
      let matchesDate = true;
      if (dueDateFilter !== 'all' && p.dueDate) {
        const due = new Date(p.dueDate);
        const now = new Date();
        if (dueDateFilter === 'overdue') matchesDate = due < now && p.status !== 'completed';
        else if (dueDateFilter === 'this_week') {
          const nextWeek = new Date();
          nextWeek.setDate(now.getDate() + 7);
          matchesDate = due >= now && due <= nextWeek;
        } else if (dueDateFilter === 'this_month') {
          matchesDate = due.getMonth() === now.getMonth() && due.getFullYear() === now.getFullYear();
        }
      }

      return matchesSearch && matchesDept && matchesDate;
    });
  };

  const calculateProjectProgress = (p: ProjectData) => {
    if (p.status === 'completed') return 100;
    // Mock progress calculation for demo based on hash ID
    const progressHash = p.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return (progressHash % 60) + 20; // returns stable 20-80% progress
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text('Danh sách Dự án', 14, 15);
    const data = getFilteredProjects().map(p => [p.name, p.status, p.department || 'None', p.dueDate]);
    autoTable(doc, {
      head: [['Tên dự án', 'Trạng thái', 'Phòng ban', 'Hạn chót']],
      body: data,
      startY: 20
    });
    doc.save('danh-sach-du-an.pdf');
  };

  const handleExportCSV = () => {
    const headers = ['Tên dự án,Trạng thái,Phòng ban,Hạn chót'];
    const rows = getFilteredProjects().map(p => `"${p.name}","${p.status}","${p.department || 'None'}","${p.dueDate}"`);
    const csv = [headers, ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'danh-sach-du-an.csv';
    a.click();
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active': return <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full text-[10px] font-bold border border-blue-100 uppercase tracking-tighter">Đang chạy</span>;
      case 'completed': return <span className="bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full text-[10px] font-bold border border-emerald-100 uppercase tracking-tighter">Hoàn thành</span>;
      case 'on_hold': return <span className="bg-amber-50 text-amber-600 px-2 py-0.5 rounded-full text-[10px] font-bold border border-amber-100 uppercase tracking-tighter">Tạm dừng</span>;
      default: return null;
    }
  };

  const openAddModal = (parentId?: string) => {
    setModalMode('add');
    setCurrentProject({ status: 'active', name: '', description: '', department: 'None', parentProjectId: parentId });
    setShowAddModal(true);
  };

  const openEditModal = (project: ProjectData) => {
    setModalMode('edit');
    setCurrentProject(project);
    setShowAddModal(true);
  };

  const cardStyle = { 
    backgroundColor: 'rgba(255, 255, 255, 0.45)',
    backdropFilter: 'blur(12px)'
  };

  return (
    <div className="flex-1 overflow-auto p-6 space-y-6 flex flex-col select-none">
      
      {/* 7. BỐ CỤC TRANG NỘI DUNG: BANNER BO CONG 4 GÓC 10PX */}
      <div className="bg-gradient-to-r from-indigo-700 via-indigo-800 to-slate-900 rounded-[10px] shadow-lg p-6 text-white relative overflow-hidden transition-all duration-300 shrink-0">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 z-10 relative">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center animate-pulse">
              <Briefcase size={26} className="text-orange-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">
                {activeTab === 'projects' ? "Quản lý Dự án & Tiến độ" : "Quản lý công việc"}
              </h2>
              <p className="text-xs text-blue-200">
                {activeTab === 'projects' 
                  ? "Theo dõi, quản lý và tối ưu hóa hiệu suất các dự án chiến lược của doanh nghiệp." 
                  : "“Việc nhỏ – nhưng nhớ kỹ. Đồng bộ, nhắc đúng, xử lý gọn.”"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 flex-wrap">
            <button 
              onClick={() => setShowDocModal(true)}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-4 py-2.5 rounded-lg text-xs font-bold shadow-md hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-orange-400" /> Tài liệu hướng dẫn
            </button>
            {activeTab === 'projects' && (
              <button 
                onClick={() => openAddModal()}
                className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2.5 rounded-lg text-xs font-bold shadow-md hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Tạo dự án mới
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Sub-navigation Tabs */}
      <div className="flex border-b border-gray-200 dark:border-slate-800 mb-2 bg-white dark:bg-slate-900 rounded-xl p-1.5 shadow-sm border shrink-0">
        <button
          onClick={() => setActiveTab('projects')}
          className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg text-xs font-bold transition-all ${
            activeTab === 'projects'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/50'
          }`}
        >
          <LayoutGrid className="w-4 h-4" />
          <span>Hồ sơ Dự án ({projects.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('tasks')}
          className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg text-xs font-bold transition-all ${
            activeTab === 'tasks'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/50'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Quản lý công việc liên quan</span>
        </button>
      </div>

      {activeTab === 'projects' ? (
        <div className="flex flex-col gap-6">
          {/* Statistics Section */}
          <div style={cardStyle} className="rounded-[10px] border border-slate-200/60 p-5 shadow-sm">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-gray-100">
                <div>
                  <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                    <GitFork className="w-4 h-4 text-indigo-600" />
                    Thống kê & Lưu đồ cấp bậc
                  </h3>
                  <p className="text-[11px] text-slate-500 font-medium">Xem cấu trúc tỷ lệ dự án hoặc lưu đồ các cấp của công việc.</p>
                </div>
                <div className="bg-slate-100 p-1 rounded-xl flex items-center gap-1 border border-slate-200/50 shadow-inner shrink-0">
                  <button
                    type="button"
                    onClick={() => setStatsTab('chart')}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${
                      statsTab === 'chart'
                        ? 'bg-indigo-600 text-white shadow-md'
                        : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    Biểu đồ tỷ lệ
                  </button>
                  <button
                    type="button"
                    onClick={() => setStatsTab('flowchart')}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${
                      statsTab === 'flowchart'
                        ? 'bg-indigo-600 text-white shadow-md'
                        : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    Lưu đồ nhiệm vụ
                  </button>
                </div>
              </div>

              {statsTab === 'chart' ? (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
                  <div className="lg:col-span-1 flex flex-col justify-center space-y-4">
                    {[
                      { label: 'Đang thực hiện', count: projects.filter(p => p.status === 'active').length, color: 'bg-blue-500' },
                      { label: 'Đã hoàn thành', count: projects.filter(p => p.status === 'completed').length, color: 'bg-green-500' },
                      { label: 'Tạm dừng', count: projects.filter(p => p.status === 'on_hold').length, color: 'bg-yellow-500' },
                    ].map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center text-xs font-bold">
                        <span className="flex items-center gap-2 text-slate-500 uppercase tracking-wider text-[10px]">
                          <span className={`w-2.5 h-2.5 rounded-full ${item.color}`}></span>
                          {item.label}
                        </span>
                        <span className="text-slate-800">{item.count} dự án</span>
                      </div>
                    ))}
                  </div>

                  <div className="lg:col-span-2 h-[200px]">
                    {projects.length > 0 ? (
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={[
                              { name: 'Đang thực hiện', value: projects.filter(p => p.status === 'active').length, color: '#3B82F6' },
                              { name: 'Đã hoàn thành', value: projects.filter(p => p.status === 'completed').length, color: '#10B981' },
                              { name: 'Tạm dừng', value: projects.filter(p => p.status === 'on_hold').length, color: '#F59E0B' },
                            ].filter(d => d.value > 0)}
                            cx="50%"
                            cy="50%"
                            innerRadius={50}
                            outerRadius={75}
                            paddingAngle={4}
                            dataKey="value"
                          >
                            {[
                              { name: 'Đang thực hiện', value: projects.filter(p => p.status === 'active').length, color: '#3B82F6' },
                              { name: 'Đã hoàn thành', value: projects.filter(p => p.status === 'completed').length, color: '#10B981' },
                              { name: 'Tạm dừng', value: projects.filter(p => p.status === 'on_hold').length, color: '#F59E0B' },
                            ].filter(d => d.value > 0).map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                              borderRadius: '12px', 
                              border: 'none',
                              color: '#fff',
                              fontSize: '11px',
                              fontWeight: 'bold'
                            }} 
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="flex items-center justify-center h-full text-xs font-bold text-slate-400">Chưa có dữ liệu.</div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="pt-2 flex flex-col gap-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 bg-slate-100/50 p-3 rounded-xl border border-slate-200/40">
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider leading-relaxed">
                      💡 <strong>Cấu trúc:</strong> Dự án → Dự án con → Công việc.
                    </span>
                  </div>
                  
                  <div className="bg-slate-50/50 rounded-2xl border border-slate-200/40 h-[450px] overflow-hidden relative shadow-inner">
                    <div className="w-full h-full overflow-auto p-8 flex flex-col gap-8 items-center min-w-max">
                      {projects.filter(p => !p.parentProjectId).map(p => (
                        <div key={p.id} className="flex flex-col items-center gap-4">
                          <div className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-md font-bold text-xs border border-indigo-400">
                            {p.name}
                          </div>
                          {projects.filter(sp => sp.parentProjectId === p.id).length > 0 && (
                            <div className="flex gap-4">
                              {projects.filter(sp => sp.parentProjectId === p.id).map(sp => (
                                <div key={sp.id} className="flex flex-col items-center gap-2">
                                  <div className="w-px h-4 bg-gray-300"></div>
                                  <div className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg shadow-sm text-[10px] font-bold text-slate-700">
                                    {sp.name}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Project List Section */}
          <div style={cardStyle} className="rounded-[10px] border border-slate-200/60 p-5 shadow-sm">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <h2 className="text-base font-bold text-slate-800">Danh sách dự án hoạt động</h2>
                  <div className="bg-slate-100 p-1 rounded-xl flex items-center gap-1 border border-slate-200/50 shadow-inner">
                    <button
                      onClick={() => setViewMode('list')}
                      className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all flex items-center gap-1.5 ${
                        viewMode === 'list' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-700'
                      }`}
                    >
                      <List className="w-3.5 h-3.5" /> Bảng
                    </button>
                    <button
                      onClick={() => setViewMode('timeline')}
                      className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all flex items-center gap-1.5 ${
                        viewMode === 'timeline' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-700'
                      }`}
                    >
                      <Clock className="w-3.5 h-3.5" /> Gantt
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button onClick={handleExportPDF} className="bg-red-50 text-red-600 border border-red-100 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-red-100 transition-all flex items-center gap-1.5 cursor-pointer">
                    <Download className="w-3.5 h-3.5" /> PDF
                  </button>
                  <button onClick={handleExportCSV} className="bg-emerald-50 text-emerald-600 border border-emerald-100 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-emerald-100 transition-all flex items-center gap-1.5 cursor-pointer">
                    <FileText className="w-3.5 h-3.5" /> CSV
                  </button>
                </div>
              </div>

              {/* Search & Filters */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative md:col-span-1">
                  <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Tìm kiếm dự án..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-white/80 border border-slate-200/60 rounded-xl py-2.5 px-10 text-[11px] font-bold focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Phòng ban:</span>
                  <select
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                    className="bg-white/80 border border-slate-200/60 rounded-xl py-2 px-3 text-[11px] font-bold focus:outline-none focus:ring-4 focus:ring-indigo-500/10 cursor-pointer"
                  >
                    <option value="all">Tất cả</option>
                    <option value="IT">IT</option>
                    <option value="Marketing">Marketing</option>
                    <option value="HR">HR</option>
                    <option value="None">Khác</option>
                  </select>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Thời hạn:</span>
                  <select
                    value={dueDateFilter}
                    onChange={(e) => setDueDateFilter(e.target.value as any)}
                    className="bg-white/80 border border-slate-200/60 rounded-xl py-2 px-3 text-[11px] font-bold focus:outline-none focus:ring-4 focus:ring-indigo-500/10 cursor-pointer"
                  >
                    <option value="all">Tất cả</option>
                    <option value="overdue">Quá hạn</option>
                    <option value="this_week">Tuần này</option>
                    <option value="this_month">Tháng này</option>
                  </select>
                </div>
              </div>

              {/* List Table */}
              {viewMode === 'list' ? (
                <div className="overflow-x-auto rounded-xl border border-slate-200/60 bg-white/70">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200/60">
                        <th className="p-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Tên dự án</th>
                        <th className="p-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Trạng thái / Tiến độ</th>
                        <th className="p-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Hạn chót</th>
                        <th className="p-4 text-[10px] font-black uppercase tracking-widest text-slate-500 text-right">Thao tác</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {getFilteredProjects().map(project => {
                        const parent = projects.find(p => p.id === project.parentProjectId);
                        return (
                          <tr key={project.id} className="hover:bg-slate-50/50 transition-all">
                            <td className="p-4">
                              <div className="flex flex-col">
                                <span className="text-xs font-extrabold text-slate-800 flex items-center gap-1.5">
                                  {project.name}
                                  {parent && (
                                    <span className="text-[9px] bg-indigo-50 text-indigo-600 px-1.5 py-0.2 rounded font-semibold">
                                      Con của: {parent.name}
                                    </span>
                                  )}
                                </span>
                                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter mt-0.5 flex items-center gap-1">
                                  <Building className="w-3 h-3 text-slate-300" />
                                  {project.department && project.department !== 'None' ? `Phòng ${project.department}` : 'Chưa phân loại'}
                                </span>
                              </div>
                            </td>
                            <td className="p-4">
                              <div className="flex items-center gap-3">
                                {getStatusBadge(project.status)}
                                <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-indigo-600 rounded-full" 
                                    style={{ width: `${calculateProjectProgress(project)}%` }}
                                  ></div>
                                </div>
                                <span className="text-[10px] font-black text-slate-500">{calculateProjectProgress(project)}%</span>
                              </div>
                            </td>
                            <td className="p-4">
                              <span className="text-[11px] font-bold text-slate-600">
                                {project.dueDate ? new Date(project.dueDate).toLocaleDateString('vi-VN') : '---'}
                              </span>
                            </td>
                            <td className="p-4 text-right">
                              <div className="flex items-center justify-end gap-1">
                                {!project.parentProjectId && (
                                  <button 
                                    onClick={() => openAddModal(project.id)} 
                                    title="Tạo dự án con"
                                    className="p-1.5 hover:bg-orange-50 text-orange-600 rounded-lg transition-all cursor-pointer"
                                  >
                                    <GitFork className="w-3.5 h-3.5" />
                                  </button>
                                )}
                                <button 
                                  onClick={() => openEditModal(project)} 
                                  title="Chỉnh sửa"
                                  className="p-1.5 hover:bg-indigo-50 text-indigo-600 rounded-lg transition-all cursor-pointer"
                                >
                                  <Edit3 className="w-3.5 h-3.5" />
                                </button>
                                <button 
                                  onClick={() => handleDeleteProject(project.id)} 
                                  title="Xóa"
                                  className="p-1.5 hover:bg-rose-50 text-rose-600 rounded-lg transition-all cursor-pointer"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                      {getFilteredProjects().length === 0 && (
                        <tr>
                          <td colSpan={4} className="p-8 text-center text-xs font-bold text-slate-400">
                            Không tìm thấy dự án nào phù hợp với bộ lọc.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="h-[280px] bg-slate-50/45 rounded-2xl flex items-center justify-center border border-dashed border-slate-200">
                  <div className="text-center p-6">
                    <Clock className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                    <p className="text-xs font-bold text-slate-500">Lưu đồ Gantt Chart đang được phát triển nâng cao.</p>
                    <p className="text-[10px] text-slate-400 font-medium mt-1">Vui lòng sử dụng chế độ Xem dạng Bảng để có trải nghiệm tốt nhất.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col min-h-0">
          <TaskSettingView cardOpacity={cardOpacity} hideHeader={true} />
        </div>
      )}

      {/* Add/Edit Project Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden border border-slate-100">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">
                {modalMode === 'add' ? (currentProject.parentProjectId ? 'Thêm dự án con mới' : 'Thêm dự án mới') : 'Chỉnh sửa thông tin dự án'}
              </h3>
              <button onClick={() => setShowAddModal(false)} className="p-1.5 hover:bg-slate-200/50 rounded-lg transition-all cursor-pointer">
                <X className="w-4 h-4 text-slate-400" />
              </button>
            </div>
            <form onSubmit={handleSaveProject} className="p-6 flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest ml-1">Tên dự án</label>
                <input 
                  type="text" 
                  required 
                  value={currentProject.name || ''} 
                  onChange={e => setCurrentProject({...currentProject, name: e.target.value})} 
                  placeholder="Ví dụ: Dự án Tự động hóa Dữ liệu OKRs"
                  className="w-full bg-slate-50 border border-slate-200/60 rounded-xl py-2.5 px-3 text-xs font-bold text-slate-800 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all" 
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest ml-1">Mô tả chi tiết</label>
                <textarea 
                  value={currentProject.description || ''} 
                  onChange={e => setCurrentProject({...currentProject, description: e.target.value})} 
                  placeholder="Mô tả phạm vi, kết quả cam kết và ý nghĩa của dự án..."
                  rows={3}
                  className="w-full bg-slate-50 border border-slate-200/60 rounded-xl py-2.5 px-3 text-xs font-medium text-slate-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all resize-none" 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest ml-1">Phòng ban</label>
                  <select 
                    value={currentProject.department || 'None'} 
                    onChange={e => setCurrentProject({...currentProject, department: e.target.value})} 
                    className="w-full bg-slate-50 border border-slate-200/60 rounded-xl py-2.5 px-3 text-xs font-bold text-slate-800 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all cursor-pointer"
                  >
                    <option value="None">Chưa phân loại</option>
                    <option value="IT">IT</option>
                    <option value="Marketing">Marketing</option>
                    <option value="HR">HR</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest ml-1">Hạn chót</label>
                  <input 
                    type="date" 
                    value={currentProject.dueDate || ''} 
                    onChange={e => setCurrentProject({...currentProject, dueDate: e.target.value})} 
                    className="w-full bg-slate-50 border border-slate-200/60 rounded-xl py-2 px-3 text-xs font-bold text-slate-800 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all" 
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest ml-1">Trạng thái hiện tại</label>
                <div className="flex gap-2">
                  {[
                    { key: 'active', label: 'Đang chạy' },
                    { key: 'completed', label: 'Hoàn thành' },
                    { key: 'on_hold', label: 'Tạm dừng' }
                  ].map(s => (
                    <button
                      key={s.key}
                      type="button"
                      onClick={() => setCurrentProject({...currentProject, status: s.key as any})}
                      className={`flex-1 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all border cursor-pointer ${
                        currentProject.status === s.key 
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-500/10' 
                          : 'bg-white text-slate-500 border-slate-200 hover:border-indigo-200'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <button type="submit" className="w-full bg-indigo-600 text-white font-bold text-xs py-3 rounded-xl shadow-lg shadow-indigo-600/10 hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 cursor-pointer">
                  <CheckCircle2 className="w-4 h-4" /> Lưu thông tin dự án
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {toastMessage && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[2000] bg-slate-900 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-fade-in-up">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
          <span className="text-xs font-bold">{toastMessage}</span>
        </div>
      )}

      {/* Help/Doc Modal */}
      {showDocModal && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-slate-900/45 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col max-h-[85vh]">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-indigo-600" />
                <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">
                  TÀI LIỆU HƯỚNG DẪN QUẢN LÝ DỰ ÁN
                </h3>
              </div>
              <button onClick={() => setShowDocModal(false)} className="p-1.5 hover:bg-slate-200/50 rounded-lg transition-all cursor-pointer">
                <X className="w-4 h-4 text-slate-400" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto space-y-6 text-slate-700 text-xs leading-relaxed">
              <div className="space-y-2">
                <h4 className="font-extrabold text-slate-800 text-sm flex items-center gap-1.5 border-b border-slate-100 pb-1">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-black">1</span>
                  Cấu Trúc Quản Lý Cấp Bậc
                </h4>
                <p className="pl-6 text-slate-600">
                  Hệ thống hỗ trợ phân cấp linh hoạt giúp tổ chức và theo dõi hiệu suất tối đa:
                </p>
                <ul className="list-disc pl-11 space-y-1 text-slate-500">
                  <li><strong>Dự án chính:</strong> Các chiến dịch, sáng kiến lớn của doanh nghiệp (ví dụ: Nâng cấp Hệ thống Nhân sự, Chiến dịch Quảng bá...).</li>
                  <li><strong>Dự án con:</strong> Các nhóm mục tiêu nhỏ phân rã từ dự án chính giúp từng phòng ban phối hợp thực thi.</li>
                  <li><strong>Công việc liên quan:</strong> Các đầu việc nhỏ (Tasks) gán trực tiếp cho từng cá nhân đi kèm hạn chót rõ ràng.</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-extrabold text-slate-800 text-sm flex items-center gap-1.5 border-b border-slate-100 pb-1">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-black">2</span>
                  Trạng Thái & Tiến Độ Tự Động
                </h4>
                <p className="pl-6 text-slate-600">
                  Tiến độ dự án được tính toán tự động dựa trên mức độ hoàn thành và trạng thái thực thi:
                </p>
                <ul className="list-disc pl-11 space-y-1 text-slate-500">
                  <li><span className="bg-blue-50 text-blue-600 px-1.5 py-0.2 rounded text-[9px] font-black uppercase">Đang chạy:</span> Dự án đang triển khai tích cực. Tiến độ cập nhật dựa trên lượng kết quả và công việc hoàn tất.</li>
                  <li><span className="bg-emerald-50 text-emerald-600 px-1.5 py-0.2 rounded text-[9px] font-black uppercase">Hoàn thành:</span> Dự án đạt mốc 100% mục tiêu, lưu trữ hồ sơ thành công.</li>
                  <li><span className="bg-amber-50 text-amber-600 px-1.5 py-0.2 rounded text-[9px] font-black uppercase">Tạm dừng:</span> Bảo lưu tài nguyên và tạm dừng cập nhật tiến trình tạm thời.</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-extrabold text-slate-800 text-sm flex items-center gap-1.5 border-b border-slate-100 pb-1">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-black">3</span>
                  Xuất Bản Dữ Liệu Báo Cáo
                </h4>
                <p className="pl-6 text-slate-600">
                  Doanh nghiệp có thể trích xuất thông tin phục vụ họp giao ban hoặc lưu trữ bằng hai định dạng:
                </p>
                <ul className="list-disc pl-11 space-y-1 text-slate-500">
                  <li><strong>Tải file PDF:</strong> Tạo tài liệu báo cáo danh sách dạng bảng chuẩn đẹp, thích hợp gửi ban giám đốc.</li>
                  <li><strong>Tải file CSV:</strong> Hỗ trợ phân tích dữ liệu chuyên sâu trên Excel, Google Sheets.</li>
                </ul>
              </div>

              <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100">
                <p className="font-extrabold text-indigo-800 mb-1 flex items-center gap-1">
                  💡 Mẹo Vặt Hiệu Suất
                </p>
                <p className="text-indigo-950 font-medium text-[11px]">
                  Để đảm bảo sự đồng bộ tối đa giữa các phòng ban, hãy phân tách các mục tiêu OKR lớn thành các Dự án con cụ thể, và gán phòng ban trực tiếp (IT, Marketing, HR,...) để dễ dàng lọc và tìm kiếm nhanh chóng.
                </p>
              </div>
            </div>

            <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
              <button 
                onClick={() => setShowDocModal(false)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-5 py-2 rounded-xl shadow-md transition-all cursor-pointer"
              >
                Đã hiểu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
