import React, { useState } from 'react';
import { X, Target, AlertTriangle, ChevronRight, GraduationCap, FileText, Send, CheckCircle } from 'lucide-react';

const AcademicProgressModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('missing'); // 'missing', 'delayed'
  const [sentStatus, setSentStatus] = useState({}); // { id: true }

  const missingCreditStudents = [
    { id: 1, name: 'Nguyễn Văn Nam', class: 'K24-01', missing: 12, total: 130, risk: 'High', advisor: 'TS. Nguyễn An' },
    { id: 2, name: 'Trần Thị Huệ', class: 'K24-02', missing: 8, total: 130, risk: 'Medium', advisor: 'TS. Trần Bình' },
    { id: 3, name: 'Lê Văn Tám', class: 'K24-01', missing: 15, total: 130, risk: 'High', advisor: 'TS. Nguyễn An' },
  ];

  const delayedStudents = [
    { id: 4, name: 'Bùi Văn Kế', class: 'K23-01', reason: 'Nợ đồ án 1', delayTime: '1 kỳ', status: 'Warning' },
    { id: 5, name: 'Phạm Hồng Thái', class: 'K23-02', reason: 'Thiếu chứng chỉ AV', delayTime: '2 kỳ', status: 'Critical' },
  ];

  const handleSendMessage = (id) => {
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
      <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-4 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg"><Target size={20} className="text-white" /></div>
            <div>
              <h2 className="text-lg font-bold text-white">Tiến độ hoàn thành Chương trình</h2>
              <p className="text-xs text-white/80">Phân tích lộ trình tích lũy và tốt nghiệp</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"><X size={20} className="text-white" /></button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 flex-shrink-0">
          <button onClick={() => setActiveTab('missing')} className={`px-6 py-3 text-sm font-bold transition-all border-b-2 ${activeTab === 'missing' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
            Thiếu tín chỉ ({missingCreditStudents.length})
          </button>
          <button onClick={() => setActiveTab('delayed')} className={`px-6 py-3 text-sm font-bold transition-all border-b-2 ${activeTab === 'delayed' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
            Nguy cơ trễ tốt nghiệp ({delayedStudents.length})
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'missing' && (
            <div className="space-y-4">
              <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-200 dark:border-amber-800/40 flex items-start gap-3">
                <AlertTriangle className="text-amber-600 mt-0.5" size={18} />
                <p className="text-sm text-amber-800 dark:text-amber-300">
                  Phát hiện <strong>{missingCreditStudents.length} sinh viên</strong> thuộc khóa K24 đang có số tín chỉ tích lũy thấp hơn 20% so với lộ trình chuẩn.
                </p>
              </div>

              <div className="overflow-hidden border border-gray-100 dark:border-gray-700 rounded-xl">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-gray-50 dark:bg-gray-700/50">
                    <tr>
                      <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase">Sinh viên</th>
                      <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase">Thiếu/Tổng</th>
                      <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase">Mức độ</th>
                      <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase">Cố vấn</th>
                      <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase text-right">Hành động</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                    {missingCreditStudents.map(s => (
                      <tr key={s.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/40 rounded-full flex items-center justify-center text-blue-600 font-bold text-xs">{s.name[0]}</div>
                            <div>
                              <p className="text-sm font-bold text-gray-900 dark:text-white">{s.name}</p>
                              <p className="text-xs text-gray-500">{s.class}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                          <span className="text-red-500">{s.missing}</span> / {s.total} TC
                        </td>
                        <td className="px-4 py-4">
                          <span className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase ${s.risk === 'High' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'}`}>
                            {s.risk === 'High' ? 'Nghiêm trọng' : 'Trung bình'}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-xs text-gray-600 dark:text-gray-400">{s.advisor}</td>
                        <td className="px-4 py-4 text-right">
                          <button 
                            onClick={() => handleSendMessage(s.id)}
                            className={`p-2 rounded-lg transition-all ${sentStatus[s.id] ? 'bg-green-100 text-green-600' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'}`}
                          >
                            {sentStatus[s.id] ? <CheckCircle size={16} /> : <Send size={16} />}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'delayed' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {delayedStudents.map(s => (
                  <div key={s.id} className="p-4 border border-gray-100 dark:border-gray-700 rounded-2xl hover:shadow-md transition-all">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded-xl"><GraduationCap className="text-red-600" size={20} /></div>
                        <div>
                          <p className="font-bold text-gray-900 dark:text-white">{s.name}</p>
                          <p className="text-xs text-gray-500">{s.class}</p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase ${s.status === 'Critical' ? 'bg-red-600 text-white' : 'bg-red-100 text-red-600'}`}>{s.status}</span>
                    </div>
                    <div className="space-y-2 py-2 border-t border-gray-50 dark:border-gray-700 mt-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500">Nguyên nhân:</span>
                        <span className="font-medium text-gray-800 dark:text-gray-200">{s.reason}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500">Dự kiến trễ:</span>
                        <span className="font-bold text-red-500">{s.delayTime}</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleSendMessage(s.id)}
                      className={`w-full mt-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                        sentStatus[s.id] ? 'bg-green-600 text-white' : 'bg-gray-900 text-white hover:bg-black'
                      }`}
                    >
                      {sentStatus[s.id] ? <><CheckCircle size={14} /> Đã gửi nhắc nhở</> : <><Send size={14} /> Gửi thông báo nhắc nhở</>}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 flex items-center justify-between flex-shrink-0">
          <button className="flex items-center gap-2 text-xs font-bold text-blue-600 hover:underline"><FileText size={14} /> Xuất báo cáo lộ trình (.xlsx)</button>
          <div className="flex items-center gap-3">
            <button onClick={onClose} className="px-5 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 rounded-xl transition-colors">Đóng</button>
            <button className="px-6 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-lg hover:bg-blue-700 transition-all">Gửi thông báo toàn bộ</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcademicProgressModal;
