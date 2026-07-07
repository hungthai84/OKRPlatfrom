import React, { useState } from 'react';
import { 
  Target, 
  Plus, 
  ChevronRight, 
  Users, 
  Calendar, 
  GitPullRequest, 
  Sparkles, 
  CheckSquare, 
  TrendingUp, 
  TrendingDown, 
  Layers, 
  Edit3, 
  Trash2, 
  Check, 
  Clock, 
  User, 
  Briefcase,
  Sliders,
  ChevronDown,
  Info,
  HelpCircle,
  MessageSquare,
  Award,
  Flame,
  Search,
  Filter
} from 'lucide-react';
import { cn } from '../lib/utils';

export type KRType = 'percentage' | 'numeric' | 'milestone' | 'boolean';

export type MilestoneItem = {
  id: string;
  name: string;
  completed: boolean;
};

export type KeyResultDetail = {
  id: string;
  name: string;
  type: KRType;
  weight: number; // Percentage, e.g. 50%
  progress: number; // Calculated or direct 0-100
  // Value limits
  startValue?: number;
  targetValue?: number;
  currentValue?: number;
  unit?: string;
  // Milestones if type === 'milestone'
  milestones?: MilestoneItem[];
  checkInHistory?: {
    id: string;
    date: string;
    value: number;
    progress: number;
    note: string;
    author: string;
  }[];
};

export type ObjectiveItem = {
  id: string;
  objective: string;
  ownerName: string;
  ownerAvatar: string;
  department: string;
  period: string; // e.g. "Quý 3 - 2026"
  status: 'On Track' | 'At Risk' | 'Off Track';
  parentObjectiveId?: string; // For Alignment Tree
  keyResults: KeyResultDetail[];
  category: 'Company' | 'Department' | 'Individual';
};

// Seed Company-level OKRs to align with
const COMPANY_OBJECTIVES = [
  { id: 'corp-1', name: 'Đạt mốc 1.5 triệu USD doanh số hàng năm và dẫn đầu thị trường', progress: 68 },
  { id: 'corp-2', name: 'Nâng cao chất lượng dịch vụ & Trải nghiệm khách hàng vượt trội', progress: 55 },
  { id: 'corp-3', name: 'Xây dựng môi trường làm việc hiệu suất cao & Sáng tạo đột phá', progress: 80 }
];

const INITIAL_GOALS: ObjectiveItem[] = [
  {
    id: 'obj-1',
    objective: 'Tăng trưởng doanh thu Quý 3 thêm 20%',
    ownerName: 'Roberto Canevari',
    ownerAvatar: 'https://i.pravatar.cc/150?u=roberto',
    department: 'Ban Giám đốc',
    period: 'Quý 3 - 2026',
    status: 'On Track',
    parentObjectiveId: 'corp-1',
    category: 'Department',
    keyResults: [
      {
        id: 'kr-1-1',
        name: 'Đóng 10 hợp đồng doanh nghiệp lớn (Enterprise)',
        type: 'numeric',
        weight: 60,
        startValue: 0,
        targetValue: 10,
        currentValue: 7,
        unit: 'hợp đồng',
        progress: 70,
        checkInHistory: [
          { id: 'ch-1', date: '2026-06-15', value: 3, progress: 30, note: 'Khởi động tốt, ký được 3 hợp đồng trong tháng đầu.', author: 'Roberto Canevari' },
          { id: 'ch-2', date: '2026-06-30', value: 7, progress: 70, note: 'Xuất sắc ký thêm 4 đối tác lớn trong tuần qua!', author: 'Roberto Canevari' }
        ]
      },
      {
        id: 'kr-1-2',
        name: 'Tăng quy mô hợp đồng trung bình lên $50,000',
        type: 'numeric',
        weight: 40,
        startValue: 30000,
        targetValue: 50000,
        currentValue: 42000,
        unit: 'USD',
        progress: 60,
        checkInHistory: [
          { id: 'ch-3', date: '2026-06-20', value: 38000, progress: 40, note: 'Đã đàm phán nâng hạn mức gói dịch vụ cơ bản.', author: 'Roberto Canevari' },
          { id: 'ch-4', date: '2026-07-02', value: 42000, progress: 60, note: 'Đạt thỏa thuận up-sell thành công cho 2 khách hàng cũ.', author: 'Roberto Canevari' }
        ]
      }
    ]
  },
  {
    id: 'obj-2',
    objective: 'Ra mắt ứng dụng di động phiên bản 3.0 đúng hạn',
    ownerName: 'Roberto Canevari',
    ownerAvatar: 'https://i.pravatar.cc/150?u=roberto',
    department: 'Phòng Công nghệ',
    period: 'Quý 3 - 2026',
    status: 'At Risk',
    parentObjectiveId: 'corp-2',
    category: 'Individual',
    keyResults: [
      {
        id: 'kr-2-1',
        name: 'Hoàn thành thử nghiệm bản Beta với 500 khách hàng tích cực',
        type: 'percentage',
        weight: 50,
        startValue: 0,
        targetValue: 100,
        currentValue: 90,
        unit: '%',
        progress: 90,
        checkInHistory: [
          { id: 'ch-5', date: '2026-06-10', value: 50, progress: 50, note: 'Thu hút thành công 250 tester đầu tiên.', author: 'Roberto Canevari' },
          { id: 'ch-6', date: '2026-06-25', value: 90, progress: 90, note: 'Đã phân phối thư mời và có 450 người phản hồi tích cực.', author: 'Roberto Canevari' }
        ]
      },
      {
        id: 'kr-2-2',
        name: 'Hoàn tất quy trình giải quyết lỗ hổng bảo mật & Lỗi nghiêm trọng',
        type: 'milestone',
        weight: 50,
        progress: 50,
        milestones: [
          { id: 'm-1', name: 'Quét bảo mật toàn bộ API hệ thống', completed: true },
          { id: 'm-2', name: 'Khắc phục các lỗ hổng mức độ High/Critical', completed: true },
          { id: 'm-3', name: 'Kiểm thử hộp đen và kiểm thử xâm nhập', completed: false },
          { id: 'm-4', name: 'Nhận báo cáo chứng nhận an toàn thông tin', completed: false }
        ],
        checkInHistory: [
          { id: 'ch-7', date: '2026-06-18', value: 2, progress: 50, note: 'Hoàn thành việc quét và vá lỗ hổng nghiêm trọng đầu tiên.', author: 'Roberto Canevari' }
        ]
      }
    ]
  }
];

