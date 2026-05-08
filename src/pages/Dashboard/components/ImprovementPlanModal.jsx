import React, { useState } from 'react';
import { X, FileText, CheckCircle2, AlertCircle, Clock, Target, ShieldAlert } from 'lucide-react';

const ImprovementPlanModal = ({ isOpen, onClose, courseName, setToastMessage }) => {
  const [priority, setPriority] = useState('Cao');
  const [impact, setImpact] = useState('Nghiêm trọng');
  const [status, setStatus] = useState('Chờ duyệt');
  const [targetKPI, setTargetKPI] = useState(85);
  
  if (!isOpen) return null;

  const StatusBadge = ({ currentStatus }) => {
    const colors = {
      'Chờ duyệt': 'bg-amber-50 text-amber-600 border-amber-100',
      'Đang thực hiện': 'bg-indigo-50 text-indigo-600 border-indigo-100',
      'Quá hạn': 'bg-rose-50 text-rose-600 border-rose-100',
      'Hoàn thành': 'bg-emerald-50 text-emerald-600 border-emerald-100'
    };
    return (
      <span className={`px-2 py-0.5 rounded-lg text-[8px] font-black uppercase tracking-widest border ${colors[currentStatus]}`}>
        {currentStatus}
      </span>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white dark:bg-gray-900 w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-gray-100 dark:border-gray-800 animate-in zoom-in-95 duration-300 max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between bg-indigo-50/50 dark:bg-indigo-900/10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-600 text-white rounded-xl shadow-lg">
              <Target size={20} />
            </div>
            <div>
              <h3 className="text-base font-black text-gray-900 dark:text-white uppercase tracking-tight">Chiến lược Cải thiện Học vụ</h3>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{courseName}</span>
                <span className="w-1 h-1 rounded-full bg-gray-300" />
                <StatusBadge currentStatus={status} />
              </div>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors">
            <X size={20} className="text-gray-400" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 scrollbar-none">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Analysis */}
            <div className="lg:col-span-7 space-y-6">
              <div className="p-4 bg-rose-50 dark:bg-rose-900/10 rounded-2xl border border-rose-100 dark:border-rose-800 flex gap-3 items-start">
                <AlertCircle className="text-rose-600 mt-0.5" size={18} />
                <div>
                  <p className="text-xs text-rose-900 dark:text-rose-400 font-black uppercase tracking-tight mb-0.5">Cảnh báo Hiệu suất</p>
                  <p className="text-[10px] text-rose-800/80 dark:text-rose-500 font-medium leading-relaxed">
                    Môn học này đang có tỉ lệ hoàn thành 64%, thấp hơn mức chuẩn 11%. Kế hoạch này là bắt buộc để duy trì kiểm định AUN-QA.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">Nguyên nhân cốt lõi</label>
                  <select className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border-2 border-gray-50 dark:border-gray-700 rounded-xl text-[11px] font-bold text-gray-700 dark:text-gray-200 outline-none focus:ring-2 focus:ring-indigo-500/10">
                    <option>Cấu trúc đề thi không bám sát chuẩn</option>
                    <option>Sinh viên hổng kiến thức nền tảng</option>
                    <option>Tỉ lệ vắng học tăng đột biến</option>
                    <option>Thiếu hụt học liệu thực hành</option>
                  </select>
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">Mức ảnh hưởng</label>
                  <select 
                    value={impact}
                    onChange={(e) => setImpact(e.target.value)}
                    className={`w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border-2 border-gray-50 dark:border-gray-700 rounded-xl text-[11px] font-bold outline-none focus:ring-2 focus:ring-indigo-500/10 ${
                      impact === 'Nghiêm trọng' ? 'text-rose-600' : 'text-gray-700'
                    }`}
                  >
                    <option>Thấp</option>
                    <option>Trung bình</option>
                    <option>Cao</option>
                    <option>Nghiêm trọng</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">Giải pháp thực thi chi tiết</label>
                <textarea 
                  placeholder="Mô tả cụ thể lộ trình..."
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border-2 border-gray-50 dark:border-gray-700 rounded-2xl text-[11px] font-medium h-32 focus:ring-2 focus:ring-indigo-500/10 outline-none transition-all scrollbar-none"
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">Thời hạn & Đánh giá lại</label>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[8px] font-black text-gray-400 w-12 uppercase">Kết thúc:</span>
                      <input type="date" className="flex-1 px-3 py-1.5 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg text-[10px] font-bold" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[8px] font-black text-indigo-500 w-12 uppercase">Re-check:</span>
                      <input type="date" defaultValue="2026-06-30" className="flex-1 px-3 py-1.5 bg-indigo-50/50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800 rounded-lg text-[10px] font-black text-indigo-600" />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">Trách nhiệm & Ưu tiên</label>
                  <div className="space-y-2">
                    <input type="text" defaultValue="Trưởng bộ môn & GV chính" className="w-full px-3 py-1.5 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg text-[10px] font-bold" />
                    <div className="flex gap-1">
                      {['Thấp', 'Trung bình', 'Cao'].map(p => (
                        <button 
                          key={p}
                          onClick={() => setPriority(p)}
                          className={`flex-1 py-1.5 rounded-lg text-[8px] font-black uppercase tracking-widest transition-all ${
                            priority === p ? 'bg-slate-900 text-white shadow-md' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
                          }`}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Targets */}
            <div className="lg:col-span-5 space-y-8 border-l border-gray-100 dark:border-gray-800 pl-8">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-[9px] font-black text-gray-400 uppercase tracking-widest">Mục tiêu KPI (Kỳ vọng)</label>
                  <span className="text-xl font-black text-indigo-600">{targetKPI}%</span>
                </div>
                <input 
                  type="range" min="50" max="100" value={targetKPI} 
                  onChange={(e) => setTargetKPI(e.target.value)}
                  className="w-full h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full appearance-none cursor-pointer accent-indigo-600"
                />
                <div className="flex justify-between mt-2">
                  <span className="text-[8px] font-black text-gray-400 uppercase">Hiện tại: 64%</span>
                  <div className="flex flex-col items-end">
                    <span className="text-[9px] font-black text-indigo-600 uppercase">Cần cải thiện +{targetKPI - 64}%</span>
                    <span className="text-[7px] font-bold text-gray-400 uppercase italic">Thiếu {75 - 64}% để đạt chuẩn ngành</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-4">Hành động thực thi (Checklist)</label>
                <div className="space-y-3">
                  {[
                    { task: 'Rà soát ngân hàng câu hỏi thi', due: '12/05/2026' },
                    { task: 'Tổ chức hội thảo chuyên môn GV', due: '18/05/2026' },
                    { task: 'Biên soạn lại học liệu thực hành', due: '25/05/2026' },
                    { task: 'Bổ sung 2 buổi phụ đạo/tuần', due: '10/06/2026' }
                  ].map((item, idx) => (
                    <div key={idx} className="group p-3 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl hover:border-indigo-200 transition-all cursor-pointer">
                      <div className="flex items-start gap-3">
                        <input type="checkbox" className="mt-0.5 w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer" />
                        <div>
                          <p className="text-[10px] font-bold text-gray-700 dark:text-gray-200 leading-tight">{item.task}</p>
                          <div className="flex items-center gap-1 mt-1 text-gray-400">
                            <Clock size={10} />
                            <span className="text-[8px] font-black uppercase tracking-widest">{item.due}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-indigo-50/30 dark:bg-indigo-900/10 rounded-2xl border border-indigo-100/50 dark:border-indigo-800">
                <label className="block text-[8px] font-black text-indigo-400 uppercase tracking-widest mb-3">Nguồn lực yêu cầu</label>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-bold text-indigo-900 dark:text-indigo-300">Ngân sách dự kiến:</span>
                    <span className="text-[10px] font-black text-indigo-600 tracking-tight">12.5 Triệu</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-bold text-indigo-900 dark:text-indigo-300">Nhân sự hỗ trợ:</span>
                    <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">02 Giảng viên</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-5 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center">
          <div className="flex items-center gap-4 text-gray-400">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 size={14} />
              <span className="text-[8px] font-black uppercase tracking-widest">Tự động lưu: 23:31</span>
            </div>
          </div>
          <div className="flex gap-4">
            <button onClick={onClose} className="px-4 py-2 text-[10px] font-black text-gray-500 hover:text-gray-900 uppercase tracking-widest transition-all">Hủy</button>
            <button 
              onClick={() => {
                onClose();
                setToastMessage('Chiến lược đã được ban hành & chuyển trạng thái Đang thực hiện!');
              }}
              className="px-8 py-3 bg-indigo-600 text-white text-[10px] font-black rounded-xl hover:bg-indigo-700 shadow-xl shadow-indigo-200 flex items-center gap-2 uppercase tracking-widest transition-all hover:scale-105 active:scale-95"
            >
              Phê duyệt & Ban hành <CheckCircle2 size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImprovementPlanModal;
