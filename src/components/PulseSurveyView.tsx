import React, { useState } from 'react';
import { 
  ClipboardList, 
  Plus, 
  Users, 
  CheckCircle2, 
  BarChart2, 
  MessageSquare, 
  PieChart, 
  Send, 
  ThumbsUp,
  TrendingUp,
  AlertCircle
} from 'lucide-react';

type PulseSurveyViewProps = {
  cardOpacity: number;
};

interface SurveyCampaign {
  id: string;
  title: string;
  status: 'Draft' | 'Active' | 'Closed';
  endDate: string;
  responsesCount: number;
  totalTarget: number;
  participationRate: number; // Percentage
  averageScore: number; // e.g., 4.2 / 5
  enpsScore: number; // -100 to 100
}

interface SentimentSummary {
  positive: number;
  neutral: number;
  negative: number;
}

export default function PulseSurveyView({ cardOpacity }: PulseSurveyViewProps) {
  const [activeSubTab, setActiveSubTab] = useState<'surveys' | 'take' | 'enps'>('surveys');
  const [showAddSurveyModal, setShowAddSurveyModal] = useState(false);

  // Survey campaigns state
  const [campaigns, setCampaigns] = useState<SurveyCampaign[]>([
    {
      id: 'sc-1',
      title: 'Khảo sát Định kỳ về Mức độ Gắn kết của Nhân viên Q2 - 2026',
      status: 'Active',
      endDate: '25/07/2026',
      responsesCount: 104,
      totalTarget: 120,
      participationRate: 86.6,
      averageScore: 4.4,
      enpsScore: 52
    },
    {
      id: 'sc-2',
      title: 'Khảo sát Ý kiến về Không gian làm việc Số & Hỗ trợ Thiết bị',
      status: 'Active',
      endDate: '15/07/2026',
      responsesCount: 78,
      totalTarget: 120,
      participationRate: 65.0,
      averageScore: 3.9,
      enpsScore: 28
    },
    {
      id: 'sc-3',
      title: 'Đo lường Chỉ số Thấu cảm của Nhà quản lý năm 2026',
      status: 'Closed',
      endDate: '30/06/2026',
      responsesCount: 120,
      totalTarget: 120,
      participationRate: 100,
      averageScore: 4.5,
      enpsScore: 64
    }
  ]);

  // eNPS Distribution Data State
  const [enpsDistribution, setEnpsDistribution] = useState({
    promoters: 62,  // 9-10 rating (%)
    passives: 28,   // 7-8 rating (%)
    detractors: 10  // 0-6 rating (%)
  });

  // Current user interactive survey state
  const [surveyQuestions, setSurveyQuestions] = useState([
    { id: 1, text: 'Tôi được cung cấp đầy đủ các trang thiết bị và phần mềm tối ưu để hoàn thành tốt công việc phát triển.', score: 0 },
    { id: 2, text: 'Mục tiêu cá nhân và lộ trình học tập của tôi được căn chỉnh trực tiếp với tầm nhìn chiến lược của công ty.', score: 0 },
    { id: 3, text: 'Quản lý trực tiếp luôn lắng nghe, đồng hành và hỗ trợ giải quyết khó khăn một cách nhanh chóng.', score: 0 },
    { id: 4, text: 'Tôi tự hào khi làm việc tại Power Service và sẵn sàng cống hiến đóng góp sáng kiến phát triển.', score: 0 }
  ]);

  const [enpsVote, setEnpsVote] = useState<number>(-1); // -1 is unvoted, 0-10 scale
  const [submittedUserSurvey, setSubmittedUserSurvey] = useState(false);

  // New survey campaign states
  const [newSurveyTitle, setNewSurveyTitle] = useState('');
  const [newSurveyEndDate, setNewSurveyEndDate] = useState('31/07/2026');

  const handleAddSurvey = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSurveyTitle) return;

    const newCampaign: SurveyCampaign = {
      id: `sc-${Date.now()}`,
      title: newSurveyTitle,
      status: 'Draft',
      endDate: newSurveyEndDate,
      responsesCount: 0,
      totalTarget: 120,
      participationRate: 0,
      averageScore: 0,
      enpsScore: 0
    };

    setCampaigns([newCampaign, ...campaigns]);
    setNewSurveyTitle('');
    setShowAddSurveyModal(false);
  };

  const handleRateQuestion = (qId: number, rating: number) => {
    setSurveyQuestions(surveyQuestions.map(q => {
      if (q.id === qId) {
        return { ...q, score: rating };
      }
      return q;
    }));
  };

  const handleSubmitSurveyForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (surveyQuestions.some(q => q.score === 0) || enpsVote === -1) {
      alert('Vui lòng trả lời đầy đủ các câu hỏi khảo sát và chọn mức độ khuyên dùng (eNPS) để tiếp tục.');
      return;
    }

    // Dynamic update eNPS breakdown based on user's vote
    let p = enpsDistribution.promoters;
    let pas = enpsDistribution.passives;
    let det = enpsDistribution.detractors;

    if (enpsVote >= 9) {
      p += 1;
    } else if (enpsVote >= 7) {
      pas += 1;
    } else {
      det += 1;
    }

    const total = p + pas + det;
    const promotersPercent = Math.round((p / total) * 100);
    const passivesPercent = Math.round((pas / total) * 100);
    const detractorsPercent = 100 - promotersPercent - passivesPercent;

    setEnpsDistribution({
      promoters: promotersPercent,
      passives: passivesPercent,
      detractors: detractorsPercent
    });

    // Update active campaign participation count
    setCampaigns(campaigns.map(camp => {
      if (camp.id === 'sc-1') {
        const newCount = camp.responsesCount + 1;
        const newRate = parseFloat(((newCount / camp.totalTarget) * 100).toFixed(1));
        const newEnps = promotersPercent - detractorsPercent;
        return {
          ...camp,
          responsesCount: newCount,
          participationRate: newRate,
          enpsScore: newEnps
        };
      }
      return camp;
    }));

    setSubmittedUserSurvey(true);
    alert('Cảm ơn Anh đã tham gia khảo sát ý kiến phát triển của Power Service! Ý kiến đóng góp vô danh của Anh sẽ giúp cải tiến chất lượng môi trường làm việc đáng kể.');
  };

  const computedEnps = enpsDistribution.promoters - enpsDistribution.detractors;

  const cardStyle = { 
    backgroundColor: `rgba(255, 255, 255, ${cardOpacity / 100})`,
    backdropFilter: 'blur(12px)'
  };

  return (
    <div className="flex-1 overflow-auto p-6 space-y-6 flex flex-col select-none">
      
      {/* HEADER BANNER */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-800 to-slate-900 rounded-[10px] shadow-lg p-6 text-white relative overflow-hidden transition-all duration-300 shrink-0">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 z-10 relative">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center animate-pulse">
              <ClipboardList size={26} className="text-orange-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Khảo sát ý kiến phát triển</h2>
              <p className="text-xs text-blue-200">
                Thực thi các chiến dịch khảo sát định kỳ, đo lường chỉ số gắn kết eNPS và khai phóng ý kiến phản hồi ẩn danh
              </p>
            </div>
          </div>

          <div className="flex space-x-3 shrink-0">
            <button 
              onClick={() => setShowAddSurveyModal(true)}
              className="bg-orange-500 hover:bg-orange-600 transition-all font-bold text-xs px-4 py-2.5 rounded-lg flex items-center space-x-2 cursor-pointer shadow-md"
            >
              <Plus size={14} />
              <span>Thiết lập đợt khảo sát mới</span>
            </button>
          </div>
        </div>

        {/* SUB NAVIGATION TABS */}
        
      </div>

      {/* Sub-navigation Tabs */}
      <div className="flex border-b border-gray-200 dark:border-slate-800 mb-2 bg-white dark:bg-slate-900 rounded-xl p-1.5 shadow-sm border shrink-0">
        <div className="flex flex-wrap items-center justify-between gap-4 w-full px-2 py-1">
          
          <div className="flex space-x-6 text-sm font-semibold">
            <button 
              onClick={() => setActiveSubTab('surveys')}
              className={`pb-1 border-b-2 cursor-pointer transition-all ${
                activeSubTab === 'surveys' ? 'border-orange-500 text-slate-800 dark:text-slate-200 font-bold' : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:text-slate-200'
              }`}
            >
              Chiến dịch khảo sát ({campaigns.length})
            </button>
            <button 
              onClick={() => setActiveSubTab('take')}
              className={`pb-1 border-b-2 cursor-pointer transition-all ${
                activeSubTab === 'take' ? 'border-orange-500 text-slate-800 dark:text-slate-200 font-bold' : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:text-slate-200'
              }`}
            >
              Tham gia khảo sát hiện tại {submittedUserSurvey ? '(Đã làm)' : '(1)'}
            </button>
            <button 
              onClick={() => setActiveSubTab('enps')}
              className={`pb-1 border-b-2 cursor-pointer transition-all ${
                activeSubTab === 'enps' ? 'border-orange-500 text-slate-800 dark:text-slate-200 font-bold' : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:text-slate-200'
              }`}
            >
              Báo cáo eNPS & Thống kê
            </button>
          </div>
        
        </div>
      </div>


      {/* RENDER ACTIVE SUBTAB */}
      <div className="flex-1 flex flex-col space-y-6">
        {activeSubTab === 'surveys' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left/Middle: Campaigns List */}
            <div className="lg:col-span-2 space-y-4">
              {campaigns.map((camp) => (
                <div 
                  key={camp.id}
                  style={cardStyle}
                  className="rounded-[10px] border border-slate-200/60 p-5 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center space-x-2">
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                        camp.status === 'Active' ? 'bg-green-100 text-green-700 border border-green-200' :
                        camp.status === 'Closed' ? 'bg-gray-100 text-gray-700 border border-gray-200' :
                        'bg-orange-100 text-orange-700 border border-orange-200'
                      }`}>
                        {camp.status === 'Active' ? 'Đang mở' : camp.status === 'Closed' ? 'Đã đóng' : 'Bản nháp'}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">Hạn chót: {camp.endDate}</span>
                    </div>

                    <h3 className="font-bold text-slate-800 text-sm">{camp.title}</h3>
                    
                    {/* Progress Participation bar */}
                    <div className="space-y-1.5 pt-2 max-w-sm">
                      <div className="flex justify-between text-[10px] font-bold text-slate-500">
                        <span>Số lượng phản hồi: {camp.responsesCount} / {camp.totalTarget} nhân sự</span>
                        <span>{camp.participationRate}%</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                        <div 
                          className="bg-blue-600 h-full rounded-full transition-all duration-500"
                          style={{ width: `${camp.participationRate}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Summary performance inside this survey */}
                  <div className="border-t md:border-t-0 md:border-l border-slate-200/60 pt-4 md:pt-0 md:pl-6 flex md:flex-col justify-around md:justify-center items-center md:items-stretch gap-6 md:gap-3 min-w-[140px]">
                    <div className="text-center md:text-left">
                      <span className="block text-[9px] font-bold text-slate-400 uppercase">Điểm trung bình</span>
                      <span className="text-lg font-black text-slate-800">{camp.averageScore > 0 ? `${camp.averageScore} / 5.0` : 'Chưa có'}</span>
                    </div>
                    
                    <div className="text-center md:text-left">
                      <span className="block text-[9px] font-bold text-slate-400 uppercase">Điểm eNPS</span>
                      <span className={`text-lg font-black ${
                        camp.enpsScore >= 50 ? 'text-green-600' : camp.enpsScore >= 10 ? 'text-blue-600' : 'text-orange-500'
                      }`}>
                        {camp.status !== 'Draft' ? `${camp.enpsScore >= 0 ? '+' : ''}${camp.enpsScore}` : 'Chưa có'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Side: Quick Survey Analytics */}
            <div className="space-y-6">
              
              <div 
                style={cardStyle}
                className="rounded-[10px] border border-slate-200/60 p-5 shadow-sm space-y-4"
              >
                <h3 className="font-bold text-slate-800 text-sm flex items-center space-x-1.5">
                  <BarChart2 size={16} className="text-blue-600" />
                  <span>Chỉ số eNPS là gì?</span>
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  <strong>Employee Net Promoter Score (eNPS)</strong> là chỉ số chuẩn mực toàn cầu dùng để đo lường mức độ gắn kết, lòng trung thành và sự sẵn sàng giới thiệu doanh nghiệp làm nơi làm việc lý tưởng của nhân sự.
                </p>

                <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-500 font-medium">
                  <div className="flex items-start space-x-2">
                    <span className="text-green-600 font-bold">🟢 9 - 10: Promoters (Cổ vũ)</span>
                    <span>Tuyệt đối gắn kết, hạnh phúc và cống hiến.</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-slate-400 font-bold">🟡 7 - 8: Passives (Thụ động)</span>
                    <span>Hài lòng trung bình nhưng có thể rời đi khi có cơ hội.</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-orange-500 font-bold">🔴 0 - 6: Detractors (Phản đối)</span>
                    <span>Không gắn kết, dễ lan truyền tiêu cực.</span>
                  </div>
                </div>

                <div className="p-3 bg-blue-50/70 border border-blue-100 rounded-lg text-xs text-blue-800 font-bold flex items-center space-x-1.5 leading-snug">
                  <AlertCircle size={16} className="text-blue-600 shrink-0" />
                  <span>Công thức: eNPS = % Promoters - % Detractors. Biên độ dao động từ -100 đến +100.</span>
                </div>
              </div>

            </div>
          </div>
        )}

        {activeSubTab === 'take' && (
          <div className="max-w-2xl mx-auto w-full">
            <div 
              style={cardStyle}
              className="rounded-[10px] border border-slate-200/60 p-6 shadow-md space-y-5"
            >
              <div className="border-b border-slate-100 pb-3 flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-slate-800 text-base">Khảo sát Ý kiến & Gắn kết Định kỳ Q2</h3>
                  <span className="text-[10px] text-slate-400 font-bold block mt-1 uppercase">Hộp thư khảo sát ẩn danh 100% bảo mật</span>
                </div>
                <span className="text-xs bg-green-50 text-green-700 border border-green-200 font-bold px-2.5 py-1 rounded-full">
                  Khảo sát đang mở
                </span>
              </div>

              {submittedUserSurvey ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-green-50 text-green-600 flex items-center justify-center mx-auto shadow-inner animate-bounce">
                    <CheckCircle2 size={32} />
                  </div>
                  <div className="space-y-2 max-w-md mx-auto">
                    <h4 className="font-bold text-slate-800 text-lg">Anh đã hoàn tất khảo sát này!</h4>
                    <p className="text-xs text-slate-400 leading-relaxed font-medium">
                      Phản hồi ẩn danh của Anh đã được hệ thống ghi nhận thành công và tự động cộng dồn vào thống kê điểm số eNPS chung của Power Service.
                    </p>
                  </div>
                  <button 
                    onClick={() => setActiveSubTab('enps')}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2 rounded-lg shadow transition-all cursor-pointer inline-flex items-center space-x-1"
                  >
                    <span>Xem báo cáo eNPS chung</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmitSurveyForm} className="space-y-6">
                  {/* List of score questions */}
                  <div className="space-y-4">
                    {surveyQuestions.map((q) => (
                      <div key={q.id} className="space-y-2 p-3 bg-slate-50/70 border border-slate-100 rounded-xl">
                        <p className="text-xs font-bold text-slate-700">{q.id}. {q.text}</p>
                        
                        {/* 1 to 5 score selection */}
                        <div className="flex justify-between items-center pt-1 max-w-sm">
                          <span className="text-[10px] text-slate-400 font-bold">Hoàn toàn không đồng ý</span>
                          <div className="flex space-x-2 mx-4">
                            {[1, 2, 3, 4, 5].map((score) => (
                              <button
                                key={score}
                                type="button"
                                onClick={() => handleRateQuestion(q.id, score)}
                                className={`w-8 h-8 rounded-full border text-xs font-black transition-all cursor-pointer ${
                                  q.score === score 
                                    ? 'bg-blue-600 border-blue-600 text-white shadow-md scale-110' 
                                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300'
                                }`}
                              >
                                {score}
                              </button>
                            ))}
                          </div>
                          <span className="text-[10px] text-slate-400 font-bold">Hoàn toàn đồng ý</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* NPS Question (0 to 10 scale) */}
                  <div className="space-y-3 p-4 bg-orange-50/50 border border-orange-100 rounded-xl">
                    <p className="text-xs font-black text-slate-800">
                      Q5: Trên thang điểm từ 0 đến 10, Anh sẵn sàng khuyên dùng Power Service là môi trường làm việc tuyệt vời cho bạn bè hoặc đồng nghiệp khác như thế nào?
                    </p>

                    <div className="flex flex-col space-y-2">
                      <div className="grid grid-cols-11 gap-1 pt-2">
                        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                          <button
                            key={num}
                            type="button"
                            onClick={() => setEnpsVote(num)}
                            className={`aspect-square rounded-lg border font-black text-xs transition-all cursor-pointer flex items-center justify-center ${
                              enpsVote === num 
                                ? num >= 9 ? 'bg-green-600 border-green-600 text-white shadow' :
                                  num >= 7 ? 'bg-amber-400 border-amber-400 text-white shadow' :
                                  'bg-orange-500 border-orange-500 text-white shadow'
                                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                            }`}
                          >
                            {num}
                          </button>
                        ))}
                      </div>

                      <div className="flex justify-between text-[9px] font-bold text-slate-400 px-1">
                        <span>0: Hoàn toàn không khuyên dùng</span>
                        <span>5: Trung lập</span>
                        <span>10: Chắc chắn khuyên dùng</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-2">
                    <span className="text-[10px] text-slate-400 italic">Ý kiến của Anh sẽ được tự động bảo mật mã hóa ẩn danh.</span>
                    <button 
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-5 py-2.5 rounded-lg shadow-md transition-all cursor-pointer flex items-center space-x-1.5"
                    >
                      <Send size={14} />
                      <span>Gửi phản hồi ẩn danh</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}

        {activeSubTab === 'enps' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left: eNPS Score Big Circle Gauge */}
            <div 
              style={cardStyle}
              className="rounded-[10px] border border-slate-200/60 p-5 shadow-sm text-center flex flex-col justify-center items-center space-y-4"
            >
              <h3 className="font-bold text-slate-800 text-sm">Chỉ số eNPS Doanh nghiệp hiện tại</h3>
              
              <div className="relative w-36 h-36 rounded-full border-8 border-slate-100 flex flex-col justify-center items-center shadow-inner">
                <span className={`text-4xl font-black ${computedEnps >= 50 ? 'text-green-600' : 'text-blue-600'}`}>
                  {computedEnps >= 0 ? '+' : ''}{computedEnps}
                </span>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Sức khỏe Tốt</span>
              </div>

              <p className="text-xs text-slate-500 max-w-xs font-medium leading-relaxed">
                Độ gắn kết vượt chuẩn trung bình ngành công nghệ khu vực châu Á ({computedEnps} so với trung vị 24).
              </p>
            </div>

            {/* Middle: Distribution breakdowns */}
            <div 
              style={cardStyle}
              className="lg:col-span-2 rounded-[10px] border border-slate-200/60 p-5 shadow-sm space-y-6"
            >
              <h3 className="font-bold text-slate-800 text-sm flex items-center space-x-1.5 border-b border-slate-100 pb-2">
                <PieChart size={16} className="text-blue-600" />
                <span>Cấu trúc phân bổ đối tượng eNPS</span>
              </h3>

              <div className="space-y-4 pt-2">
                {/* Promoter Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-bold text-green-700">
                    <span className="flex items-center space-x-1">
                      <span>🟢 Cổ vũ (Promoters - Điểm 9, 10)</span>
                    </span>
                    <span>{enpsDistribution.promoters}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                    <div className="bg-green-500 h-full rounded-full" style={{ width: `${enpsDistribution.promoters}%` }} />
                  </div>
                </div>

                {/* Passive Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-bold text-slate-600">
                    <span>🟡 Thụ động (Passives - Điểm 7, 8)</span>
                    <span>{enpsDistribution.passives}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                    <div className="bg-slate-400 h-full rounded-full" style={{ width: `${enpsDistribution.passives}%` }} />
                  </div>
                </div>

                {/* Detractor Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-bold text-orange-600">
                    <span>🔴 Phản đối (Detractors - Điểm 0-6)</span>
                    <span>{enpsDistribution.detractors}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                    <div className="bg-orange-500 h-full rounded-full" style={{ width: `${enpsDistribution.detractors}%` }} />
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex justify-between items-center text-xs text-slate-400 font-semibold">
                <span>Số lượng mẫu: 104 nhân sự</span>
                <span>Khảo sát lần cuối: Hôm nay</span>
              </div>
            </div>

          </div>
        )}
      </div>

      {/* CREATE SURVEY MODAL */}
      {showAddSurveyModal && (
        <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-200">
          <div className="bg-white border border-slate-200 rounded-[10px] p-6 max-w-md w-full shadow-2xl space-y-4">
            <h3 className="font-bold text-slate-800 text-lg">Khởi chạy Chiến dịch Khảo sát mới</h3>
            <form onSubmit={handleAddSurvey} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 block">Tiêu đề đợt khảo sát ý kiến</label>
                <input 
                  type="text" 
                  required
                  placeholder="Ví dụ: Khảo sát Ý kiến về Phúc lợi & Môi trường Q3"
                  value={newSurveyTitle}
                  onChange={(e) => setNewSurveyTitle(e.target.value)}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs font-medium text-slate-700 focus:border-blue-500 outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 block">Thời hạn đóng khảo sát</label>
                <input 
                  type="text" 
                  value={newSurveyEndDate}
                  onChange={(e) => setNewSurveyEndDate(e.target.value)}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs font-medium text-slate-700 focus:border-blue-500 outline-none"
                />
              </div>

              <div className="flex space-x-2 pt-2 justify-end">
                <button 
                  type="button" 
                  onClick={() => setShowAddSurveyModal(false)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs px-4 py-2 rounded-lg cursor-pointer"
                >
                  Hủy
                </button>
                <button 
                  type="submit" 
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs px-4 py-2 rounded-lg cursor-pointer shadow-md"
                >
                  Khởi chạy khảo sát
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
