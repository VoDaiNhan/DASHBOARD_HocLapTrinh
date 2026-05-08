
import React from 'react';
import { X, Bell, AlertTriangle } from 'lucide-react';

const NotificationHub = ({ 
  isOpen, 
  onClose, 
  notificationStudents, 
  selectedNotifStudents, 
  setSelectedNotifStudents, 
  selectAllByRank, 
  toggleStudentSelection, 
  notificationMessage, 
  setNotificationMessage, 
  insertToken, 
  setToastMessage 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gray-900/60" onClick={onClose} />
      <div className="relative w-full max-w-4xl bg-white dark:bg-gray-900 rounded-[40px] shadow-2xl overflow-hidden border border-white/20">
        <div className="px-10 py-8 bg-gradient-to-r from-red-600 to-indigo-600 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center text-white shadow-inner">
              <Bell className="h-7 w-7" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white tracking-tight">Hành động Hỗ trợ học tập</h3>
              <p className="text-white/70 text-xs font-semibold mt-1">Can thiệp trực tiếp nhóm sinh viên nguy cơ</p>
            </div>
          </div>
          <button onClick={onClose} className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-2xl flex items-center justify-center text-white transition-all backdrop-blur-md">
            <X size={24} />
          </button>
        </div>

        <div className="p-10 space-y-8 max-h-[75vh] overflow-y-auto custom-scrollbar">
          <div className="p-6 bg-amber-50 dark:bg-amber-900/20 rounded-3xl border border-amber-100 dark:border-amber-800 flex items-center gap-4">
             <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/40 rounded-xl flex items-center justify-center text-amber-600">
                <AlertTriangle size={24} />
             </div>
             <p className="text-sm font-medium text-amber-900 dark:text-amber-200">
                Hệ thống đã phân tích <strong>{notificationStudents.length} sinh viên</strong> cần can thiệp gấp. 
                Mẫu tin nhắn đã được cá nhân hóa tự động.
             </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h5 className="text-base font-bold text-gray-900 dark:text-white uppercase tracking-tight italic">Danh sách nhận tin ({selectedNotifStudents.length})</h5>
              <div className="flex gap-2">
                {['yeu', 'kem', 'all'].map(rank => (
                  <button 
                    key={rank}
                    onClick={() => selectAllByRank(rank)}
                    className={`text-[10px] font-bold uppercase tracking-wide px-4 py-2 rounded-xl transition-all ${
                      rank === 'yeu' ? 'bg-orange-50 text-orange-600' :
                      rank === 'kem' ? 'bg-red-50 text-red-600' : 'bg-indigo-50 text-indigo-600'
                    } hover:scale-105 shadow-sm border border-transparent hover:border-current`}
                  >
                    {rank === 'all' ? 'Tất cả' : `Chọn ${rank.toUpperCase()}`}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="bg-gray-50/50 dark:bg-gray-800/30 rounded-3xl border border-gray-100 dark:border-gray-800 overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-100 dark:bg-gray-800 text-gray-400 font-bold uppercase tracking-wide">
                  <tr>
                    <th className="px-6 py-4 w-10">
                      <input 
                        type="checkbox" 
                        checked={selectedNotifStudents.length === notificationStudents.length && notificationStudents.length > 0}
                        onChange={(e) => {
                          if (e.target.checked) setSelectedNotifStudents(notificationStudents.map(s => s.id));
                          else setSelectedNotifStudents([]);
                        }}
                        className="rounded-lg border-gray-300 text-indigo-600 focus:ring-indigo-500 w-5 h-5"
                      />
                    </th>
                    <th className="px-6 py-4">Sinh viên</th>
                    <th className="px-6 py-4">Lớp</th>
                    <th className="px-6 py-4">Môn nguy cơ</th>
                    <th className="px-6 py-4 text-center">Điểm TB</th>
                    <th className="px-6 py-4 text-right">Xếp loại</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {notificationStudents.map((sv) => (
                    <tr key={sv.id} className={`${selectedNotifStudents.includes(sv.id) ? 'bg-indigo-50/50 dark:bg-indigo-900/10' : ''} hover:bg-white dark:hover:bg-gray-800/50 transition-colors group`}>
                      <td className="px-6 py-4">
                        <input 
                          type="checkbox" 
                          checked={selectedNotifStudents.includes(sv.id)}
                          onChange={() => toggleStudentSelection(sv.id)}
                          className="rounded-lg border-gray-300 text-indigo-600 focus:ring-indigo-500 w-5 h-5 transition-transform group-hover:scale-110"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-bold text-gray-900 dark:text-white">{sv.name}</div>
                        <div className="text-[10px] text-gray-400 font-semibold">{sv.id}</div>
                      </td>
                      <td className="px-6 py-4 text-gray-500 font-bold uppercase">{sv.class}</td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {sv.riskSubjects.map(s => (
                            <span key={s} className="px-2 py-0.5 bg-red-100/50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg text-[9px] font-bold border border-red-100 dark:border-red-800 uppercase">
                              {s}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center font-bold text-red-600 text-sm">{sv.grade.toFixed(2)}</td>
                      <td className="px-6 py-4 text-right">
                         <span className={`px-3 py-1 rounded-full text-[9px] font-bold tracking-wide uppercase ${sv.category === 'kem' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'}`}>
                           {sv.category === 'kem' ? 'Kém' : 'Yêu'}
                         </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-base font-bold text-gray-900 dark:text-white uppercase tracking-tight italic">Nội dung cá nhân hóa</label>
              <div className="flex gap-2">
                <button onClick={() => insertToken('{{tên_sinh_viên}}')} className="text-[10px] bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 px-3 py-1.5 rounded-lg font-bold transition-all">+ Tên SV</button>
                <button onClick={() => insertToken('{{điểm_số}}')} className="text-[10px] bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 px-3 py-1.5 rounded-lg font-bold transition-all">+ Điểm</button>
              </div>
            </div>
            <textarea 
              className="w-full p-8 border-2 border-gray-100 dark:border-gray-800 rounded-[32px] h-48 text-sm font-medium focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none bg-gray-50/50 dark:bg-gray-900/50 text-gray-900 dark:text-white transition-all shadow-inner"
              value={notificationMessage}
              onChange={(e) => setNotificationMessage(e.target.value)}
              placeholder="Nhập nội dung hỗ trợ..."
            />
          </div>
        </div>

        <div className="p-10 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <div>
             <div className="text-sm font-bold text-gray-900 dark:text-white mb-1">Xác nhận gửi đi</div>
             <div className="text-xs text-gray-500 font-semibold uppercase tracking-wide">Sẽ gửi đến {selectedNotifStudents.length} email cá nhân</div>
          </div>
          <div className="flex gap-4">
            <button onClick={onClose} className="px-8 py-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest hover:text-gray-900 dark:hover:text-white transition-colors">
              Hủy
            </button>
            <button 
              onClick={() => {
                onClose();
                setToastMessage(`Đã gửi thông báo thành công đến ${selectedNotifStudents.length} sinh viên!`);
                setTimeout(() => setToastMessage(''), 3000);
              }}
              disabled={selectedNotifStudents.length === 0}
              className={`px-12 py-4 rounded-[20px] font-bold text-xs uppercase tracking-widest transition-all shadow-2xl ${
                selectedNotifStudents.length === 0 
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                  : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-200 dark:shadow-none'
              }`}
            >
              Kích hoạt thông báo ({selectedNotifStudents.length})
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(NotificationHub);
