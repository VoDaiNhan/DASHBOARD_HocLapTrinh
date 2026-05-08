import React, { useState } from 'react';
import { X, FileWarning, AlertTriangle, User, Send, CheckCircle, Clock } from 'lucide-react';

const AssignmentMissingModal = ({ isOpen, onClose }) => {
  const [sentStatus, setSentStatus] = useState({});

  const classes = [
    { id: 1, name: 'K25-02', missingRate: 35, totalStudents: 44, instructor: 'ThS. Nguyễn Thị Bình', lastDeadline: '05/05/2026', totalAssignments: 12, missingCount: 15 },
    { id: 2, name: 'K24-03', missingRate: 22, totalStudents: 45, instructor: 'TS. Lê Văn Cường', lastDeadline: '06/05/2026', totalAssignments: 10, missingCount: 10 },
  ];

  const handleRemind = (id) => {
    setSentStatus(prev => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setSentStatus(prev => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
    }, 3000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-600 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg"><FileWarning size={20} className="text-white" /></div>
            <div>
              <h2 className="text-lg font-bold text-white">Lớp thiếu bài tập nộp</h2>
              <p className="text-xs text-white/80">Cảnh báo tỷ lệ nộp bài thấp hơn mức trung bình (15%)</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"><X size={20} className="text-white" /></button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 overflow-y-auto max-h-[70vh]">
          {classes.map(cls => (
            <div key={cls.id} className="p-5 border border-gray-100 dark:border-gray-700 rounded-2xl bg-white dark:bg-gray-800/50 hover:shadow-md transition-all">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">Lớp {cls.name}</h3>
                    <span className="px-2 py-0.5 bg-red-100 text-red-600 text-[10px] font-bold rounded-full">NGHIÊM TRỌNG</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Giảng viên: <span className="font-medium text-gray-700 dark:text-gray-300">{cls.instructor}</span></p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-amber-600">{cls.missingRate}%</div>
                  <div className="text-[10px] text-gray-400 font-bold uppercase">Tỷ lệ thiếu bài</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl text-center">
                  <p className="text-[10px] text-gray-500 mb-1 uppercase font-bold">Tổng bài tập</p>
                  <p className="font-bold text-gray-700 dark:text-gray-300">{cls.totalAssignments}</p>
                </div>
                <div className="p-3 bg-red-50 dark:bg-red-900/10 rounded-xl text-center border border-red-100 dark:border-red-900/30">
                  <p className="text-[10px] text-red-500 mb-1 uppercase font-bold">Số SV chưa nộp</p>
                  <p className="font-bold text-red-600">{cls.missingCount} / {cls.totalStudents}</p>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl text-center">
                  <p className="text-[10px] text-gray-500 mb-1 uppercase font-bold">Hạn nộp gần nhất</p>
                  <p className="text-[10px] font-bold text-gray-700 dark:text-gray-300">{cls.lastDeadline}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button 
                  onClick={() => handleRemind(cls.id)}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                    sentStatus[cls.id] ? 'bg-green-100 text-green-600' : 'bg-amber-600 text-white hover:bg-amber-700'
                  }`}
                >
                  {sentStatus[cls.id] ? <><CheckCircle size={14} /> Đã gửi nhắc nhở</> : <><Send size={14} /> Nhắc nhở nộp bài ngay</>}
                </button>
                <button className="flex-1 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl text-xs font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-50 transition-colors">Yêu cầu GV báo cáo</button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3 bg-gray-50 dark:bg-gray-800/50">
          <button onClick={onClose} className="px-6 py-2 text-sm font-bold text-gray-500 hover:bg-gray-100 rounded-xl transition-all">Đóng</button>
          <button className="px-6 py-2 bg-gray-900 text-white rounded-xl text-sm font-bold shadow-lg hover:bg-black transition-all">Xuất danh sách (Excel)</button>
        </div>
      </div>
    </div>
  );
};

export default AssignmentMissingModal;
