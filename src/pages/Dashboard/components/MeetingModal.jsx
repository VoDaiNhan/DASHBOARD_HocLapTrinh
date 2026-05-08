import React from 'react';
import { X, Calendar, Clock, Users, Send } from 'lucide-react';

const MeetingModal = ({ 
  isOpen, 
  onClose, 
  meetingTitle, 
  setMeetingTitle, 
  meetingSubject, 
  setMeetingSubject, 
  meetingAttendees, 
  setMeetingAttendees,
  onAddAttendee,
  meetingType, 
  setMeetingType, 
  setToastMessage 
}) => {
  const [isSelecting, setIsSelecting] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');

  if (!isOpen) return null;

  const allLecturers = [
    { id: 'gv01', name: 'ThS. Nguyễn Văn A', role: 'Giảng viên chính', department: 'CNTT' },
    { id: 'gv02', name: 'TS. Trần Thị B', role: 'Trưởng bộ môn', department: 'Hệ thống thông tin' },
    { id: 'gv03', name: 'ThS. Lê Hoàng C', role: 'Giảng viên', department: 'Mạng máy tính' },
    { id: 'gv04', name: 'TS. Phạm Nam D', role: 'Giảng viên cao cấp', department: 'CNTT' },
    { id: 'gv05', name: 'ThS. Đỗ Minh E', role: 'Trợ giảng', department: 'Hệ thống thông tin' },
  ];

  const filteredLecturers = allLecturers.filter(l => 
    l.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    l.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleAttendee = (lecturer) => {
    const exists = meetingAttendees.find(a => a.id === lecturer.id);
    if (exists) {
      setMeetingAttendees(meetingAttendees.filter(a => a.id !== lecturer.id));
    } else {
      setMeetingAttendees([...meetingAttendees, { ...lecturer, isRequired: false }]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white dark:bg-gray-800 rounded-3xl text-left overflow-hidden shadow-2xl transform transition-all max-w-2xl w-full max-h-[90vh] flex flex-col border border-gray-100 dark:border-gray-800">
        <div className="overflow-y-auto scrollbar-none">
          <div className="px-8 py-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-indigo-50/50 dark:bg-indigo-900/20">
            <h3 className="text-xl font-black text-indigo-900 dark:text-indigo-100 flex items-center gap-3 tracking-tight">
              <Calendar className="h-6 w-6" />
              Lên lịch họp hội đồng bộ môn
            </h3>
            <button onClick={onClose} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl transition-colors">
              <X size={24} className="text-gray-400" />
            </button>
          </div>

          <div className="p-8 space-y-8">
            {/* ... other fields like Title, Time ... */}
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Tiêu đề cuộc họp</label>
              <input 
                type="text" 
                className="w-full px-5 py-3 border-2 border-gray-50 dark:border-gray-700 rounded-2xl bg-gray-50 dark:bg-gray-900/50 text-sm font-bold focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
                value={meetingTitle}
                onChange={(e) => setMeetingTitle(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Thời gian</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-3.5 h-4 w-4 text-gray-400" />
                  <input type="date" className="w-full pl-12 pr-5 py-3 border-2 border-gray-50 dark:border-gray-700 rounded-2xl bg-gray-50 dark:bg-gray-900/50 text-sm font-bold outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Giờ bắt đầu</label>
                <div className="relative">
                  <Clock className="absolute left-4 top-3.5 h-4 w-4 text-gray-400" />
                  <input type="time" className="w-full pl-12 pr-5 py-3 border-2 border-gray-50 dark:border-gray-700 rounded-2xl bg-gray-50 dark:bg-gray-900/50 text-sm font-bold outline-none" />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Hình thức</label>
              <div className="flex gap-4 p-1 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border-2 border-gray-50 dark:border-gray-800">
                <button 
                  onClick={() => setMeetingType('direct')}
                  className={`flex-1 py-3 px-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${meetingType === 'direct' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'text-gray-500 hover:bg-gray-100'}`}
                >
                  Trực tiếp
                </button>
                <button 
                  onClick={() => setMeetingType('online')}
                  className={`flex-1 py-3 px-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${meetingType === 'online' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'text-gray-500 hover:bg-gray-100'}`}
                >
                  Trực tuyến
                </button>
              </div>
            </div>

            {/* ATTENDEE SECTION - NEW SELECTION LOGIC */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest">Thành phần tham dự</label>
                <button 
                  onClick={() => setIsSelecting(!isSelecting)}
                  className="text-[10px] font-black text-indigo-600 hover:underline flex items-center gap-1 uppercase tracking-widest"
                >
                  {isSelecting ? '← Quay lại danh sách' : '+ Chọn từ danh sách GV'}
                </button>
              </div>
              
              {isSelecting ? (
                <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                  <input 
                    type="text" 
                    placeholder="Tìm kiếm giảng viên..."
                    className="w-full px-4 py-2 text-xs font-bold bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <div className="space-y-2 max-h-48 overflow-y-auto p-2 bg-gray-50 rounded-2xl border border-gray-100 scrollbar-none">
                    {filteredLecturers.map((lecturer) => {
                      const isChecked = meetingAttendees.some(a => a.id === lecturer.id);
                      return (
                        <div 
                          key={lecturer.id} 
                          onClick={() => toggleAttendee(lecturer)}
                          className={`flex items-center justify-between p-3 rounded-xl border-2 transition-all cursor-pointer ${
                            isChecked ? 'bg-indigo-50 border-indigo-200' : 'bg-white border-transparent hover:border-gray-100'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all ${
                              isChecked ? 'bg-indigo-600 border-indigo-600' : 'border-gray-200 bg-white'
                            }`}>
                              {isChecked && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                            </div>
                            <div>
                              <div className="text-xs font-black text-gray-900 tracking-tight">{lecturer.name}</div>
                              <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">{lecturer.department}</div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="space-y-2 max-h-48 overflow-y-auto p-2 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-gray-100 dark:border-gray-700 scrollbar-none animate-in fade-in slide-in-from-left-4 duration-300">
                  {meetingAttendees.length === 0 ? (
                    <div className="p-8 text-center text-gray-400 text-xs font-bold uppercase tracking-widest italic">Chưa có thành viên nào được chọn</div>
                  ) : (
                    meetingAttendees.map((person, index) => (
                      <div key={person.id} className="group flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 hover:shadow-sm transition-all">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 flex items-center justify-center font-black text-xs">
                            {person.name.charAt(0)}
                          </div>
                          <div>
                            <div className="text-xs font-black text-gray-900 dark:text-white tracking-tight">{person.name}</div>
                            <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">{person.role}</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4">
                          <button 
                            onClick={() => {
                              const updated = [...meetingAttendees];
                              updated[index].isRequired = !updated[index].isRequired;
                              setMeetingAttendees(updated);
                            }}
                            className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest transition-colors ${
                              person.isRequired 
                              ? 'bg-rose-50 text-rose-600 border border-rose-100' 
                              : 'bg-gray-100 text-gray-400 border border-gray-200'
                            }`}
                          >
                            {person.isRequired ? 'Bắt buộc' : 'Tùy chọn'}
                          </button>
                          
                          <button 
                            onClick={() => {
                              const updated = meetingAttendees.filter((_, i) => i !== index);
                              setMeetingAttendees(updated);
                            }}
                            className="p-1.5 text-gray-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>

            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Nội dung thảo luận chính</label>
              <textarea 
                className="w-full px-5 py-4 border-2 border-gray-50 dark:border-gray-700 rounded-2xl bg-gray-50 dark:bg-gray-900/50 text-sm font-medium h-32 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all scrollbar-none"
                value={meetingSubject}
                onChange={(e) => setMeetingSubject(e.target.value)}
              />
            </div>
          </div>

          <div className="px-8 py-6 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-100 dark:border-gray-800 flex justify-end gap-4">
            <button onClick={onClose} className="px-6 py-3 text-xs font-black text-gray-500 hover:text-gray-900 uppercase tracking-widest">Hủy</button>
            <button 
              onClick={() => {
                onClose();
                setToastMessage('Đã gửi lời mời họp tới ' + meetingAttendees.length + ' thành viên!');
              }}
              className="px-10 py-3 bg-indigo-600 text-white rounded-xl text-xs font-black shadow-xl shadow-indigo-100 dark:shadow-none uppercase tracking-widest hover:bg-indigo-700 transition-all hover:-translate-y-0.5"
            >
              Gửi lời mời họp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(MeetingModal);
