import React, { useState } from 'react';
import { 
  Calendar, 
  Plus, 
  Search, 
  Users, 
  Clock, 
  Check, 
  Trash2, 
  MessageSquare, 
  Sparkles, 
  Target, 
  AlertCircle, 
  CheckSquare, 
  UserPlus, 
  Info, 
  ChevronRight, 
  Award,
  BookOpen,
  ArrowRight
} from 'lucide-react';
import { cn } from '../lib/utils';

export type MeetingType = '1:1 Progress Review' | 'Weekly OKR Alignment' | 'KPI Health Audit' | 'Individual IDP Mentoring';
export type MeetingStatus = 'Scheduled' | 'Completed' | 'Cancelled';

export interface TalkingPoint {
  id: string;
  text: string;
  discussed: boolean;
}

export interface MeetingActionItem {
  id: string;
  text: string;
  completed: boolean;
  assignee: string;
}

export interface MeetingItem {
  id: string;
  title: string;
  type: MeetingType;
  dateTime: string;
  location: string; // e.g. "Phòng họp lớn", "Google Meet"
  organizerName: string;
  organizerAvatar: string;
  guestName: string;
  guestAvatar: string;
  status: MeetingStatus;
  talkingPoints: TalkingPoint[];
  actionItems: MeetingActionItem[];
  notes: string;
}

const INITIAL_MEETINGS: MeetingItem[] = [
  {
    id: 'meet-1',
    title: 'Họp 1:1 Đánh giá Tiến độ & Tháo gỡ khó khăn Tuần 27',
    type: '1:1 Progress Review',
    dateTime: '2026-07-08T10:00',
    location: 'Phòng họp VIP hoặc Zoom',
    organizerName: 'Roberto Canevari',
    organizerAvatar: 'https://i.pravatar.cc/150?u=roberto',
    guestName: 'David Tran',
    guestAvatar: 'https://i.pravatar.cc/150?u=david',
    status: 'Scheduled',
    talkingPoints: [
      { id: 'tp-1-1', text: 'Rà soát chỉ số phản hồi API (KPI-ENG-03) hiện đang ở mức 240ms', discussed: false },
      { id: 'tp-1-2', text: 'Hỗ trợ tuyển dụng thêm 1 vị trí Senior Cloud Architect để giảm tải', discussed: false },
      { id: 'tp-1-3', text: 'Kế hoạch thi chứng chỉ AWS của nhóm kỹ thuật (Lộ trình IDP)', discussed: false }
    ],
    actionItems: [
      { id: 'mai-1-1', text: 'Đăng ký ngân sách thi AWS cho 3 nhân sự', completed: false, assignee: 'Minh Thư' }
    ],
    notes: 'Cuộc họp định kỳ hàng tuần để tháo gỡ rào cản kĩ thuật và bám đuổi OKR.'
  },
  {
    id: 'meet-2',
    title: 'Hội chẩn Sức khỏe Chỉ số Vận hành & Doanh số MRR',
    type: 'KPI Health Audit',
    dateTime: '2026-07-10T14:30',
    location: 'Phòng Chiến Lược (Tầng 4)',
    organizerName: 'Roberto Canevari',
    organizerAvatar: 'https://i.pravatar.cc/150?u=roberto',
    guestName: 'Alice Nguyen',
    guestAvatar: 'https://i.pravatar.cc/150?u=alice',
    status: 'Scheduled',
    talkingPoints: [
      { id: 'tp-2-1', text: 'Phân tích tỉ lệ chuyển đổi Win Rate đạt 18% so với chỉ tiêu 25%', discussed: false },
      { id: 'tp-2-2', text: 'Định hình ngân sách quảng cáo Google Search bổ sung cho tuần kế tiếp', discussed: false }
    ],
    actionItems: [],
    notes: 'Liên kết trực tiếp đến KPI-FIN-01 và KPI-SLS-02.'
  },
  {
    id: 'meet-3',
    title: 'Tổng kết OKR Quý 2 & Căn chỉnh Kế hoạch Phát triển',
    type: 'Individual IDP Mentoring',
    dateTime: '2026-06-28T09:00',
    location: 'Quán cafe Trung Nguyên',
    organizerName: 'Elena Rostova',
    organizerAvatar: 'https://i.pravatar.cc/150?u=elena',
    guestName: 'Minh Thư',
    guestAvatar: 'https://i.pravatar.cc/150?u=thu',
    status: 'Completed',
    talkingPoints: [
      { id: 'tp-3-1', text: 'Tổng kết kết quả khảo sát nhân viên cuối Quý 2 đạt 88%', discussed: true },
      { id: 'tp-3-2', text: 'Thảo luận lộ trình đào tạo Trải nghiệm Khách hàng Toàn diện', discussed: true }
    ],
    actionItems: [
      { id: 'mai-3-1', text: 'Nộp báo cáo tổng quan khảo sát nhân sự lên CEO', completed: true, assignee: 'Minh Thư' }
    ],
    notes: 'Nhân sự đạt tiến bộ vượt bậc, tiếp tục duy trì đà đào tạo nội bộ.'
  }
];

