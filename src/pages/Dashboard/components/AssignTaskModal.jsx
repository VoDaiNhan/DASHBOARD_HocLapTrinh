
import React from 'react';
import { X, Send, Plus, Trash2, Mail, FileText, CheckCircle2 } from 'lucide-react';

const AssignTaskModal = ({ 
  isOpen, 
  onClose, 
  selectedInstructorId, 
  setSelectedInstructorId, 
  allInstructors, 
  setAllInstructors,
  taskSubject, 
  setTaskSubject, 
  emailMessage, 
  setEmailMessage, 
  modalTasks, 
  setModalTasks, 
  newTask, 
  setNewTask, 
  emailCC, 
  emailAttachments, 
  setToastMessage 
}) => {
  const [isAddingInstructor, setIsAddingInstructor] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');

  if (!isOpen) return null;

  const masterLecturers = [
    { id: 'gv01', name: 'ThS. Nguyễn Văn A', email: 'anv@university.edu.vn', department: 'CNTT' },
    { id: 'gv02', name: 'TS. Trần Thị B', email: 'btt@university.edu.vn', department: 'Hệ thống thông tin' },
    { id: 'gv03', name: 'ThS. Lê Hoàng C', email: 'clh@university.edu.vn', department: 'Mạng máy tính' },
    { id: 'gv04', name: 'TS. Phạm Nam D', email: 'dnp@university.edu.vn', department: 'CNTT' },
    { id: 'gv05', name: 'ThS. Đỗ Minh E', email: 'emd@university.edu.vn', department: 'Hệ thống thông tin' },
  ];

  const currentInstructor = allInstructors.find(i => i.id === selectedInstructorId);

  const toggleInstructor = (lecturer) => {
    const exists = allInstructors.find(i => i.id === lecturer.id);
    if (exists) {
      setAllInstructors(allInstructors.filter(i => i.id !== lecturer.id));
      if (selectedInstructorId === lecturer.id) setSelectedInstructorId(null);
    } else {
      setAllInstructors([...allInstructors, lecturer]);
      setSelectedInstructorId(lecturer.id);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white dark:bg-gray-800 rounded-3xl text-left overflow-hidden shadow-2xl transform transition-all max-w-5xl w-full max-h-[90vh] flex flex-col border border-gray-100 dark:border-gray-800">
        <div className="overflow-y-auto scrollbar-none">
          <div className="px-8 py-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-blue-50/50 dark:bg-blue-900/20">
            <h3 className="text-xl font-black text-blue-900 dark:text-blue-100 flex items-center gap-3 tracking-tight">
              <Send className="h-6 w-6" />
              Giao nhiệm vụ & Điều phối Giảng viên
            </h3>
            <button onClick={onClose} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl transition-colors">
              <X size={24} className="text-gray-400" />
            </button>
          </div>

          <div className="flex flex-col md:flex-row h-[75vh]">
            {/* LEFT SIDEBAR: RECEIVERS */}
            <div className="w-full md:w-1/3 border-r border-gray-100 dark:border-gray-700 overflow-y-auto p-6 bg-gray-50/30 dark:bg-gray-900/20 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Danh sách người nhận</h4>
                <button 
                  onClick={() => setIsAddingInstructor(!isAddingInstructor)}
                  className="text-[10px] font-black text-blue-600 hover:underline uppercase tracking-widest"
                >
                  {isAddingInstructor ? '← Xong' : '+ Thêm GV'}
                </button>
              </div>

              {isAddingInstructor ? (
                <div className="space-y-3 animate-in fade-in slide-in-from-top-4 duration-300">
                  <input 
                    type="text" 
                    placeholder="Tìm giảng viên..."
                    className="w-full px-4 py-2 text-xs font-bold bg-white border border-gray-100 rounded-xl outline-none"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <div className="space-y-2 max-h-[50vh] overflow-y-auto scrollbar-none">
                    {masterLecturers.filter(l => l.name.toLowerCase().includes(searchTerm.toLowerCase())).map(lecturer => {
                      const isSelected = allInstructors.some(i => i.id === lecturer.id);
                      return (
                        <div 
                          key={lecturer.id}
                          onClick={() => toggleInstructor(lecturer)}
                          className={`p-3 rounded-xl border-2 cursor-pointer transition-all ${
                            isSelected ? 'bg-blue-50 border-blue-200' : 'bg-white border-transparent hover:border-gray-100'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-4 h-4 rounded flex items-center justify-center border-2 ${isSelected ? 'bg-blue-600 border-blue-600' : 'border-gray-200'}`}>
                              {isSelected && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                            </div>
                            <div className="text-xs font-black text-gray-900 tracking-tight">{lecturer.name}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {allInstructors.map(instructor => (
                    <div key={instructor.id} className="relative group">
                      <button 
                        onClick={() => setSelectedInstructorId(instructor.id)}
                        className={`w-full p-4 rounded-2xl border-2 text-left transition-all ${
                          selectedInstructorId === instructor.id 
                          ? 'bg-blue-600 border-blue-600 text-white shadow-xl shadow-blue-100 dark:shadow-none translate-x-1' 
                          : 'bg-white dark:bg-gray-800 border-gray-50 dark:border-gray-700 hover:border-blue-100 text-gray-700'
                        }`}
                      >
                        <div className="font-black text-sm tracking-tight">{instructor.name}</div>
                        <div className={`text-[10px] font-bold mt-1 uppercase tracking-widest ${selectedInstructorId === instructor.id ? 'text-blue-100' : 'text-gray-400'}`}>
                          {instructor.department}
                        </div>
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setAllInstructors(allInstructors.filter(i => i.id !== instructor.id));
                          if (selectedInstructorId === instructor.id) setSelectedInstructorId(null);
                        }}
                        className="absolute -right-2 top-1/2 -translate-y-1/2 p-1.5 bg-rose-500 text-white rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* RIGHT CONTENT: TASK DETAILS */}
            <div className="flex-1 overflow-y-auto p-8 space-y-8">
              {!currentInstructor ? (
                <div className="h-full flex items-center justify-center text-gray-400 font-bold uppercase tracking-[0.2em] italic text-xs">
                   Vui lòng chọn giảng viên bên trái để giao nhiệm vụ
                </div>
              ) : (
                <div className="space-y-8 animate-in fade-in duration-500">
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Tiêu đề email & công việc</label>
                    <input 
                      type="text" 
                      className="w-full px-5 py-3 border-2 border-gray-50 dark:border-gray-700 rounded-2xl bg-gray-50 dark:bg-gray-900/50 text-sm font-bold focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                      value={taskSubject}
                      onChange={(e) => setTaskSubject(e.target.value)}
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Danh sách nhiệm vụ cụ thể</label>
                      <button className="text-[10px] font-black text-blue-600 hover:underline uppercase tracking-widest">
                         + Thêm mẫu nhanh
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-3 mb-6">
                      {modalTasks.map(task => (
                        <div key={task.id} className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-50 dark:border-gray-700 group hover:border-blue-100 transition-all">
                          <div className={`w-3 h-3 rounded-full shadow-sm ${task.priority === 'Cao' ? 'bg-rose-500' : 'bg-blue-500'}`} />
                          <div className="flex-1">
                            <div className="text-xs font-black text-gray-900 dark:text-white tracking-tight">{task.title}</div>
                            <div className="text-[10px] text-gray-400 font-bold mt-1 uppercase tracking-widest">Hạn: {task.deadline} • Ưu tiên: {task.priority}</div>
                          </div>
                          <button 
                            onClick={() => setModalTasks(modalTasks.filter(t => t.id !== task.id))}
                            className="opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-3 p-4 bg-blue-50/30 dark:bg-blue-900/10 rounded-2xl border-2 border-blue-50 dark:border-blue-800/30">
                      <input 
                        type="text" 
                        placeholder="Nhiệm vụ mới..." 
                        className="flex-1 bg-transparent text-xs font-black border-none focus:ring-0 outline-none"
                        value={newTask.title}
                        onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                      />
                      <select 
                        className="bg-white px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border border-gray-100 outline-none"
                        value={newTask.priority}
                        onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
                      >
                        <option>Thấp</option>
                        <option>Trung bình</option>
                        <option>Cao</option>
                      </select>
                      <button 
                        onClick={() => {
                          if (newTask.title) {
                            setModalTasks([...modalTasks, { ...newTask, id: Date.now(), deadline: '2026-06-15' }]);
                            setNewTask({ title: '', priority: 'Trung bình', deadline: '' });
                          }
                        }}
                        className="p-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all hover:scale-110"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Lời nhắn & Hướng dẫn chi tiết</label>
                    <textarea 
                      className="w-full px-5 py-4 border-2 border-gray-50 dark:border-gray-700 rounded-2xl bg-gray-50 dark:bg-gray-900/50 text-sm font-medium h-32 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all scrollbar-none"
                      value={emailMessage}
                      onChange={(e) => setEmailMessage(e.target.value)}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="px-8 py-6 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-blue-600 shadow-sm">
                <Mail size={24} />
              </div>
              <div>
                <div className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-tight">Gửi Email tới {currentInstructor?.name || '...'}</div>
                <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-0.5">Lưu lịch sử vào hồ sơ cán bộ</div>
              </div>
            </div>
            <div className="flex gap-4">
              <button onClick={onClose} className="px-6 py-3 text-xs font-black text-gray-500 hover:text-gray-900 uppercase tracking-widest">Hủy</button>
              <button 
                disabled={!currentInstructor}
                onClick={() => {
                  onClose();
                  setToastMessage(`Đã giao nhiệm vụ cho ${currentInstructor.name} thành công!`);
                }}
                className={`px-10 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2 ${
                  !currentInstructor ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-blue-600 text-white shadow-xl shadow-blue-100 hover:bg-blue-700 hover:-translate-y-0.5'
                }`}
              >
                Kích hoạt & Gửi <CheckCircle2 size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(AssignTaskModal);
