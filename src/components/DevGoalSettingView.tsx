import React, { useState } from 'react';
import { 
  Flag, 
  Plus, 
  Search, 
  Award, 
  Sparkles, 
  BookOpen, 
  Compass, 
  UserCheck, 
  Check, 
  Trash2, 
  Info, 
  Clock, 
  TrendingUp,
  Sliders,
  Calendar,
  Layers,
  HelpCircle,
  MessageSquare
} from 'lucide-react';
import { cn } from '../lib/utils';

export type CompetencyCategory = 'Leadership' | 'Technical' | 'Communication' | 'Strategic Thinking' | 'Customer Experience';
export type DevGoalStatus = 'Draft' | 'Active' | 'Under Review' | 'Completed';

export interface ActionPlanItem {
  id: string;
  title: string;
  type: 'Course' | 'Mentoring' | 'Project Case' | 'Reading';
  completed: boolean;
}

export interface DevGoalItem {
  id: string;
  title: string;
  competency: CompetencyCategory;
  description: string;
  targetDate: string;
  mentorName: string;
  mentorAvatar: string;
  status: DevGoalStatus;
  actionPlans: ActionPlanItem[];
  progress: number; // dynamically computed
  learningLogs: { id: string; date: string; content: string; author: string }[];
}

const INITIAL_DEV_GOALS: DevGoalItem[] = [
  {
    id: 'dg-1',
    title: 'Nâng cao năng lực đàm phán & Thương thảo hợp đồng Enterprise',
    competency: 'Strategic Thinking',
    description: 'Nắm vững các phương pháp đàm phán win-win theo Harvard Negotiation Project để gia tăng tỷ lệ chốt các hợp đồng trên 50,000 USD.',
    targetDate: '2026-09-30',
    mentorName: 'Roberto Canevari',
    mentorAvatar: 'https://i.pravatar.cc/150?u=roberto',
    status: 'Active',
    actionPlans: [
      { id: 'ap-1-1', title: 'Hoàn thành khóa học thương thuyết đàm phán trực tuyến nâng cao', type: 'Course', completed: true },
      { id: 'ap-1-2', title: 'Tham gia dự thính 3 buổi đàm phán hợp đồng mẫu thực tế cùng Giám đốc', type: 'Mentoring', completed: false },
      { id: 'ap-1-3', title: 'Biên soạn bộ khung tài liệu đàm phán tissue chuẩn (Negotiation Playbook)', type: 'Project Case', completed: false }
    ],
    progress: 33,
    learningLogs: [
      { id: 'log-1-1', date: '2026-07-02', content: 'Đã rút ra bài học sâu sắc từ case sụt giảm tỷ lệ ký kết: Cần nhấn mạnh ROI sớm thay vì chỉ so sánh tính năng.', author: 'Alice Nguyen' }
    ]
  },
  {
    id: 'dg-2',
    title: 'Nắm vững kiến trúc Cloud-Native & Bảo mật ứng dụng Microservices',
    competency: 'Technical',
    description: 'Hoàn thiện năng lực thiết kế hệ thống có khả năng chịu tải đồng thời cao, giảm thiểu downtime và tự động phục hồi sự cố.',
    targetDate: '2026-10-15',
    mentorName: 'David Tran',
    mentorAvatar: 'https://i.pravatar.cc/150?u=david',
    status: 'Active',
    actionPlans: [
      { id: 'ap-2-1', title: 'Thi lấy chứng chỉ AWS Certified Solutions Architect', type: 'Course', completed: false },
      { id: 'ap-2-2', title: 'Nghiên cứu áp dụng Kubernetes Service Mesh (Istio) vào môi trường test', type: 'Project Case', completed: false },
      { id: 'ap-2-3', title: 'Soạn thảo kiến trúc phục hồi thảm họa tự động (Auto Failover)', type: 'Project Case', completed: false }
    ],
    progress: 0,
    learningLogs: []
  },
  {
    id: 'dg-3',
    title: 'Hoàn thiện tư duy Trải nghiệm Khách hàng Toàn diện (Total CX Mindset)',
    competency: 'Customer Experience',
    description: 'Thấu hiểu cách thức thiết kế bản đồ hành trình khách hàng (Customer Journey Mapping) để đồng bộ mọi điểm chạm từ Marketing đến CSKH.',
    targetDate: '2026-08-15',
    mentorName: 'Elena Rostova',
    mentorAvatar: 'https://i.pravatar.cc/150?u=elena',
    status: 'Completed',
    actionPlans: [
      { id: 'ap-3-1', title: 'Đọc và tóm tắt cuốn sách "The Effortless Experience"', type: 'Reading', completed: true },
      { id: 'ap-3-2', title: 'Lập bản đồ hành trình của khách hàng doanh nghiệp SME thực tế', type: 'Project Case', completed: true },
      { id: 'ap-3-3', title: 'Trình bày giải pháp tối ưu hóa tốc độ xử lý khiếu nại trước Ban điều hành', type: 'Project Case', completed: true }
    ],
    progress: 100,
    learningLogs: [
      { id: 'log-3-1', date: '2026-06-10', content: 'Trình bày thành công và được ban lãnh đạo thông qua cơ chế hỗ trợ tự động mới.', author: 'Elena Rostova' }
    ]
  }
];

