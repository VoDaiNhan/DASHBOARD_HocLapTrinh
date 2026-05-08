import React from 'react';
import { X, TrendingDown, AlertTriangle, User, ArrowDownRight, ChevronRight } from 'lucide-react';

const ScoreDropModal = ({ isOpen, onClose }) => {
  const drops = [
    { id: 1, class: 'K25-02', currentGpa: 6.4, prevGpa: 7.6, drop: -1.2, mainReason: 'Môn OOP quá khó', totalStudents: 44 },
    { id: 2, class: 'K24-03', currentGpa: 6.8, prevGpa: 7.6, drop: -0.8, mainReason: 'Chuyên cần thấp', totalStudents: 45 },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden">
        <div className="bg-gradient-to-r from-amber-500 to-orange-600 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <TrendingDown className="text-white" size={24} />
            <div>
              <h2 className="text-lg font-bold text-white">Lớp giảm điểm mạnh</h2>
              <p className="text-xs text-white/80">Cảnh báo sự sụt giảm GPA đột ngột</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-white/20 rounded-lg"><X size={20} className="text-white" /></button>
        </div>

        <div className="p-6 space-y-4">
          {drops.map(item => (
            <div key={item.id} className="p-5 border border-gray-100 dark:border-gray-700 rounded-2xl bg-white dark:bg-gray-800/50 hover:shadow-lg transition-all">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">Lớp {item.class}</h3>
                  <p className="text-xs text-gray-500">Sĩ số: {item.totalStudents} sinh viên</p>
                </div>
                <div className="flex flex-col items-end">
                  <div className="flex items-center gap-1 text-red-600 font-bold text-xl">
                    <ArrowDownRight size={20} />
                    {item.drop}
                  </div>
                  <span className="text-[10px] text-gray-400 font-bold uppercase">Điểm GPA trung bình</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl text-center">
                  <p className="text-xs text-gray-500 mb-1">Kỳ trước</p>
                  <p className="font-bold text-gray-700 dark:text-gray-300">{item.prevGpa}</p>
                </div>
                <div className="p-3 bg-red-50 dark:bg-red-900/10 rounded-xl text-center border border-red-100 dark:border-red-900/30">
                  <p className="text-xs text-red-500 mb-1">Hiện tại</p>
                  <p className="font-bold text-red-600">{item.currentGpa}</p>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl text-center">
                  <p className="text-xs text-gray-500 mb-1">Lý do chính</p>
                  <p className="text-xs font-bold text-gray-700 dark:text-gray-300 truncate">{item.mainReason}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button className="flex-1 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-colors">Xem chi tiết bảng điểm</button>
                <button className="flex-1 py-2 border border-gray-200 dark:border-gray-700 rounded-xl text-xs font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-50 transition-colors">Liên hệ Giảng viên</button>
              </div>
            </div>
          ))}
        </div>

        <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-700 flex justify-end">
          <button onClick={onClose} className="px-6 py-2 bg-gray-900 text-white rounded-xl text-sm font-bold">Xác nhận đã xem</button>
        </div>
      </div>
    </div>
  );
};

export default ScoreDropModal;
