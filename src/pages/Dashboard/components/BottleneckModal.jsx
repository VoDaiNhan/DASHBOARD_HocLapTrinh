
import React from 'react';
import { X, AlertTriangle, TrendingDown, Target, Brain } from 'lucide-react';

const BottleneckModal = ({ isOpen, onClose, courseInfo }) => {
  if (!isOpen || !courseInfo || !courseInfo.bottleneck) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gray-500/75 dark:bg-gray-900/75 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white dark:bg-gray-800 rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all max-w-2xl w-full max-h-[90vh] flex flex-col p-8">
        <div className="overflow-y-auto custom-scrollbar">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 dark:bg-orange-900/40 rounded-xl">
                <AlertTriangle className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Phân tích Điểm nghẽn Hiệu suất</h3>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
              <X size={24} />
            </button>
          </div>

          <div className="space-y-6">
            <div className="p-6 bg-orange-50 dark:bg-orange-900/20 rounded-2xl border border-orange-100 dark:border-orange-800">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-bold text-orange-800 dark:text-orange-200 uppercase tracking-widest">Phát hiện trọng điểm</span>
                <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-[10px] font-bold uppercase tracking-widest">Ưu tiên xử lý</span>
              </div>
              <div className="flex items-end gap-2 mb-4">
                <div className="text-4xl font-bold text-gray-900 dark:text-white">{courseInfo.bottleneck.name}</div>
                <div className="text-lg font-bold text-red-600 mb-1">({courseInfo.bottleneck.rate}%)</div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                Hệ thống xác định <span className="font-bold">{courseInfo.bottleneck.type === 'class' ? 'Lớp học' : 'Chủ đề kiến thức'}</span> này là nguyên nhân chính khiến tỉ lệ hoàn thành của môn học không đạt mục tiêu kỳ vọng. Hiệu suất tại đây thấp hơn <span className="font-bold text-red-600">{Math.abs(courseInfo.bottleneck.rate - courseInfo.benchmark)}%</span> so với mức trung bình của bộ môn.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                  <TrendingDown className="h-4 w-4" /> Nguyên nhân giả định
                </h4>
                <ul className="space-y-3">
                  {[
                    'Độ khó của nội dung vượt quá kiến thức nền tảng.',
                    'Thiếu hụt tài liệu tham khảo thực tế cho phần này.',
                    'Tỉ lệ sinh viên vắng mặt trong các buổi thực hành cao.'
                  ].map((item, i) => (
                    <li key={i} className="flex gap-3 text-sm text-gray-600 dark:text-gray-400 italic">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-2 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                  <Target className="h-4 w-4" /> Hành động đề xuất
                </h4>
                <ul className="space-y-3">
                  {[
                    'Tổ chức 1 buổi phụ đạo chuyên sâu (Workshop).',
                    'Cập nhật lại ngân hàng câu hỏi ôn tập.',
                    'Giao thêm bài tập nhỏ để củng cố kiến thức.'
                  ].map((item, i) => (
                    <li key={i} className="flex gap-3 text-sm text-gray-900 dark:text-white font-bold">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800 flex items-center gap-4">
               <div className="w-12 h-12 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-200">
                  <Brain size={24} />
               </div>
               <div>
                  <div className="text-sm font-bold text-blue-900 dark:text-blue-100 italic">Góc nhìn AI</div>
                  <div className="text-xs text-blue-700 dark:text-blue-300">Nếu cải thiện điểm nghẽn này thêm 10%, tỉ lệ hoàn thành tổng thể sẽ đạt chuẩn KPI của trường.</div>
               </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button 
              onClick={onClose}
              className="px-10 py-3 bg-gray-900 text-white rounded-xl text-sm font-bold hover:bg-black transition-all shadow-xl"
            >
              Đã ghi nhận
            </button>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CheckCircle2 = ({ className, size = 16 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
    <path d="m9 12 2 2 4-4"/>
  </svg>
);

export default React.memo(BottleneckModal);