export function DevGoalSettingView({ cardOpacity }: { cardOpacity: number }) {
  const [goals, setGoals] = useState<DevGoalItem[]>(INITIAL_DEV_GOALS);
  const [selectedGoal, setSelectedGoal] = useState<DevGoalItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [competencyFilter, setCompetencyFilter] = useState<string>('All');

  // Form states
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newCompetency, setNewCompetency] = useState<CompetencyCategory>('Leadership');
  const [newMentor, setNewMentor] = useState('Roberto Canevari');
  const [newTargetDate, setNewTargetDate] = useState(new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);
  const [tempActions, setTempActions] = useState<{title: string, type: 'Course' | 'Mentoring' | 'Project Case' | 'Reading'}[]>([
    { title: '', type: 'Course' }
  ]);

  const [logText, setLogText] = useState('');

  const COMPETENCIES: CompetencyCategory[] = ['Leadership', 'Technical', 'Communication', 'Strategic Thinking', 'Customer Experience'];

  // Recalculate progress helper
  const updateGoalProgress = (goal: DevGoalItem): DevGoalItem => {
    if (goal.actionPlans.length === 0) return goal;
    const completedCount = goal.actionPlans.filter(ap => ap.completed).length;
    const progress = Math.round((completedCount / goal.actionPlans.length) * 100);
    const newStatus: DevGoalStatus = progress === 100 ? 'Completed' : goal.status === 'Completed' ? 'Active' : goal.status;
    return {
      ...goal,
      progress,
      status: newStatus
    };
  };

  // Toggle Action item completion
  const handleToggleAction = (goalId: string, actionId: string) => {
    const updated = goals.map(g => {
      if (g.id === goalId) {
        const updatedPlans = g.actionPlans.map(ap => 
          ap.id === actionId ? { ...ap, completed: !ap.completed } : ap
        );
        return updateGoalProgress({ ...g, actionPlans: updatedPlans });
      }
      return g;
    });
    setGoals(updated);
    if (selectedGoal && selectedGoal.id === goalId) {
      const found = updated.find(g => g.id === goalId);
      if (found) setSelectedGoal(found);
    }
  };

  // Create learning log entry
  const handleAddLog = () => {
    if (!selectedGoal || !logText.trim()) return;

    const newLog = {
      id: `log-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      content: logText,
      author: 'Chuyên Gia Phát Triển'
    };

    const updated = goals.map(g => {
      if (g.id === selectedGoal.id) {
        return {
          ...g,
          learningLogs: [newLog, ...g.learningLogs]
        };
      }
      return g;
    });

    setGoals(updated);
    const updatedActive = updated.find(g => g.id === selectedGoal.id);
    if (updatedActive) setSelectedGoal(updatedActive);
    setLogText('');
  };

  // Delete Goal
  const handleDeleteGoal = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Anh có chắc chắn muốn xóa mục tiêu phát triển cá nhân này không? Trọng tâm học tập này sẽ bị gỡ bỏ.')) {
      setGoals(goals.filter(g => g.id !== id));
      if (selectedGoal?.id === id) setSelectedGoal(null);
    }
  };

  // Submit Goal creation
  const handleCreateGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const actionsList = tempActions
      .filter(a => a.title.trim() !== '')
      .map((a, idx) => ({
        id: `ap-${Date.now()}-${idx}`,
        title: a.title,
        type: a.type,
        completed: false
      }));

    const newGoal: DevGoalItem = {
      id: `dg-${Date.now()}`,
      title: newTitle,
      competency: newCompetency,
      description: newDesc,
      targetDate: newTargetDate,
      mentorName: newMentor,
      mentorAvatar: `https://i.pravatar.cc/150?u=${newMentor.split(' ')[0].toLowerCase()}`,
      status: 'Active',
      actionPlans: actionsList,
      progress: 0,
      learningLogs: []
    };

    const finalGoal = updateGoalProgress(newGoal);
    setGoals([finalGoal, ...goals]);

    // reset fields
    setNewTitle('');
    setNewDesc('');
    setNewCompetency('Leadership');
    setTempActions([{ title: '', type: 'Course' }]);
    setShowAddForm(false);
  };

  const filteredGoals = goals.filter(g => {
    const matchesSearch = g.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          g.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          g.mentorName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesComp = competencyFilter === 'All' || g.competency === competencyFilter;
    return matchesSearch && matchesComp;
  });

  const activeCount = goals.filter(g => g.status === 'Active').length;
  const completedCount = goals.filter(g => g.status === 'Completed').length;

  const cardStyle = { 
    backgroundColor: 'rgba(255, 255, 255, 0.45)',
    backdropFilter: 'blur(12px)'
  };

  return (
    <div className="flex-1 overflow-auto p-6 space-y-6 flex flex-col select-none">
      
      {/* 7. BỐ CỤC TRANG NỘI DUNG: BANNER BO CONG 4 GÓC 10PX */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 rounded-[10px] shadow-lg p-6 text-white relative overflow-hidden transition-all duration-300 shrink-0">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 z-10 relative">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center animate-pulse">
              <Flag size={26} className="text-teal-200" />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                <span>Mục tiêu Phát triển Cá nhân (IDPs)</span>
              </h2>
              <p className="text-xs text-teal-100">
                Xây dựng lộ trình đào tạo bản thân, thu hẹp khoảng cách năng lực cốt lõi thông qua các hành động học tập thực tiễn.
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-4 py-2.5 rounded-lg text-xs font-bold shadow-md hover:scale-[1.02] active:scale-95 transition-all cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4" /> Lập mục tiêu phát triển
          </button>
        </div>
      </div>

      {/* CORE CONTENT */}
      <div className="flex-1 flex flex-col gap-6 min-h-0">

        {/* METRICS ROW */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl border border-slate-200/60 p-4 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider block">Mục tiêu Đang rèn luyện</span>
              <span className="text-2xl font-black text-slate-800">{activeCount}</span>
            </div>
            <div className="p-3 bg-emerald-50 rounded-lg text-emerald-500">
              <Compass size={18} />
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200/60 p-4 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] text-teal-600 font-extrabold uppercase tracking-wider block">Mục tiêu Đã hoàn tất</span>
              <span className="text-2xl font-black text-teal-600">{completedCount}</span>
            </div>
            <div className="p-3 bg-teal-50 rounded-lg text-teal-500">
              <Award size={18} />
            </div>
          </div>

          <div className="bg-gradient-to-tr from-emerald-500 to-teal-600 rounded-xl p-4 shadow-sm flex items-center justify-between text-white col-span-2 md:col-span-1">
            <div className="space-y-1">
              <span className="text-[10px] text-white/80 font-extrabold uppercase tracking-wider block">Trung bình Tiến độ IDP</span>
              <span className="text-2xl font-black">
                {goals.length > 0 ? Math.round(goals.reduce((sum, g) => sum + g.progress, 0) / goals.length) : 0}%
              </span>
            </div>
            <div className="p-3 bg-white/10 rounded-lg">
              <TrendingUp size={18} />
            </div>
          </div>
        </div>

        {/* ADD GOAL FORM POPUP */}
        {showAddForm && (
          <div className="bg-white border border-slate-200 shadow-xl rounded-2xl p-6 space-y-4 max-w-4xl mx-auto transition-all animate-fade-in">
            <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
              <h3 className="text-sm font-extrabold text-slate-800 flex items-center space-x-1.5">
                <Sparkles size={16} className="text-amber-500" />
                <span>Thiết lập Mục tiêu học tập & Phát triển bản thân</span>
              </h3>
              <button onClick={() => setShowAddForm(false)} className="text-xs text-slate-400 hover:text-slate-600">Đóng</button>
            </div>

            <form onSubmit={handleCreateGoal} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2 space-y-1.5">
                  <label className="text-xs font-bold text-slate-600">Năng lực muốn cải thiện *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ví dụ: Làm chủ các kỹ năng tổ chức họp 1:1 tạo động lực cho nhân viên"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full px-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600">Phân nhóm năng lực</label>
                  <select
                    value={newCompetency}
                    onChange={(e: any) => setNewCompetency(e.target.value)}
                    className="w-full px-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none"
                  >
                    {COMPETENCIES.map(comp => (
                      <option key={comp} value={comp}>{comp}</option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-3 space-y-1.5">
                  <label className="text-xs font-bold text-slate-600">Lý do & Tầm quan trọng đối với công việc (Mô tả)</label>
                  <textarea
                    placeholder="Mục tiêu này giúp ích gì cho các dự án sắp tới? Đâu là rào cản hiện thời của Anh?"
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    className="w-full px-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none min-h-[50px]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600">Người kèm cặp / Cố vấn (Mentor)</label>
                  <select
                    value={newMentor}
                    onChange={(e) => setNewMentor(e.target.value)}
                    className="w-full px-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none"
                  >
                    <option value="Roberto Canevari">Roberto Canevari (CEO)</option>
                    <option value="David Tran">David Tran (Kỹ thuật)</option>
                    <option value="Elena Rostova">Elena Rostova (Vận hành)</option>
                    <option value="Minh Thư">Minh Thư (Nhân sự)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600">Hạn chót hoàn thành học tập</label>
                  <input
                    type="date"
                    value={newTargetDate}
                    onChange={(e) => setNewTargetDate(e.target.value)}
                    className="w-full px-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none"
                  />
                </div>
              </div>

              {/* Action plan checklist setup */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600 block">Kế hoạch Hành động Cụ thể (Actions & Courses)</label>
                {tempActions.map((act, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      placeholder="Tên hành động / Khóa học / Cuốn sách cần đọc..."
                      value={act.title}
                      onChange={(e) => {
                        const copy = [...tempActions];
                        copy[index].title = e.target.value;
                        setTempActions(copy);
                      }}
                      className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none"
                    />
                    <select
                      value={act.type}
                      onChange={(e: any) => {
                        const copy = [...tempActions];
                        copy[index].type = e.target.value;
                        setTempActions(copy);
                      }}
                      className="px-2 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none"
                    >
                      <option value="Course">Khóa học</option>
                      <option value="Mentoring">Mentor khuyên</option>
                      <option value="Project Case">Case thực tế</option>
                      <option value="Reading">Đọc sách</option>
                    </select>
                    {tempActions.length > 1 && (
                      <button
                        type="button"
                        onClick={() => setTempActions(tempActions.filter((_, idx) => idx !== index))}
                        className="text-xs text-rose-500 hover:bg-rose-50 p-1.5 rounded"
                      >
                        Xóa
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => setTempActions([...tempActions, { title: '', type: 'Course' }])}
                  className="text-[11px] text-emerald-500 font-bold hover:text-emerald-600 flex items-center space-x-1"
                >
                  <Plus size={12} />
                  <span>Thêm hành động phát triển</span>
                </button>
              </div>

              <div className="pt-3 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 border border-slate-200 rounded-xl text-xs text-slate-500 hover:bg-slate-50 cursor-pointer"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold rounded-xl shadow-md cursor-pointer"
                >
                  Lên kế hoạch phát triển
                </button>
              </div>
            </form>
          </div>
        )}

        {/* SEARCH & FILTER LIST */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-sm">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Tìm kiếm năng lực, định hướng mục tiêu hoặc cố vấn..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none bg-slate-50/50"
            />
          </div>

          <select
            value={competencyFilter}
            onChange={(e) => setCompetencyFilter(e.target.value)}
            className="px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white"
          >
            <option value="All">Tất cả năng lực</option>
            {COMPETENCIES.map(comp => (
              <option key={comp} value={comp}>{comp}</option>
            ))}
          </select>
        </div>

        {/* GRID LAYOUT FOR IDP PLAN OVERVIEW */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
          
          {/* List group grid */}
          <div className="xl:col-span-2 space-y-3">
            {filteredGoals.map(goal => {
              const isSelected = selectedGoal?.id === goal.id;
              
              const getCompetencyBadgeColor = (comp: CompetencyCategory) => {
                switch (comp) {
                  case 'Leadership': return 'bg-purple-50 text-purple-700 border-purple-100';
                  case 'Technical': return 'bg-blue-50 text-blue-700 border-blue-100';
                  case 'Communication': return 'bg-amber-50 text-amber-700 border-amber-100';
                  case 'Strategic Thinking': return 'bg-indigo-50 text-indigo-700 border-indigo-100';
                  case 'Customer Experience': return 'bg-cyan-50 text-cyan-700 border-cyan-100';
                }
              };

              return (
                <div
                  key={goal.id}
                  onClick={() => setSelectedGoal(goal)}
                  className={cn(
                    "bg-white rounded-xl border p-4 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 group",
                    isSelected ? "border-emerald-500 ring-2 ring-emerald-500/10" : "border-slate-200/70"
                  )}
                >
                  <div className="flex items-start space-x-3 flex-1 min-w-0">
                    <div className="p-2 bg-slate-50 rounded-lg shrink-0 border border-slate-100 mt-0.5 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
                      <BookOpen size={18} />
                    </div>
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                        <span className={cn("text-[9px] font-extrabold border px-2 py-0.5 rounded uppercase", getCompetencyBadgeColor(goal.competency))}>
                          {goal.competency}
                        </span>
                        <span className="text-[10px] bg-slate-100 border px-1.5 py-0.5 rounded text-slate-500 font-bold capitalize">{goal.status}</span>
                        <span className="text-[10px] text-slate-400 font-bold">Hạn chót: {goal.targetDate}</span>
                      </div>
                      <h4 className="text-xs font-extrabold text-slate-800 truncate group-hover:text-emerald-600 transition-colors">{goal.title}</h4>
                      <p className="text-[11px] text-slate-400 font-medium truncate max-w-md">{goal.description}</p>
                    </div>
                  </div>

                  {/* Actions & progress metrics */}
                  <div className="flex items-center space-x-4 pl-11 sm:pl-0 justify-between sm:justify-end shrink-0">
                    <div className="text-right space-y-1">
                      <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-wider">Tiến độ</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-black text-slate-700">{goal.progress}%</span>
                        <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200/30">
                          <div className="h-full bg-emerald-500" style={{ width: `${goal.progress}%` }} />
                        </div>
                      </div>
                      <span className="text-[10px] text-slate-500 font-semibold block">
                        Đã làm: {goal.actionPlans.filter(ap => ap.completed).length}/{goal.actionPlans.length} mục
                      </span>
                    </div>

                    <div className="flex items-center space-x-2 border-l border-slate-100 pl-3">
                      <img 
                        src={goal.mentorAvatar} 
                        alt={goal.mentorName} 
                        className="w-7 h-7 rounded-full shadow-sm"
                        title={`Cố vấn kèm cặp: ${goal.mentorName}`}
                      />
                      <button
                        onClick={(e) => handleDeleteGoal(goal.id, e)}
                        className="p-1.5 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded cursor-pointer transition-all"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}

            {filteredGoals.length === 0 && (
              <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-400">
                Không tìm thấy năng lực nào cần phát triển.
              </div>
            )}
          </div>

          {/* Right expanded panel details */}
          <div className="space-y-4">
            {selectedGoal ? (
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-5">
                <div className="border-b border-slate-100 pb-3 space-y-1">
                  <span className="text-[9px] text-emerald-600 font-black uppercase tracking-wider block">Chi tiết kế hoạch IDP</span>
                  <h3 className="text-xs font-black text-slate-800 leading-snug">{selectedGoal.title}</h3>
                  <p className="text-[11px] text-slate-400 font-medium leading-relaxed">{selectedGoal.description}</p>
                </div>

                {/* Mentor contact */}
                <div className="bg-slate-50 border border-slate-200/50 p-3 rounded-xl flex items-center space-x-3 text-xs">
                  <img src={selectedGoal.mentorAvatar} className="w-8 h-8 rounded-full shadow-inner" />
                  <div>
                    <span className="text-slate-400 font-semibold block text-[10px]">CỐ VẤN / CHỈ ĐẠO CHUYÊN MÔN:</span>
                    <span className="font-extrabold text-slate-700">{selectedGoal.mentorName}</span>
                  </div>
                </div>

                {/* Learning actions roadmap */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Hành trình hành động</span>
                    <span className="text-xs font-black text-emerald-600">{selectedGoal.progress}% Hoàn thành</span>
                  </div>

                  <div className="space-y-1.5">
                    {selectedGoal.actionPlans.map(plan => (
                      <div
                        key={plan.id}
                        onClick={() => handleToggleAction(selectedGoal.id, plan.id)}
                        className="flex items-start space-x-2 p-2 bg-slate-50/50 border border-slate-100 hover:border-emerald-200 rounded-xl cursor-pointer transition-colors"
                      >
                        <div className={cn(
                          "w-4 h-4 rounded border flex items-center justify-center shrink-0 mt-0.5",
                          plan.completed ? "bg-emerald-500 border-emerald-500 text-white" : "border-slate-300 bg-white"
                        )}>
                          {plan.completed && <Check size={10} />}
                        </div>
                        <div className="space-y-0.5 min-w-0">
                          <span className="text-[9px] bg-slate-200/80 px-1 py-0.1 rounded text-slate-500 font-bold uppercase mr-1">{plan.type}</span>
                          <span className={cn(
                            "text-[11px] font-semibold leading-tight",
                            plan.completed ? "line-through text-slate-400 font-medium" : "text-slate-700"
                          )}>
                            {plan.title}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Growth notes & Reflections logs */}
                <div className="pt-3 border-t border-slate-100 space-y-3">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Nhật ký tự rèn luyện ({selectedGoal.learningLogs.length})</span>
                  
                  <div className="space-y-2 max-h-36 overflow-y-auto">
                    {selectedGoal.learningLogs.map(log => (
                      <div key={log.id} className="p-2.5 bg-slate-50 border border-slate-100 rounded-lg text-[11px]">
                        <div className="flex justify-between items-center text-slate-400 mb-0.5 font-bold">
                          <span>{log.author}</span>
                          <span className="text-[9px]">{log.date}</span>
                        </div>
                        <p className="text-slate-600 leading-normal">"{log.content}"</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex space-x-1.5">
                    <input
                      type="text"
                      placeholder="Ghi nhận bài học tự rút ra hôm nay..."
                      value={logText}
                      onChange={(e) => setLogText(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleAddLog()}
                      className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-slate-200 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                    />
                    <button
                      onClick={handleAddLog}
                      className="px-3 py-1 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold rounded-xl shadow-md cursor-pointer"
                    >
                      Lưu
                    </button>
                  </div>
                </div>

              </div>
            ) : (
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-center space-y-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mx-auto text-emerald-500 border shadow-sm">
                  <UserCheck size={16} />
                </div>
                <h4 className="text-xs font-extrabold text-slate-800">Chọn một năng lực trọng tâm</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Để theo dõi chi tiết từng hành động rèn luyện cụ thể, liên hệ với giáo trình, cố vấn và thêm nhật ký tiến bộ cá nhân định kỳ hàng tuần.
                </p>
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}
