import React, { useState } from 'react';
import { 
  Award, 
  Send, 
  Heart, 
  Users, 
  ShoppingBag, 
  TrendingUp, 
  Plus, 
  Gift, 
  Sparkles,
  Zap,
  ThumbsUp,
  Search
} from 'lucide-react';

type RewardRecognitionViewProps = {
  cardOpacity: number;
};

interface RecognitionPost {
  id: string;
  senderName: string;
  senderAvatar: string;
  receiverName: string;
  receiverAvatar: string;
  message: string;
  badge: string; // Core Value tag
  points: number;
  timestamp: string;
  likes: number;
  likedByUser: boolean;
}

interface LeaderboardUser {
  rank: number;
  name: string;
  role: string;
  avatar: string;
  pointsReceived: number;
  recognitionsCount: number;
}

interface RewardItem {
  id: string;
  title: string;
  cost: number;
  image: string;
  category: string;
  description: string;
  stock: number;
}

export default function RewardRecognitionView({ cardOpacity }: RewardRecognitionViewProps) {
  const [activeSubTab, setActiveSubTab] = useState<'wall' | 'leaderboard' | 'rewards'>('wall');
  const [showGiveModal, setShowGiveModal] = useState(false);
  
  // User Points Balance
  const [receivedPoints, setReceivedPoints] = useState(380);
  const [availableToGive, setAvailableToGive] = useState(450);

  // Fake recognitions list
  const [posts, setPosts] = useState<RecognitionPost[]>([
    {
      id: 'post-1',
      senderName: 'David Beckham',
      senderAvatar: 'https://i.pravatar.cc/150?u=david',
      receiverName: 'Nguyễn Văn A',
      receiverAvatar: 'https://i.pravatar.cc/150?u=architect',
      message: 'Cảm ơn Anh đã hỗ trợ hết mình trong việc tối ưu hóa hạ tầng Cloud AWS cuối tuần qua. Nhờ kiến trúc Auto-Failover của Anh mà hệ thống phục hồi thảm họa tự động đã chạy thành công chỉ trong vòng dưới 10 giây!',
      badge: 'Chuyên môn Vượt trội',
      points: 50,
      timestamp: '2 giờ trước',
      likes: 12,
      likedByUser: false
    },
    {
      id: 'post-2',
      senderName: 'Elena Rostova',
      senderAvatar: 'https://i.pravatar.cc/150?u=elena',
      receiverName: 'Trần Thị B',
      receiverAvatar: 'https://i.pravatar.cc/150?u=designer',
      message: 'Mẫu thiết kế UI mới của chị B cho bảng thiết lập KPI thực sự đột phá! Khách hàng SME của chúng ta đã khen nức nở vì giao diện trực quan và trải nghiệm mượt mà không tỳ vết.',
      badge: 'Khách hàng là Trọng tâm',
      points: 30,
      timestamp: 'Hôm qua',
      likes: 18,
      likedByUser: true
    },
    {
      id: 'post-3',
      senderName: 'Roberto Carlos',
      senderAvatar: 'https://i.pravatar.cc/150?u=roberto',
      receiverName: 'David Beckham',
      receiverAvatar: 'https://i.pravatar.cc/150?u=david',
      message: 'Vinh danh David vì tinh thần đồng đội tuyệt vời, luôn sẵn sàng hỗ trợ training nghiệp vụ bảo mật AWS mới cho các thành viên Fresher trong phòng Công nghệ.',
      badge: 'Chia sẻ & Đồng hành',
      points: 40,
      timestamp: '3 ngày trước',
      likes: 24,
      likedByUser: false
    }
  ]);

  // Leaderboard data
  const leaderboard: LeaderboardUser[] = [
    { rank: 1, name: 'Nguyễn Văn A', role: 'Solutions Architect', avatar: 'https://i.pravatar.cc/150?u=architect', pointsReceived: 280, recognitionsCount: 8 },
    { rank: 2, name: 'Trần Thị B', role: 'UX/UI Designer', avatar: 'https://i.pravatar.cc/150?u=designer', pointsReceived: 240, recognitionsCount: 6 },
    { rank: 3, name: 'David Beckham', role: 'Fullstack Engineer', avatar: 'https://i.pravatar.cc/150?u=david', pointsReceived: 190, recognitionsCount: 5 },
    { rank: 4, name: 'Elena Rostova', role: 'CX Advisor', avatar: 'https://i.pravatar.cc/150?u=elena', pointsReceived: 150, recognitionsCount: 4 },
    { rank: 5, name: 'Vũ Thị F', role: 'QA Lead', avatar: 'https://i.pravatar.cc/150?u=qa', pointsReceived: 120, recognitionsCount: 3 },
  ];

  // Rewards catalog items
  const [rewards, setRewards] = useState<RewardItem[]>([
    {
      id: 'rew-1',
      title: 'E-Voucher Cafe Highlands 100,000đ',
      cost: 100,
      image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=300&q=80',
      category: 'Ẩm thực',
      description: 'Mã giảm giá điện tử áp dụng tại tất cả hệ thống Highlands Coffee toàn quốc.',
      stock: 15
    },
    {
      id: 'rew-2',
      title: 'Thêm 01 Ngày Nghỉ Phép Hưởng Lương',
      cost: 300,
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=300&q=80',
      category: 'Đời sống',
      description: 'Đăng ký cộng dồn thêm 1 ngày nghỉ phép phép năm có hưởng lương đầy đủ.',
      stock: 8
    },
    {
      id: 'rew-3',
      title: 'Áo Khoác Hoodie Đồng phục Độc quyền Power Service',
      cost: 250,
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=300&q=80',
      category: 'Quà tặng hiện vật',
      description: 'Hoodie nỉ bông cao cấp với thiết kế phản quang cá tính.',
      stock: 4
    },
    {
      id: 'rew-4',
      title: 'Buổi Trưa Cùng Tổng Giám Đốc (CEO Lunch)',
      cost: 500,
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=300&q=80',
      category: 'Đặc quyền',
      description: 'Bữa trưa 5 sao cao cấp và 1 tiếng trao đổi chiến lược kinh doanh trực tiếp cùng CEO.',
      stock: 2
    }
  ]);

  // Give Recognition Form States
  const [targetColleague, setTargetColleague] = useState('');
  const [pointsToAward, setPointsToAward] = useState(20);
  const [badgeCategory, setBadgeCategory] = useState('Chuyên môn Vượt trội');
  const [recognitionMessage, setRecognitionMessage] = useState('');

  const handleLike = (id: string) => {
    setPosts(posts.map(post => {
      if (post.id === id) {
        return {
          ...post,
          likes: post.likedByUser ? post.likes - 1 : post.likes + 1,
          likedByUser: !post.likedByUser
        };
      }
      return post;
    }));
  };

  const handleGiveRecognition = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetColleague || !recognitionMessage || pointsToAward > availableToGive) return;

    const newPost: RecognitionPost = {
      id: `post-${Date.now()}`,
      senderName: 'Quản trị viên (Tôi)',
      senderAvatar: 'https://i.pravatar.cc/150?u=me',
      receiverName: targetColleague,
      receiverAvatar: `https://i.pravatar.cc/150?u=${targetColleague.toLowerCase().replace(/\s/g, '')}`,
      message: recognitionMessage,
      badge: badgeCategory,
      points: pointsToAward,
      timestamp: 'Vừa xong',
      likes: 0,
      likedByUser: false
    };

    setPosts([newPost, ...posts]);
    setAvailableToGive(prev => prev - pointsToAward);
    setTargetColleague('');
    setRecognitionMessage('');
    setShowGiveModal(false);
  };

  const claimReward = (reward: RewardItem) => {
    if (receivedPoints < reward.cost) {
      alert('Anh chưa tích lũy đủ số điểm để đổi phần quà này! Hãy tích cực hỗ trợ đồng nghiệp để nhận thêm điểm thưởng.');
      return;
    }
    if (reward.stock <= 0) {
      alert('Rất tiếc, phần quà này đã hết hàng trong kho quà tặng!');
      return;
    }

    setReceivedPoints(prev => prev - reward.cost);
    setRewards(rewards.map(item => {
      if (item.id === reward.id) {
        return { ...item, stock: item.stock - 1 };
      }
      return item;
    }));
    alert(`Chúc mừng Anh đã đổi quà thành công: ${reward.title}. Mã kích hoạt quà tặng sẽ được gửi trực tiếp tới email của Anh.`);
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
              <Award size={26} className="text-orange-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Ghi nhận & Khen thưởng</h2>
              <p className="text-xs text-blue-200">
                Lan tỏa văn hóa cảm ơn, tuyên dương thành tích xuất sắc và tích lũy điểm thưởng đổi đặc quyền
              </p>
            </div>
          </div>

          <div className="flex space-x-3 shrink-0">
            <button 
              onClick={() => setShowGiveModal(true)}
              className="bg-orange-500 hover:bg-orange-600 transition-all font-bold text-xs px-4 py-2.5 rounded-lg flex items-center space-x-2 cursor-pointer shadow-md"
            >
              <Plus size={14} />
              <span>Gửi ghi nhận & Điểm thưởng</span>
            </button>
          </div>
        </div>

        {/* SUB NAVIGATION TABS */}
        <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex space-x-6 text-sm font-semibold">
            <button 
              onClick={() => setActiveSubTab('wall')}
              className={`pb-1 border-b-2 cursor-pointer transition-all ${
                activeSubTab === 'wall' ? 'border-orange-500 text-white font-bold' : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              Bảng tin Vinh danh
            </button>
            <button 
              onClick={() => setActiveSubTab('leaderboard')}
              className={`pb-1 border-b-2 cursor-pointer transition-all ${
                activeSubTab === 'leaderboard' ? 'border-orange-500 text-white font-bold' : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              Bảng xếp hạng tháng
            </button>
            <button 
              onClick={() => setActiveSubTab('rewards')}
              className={`pb-1 border-b-2 cursor-pointer transition-all ${
                activeSubTab === 'rewards' ? 'border-orange-500 text-white font-bold' : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              Cửa hàng đổi quà
            </button>
          </div>
        </div>
      </div>

      {/* RENDER ACTIVE TAB */}
      <div className="flex-1 flex flex-col space-y-6">
        {activeSubTab === 'wall' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left/Middle: Post Feed */}
            <div className="lg:col-span-2 space-y-4">
              {posts.map((post) => (
                <div 
                  key={post.id}
                  style={cardStyle}
                  className="rounded-[10px] border border-slate-200/60 p-5 shadow-sm space-y-4 transition-all"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <img src={post.senderAvatar} alt={post.senderName} className="w-10 h-10 rounded-full border border-slate-200" />
                        <span className="absolute -bottom-1 -right-1 bg-orange-500 text-white p-0.5 rounded-full text-[8px] font-bold">▶</span>
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-slate-500">
                          <strong className="text-slate-800 text-sm">{post.senderName}</strong> vinh danh <strong className="text-slate-800 text-sm">{post.receiverName}</strong>
                        </div>
                        <span className="text-[10px] text-slate-400 font-medium">{post.timestamp}</span>
                      </div>
                    </div>

                    <div className="flex flex-col items-end space-y-1">
                      <span className="bg-orange-50 text-orange-600 font-black text-xs px-2.5 py-1 rounded-full border border-orange-100 flex items-center space-x-1 shadow-sm">
                        <Zap size={12} className="fill-orange-500 text-orange-500" />
                        <span>+{post.points} Điểm</span>
                      </span>
                      <span className="text-[10px] font-bold text-blue-600 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded">
                        #{post.badge}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed font-medium bg-slate-50/70 border border-slate-100 p-3.5 rounded-lg">
                    "{post.message}"
                  </p>

                  <div className="flex items-center space-x-4 pt-1 border-t border-slate-100">
                    <button 
                      onClick={() => handleLike(post.id)}
                      className={`flex items-center space-x-1.5 text-xs font-bold cursor-pointer transition-colors ${
                        post.likedByUser ? 'text-rose-500' : 'text-slate-400 hover:text-rose-500'
                      }`}
                    >
                      <Heart size={14} className={post.likedByUser ? "fill-rose-500" : ""} />
                      <span>Thích ({post.likes})</span>
                    </button>
                    <button 
                      onClick={() => alert('Chức năng gửi lời chúc mừng thêm dưới dạng comment đang được đồng bộ.')}
                      className="text-xs font-bold text-slate-400 hover:text-slate-600 cursor-pointer flex items-center space-x-1"
                    >
                      <ThumbsUp size={14} />
                      <span>Chúc mừng</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Side: Personal Wallet */}
            <div className="space-y-6">
              
              {/* Wallet Summary */}
              <div 
                style={cardStyle}
                className="rounded-[10px] border border-slate-200/60 p-5 shadow-sm space-y-4 text-center bg-gradient-to-b from-blue-50/50 to-white"
              >
                <h3 className="font-bold text-slate-800 text-sm flex items-center justify-center space-x-1.5">
                  <Sparkles size={16} className="text-orange-500" />
                  <span>Ví điểm thưởng của tôi</span>
                </h3>

                <div className="grid grid-cols-2 gap-4 py-2 border-y border-slate-100">
                  <div className="text-center border-r border-slate-100">
                    <span className="block text-[10px] font-bold text-slate-400 uppercase">Điểm nhận được</span>
                    <span className="text-2xl font-black text-blue-700 block mt-1">{receivedPoints}</span>
                    <span className="text-[9px] text-slate-400 block font-medium">Có thể dùng đổi quà</span>
                  </div>
                  <div className="text-center">
                    <span className="block text-[10px] font-bold text-slate-400 uppercase">Điểm để gửi tặng</span>
                    <span className="text-2xl font-black text-orange-600 block mt-1">{availableToGive}</span>
                    <span className="text-[9px] text-slate-400 block font-medium">Hạn reset: Cuối tháng</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button 
                    onClick={() => setActiveSubTab('rewards')}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-2 px-4 rounded-lg shadow-md transition-all cursor-pointer flex items-center justify-center space-x-2"
                  >
                    <ShoppingBag size={14} />
                    <span>Đến Cửa hàng Đổi Quà</span>
                  </button>
                </div>
              </div>

              {/* Company Core Values Checklist */}
              <div 
                style={cardStyle}
                className="rounded-[10px] border border-slate-200/60 p-5 shadow-sm space-y-4"
              >
                <h3 className="font-bold text-slate-800 text-sm flex items-center space-x-1.5 border-b border-slate-100 pb-2">
                  <Award size={16} className="text-blue-600" />
                  <span>Giá trị cốt lõi doanh nghiệp</span>
                </h3>

                <div className="space-y-2.5 pt-1">
                  {[
                    { hashtag: '#ChuyenMonVuotTroi', title: 'Chuyên môn Vượt trội', desc: 'Làm việc khoa học, tối ưu quy trình, kiến trúc sạch.' },
                    { hashtag: '#KhachHangLaTrongTam', title: 'Khách hàng là Trọng tâm', desc: 'Lắng nghe phản hồi, bảo vệ tối đa trải nghiệm.' },
                    { hashtag: '#ChiaSeDongHanh', title: 'Chia sẻ & Đồng hành', desc: 'Hỗ trợ đồng đội hết mình, tương trợ lúc khó khăn.' },
                    { hashtag: '#SangTaoDotPhá', title: 'Sáng tạo Bứt phá', desc: 'Đề xuất cải tiến hữu ích, tự động hóa tác vụ.' }
                  ].map((val, i) => (
                    <div key={i} className="space-y-0.5 text-xs">
                      <div className="flex justify-between font-bold">
                        <span className="text-slate-800">{val.title}</span>
                        <span className="text-blue-600 text-[10px]">{val.hashtag}</span>
                      </div>
                      <p className="text-[10px] text-slate-400 font-medium">{val.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

        {activeSubTab === 'leaderboard' && (
          <div className="max-w-3xl mx-auto w-full">
            <div 
              style={cardStyle}
              className="rounded-[10px] border border-slate-200/60 p-6 shadow-md space-y-4"
            >
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <h3 className="font-bold text-slate-800 text-base flex items-center space-x-2">
                  <TrendingUp size={18} className="text-orange-500" />
                  <span>Bảng vinh danh Nhân sự nổi bật tháng này</span>
                </h3>
                <span className="text-xs text-slate-400 font-semibold">Cập nhật: 05/07/2026</span>
              </div>

              <div className="space-y-3 pt-2">
                {leaderboard.map((user, index) => (
                  <div 
                    key={index}
                    className={`flex items-center justify-between p-3.5 border rounded-xl transition-all ${
                      user.rank === 1 ? 'bg-amber-50/50 border-amber-200' :
                      user.rank === 2 ? 'bg-slate-50/60 border-slate-200' :
                      'bg-white border-slate-100 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      {/* Rank Indicator */}
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center font-black text-xs ${
                        user.rank === 1 ? 'bg-amber-400 text-white shadow-md' :
                        user.rank === 2 ? 'bg-slate-400 text-white shadow-sm' :
                        user.rank === 3 ? 'bg-orange-400 text-white shadow-sm' :
                        'bg-slate-100 text-slate-500'
                      }`}>
                        {user.rank}
                      </span>

                      {/* Profile info */}
                      <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full border border-slate-200 shadow-sm" />
                      <div>
                        <span className="block font-bold text-slate-800 text-sm">{user.name}</span>
                        <span className="block text-xs text-slate-400 font-semibold">{user.role}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-8">
                      <div className="text-right">
                        <span className="block text-[10px] font-bold text-slate-400 uppercase">Lượt vinh danh</span>
                        <span className="font-bold text-slate-700 text-xs">{user.recognitionsCount} lượt</span>
                      </div>
                      <div className="text-right">
                        <span className="block text-[10px] font-bold text-slate-400 uppercase">Tổng điểm nhận</span>
                        <span className="font-black text-orange-600 text-sm flex items-center justify-end space-x-0.5">
                          <Zap size={12} className="fill-orange-500 text-orange-500" />
                          <span>+{user.pointsReceived}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeSubTab === 'rewards' && (
          <div className="space-y-6">
            
            {/* Quick stats on top */}
            <div className="flex justify-between items-center bg-blue-50 border border-blue-100 rounded-xl p-4">
              <div className="flex items-center space-x-3">
                <Gift size={22} className="text-blue-600 animate-bounce" />
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">Điểm tích lũy hiện có của Anh:</h4>
                  <p className="text-xs text-slate-500 font-medium">Tích cực tuyên dương đóng góp của đồng đội để nhận thêm nhiều điểm thưởng!</p>
                </div>
              </div>
              <div className="bg-white border border-blue-200 shadow-inner rounded-lg px-4 py-2 font-black text-blue-700 text-lg flex items-center space-x-1.5">
                <Zap size={16} className="fill-blue-600 text-blue-600" />
                <span>{receivedPoints} Điểm</span>
              </div>
            </div>

            {/* Grid of Reward Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {rewards.map((reward) => (
                <div 
                  key={reward.id}
                  className="bg-white border border-slate-200/60 rounded-[10px] overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="relative h-40 w-full overflow-hidden bg-slate-100">
                    <img src={reward.image} alt={reward.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                    <span className="absolute top-2.5 left-2.5 bg-slate-900/80 text-white font-bold text-[9px] uppercase px-2 py-0.5 rounded-full backdrop-blur-sm">
                      {reward.category}
                    </span>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold text-slate-800 text-xs line-clamp-2 h-8 leading-tight">{reward.title}</h4>
                      </div>
                      <p className="text-[10px] text-slate-400 font-medium line-clamp-2 leading-relaxed">{reward.description}</p>
                    </div>

                    <div className="space-y-3 pt-2 border-t border-slate-50">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-bold text-slate-400">Tồn kho: {reward.stock} quà</span>
                        <span className="text-sm font-black text-orange-600 flex items-center space-x-0.5 bg-orange-50 border border-orange-100 px-2 py-0.5 rounded-full">
                          <Zap size={12} className="fill-orange-500 text-orange-500" />
                          <span>{reward.cost} Điểm</span>
                        </span>
                      </div>

                      <button 
                        onClick={() => claimReward(reward)}
                        className={`w-full font-bold text-xs py-2 px-3 rounded-lg shadow-sm cursor-pointer transition-colors text-center ${
                          receivedPoints >= reward.cost 
                            ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md' 
                            : 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
                        }`}
                      >
                        Đổi phần quà ngay
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* GIVE RECOGNITION MODAL */}
      {showGiveModal && (
        <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-200">
          <div className="bg-white border border-slate-200 rounded-[10px] p-6 max-w-md w-full shadow-2xl space-y-4">
            <h3 className="font-bold text-slate-800 text-lg flex items-center space-x-2">
              <Award size={20} className="text-orange-500" />
              <span>Gửi Vinh danh & Điểm thưởng</span>
            </h3>

            <form onSubmit={handleGiveRecognition} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 block">Chọn đồng nghiệp</label>
                <select 
                  required
                  value={targetColleague}
                  onChange={(e) => setTargetColleague(e.target.value)}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs font-semibold text-slate-700 focus:border-blue-500 outline-none cursor-pointer"
                >
                  <option value="">-- Chọn nhân sự vinh danh --</option>
                  <option value="Nguyễn Văn A">Nguyễn Văn A (Solutions Architect)</option>
                  <option value="Trần Thị B">Trần Thị B (UX/UI Designer)</option>
                  <option value="David Beckham">David Beckham (Fullstack Engineer)</option>
                  <option value="Elena Rostova">Elena Rostova (CX Advisor)</option>
                  <option value="Vũ Thị F">Vũ Thị F (QA Lead)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 block">Số điểm thưởng gửi tặng</label>
                  <input 
                    type="number" 
                    min={5}
                    max={availableToGive}
                    value={pointsToAward}
                    onChange={(e) => setPointsToAward(parseInt(e.target.value) || 0)}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs font-medium text-slate-700 focus:border-blue-500 outline-none"
                  />
                  <span className="text-[9px] text-slate-400 font-bold block">Tối đa còn: {availableToGive}</span>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 block">Nhãn giá trị cốt lõi</label>
                  <select 
                    value={badgeCategory}
                    onChange={(e) => setBadgeCategory(e.target.value)}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs font-semibold text-slate-700 focus:border-blue-500 outline-none cursor-pointer"
                  >
                    <option value="Chuyên môn Vượt trội">Chuyên môn Vượt trội</option>
                    <option value="Khách hàng là Trọng tâm">Khách hàng là Trọng tâm</option>
                    <option value="Chia sẻ & Đồng hành">Chia sẻ & Đồng hành</option>
                    <option value="Sáng tạo Bứt phá">Sáng tạo Bứt phá</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 block">Nội dung tuyên dương chi tiết</label>
                <textarea 
                  required
                  rows={4}
                  placeholder="Ghi nhận cụ thể đóng góp của đồng nghiệp và tác động tích cực..."
                  value={recognitionMessage}
                  onChange={(e) => setRecognitionMessage(e.target.value)}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs font-medium text-slate-700 focus:border-blue-500 outline-none resize-none"
                />
              </div>

              <div className="flex space-x-2 pt-2 justify-end">
                <button 
                  type="button" 
                  onClick={() => setShowGiveModal(false)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs px-4 py-2 rounded-lg cursor-pointer"
                >
                  Hủy
                </button>
                <button 
                  type="submit" 
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs px-4 py-2 rounded-lg cursor-pointer shadow-md flex items-center space-x-1"
                >
                  <Send size={12} />
                  <span>Đăng Tuyên Dương</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
