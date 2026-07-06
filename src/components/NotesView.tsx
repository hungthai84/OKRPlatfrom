import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Search, 
  Plus, 
  Lock, 
  Globe, 
  Tag, 
  Calendar, 
  Trash2, 
  Edit, 
  Sparkles, 
  MessageSquare, 
  Briefcase,
  CheckCircle,
  Clock,
  User,
  Heart,
  UserCheck
} from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export interface PerformanceNote {
  id: string;
  title: string;
  content: string;
  category: 'Goal' | 'KPI' | 'Task' | 'Reflection' | 'General';
  isPrivate: boolean;
  createdAt: string;
  authorName: string;
  authorAvatar: string;
  likes: number;
}

const INITIAL_NOTES: PerformanceNote[] = [
  {
    id: 'n-1',
    title: 'Đã hoàn thành thiết lập Auto-Failover cho AWS Multi-Region',
    content: 'Đã test thành công kịch bản rủi ro đánh sập cụm Cloud chính tại Singapore. Cụm dự phòng tại Tokyo tự động kích hoạt định tuyến DNS Route 53 chỉ trong vòng 8 giây. Tiếp theo cần hướng dẫn các thành viên DevOps nắm quy trình vận hành này.',
    category: 'KPI',
    isPrivate: false,
    createdAt: 'Hôm qua, 14:30',
    authorName: 'Nguyễn Văn A',
    authorAvatar: 'https://i.pravatar.cc/150?u=architect',
    likes: 8
  },
  {
    id: 'n-2',
    title: 'Ý tưởng tối ưu quy trình Check-in OKR hàng tuần',
    content: 'Thấy quy trình cập nhật tiến độ bằng cơm đang mất nhiều thời gian. Tuần sau sẽ họp với team để bàn luận giải pháp tích hợp tự động Slack/Teams API trực tiếp với hệ thống quản lý mục tiêu của công ty.',
    category: 'Goal',
    isPrivate: false,
    createdAt: '03/07/2026, 09:15',
    authorName: 'Roberto Canevari',
    authorAvatar: 'https://i.pravatar.cc/150?u=roberto',
    likes: 12
  },
  {
    id: 'n-3',
    title: 'Nhật ký cá nhân: Kế hoạch tham gia khóa học AWS Certified Security',
    content: 'Mục tiêu tự học thêm kiến thức bảo mật chuyên sâu. Sẽ đăng ký thi chứng chỉ quốc tế vào cuối tháng 8 để bổ trợ trực tiếp cho các dự án an ninh mạng sắp tới của Power Service.',
    category: 'Reflection',
    isPrivate: true,
    createdAt: '30/06/2026, 17:00',
    authorName: 'David Tran',
    authorAvatar: 'https://i.pravatar.cc/150?u=david',
    likes: 0
  }
];

