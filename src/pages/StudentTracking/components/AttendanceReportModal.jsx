import React, { useState } from 'react';
import { X, Send, CheckCircle, Clock, AlertTriangle, Users, Mail } from 'lucide-react';

const AttendanceReportModal = ({ isOpen, onClose }) => {
  const [selected, setSelected] = useState([]);
  const [sent, setSent] = useState(false);
  const [message, setMessage] = useState('');

  const classesData = [
    { id: 1, name: 'K26-03', rate: 78, students: 47, instructor: 'TS. Lê Văn Cường', email: 'cuong.lv@university.edu.vn', absentCount: 10, weekTrend: -3, topAbsent: ['Nguyễn Văn A (5 buổi)', 'Trần B (4 buổi)', 'Lê C (3 buổi)'] },
    { id: 2, name: 'K25-03', rate: 76, students: 45, instructor: 'ThS. Phạm Thị Dung', email: 'dung.pt@university.edu.vn', absentCount: 11, weekTrend: -2, topAbsent: ['Phạm D (5 buổi)', 'Võ E (4 buổi)', 'Hoàng F (4 buổi)'] },
    { id: 3, name: 'K24-03', rate: 79, students: 44, instructor: 'ThS. Đặng Văn Giang', email: 'giang.dv@university.edu.vn', absentCount: 9, weekTrend: -1, topAbsent: ['Bùi G (4 buổi)', 'Đỗ H (3 buổi)'] },
  ];

  const toggleSelect = (id) => {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const toggleAll = () => {
    setSelected(selected.length === classesData.length ? [] : classesData.map(c => c.id));
  };

  const handleSend = () => {
    setSent(true);
    setTimeout(() => { setSent(false); onClose(); setSelected([]); setMessage(''); }, 2500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[85vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 px-6 py-4 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg"><Clock size={20} className="text-white" /></div>
            <div>
              <h2 className="text-lg font-bold text-white">Lớp dưới 80% Chuyên cần</h2>
              <p className="text-xs text-white/80">Chọn lớp để gửi báo cáo cho giảng viên phụ trách</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"><X size={20} className="text-white" /></button>
        </div>

        {sent ? (
          <div className="flex-1 flex flex-col items-center justify-center py-16">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4 animate-bounce">
              <CheckCircle size={32} className="text-green-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Đã gửi báo cáo thành công!</h3>
            <p className="text-sm text-gray-500 mt-1">Giảng viên sẽ nhận được email thông báo</p>
          </div>
        ) : (
          <>
            {/* Table */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {/* Select All */}
              <div className="flex items-center justify-between mb-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={selected.length === classesData.length} onChange={toggleAll}
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Chọn tất cả ({classesData.length} lớp)</span>
                </label>
                <span className="text-xs text-gray-500">{selected.length} đã chọn</span>
              </div>

              <div className="space-y-3">
                {classesData.map(cls => (
                  <div key={cls.id} className={`border rounded-xl p-4 transition-all cursor-pointer ${
                    selected.includes(cls.id) 
                      ? 'border-blue-400 dark:border-blue-500 bg-blue-50/50 dark:bg-blue-900/10 shadow-sm' 
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                  }`} onClick={() => toggleSelect(cls.id)}>
                    <div className="flex items-start gap-3">
                      <input type="checkbox" checked={selected.includes(cls.id)} onChange={() => {}}
                        className="w-4 h-4 mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-gray-900 dark:text-white">{cls.name}</span>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                              cls.rate < 78 ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' : 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'
                            }`}>{cls.rate}%</span>
                            <span className="text-xs text-red-500 font-medium">({cls.weekTrend}% tuần này)</span>
                          </div>
                          <span className="text-xs text-gray-500"><Users size={12} className="inline mr-1" />{cls.students} SV</span>
                        </div>

                        <div className="flex items-center gap-2 mb-2">
                          <Mail size={12} className="text-gray-400" />
                          <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{cls.instructor}</span>
                          <span className="text-xs text-gray-400">({cls.email})</span>
                        </div>

                        <div className="flex items-center gap-1 mb-1">
                          <AlertTriangle size={12} className="text-orange-500" />
                          <span className="text-xs text-gray-600 dark:text-gray-400">{cls.absentCount} SV vắng nhiều tuần này</span>
                        </div>

                        <div className="flex flex-wrap gap-1.5 mt-1.5">
                          {cls.topAbsent.map((s, i) => (
                            <span key={i} className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-xs text-gray-600 dark:text-gray-400">{s}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message */}
              <div className="mt-4">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1.5">Ghi chú thêm (tùy chọn)</label>
                <textarea
                  value={message} onChange={(e) => setMessage(e.target.value)}
                  placeholder="VD: Đề nghị giảng viên kiểm tra và phản hồi trong 3 ngày..."
                  className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-xl text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows={2}
                />
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 flex items-center justify-between flex-shrink-0">
              <p className="text-xs text-gray-500">Báo cáo sẽ được gửi qua email đến giảng viên phụ trách</p>
              <div className="flex items-center gap-2">
                <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors">Hủy</button>
                <button onClick={handleSend} disabled={selected.length === 0}
                  className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-bold text-white transition-all shadow-sm ${
                    selected.length > 0 ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-300 cursor-not-allowed'
                  }`}>
                  <Send size={14} />Gửi báo cáo ({selected.length})
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AttendanceReportModal;