export function MeetingSettingView({ cardOpacity }: { cardOpacity: number }) {
  const [meetings, setMeetings] = useState<MeetingItem[]>(INITIAL_MEETINGS);
  const [selectedMeeting, setSelectedMeeting] = useState<MeetingItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('All');

  // Add Meeting States
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState<MeetingType>('1:1 Progress Review');
  const [newDateTime, setNewDateTime] = useState(new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().slice(0, 16));
  const [newLocation, setNewLocation] = useState('Phòng họp chính');
  const [newGuest, setNewGuest] = useState('David Tran');
  const [newNotes, setNewNotes] = useState('');
  const [newTpInput, setNewTpInput] = useState<string[]>(['', '']);

  // Add items inside selected details
  const [newSingleTp, setNewSingleTp] = useState('');
  const [newSingleActionText, setNewSingleActionText] = useState('');
  const [newSingleActionAssignee, setNewSingleActionAssignee] = useState('David Tran');

  const MEETING_TYPES: MeetingType[] = [
    '1:1 Progress Review',
    'Weekly OKR Alignment',
    'KPI Health Audit',
    'Individual IDP Mentoring'
  ];

  // Toggle discussed status on talking point
  const handleToggleTalkingPoint = (meetId: string, tpId: string) => {
    const updated = meetings.map(m => {
      if (m.id === meetId) {
        const updatedTps = m.talkingPoints.map(tp => 
          tp.id === tpId ? { ...tp, discussed: !tp.discussed } : tp
        );
        return { ...m, talkingPoints: updatedTps };
      }
      return m;
    });
    setMeetings(updated);
    if (selectedMeeting && selectedMeeting.id === meetId) {
      const found = updated.find(m => m.id === meetId);
      if (found) setSelectedMeeting(found);
    }
  };

  // Toggle action item completed inside meeting
  const handleToggleActionItem = (meetId: string, actionId: string) => {
    const updated = meetings.map(m => {
      if (m.id === meetId) {
        const updatedActions = m.actionItems.map(ai => 
          ai.id === actionId ? { ...ai, completed: !ai.completed } : ai
        );
        return { ...m, actionItems: updatedActions };
      }
      return m;
    });
    setMeetings(updated);
    if (selectedMeeting && selectedMeeting.id === meetId) {
      const found = updated.find(m => m.id === meetId);
      if (found) setSelectedMeeting(found);
    }
  };

  // Add Single Agenda point inside active detail panel
  const handleAddSingleTp = () => {
    if (!selectedMeeting || !newSingleTp.trim()) return;

    const newTp = {
      id: `tp-add-${Date.now()}`,
      text: newSingleTp,
      discussed: false
    };

    const updated = meetings.map(m => {
      if (m.id === selectedMeeting.id) {
        return { ...m, talkingPoints: [...m.talkingPoints, newTp] };
      }
      return m;
    });

    setMeetings(updated);
    const found = updated.find(m => m.id === selectedMeeting.id);
    if (found) setSelectedMeeting(found);
    setNewSingleTp('');
  };

  // Add Action Item inside active detail panel
  const handleAddSingleAction = () => {
    if (!selectedMeeting || !newSingleActionText.trim()) return;

    const newAction = {
      id: `mai-add-${Date.now()}`,
      text: newSingleActionText,
      completed: false,
      assignee: newSingleActionAssignee
    };

    const updated = meetings.map(m => {
      if (m.id === selectedMeeting.id) {
        return { ...m, actionItems: [...m.actionItems, newAction] };
      }
      return m;
    });

    setMeetings(updated);
    const found = updated.find(m => m.id === selectedMeeting.id);
    if (found) setSelectedMeeting(found);
    setNewSingleActionText('');
  };

  // Set Meeting Status to Completed
  const handleCompleteMeeting = (id: string) => {
    const updated = meetings.map(m => {
      if (m.id === id) {
        // Automatically check all talking points when meeting finishes
        const allDiscussed = m.talkingPoints.map(tp => ({ ...tp, discussed: true }));
        return { ...m, status: 'Completed' as const, talkingPoints: allDiscussed };
      }
      return m;
    });
    setMeetings(updated);
    if (selectedMeeting?.id === id) {
      const found = updated.find(m => m.id === id);
      if (found) setSelectedMeeting(found);
    }
  };

  // Delete Meeting
  const handleDeleteMeeting = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Anh có chắc chắn muốn hủy lịch cuộc họp phát triển này không? Thông tin lịch hẹn sẽ biến mất.')) {
      setMeetings(meetings.filter(m => m.id !== id));
      if (selectedMeeting?.id === id) setSelectedMeeting(null);
    }
  };

  // Create Meeting Submit
  const handleCreateMeeting = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const tps = newTpInput
      .filter(t => t.trim() !== '')
      .map((t, idx) => ({
        id: `tp-${Date.now()}-${idx}`,
        text: t,
        discussed: false
      }));

    const newMeeting: MeetingItem = {
      id: `meet-${Date.now()}`,
      title: newTitle,
      type: newType,
      dateTime: newDateTime,
      location: newLocation,
      organizerName: 'Roberto Canevari',
      organizerAvatar: 'https://i.pravatar.cc/150?u=roberto',
      guestName: newGuest,
      guestAvatar: `https://i.pravatar.cc/150?u=${newGuest.split(' ')[0].toLowerCase()}`,
      status: 'Scheduled',
      talkingPoints: tps,
      actionItems: [],
      notes: newNotes
    };

    setMeetings([newMeeting, ...meetings]);

    // reset fields
    setNewTitle('');
    setNewLocation('Phòng họp chính');
    setNewNotes('');
    setNewTpInput(['', '']);
    setShowAddForm(false);
  };

  const filteredMeetings = meetings.filter(m => {
    const matchesSearch = m.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          m.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          m.guestName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'All' || m.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const scheduledMeetings = meetings.filter(m => m.status === 'Scheduled');
  const finishedMeetings = meetings.filter(m => m.status === 'Completed');

  const cardStyle = { 
    backgroundColor: 'rgba(255, 255, 255, 0.45)',
    backdropFilter: 'blur(12px)'
  };

  return (
    <div className="flex-1 overflow-auto p-6 space-y-6 flex flex-col select-none">
      
      {/* 7. BỐ CỤC TRANG NỘI DUNG: BANNER BO CONG 4 GÓC 10PX */}
      <div className="bg-gradient-to-r from-sky-600 via-indigo-600 to-violet-800 rounded-[10px] shadow-lg p-6 text-white relative overflow-hidden transition-all duration-300 shrink-0">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 z-10 relative">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center animate-pulse">
              <Calendar size={26} className="text-sky-200" />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                <span>Hệ thống Lịch họp Check-in & Phát triển</span>
              </h2>
              <p className="text-xs text-sky-100">
                Không bỏ lỡ các kỳ đánh giá tiến độ. Tạo lịch họp 1:1 nhanh, chia sẻ tài liệu nghị trình và biến hội ý thành hành động cụ thể.
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-4 py-2.5 rounded-lg text-xs font-bold shadow-md hover:scale-[1.02] active:scale-95 transition-all cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4" /> Đặt lịch họp mới
          </button>
        </div>
      </div>

      {/* BODY PANEL */}
      <div className="flex-1 flex flex-col gap-6 min-h-0">

        {/* METRICS ROW */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl border border-slate-200/60 p-4 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider block">Sắp diễn ra (Scheduled)</span>
              <span className="text-2xl font-black text-indigo-600">{scheduledMeetings.length} lịch hẹn</span>
            </div>
            <div className="p-3 bg-indigo-50 rounded-lg text-indigo-500">
              <Clock size={18} />
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200/60 p-4 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] text-emerald-500 font-extrabold uppercase tracking-wider block">Hoàn tất trao đổi (Completed)</span>
              <span className="text-2xl font-black text-emerald-600">{finishedMeetings.length} phiên</span>
            </div>
            <div className="p-3 bg-emerald-50 rounded-lg text-emerald-500">
              <Check size={18} />
            </div>
          </div>

          <div className="bg-gradient-to-tr from-cyan-500 to-indigo-600 text-white rounded-xl p-4 shadow-sm flex items-center justify-between col-span-2 md:col-span-1">
            <div className="space-y-1">
              <span className="text-[10px] text-white/80 font-extrabold uppercase tracking-wider block">Môi trường 1:1 Power Service</span>
              <p className="text-xs font-bold leading-snug">Rút ngắn khoảng cách giữa lãnh đạo và nhân viên.</p>
            </div>
            <div className="p-3 bg-white/10 rounded-lg">
              <Users size={18} />
            </div>
          </div>
        </div>

        {/* SCHEDULE MEETING POPUP FORM */}
        {showAddForm && (
          <div className="bg-white border border-slate-200 shadow-xl rounded-2xl p-6 max-w-4xl mx-auto space-y-4 animate-fade-in">
            <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
              <h3 className="text-sm font-extrabold text-slate-800 flex items-center space-x-1.5">
                <Sparkles size={16} className="text-amber-500" />
                <span>Thiết lập Phiên họp OKRs / Đánh giá KPI / IDP Mentoring</span>
              </h3>
              <button onClick={() => setShowAddForm(false)} className="text-xs text-slate-400 hover:text-slate-600">Đóng</button>
            </div>

            <form onSubmit={handleCreateMeeting} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2 space-y-1.5">
                  <label className="text-xs font-bold text-slate-600">Tiêu đề Cuộc họp *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ví dụ: Rà soát vướng mắc kỹ thuật Microservices & Tiến độ OKR"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full px-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600">Người hội ý cùng *</label>
                  <select
                    value={newGuest}
                    onChange={(e) => setNewGuest(e.target.value)}
                    className="w-full px-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none"
                  >
                    <option value="David Tran">David Tran (Kỹ thuật)</option>
                    <option value="Alice Nguyen">Alice Nguyen (Kinh doanh)</option>
                    <option value="Elena Rostova">Elena Rostova (Vận hành)</option>
                    <option value="Minh Thư">Minh Thư (Nhân sự)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600">Phân loại Phiên họp</label>
                  <select
                    value={newType}
                    onChange={(e: any) => setNewType(e.target.value)}
                    className="w-full px-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none"
                  >
                    {MEETING_TYPES.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600">Thời gian diễn ra *</label>
                  <input
                    type="datetime-local"
                    required
                    value={newDateTime}
                    onChange={(e) => setNewDateTime(e.target.value)}
                    className="w-full px-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600">Địa điểm / Nền tảng</label>
                  <input
                    type="text"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    className="w-full px-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none"
                  />
                </div>

                <div className="md:col-span-3 space-y-1.5">
                  <label className="text-xs font-bold text-slate-600">Mô tả định hướng sơ bộ cuộc họp</label>
                  <textarea
                    placeholder="Sơ lược về kết quả mong đợi sau cuộc họp hoặc chuẩn bị tài liệu gì trước..."
                    value={newNotes}
                    onChange={(e) => setNewNotes(e.target.value)}
                    className="w-full px-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none min-h-[50px]"
                  />
                </div>
              </div>

              {/* Talking points / Agendas setup */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600 block">Nội dung cốt lõi cần thảo luận (Talking Points)</label>
                {newTpInput.map((tp, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      placeholder={`Chủ điểm thảo luận #${index + 1}`}
                      value={tp}
                      onChange={(e) => {
                        const copy = [...newTpInput];
                        copy[index] = e.target.value;
                        setNewTpInput(copy);
                      }}
                      className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-slate-200"
                    />
                    {newTpInput.length > 1 && (
                      <button
                        type="button"
                        onClick={() => setNewTpInput(newTpInput.filter((_, idx) => idx !== index))}
                        className="text-xs text-rose-500 hover:bg-rose-50 p-1.5 rounded"
                      >
                        Xóa
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => setNewTpInput([...newTpInput, ''])}
                  className="text-[11px] text-indigo-500 font-bold hover:text-indigo-600 flex items-center space-x-1"
                >
                  <Plus size={12} />
                  <span>Thêm chủ điểm thảo luận</span>
                </button>
              </div>

              <div className="pt-3 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 border border-slate-200 rounded-xl text-xs text-slate-500 hover:bg-slate-50"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-bold rounded-xl shadow-md"
                >
                  Lên lịch ngay
                </button>
              </div>
            </form>
          </div>
        )}

        {/* SEARCH AND FILTERS */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-sm">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Tìm kiếm tiêu đề cuộc họp, địa điểm hoặc người tham dự..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none"
            />
          </div>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white"
          >
            <option value="All">Tất cả phân loại</option>
            {MEETING_TYPES.map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        {/* LIST VS DETAILS GRID */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
          
          {/* List panel */}
          <div className="xl:col-span-2 space-y-3">
            {filteredMeetings.map(meet => {
              const isSelected = selectedMeeting?.id === meet.id;
              const formattedDate = new Date(meet.dateTime).toLocaleString('vi-VN', {
                month: 'numeric',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              });

              const discussedCount = meet.talkingPoints.filter(tp => tp.discussed).length;

              return (
                <div
                  key={meet.id}
                  onClick={() => setSelectedMeeting(meet)}
                  className={cn(
                    "bg-white rounded-xl border p-4 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 group",
                    isSelected ? "border-indigo-500 ring-2 ring-indigo-500/10" : "border-slate-200/70"
                  )}
                >
                  <div className="flex items-start space-x-3 flex-1 min-w-0">
                    <div className="p-2.5 bg-slate-50 rounded-xl border shrink-0 mt-0.5 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                      <Calendar size={18} />
                    </div>
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                        <span className="text-[10px] bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded text-slate-600 font-extrabold uppercase">
                          {meet.type}
                        </span>
                        <span className={cn(
                          "text-[9px] px-1.5 py-0.5 rounded font-bold uppercase",
                          meet.status === 'Completed' ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : "bg-indigo-50 text-indigo-600 border border-indigo-100"
                        )}>
                          {meet.status === 'Completed' ? 'Hoàn tất' : 'Đã hẹn'}
                        </span>
                        <span className="text-[10px] text-slate-400 font-bold flex items-center space-x-1">
                          <Clock size={11} />
                          <span>{formattedDate}</span>
                        </span>
                      </div>
                      <h4 className="text-xs font-extrabold text-slate-800 truncate group-hover:text-indigo-600 transition-colors">
                        {meet.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 font-medium truncate max-w-md">📍 Địa điểm: {meet.location}</p>
                    </div>
                  </div>

                  {/* Right actions */}
                  <div className="flex items-center space-x-4 pl-11 sm:pl-0 justify-between sm:justify-end shrink-0">
                    
                    <div className="text-right space-y-1">
                      <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-wider">Chủ điểm thảo luận</span>
                      <span className="text-xs font-black text-slate-700">{discussedCount}/{meet.talkingPoints.length}</span>
                      <div className="w-16 h-1 bg-slate-100 rounded-full overflow-hidden border border-slate-200/40">
                        <div 
                          className="h-full bg-indigo-500" 
                          style={{ width: `${meet.talkingPoints.length > 0 ? (discussedCount / meet.talkingPoints.length) * 100 : 0}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 border-l border-slate-100 pl-3">
                      <div className="flex -space-x-2">
                        <img src={meet.organizerAvatar} className="w-6 h-6 rounded-full border border-white" title={`Chủ trì: ${meet.organizerName}`} />
                        <img src={meet.guestAvatar} className="w-6 h-6 rounded-full border border-white" title={`Thành viên: ${meet.guestName}`} />
                      </div>
                      <button
                        onClick={(e) => handleDeleteMeeting(meet.id, e)}
                        className="p-1.5 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded cursor-pointer transition-all"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}

            {filteredMeetings.length === 0 && (
              <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-400">
                Không tìm thấy lịch họp nào.
              </div>
            )}
          </div>

          {/* Expanded details panel */}
          <div className="space-y-4">
            {selectedMeeting ? (
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-5">
                <div className="border-b border-slate-100 pb-3 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] text-indigo-500 font-black tracking-widest uppercase">Chi tiết buổi check-in</span>
                    {selectedMeeting.status === 'Scheduled' && (
                      <button
                        onClick={() => handleCompleteMeeting(selectedMeeting.id)}
                        className="text-[10px] bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold px-2.5 py-1 rounded cursor-pointer transition-colors"
                      >
                        Hoàn tất cuộc họp
                      </button>
                    )}
                  </div>
                  <h3 className="text-xs font-black text-slate-800 leading-snug">{selectedMeeting.title}</h3>
                  <p className="text-[11px] text-slate-400 font-medium leading-relaxed italic">"{selectedMeeting.notes}"</p>
                </div>

                {/* Agenda talking points */}
                <div className="space-y-2">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Chủ điểm nghị trình</span>
                  <div className="space-y-1.5">
                    {selectedMeeting.talkingPoints.map(tp => (
                      <div
                        key={tp.id}
                        onClick={() => handleToggleTalkingPoint(selectedMeeting.id, tp.id)}
                        className="flex items-start space-x-2 p-2 bg-slate-50/50 border border-slate-100 hover:border-indigo-200 rounded-xl cursor-pointer transition-all"
                      >
                        <div className={cn(
                          "w-4 h-4 rounded border flex items-center justify-center shrink-0 mt-0.5",
                          tp.discussed ? "bg-indigo-500 border-indigo-500 text-white" : "border-slate-300 bg-white"
                        )}>
                          {tp.discussed && <Check size={10} />}
                        </div>
                        <span className={cn(
                          "text-[11px] font-semibold leading-tight",
                          tp.discussed ? "line-through text-slate-400 font-medium" : "text-slate-700"
                        )}>
                          {tp.text}
                        </span>
                      </div>
                    ))}
                  </div>

                  {selectedMeeting.status === 'Scheduled' && (
                    <div className="flex space-x-1.5 pt-1">
                      <input
                        type="text"
                        placeholder="Thêm chủ đề thảo luận mới..."
                        value={newSingleTp}
                        onChange={(e) => setNewSingleTp(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleAddSingleTp()}
                        className="flex-1 px-3 py-1 text-xs rounded-xl border border-slate-200 focus:outline-none"
                      />
                      <button
                        onClick={handleAddSingleTp}
                        className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl"
                      >
                        Thêm
                      </button>
                    </div>
                  )}
                </div>

                {/* Follow up Action Items from meeting */}
                <div className="pt-3 border-t border-slate-100 space-y-2.5">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Hành động cam kết phát sinh</span>
                  
                  <div className="space-y-1.5">
                    {selectedMeeting.actionItems.map(item => (
                      <div
                        key={item.id}
                        onClick={() => handleToggleActionItem(selectedMeeting.id, item.id)}
                        className="flex items-center justify-between p-2 bg-slate-50 border border-slate-100 rounded-xl cursor-pointer"
                      >
                        <div className="flex items-center space-x-2 min-w-0">
                          <div className={cn(
                            "w-4 h-4 rounded border flex items-center justify-center shrink-0",
                            item.completed ? "bg-emerald-500 border-emerald-500 text-white" : "border-slate-300 bg-white"
                          )}>
                            {item.completed && <Check size={10} />}
                          </div>
                          <span className={cn(
                            "text-[11px] font-semibold leading-tight truncate",
                            item.completed ? "line-through text-slate-400" : "text-slate-700"
                          )}>
                            {item.text}
                          </span>
                        </div>
                        <span className="text-[8px] bg-slate-200 text-slate-600 px-1.5 py-0.5 rounded font-black uppercase shrink-0">
                          {item.assignee}
                        </span>
                      </div>
                    ))}

                    {selectedMeeting.actionItems.length === 0 && (
                      <p className="text-[10px] text-slate-400 italic">Chưa phát sinh hành động sau trao đổi.</p>
                    )}
                  </div>

                  {selectedMeeting.status === 'Scheduled' && (
                    <div className="space-y-1.5 pt-1">
                      <div className="flex space-x-1.5">
                        <input
                          type="text"
                          placeholder="Hành động cần làm sau họp..."
                          value={newSingleActionText}
                          onChange={(e) => setNewSingleActionText(e.target.value)}
                          className="flex-1 px-3 py-1 text-xs rounded-xl border border-slate-200 focus:outline-none"
                        />
                        <select
                          value={newSingleActionAssignee}
                          onChange={(e) => setNewSingleActionAssignee(e.target.value)}
                          className="px-2 py-1 text-xs rounded-xl border border-slate-200"
                        >
                          <option value="David Tran">David</option>
                          <option value="Alice Nguyen">Alice</option>
                          <option value="Elena Rostova">Elena</option>
                          <option value="Minh Thư">Minh Thư</option>
                        </select>
                        <button
                          onClick={handleAddSingleAction}
                          className="px-3 py-1 bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-bold rounded-xl"
                        >
                          Giao
                        </button>
                      </div>
                    </div>
                  )}
                </div>

              </div>
            ) : (
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-center space-y-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mx-auto text-indigo-500 border shadow-sm">
                  <Users size={16} />
                </div>
                <h4 className="text-xs font-extrabold text-slate-800">Chọn cuộc họp check-in</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Để theo dõi trực quan nghị trình chi tiết, tích hoàn thành các chủ điểm thảo luận, ghi nhận cam kết hành động và xác nhận hoàn tất phiên họp.
                </p>
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}
