import React, { useState } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import { OkrStatus } from './OkrList';

type AddOkrModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (okr: { objective: string; targetDate: string; status: OkrStatus; keyResults: { name: string; progress: number }[] }) => void;
};

export function AddOkrModal({ isOpen, onClose, onAdd }: AddOkrModalProps) {
  const [objective, setObjective] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [status, setStatus] = useState<OkrStatus>('On Track');
  const [keyResults, setKeyResults] = useState([{ name: '', progress: 0 }]);

  if (!isOpen) return null;

  const handleAddKr = () => {
    setKeyResults([...keyResults, { name: '', progress: 0 }]);
  };

  const handleKrChange = (index: number, field: string, value: string | number) => {
    const newKrs = [...keyResults];
    newKrs[index] = { ...newKrs[index], [field]: value };
    setKeyResults(newKrs);
  };

  const handleRemoveKr = (index: number) => {
    const newKrs = keyResults.filter((_, i) => i !== index);
    setKeyResults(newKrs);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({ objective, targetDate, status, keyResults });
    // Reset form fields
    setObjective('');
    setTargetDate('');
    setStatus('On Track');
    setKeyResults([{ name: '', progress: 0 }]);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-5 border-b border-gray-100 sticky top-0 bg-white z-10">
          <h2 className="text-base font-bold text-gray-800">Tạo Mục tiêu mới (OKR)</h2>
          <button onClick={onClose} className="p-1 text-gray-400 hover:bg-gray-100 rounded-full transition-colors cursor-pointer">
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-5 space-y-5">
          <div className="space-y-4">
            <h3 className="font-bold text-xs text-gray-400 uppercase tracking-wider border-b border-gray-100 pb-2">Chi tiết Mục tiêu chính (Objective)</h3>
            
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">Tên mục tiêu chính</label>
              <input
                type="text"
                required
                value={objective}
                onChange={(e) => setObjective(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Ví dụ: Tăng trưởng doanh thu Quý 4 thêm 15%"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Hạn chót hoàn thành</label>
                <input
                  type="date"
                  required
                  value={targetDate}
                  onChange={(e) => setTargetDate(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Trạng thái ban đầu</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as OkrStatus)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="On Track">Đúng tiến độ (On Track)</option>
                  <option value="At Risk">Có rủi ro (At Risk)</option>
                  <option value="Off Track">Chậm trễ (Off Track)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-2">
              <h3 className="font-bold text-xs text-gray-400 uppercase tracking-wider">Kết quả then chốt (Key Results)</h3>
              <button
                type="button"
                onClick={handleAddKr}
                className="text-xs flex items-center font-bold text-blue-600 hover:text-blue-800 cursor-pointer"
              >
                <Plus size={14} className="mr-1" /> Thêm KR mới
              </button>
            </div>
            
            <div className="space-y-3">
              {keyResults.map((kr, index) => (
                <div key={index} className="flex items-start space-x-3 bg-gray-50 p-3 rounded-lg border border-gray-100">
                  <div className="flex-1 space-y-3">
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 mb-1">Tên Kết quả then chốt (Key Result)</label>
                      <input
                        type="text"
                        required
                        value={kr.name}
                        onChange={(e) => handleKrChange(index, 'name', e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Ví dụ: Đạt được 500 khách hàng đăng ký mới"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 mb-1">Tiến độ hiện tại (%)</label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        required
                        value={kr.progress}
                        onChange={(e) => handleKrChange(index, 'progress', parseInt(e.target.value) || 0)}
                        className="w-full border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  {keyResults.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveKr(index)}
                      className="mt-6 p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                      title="Xóa kết quả then chốt này"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          <div className="pt-4 flex justify-end space-x-3 border-t border-gray-100 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-xs font-bold text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg text-xs font-bold hover:from-blue-700 hover:to-indigo-700 transition-colors cursor-pointer shadow-md"
            >
              Lưu OKR
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
