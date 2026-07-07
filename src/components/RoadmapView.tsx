import React, { useState, useEffect } from 'react';
import { 
  Map, 
  Plus, 
  Search, 
  Sparkles, 
  Layers, 
  Calendar, 
  Users, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  GitCommit, 
  ArrowRight, 
  User, 
  Building, 
  TrendingUp, 
  ChevronRight, 
  ChevronDown, 
  MapPin, 
  Compass, 
  Activity, 
  HelpCircle,
  X,
  Target,
  Edit,
  Trash2,
  Bookmark
} from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export type RoadmapLevel = 'Corporate' | 'Department' | 'Personal';
export type RoadmapStatus = 'On Track' | 'Behind' | 'At Risk' | 'Completed';

export interface Milestone {
  id: string;
  title: string;
  targetMonth: number; // 1 to 12
  completed: boolean;
}

export interface RoadmapItem {
  id: string;
  title: string;
  ownerName: string;
  ownerAvatar: string;
  department: string;
  level: RoadmapLevel;
  quarter: 'Q1' | 'Q2' | 'Q3' | 'Q4' | 'Full Year';
  startMonth: number; // 1 to 12
  endMonth: number; // 1 to 12
  progress: number;
  status: RoadmapStatus;
  alignedToId?: string; // ID of the parent objective it supports
  milestones: Milestone[];
  keyResults: { id: string; title: string; progress: number }[];
  description?: string;
}

const MONTHS = [
  'Thg 1', 'Thg 2', 'Thg 3', 'Thg 4', 'Thg 5', 'Thg 6',
  'Thg 7', 'Thg 8', 'Thg 9', 'Thg 10', 'Thg 11', 'Thg 12'
];

const INITIAL_ROADMAP: RoadmapItem[] = [
  {
    id: 'rm-1',
    title: 'Đạt doanh thu 2.5 triệu USD thị trường Enterprise Việt Nam',
    ownerName: 'Roberto Canevari',
    ownerAvatar: 'https://i.pravatar.cc/150?u=roberto',
    department: 'Sales & BD',
    level: 'Corporate',
    quarter: 'Full Year',
    startMonth: 1,
    endMonth: 12,
    progress: 65,
    status: 'On Track',
    description: 'Chiến lược mũi nhọn chiếm lĩnh phân khúc doanh nghiệp lớn, ngân hàng và tài chính vi mô tại Việt Nam.',
    milestones: [
      { id: 'ms-1-1', title: 'Ký kết 3 đối tác ngân hàng quốc doanh lớn', targetMonth: 4, completed: true },
      { id: 'ms-1-2', title: 'Hoàn tất đóng gói giải pháp Core Service gói Enterprise', targetMonth: 7, completed: true },
      { id: 'ms-1-3', title: 'Tổ chức chuỗi hội thảo Enterprise Summit quy tụ 150+ C-Level', targetMonth: 10, completed: false }
    ],
    keyResults: [
      { id: 'kr-1-1', title: 'Doanh số ký mới đạt tối thiểu 1.5M USD', progress: 72 },
      { id: 'kr-1-2', title: 'Gia hạn hợp đồng dịch vụ cũ đạt 95%', progress: 85 },
      { id: 'kr-1-3', title: 'Upsell thêm module AI Analytics cho 10 khách hàng cũ', progress: 38 }
    ]
  },
  {
    id: 'rm-2',
    title: 'Xây dựng và tối ưu hệ thống bảo mật Cloud & Đạt chứng nhận ISO 27001',
    ownerName: 'David Tran',
    ownerAvatar: 'https://i.pravatar.cc/150?u=david',
    department: 'Tech & Engineering',
    level: 'Department',
    quarter: 'Q3',
    startMonth: 6,
    endMonth: 9,
    progress: 40,
    status: 'Behind',
    alignedToId: 'rm-1',
    description: 'Gia cố tầng hạ tầng, hoàn tất tài liệu quy trình kiểm soát thông tin an toàn thông tin theo chuẩn quốc tế nhằm tạo lòng tin cho khách hàng B2B Enterprise.',
    milestones: [
      { id: 'ms-2-1', title: 'Hoàn thành Audit kiểm tra lỗ hổng hệ thống', targetMonth: 6, completed: true },
      { id: 'ms-2-2', title: 'Hoàn tất đào tạo nhận thức bảo mật cho toàn công ty', targetMonth: 8, completed: false },
      { id: 'ms-2-3', title: 'Audit nghiệm thu cấp chứng nhận ISO 27001 chính thức', targetMonth: 9, completed: false }
    ],
    keyResults: [
      { id: 'kr-2-1', title: 'Thời gian phản hồi sự cố khẩn cấp dưới 15 phút', progress: 60 },
      { id: 'kr-2-2', title: 'Đóng 100% các lỗ hổng bảo mật cấp độ High & Critical', progress: 50 },
      { id: 'kr-2-3', title: 'Xây dựng quy chuẩn quản trị định danh IAM mới', progress: 10 }
    ]
  },
  {
    id: 'rm-3',
    title: 'Thiết lập mô hình dịch vụ khách hàng 24/7 & Cải thiện chỉ số CSAT > 92%',
    ownerName: 'Elena Rostova',
    ownerAvatar: 'https://i.pravatar.cc/150?u=elena',
    department: 'Customer Experience',
    level: 'Department',
    quarter: 'Q2',
    startMonth: 3,
    endMonth: 7,
    progress: 82,
    status: 'On Track',
    alignedToId: 'rm-1',
    description: 'Chuyển đổi văn hóa chăm sóc khách hàng phản ứng sang chủ động, hỗ trợ đa kênh toàn vẹn thời gian.',
    milestones: [
      { id: 'ms-3-1', title: 'Triển khai thành công hệ thống CRM Omnichannel mới', targetMonth: 4, completed: true },
      { id: 'ms-3-2', title: 'Đạt 100% nhân viên CSKH hoàn thành đào tạo Total CX', targetMonth: 5, completed: true },
      { id: 'ms-3-3', title: 'Vận hành chính thức hệ thống chatbot trả lời tự động hỗ trợ ban đêm', targetMonth: 7, completed: false }
    ],
    keyResults: [
      { id: 'kr-3-1', title: 'Tỷ lệ giải quyết khiếu nại trong lần gọi đầu tiên > 85%', progress: 90 },
      { id: 'kr-3-2', title: 'Thời gian chờ kết nối điện thoại viên dưới 20 giây', progress: 88 },
      { id: 'kr-3-3', title: 'Chỉ số hài lòng khách hàng CSAT duy trì ở mức cao', progress: 68 }
    ]
  },
  {
    id: 'rm-4',
    title: 'Tự động hóa hệ thống Báo cáo Quản trị Tài chính & Đồng bộ ERP',
    ownerName: 'Alice Nguyen',
    ownerAvatar: 'https://i.pravatar.cc/150?u=alice',
    department: 'Finance',
    level: 'Personal',
    quarter: 'Q4',
    startMonth: 9,
    endMonth: 12,
    progress: 15,
    status: 'At Risk',
    alignedToId: 'rm-1',
    description: 'Loại bỏ báo cáo thủ công qua excel, tích hợp trực tiếp số liệu dòng tiền từ CRM vào hệ thống báo cáo quản trị tổng hợp thời gian thực.',
    milestones: [
      { id: 'ms-4-1', title: 'Hoàn thành tích hợp dữ liệu bán hàng từ CRM', targetMonth: 10, completed: false },
      { id: 'ms-4-2', title: 'Thiết lập Dashboard báo cáo lãi lỗ P&L tự động', targetMonth: 11, completed: false },
      { id: 'ms-4-3', title: 'Kiểm toán báo cáo tài chính nội bộ năm 2026', targetMonth: 12, completed: false }
    ],
    keyResults: [
      { id: 'kr-4-1', title: 'Rút ngắn thời gian chốt sổ sách kế toán tháng còn dưới 3 ngày', progress: 20 },
      { id: 'kr-4-2', title: '100% dữ liệu chi phí vận hành được phân loại tự động', progress: 10 }
    ]
  },
  {
    id: 'rm-5',
    title: 'Chiến dịch Định vị Thương hiệu Power Service - Nhà cung cấp giải pháp OKR & KPI số 1',
    ownerName: 'Roberto Canevari',
    ownerAvatar: 'https://i.pravatar.cc/150?u=roberto',
    department: 'Marketing',
    level: 'Corporate',
    quarter: 'Q1',
    startMonth: 1,
    endMonth: 5,
    progress: 95,
    status: 'Completed',
    description: 'Tăng cường hiện diện truyền thông xã hội, PR báo chí chính thống và SEO bài bản để phủ sóng tệp khách hàng CEO/HR.',
    milestones: [
      { id: 'ms-5-1', title: 'Phát hành Sách trắng Quản trị Hiệu suất Toàn diện 2026', targetMonth: 2, completed: true },
      { id: 'ms-5-2', title: 'Hoàn tất nâng cấp giao diện Web và Tài liệu Marketing số', targetMonth: 3, completed: true },
      { id: 'ms-5-3', title: 'Ra mắt Video giới thiệu hệ thống bóc tách tính năng lõi', targetMonth: 5, completed: true }
    ],
    keyResults: [
      { id: 'kr-5-1', title: 'Đạt 50,000 lượt truy cập web tự nhiên hàng tháng', progress: 100 },
      { id: 'kr-5-2', title: 'Nhận diện thương hiệu tích cực qua 15 bài báo PR lớn', progress: 95 },
      { id: 'kr-5-3', title: 'Thu về 1,200 leads đăng ký tư vấn trực tiếp', progress: 90 }
    ]
  }
];