export function GoalSettingView({ cardOpacity }: { cardOpacity: number }) {
  const [activeSubTab, setActiveSubTab] = useState<'manage' | 'create' | 'tree'>('manage');
  const [goals, setGoals] = useState<ObjectiveItem[]>(INITIAL_GOALS);
  const [selectedGoal, setSelectedGoal] = useState<ObjectiveItem | null>(null);
  const [selectedKR, setSelectedKR] = useState<KeyResultDetail | null>(null);
  
  // Create OKR Wizard State
  const [objName, setObjName] = useState('');
  const [objOwner, setObjOwner] = useState('Roberto Canevari');
  const [objDept, setObjDept] = useState('Ban Giám đốc');
  const [objPeriod, setObjPeriod] = useState('Quý 3 - 2026');
  const [objCategory, setObjCategory] = useState<'Company' | 'Department' | 'Individual'>('Department');
  const [parentCorpObjId, setParentCorpObjId] = useState('corp-1');
  const [krsInput, setKrsInput] = useState<Omit<KeyResultDetail, 'id' | 'progress' | 'checkInHistory'>[]>([
    { name: 'Tăng chỉ số NPS khách hàng lên 85%', type: 'percentage', weight: 50, startValue: 0, targetValue: 100, currentValue: 0, unit: '%' }
  ]);

  // Check-In Overlay/Modal State
  const [checkInModalOpen, setCheckInModalOpen] = useState(false);
  const [checkInValue, setCheckInValue] = useState<number>(0);
  const [checkInNote, setCheckInNote] = useState('');
  const [checkInStatus, setCheckInStatus] = useState<'On Track' | 'At Risk' | 'Off Track'>('On Track');

  // Search and Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');

  // Calculations helper
  const getObjectiveProgress = (goal: ObjectiveItem) => {
    if (goal.keyResults.length === 0) return 0;
    const totalWeight = goal.keyResults.reduce((sum, kr) => sum + kr.weight, 0);
    if (totalWeight === 0) return 0;
    const weightedSum = goal.keyResults.reduce((sum, kr) => sum + (kr.progress * kr.weight), 0);
    return Math.round(weightedSum / totalWeight);
  };

  // KR Type icons / labels
  const getKRTypeBadge = (type: KRType) => {
    switch (type) {
      case 'numeric':
        return <span className="inline-flex items-center space-x-1 text-blue-600 bg-blue-50 px-2 py-0.5 rounded text-[10px] font-bold border border-blue-100">Cơ số số lượng</span>;
      case 'percentage':
        return <span className="inline-flex items-center space-x-1 text-green-600 bg-green-50 px-2 py-0.5 rounded text-[10px] font-bold border border-green-100">Tỷ lệ phần trăm %</span>;
      case 'milestone':
        return <span className="inline-flex items-center space-x-1 text-purple-600 bg-purple-50 px-2 py-0.5 rounded text-[10px] font-bold border border-purple-100">Danh sách cột mốc</span>;
      default:
        return <span className="inline-flex items-center space-x-1 text-slate-600 bg-slate-50 px-2 py-0.5 rounded text-[10px] font-bold border border-slate-100">Định lượng</span>;
    }
  };

  // Add new KR row in creator
  const addKrRow = () => {
    setKrsInput([
      ...krsInput,
      { name: '', type: 'percentage', weight: 50, startValue: 0, targetValue: 100, currentValue: 0, unit: '%' }
    ]);
  };

  // Remove KR row in creator
  const removeKrRow = (index: number) => {
    if (krsInput.length === 1) return;
    setKrsInput(krsInput.filter((_, i) => i !== index));
  };

  const handleCreateOkr = (e: React.FormEvent) => {
    e.preventDefault();
    if (!objName.trim()) return;

    // Build KRs
    const newKrs: KeyResultDetail[] = krsInput.map((kr, idx) => {
      let initialProgress = 0;
      if (kr.type === 'milestone') {
        initialProgress = 0;
      } else if (kr.startValue !== undefined && kr.targetValue !== undefined && kr.currentValue !== undefined) {
        const deltaTotal = kr.targetValue - kr.startValue;
        if (deltaTotal !== 0) {
          initialProgress = Math.min(100, Math.max(0, Math.round(((kr.currentValue - kr.startValue) / deltaTotal) * 100)));
        }
      }

      return {
        id: `kr-new-${Date.now()}-${idx}`,
        name: kr.name || `Kết quả chính số ${idx + 1}`,
        type: kr.type,
        weight: Number(kr.weight) || 50,
        startValue: kr.startValue,
        targetValue: kr.targetValue,
        currentValue: kr.currentValue || 0,
        unit: kr.unit || '%',
        progress: initialProgress,
        milestones: kr.type === 'milestone' ? [
          { id: `m-n1-${Date.now()}`, name: 'Xác định mục tiêu & lập kế hoạch hành động', completed: false },
          { id: `m-n2-${Date.now()}`, name: 'Tiến hành triển khai thực hiện giai đoạn 1', completed: false },
          { id: `m-n3-${Date.now()}`, name: 'Đánh giá giữa kỳ và khắc phục khó khăn', completed: false },
          { id: `m-n4-${Date.now()}`, name: 'Hoàn thành mục tiêu và đóng dự án', completed: false }
        ] : undefined,
        checkInHistory: []
      };
    });

    const newObj: ObjectiveItem = {
      id: `obj-new-${Date.now()}`,
      objective: objName,
      ownerName: objOwner,
      ownerAvatar: 'https://i.pravatar.cc/150?u=roberto',
      department: objDept,
      period: objPeriod,
      status: 'On Track',
      parentObjectiveId: parentCorpObjId,
      category: objCategory,
      keyResults: newKrs
    };

    setGoals([newObj, ...goals]);
    
    // Reset state & switch tab
    setObjName('');
    setKrsInput([{ name: 'Tăng chỉ số NPS khách hàng lên 85%', type: 'percentage', weight: 50, startValue: 0, targetValue: 100, currentValue: 0, unit: '%' }]);
    setActiveSubTab('manage');
  };

  // Trigger check-in dialog
  const openCheckIn = (goal: ObjectiveItem, kr: KeyResultDetail) => {
    setSelectedGoal(goal);
    setSelectedKR(kr);
    setCheckInValue(kr.currentValue || kr.progress);
    setCheckInNote('');
    setCheckInStatus(goal.status);
    setCheckInModalOpen(true);
  };

  const handleCheckInSubmit = () => {
    if (!selectedGoal || !selectedKR) return;

    const updatedGoals = goals.map(g => {
      if (g.id === selectedGoal.id) {
        const updatedKrs = g.keyResults.map(k => {
          if (k.id === selectedKR.id) {
            let newProgress = 0;
            let newVal = checkInValue;
            
            if (k.type === 'milestone' && k.milestones) {
              // Calculate progress from completed milestones
              const completedCount = k.milestones.filter(m => m.completed).length;
              newProgress = Math.round((completedCount / k.milestones.length) * 100);
              newVal = completedCount;
            } else if (k.startValue !== undefined && k.targetValue !== undefined) {
              const delta = k.targetValue - k.startValue;
              if (delta !== 0) {
                newProgress = Math.min(100, Math.max(0, Math.round(((checkInValue - k.startValue) / delta) * 100)));
              }
            } else {
              newProgress = Math.min(100, Math.max(0, checkInValue));
            }

            const newHistoryItem = {
              id: `ch-new-${Date.now()}`,
              date: new Date().toISOString().split('T')[0],
              value: newVal,
              progress: newProgress,
              note: checkInNote || 'Cập nhật định kỳ qua hệ thống',
              author: 'Roberto Canevari'
            };

            return {
              ...k,
              currentValue: newVal,
              progress: newProgress,
              checkInHistory: [newHistoryItem, ...(k.checkInHistory || [])]
            };
          }
          return k;
        });

        return {
          ...g,
          status: checkInStatus,
          keyResults: updatedKrs
        };
      }
      return g;
    });

    setGoals(updatedGoals);
    setCheckInModalOpen(false);
    setSelectedGoal(null);
    setSelectedKR(null);
  };

  // Toggle milestone completion directly
  const toggleMilestone = (goalId: string, krId: string, milestoneId: string) => {
    const updatedGoals = goals.map(g => {
      if (g.id === goalId) {
        const updatedKrs = g.keyResults.map(k => {
          if (k.id === krId && k.type === 'milestone' && k.milestones) {
            const updatedMilestones = k.milestones.map(m => 
              m.id === milestoneId ? { ...m, completed: !m.completed } : m
            );
            const completedCount = updatedMilestones.filter(m => m.completed).length;
            const newProgress = Math.round((completedCount / updatedMilestones.length) * 100);
            
            return {
              ...k,
              progress: newProgress,
              milestones: updatedMilestones
            };
          }
          return k;
        });
        return { ...g, keyResults: updatedKrs };
      }
      return g;
    });
    setGoals(updatedGoals);
  };

  // Delete Objective
  const handleDeleteObjective = (id: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa mục tiêu OKR này không?')) {
      setGoals(goals.filter(g => g.id !== id));
    }
  };

  // Filter & Search Goals
  const filteredGoals = goals.filter(g => {
    const matchesSearch = g.objective.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          g.ownerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          g.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || g.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const cardStyle = { 
    backgroundColor: 'rgba(255, 255, 255, 0.45)',
    backdropFilter: 'blur(12px)'
  };

  return (
    <div className="flex-1 overflow-auto p-6 space-y-6 flex flex-col select-none">
      
      {/* 7. BỐ CỤC TRANG NỘI DUNG: BANNER BO CONG 4 GÓC 10PX */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-rose-700 rounded-[10px] shadow-lg p-6 text-white relative overflow-hidden transition-all duration-300 shrink-0">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 z-10 relative">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center animate-pulse">
              <Target size={26} className="text-amber-200" />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                <span>Mục tiêu & Kết quả chính (OKRs)</span>
              </h2>
              <p className="text-xs text-orange-100">
                Quản trị OKRs bài bản theo chuẩn mực quốc tế: Thiết lập, Cân bằng và Căn chỉnh mục tiêu doanh nghiệp.
              </p>
            </div>
          </div>

          {/* SUB NAVIGATION TABS */}
          
        </div>
      </div>

      {/* Sub-navigation Tabs */}
      <div className="flex border-b border-gray-200 dark:border-slate-800 mb-2 bg-white dark:bg-slate-900 rounded-xl p-1.5 shadow-sm border shrink-0">
        <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200/50 self-start md:self-auto shrink-0">
          
            <button
              onClick={() => setActiveSubTab('manage')}
              className={cn(
                "px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center space-x-1.5",
                activeSubTab === 'manage' 
                  ? "bg-white text-orange-700 shadow-md" 
                  : "text-slate-500 hover:text-slate-700 hover:text-indigo-700 shadow-sm"
              )}
            >
              <Sliders size={14} />
              <span>Danh sách OKRs</span>
            </button>
            
            <button
              onClick={() => setActiveSubTab('create')}
              className={cn(
                "px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center space-x-1.5",
                activeSubTab === 'create' 
                  ? "bg-white text-orange-700 shadow-md" 
                  : "text-slate-500 hover:text-slate-700 hover:text-indigo-700 shadow-sm"
              )}
            >
              <Plus size={14} />
              <span>Thiết lập mục tiêu mới</span>
            </button>

            <button
              onClick={() => setActiveSubTab('tree')}
              className={cn(
                "px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center space-x-1.5",
                activeSubTab === 'tree' 
                  ? "bg-white text-orange-700 shadow-md" 
                  : "text-slate-500 hover:text-slate-700 hover:text-indigo-700 shadow-sm"
              )}
            >
              <GitPullRequest size={14} />
              <span>Sơ đồ liên kết</span>
            </button>
          
        </div>
      </div>


      {/* CONTENT AREA */}
      <div className="flex-1 flex flex-col gap-6 min-h-0">
        
        {/* TAB 1: LIST AND CHECK-IN */}
        {activeSubTab === 'manage' && (
          <div className="space-y-6">
            
            {/* Filters Bar */}
            <div className="bg-white rounded-xl border border-slate-200/60 p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3 shadow-sm">
              <div className="relative flex-1 max-w-md">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Tìm kiếm mục tiêu, người phụ trách, phòng ban..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
                />
              </div>

              <div className="flex items-center space-x-3">
                <span className="text-xs text-slate-500 font-bold flex items-center space-x-1">
                  <Filter size={14} />
                  <span>Bộ lọc:</span>
                </span>
                <div className="flex space-x-1.5">
                  {['All', 'Company', 'Department', 'Individual'].map(cat => (
                    <button
                      key={cat}
                      onClick={() => setCategoryFilter(cat)}
                      className={cn(
                        "px-3 py-1 rounded-lg text-xs font-bold cursor-pointer transition-all border",
                        categoryFilter === cat 
                          ? "bg-slate-800 border-slate-800 text-white shadow-sm" 
                          : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                      )}
                    >
                      {cat === 'All' && 'Tất cả'}
                      {cat === 'Company' && 'Cấp công ty'}
                      {cat === 'Department' && 'Cấp phòng ban'}
                      {cat === 'Individual' && 'Cá nhân'}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* OKR List Container */}
            <div className="space-y-4">
              {filteredGoals.map(goal => {
                const totalProgress = getObjectiveProgress(goal);
                return (
                  <div key={goal.id} className="bg-white rounded-xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all overflow-hidden group">
                    
                    {/* Objective Title Header */}
                    <div className="p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-100 bg-slate-50/40">
                      <div className="flex items-start space-x-3 flex-1">
                        <div className="p-2 bg-gradient-to-tr from-amber-500 to-orange-500 text-white rounded-lg mt-0.5 shrink-0 shadow-sm shadow-orange-500/20">
                          <Target size={18} />
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                            <span className={cn(
                              "text-[10px] font-bold px-2 py-0.5 rounded shadow-sm uppercase tracking-wider text-white",
                              goal.category === 'Company' ? "bg-indigo-600" :
                              goal.category === 'Department' ? "bg-blue-600" : "bg-emerald-600"
                            )}>
                              {goal.category === 'Company' ? 'Công ty' : goal.category === 'Department' ? 'Phòng ban' : 'Cá nhân'}
                            </span>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded shadow-sm bg-slate-100 text-slate-600 border border-slate-200">
                              {goal.period}
                            </span>
                            <span className={cn(
                              "text-[10px] font-extrabold px-2 py-0.5 rounded shadow-sm text-white",
                              goal.status === 'On Track' ? "bg-emerald-500" :
                              goal.status === 'At Risk' ? "bg-amber-500" : "bg-red-500"
                            )}>
                              {goal.status === 'On Track' ? 'Đúng tiến độ' : goal.status === 'At Risk' ? 'Có rủi ro' : 'Chậm trễ'}
                            </span>
                          </div>
                          <h3 className="text-sm font-extrabold text-slate-800 leading-snug">{goal.objective}</h3>
                        </div>
                      </div>

                      {/* Objective Progress bar & details */}
                      <div className="flex items-center space-x-6">
                        <div className="text-right space-y-1 shrink-0">
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Tiến độ chung</p>
                          <div className="flex items-center space-x-2">
                            <span className="text-base font-black text-slate-800">{totalProgress}%</span>
                            <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200/40">
                              <div 
                                className={cn(
                                  "h-full rounded-full transition-all duration-500",
                                  totalProgress >= 70 ? "bg-emerald-500" :
                                  totalProgress >= 40 ? "bg-amber-500" : "bg-red-500"
                                )} 
                                style={{ width: `${totalProgress}%` }}
                              />
                            </div>
                          </div>
                        </div>

                        {/* Owner Badge */}
                        <div className="flex items-center space-x-2 border-l border-slate-200 pl-4 shrink-0">
                          <img
                            src={goal.ownerAvatar}
                            alt={goal.ownerName}
                            className="w-8 h-8 rounded-full ring-2 ring-blue-500/20"
                          />
                          <div className="text-left hidden sm:block">
                            <p className="text-xs font-bold text-slate-700">{goal.ownerName}</p>
                            <p className="text-[10px] text-slate-400 font-medium">{goal.department}</p>
                          </div>
                        </div>

                        {/* Delete Objective button */}
                        <button
                          onClick={() => handleDeleteObjective(goal.id)}
                          className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                          title="Xóa mục tiêu"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>

                    {/* Aligned Corporate Goal Banner */}
                    {goal.parentObjectiveId && (
                      <div className="px-5 py-2 bg-blue-50/50 border-b border-slate-100 flex items-center space-x-2 text-[11px] text-blue-700 font-bold">
                        <GitPullRequest size={12} className="shrink-0 text-blue-500" />
                        <span>Được căn chỉnh với mục tiêu Công ty:</span>
                        <span className="text-slate-700 italic font-semibold">
                          "{COMPANY_OBJECTIVES.find(c => c.id === goal.parentObjectiveId)?.name}"
                        </span>
                      </div>
                    )}

                    {/* Key Results Rows */}
                    <div className="p-5 space-y-4">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center space-x-1.5">
                        <Layers size={12} />
                        <span>Kết quả then chốt & Trọng số đóng góp (Key Results)</span>
                      </h4>

                      <div className="divide-y divide-slate-100">
                        {goal.keyResults.map(kr => (
                          <div key={kr.id} className="py-3.5 first:pt-0 last:pb-0 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div className="space-y-1.5 flex-1 pr-6">
                              <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                                {getKRTypeBadge(kr.type)}
                                <span className="bg-slate-100 text-slate-600 border border-slate-200 px-2 py-0.5 rounded text-[10px] font-bold">
                                  Trọng số: {kr.weight}%
                                </span>
                                {kr.unit && (
                                  <span className="bg-orange-50 text-orange-600 border border-orange-100 px-2 py-0.5 rounded text-[10px] font-bold">
                                    Đơn vị: {kr.unit}
                                  </span>
                                )}
                              </div>
                              <p className="text-xs font-bold text-slate-700 leading-normal">{kr.name}</p>
                              
                              {/* Display Values if Numeric / Percentage */}
                              {kr.type !== 'milestone' && kr.targetValue !== undefined && (
                                <div className="text-[10px] text-slate-500 font-semibold flex items-center space-x-2">
                                  <span>Bắt đầu: {kr.startValue}</span>
                                  <ChevronRight size={10} />
                                  <span className="text-blue-600 font-bold">Hiện tại: {kr.currentValue}</span>
                                  <ChevronRight size={10} />
                                  <span className="text-slate-700 font-bold">Mục tiêu: {kr.targetValue}</span>
                                </div>
                              )}

                              {/* Milestones expander if Milestone Type */}
                              {kr.type === 'milestone' && kr.milestones && (
                                <div className="mt-2.5 bg-slate-50 rounded-xl p-3 border border-slate-200/50 space-y-2">
                                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Danh sách các bước cột mốc:</p>
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    {kr.milestones.map(m => (
                                      <button
                                        key={m.id}
                                        onClick={() => toggleMilestone(goal.id, kr.id, m.id)}
                                        className={cn(
                                          "flex items-center space-x-2 p-2 rounded-lg text-left text-xs transition-all cursor-pointer border",
                                          m.completed 
                                            ? "bg-emerald-50/50 border-emerald-100 text-emerald-800" 
                                            : "bg-white border-slate-200 text-slate-600 hover:bg-slate-100/50"
                                        )}
                                      >
                                        <div className={cn(
                                          "w-4 h-4 rounded-full border flex items-center justify-center transition-all shrink-0",
                                          m.completed 
                                            ? "bg-emerald-500 border-emerald-500 text-white" 
                                            : "border-slate-300"
                                        )}>
                                          {m.completed && <Check size={10} strokeWidth={3} />}
                                        </div>
                                        <span className={cn("truncate font-medium", m.completed && "line-through text-emerald-600/80")}>
                                          {m.name}
                                        </span>
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* KR Progress and Check-in action button */}
                            <div className="flex items-center space-x-4 shrink-0 justify-between md:justify-end">
                              <div className="text-right space-y-0.5 min-w-[70px]">
                                <span className="text-xs font-black text-slate-700">{kr.progress}%</span>
                                <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200/50">
                                  <div 
                                    className="h-full bg-blue-600 rounded-full" 
                                    style={{ width: `${kr.progress}%` }}
                                  />
                                </div>
                              </div>

                              <button
                                onClick={() => openCheckIn(goal, kr)}
                                className="flex items-center space-x-1 bg-white border border-blue-200 hover:border-blue-500 text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all shadow-sm cursor-pointer"
                              >
                                <Award size={13} className="text-blue-500 animate-bounce" />
                                <span>Check-in Profit</span>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                );
              })}

              {filteredGoals.length === 0 && (
                <div className="bg-white rounded-xl border border-slate-200 p-12 text-center space-y-3">
                  <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
                    <Target size={24} />
                  </div>
                  <h4 className="text-sm font-bold text-slate-700">Không tìm thấy OKRs nào</h4>
                  <p className="text-xs text-slate-400">Hãy thử nhập từ khóa khác hoặc click vào "Thiết lập mục tiêu mới" để kiến tạo OKR đầu tiên của bạn!</p>
                </div>
              )}
            </div>

          </div>
        )}

        {/* TAB 2: STEP BY STEP GOAL AUTHORING */}
        {activeSubTab === 'create' && (
          <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-slate-200/80 shadow-md p-6 md:p-8 space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-base font-extrabold text-slate-800 flex items-center space-x-2">
                <Sparkles size={18} className="text-amber-500 animate-spin-slow" />
                <span>Kiến tạo OKRs doanh nghiệp chuẩn chỉnh</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Theo các học thuyết quản trị hiện đại, cấu trúc mục tiêu phải hướng đến kết quả định lượng cụ thể, có phân định trọng số và phân rã các bước thực hiện.
              </p>
            </div>

            <form onSubmit={handleCreateOkr} className="space-y-6">
              
              {/* Objective Definition */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-blue-600 uppercase tracking-widest flex items-center space-x-1.5 border-b border-blue-50 pb-1.5">
                  <Target size={14} />
                  <span>Bước 1: Xác định Mục tiêu (Objective)</span>
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2 space-y-1.5">
                    <label className="text-xs font-bold text-slate-600">Nội dung mục tiêu chính (What do you want to achieve?)</label>
                    <input
                      type="text"
                      required
                      placeholder="Ví dụ: Nâng cao năng lực kỹ thuật của bộ phận kỹ sư Front-end"
                      value={objName}
                      onChange={(e) => setObjName(e.target.value)}
                      className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50 font-bold"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-600">Phân loại cấp độ</label>
                    <select
                      value={objCategory}
                      onChange={(e: any) => setObjCategory(e.target.value)}
                      className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
                    >
                      <option value="Company">Cấp doanh nghiệp (Company OKR)</option>
                      <option value="Department">Cấp phòng ban (Department OKR)</option>
                      <option value="Individual">Mục tiêu cá nhân (Individual OKR)</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-600">Chu kỳ / Giai đoạn mục tiêu</label>
                    <select
                      value={objPeriod}
                      onChange={(e) => setObjPeriod(e.target.value)}
                      className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
                    >
                      <option value="Quý 3 - 2026">Quý 3 - Năm 2026</option>
                      <option value="Quý 4 - 2026">Quý 4 - Năm 2026</option>
                      <option value="Cả Năm 2026">Kế hoạch cả năm 2026</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-600">Phòng ban phụ trách</label>
                    <input
                      type="text"
                      required
                      value={objDept}
                      onChange={(e) => setObjDept(e.target.value)}
                      className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-600">Căn chỉnh với Mục tiêu Chiến lược cấp trên</label>
                    <select
                      value={parentCorpObjId}
                      onChange={(e) => setParentCorpObjId(e.target.value)}
                      className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50 font-medium"
                    >
                      {COMPANY_OBJECTIVES.map(corp => (
                        <option key={corp.id} value={corp.id}>
                          [Doanh nghiệp] {corp.name} ({corp.progress}% tiến độ)
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Key Results definition */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-blue-50 pb-1.5">
                  <h3 className="text-xs font-bold text-blue-600 uppercase tracking-widest flex items-center space-x-1.5">
                    <Layers size={14} />
                    <span>Bước 2: Thiết lập kết quả chính then chốt (Key Results)</span>
                  </h3>
                  <button
                    type="button"
                    onClick={addKrRow}
                    className="flex items-center space-x-1 text-xs text-blue-600 font-extrabold hover:text-blue-800 cursor-pointer"
                  >
                    <Plus size={14} />
                    <span>Thêm dòng Kết quả</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {krsInput.map((kr, idx) => (
                    <div key={idx} className="bg-slate-50/50 border border-slate-200/60 rounded-xl p-4 space-y-4 relative">
                      <div className="absolute top-4 right-4 flex items-center space-x-2">
                        <span className="text-[10px] font-bold bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full">
                          KR #{idx + 1}
                        </span>
                        {krsInput.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeKrRow(idx)}
                            className="p-1 text-slate-400 hover:text-red-500 hover:bg-white rounded-lg transition-colors cursor-pointer border border-transparent hover:border-slate-100"
                          >
                            <Trash2 size={13} />
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="md:col-span-2 space-y-1">
                          <label className="text-[11px] font-bold text-slate-500">Mô tả Kết quả chính (What is the measurable outcome?)</label>
                          <input
                            type="text"
                            required
                            placeholder="Ví dụ: Toàn bộ 100% nhân viên vượt qua kỳ thi sát hạch bảo mật"
                            value={kr.name}
                            onChange={(e) => {
                              const newKrs = [...krsInput];
                              newKrs[idx].name = e.target.value;
                              setKrsInput(newKrs);
                            }}
                            className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-slate-500">Trọng số đóng góp (%)</label>
                          <input
                            type="number"
                            required
                            min="1"
                            max="100"
                            value={kr.weight}
                            onChange={(e) => {
                              const newKrs = [...krsInput];
                              newKrs[idx].weight = Number(e.target.value);
                              setKrsInput(newKrs);
                            }}
                            className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-slate-500">Loại định lượng (Type)</label>
                          <select
                            value={kr.type}
                            onChange={(e) => {
                              const newKrs = [...krsInput];
                              newKrs[idx].type = e.target.value as KRType;
                              if (newKrs[idx].type === 'percentage') {
                                newKrs[idx].unit = '%';
                                newKrs[idx].startValue = 0;
                                newKrs[idx].targetValue = 100;
                              } else if (newKrs[idx].type === 'numeric') {
                                newKrs[idx].unit = 'đơn vị';
                                newKrs[idx].startValue = 0;
                                newKrs[idx].targetValue = 10;
                              }
                              setKrsInput(newKrs);
                            }}
                            className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                          >
                            <option value="percentage">Phần trăm %</option>
                            <option value="numeric">Số lượng / Giá trị KPI</option>
                            <option value="milestone">Danh sách cột mốc công việc</option>
                          </select>
                        </div>

                        {kr.type !== 'milestone' && (
                          <>
                            <div className="space-y-1">
                              <label className="text-[11px] font-bold text-slate-500">Điểm khởi điểm</label>
                              <input
                                type="number"
                                value={kr.startValue}
                                onChange={(e) => {
                                  const newKrs = [...krsInput];
                                  newKrs[idx].startValue = Number(e.target.value);
                                  setKrsInput(newKrs);
                                }}
                                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                              />
                            </div>

                            <div className="space-y-1">
                              <label className="text-[11px] font-bold text-slate-500">Mục tiêu đạt được</label>
                              <input
                                type="number"
                                value={kr.targetValue}
                                onChange={(e) => {
                                  const newKrs = [...krsInput];
                                  newKrs[idx].targetValue = Number(e.target.value);
                                  setKrsInput(newKrs);
                                }}
                                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                              />
                            </div>
                          </>
                        )}

                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-slate-500">Đơn vị đo lường (Unit)</label>
                          <input
                            type="text"
                            placeholder="%, hợp đồng, khách hàng..."
                            value={kr.unit}
                            onChange={(e) => {
                              const newKrs = [...krsInput];
                              newKrs[idx].unit = e.target.value;
                              setKrsInput(newKrs);
                            }}
                            className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions Footer */}
              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setActiveSubTab('manage')}
                  className="bg-white border border-slate-200 text-slate-600 px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-slate-50 cursor-pointer transition-all"
                >
                  Quay lại danh sách
                </button>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2.5 rounded-xl text-xs font-bold hover:from-blue-700 hover:to-indigo-700 cursor-pointer transition-all shadow-md shadow-blue-500/10"
                >
                  Kiến tạo OKRs mới
                </button>
              </div>

            </form>
          </div>
        )}

        {/* TAB 3: VISUAL ALIGNMENT TREE */}
        {activeSubTab === 'tree' && (
          <div className="space-y-8 max-w-5xl mx-auto">
            <div className="bg-amber-50 border border-amber-200/60 rounded-xl p-4 flex items-start space-x-3">
              <Info className="text-amber-500 mt-0.5 shrink-0" size={16} />
              <div>
                <h4 className="text-xs font-bold text-amber-800">Cơ chế Căn chỉnh liên thông (Goal Alignment Map)</h4>
                <p className="text-[11px] text-amber-700 mt-1 leading-relaxed">
                  Hệ thống giúp doanh nghiệp đồng bộ hóa chiến lược bằng cách liên kết trực tiếp OKR bộ phận/cá nhân với mục tiêu cốt lõi của công ty. Khi các mục tiêu con đạt được tiến bộ, chúng sẽ tự động đóng góp vào hiệu suất chung của tổ chức theo thời gian thực.
                </p>
              </div>
            </div>

            {/* Tree Map Representation */}
            <div className="relative space-y-12 pl-4 md:pl-8 before:absolute before:left-3 md:before:left-7 before:top-4 before:bottom-4 before:w-0.5 before:bg-blue-200/50">
              {COMPANY_OBJECTIVES.map(corp => {
                const associatedGoals = goals.filter(g => g.parentObjectiveId === corp.id);
                return (
                  <div key={corp.id} className="space-y-4 relative">
                    {/* Node Dot */}
                    <div className="absolute -left-5 md:-left-9 top-3 w-4 h-4 rounded-full bg-blue-500 ring-4 ring-blue-100 border-2 border-white z-10 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                    </div>

                    {/* Company Level Card */}
                    <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-2xl p-5 border border-slate-800 shadow-lg relative overflow-hidden">
                      <div className="absolute right-0 top-0 translate-x-4 -translate-y-4 w-28 h-28 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
                      
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="space-y-1.5">
                          <span className="bg-blue-600/30 text-blue-300 border border-blue-500/20 text-[9px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full">
                            Mục tiêu chiến lược Doanh nghiệp (Company)
                          </span>
                          <h3 className="text-sm font-black tracking-tight">{corp.name}</h3>
                        </div>

                        <div className="text-right space-y-1 shrink-0">
                          <span className="text-xs font-black text-blue-300 block">{corp.progress}% Hoàn thành</span>
                          <div className="w-28 h-2 bg-slate-800 rounded-full overflow-hidden border border-white/5">
                            <div className="h-full bg-blue-400 rounded-full" style={{ width: `${corp.progress}%` }} />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Aligned Sub Goals (Department & Individual) */}
                    <div className="pl-6 md:pl-12 space-y-4">
                      {associatedGoals.map(subGoal => {
                        const subProg = getObjectiveProgress(subGoal);
                        return (
                          <div key={subGoal.id} className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm hover:shadow-md transition-all relative">
                            {/* Branch connector line horizontal */}
                            <div className="absolute -left-6 md:-left-12 top-1/2 -translate-y-1/2 w-6 md:w-12 h-0.5 bg-blue-200/50 pointer-events-none" />

                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                              <div className="space-y-1 min-w-0 flex-1">
                                <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                                  <span className={cn(
                                    "text-[9px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wider text-white shadow-sm",
                                    subGoal.category === 'Department' ? "bg-blue-600" : "bg-emerald-600"
                                  )}>
                                    {subGoal.category === 'Department' ? 'Phòng ban' : 'Cá nhân'}
                                  </span>
                                  <span className="text-[10px] font-semibold text-slate-500">
                                    {subGoal.department}
                                  </span>
                                </div>
                                <h4 className="text-xs font-extrabold text-slate-800 truncate">{subGoal.objective}</h4>
                              </div>

                              <div className="flex items-center space-x-4 shrink-0 justify-between sm:justify-end border-t sm:border-t-0 border-slate-100 pt-2 sm:pt-0">
                                <div className="text-right">
                                  <span className="text-xs font-black text-slate-800 block">{subProg}%</span>
                                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Đóng góp</span>
                                </div>

                                <img
                                  src={subGoal.ownerAvatar}
                                  alt={subGoal.ownerName}
                                  className="w-7 h-7 rounded-full ring-2 ring-slate-100"
                                  title={`${subGoal.ownerName} (${subGoal.department})`}
                                />
                              </div>
                            </div>
                          </div>
                        );
                      })}

                      {associatedGoals.length === 0 && (
                        <div className="bg-slate-50/50 border border-dashed border-slate-200/60 rounded-xl p-4 text-center text-xs text-slate-400 font-medium">
                          Chưa có mục tiêu phòng ban hay cá nhân nào được liên kết với cột mốc chiến lược này.
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>

      {/* CHECK-IN OVERLAY DIALOG / MODAL */}
      {checkInModalOpen && selectedGoal && selectedKR && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-[999] animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full overflow-hidden animate-in zoom-in-95 duration-200">
            
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-5">
              <div className="flex items-center space-x-2 text-xs text-blue-100 font-bold uppercase tracking-wider mb-1">
                <Award size={14} className="animate-bounce" />
                <span>Smart Check-in Workspace</span>
              </div>
              <h3 className="text-sm font-black leading-snug">{selectedKR.name}</h3>
              <p className="text-[11px] text-blue-100/80 mt-1 italic font-medium">
                Thuộc mục tiêu: "{selectedGoal.objective}"
              </p>
            </div>

            {/* Form controls */}
            <div className="p-6 space-y-5">
              
              {/* Type Details */}
              <div className="flex items-center justify-between bg-slate-50 border border-slate-100 p-3 rounded-xl text-xs font-semibold">
                <span className="text-slate-500">Đo lường bằng:</span>
                <div className="flex space-x-1.5 items-center">
                  {getKRTypeBadge(selectedKR.type)}
                  {selectedKR.unit && <span className="bg-orange-50 text-orange-600 border border-orange-100 px-2 rounded text-[10px] font-bold">Đơn vị: {selectedKR.unit}</span>}
                </div>
              </div>

              {/* Progress update slider / entry fields */}
              {selectedKR.type !== 'milestone' ? (
                <div className="space-y-3 bg-blue-50/20 border border-blue-100/50 p-4 rounded-xl">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-black text-slate-700">Giá trị hiện tại của kết quả</label>
                    <span className="text-xs font-black bg-blue-600 text-white px-2.5 py-0.5 rounded shadow-sm">
                      {checkInValue} {selectedKR.unit || '%'}
                    </span>
                  </div>

                  <input
                    type="range"
                    min={selectedKR.startValue ?? 0}
                    max={selectedKR.targetValue ?? 100}
                    value={checkInValue}
                    onChange={(e) => setCheckInValue(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />

                  <div className="flex justify-between text-[10px] text-slate-400 font-bold uppercase">
                    <span>Khởi điểm: {selectedKR.startValue ?? 0}</span>
                    <span className="text-blue-600">Đang chọn: {checkInValue}</span>
                    <span>Mục tiêu: {selectedKR.targetValue ?? 100}</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-2 bg-purple-50/20 border border-purple-100/50 p-4 rounded-xl">
                  <h4 className="text-xs font-extrabold text-purple-800 flex items-center space-x-1">
                    <CheckSquare size={13} />
                    <span>Cập nhật qua các mốc công việc (Milestones)</span>
                  </h4>
                  <p className="text-[10px] text-slate-500">
                    Cột mốc này được cập nhật tự động bằng cách tích hoàn tất trực tiếp ở danh sách OKR chính.
                  </p>
                  <div className="pt-2">
                    <span className="text-xs font-black text-purple-700 bg-purple-50 border border-purple-100 px-2.5 py-1 rounded-lg">
                      Tiến độ ước đạt: {selectedKR.progress}%
                    </span>
                  </div>
                </div>
              )}

              {/* Overall Status Selector */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600">Trạng thái tự đánh giá (Objective Health)</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'On Track', label: 'Đúng tiến độ', color: 'border-emerald-500 hover:bg-emerald-50 text-emerald-800', activeBg: 'bg-emerald-500 text-white border-emerald-500' },
                    { id: 'At Risk', label: 'Có rủi ro', color: 'border-amber-500 hover:bg-amber-50 text-amber-800', activeBg: 'bg-amber-500 text-white border-amber-500' },
                    { id: 'Off Track', label: 'Chậm trễ', color: 'border-red-500 hover:bg-red-50 text-red-800', activeBg: 'bg-red-500 text-white border-red-500' }
                  ].map(st => {
                    const active = checkInStatus === st.id;
                    return (
                      <button
                        key={st.id}
                        type="button"
                        onClick={() => setCheckInStatus(st.id as any)}
                        className={cn(
                          "py-2 px-3 border rounded-xl text-center text-[11px] font-extrabold transition-all cursor-pointer shadow-sm",
                          active ? st.activeBg : `bg-white border-slate-200 text-slate-600 ${st.color}`
                        )}
                      >
                        {st.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Check-In Note */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600">Nhật ký cập nhật / Lý do (Check-in Note)</label>
                <textarea
                  required
                  placeholder="Hãy giải trình ngắn gọn các hành động cốt lõi đã làm để đạt được cột mốc này..."
                  value={checkInNote}
                  onChange={(e) => setCheckInNote(e.target.value)}
                  rows={3}
                  className="w-full p-3 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
                />
              </div>

              {/* Historical Log */}
              {selectedKR.checkInHistory && selectedKR.checkInHistory.length > 0 && (
                <div className="space-y-2 max-h-[120px] overflow-y-auto border-t border-slate-100 pt-3">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center space-x-1">
                    <Clock size={11} />
                    <span>Lịch sử Check-in trước đó</span>
                  </p>
                  <div className="space-y-2">
                    {selectedKR.checkInHistory.map(hist => (
                      <div key={hist.id} className="text-[11px] bg-slate-50 border border-slate-200/40 p-2 rounded-lg space-y-1">
                        <div className="flex justify-between font-bold text-slate-600">
                          <span>{hist.date}</span>
                          <span className="text-blue-600">Giá trị: {hist.value} ({hist.progress}%)</span>
                        </div>
                        <p className="text-slate-500 italic">"{hist.note}"</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="bg-slate-50 p-4 flex items-center justify-end space-x-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => {
                  setCheckInModalOpen(false);
                  setSelectedGoal(null);
                  setSelectedKR(null);
                }}
                className="bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-xl text-xs font-bold hover:bg-slate-100 cursor-pointer transition-all"
              >
                Hủy bỏ
              </button>
              <button
                type="button"
                onClick={handleCheckInSubmit}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2 rounded-xl text-xs font-bold hover:from-blue-700 hover:to-indigo-700 cursor-pointer transition-all shadow-md shadow-blue-500/10"
              >
                Cập nhật hệ thống
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
