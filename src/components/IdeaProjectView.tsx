import React, { useState } from 'react';
import { 
  Briefcase, 
  Plus, 
  ThumbsUp, 
  CheckCircle2, 
  TrendingUp, 
  ArrowUpRight, 
  FolderOpen, 
  Sparkles, 
  Users, 
  MessageSquare,
  Activity,
  UserCheck,
  Calendar
} from 'lucide-react';

type IdeaProjectViewProps = {
  cardOpacity: number;
};

interface EmployeeIdea {
  id: string;
  title: string;
  category: 'Công nghệ' | 'Quy trình' | 'Môi trường làm việc' | 'Đào tạo';
  description: string;
  submittedBy: string;
  avatar: string;
  votes: number;
  votedByUser: boolean;
  status: 'Dưới dạng Ý tưởng' | 'Được phê duyệt' | 'Đã chuyển thành Dự án';
  commentsCount: number;
}

interface ImprovementProject {
  id: string;
  title: string;
  owner: string;
  avatar: string;
  progress: number; // 0-100
  budget: string;
  linkedOkr: string;
  status: 'Chưa bắt đầu' | 'Đang triển khai' | 'Đã hoàn thành';
  targetDate: string;
}

export default function IdeaProjectView({ cardOpacity }: IdeaProjectViewProps) {
  const [activeSubTab, setActiveSubTab] = useState<'ideas' | 'projects'>('ideas');
  const [showAddIdeaModal, setShowAddIdeaModal] = useState(false);
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);

  // Ideas backlog state
  const [ideas, setIdeas] = useState<EmployeeIdea[]>([
    {
      id: 'id-1',
      title: 'Tự động hóa tổng hợp báo cáo tuần bằng kịch bản Python & API',
      category: 'Công nghệ',
      description: 'Hệ thống tự động quét công việc hoàn thành trên Jira/Trello của các thành viên phòng Công nghệ để tự tạo nháp báo cáo định dạng chuẩn gửi Giám đốc điều hành vào thứ Sáu, tiết kiệm 1.5 giờ/tuần mỗi người.',
      submittedBy: 'David Beckham',
      avatar: 'https://i.pravatar.cc/150?u=david',
      votes: 42,
      votedByUser: false,
      status: 'Được phê duyệt',
      commentsCount: 6
    },
    {
      id: 'id-2',
      title: 'Trang bị ghế công thái học (Ergonomic Chairs) bảo vệ sức khỏe lập trình viên',
      category: 'Môi trường làm việc',
      description: 'Nâng cấp toàn bộ ghế ngồi văn phòng sang dòng ghế hỗ trợ cột sống lưới thông thoáng khí. Hạn chế bệnh mỏi vai gáy đặc thù của coder, trực tiếp tăng năng suất làm việc liên tục thêm ít nhất 15%.',
      submittedBy: 'Nguyễn Văn A',
      avatar: 'https://i.pravatar.cc/150?u=architect',
      votes: 56,
      votedByUser: true,
      status: 'Đã chuyển thành Dự án',
      commentsCount: 12
    },
    {
      id: 'id-3',
      title: 'Lập tủ sách chuyên môn (Technical Mini-Library) tại khu vực nghỉ ngơi',
      category: 'Đào tạo',
      description: 'Trang bị các đầu sách công nghệ và kỹ năng mềm nổi tiếng như "Clean Code", "The Effortless Experience", "AWS Architecting"... Khuyến khích văn hóa đọc, chia sẻ kiến thức thông qua các buổi thảo luận tối thứ Tư.',
      submittedBy: 'Elena Rostova',
      avatar: 'https://i.pravatar.cc/150?u=elena',
      votes: 18,
      votedByUser: false,
      status: 'Dưới dạng Ý tưởng',
      commentsCount: 3
    }
  ]);

  // Improvement Projects list state
  const [projects, setProjects] = useState<ImprovementProject[]>([
    {
      id: 'prj-1',
      title: 'Dự án Nâng cấp Ghế công thái học Ergonomic Văn phòng',
      owner: 'Trần Thị B',
      avatar: 'https://i.pravatar.cc/150?u=designer',
      progress: 60,
      budget: '45,000,000đ',
      linkedOkr: 'Tăng 15% chỉ số eNPS gắn kết nội bộ',
      status: 'Đang triển khai',
      targetDate: '15/08/2026'
    },
    {
      id: 'prj-2',
      title: 'Tự động hóa hệ thống Báo cáo tuần tích hợp AI',
      owner: 'David Beckham',
      avatar: 'https://i.pravatar.cc/150?u=david',
      progress: 25,
      budget: '5,000,000đ',
      linkedOkr: 'Tối ưu 20% chi phí vận hành phi sản xuất',
      status: 'Đang triển khai',
      targetDate: '30/08/2026'
    },
    {
      id: 'prj-3',
      title: 'Thiết kế Quy trình Quản trị Rủi ro & Auto-Failover AWS',
      owner: 'Nguyễn Văn A',
      avatar: 'https://i.pravatar.cc/150?u=architect',
      progress: 100,
      budget: '15,000,000đ',
      linkedOkr: 'Đảm bảo tỷ lệ SLA vận hành đạt 99.9%',
      status: 'Đã hoàn thành',
      targetDate: '30/06/2026'
    }
  ]);

  // Add Idea form states
  const [newIdeaTitle, setNewIdeaTitle] = useState('');
  const [newIdeaCategory, setNewIdeaCategory] = useState<'Công nghệ' | 'Quy trình' | 'Môi trường làm việc' | 'Đào tạo'>('Công nghệ');
  const [newIdeaDesc, setNewIdeaDesc] = useState('');

  // Add Project form states
  const [newPrjTitle, setNewPrjTitle] = useState('');
  const [newPrjOwner, setNewPrjOwner] = useState('Nguyễn Văn A');
  const [newPrjBudget, setNewPrjBudget] = useState('10,000,000đ');
  const [newPrjOkr, setNewPrjOkr] = useState('');
  const [newPrjTargetDate, setNewPrjTargetDate] = useState('31/08/2026');

  const handleVoteIdea = (id: string) => {
    setIdeas(ideas.map(idea => {
      if (idea.id === id) {
        return {
          ...idea,
          votes: idea.votedByUser ? idea.votes - 1 : idea.votes + 1,
          votedByUser: !idea.votedByUser
        };
      }
      return idea;
    }));
  };

  const handleAddIdea = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newIdeaTitle || !newIdeaDesc) return;

    const newIdea: EmployeeIdea = {
      id: `id-${Date.now()}`,
      title: newIdeaTitle,
      category: newIdeaCategory,
      description: newIdeaDesc,
      submittedBy: 'Quản trị viên (Tôi)',
      avatar: 'https://i.pravatar.cc/150?u=me',
      votes: 1,
      votedByUser: true,
      status: 'Dưới dạng Ý tưởng',
      commentsCount: 0
    };

    setIdeas([newIdea, ...ideas]);
    setNewIdeaTitle('');
    setNewIdeaDesc('');
    setShowAddIdeaModal(false);
  };

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPrjTitle) return;

    const newPrj: ImprovementProject = {
      id: `prj-${Date.now()}`,
      title: newPrjTitle,
      owner: newPrjOwner,
      avatar: `https://i.pravatar.cc/150?u=${newPrjOwner.toLowerCase().replace(/\s/g, '')}`,
      progress: 0,
      budget: newPrjBudget,
      linkedOkr: newPrjOkr || 'Căn chỉnh sự phát triển tối ưu',
      status: 'Chưa bắt đầu',
      targetDate: newPrjTargetDate
    };

    setProjects([newPrj, ...projects]);
    setNewPrjTitle('');
    setNewPrjOkr('');
    setShowAddProjectModal(false);
  };

  const convertIdeaToProject = (idea: EmployeeIdea) => {
    // Check if already a project
    if (idea.status === 'Đã chuyển thành Dự án') {
      alert('Ý tưởng này đã được duyệt và lập dự án cải tiến thành công trước đó!');
      return;
    }

    // Mark idea as converted
    setIdeas(ideas.map(idItem => {
      if (idItem.id === idea.id) {
        return { ...idItem, status: 'Đã chuyển thành Dự án' };
      }
      return idItem;
    }));

    // Add new project based on idea
    const prjTitle = `Dự án cải tiến: ${idea.title}`;
    const newPrj: ImprovementProject = {
      id: `prj-${Date.now()}`,
      title: prjTitle,
      owner: idea.submittedBy,
      avatar: idea.avatar,
      progress: 0,
      budget: 'Thỏa thuận theo đề xuất',
      linkedOkr: 'Được liên kết tự động từ hộp thư Sáng tạo',
      status: 'Chưa bắt đầu',
      targetDate: '31/08/2026'
    };

    setProjects([newPrj, ...projects]);
    alert(`Chúc mừng! Ý tưởng của ${idea.submittedBy} đã được chuyển đổi thành Dự án cải tiến thực tế thành công. Quản trị viên đã phân quyền chủ trì dự án cho tác giả.`);
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
              <Briefcase size={26} className="text-orange-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Danh mục & Dự án ý kiến</h2>
              <p className="text-xs text-blue-200">
                Lắng nghe hộp thư ý tưởng cải tiến, đồng thuận bình chọn và chuyển hóa trực tiếp thành dự án vận hành tối ưu
              </p>
            </div>
          </div>

          <div className="flex space-x-3 shrink-0">
            {activeSubTab === 'ideas' ? (
              <button 
                onClick={() => setShowAddIdeaModal(true)}
                className="bg-orange-500 hover:bg-orange-600 transition-all font-bold text-xs px-4 py-2.5 rounded-lg flex items-center space-x-2 cursor-pointer shadow-md"
              >
                <Plus size={14} />
                <span>Gửi ý tưởng đóng góp</span>
              </button>
            ) : (
              <button 
                onClick={() => setShowAddProjectModal(true)}
                className="bg-blue-600 hover:bg-blue-700 transition-all font-bold text-xs px-4 py-2.5 rounded-lg flex items-center space-x-2 cursor-pointer shadow-md text-white"
              >
                <Plus size={14} />
                <span>Thêm dự án cải tiến</span>
              </button>
            )}
          </div>
        </div>

        {/* SUB NAVIGATION TABS */}
        <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex space-x-6 text-sm font-semibold">
            <button 
              onClick={() => setActiveSubTab('ideas')}
              className={`pb-1 border-b-2 cursor-pointer transition-all ${
                activeSubTab === 'ideas' ? 'border-orange-500 text-white font-bold' : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              Hộp thư Ý tưởng & Sáng kiến ({ideas.length})
            </button>
            <button 
              onClick={() => setActiveSubTab('projects')}
              className={`pb-1 border-b-2 cursor-pointer transition-all ${
                activeSubTab === 'projects' ? 'border-orange-500 text-white font-bold' : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              Danh mục Dự án Cải tiến ({projects.length})
            </button>
          </div>
        </div>
      </div>

      {/* RENDER ACTIVE SUBTAB */}
      <div className="flex-1 flex flex-col space-y-6">
        {activeSubTab === 'ideas' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left/Middle: Ideas Backlog List */}
            <div className="lg:col-span-2 space-y-4">
              {ideas.map((idea) => (
                <div 
                  key={idea.id}
                  style={cardStyle}
                  className="rounded-[10px] border border-slate-200/60 p-5 shadow-sm hover:shadow-md transition-all flex flex-col space-y-4"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-3">
                      <img src={idea.avatar} alt={idea.submittedBy} className="w-9 h-9 rounded-full border border-slate-200 shadow-sm" />
                      <div>
                        <h4 className="font-bold text-slate-800 text-sm leading-snug">{idea.title}</h4>
                        <span className="text-[10px] text-slate-400 font-medium">Đóng góp bởi {idea.submittedBy}</span>
                      </div>
                    </div>

                    <span className={`text-[9px] font-black uppercase px-2.5 py-1 rounded-full border ${
                      idea.status === 'Đã chuyển thành Dự án' ? 'bg-green-50 text-green-700 border-green-200' :
                      idea.status === 'Được phê duyệt' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                      'bg-slate-100 text-slate-600 border-slate-200'
                    }`}>
                      {idea.status}
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 leading-relaxed font-medium bg-slate-50 border border-slate-100/50 p-4 rounded-xl">
                    {idea.description}
                  </p>

                  <div className="flex justify-between items-center pt-2 border-t border-slate-100">
                    <div className="flex items-center space-x-4">
                      {/* Vote button */}
                      <button 
                        onClick={() => handleVoteIdea(idea.id)}
                        className={`flex items-center space-x-1.5 text-xs font-bold cursor-pointer transition-colors px-3 py-1.5 rounded-lg border ${
                          idea.votedByUser 
                            ? 'bg-orange-50 text-orange-600 border-orange-200' 
                            : 'bg-white text-slate-400 border-slate-200 hover:text-orange-600 hover:border-orange-200'
                        }`}
                      >
                        <ThumbsUp size={13} className={idea.votedByUser ? "fill-orange-500" : ""} />
                        <span>Bình chọn ({idea.votes})</span>
                      </button>

                      <span className="text-[11px] text-slate-400 font-semibold flex items-center space-x-1">
                        <MessageSquare size={13} />
                        <span>{idea.commentsCount} bình luận</span>
                      </span>
                    </div>

                    {idea.status !== 'Đã chuyển thành Dự án' && (
                      <button 
                        onClick={() => convertIdeaToProject(idea)}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-[10px] px-3.5 py-1.5 rounded-lg shadow-sm cursor-pointer transition-all flex items-center space-x-1"
                      >
                        <span>Triển khai thành Dự án</span>
                        <ArrowUpRight size={12} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Right: continuous improvement rules */}
            <div className="space-y-6">
              
              <div 
                style={cardStyle}
                className="rounded-[10px] border border-slate-200/60 p-5 shadow-sm space-y-4"
              >
                <h3 className="font-bold text-slate-800 text-sm flex items-center space-x-1.5">
                  <Sparkles size={16} className="text-orange-500" />
                  <span>Quy trình Sáng kiến liên tục</span>
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  Doanh nghiệp thành công bắt nguồn từ những ý kiến đóng góp nhỏ nhất của từng nhân sự tuyến đầu.
                </p>

                <div className="space-y-3 pt-2 text-xs font-semibold text-slate-500 border-t border-slate-100">
                  <div className="flex items-start space-x-2">
                    <span className="bg-slate-100 w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] text-slate-700 shrink-0">1</span>
                    <span><strong>Gửi Ý Tưởng:</strong> Nhân sự đề xuất giải pháp, gắn nhãn danh mục cụ thể.</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="bg-slate-100 w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] text-slate-700 shrink-0">2</span>
                    <span><strong>Bình Chọn Cộng Đồng:</strong> Tập thể đồng thuận đóng góp ý kiến phản biện và upvote ủng hộ.</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="bg-slate-100 w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] text-slate-700 shrink-0">3</span>
                    <span><strong>Lập Dự Án Cải Tiến:</strong> Ý tưởng xuất sắc đạt lượng vote tối thiểu được phê duyệt lập dự án thực thi, cấp ngân sách và gắn OKR đo lường.</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {activeSubTab === 'projects' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left/Middle: Projects Catalog */}
            <div className="lg:col-span-2 space-y-4">
              {projects.map((prj) => (
                <div 
                  key={prj.id}
                  style={cardStyle}
                  className="rounded-[10px] border border-slate-200/60 p-5 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:shadow-md transition-all"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center space-x-2.5">
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                        prj.status === 'Đã hoàn thành' ? 'bg-green-100 text-green-700 border border-green-200' :
                        'bg-blue-100 text-blue-700 border border-blue-200'
                      }`}>
                        {prj.status}
                      </span>
                      <span className="text-xs text-slate-400 font-medium flex items-center">
                        <Calendar size={12} className="mr-1 text-slate-400" />
                        Thời hạn: {prj.targetDate}
                      </span>
                    </div>

                    <h3 className="font-bold text-slate-800 text-base">{prj.title}</h3>
                    <p className="text-xs text-slate-400 font-bold flex items-center">
                      <Activity size={12} className="mr-1 text-blue-600" />
                      Mục tiêu OKR liên kết: {prj.linkedOkr}
                    </p>

                    {/* Project progress bar */}
                    <div className="space-y-1 max-w-sm pt-2">
                      <div className="flex justify-between text-[10px] font-black text-slate-500">
                        <span>Tiến độ hoàn thành dự án</span>
                        <span>{prj.progress}%</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                        <div 
                          className="bg-blue-600 h-full rounded-full transition-all duration-500"
                          style={{ width: `${prj.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Project metadata column */}
                  <div className="border-t md:border-t-0 md:border-l border-slate-200/60 pt-4 md:pt-0 md:pl-6 flex md:flex-col justify-around md:justify-center items-center md:items-stretch gap-6 md:gap-3 min-w-[160px]">
                    <div className="flex items-center space-x-2.5">
                      <img src={prj.avatar} alt={prj.owner} className="w-8 h-8 rounded-full border border-slate-200 shadow-sm" />
                      <div>
                        <span className="block text-[9px] font-bold text-slate-400 uppercase">Chủ trì dự án</span>
                        <span className="block font-bold text-slate-700 text-xs">{prj.owner}</span>
                      </div>
                    </div>

                    <div className="text-left">
                      <span className="block text-[9px] font-bold text-slate-400 uppercase">Ngân sách dự chi</span>
                      <span className="block font-black text-slate-800 text-xs">{prj.budget}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Side Info */}
            <div className="space-y-6">
              <div 
                style={cardStyle}
                className="rounded-[10px] border border-slate-200/60 p-5 shadow-sm space-y-4"
              >
                <h3 className="font-bold text-slate-800 text-sm flex items-center space-x-1.5">
                  <TrendingUp size={16} className="text-blue-600" />
                  <span>Chỉ số Đo lường Sức khỏe Dự án</span>
                </h3>

                <div className="space-y-2.5 pt-2 text-xs font-semibold text-slate-500">
                  <div className="flex justify-between items-center p-2.5 bg-slate-50 border border-slate-100 rounded-lg">
                    <span>Tổng ngân sách cải tiến tháng này</span>
                    <span className="font-bold text-slate-800">65,000,000đ</span>
                  </div>
                  <div className="flex justify-between items-center p-2.5 bg-slate-50 border border-slate-100 rounded-lg">
                    <span>Số dự án bàn giao đúng hạn</span>
                    <span className="font-bold text-green-600">100% (Đã bàn giao 1)</span>
                  </div>
                  <div className="flex justify-between items-center p-2.5 bg-slate-50 border border-slate-100 rounded-lg">
                    <span>Số giờ tối ưu hóa lao động ước tính</span>
                    <span className="font-bold text-blue-600">32 giờ / tháng</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}
      </div>

      {/* CREATE IDEA MODAL */}
      {showAddIdeaModal && (
        <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-200">
          <div className="bg-white border border-slate-200 rounded-[10px] p-6 max-w-md w-full shadow-2xl space-y-4">
            <h3 className="font-bold text-slate-800 text-lg flex items-center space-x-2">
              <Sparkles size={20} className="text-orange-500" />
              <span>Gửi ý tưởng sáng kiến đóng góp</span>
            </h3>

            <form onSubmit={handleAddIdea} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 block">Tiêu đề ý tưởng sáng kiến</label>
                <input 
                  type="text" 
                  required
                  placeholder="Ví dụ: Lập kế hoạch tài liệu hóa API tự động bằng Swagger"
                  value={newIdeaTitle}
                  onChange={(e) => setNewIdeaTitle(e.target.value)}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs font-medium text-slate-700 focus:border-blue-500 outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 block">Danh mục phân loại</label>
                <select 
                  value={newIdeaCategory}
                  onChange={(e) => setNewIdeaCategory(e.target.value as any)}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs font-semibold text-slate-700 focus:border-blue-500 outline-none cursor-pointer"
                >
                  <option value="Công nghệ">Công nghệ & Tự động hóa</option>
                  <option value="Quy trình">Quy trình vận hành</option>
                  <option value="Môi trường làm việc">Môi trường làm việc & eNPS</option>
                  <option value="Đào tạo">Đào tạo & Sách chuyên môn</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 block">Mô tả giải pháp chi tiết và tác động dự kiến</label>
                <textarea 
                  required
                  rows={4}
                  placeholder="Trình bày rõ quy trình cũ gặp khó khăn gì, giải pháp mới hoạt động ra sao và tối ưu hóa được bao nhiêu nguồn lực..."
                  value={newIdeaDesc}
                  onChange={(e) => setNewIdeaDesc(e.target.value)}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs font-medium text-slate-700 focus:border-blue-500 outline-none resize-none"
                />
              </div>

              <div className="flex space-x-2 pt-2 justify-end">
                <button 
                  type="button" 
                  onClick={() => setShowAddIdeaModal(false)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs px-4 py-2 rounded-lg cursor-pointer"
                >
                  Hủy
                </button>
                <button 
                  type="submit" 
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs px-4 py-2 rounded-lg cursor-pointer shadow-md"
                >
                  Đăng ý tưởng sáng kiến
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE PROJECT MODAL */}
      {showAddProjectModal && (
        <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-200">
          <div className="bg-white border border-slate-200 rounded-[10px] p-6 max-w-md w-full shadow-2xl space-y-4">
            <h3 className="font-bold text-slate-800 text-lg flex items-center space-x-2">
              <Briefcase size={20} className="text-blue-600" />
              <span>Thêm dự án Cải tiến mới</span>
            </h3>

            <form onSubmit={handleAddProject} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 block">Tên dự án cải tiến</label>
                <input 
                  type="text" 
                  required
                  placeholder="Ví dụ: Dự án Tự động hóa CI/CD cho Khối Test"
                  value={newPrjTitle}
                  onChange={(e) => setNewPrjTitle(e.target.value)}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs font-medium text-slate-700 focus:border-blue-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 block">Người chủ trì dự án</label>
                  <select 
                    value={newPrjOwner}
                    onChange={(e) => setNewPrjOwner(e.target.value)}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs font-semibold text-slate-700 focus:border-blue-500 outline-none cursor-pointer"
                  >
                    <option value="Nguyễn Văn A">Nguyễn Văn A</option>
                    <option value="Trần Thị B">Trần Thị B</option>
                    <option value="David Beckham">David Beckham</option>
                    <option value="Elena Rostova">Elena Rostova</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 block">Ngân sách dự tính</label>
                  <input 
                    type="text" 
                    value={newPrjBudget}
                    onChange={(e) => setNewPrjBudget(e.target.value)}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs font-medium text-slate-700 focus:border-blue-500 outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 block">Mục tiêu OKR liên kết</label>
                <input 
                  type="text" 
                  placeholder="Ví dụ: Tối ưu 15% thời gian CI/CD build hệ thống"
                  value={newPrjOkr}
                  onChange={(e) => setNewPrjOkr(e.target.value)}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs font-medium text-slate-700 focus:border-blue-500 outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 block">Hạn bàn giao dự kiến</label>
                <input 
                  type="text" 
                  value={newPrjTargetDate}
                  onChange={(e) => setNewPrjTargetDate(e.target.value)}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs font-medium text-slate-700 focus:border-blue-500 outline-none"
                />
              </div>

              <div className="flex space-x-2 pt-2 justify-end">
                <button 
                  type="button" 
                  onClick={() => setShowAddProjectModal(false)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs px-4 py-2 rounded-lg cursor-pointer"
                >
                  Hủy
                </button>
                <button 
                  type="submit" 
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2 rounded-lg cursor-pointer shadow-md"
                >
                  Khởi động dự án
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
