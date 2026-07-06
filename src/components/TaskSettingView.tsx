import React, { useState } from 'react';
import { 
  CheckSquare, 
  Plus, 
  Search, 
  Filter, 
  List, 
  Layers, 
  AlertCircle, 
  Clock, 
  User, 
  Check, 
  Trash2, 
  ArrowUpRight, 
  Target, 
  Bookmark, 
  Activity, 
  Calendar, 
  Sparkles,
  ChevronRight,
  UserCheck,
  AlertTriangle,
  Send,
  CornerDownRight
} from 'lucide-react';
import { cn } from '../lib/utils';

export type TaskStatus = 'Not Started' | 'In Progress' | 'In Review' | 'Completed';
export type TaskPriority = 'High' | 'Medium' | 'Low';

export interface SubTask {
  id: string;
  title: string;
  completed: boolean;
}

export interface TaskItem {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
  assigneeName: string;
  assigneeAvatar: string;
  linkedOkrName?: string;
  linkedKpiCode?: string;
  subTasks: SubTask[];
  comments: { id: string; author: string; text: string; date: string }[];
  progress: number; // calculated dynamically from subtasks or set directly
}

const INITIAL_TASKS: TaskItem[] = [
  {
    id: 'task-1',
    title: 'Xây dựng quy trình xử lý lỗi API khẩn cấp',
    description: 'Xác định các mức độ nghiêm trọng của sự cố, thiết lập kênh Slack cảnh báo tự động và phân vai trực ban kỹ thuật.',
    status: 'In Progress',
    priority: 'High',
    dueDate: '2026-07-15',
    assigneeName: 'David Tran',
    assigneeAvatar: 'https://i.pravatar.cc/150?u=david',
    linkedOkrName: 'Ra mắt ứng dụng di động phiên bản 3.0 đúng hạn',
    linkedKpiCode: 'KPI-ENG-03',
    subTasks: [
      { id: 'sub-1-1', title: 'Thiết lập webhook liên kết hệ thống giám sát vào Slack', completed: true },
      { id: 'sub-1-2', title: 'Soạn thảo văn bản quy trình trực sự cố 24/7', completed: false },
      { id: 'sub-1-3', title: 'Tập huấn giả định tình trạng sập server cho team dev', completed: false }
    ],
    comments: [
      { id: 'c-1', author: 'Roberto Canevari', text: 'Đây là công việc tối quan trọng để giữ cam kết SLA 99.9% với khách hàng.', date: '2026-07-04' }
    ],
    progress: 33
  },
  {
    id: 'task-2',
    title: 'Phát hành chiến dịch quảng cáo chuyển đổi trên Google Search',
    description: 'Thiết lập danh sách từ khóa tối ưu hóa, chuẩn bị các mẫu quảng cáo (Ad Copy) thu hút tệp khách hàng tìm kiếm dịch vụ vận chuyển.',
    status: 'In Progress',
    priority: 'High',
    dueDate: '2026-07-10',
    assigneeName: 'Alice Nguyen',
    assigneeAvatar: 'https://i.pravatar.cc/150?u=alice',
    linkedOkrName: 'Tăng trưởng doanh thu Quý 3 thêm 20%',
    linkedKpiCode: 'KPI-SLS-02',
    subTasks: [
      { id: 'sub-2-1', title: 'Nghiên cứu từ khóa đối thủ cạnh tranh bằng Semrush', completed: true },
      { id: 'sub-2-2', title: 'Viết nội dung tiêu đề và đoạn mô tả cho 3 nhóm quảng cáo', completed: true },
      { id: 'sub-2-3', title: 'Cài đặt ngân sách hàng ngày và tối ưu hóa đấu thầu (Smart Bidding)', completed: false }
    ],
    comments: [],
    progress: 66
  },
  {
    id: 'task-3',
    title: 'Khảo sát độ hài lòng của 100 khách hàng VIP',
    description: 'Gọi điện trực tiếp hoặc gửi thư điện tử phỏng vấn sâu để ghi nhận những rào cản lớn nhất khi họ tương tác trên ứng dụng.',
    status: 'Not Started',
    priority: 'Medium',
    dueDate: '2026-07-20',
    assigneeName: 'Elena Rostova',
    assigneeAvatar: 'https://i.pravatar.cc/150?u=elena',
    linkedKpiCode: 'KPI-OPS-04',
    subTasks: [
      { id: 'sub-3-1', title: 'Biên soạn bộ câu hỏi khảo sát ngắn (5 câu hỏi cốt lõi)', completed: false },
      { id: 'sub-3-2', title: 'Lọc danh sách 100 khách hàng có chi tiêu cao nhất trong quý', completed: false },
      { id: 'sub-3-3', title: 'Thực hiện khảo sát và tổng hợp báo cáo insight khách hàng', completed: false }
    ],
    comments: [],
    progress: 0
  },
  {
    id: 'task-4',
    title: 'Thiết lập chương trình Phúc lợi Sức khỏe cho nhân viên',
    description: 'Đàm phán với đối tác bảo hiểm sức khỏe quốc tế để cung cấp gói bảo hiểm mở rộng cho toàn bộ nhân sự chính thức.',
    status: 'Completed',
    priority: 'Low',
    dueDate: '2026-06-30',
    assigneeName: 'Minh Thư',
    assigneeAvatar: 'https://i.pravatar.cc/150?u=thu',
    linkedKpiCode: 'KPI-HR-05',
    subTasks: [
      { id: 'sub-4-1', title: 'Thu thập báo giá từ 3 công ty bảo hiểm hàng đầu', completed: true },
      { id: 'sub-4-2', title: 'Thống kê nhu cầu khám sức khỏe định kỳ của CBNV', completed: true },
      { id: 'sub-4-3', title: 'Trình duyệt hợp đồng và phát hành thẻ bảo hiểm mới', completed: true }
    ],
    comments: [
      { id: 'c-2', author: 'Minh Thư', text: 'CBNV rất hoan nghênh phúc lợi này, tỉ lệ khảo sát tích cực tăng vọt.', date: '2026-06-29' }
    ],
    progress: 100
  }
];

