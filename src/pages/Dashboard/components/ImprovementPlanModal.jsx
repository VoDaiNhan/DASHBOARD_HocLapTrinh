import React from 'react';
import { X, FileText, CheckCircle2, AlertCircle } from 'lucide-react';

const ImprovementPlanModal = ({ isOpen, onClose, courseName, setToastMessage }) => {
  const [priority, setPriority] = React.useState('Cao');
  const [targetKPI, setTargetKPI] = React.useState(85);
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white dark:bg-gray-900 w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-gray-100 dark:border-gray-800 animate-in zoom-in-95 duration-300 max-h-[85vh]">
        {/* Header - Reduced padding */}
        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between bg-indigo-50/50 dark:bg-indigo-900/20">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-600 text-white rounded-xl shadow-lg">
              <FileText size={20} />
            </div>
            <div>
              <h3 className="text-base font-black text-gray-900 dark:text-white uppercase tracking-tight">Chiến lược Cải thiện Học vụ</h3>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{courseName}</span>
                <span className="w-1 h-1 rounded-full bg-gray-300" />
                <span className="text-[8px] px-1.5 py-0.5 bg-rose-50 text-rose-600 rounded-lg font-black uppercase tracking-widest">Khẩn cấp</span>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors">
            <X size={20} className="text-gray-400" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 scrollbar-none">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Core Analysis */}
            <div className="lg:col-span-7 space-y-6">
              <div className="p-4 bg-amber-50 dark:bg-amber-900/10 rounded-xl border border-amber-100 dark:border-amber-800 flex gap-3 items-start">
                <AlertCircle className="text-amber-600 mt-0.5" size={18} />
                <div>
                  <p className="text-xs text-amber-900 dark:text-amber-400 font-black uppercase tracking-tight mb-0.5">Cảnh báo Hiệu suất</p>
                  <p className="text-[10px] text-amber-800/80 dark:text-amber-500 font-medium leading-relaxed">
                    Môn học này đang có tỉ lệ hoàn thành 64%, thấp hơn mức chuẩn 11%. Kế hoạch này là bắt buộc để duy trì kiểm định.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">Nguyên nhân cốt lõi</label>
                  <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border-2 border-gray-50 dark:border-gray-700 rounded-xl text-xs font-bold text-gray-700 dark:text-gray-200 outline-none focus:ring-2 focus:ring-indigo-500/10">
                    <option>Cấu trúc đề thi không bám sát chuẩn</option>
                    <option>Nội dung chương trình lỗi thời</option>
                    <option>Thiếu hụt học liệu thực hành</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">Mức độ ưu tiên</label>
                  <div className="flex gap-1.5">
                    {['Thấp', 'Trung bình', 'Cao'].map(p => (
                      <button 
                        key={p}
                        onClick={() => setPriority(p)}
                        className={`flex-1 py-2 rounded-lg text-[8px] font-black uppercase tracking-widest transition-all ${
                          priority === p ? 'bg-slate-900 text-white shadow-md' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">Giải pháp thực thi chi tiết</label>
                <textarea 
                  placeholder="Mô tả cụ thể lộ trình..."
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border-2 border-gray-50 dark:border-gray-700 rounded-2xl text-xs font-medium h-32 focus:ring-2 focus:ring-indigo-500/10 outline-none transition-all scrollbar-none"
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">Thời hạn</label>
                  <input type="date" className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border-2 border-gray-50 dark:border-gray-700 rounded-xl text-xs font-bold text-gray-700 outline-none" />
                </div>
                <div>
                  <label className="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">Trách nhiệm chính</label>
                  <input type="text" defaultValue="Trưởng bộ môn & GV chính" className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border-2 border-gray-50 dark:border-gray-700 rounded-xl text-xs font-bold text-gray-700 outline-none" />
                </div>
              </div>
            </div>

            {/* Right Column: Targets & Resources */}
            <div className="lg:col-span-5 space-y-6 border-l border-gray-100 dark:border-gray-800 pl-8">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-[9px] font-black text-gray-400 uppercase tracking-widest">Mục tiêu KPI</label>
                  <span className="text-lg font-black text-indigo-600">{targetKPI}%</span>
                </div>
                <input 
                  type="range" min="50" max="100" value={targetKPI} 
                  onChange={(e) => setTargetKPI(e.target.value)}
                  className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
                <div className="flex justify-between mt-1.5 text-[8px] font-bold text-gray-400 uppercase tracking-widest">
                  <span>Hiện tại: 64%</span>
                  <span>Kỳ vọng mới</span>
                </div>
              </div>

              <div>
                <label className="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-3">Checklist hành động</label>
                <div className="space-y-2">
                  {[
                    'Rà soát ngân hàng câu hỏi thi',
                    'Tổ chức hội thảo chuyên môn GV',
                    'Biên soạn lại học liệu thực hành',
                    'Bổ sung 2 buổi phụ đạo/tuần'
                  ].map((task, idx) => (
                    <label key={idx} className="flex items-center gap-2 p-2.5 bg-white border border-gray-100 rounded-xl hover:border-indigo-100 cursor-pointer transition-all">
                      <input type="checkbox" className="w-3.5 h-3.5 rounded text-indigo-600 focus:ring-indigo-500" />
                      <span className="text-[10px] font-bold text-gray-600">{task}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-3">Nguồn lực yêu cầu</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 p-2.5 bg-indigo-50/30 rounded-xl border border-indigo-50">
                    <input type="checkbox" defaultChecked className="w-3.5 h-3.5 rounded text-indigo-600" />
                    <span className="text-[10px] font-bold text-indigo-900">Kinh phí tổ chức phụ đạo</span>
                  </label>
                  <label className="flex items-center gap-2 p-2.5 bg-indigo-50/30 rounded-xl border border-indigo-50">
                    <input type="checkbox" className="w-3.5 h-3.5 rounded text-indigo-600" />
                    <span className="text-[10px] font-bold text-indigo-900">License phần mềm thực hành</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center">
          <div className="flex items-center gap-2 text-gray-400">
            <CheckCircle2 size={14} />
            <span className="text-[9px] font-black uppercase tracking-widest">Lưu tự động: 11:20 SA</span>
          </div>
          <div className="flex gap-3">
            <button onClick={onClose} className="px-4 py-2 text-[10px] font-black text-gray-500 hover:text-gray-900 uppercase tracking-widest">Hủy</button>
            <button 
              onClick={() => {
                onClose();
                setToastMessage('Đã trình phê duyệt chiến lược cải thiện!');
              }}
              className="px-6 py-3 bg-indigo-600 text-white text-[10px] font-black rounded-xl hover:bg-indigo-700 shadow-xl shadow-indigo-100 flex items-center gap-2 uppercase tracking-widest transition-all"
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
