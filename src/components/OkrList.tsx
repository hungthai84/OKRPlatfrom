import React, { useState } from 'react';
import { Edit2, Trash2, Plus, Info } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, Cell } from 'recharts';

type KeyResult = {
  id: string;
  name: string;
  progress: number;
};

export type OkrStatus = 'On Track' | 'At Risk' | 'Off Track';

export type Okr = {
  id: string;
  objective: string;
  status: OkrStatus;
  targetDate: string;
  keyResults: KeyResult[];
};

export const initialOkrs: Okr[] = [
  {
    id: '1',
    objective: 'Tăng trưởng doanh thu Quý 3 thêm 20%',
    status: 'On Track',
    targetDate: '2026-09-30',
    keyResults: [
      { id: 'kr1', name: 'Đóng 10 hợp đồng doanh nghiệp lớn', progress: 75 },
      { id: 'kr2', name: 'Tăng quy mô hợp đồng trung bình lên $50,000', progress: 40 },
    ],
  },
  {
    id: '2',
    objective: 'Ra mắt ứng dụng di động phiên bản mới',
    status: 'At Risk',
    targetDate: '2026-08-15',
    keyResults: [
      { id: 'kr3', name: 'Hoàn thành thử nghiệm bản Beta với 500 người dùng', progress: 90 },
      { id: 'kr4', name: 'Khắc phục toàn bộ các lỗi nghiêm trọng (Critical Bugs)', progress: 30 },
    ],
  },
];

const statusColors = {
  'On Track': '#38c5b8',
  'At Risk': '#f39c12',
  'Off Track': '#e74c3c',
};

const statusLabels = {
  'On Track': 'Đúng tiến độ',
  'At Risk': 'Có rủi ro',
  'Off Track': 'Chậm trễ',
};

export function OkrList({ 
  filterStatus, 
  onAddClick,
  okrs,
  setOkrs
}: { 
  filterStatus: string | null; 
  onAddClick: () => void;
  okrs: Okr[];
  setOkrs: React.Dispatch<React.SetStateAction<Okr[]>>;
}) {

  const filteredOkrs = filterStatus
    ? okrs.filter(okr => okr.status === filterStatus)
    : okrs;

  const handleDelete = (id: string) => {
    setOkrs(okrs.filter(okr => okr.id !== id));
  };

  return (
    <div className="mt-2 space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-800 font-bold text-base">Danh sách OKR cá nhân</h3>
        <button
          onClick={onAddClick}
          className="flex items-center space-x-1.5 bg-blue-600 text-white px-3.5 py-1.5 rounded-lg text-xs font-bold hover:bg-blue-700 transition-colors shadow-sm cursor-pointer"
        >
          <Plus size={14} />
          <span>Thêm OKR mới</span>
        </button>
      </div>

      <div className="space-y-4">
        {filteredOkrs.map(okr => (
          <div key={okr.id} className="bg-white/80 rounded-xl shadow-sm border border-gray-100 p-5">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="text-sm font-bold text-gray-800 leading-snug">{okr.objective}</h4>
                <div className="flex items-center space-x-3 mt-1 text-xs">
                  <span
                    className="px-2 py-0.5 rounded text-[10px] font-bold text-white shadow-sm"
                    style={{ backgroundColor: statusColors[okr.status] }}
                  >
                    {statusLabels[okr.status]}
                  </span>
                  <span className="text-gray-500 font-medium">Hạn chót: {okr.targetDate}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="relative group">
                  <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer">
                    <Edit2 size={14} />
                  </button>
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-max bg-gray-800 text-white text-[10px] px-2 py-1 rounded">
                    Chỉnh sửa mục tiêu này
                  </div>
                </div>
                
                <div className="relative group">
                  <button 
                    onClick={() => handleDelete(okr.id)}
                    className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                  >
                    <Trash2 size={14} />
                  </button>
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-max bg-gray-800 text-white text-[10px] px-2 py-1 rounded">
                    Xóa mục tiêu này hoàn toàn
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-100/50 pt-4">
              <h5 className="text-xs font-bold text-gray-500 mb-3 flex items-center">
                <span>Tiến độ Kết quả then chốt (Key Results)</span>
                <div className="relative group ml-1">
                  <Info size={12} className="text-gray-400" />
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block w-48 bg-gray-800 text-white text-[10px] px-2 py-1 rounded text-center z-10">
                    Trực quan hóa bằng biểu đồ Recharts
                  </div>
                </div>
              </h5>
              
              <div className="space-y-3.5">
                {okr.keyResults.map(kr => (
                  <div key={kr.id} className="flex items-center">
                    <div className="w-1/3 text-xs font-medium text-gray-700 truncate pr-4" title={kr.name}>
                      {kr.name}
                    </div>
                    <div className="w-2/3 h-5">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          layout="vertical"
                          data={[{ name: kr.name, progress: kr.progress, remaining: 100 - kr.progress }]}
                          margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                        >
                          <XAxis type="number" domain={[0, 100]} hide />
                          <YAxis dataKey="name" type="category" hide />
                          <RechartsTooltip 
                            formatter={(value: number) => [`${value}%`, 'Tiến độ']}
                            labelStyle={{ display: 'none' }}
                          />
                          <Bar dataKey="progress" stackId="a" fill={statusColors[okr.status]} radius={[2, 0, 0, 2]} />
                          <Bar dataKey="remaining" stackId="a" fill="#e5e7eb" radius={[0, 2, 2, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="ml-3 text-xs font-bold text-gray-600 w-10 text-right">
                      {kr.progress}%
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
        {filteredOkrs.length === 0 && (
          <div className="text-center py-8 text-xs text-gray-500 bg-white/80 rounded-xl border border-gray-200">
            Không tìm thấy OKR nào phù hợp với bộ lọc đã chọn.
          </div>
        )}
      </div>
    </div>
  );
}