export function NotesView({ cardOpacity }: { cardOpacity: number }) {
  const [notes, setNotes] = useState<PerformanceNote[]>(() => {
    const saved = localStorage.getItem('power_performance_notes');
    return saved ? JSON.parse(saved) : INITIAL_NOTES;
  });

  const [activeSubTab, setActiveSubTab] = useState<'all' | 'my-notes' | 'shared'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  
  // Create Note Form State
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState<PerformanceNote['category']>('General');
  const [newIsPrivate, setNewIsPrivate] = useState(false);

  // Sync with LocalStorage
  useEffect(() => {
    localStorage.setItem('power_performance_notes', JSON.stringify(notes));
  }, [notes]);

  const getCategoryColor = (cat: PerformanceNote['category']) => {
    switch (cat) {
      case 'Goal': return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'KPI': return 'bg-purple-50 text-purple-600 border-purple-100';
      case 'Task': return 'bg-sky-50 text-sky-600 border-sky-100';
      case 'Reflection': return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'General': return 'bg-slate-50 text-slate-600 border-slate-100';
    }
  };

  const getCategoryLabel = (cat: PerformanceNote['category']) => {
    switch (cat) {
      case 'Goal': return 'Mục tiêu OKR';
      case 'KPI': return 'Chỉ số KPI';
      case 'Task': return 'Công việc';
      case 'Reflection': return 'Tự suy ngẫm';
      case 'General': return 'Chung';
    }
  };

  const handleAddNoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const newNote: PerformanceNote = {
      id: `n-${Date.now()}`,
      title: newTitle,
      content: newContent,
      category: newCategory,
      isPrivate: newIsPrivate,
      createdAt: 'Vừa xong',
      authorName: 'Roberto Canevari (Tôi)',
      authorAvatar: 'https://i.pravatar.cc/150?u=roberto',
      likes: 0
    };

    setNotes([newNote, ...notes]);
    
    // Reset form
    setNewTitle('');
    setNewContent('');
    setNewCategory('General');
    setNewIsPrivate(false);
    setShowAddModal(false);
  };

  const handleDeleteNote = (id: string) => {
    if (confirm('Anh có chắc muốn xóa ghi chú này không?')) {
      setNotes(notes.filter(n => n.id !== id));
    }
  };

  const handleLikeNote = (id: string) => {
    setNotes(notes.map(n => {
      if (n.id === id) {
        return { ...n, likes: n.likes + 1 };
      }
      return n;
    }));
  };

  const filteredNotes = notes.filter(n => {
    const matchesSearch = n.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          n.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          n.authorName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === 'All' || n.category === categoryFilter;
    
    const matchesTab = activeSubTab === 'all' ? true :
                       activeSubTab === 'my-notes' ? n.isPrivate || n.authorName.includes('(Tôi)') :
                       !n.isPrivate; // shared

    return matchesSearch && matchesCategory && matchesTab;
  });

  const cardStyle = { 
    backgroundColor: 'rgba(255, 255, 255, 0.45)',
    backdropFilter: 'blur(12px)'
  };

  return (
    <div className="flex-1 overflow-auto p-6 space-y-6 flex flex-col select-none">
      
      {/* 1. HEADER GRADIENT BANNER */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-800 to-slate-900 rounded-[10px] shadow-lg p-6 text-white relative overflow-hidden transition-all duration-300 shrink-0">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 z-10 relative">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center animate-pulse">
              <FileText size={26} className="text-orange-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Ghi chú & Nhật ký Hiệu suất</h2>
              <p className="text-xs text-blue-200">
                Ghi chép nhanh các mốc suy ngẫm, hoạt động check-in và tài liệu phản hồi hiệu suất giống Profit.co.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 flex-wrap">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60" size={14} />
              <input
                type="text"
                placeholder="Tìm ghi chú, nội dung..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 pr-4 py-1.5 text-xs bg-white/10 hover:bg-white/15 focus:bg-white/20 border border-white/20 rounded-lg focus:outline-none text-white placeholder-white/60 w-[200px] font-medium transition-all"
              />
            </div>

            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2.5 rounded-lg text-xs font-bold shadow-md hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Tạo ghi chú mới</span>
            </button>
          </div>
        </div>

        {/* SUB NAVIGATION TABS */}
        <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex space-x-6 text-sm font-semibold">
            <button 
              onClick={() => setActiveSubTab('all')}
              className={cn(
                "pb-1 border-b-2 cursor-pointer transition-all",
                activeSubTab === 'all' ? "border-orange-500 text-white font-bold" : "border-transparent text-gray-400 hover:text-white"
              )}
            >
              Tất cả ghi chú ({notes.length})
            </button>
            <button 
              onClick={() => setActiveSubTab('my-notes')}
              className={cn(
                "pb-1 border-b-2 cursor-pointer transition-all",
                activeSubTab === 'my-notes' ? "border-orange-500 text-white font-bold" : "border-transparent text-gray-400 hover:text-white"
              )}
            >
              Cá nhân tôi
            </button>
            <button 
              onClick={() => setActiveSubTab('shared')}
              className={cn(
                "pb-1 border-b-2 cursor-pointer transition-all",
                activeSubTab === 'shared' ? "border-orange-500 text-white font-bold" : "border-transparent text-gray-400 hover:text-white"
              )}
            >
              Chia sẻ chung
            </button>
          </div>
        </div>
      </div>

      {/* 2. MAIN SECTION WITH CATEGORIES FILTER & NOTES GRID */}
      <div className="flex flex-col md:flex-row gap-6 flex-1 items-start">
        
        {/* Left Side: Filter Sidebar */}
        <div style={cardStyle} className="w-full md:w-56 shrink-0 rounded-[10px] border border-slate-200/60 p-4 space-y-4 shadow-sm">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Phân loại danh mục</span>
          </div>
          <div className="flex flex-col space-y-1 text-xs">
            {['All', 'Goal', 'KPI', 'Task', 'Reflection', 'General'].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={cn(
                  "flex items-center justify-between px-2.5 py-2 rounded-lg font-bold text-left cursor-pointer transition-all",
                  categoryFilter === cat 
                    ? "bg-indigo-600 text-white shadow-sm" 
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-800"
                )}
              >
                <span>{cat === 'All' ? 'Tất cả danh mục' : getCategoryLabel(cat as PerformanceNote['category'])}</span>
                <span className={cn(
                  "text-[9px] px-1.5 py-0.5 rounded-full",
                  categoryFilter === cat ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
                )}>
                  {cat === 'All' 
                    ? notes.length 
                    : notes.filter(n => n.category === cat).length
                  }
                </span>
              </button>
            ))}
          </div>

          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1.5 text-[10px] leading-relaxed text-slate-500">
            <div className="flex items-center space-x-1.5 font-bold text-slate-600">
              <Sparkles size={12} className="text-orange-500 animate-pulse" />
              <span>Ghi chép thông minh</span>
            </div>
            <p>
              Nhật ký hiệu suất giúp hỗ trợ buổi đánh giá cuối năm (Performance Review) minh bạch, cung cấp dẫn chứng kết quả cụ thể.
            </p>
          </div>
        </div>

        {/* Right Side: Notes Feed Grid */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          <AnimatePresence mode="popLayout">
            {filteredNotes.map((note) => (
              <motion.div
                key={note.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                style={cardStyle}
                className="rounded-[10px] border border-slate-200/60 p-5 shadow-sm flex flex-col justify-between space-y-4 relative"
              >
                {/* Note content */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className={cn("px-2 py-0.5 rounded-full border text-[9px] font-black uppercase tracking-wider", getCategoryColor(note.category))}>
                      {getCategoryLabel(note.category)}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium flex items-center space-x-1">
                      <Calendar size={11} />
                      <span>{note.createdAt}</span>
                    </span>
                  </div>

                  <h3 className="text-sm font-black text-slate-800">{note.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-medium line-clamp-4 whitespace-pre-line">
                    {note.content}
                  </p>
                </div>

                {/* Footer details */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
                  <div className="flex items-center space-x-2">
                    <img src={note.authorAvatar} alt={note.authorName} className="w-6 h-6 rounded-full object-cover border border-slate-200" />
                    <span className="font-extrabold text-slate-600 text-[11px]">{note.authorName}</span>
                  </div>

                  <div className="flex items-center space-x-2 shrink-0">
                    {note.isPrivate ? (
                      <span className="flex items-center space-x-1 text-[10px] text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-100 font-bold">
                        <Lock size={10} />
                        <span>Riêng tư</span>
                      </span>
                    ) : (
                      <span className="flex items-center space-x-1 text-[10px] text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-100 font-bold">
                        <Globe size={10} />
                        <span>Chia sẻ</span>
                      </span>
                    )}

                    {!note.isPrivate && (
                      <button 
                        onClick={() => handleLikeNote(note.id)}
                        className="p-1 hover:bg-slate-100 rounded text-rose-500 hover:text-rose-600 flex items-center space-x-0.5 cursor-pointer font-bold text-[10px]"
                      >
                        <Heart size={12} className="fill-rose-500" />
                        <span>{note.likes}</span>
                      </button>
                    )}

                    <button
                      onClick={() => handleDeleteNote(note.id)}
                      className="p-1 hover:bg-rose-50 rounded text-slate-400 hover:text-rose-600 cursor-pointer transition-colors"
                      title="Xóa ghi chú"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}

            {filteredNotes.length === 0 && (
              <div className="col-span-full py-16 text-center space-y-3">
                <p className="text-sm font-bold text-slate-400">Không tìm thấy ghi chú nào phù hợp.</p>
                <button 
                  onClick={() => setShowAddModal(true)}
                  className="px-4 py-2 bg-indigo-600 text-white font-black text-xs rounded-xl shadow-md cursor-pointer hover:bg-indigo-700 transition-all"
                >
                  Tạo ghi chú đầu tiên ngay
                </button>
              </div>
            )}
          </AnimatePresence>
        </div>

      </div>

      {/* 3. ADD NOTE MODAL */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddModal(false)}
              className="absolute inset-0 bg-slate-900"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl w-full max-w-lg shadow-2xl z-10 overflow-hidden border border-slate-200"
            >
              <div className="bg-slate-50 p-5 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FileText className="text-indigo-600" size={18} />
                  <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">Thêm ghi chú nhật ký mới</h3>
                </div>
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleAddNoteSubmit} className="p-5 space-y-4 text-xs">
                {/* Title */}
                <div className="space-y-1.5">
                  <label className="font-extrabold text-slate-600">Tiêu đề ghi chú *</label>
                  <input
                    type="text"
                    required
                    placeholder="Nhập tiêu đề hoặc mốc sự kiện quan trọng..."
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 font-medium text-slate-700"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Category */}
                  <div className="space-y-1.5">
                    <label className="font-extrabold text-slate-600">Liên kết mục tiêu/chỉ số</label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value as PerformanceNote['category'])}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 font-bold text-slate-700"
                    >
                      <option value="General">Chung (Không liên kết)</option>
                      <option value="Goal">Liên kết Mục tiêu OKR</option>
                      <option value="KPI">Liên kết Chỉ số KPI</option>
                      <option value="Task">Liên kết Công việc</option>
                      <option value="Reflection">Tự kiểm điểm & Học tập</option>
                    </select>
                  </div>

                  {/* Private vs Shared */}
                  <div className="space-y-1.5">
                    <label className="font-extrabold text-slate-600">Phạm vi chia sẻ</label>
                    <select
                      value={newIsPrivate ? 'private' : 'shared'}
                      onChange={(e) => setNewIsPrivate(e.target.value === 'private')}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 font-bold text-slate-700"
                    >
                      <option value="shared">Chia sẻ công khai với Đồng nghiệp</option>
                      <option value="private">Riêng tư (Chỉ bản thân & Quản lý nhìn thấy)</option>
                    </select>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-1.5">
                  <label className="font-extrabold text-slate-600">Nội dung ghi chú *</label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Nhập mốc tiến trình cụ thể, khó khăn đã giải quyết hoặc bài học rút ra..."
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 font-medium text-slate-700"
                  />
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-150 flex items-start space-x-2 text-[10px] text-slate-500 leading-normal">
                  <Lock size={14} className="text-indigo-500 shrink-0 mt-0.5" />
                  <p>
                    <strong className="text-slate-600">Lưu ý bảo mật:</strong> Ghi chú cá nhân riêng tư chỉ hiển thị với chính Anh và Cấp quản lý trực tiếp phục vụ mục đích kiểm điểm tiến độ check-in OKR hàng quý.
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-xl font-bold cursor-pointer"
                  >
                    Hủy bỏ
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-black shadow-md shadow-orange-500/10 cursor-pointer"
                  >
                    Lưu ghi chú
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
