import React from 'react';
import { X, User, School, BookOpen, AlertCircle, Users, TrendingUp, Calendar, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DrillDownModal = ({ isOpen, onClose, data }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const classes = [
    { name: 'K22_CNTT1', instructor: 'ThS. Nguyễn Văn A', completion: 85, failRate: '5%', status: 'good', size: 45, gpa: 7.8, riskStudents: 2, pendingTasks: 5 },
    { name: 'K22_CNTT2', instructor: 'TS. Trần Thị B', completion: 72, failRate: '15%', status: 'warning', size: 42, gpa: 6.5, riskStudents: 8, pendingTasks: 12 },
    { name: 'K22_CNTT3', instructor: 'ThS. Lê Hoàng C', completion: 92, failRate: '2%', status: 'good', size: 48, gpa: 8.2, riskStudents: 1, pendingTasks: 2 },
    { name: 'K22_CNTT4', instructor: 'ThS. Phạm Nam D', completion: 45, failRate: '40%', status: 'critical', size: 40, gpa: 4.8, riskStudents: 18, pendingTasks: 25 },
    { name: 'K22_CNTT5', instructor: 'ThS. Đỗ Minh E', completion: 88, failRate: '4%', status: 'good', size: 44, gpa: 7.6, riskStudents: 3, pendingTasks: 4 },
  ];

  const students = [
    { name: 'Nguyễn Văn Nam', id: 'SV001', class: 'K22_CNTT4', gpa: 3.2, reason: 'Nghỉ học quá 25%', priority: 'High' },
    { name: 'Trần Minh Hải', id: 'SV005', class: 'K22_CNTT4', gpa: 3.8, reason: 'Nợ 5 bài tập Lab', priority: 'High' },
    { name: 'Lê Thu Trang', id: 'SV012', class: 'K22_CNTT2', gpa: 4.5, reason: 'Điểm Mid-term < 4.0', priority: 'Medium' },
    { name: 'Phạm Đức Anh', id: 'SV022', class: 'K22_CNTT4', gpa: 2.1, reason: 'Mất gốc thuật toán', priority: 'High' },
  ];

  const handleClassClick = (className) => {
    onClose();
    navigate(`/classes?search=${className}`);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative bg-white dark:bg-gray-900 w-full max-w-6xl max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-gray-100 dark:border-gray-800 animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-8 py-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between bg-gray-50/50 dark:bg-gray-800/30">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-600 text-white rounded-2xl shadow-lg">
              <BookOpen size={24} />
            </div>
            <div>
              <h3 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight">Báo cáo Phân tích Chi tiết Năm {data?.year}</h3>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-0.5">Dữ liệu hiệu suất cấp lớp & định danh sinh viên rủi ro</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl transition-colors">
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-10 scrollbar-none">
          {/* Lớp học đóng góp */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
                <School size={14} className="text-indigo-500" /> Hiệu suất các lớp học phần
              </h4>
              <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1.5 rounded-full uppercase tracking-wider">
                Quy mô: {classes.length} lớp học
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {classes.map((c, i) => (
                <div 
                  key={i} 
                  onClick={() => handleClassClick(c.name)}
                  className={`group relative p-6 rounded-3xl border-2 transition-all cursor-pointer hover:shadow-2xl hover:-translate-y-1 ${
                    c.status === 'critical' ? 'border-rose-100 bg-rose-50/5 hover:border-rose-500' : 
                    c.status === 'warning' ? 'border-amber-100 bg-amber-50/5 hover:border-amber-500' : 
                    'border-emerald-100 bg-emerald-50/5 hover:border-emerald-500'
                  }`}
                >
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <span className="text-base font-black text-gray-900 dark:text-white uppercase tracking-tighter block">{c.name}</span>
                      <div className="flex items-center gap-1.5 mt-1">
                        <User size={12} className="text-gray-400" />
                        <span className="text-[10px] text-gray-500 font-bold uppercase tracking-tight">{c.instructor}</span>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-black ${
                      c.status === 'critical' ? 'bg-rose-100 text-rose-600' : 
                      c.status === 'warning' ? 'bg-amber-100 text-amber-600' : 
                      'bg-emerald-100 text-emerald-600'
                    }`}>
                      {c.completion}%
                    </div>
                  </div>

                  {/* Indicator Progress */}
                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between text-[8px] font-black uppercase tracking-widest text-gray-400">
                      <span>Tiến độ hoàn thành</span>
                      <span className={c.completion < 75 ? 'text-rose-500' : 'text-emerald-500'}>
                        {c.completion < 75 ? `Thiếu ${75 - c.completion}%` : 'Đạt chuẩn'}
                      </span>
                    </div>
                    <div className="h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-1000 ${
                          c.status === 'critical' ? 'bg-rose-500' : 
                          c.status === 'warning' ? 'bg-amber-500' : 
                          'bg-emerald-500'
                        }`} 
                        style={{ width: `${c.completion}%` }} 
                      />
                    </div>
                  </div>

                  {/* High Density Metrics */}
                  <div className="grid grid-cols-2 gap-y-4 gap-x-6 pt-4 border-t border-gray-100 dark:border-gray-800">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded-xl">
                        <Users size={14} className="text-gray-400" />
                      </div>
                      <div>
                        <p className="text-[8px] font-black text-gray-400 uppercase">Sĩ số</p>
                        <p className="text-xs font-black text-gray-900 dark:text-white">{c.size} SV</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-rose-50 dark:bg-rose-900/20 rounded-xl">
                        <AlertCircle size={14} className="text-rose-500" />
                      </div>
                      <div>
                        <p className="text-[8px] font-black text-rose-400 uppercase">Rớt môn</p>
                        <p className="text-xs font-black text-rose-600">{c.failRate}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-amber-50 dark:bg-amber-900/20 rounded-xl">
                        <User size={14} className="text-amber-500" />
                      </div>
                      <div>
                        <p className="text-[8px] font-black text-amber-400 uppercase">SV rủi ro</p>
                        <p className="text-xs font-black text-amber-600">{c.riskStudents} SV</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl">
                        <TrendingUp size={14} className="text-indigo-500" />
                      </div>
                      <div>
                        <p className="text-[8px] font-black text-indigo-400 uppercase">GPA Lớp</p>
                        <p className="text-xs font-black text-indigo-600">{c.gpa}</p>
                      </div>
                    </div>
                  </div>

                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all bg-indigo-600 text-white p-2 rounded-xl shadow-xl translate-x-2 group-hover:translate-x-0">
                    <ArrowRight size={14} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Sinh viên nguy cơ */}
          <section className="bg-gray-50 dark:bg-gray-800/30 rounded-3xl p-8 border border-gray-100 dark:border-gray-800">
            <div className="flex items-center justify-between mb-8">
              <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
                <AlertCircle size={14} className="text-rose-500" /> Nhận diện Sinh viên Nguy cơ cao
              </h4>
              <button className="text-[9px] font-black text-indigo-600 uppercase tracking-widest hover:underline">Xem tất cả</button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {students.map((s, i) => (
                <div key={i} className="flex flex-col p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-700 hover:border-rose-300 transition-all shadow-sm group">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-gray-500 font-black text-[10px] group-hover:bg-rose-50 group-hover:text-rose-600 transition-colors">
                      {s.id.slice(-3)}
                    </div>
                    <div>
                      <p className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-tight">{s.name}</p>
                      <p className="text-[8px] text-gray-400 font-bold uppercase">{s.class} • GPA: {s.gpa}</p>
                    </div>
                  </div>
                  <div className="mt-auto">
                    <div className="px-3 py-2 bg-rose-50/50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 text-[9px] font-black rounded-xl uppercase tracking-wider text-center border border-rose-100/50">
                      {s.reason}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="px-8 py-5 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></div>
            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest italic">Nhấn vào thẻ lớp để truy xuất dữ liệu chi tiết tại trang Quản lý lớp</p>
          </div>
          <div className="flex gap-4">
            <button onClick={onClose} className="px-6 py-2 text-[10px] font-black text-gray-500 hover:text-gray-900 uppercase tracking-widest transition-all">Đóng</button>
            <button className="px-8 py-3 bg-indigo-600 text-white text-[10px] font-black rounded-2xl hover:bg-indigo-700 shadow-xl shadow-indigo-100 uppercase tracking-widest transition-all hover:scale-105 active:scale-95">
              Xuất dữ liệu chi tiết
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrillDownModal;