export function RoadmapView({ cardOpacity }: { cardOpacity: number }) {
  const [items, setItems] = useState<RoadmapItem[]>(() => {
    const saved = localStorage.getItem('power_roadmap_items');
    return saved ? JSON.parse(saved) : INITIAL_ROADMAP;
  });

  const [levelFilter, setLevelFilter] = useState<'All' | RoadmapLevel>('All');
  const [quarterFilter, setQuarterFilter] = useState<'All' | 'Q1' | 'Q2' | 'Q3' | 'Q4' | 'Full Year'>('All');
  const [statusFilter, setStatusFilter] = useState<'All' | RoadmapStatus>('All');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Interactive UI States
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({
    'rm-1': true // Expand first one by default
  });
  const [selectedItem, setSelectedItem] = useState<RoadmapItem | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAlignmentMap, setShowAlignmentMap] = useState<string | null>(null);

  // New Roadmap Item Form State
  const [newTitle, setNewTitle] = useState('');
  const [newOwner, setNewOwner] = useState('Roberto Canevari');
  const [newOwnerAvatar, setNewOwnerAvatar] = useState('https://i.pravatar.cc/150?u=roberto');
  const [newDept, setNewDept] = useState('Sales & BD');
  const [newLevel, setNewLevel] = useState<RoadmapLevel>('Corporate');
  const [newQuarter, setNewQuarter] = useState<'Q1' | 'Q2' | 'Q3' | 'Q4' | 'Full Year'>('Q1');
  const [newStartMonth, setNewStartMonth] = useState(1);
  const [newEndMonth, setNewEndMonth] = useState(3);
  const [newProgress, setNewProgress] = useState(0);
  const [newStatus, setNewStatus] = useState<RoadmapStatus>('On Track');
  const [newAlignedId, setNewAlignedId] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newMilestones, setNewMilestones] = useState<{ title: string; targetMonth: number }[]>([
    { title: 'Cột mốc khởi động & Chuẩn bị', targetMonth: 1 },
    { title: 'Nghiệm thu kết quả ban đầu', targetMonth: 2 },
    { title: 'Hoàn thành bàn giao toàn diện', targetMonth: 3 }
  ]);

  // Sidebar interactive edit states
  const [newMilestoneTitle, setNewMilestoneTitle] = useState('');
  const [newMilestoneMonth, setNewMilestoneMonth] = useState(1);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('power_roadmap_items', JSON.stringify(items));
  }, [items]);

  const toggleExpand = (id: string) => {
    setExpandedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleDeleteItem = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Bạn có chắc chắn muốn xóa mục lộ trình này?')) {
      const filtered = items.filter(item => item.id !== id);
      setItems(filtered);
      if (selectedItem?.id === id) setSelectedItem(null);
    }
  };

  const handleToggleMilestone = (itemId: string, milestoneId: string) => {
    const updated = items.map(item => {
      if (item.id === itemId) {
        const nextMilestones = item.milestones.map(ms => {
          if (ms.id === milestoneId) {
            return { ...ms, completed: !ms.completed };
          }
          return ms;
        });

        // Compute new progress loosely based on completed milestones & existing ratio
        const completedCount = nextMilestones.filter(m => m.completed).length;
        const autoProgress = Math.round((completedCount / nextMilestones.length) * 100);
        
        return {
          ...item,
          milestones: nextMilestones,
          progress: autoProgress,
          status: autoProgress === 100 ? 'Completed' : item.status === 'Completed' ? 'On Track' : item.status
        };
      }
      return item;
    });
    setItems(updated);
    
    // Update the selected item view if it is open
    const matching = updated.find(i => i.id === itemId);
    if (matching) {
      setSelectedItem(matching);
    }
  };

  const handleAddMilestone = (itemId: string) => {
    if (!newMilestoneTitle.trim()) return;

    const newMs: Milestone = {
      id: `ms-${itemId}-${Date.now()}`,
      title: newMilestoneTitle,
      targetMonth: Number(newMilestoneMonth),
      completed: false
    };

    const updated = items.map(item => {
      if (item.id === itemId) {
        const updatedMilestones = [...item.milestones, newMs].sort((a, b) => a.targetMonth - b.targetMonth);
        return {
          ...item,
          milestones: updatedMilestones
        };
      }
      return item;
    });

    setItems(updated);
    setNewMilestoneTitle('');
    
    const matching = updated.find(i => i.id === itemId);
    if (matching) setSelectedItem(matching);
  };

  const handleAddRoadmapSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newItem: RoadmapItem = {
      id: `rm-${Date.now()}`,
      title: newTitle,
      ownerName: newOwner,
      ownerAvatar: newOwnerAvatar,
      department: newDept,
      level: newLevel,
      quarter: newQuarter,
      startMonth: Number(newStartMonth),
      endMonth: Number(newEndMonth),
      progress: Number(newProgress),
      status: newStatus,
      alignedToId: newAlignedId || undefined,
      description: newDescription,
      milestones: newMilestones.map((m, index) => ({
        id: `ms-new-${index}-${Date.now()}`,
        title: m.title,
        targetMonth: m.targetMonth,
        completed: false
      })),
      keyResults: [
        { id: `kr-new-1-${Date.now()}`, title: 'Chỉ số then chốt 1', progress: Math.min(Number(newProgress), 50) },
        { id: `kr-new-2-${Date.now()}`, title: 'Chỉ số then chốt 2', progress: Math.max(0, Number(newProgress) - 20) }
      ]
    };

    setItems([...items, newItem]);
    
    // Reset Form
    setNewTitle('');
    setNewDescription('');
    setNewAlignedId('');
    setNewProgress(0);
    setShowAddModal(false);
  };

  const filteredItems = items.filter(item => {
    const matchesLevel = levelFilter === 'All' || item.level === levelFilter;
    const matchesQuarter = quarterFilter === 'All' || item.quarter === quarterFilter;
    const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.department.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesLevel && matchesQuarter && matchesStatus && matchesSearch;
  });

  // Calculate high-level stats
  const totalObjectives = filteredItems.length;
  const avgProgress = totalObjectives > 0 
    ? Math.round(filteredItems.reduce((acc, curr) => acc + curr.progress, 0) / totalObjectives) 
    : 0;
  const onTrackCount = filteredItems.filter(i => i.status === 'On Track' || i.status === 'Completed').length;
  const atRiskCount = filteredItems.filter(i => i.status === 'At Risk' || i.status === 'Behind').length;
  const totalMilestonesCount = filteredItems.reduce((acc, curr) => acc + curr.milestones.length, 0);
  const completedMilestonesCount = filteredItems.reduce((acc, curr) => acc + curr.milestones.filter(m => m.completed).length, 0);

  // Grid calculation helpers
  const getColSpanStyles = (start: number, end: number) => {
    // 12 columns in total grid
    const leftPercent = ((start - 1) / 12) * 100;
    const widthPercent = (((end - start) + 1) / 12) * 100;
    return {
      left: `${leftPercent}%`,
      width: `${widthPercent}%`
    };
  };

  const getStatusColor = (status: RoadmapStatus) => {
    switch (status) {
      case 'On Track': return 'bg-emerald-500 border-emerald-600 text-emerald-800';
      case 'Behind': return 'bg-amber-500 border-amber-600 text-amber-800';
      case 'At Risk': return 'bg-rose-500 border-rose-600 text-rose-800';
      case 'Completed': return 'bg-blue-500 border-blue-600 text-blue-800';
    }
  };

  const getStatusTag = (status: RoadmapStatus) => {
    switch (status) {
      case 'On Track': return 'bg-emerald-50 text-emerald-600 border-emerald-200';
      case 'Behind': return 'bg-amber-50 text-amber-600 border-amber-200';
      case 'At Risk': return 'bg-rose-50 text-rose-600 border-rose-200';
      case 'Completed': return 'bg-blue-50 text-blue-600 border-blue-200';
    }
  };

  const getLevelBadge = (level: RoadmapLevel) => {
    switch (level) {
      case 'Corporate': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'Department': return 'bg-sky-100 text-sky-700 border-sky-200';
      case 'Personal': return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="flex-1 overflow-auto p-6 space-y-6 flex flex-col select-none">
      
      {/* HEADER SECTION - GRADIENT BANNER MATCHING PROJECT LAYOUT */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-800 to-slate-900 rounded-[10px] shadow-lg p-6 text-white relative overflow-hidden transition-all duration-300 shrink-0">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 z-10 relative">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center animate-pulse">
              <Map size={26} className="text-orange-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Lộ trình Mục tiêu & Hành động</h2>
              <p className="text-xs text-blue-200">
                Theo dõi tiến trình trực quan theo chu kỳ năm, đồng bộ dòng thác mục tiêu và dự án hành động giống Profit.co.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 flex-wrap">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60" size={14} />
              <input
                type="text"
                placeholder="Tìm mục tiêu, phòng ban..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 pr-4 py-1.5 text-xs bg-white/10 hover:bg-white/15 focus:bg-white/20 border border-white/20 rounded-lg focus:outline-none text-white placeholder-white/60 w-[220px] font-medium transition-all"
              />
            </div>

            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2.5 rounded-lg text-xs font-bold shadow-md hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Thêm lộ trình</span>
            </button>
          </div>
        </div>

        {/* SUB NAVIGATION TABS */}
        
      </div>

      {/* Sub-navigation Tabs */}
      <div className="flex border-b border-gray-200 dark:border-slate-800 mb-2 bg-white dark:bg-slate-900 rounded-xl p-1.5 shadow-sm border shrink-0">
        <div className="flex flex-wrap items-center justify-between gap-4 w-full px-2 py-1">
          
          <div className="flex space-x-6 text-sm font-semibold">
            <button className="pb-1 border-b-2 border-orange-500 text-slate-800 dark:text-slate-200 font-bold cursor-pointer transition-all">
              Bản đồ Lộ trình ({filteredItems.length})
            </button>
          </div>
        
        </div>
      </div>


      {/* STATS STRIP */}
      <div className="shrink-0 grid grid-cols-2 md:grid-cols-5 gap-3 p-4 bg-slate-50 border-b border-slate-200">
        <div className="bg-white p-3 rounded-xl border border-slate-200 flex items-center space-x-3">
          <div className="p-2 bg-blue-50 rounded-lg text-blue-600 shrink-0">
            <Target size={16} />
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase">Mục tiêu Lộ trình</p>
            <p className="text-sm font-black text-slate-800">{totalObjectives} mục tiêu</p>
          </div>
        </div>

        <div className="bg-white p-3 rounded-xl border border-slate-200 flex items-center space-x-3">
          <div className="p-2 bg-purple-50 rounded-lg text-purple-600 shrink-0">
            <TrendingUp size={16} />
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase">Tiến độ trung bình</p>
            <p className="text-sm font-black text-slate-800">{avgProgress}%</p>
          </div>
        </div>

        <div className="bg-white p-3 rounded-xl border border-slate-200 flex items-center space-x-3">
          <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600 shrink-0">
            <CheckCircle size={16} />
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase">Đúng hạn & Hoàn thành</p>
            <p className="text-sm font-black text-slate-800">{onTrackCount} mục tiêu</p>
          </div>
        </div>

        <div className="bg-white p-3 rounded-xl border border-slate-200 flex items-center space-x-3">
          <div className="p-2 bg-rose-50 rounded-lg text-rose-600 shrink-0">
            <AlertTriangle size={16} />
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase">Rủi ro & Trễ hạn</p>
            <p className="text-sm font-black text-slate-800">{atRiskCount} mục tiêu</p>
          </div>
        </div>

        <div className="bg-white p-3 rounded-xl border border-slate-200 col-span-2 md:col-span-1 flex items-center space-x-3">
          <div className="p-2 bg-amber-50 rounded-lg text-amber-600 shrink-0">
            <Clock size={16} />
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase">Cột mốc hoàn tất</p>
            <p className="text-sm font-black text-slate-800">{completedMilestonesCount} / {totalMilestonesCount}</p>
          </div>
        </div>
      </div>

      {/* FILTER CONTROL BAR */}
      <div className="shrink-0 px-4 py-3 bg-white border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
        {/* Level Filters */}
        <div className="flex items-center space-x-1.5 bg-slate-100 p-0.5 rounded-lg border border-slate-200">
          {(['All', 'Corporate', 'Department', 'Personal'] as const).map((lvl) => (
            <button
              key={lvl}
              onClick={() => setLevelFilter(lvl)}
              className={cn(
                "px-3 py-1 text-[11px] font-bold rounded-md transition-all cursor-pointer",
                levelFilter === lvl
                  ? "bg-white text-slate-800 shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              )}
            >
              {lvl === 'All' ? 'Tất cả cấp độ' : lvl === 'Corporate' ? 'Công ty' : lvl === 'Department' ? 'Phòng ban' : 'Cá nhân'}
            </button>
          ))}
        </div>

        {/* Quarter Filters */}
        <div className="flex items-center space-x-1.5 bg-slate-100 p-0.5 rounded-lg border border-slate-200">
          {(['All', 'Q1', 'Q2', 'Q3', 'Q4', 'Full Year'] as const).map((qtr) => (
            <button
              key={qtr}
              onClick={() => setQuarterFilter(qtr)}
              className={cn(
                "px-2.5 py-1 text-[11px] font-bold rounded-md transition-all cursor-pointer",
                quarterFilter === qtr
                  ? "bg-white text-slate-800 shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              )}
            >
              {qtr === 'All' ? 'Tất cả chu kỳ' : qtr}
            </button>
          ))}
        </div>

        {/* Status Filters */}
        <div className="flex items-center space-x-1">
          <span className="text-[11px] font-bold text-slate-400 mr-1.5">Trạng thái:</span>
          {(['All', 'On Track', 'Behind', 'At Risk', 'Completed'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={cn(
                "px-2 py-0.5 text-[10px] font-extrabold rounded-full border transition-all cursor-pointer",
                statusFilter === st
                  ? "bg-slate-800 text-white border-slate-800"
                  : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
              )}
            >
              {st === 'All' ? 'Tất cả' : st === 'On Track' ? 'Đúng hạn' : st === 'Behind' ? 'Chậm tiến độ' : st === 'At Risk' ? 'Rủi ro' : 'Hoàn thành'}
            </button>
          ))}
        </div>
      </div>

      {/* ROADMAP TIMELINE CONTAINER */}
      <div className="flex-1 overflow-auto bg-slate-50 p-4 min-w-0">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col min-w-[950px]">
          
          {/* TIMELINE GRID HEADERS */}
          <div className="grid grid-cols-12 border-b border-slate-200 shrink-0 bg-slate-50/50">
            {/* Metadata Label Space */}
            <div className="col-span-4 p-4 border-r border-slate-200 flex items-center justify-between">
              <span className="text-[11px] font-black uppercase text-slate-500 tracking-wider">Mục tiêu & Tiến độ</span>
              <span className="text-[10px] text-slate-400 font-bold">4 Quý / 12 Tháng</span>
            </div>

            {/* Quarters Representation Row */}
            <div className="col-span-8 grid grid-cols-4 relative">
              <div className="absolute inset-x-0 bottom-0 top-1/2 border-t border-slate-100 grid grid-cols-12 pointer-events-none">
                {MONTHS.map((m, idx) => (
                  <div key={idx} className="border-r border-slate-100 h-full flex items-center justify-center">
                    <span className="text-[9px] text-slate-400 font-bold">{m}</span>
                  </div>
                ))}
              </div>
              
              <div className="p-2 border-r border-slate-200 text-center flex flex-col justify-center">
                <span className="text-[11px] font-black text-slate-700 tracking-wider">Quý I (Q1)</span>
              </div>
              <div className="p-2 border-r border-slate-200 text-center flex flex-col justify-center">
                <span className="text-[11px] font-black text-slate-700 tracking-wider">Quý II (Q2)</span>
              </div>
              <div className="p-2 border-r border-slate-200 text-center flex flex-col justify-center">
                <span className="text-[11px] font-black text-slate-700 tracking-wider">Quý III (Q3)</span>
              </div>
              <div className="p-2 text-center flex flex-col justify-center">
                <span className="text-[11px] font-black text-slate-700 tracking-wider">Quý IV (Q4)</span>
              </div>
            </div>
          </div>

          {/* ROADMAP ITEMS BODY */}
          <div className="flex-1 divide-y divide-slate-100 overflow-y-auto max-h-[500px]">
            {filteredItems.length === 0 ? (
              <div className="p-12 text-center flex flex-col items-center justify-center space-y-3">
                <div className="p-4 bg-slate-100 rounded-full text-slate-400">
                  <Map size={36} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-800">Không tìm thấy mục tiêu lộ trình nào</h3>
                  <p className="text-xs text-slate-400 mt-1">Vui lòng điều chỉnh bộ lọc hoặc tạo mới một lộ trình mục tiêu.</p>
                </div>
              </div>
            ) : (
              filteredItems.map((item) => {
                const isExpanded = !!expandedItems[item.id];
                const spanStyles = getColSpanStyles(item.startMonth, item.endMonth);

                return (
                  <div key={item.id} className="hover:bg-slate-50/40 transition-colors">
                    
                    {/* Main Row */}
                    <div 
                      className="grid grid-cols-12 items-center cursor-pointer min-h-[72px]"
                      onClick={() => setSelectedItem(item)}
                    >
                      {/* Left Side: Metadata Column */}
                      <div className="col-span-4 p-4 border-r border-slate-200/80 h-full flex items-start space-x-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleExpand(item.id);
                          }}
                          className="p-1 hover:bg-slate-100 rounded text-slate-500 cursor-pointer shrink-0 mt-0.5"
                        >
                          {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                        </button>

                        <div className="flex-1 min-w-0 space-y-1.5">
                          <div className="flex items-center space-x-1.5 flex-wrap gap-y-1">
                            <span className={cn("text-[10px] px-2 py-0.5 font-bold rounded-full border shrink-0", getLevelBadge(item.level))}>
                              {item.level === 'Corporate' ? 'Công ty' : item.level === 'Department' ? 'Bộ phận' : 'Cá nhân'}
                            </span>
                            <span className="text-[10px] text-slate-400 font-bold shrink-0">{item.department}</span>
                            <span className="text-[10px] text-blue-600 font-bold bg-blue-50 px-1.5 py-0.5 rounded shrink-0">{item.quarter}</span>
                            {item.alignedToId && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setShowAlignmentMap(showAlignmentMap === item.id ? null : item.id);
                                }}
                                className="p-0.5 bg-purple-50 hover:bg-purple-100 text-purple-600 rounded shrink-0"
                                title="Xem căn chỉnh mục tiêu"
                              >
                                <Layers size={11} />
                              </button>
                            )}
                          </div>

                          <h3 className="text-xs font-black text-slate-800 leading-snug hover:text-blue-600 transition-colors line-clamp-2">
                            {item.title}
                          </h3>

                          {/* Quick details */}
                          <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                            <div className="flex items-center space-x-1.5">
                              <img src={item.ownerAvatar} alt={item.ownerName} className="w-4.5 h-4.5 rounded-full object-cover" />
                              <span className="font-bold text-slate-600">{item.ownerName}</span>
                            </div>

                            <div className="flex items-center space-x-2 font-bold">
                              <span>Mốc: <strong className="text-slate-600">{item.milestones.filter(m => m.completed).length}/{item.milestones.length}</strong></span>
                              <span>Tiến độ: <strong className="text-blue-600">{item.progress}%</strong></span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right Side: Timeline Grid Gantt Bar */}
                      <div className="col-span-8 h-full relative p-4 flex items-center justify-center bg-white">
                        {/* Subtle background column guidelines */}
                        <div className="absolute inset-0 grid grid-cols-12 pointer-events-none">
                          {Array.from({ length: 12 }).map((_, i) => (
                            <div key={i} className="border-r border-slate-100/60 h-full" />
                          ))}
                        </div>

                        {/* Interactive Horizontal Gantt Bar */}
                        <div 
                          className={cn(
                            "absolute h-9 rounded-2xl border flex items-center justify-between px-3 text-white shadow-sm hover:shadow-md hover:scale-[1.01] transition-all cursor-pointer overflow-hidden z-10",
                            getStatusColor(item.status)
                          )}
                          style={{
                            left: spanStyles.left,
                            width: spanStyles.width,
                          }}
                        >
                          {/* Inner Progress Shading layer */}
                          <div 
                            className="absolute inset-y-0 left-0 bg-white/20 transition-all duration-1000"
                            style={{ width: `${item.progress}%` }}
                          />

                          {/* Item Title or Tag */}
                          <div className="relative z-10 truncate font-black text-[10px] uppercase tracking-wide flex items-center space-x-1">
                            <span className="bg-white/25 rounded-md px-1.5 py-0.5 text-[9px]">{item.progress}%</span>
                            <span className="hidden md:inline truncate">{item.title}</span>
                          </div>

                          {/* Milestones inside Gantt Bar */}
                          <div className="absolute inset-x-0 bottom-0 h-1 flex justify-around pointer-events-none">
                            {item.milestones.map((ms) => {
                              // Relative location of milestone inside the Gantt bar duration
                              const barDuration = (item.endMonth - item.startMonth) + 1;
                              const offsetInBar = ms.targetMonth - item.startMonth;
                              const ratio = barDuration > 1 ? offsetInBar / (barDuration - 1) : 0.5;
                              
                              return (
                                <div
                                  key={ms.id}
                                  className={cn(
                                    "w-2 h-2 rounded-full absolute -bottom-1 -translate-x-1/2 border border-white transition-all shadow-md",
                                    ms.completed ? "bg-emerald-400 animate-pulse" : "bg-slate-400"
                                  )}
                                  style={{ left: `${Math.max(5, Math.min(95, ratio * 100))}%` }}
                                  title={`Milestone: ${ms.title} (Tháng ${ms.targetMonth})`}
                                />
                              );
                            })}
                          </div>

                          {/* Progress Tag */}
                          <span className="relative z-10 text-[9px] bg-black/20 px-2 py-0.5 rounded-full font-extrabold uppercase">
                            {item.status === 'Completed' ? 'Hoàn thành' : item.status === 'On Track' ? 'Đúng hạn' : item.status === 'Behind' ? 'Chậm' : 'Rủi ro'}
                          </span>
                        </div>
                      </div>

                    </div>

                    {/* ALIGNMENT VIEW DROP PANEL */}
                    <AnimatePresence>
                      {showAlignmentMap === item.id && item.alignedToId && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="bg-purple-50/50 border-t border-b border-purple-100/50 px-12 py-3 text-xs"
                        >
                          <div className="flex items-center space-x-2 text-[10px] text-purple-600 font-extrabold uppercase">
                            <Layers size={12} />
                            <span>Bản đồ căn chỉnh mục tiêu chiến lược (Cascade Mapping)</span>
                          </div>
                          
                          <div className="flex items-center space-x-6 mt-2 pl-4">
                            {/* Parent Target */}
                            <div className="bg-white border border-purple-200 p-2.5 rounded-xl shadow-sm max-w-[320px]">
                              <span className="text-[9px] font-bold text-purple-500 uppercase">Mục tiêu cấp cha</span>
                              <p className="font-extrabold text-slate-800 line-clamp-2 mt-0.5 text-[11px]">
                                {items.find(i => i.id === item.alignedToId)?.title || 'Mục tiêu cấp cao nhất'}
                              </p>
                              <div className="flex items-center justify-between text-[9px] text-slate-400 mt-1.5 font-bold">
                                <span>Tiến độ: {items.find(i => i.id === item.alignedToId)?.progress}%</span>
                                <span className="text-purple-600">{items.find(i => i.id === item.alignedToId)?.department}</span>
                              </div>
                            </div>

                            <ArrowRight size={16} className="text-purple-400" />

                            {/* Current Target */}
                            <div className="bg-purple-100 border border-purple-300 p-2.5 rounded-xl shadow-sm max-w-[320px]">
                              <span className="text-[9px] font-bold text-purple-700 uppercase">Mục tiêu đóng góp</span>
                              <p className="font-extrabold text-slate-800 line-clamp-2 mt-0.5 text-[11px]">{item.title}</p>
                              <div className="flex items-center justify-between text-[9px] text-slate-400 mt-1.5 font-bold">
                                <span>Tiến độ hiện tại: {item.progress}%</span>
                                <span className="text-purple-700">Đóng góp trực tiếp</span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Expandable Sub-items view: Key Results / Sub-milestones */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="bg-slate-50/50 border-t border-slate-100 pl-12 pr-4 py-3 space-y-2.5"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest">
                              Danh sách Kết quả then chốt (Key Results)
                            </span>
                            <span className="text-[10px] text-slate-400">Đóng góp trực tiếp vào mục tiêu lớn</span>
                          </div>

                          <div className="grid grid-cols-12 gap-4">
                            {/* Key Results list */}
                            <div className="col-span-5 space-y-2">
                              {item.keyResults.map((kr) => (
                                <div key={kr.id} className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-xs space-y-1">
                                  <div className="flex items-start justify-between">
                                    <p className="text-[11px] font-bold text-slate-700 leading-snug line-clamp-2">{kr.title}</p>
                                    <span className="text-[10px] font-extrabold text-blue-600 bg-blue-50 px-1 py-0.2 rounded shrink-0 ml-1">
                                      {kr.progress}%
                                    </span>
                                  </div>
                                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                                    <div className="bg-blue-500 h-full rounded-full transition-all duration-700" style={{ width: `${kr.progress}%` }} />
                                  </div>
                                </div>
                              ))}
                            </div>

                            {/* Milestones timeline overview */}
                            <div className="col-span-7 bg-white rounded-xl border border-slate-200 p-3 space-y-2">
                              <span className="text-[10px] text-slate-500 font-extrabold uppercase">Cột mốc lộ trình (Roadmap Milestones)</span>
                              
                              <div className="relative pl-4 border-l border-slate-200 space-y-2.5 mt-1.5">
                                {item.milestones.map((ms) => (
                                  <div key={ms.id} className="relative flex items-center justify-between text-xs">
                                    {/* Line node */}
                                    <div 
                                      className={cn(
                                        "absolute -left-[21px] w-3 h-3 rounded-full border-2 border-white shadow-xs transition-colors",
                                        ms.completed ? "bg-emerald-500" : "bg-slate-300"
                                      )}
                                    />

                                    <div className="flex items-center space-x-2">
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleToggleMilestone(item.id, ms.id);
                                        }}
                                        className={cn(
                                          "w-4 h-4 rounded border flex items-center justify-center cursor-pointer transition-colors",
                                          ms.completed ? "bg-emerald-500 border-emerald-500 text-white" : "border-slate-300 bg-white hover:border-slate-400"
                                        )}
                                      >
                                        {ms.completed && <CheckCircle size={10} />}
                                      </button>
                                      <span className={cn("text-[11px] font-bold", ms.completed ? "text-slate-400 line-through" : "text-slate-700")}>
                                        {ms.title}
                                      </span>
                                    </div>

                                    <span className="text-[10px] text-slate-400 font-bold bg-slate-50 border border-slate-100 px-1.5 py-0.5 rounded">
                                      Tháng {ms.targetMonth}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                        </motion.div>
                      )}
                    </AnimatePresence>

                  </div>
                );
              })
            )}
          </div>

        </div>
      </div>

      {/* FOOTER TIPS */}
      <div className="shrink-0 bg-white border-t border-slate-200 px-6 py-3 flex items-center justify-between text-[11px] text-slate-400">
        <div className="flex items-center space-x-1">
          <Sparkles size={12} className="text-amber-500 animate-pulse" />
          <span>Mẹo: Click vào bất kỳ mục tiêu nào để xem chi tiết, điều chỉnh cột mốc và cập nhật tiến độ tức thì.</span>
        </div>
        <span>Power Service OKRs Roadmap Engine &copy; 2026</span>
      </div>

      {/* ROADMAP DETAIL SIDE DRAWER (Framer-motion powered) */}
      <AnimatePresence>
        {selectedItem && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="absolute inset-0 bg-black z-40"
            />

            {/* Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-[460px] bg-white border-l border-slate-200 shadow-2xl z-50 flex flex-col overflow-hidden"
            >
              
              {/* Drawer Header */}
              <div className="p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
                <div>
                  <span className="text-[9px] font-extrabold uppercase text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                    Chi tiết lộ trình
                  </span>
                  <h3 className="text-sm font-black text-slate-800 mt-1">Cấu trúc & Căn chỉnh OKR</h3>
                </div>
                
                <button
                  onClick={() => setSelectedItem(null)}
                  className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-400 hover:text-slate-700 cursor-pointer transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Drawer Body */}
              <div className="flex-1 overflow-y-auto p-5 space-y-6">
                
                {/* Objective Main Info */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className={cn("text-[10px] px-2 py-0.5 font-bold rounded-full border", getLevelBadge(selectedItem.level))}>
                      {selectedItem.level === 'Corporate' ? 'Công ty' : selectedItem.level === 'Department' ? 'Bộ phận' : 'Cá nhân'}
                    </span>
                    <span className="text-[10px] text-slate-400 font-bold">{selectedItem.department}</span>
                    <span className="text-[10px] text-blue-600 font-bold bg-blue-50 px-1.5 py-0.5 rounded">{selectedItem.quarter}</span>
                  </div>

                  <h2 className="text-sm font-black text-slate-800 leading-snug">
                    {selectedItem.title}
                  </h2>

                  {selectedItem.description && (
                    <p className="text-xs text-slate-500 bg-slate-50 border border-slate-100 p-3 rounded-xl leading-relaxed">
                      {selectedItem.description}
                    </p>
                  )}
                </div>

                {/* Progress Card */}
                <div className="bg-slate-900 text-white rounded-2xl p-4 space-y-3 shadow-lg shadow-slate-900/10">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-slate-300 font-bold uppercase">Tiến trình triển khai</span>
                    <span className="text-lg font-black text-amber-400">{selectedItem.progress}%</span>
                  </div>

                  <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-amber-400 to-orange-500 h-full rounded-full transition-all duration-1000" 
                      style={{ width: `${selectedItem.progress}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <span>Tháng khởi đầu: Thg {selectedItem.startMonth}</span>
                    <span className="flex items-center space-x-1">
                      <span className={cn("w-2 h-2 rounded-full", getStatusColor(selectedItem.status))} />
                      <span className="font-bold text-white uppercase">{selectedItem.status}</span>
                    </span>
                    <span>Tháng đích: Thg {selectedItem.endMonth}</span>
                  </div>
                </div>

                {/* Owner & Department */}
                <div className="grid grid-cols-2 gap-4 border-t border-b border-slate-100 py-4">
                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Chủ sở hữu</span>
                    <div className="flex items-center space-x-2">
                      <img src={selectedItem.ownerAvatar} alt={selectedItem.ownerName} className="w-8 h-8 rounded-full object-cover border border-slate-200" />
                      <div>
                        <p className="text-xs font-bold text-slate-800 leading-none">{selectedItem.ownerName}</p>
                        <p className="text-[10px] text-slate-400 mt-1">Chủ trì lộ trình</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Bộ phận phụ trách</span>
                    <div className="flex items-center space-x-2">
                      <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                        <Building size={16} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-800 leading-none">{selectedItem.department}</p>
                        <p className="text-[10px] text-slate-400 mt-1">Phòng ban liên quan</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Milestones Management Section */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center space-x-1">
                      <Bookmark size={14} className="text-blue-500" />
                      <span>Cột mốc cột chỉ (Milestones)</span>
                    </h4>
                    <span className="text-[10px] text-slate-400 font-bold">
                      {selectedItem.milestones.filter(m => m.completed).length} / {selectedItem.milestones.length} Hoàn tất
                    </span>
                  </div>

                  {/* Add Milestone Inline */}
                  <div className="flex items-center space-x-2 bg-slate-50 border border-slate-200 p-2 rounded-xl">
                    <input
                      type="text"
                      placeholder="Tên cột mốc mới..."
                      value={newMilestoneTitle}
                      onChange={(e) => setNewMilestoneTitle(e.target.value)}
                      className="flex-1 bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs focus:outline-none"
                    />
                    <select
                      value={newMilestoneMonth}
                      onChange={(e) => setNewMilestoneMonth(Number(e.target.value))}
                      className="bg-white border border-slate-200 rounded-lg px-2 py-1 text-xs"
                    >
                      {MONTHS.map((m, index) => (
                        <option key={index} value={index + 1}>{m}</option>
                      ))}
                    </select>
                    <button
                      onClick={() => handleAddMilestone(selectedItem.id)}
                      className="p-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg cursor-pointer"
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  <div className="space-y-2.5 pl-2">
                    {selectedItem.milestones.map((ms) => (
                      <div key={ms.id} className="flex items-center justify-between bg-slate-50/70 p-2.5 rounded-xl border border-slate-100">
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => handleToggleMilestone(selectedItem.id, ms.id)}
                            className={cn(
                              "w-4 h-4 rounded border flex items-center justify-center cursor-pointer transition-colors",
                              ms.completed ? "bg-emerald-500 border-emerald-500 text-white" : "border-slate-300 bg-white"
                            )}
                          >
                            {ms.completed && <CheckCircle size={10} />}
                          </button>
                          <span className={cn("text-xs font-medium", ms.completed ? "text-slate-400 line-through" : "text-slate-700")}>
                            {ms.title}
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-400 font-bold bg-white px-2 py-0.5 rounded border border-slate-100">
                          Tháng {ms.targetMonth}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key Results list */}
                <div className="space-y-3">
                  <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">
                    Chỉ số đo lường then chốt (Key Results)
                  </h4>
                  <div className="space-y-2">
                    {selectedItem.keyResults.map((kr) => (
                      <div key={kr.id} className="p-3 border border-slate-200 rounded-xl space-y-2 bg-white shadow-xs">
                        <div className="flex items-start justify-between">
                          <p className="text-xs font-bold text-slate-700 leading-snug">{kr.title}</p>
                          <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
                            {kr.progress}%
                          </span>
                        </div>
                        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-blue-600 h-full rounded-full transition-all duration-700" style={{ width: `${kr.progress}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Strategic Alignment details */}
                {selectedItem.alignedToId && (
                  <div className="bg-purple-50/50 rounded-2xl border border-purple-100 p-4 space-y-2">
                    <span className="text-[10px] text-purple-600 font-extrabold uppercase flex items-center space-x-1">
                      <Layers size={12} />
                      <span>Căn chỉnh chiến lược trực tiếp</span>
                    </span>
                    <p className="text-xs font-bold text-slate-800">
                      {items.find(i => i.id === selectedItem.alignedToId)?.title || 'Mục tiêu cấp cao nhất'}
                    </p>
                    <p className="text-[10px] text-slate-400 leading-relaxed">
                      Sự liên thông này đảm bảo mọi nỗ lực của phòng ban trực tiếp đóng góp vào chu kỳ bứt phá của doanh nghiệp.
                    </p>
                  </div>
                )}

              </div>

              {/* Drawer Footer Actions */}
              <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
                <button
                  onClick={(e) => handleDeleteItem(selectedItem.id, e)}
                  className="flex items-center space-x-1 px-3 py-1.5 border border-rose-200 hover:bg-rose-50 text-rose-600 rounded-xl text-xs font-bold cursor-pointer transition-all"
                >
                  <Trash2 size={13} />
                  <span>Xóa lộ trình</span>
                </button>

                <button
                  onClick={() => setSelectedItem(null)}
                  className="px-4 py-1.5 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold cursor-pointer transition-all"
                >
                  Đóng chi tiết
                </button>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ADD ROADMAP MODAL */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddModal(false)}
              className="absolute inset-0 bg-black"
            />

            {/* Content box */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl border border-slate-200 max-w-[650px] w-full shadow-2xl relative z-10 flex flex-col max-h-[90vh] overflow-hidden"
            >
              
              {/* Header */}
              <div className="p-6 border-b border-slate-200 bg-slate-50 flex items-center justify-between shrink-0">
                <div className="flex items-center space-x-2">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                    <Map size={18} />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-slate-800">Thiết lập Lộ trình Mục tiêu Mới</h3>
                    <p className="text-[11px] text-slate-400 mt-0.5">Xây dựng chu kỳ bám đuổi hành động chi tiết chuẩn quốc tế.</p>
                  </div>
                </div>

                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleAddRoadmapSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
                
                {/* Objective Title */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase">Tên Mục tiêu Lộ trình</label>
                  <input
                    type="text"
                    required
                    placeholder="Ví dụ: Đạt mốc 100,000 lượt cài đặt ứng dụng phiên bản V2"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 focus:bg-white"
                  />
                </div>

                {/* Description */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase">Mô tả hoặc Mục đích cốt lõi</label>
                  <textarea
                    placeholder="Mô tả bối cảnh, lý do thiết lập mục tiêu này..."
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    rows={2}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 focus:bg-white resize-none"
                  />
                </div>

                {/* Owner and Department Row */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase">Người chủ trì</label>
                    <select
                      value={newOwner}
                      onChange={(e) => {
                        setNewOwner(e.target.value);
                        // map fake avatar
                        if (e.target.value === 'Roberto Canevari') setNewOwnerAvatar('https://i.pravatar.cc/150?u=roberto');
                        else if (e.target.value === 'Alice Nguyen') setNewOwnerAvatar('https://i.pravatar.cc/150?u=alice');
                        else if (e.target.value === 'David Tran') setNewOwnerAvatar('https://i.pravatar.cc/150?u=david');
                        else setNewOwnerAvatar('https://i.pravatar.cc/150?u=elena');
                      }}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:bg-white"
                    >
                      <option value="Roberto Canevari">Roberto Canevari (CEO)</option>
                      <option value="Alice Nguyen">Alice Nguyen (Finance)</option>
                      <option value="David Tran">David Tran (Tech)</option>
                      <option value="Elena Rostova">Elena Rostova (CX)</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase">Bộ phận phụ trách</label>
                    <select
                      value={newDept}
                      onChange={(e) => setNewDept(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:bg-white"
                    >
                      <option value="Sales & BD">Sales & Business Development</option>
                      <option value="Tech & Engineering">Tech & Engineering</option>
                      <option value="Customer Experience">Customer Experience</option>
                      <option value="Finance">Finance & Accounting</option>
                      <option value="Marketing">Marketing & Communication</option>
                    </select>
                  </div>
                </div>

                {/* Level and Quarter Row */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase">Cấp độ mục tiêu</label>
                    <select
                      value={newLevel}
                      onChange={(e) => setNewLevel(e.target.value as RoadmapLevel)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:bg-white"
                    >
                      <option value="Corporate">Cấp Công ty (Corporate)</option>
                      <option value="Department">Cấp Bộ phận (Department)</option>
                      <option value="Personal">Cấp Cá nhân (Personal)</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase">Chu kỳ triển khai</label>
                    <select
                      value={newQuarter}
                      onChange={(e) => setNewQuarter(e.target.value as any)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:bg-white"
                    >
                      <option value="Q1">Quý I (Q1)</option>
                      <option value="Q2">Quý II (Q2)</option>
                      <option value="Q3">Quý III (Q3)</option>
                      <option value="Q4">Quý IV (Q4)</option>
                      <option value="Full Year">Cả năm (Full Year)</option>
                    </select>
                  </div>
                </div>

                {/* Start Month and End Month Row */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase">Tháng bắt đầu</label>
                    <select
                      value={newStartMonth}
                      onChange={(e) => setNewStartMonth(Number(e.target.value))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:bg-white"
                    >
                      {MONTHS.map((m, index) => (
                        <option key={index} value={index + 1}>{m}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase">Tháng kết thúc</label>
                    <select
                      value={newEndMonth}
                      onChange={(e) => setNewEndMonth(Number(e.target.value))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:bg-white"
                    >
                      {MONTHS.map((m, index) => (
                        <option key={index} value={index + 1} disabled={index + 1 < newStartMonth}>
                          {m}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase">Tiến độ ban đầu</label>
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={newProgress}
                      onChange={(e) => setNewProgress(Number(e.target.value))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:bg-white"
                    />
                  </div>
                </div>

                {/* Alignment Reference selector */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase flex items-center space-x-1">
                    <Layers size={13} className="text-purple-500" />
                    <span>Căn chỉnh tới Mục tiêu cấp trên</span>
                  </label>
                  <select
                    value={newAlignedId}
                    onChange={(e) => setNewAlignedId(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:bg-white"
                  >
                    <option value="">Không liên kết (Mục tiêu độc lập)</option>
                    {items.filter(i => i.level === 'Corporate').map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.title} ({item.ownerName} - {item.department})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Pre-defined Milestones previews */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2">
                  <span className="text-[10px] text-slate-500 font-extrabold uppercase">Xem trước 3 cột mốc mẫu sẽ tạo tự động</span>
                  <div className="space-y-1.5 pl-2">
                    <div className="text-xs text-slate-600 flex justify-between font-medium">
                      <span>1. Cột mốc khởi động & Chuẩn bị</span>
                      <span className="text-[10px] text-slate-400">Tháng khởi đầu (Thg {newStartMonth})</span>
                    </div>
                    <div className="text-xs text-slate-600 flex justify-between font-medium">
                      <span>2. Nghiệm thu kết quả ban đầu</span>
                      <span className="text-[10px] text-slate-400">Tháng giữa kỳ</span>
                    </div>
                    <div className="text-xs text-slate-600 flex justify-between font-medium">
                      <span>3. Hoàn thành bàn giao toàn diện</span>
                      <span className="text-[10px] text-slate-400">Tháng đích (Thg {newEndMonth})</span>
                    </div>
                  </div>
                </div>

              </form>

              {/* Footer Actions */}
              <div className="p-6 border-t border-slate-200 bg-slate-50 flex items-center justify-end space-x-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-slate-200 hover:bg-slate-100 rounded-xl text-xs font-bold text-slate-600 cursor-pointer transition-colors"
                >
                  Hủy bỏ
                </button>

                <button
                  type="button"
                  onClick={handleAddRoadmapSubmit}
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-500/15 cursor-pointer transition-all"
                >
                  Tạo lộ trình
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