export function TaskSettingView({ cardOpacity }: { cardOpacity: number }) {
  const [tasks, setTasks] = useState<TaskItem[]>(INITIAL_TASKS);
  const [selectedTask, setSelectedTask] = useState<TaskItem | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'kanban'>('list');
  
  // Search and Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [priorityFilter, setPriorityFilter] = useState<string>('All');

  // New Task form state
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDesc, setNewTaskDesc] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState<TaskPriority>('Medium');
  const [newTaskStatus, setNewTaskStatus] = useState<TaskStatus>('Not Started');
  const [newTaskDueDate, setNewTaskDueDate] = useState(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);
  const [newTaskAssignee, setNewTaskAssignee] = useState('David Tran');
  const [newLinkedOkr, setNewLinkedOkr] = useState('');
  const [newLinkedKpi, setNewLinkedKpi] = useState('');
  const [tempSubTasks, setTempSubTasks] = useState<string[]>(['']);

  // Comment state
  const [commentText, setCommentText] = useState('');

  // Calculate and Update Task Progress from subtasks helper
  const updateTaskProgress = (task: TaskItem): TaskItem => {
    if (task.subTasks.length === 0) return task;
    const completedCount = task.subTasks.filter(st => st.completed).length;
    const progress = Math.round((completedCount / task.subTasks.length) * 100);
    const newStatus: TaskStatus = progress === 100 ? 'Completed' : task.status === 'Completed' ? 'In Progress' : task.status;
    return {
      ...task,
      progress,
      status: newStatus
    };
  };

  // Toggle Subtask Completion
  const handleToggleSubTask = (taskId: string, subTaskId: string) => {
    const updated = tasks.map(t => {
      if (t.id === taskId) {
        const updatedSubTasks = t.subTasks.map(st => 
          st.id === subTaskId ? { ...st, completed: !st.completed } : st
        );
        return updateTaskProgress({ ...t, subTasks: updatedSubTasks });
      }
      return t;
    });
    setTasks(updated);
    
    // Update active selected task panel details too
    if (selectedTask && selectedTask.id === taskId) {
      const found = updated.find(t => t.id === taskId);
      if (found) setSelectedTask(found);
    }
  };

  // Add Comment to Task
  const handleAddComment = () => {
    if (!selectedTask || !commentText.trim()) return;

    const newComment = {
      id: `comm-${Date.now()}`,
      author: 'Chuyên Gia Trải Nghiệm',
      text: commentText,
      date: new Date().toISOString().split('T')[0]
    };

    const updated = tasks.map(t => {
      if (t.id === selectedTask.id) {
        return {
          ...t,
          comments: [...t.comments, newComment]
        };
      }
      return t;
    });

    setTasks(updated);
    const updatedActive = updated.find(t => t.id === selectedTask.id);
    if (updatedActive) setSelectedTask(updatedActive);
    setCommentText('');
  };

  // Delete Task
  const handleDeleteTask = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Anh có chắc chắn muốn xóa công việc này khỏi hệ thống không? Dữ liệu này sẽ mất vĩnh viễn.')) {
      setTasks(tasks.filter(t => t.id !== id));
      if (selectedTask?.id === id) setSelectedTask(null);
    }
  };

  // Create Task Form Submit
  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const subTaskObjects = tempSubTasks
      .filter(st => st.trim() !== '')
      .map((st, idx) => ({
        id: `sub-${Date.now()}-${idx}`,
        title: st,
        completed: false
      }));

    const newTask: TaskItem = {
      id: `task-${Date.now()}`,
      title: newTaskTitle,
      description: newTaskDesc,
      status: newTaskStatus,
      priority: newTaskPriority,
      dueDate: newTaskDueDate,
      assigneeName: newTaskAssignee,
      assigneeAvatar: `https://i.pravatar.cc/150?u=${newTaskAssignee.split(' ')[0].toLowerCase()}`,
      linkedOkrName: newLinkedOkr || undefined,
      linkedKpiCode: newLinkedKpi || undefined,
      subTasks: subTaskObjects,
      comments: [],
      progress: 0
    };

    const finalTask = updateTaskProgress(newTask);
    setTasks([finalTask, ...tasks]);

    // Reset fields
    setNewTaskTitle('');
    setNewTaskDesc('');
    setNewTaskPriority('Medium');
    setNewTaskStatus('Not Started');
    setNewLinkedOkr('');
    setNewLinkedKpi('');
    setTempSubTasks(['']);
    setShowAddForm(false);
  };

  // Kanban status changing trigger
  const handleMoveStatus = (taskId: string, newStatus: TaskStatus) => {
    const updated = tasks.map(t => {
      if (t.id === taskId) {
        const isNowCompleted = newStatus === 'Completed';
        const updatedSubTasks = t.subTasks.map(st => ({
          ...st,
          completed: isNowCompleted ? true : st.completed
        }));
        return {
          ...t,
          status: newStatus,
          subTasks: updatedSubTasks,
          progress: isNowCompleted ? 100 : t.progress
        };
      }
      return t;
    });
    setTasks(updated);
    if (selectedTask?.id === taskId) {
      const found = updated.find(t => t.id === taskId);
      if (found) setSelectedTask(found);
    }
  };

  // Filters application
  const filteredTasks = tasks.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.assigneeName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || t.status === statusFilter;
    const matchesPriority = priorityFilter === 'All' || t.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  // Stats Counters
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'Completed').length;
  const inProgressTasks = tasks.filter(t => t.status === 'In Progress' || t.status === 'In Review').length;
  const highPriorityTasks = tasks.filter(t => t.priority === 'High').length;

  const getPriorityBadge = (priority: TaskPriority) => {
    switch (priority) {
      case 'High':
        return <span className="text-[9px] bg-rose-50 text-rose-600 border border-rose-200 px-2 py-0.5 rounded font-extrabold uppercase">Khẩn cấp</span>;
      case 'Medium':
        return <span className="text-[9px] bg-amber-50 text-amber-600 border border-amber-200 px-2 py-0.5 rounded font-extrabold uppercase">Trung bình</span>;
      case 'Low':
        return <span className="text-[9px] bg-slate-100 text-slate-500 border border-slate-200 px-2 py-0.5 rounded font-extrabold uppercase">Bình thường</span>;
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#f8fafc]/90 overflow-hidden select-none">
      
      {/* HEADER SECTION */}
      <div className="bg-white border-b border-slate-200/80 px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0 shrink-0">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-gradient-to-tr from-indigo-500 to-blue-600 rounded-xl text-white shadow-md shadow-indigo-500/20">
            <CheckSquare size={22} />
          </div>
          <div>
            <h1 className="text-lg font-extrabold text-slate-800 tracking-tight flex items-center space-x-1.5">
              <span>Hệ thống Quản trị Công việc Phát triển</span>
              <span className="text-[10px] bg-indigo-500 text-white font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                Profit.co Tasks
              </span>
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              Chuyển đổi chiến lược OKRs thành các hành động cụ thể. Đảm bảo 100% công việc bám đuổi các mốc then chốt.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {/* View Toggle */}
          <div className="bg-slate-100 p-1 rounded-xl border border-slate-200/50 flex">
            <button 
              onClick={() => setViewMode('list')}
              className={cn(
                "p-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center space-x-1",
                viewMode === 'list' ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
              )}
              title="Xem dạng Danh sách"
            >
              <List size={14} />
              <span className="hidden sm:inline">Danh sách</span>
            </button>
            <button 
              onClick={() => setViewMode('kanban')}
              className={cn(
                "p-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center space-x-1",
                viewMode === 'kanban' ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
              )}
              title="Xem dạng bảng Kanban"
            >
              <Layers size={14} />
              <span className="hidden sm:inline">Bảng Kanban</span>
            </button>
          </div>

          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-indigo-500/10 flex items-center space-x-1.5 cursor-pointer"
          >
            <Plus size={14} />
            <span>Giao việc mới</span>
          </button>
        </div>
      </div>

      {/* CORE VIEW SCROLLER */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">

        {/* TOP STATUS OVERVIEW */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl border border-slate-200/60 p-4 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider block">Tổng việc giao</span>
              <span className="text-2xl font-black text-slate-800">{totalTasks}</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg text-slate-500"><CheckSquare size={18} /></div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200/60 p-4 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] text-emerald-500 font-extrabold uppercase tracking-wider block">Đã hoàn thành</span>
              <span className="text-2xl font-black text-emerald-600">{completedTasks}</span>
            </div>
            <div className="p-3 bg-emerald-50 rounded-lg text-emerald-500"><Check size={18} /></div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200/60 p-4 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] text-blue-500 font-extrabold uppercase tracking-wider block">Đang triển khai</span>
              <span className="text-2xl font-black text-blue-600">{inProgressTasks}</span>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg text-blue-500"><Clock size={18} /></div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200/60 p-4 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] text-rose-500 font-extrabold uppercase tracking-wider block">Độ ưu tiên cao</span>
              <span className="text-2xl font-black text-rose-600">{highPriorityTasks}</span>
            </div>
            <div className="p-3 bg-rose-50 rounded-lg text-rose-500"><AlertCircle size={18} /></div>
          </div>
        </div>

        {/* ADD FORM POPUP */}
        {showAddForm && (
          <div className="bg-white border border-slate-200 shadow-xl rounded-2xl p-6 space-y-4 max-w-4xl mx-auto transition-all animate-fade-in">
            <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
              <h3 className="text-sm font-extrabold text-slate-800 flex items-center space-x-1.5">
                <Sparkles size={16} className="text-amber-500 animate-pulse" />
                <span>Khai báo Công việc Vận hành / Dự án Phát triển mới</span>
              </h3>
              <button 
                onClick={() => setShowAddForm(false)}
                className="text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                Đóng
              </button>
            </div>

            <form onSubmit={handleCreateTask} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2 space-y-1.5">
                  <label className="text-xs font-bold text-slate-600">Tiêu đề Công việc *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ví dụ: Thiết kế bộ banner truyền thông chiến dịch thương hiệu"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    className="w-full px-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600">Người phụ trách *</label>
                  <select
                    value={newTaskAssignee}
                    onChange={(e) => setNewTaskAssignee(e.target.value)}
                    className="w-full px-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none"
                  >
                    <option value="David Tran">David Tran (Kỹ thuật)</option>
                    <option value="Alice Nguyen">Alice Nguyen (Kinh doanh)</option>
                    <option value="Elena Rostova">Elena Rostova (Vận hành)</option>
                    <option value="Minh Thư">Minh Thư (Nhân sự)</option>
                    <option value="Roberto Canevari">Roberto Canevari (CEO)</option>
                  </select>
                </div>

                <div className="md:col-span-3 space-y-1.5">
                  <label className="text-xs font-bold text-slate-600">Mô tả công việc (Mục tiêu, cách triển khai)</label>
                  <textarea
                    placeholder="Viết hướng dẫn, tài liệu tham khảo hoặc kết quả đầu ra kỳ vọng..."
                    value={newTaskDesc}
                    onChange={(e) => setNewTaskDesc(e.target.value)}
                    className="w-full px-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none min-h-[50px]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600">Mức độ Khẩn cấp</label>
                  <select
                    value={newTaskPriority}
                    onChange={(e: any) => setNewTaskPriority(e.target.value)}
                    className="w-full px-4 py-2 text-xs rounded-xl border border-slate-200"
                  >
                    <option value="High">Cao (Khẩn cấp)</option>
                    <option value="Medium">Trung bình</option>
                    <option value="Low">Thấp (Bình thường)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600">Thời hạn hoàn thành (Due Date)</label>
                  <input
                    type="date"
                    value={newTaskDueDate}
                    onChange={(e) => setNewTaskDueDate(e.target.value)}
                    className="w-full px-4 py-2 text-xs rounded-xl border border-slate-200"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600">Trạng thái ban đầu</label>
                  <select
                    value={newTaskStatus}
                    onChange={(e: any) => setNewTaskStatus(e.target.value)}
                    className="w-full px-4 py-2 text-xs rounded-xl border border-slate-200"
                  >
                    <option value="Not Started">Chưa bắt đầu</option>
                    <option value="In Progress">Đang làm</option>
                    <option value="In Review">Đang kiểm duyệt</option>
                  </select>
                </div>

                <div className="md:col-span-2 space-y-1.5">
                  <label className="text-xs font-bold text-slate-600">Liên thông Mục tiêu OKR</label>
                  <input
                    type="text"
                    placeholder="Ví dụ: Tăng trưởng doanh thu Quý 3 thêm 20%"
                    value={newLinkedOkr}
                    onChange={(e) => setNewLinkedOkr(e.target.value)}
                    className="w-full px-4 py-2 text-xs rounded-xl border border-slate-200"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600">Liên thông Chỉ số KPI</label>
                  <input
                    type="text"
                    placeholder="Ví dụ: KPI-SLS-02"
                    value={newLinkedKpi}
                    onChange={(e) => setNewLinkedKpi(e.target.value)}
                    className="w-full px-4 py-2 text-xs rounded-xl border border-slate-200 uppercase"
                  />
                </div>
              </div>

              {/* Subtasks inputs list */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600 block">Danh mục công việc con cần tích (Checklist)</label>
                {tempSubTasks.map((st, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      placeholder={`Đầu việc con #${index + 1}`}
                      value={st}
                      onChange={(e) => {
                        const copy = [...tempSubTasks];
                        copy[index] = e.target.value;
                        setTempSubTasks(copy);
                      }}
                      className="flex-1 px-4 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none"
                    />
                    {tempSubTasks.length > 1 && (
                      <button
                        type="button"
                        onClick={() => setTempSubTasks(tempSubTasks.filter((_, idx) => idx !== index))}
                        className="p-1.5 text-rose-500 hover:bg-rose-50 rounded"
                      >
                        Xóa
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => setTempSubTasks([...tempSubTasks, ''])}
                  className="text-[11px] text-indigo-500 font-bold hover:text-indigo-600 flex items-center space-x-1"
                >
                  <Plus size={12} />
                  <span>Thêm đầu việc con</span>
                </button>
              </div>

              <div className="pt-4 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-50 cursor-pointer"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-bold rounded-xl shadow-md cursor-pointer"
                >
                  Giao việc ngay
                </button>
              </div>
            </form>
          </div>
        )}

        {/* SEARCH & FILTERS FOR TASKS */}
        <div className="bg-white rounded-xl border border-slate-200/60 p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-sm">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Tìm kiếm đầu việc, mô tả hoặc người phụ trách..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50/50"
            />
          </div>

          <div className="flex items-center space-x-2 flex-wrap gap-y-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="All">Tất cả trạng thái</option>
              <option value="Not Started">Chưa bắt đầu</option>
              <option value="In Progress">Đang tiến hành</option>
              <option value="In Review">Đang duyệt</option>
              <option value="Completed">Đã hoàn thành</option>
            </select>

            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="All">Tất cả độ ưu tiên</option>
              <option value="High">Khẩn cấp (High)</option>
              <option value="Medium">Trung bình (Medium)</option>
              <option value="Low">Bình thường (Low)</option>
            </select>
          </div>
        </div>

        {/* MAIN DISPLAY AREA: LIST VIEW */}
        {viewMode === 'list' && (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
            
            {/* Left list table */}
            <div className="xl:col-span-2 space-y-3">
              {filteredTasks.map(task => {
                const isSelected = selectedTask?.id === task.id;
                const doneSubtasks = task.subTasks.filter(st => st.completed).length;

                return (
                  <div
                    key={task.id}
                    onClick={() => setSelectedTask(task)}
                    className={cn(
                      "bg-white rounded-xl border p-4 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 group",
                      isSelected ? "border-indigo-500 ring-2 ring-indigo-500/10" : "border-slate-200/70"
                    )}
                  >
                    <div className="flex items-start space-x-3 flex-1 min-w-0">
                      <div className="p-2 bg-slate-50 rounded-lg shrink-0 mt-0.5 border border-slate-100 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                        <CheckSquare size={18} />
                      </div>
                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                          {getPriorityBadge(task.priority)}
                          <span className="text-[10px] bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded text-slate-500 font-bold">{task.status}</span>
                          <span className="text-[10px] text-slate-400 font-semibold flex items-center space-x-1">
                            <Calendar size={11} />
                            <span>Hạn: {task.dueDate}</span>
                          </span>
                        </div>
                        <h4 className="text-xs font-extrabold text-slate-800 group-hover:text-indigo-600 transition-colors truncate">{task.title}</h4>
                        <p className="text-[11px] text-slate-400 font-medium truncate max-w-md">{task.description}</p>
                        
                        {(task.linkedOkrName || task.linkedKpiCode) && (
                          <div className="flex items-center space-x-2 flex-wrap text-[10px] font-bold pt-1">
                            {task.linkedOkrName && (
                              <span className="text-blue-600 flex items-center space-x-1 bg-blue-50 px-1.5 py-0.5 rounded">
                                <Target size={10} />
                                <span className="truncate max-w-[150px]">{task.linkedOkrName}</span>
                              </span>
                            )}
                            {task.linkedKpiCode && (
                              <span className="text-cyan-700 flex items-center space-x-1 bg-cyan-50 px-1.5 py-0.5 rounded uppercase">
                                <Activity size={10} />
                                <span>{task.linkedKpiCode}</span>
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 pl-11 md:pl-0 justify-between md:justify-end shrink-0">
                      
                      {/* Subtasks metrics */}
                      <div className="text-right space-y-1">
                        <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-wider">Việc con</span>
                        <p className="text-xs font-black text-slate-700">{doneSubtasks}/{task.subTasks.length}</p>
                        <div className="w-16 h-1 bg-slate-100 rounded-full overflow-hidden border border-slate-200/50">
                          <div 
                            className="h-full bg-indigo-500" 
                            style={{ width: `${task.progress}%` }}
                          />
                        </div>
                      </div>

                      {/* Avatar assignee */}
                      <div className="flex items-center space-x-2 border-l border-slate-100 pl-3">
                        <img 
                          src={task.assigneeAvatar} 
                          alt={task.assigneeName}
                          className="w-7 h-7 rounded-full ring-2 ring-white shadow-sm"
                          title={`Phụ trách: ${task.assigneeName}`}
                        />
                        <button
                          onClick={(e) => handleDeleteTask(task.id, e)}
                          className="p-1.5 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded transition-all cursor-pointer"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>

                    </div>
                  </div>
                );
              })}

              {filteredTasks.length === 0 && (
                <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center space-y-2">
                  <p className="text-xs text-slate-400">Không tìm thấy công việc nào phù hợp bộ lọc.</p>
                </div>
              )}
            </div>

            {/* Right details column */}
            <div className="space-y-4">
              {selectedTask ? (
                <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-5">
                  <div className="border-b border-slate-100 pb-3 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-indigo-500 font-black tracking-widest uppercase">Chi tiết công việc</span>
                      {getPriorityBadge(selectedTask.priority)}
                    </div>
                    <h3 className="text-xs font-black text-slate-800 leading-snug">{selectedTask.title}</h3>
                    <p className="text-[11px] text-slate-400 font-medium leading-relaxed">{selectedTask.description}</p>
                  </div>

                  {/* Assignee & Dates */}
                  <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-3 rounded-xl border border-slate-200/50">
                    <div>
                      <span className="text-slate-400 font-semibold block">Giao cho:</span>
                      <div className="flex items-center space-x-1.5 mt-1">
                        <img src={selectedTask.assigneeAvatar} className="w-5 h-5 rounded-full" />
                        <span className="font-bold text-slate-700">{selectedTask.assigneeName}</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-slate-400 font-semibold block">Thời hạn:</span>
                      <span className="font-bold text-slate-700 block mt-1 flex items-center space-x-1">
                        <Clock size={12} className="text-slate-400" />
                        <span>{selectedTask.dueDate}</span>
                      </span>
                    </div>
                  </div>

                  {/* Change Status Buttons inside Details */}
                  <div className="space-y-2">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Cập nhật nhanh tiến độ</span>
                    <div className="grid grid-cols-2 gap-1.5">
                      {(['Not Started', 'In Progress', 'In Review', 'Completed'] as TaskStatus[]).map(st => (
                        <button
                          key={st}
                          onClick={() => handleMoveStatus(selectedTask.id, st)}
                          className={cn(
                            "px-2 py-1.5 rounded-lg text-[10px] font-bold text-center border cursor-pointer transition-all",
                            selectedTask.status === st 
                              ? "bg-indigo-500 text-white border-indigo-500" 
                              : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                          )}
                        >
                          {st === 'Not Started' && 'Chưa bắt đầu'}
                          {st === 'In Progress' && 'Đang làm'}
                          {st === 'In Review' && 'Kiểm duyệt'}
                          {st === 'Completed' && 'Hoàn thành'}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Subtasks checklist */}
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Đầu việc con ({selectedTask.subTasks.length})</span>
                      <span className="text-xs font-extrabold text-indigo-600">{selectedTask.progress}%</span>
                    </div>
                    <div className="space-y-1.5">
                      {selectedTask.subTasks.map(st => (
                        <div 
                          key={st.id}
                          onClick={() => handleToggleSubTask(selectedTask.id, st.id)}
                          className="flex items-center space-x-2 p-2 bg-slate-50/50 border border-slate-100 hover:border-indigo-200 rounded-xl transition-all cursor-pointer"
                        >
                          <div className={cn(
                            "w-4 h-4 rounded border flex items-center justify-center transition-colors shrink-0",
                            st.completed ? "bg-emerald-500 border-emerald-500 text-white" : "border-slate-300 bg-white"
                          )}>
                            {st.completed && <Check size={10} />}
                          </div>
                          <span className={cn(
                            "text-[11px] font-medium leading-tight",
                            st.completed ? "line-through text-slate-400" : "text-slate-600"
                          )}>
                            {st.title}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Comments Feed */}
                  <div className="space-y-3 pt-3 border-t border-slate-100">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Thảo luận công việc ({selectedTask.comments.length})</span>
                    
                    <div className="space-y-2 max-h-36 overflow-y-auto">
                      {selectedTask.comments.map(c => (
                        <div key={c.id} className="p-2.5 bg-slate-50 rounded-lg text-[11px]">
                          <div className="flex justify-between items-center font-bold text-slate-700 mb-0.5">
                            <span>{c.author}</span>
                            <span className="text-[9px] text-slate-400">{c.date}</span>
                          </div>
                          <p className="text-slate-600 leading-normal">"{c.text}"</p>
                        </div>
                      ))}
                    </div>

                    <div className="flex space-x-1.5">
                      <input
                        type="text"
                        placeholder="Viết phản hồi công việc..."
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
                        className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      />
                      <button
                        onClick={handleAddComment}
                        className="p-1.5 bg-indigo-500 text-white rounded-xl hover:bg-indigo-600 cursor-pointer"
                      >
                        <Send size={12} />
                      </button>
                    </div>
                  </div>

                </div>
              ) : (
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-center space-y-3">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mx-auto text-indigo-500 shadow-sm border border-slate-100">
                    <UserCheck size={16} />
                  </div>
                  <h4 className="text-xs font-extrabold text-slate-800">Chọn đầu việc để tương tác</h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Được quyền tích chọn hoàn thành các đầu việc con, thay đổi người bàn giao, xem liên kết OKR/KPI và thảo luận chi tiết với đội ngũ.
                  </p>
                </div>
              )}
            </div>

          </div>
        )}

        {/* DISPLAY AREA: KANBAN BOARD VIEW */}
        {viewMode === 'kanban' && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start h-full">
            {(['Not Started', 'In Progress', 'In Review', 'Completed'] as TaskStatus[]).map(colStatus => {
              const colTasks = filteredTasks.filter(t => t.status === colStatus);
              
              const getColColor = (status: TaskStatus) => {
                switch (status) {
                  case 'Not Started': return 'border-t-slate-400 bg-slate-100/40';
                  case 'In Progress': return 'border-t-blue-500 bg-blue-50/10';
                  case 'In Review': return 'border-t-amber-500 bg-amber-50/10';
                  case 'Completed': return 'border-t-emerald-500 bg-emerald-50/10';
                }
              };

              const getColTitle = (status: TaskStatus) => {
                switch (status) {
                  case 'Not Started': return 'Chưa bắt đầu';
                  case 'In Progress': return 'Đang triển khai';
                  case 'In Review': return 'Đang kiểm duyệt';
                  case 'Completed': return 'Đã hoàn thành';
                }
              };

              return (
                <div 
                  key={colStatus}
                  className={cn(
                    "rounded-xl border border-slate-200 border-t-4 p-3 space-y-3 min-h-[400px] shadow-sm",
                    getColColor(colStatus)
                  )}
                >
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="text-xs font-black text-slate-700">{getColTitle(colStatus)}</span>
                    <span className="text-[10px] bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full font-bold">
                      {colTasks.length}
                    </span>
                  </div>

                  <div className="space-y-3">
                    {colTasks.map(task => (
                      <div
                        key={task.id}
                        onClick={() => setSelectedTask(task)}
                        className="bg-white rounded-xl border border-slate-200/60 p-3.5 shadow-sm hover:shadow-md transition-all cursor-pointer space-y-3 group"
                      >
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between">
                            {getPriorityBadge(task.priority)}
                            <span className="text-[9px] text-slate-400 font-semibold">{task.dueDate}</span>
                          </div>
                          <h4 className="text-xs font-bold text-slate-800 leading-snug group-hover:text-indigo-600 transition-colors">
                            {task.title}
                          </h4>
                        </div>

                        {/* Progress Bar & Subtask counter */}
                        <div className="space-y-1">
                          <div className="flex justify-between items-center text-[9px] text-slate-400 font-bold">
                            <span>Đầu việc con</span>
                            <span>{task.subTasks.filter(st => st.completed).length}/{task.subTasks.length}</span>
                          </div>
                          <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-indigo-500" style={{ width: `${task.progress}%` }} />
                          </div>
                        </div>

                        {/* Footer card */}
                        <div className="flex items-center justify-between pt-1 border-t border-slate-50">
                          {task.linkedKpiCode ? (
                            <span className="text-[9px] text-cyan-700 bg-cyan-50 px-1 rounded uppercase font-bold">{task.linkedKpiCode}</span>
                          ) : <div />}
                          
                          <div className="flex items-center space-x-2">
                            {/* Directional control to change columns easily via click */}
                            <select
                              value={task.status}
                              onClick={(e) => e.stopPropagation()}
                              onChange={(e) => handleMoveStatus(task.id, e.target.value as TaskStatus)}
                              className="text-[9px] font-bold border border-slate-200 rounded px-1.5 py-0.5 bg-slate-50 focus:outline-none cursor-pointer"
                            >
                              <option value="Not Started">Chưa bắt đầu</option>
                              <option value="In Progress">Đang làm</option>
                              <option value="In Review">Kiểm duyệt</option>
                              <option value="Completed">Hoàn thành</option>
                            </select>

                            <img 
                              src={task.assigneeAvatar} 
                              alt={task.assigneeName} 
                              className="w-5 h-5 rounded-full ring-1 ring-white"
                              title={task.assigneeName}
                            />
                          </div>
                        </div>
                      </div>
                    ))}

                    {colTasks.length === 0 && (
                      <div className="text-center py-8 text-[10px] text-slate-400 italic">
                        Trống
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

    </div>
  );
}
