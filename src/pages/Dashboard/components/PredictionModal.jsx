
import React from 'react';
import { X, Brain, TrendingUp } from 'lucide-react';

const PredictionModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white dark:bg-gray-800 rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all max-w-3xl w-full max-h-[90vh] flex flex-col p-6">
        <div className="overflow-y-auto custom-scrollbar">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold flex items-center gap-2 text-gray-900 dark:text-white">
              <Brain className="h-6 w-6 text-indigo-500" /> Dự đoán xu hướng học lực (AI Analysis)
            </h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl border border-indigo-100 dark:border-indigo-800">
              <h4 className="font-bold text-indigo-900 dark:text-indigo-200 mb-4 flex items-center gap-2">
                <TrendingUp className="h-4 w-4" /> Dự báo phân bổ kỳ tới
              </h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Nhóm Xuất sắc/Giỏi</span>
                  <span className="font-bold text-green-600">+2.5%</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Nhóm Trung bình</span>
                  <span className="font-bold text-gray-500">Ổn định</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Nhóm Yếu/Kém</span>
                  <span className="font-bold text-red-600">-1.8%</span>
                </div>
              </div>
            </div>

            <div className="p-6 bg-gray-50 dark:bg-gray-900/30 rounded-2xl border border-gray-100 dark:border-gray-700">
              <h4 className="font-bold mb-4 text-gray-900 dark:text-white">🚀 Đề xuất từ hệ thống</h4>
              <ul className="text-sm space-y-4 text-gray-600 dark:text-gray-300">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-5 h-5 bg-green-100 dark:bg-green-900/40 text-green-600 flex items-center justify-center rounded-full text-[10px]">1</span>
                  ✨ Tập trung nâng cao tỉ lệ nhóm Khá lên Giỏi thông qua các đồ án thực tế.
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-5 h-5 bg-amber-100 dark:bg-amber-900/40 text-amber-600 flex items-center justify-center rounded-full text-[10px]">2</span>
                  ⚠️ Cảnh báo sớm 5 SV có biến động điểm số mạnh để có phương án hỗ trợ kịp thời.
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-5 h-5 bg-blue-100 dark:bg-blue-900/40 text-blue-600 flex items-center justify-center rounded-full text-[10px]">3</span>
                  📊 Tăng cường thời lượng bài tập thực hành cho môn Cấu trúc dữ liệu.
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button 
              onClick={onClose}
              className="px-8 py-2 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-200 dark:shadow-none transition-all"
            >
              Đã hiểu
            </button>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(PredictionModal);
