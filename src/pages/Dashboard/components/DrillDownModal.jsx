import React from 'react';
import { X, User, School, BookOpen, AlertCircle, Users, TrendingUp, Calendar, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DrillDownModal = ({ isOpen, onClose, data }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const classes = [
    { name: 'K22_CNTT1', instructor: 'ThS. Nguyễn Văn A', completion: '85%', status: 'good', size: 45, gpa: 7.8, absences: '2%' },
    { name: 'K22_CNTT2', instructor: 'TS. Trần Thị B', completion: '72%', status: 'warning', size: 42, gpa: 6.5, absences: '8%' },
    { name: 'K22_CNTT3', instructor: 'ThS. Lê Hoàng C', completion: '92%', status: 'good', size: 48, gpa: 8.2, absences: '1%' },
    { name: 'K22_CNTT4', instructor: 'ThS. Phạm Nam D', completion: '45%', status: 'critical', size: 40, gpa: 4.8, absences: '15%' },
    { name: 'K22_CNTT5', instructor: 'ThS. Đỗ Minh E', completion: '88%', status: 'good', size: 44, gpa: 7.6, absences: '3%' },
  ];

  const students = [
    { name: 'Nguyễn Văn Nam', id: 'SV001', reason: 'Chưa hoàn thành bài tập' },
    { name: 'Trần Minh Hải', id: 'SV005', reason: 'Nghỉ học quá 20%' },
    { name: 'Lê Thu Trang', id: 'SV012', reason: 'Điểm thành phần dưới 4.0' },
  ];

  const handleClassClick = (className) => {
    onClose();
    // Navigate to class management with the class name as a filter (hypothetically)
    navigate(`/classes?search=${className}`);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative bg-white dark:bg-gray-900 w-full max-w-5xl max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-gray-100 dark:border-gray-800 animate-in zoom-in-95 duration-200 transform-gpu">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between bg-gray-50/50 dark:bg-gray-800/30 shrink-0">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-600 text-white rounded-2xl shadow-lg">
              <BookOpen size={24} />
            </div>
            <div>
              <h3 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight">Phân tích Chi tiết Năm {data?.year}</h3>
              <p className="text-sm text-gray-500 font-bold uppercase tracking-widest text-[10px] mt-0.5">Dữ liệu hiệu suất lớp học & rủi ro sinh viên</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl transition-colors">
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-10 overscroll-contain scroll-smooth" style={{ WebkitOverflowScrolling: 'touch' }}>
          {/* Lớp học đóng góp vào tỉ lệ tổng */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
                <School size={14} className="text-indigo-500" /> Danh sách lớp đóng góp
              </h4>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1.5 rounded-full uppercase tracking-wider">
                  Tổng cộng: {classes.length} lớp
                </span>
              </div>
            </div>
            
            <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl mb-8 border border-dashed border-gray-200 dark:border-gray-700">
              <p className="text-xs text-gray-500 font-bold flex items-center gap-2">
                <AlertCircle size={14} className="text-amber-500" />
                <span>Tỉ lệ <span className="text-indigo-600">{data?.completion}%</span> của năm {data?.year} được tổng hợp từ dữ liệu thời gian thực của các lớp chuyên ngành dưới đây:</span>
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {classes.map((c, i) => (
                <div 
                  key={i} 
                  onClick={() => handleClassClick(c.name)}
                  className={`group relative p-5 rounded-3xl border-2 transition-all cursor-pointer hover:shadow-xl hover:-translate-y-1 ${
                    c.status === 'critical' ? 'border-rose-100 bg-rose-50/10 hover:border-rose-500' : 
                    c.status === 'warning' ? 'border-amber-100 bg-amber-50/10 hover:border-amber-500' : 
                    'border-emerald-100 bg-emerald-50/10 hover:border-emerald-500'
                  }`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-tighter block">{c.name}</span>
                      <div className="flex items-center gap-1 mt-1">
                        <User size={10} className="text-gray-400" />
                        <span className="text-[10px] text-gray-500 font-bold">{c.instructor}</span>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-[10px] font-black ${
                      c.status === 'critical' ? 'bg-rose-100 text-rose-600' : 
                      c.status === 'warning' ? 'bg-amber-100 text-amber-600' : 
                      'bg-emerald-100 text-emerald-600'
                    }`}>
                      {c.completion}
                    </div>
                  </div>

                  {/* Enhanced Metrics Row */}
                  <div className="grid grid-cols-3 gap-2 mt-6 pt-4 border-t border-gray-100 dark:border-gray-800">
                    <div className="text-center">
                      <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">Sĩ số</p>
                      <div className="flex items-center justify-center gap-1 text-gray-700 dark:text-gray-300">
                        <Users size={10} />
                        <span className="text-xs font-black">{c.size}</span>
                      </div>
                    </div>
                    <div className="text-center border-x border-gray-100 dark:border-gray-800 px-2">
                      <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">GPA</p>
                      <div className="flex items-center justify-center gap-1 text-gray-700 dark:text-gray-300">
                        <TrendingUp size={10} />
                        <span className="text-xs font-black">{c.gpa}</span>
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">Vắng</p>
                      <div className="flex items-center justify-center gap-1 text-gray-700 dark:text-gray-300">
                        <Calendar size={10} />
                        <span className="text-xs font-black">{c.absences}</span>
                      </div>
                    </div>
                  </div>

                  {/* Hover link indicator */}
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-indigo-600 text-white p-1.5 rounded-lg shadow-lg translate-x-2 group-hover:translate-x-0 transition-transform">
                    <ArrowRight size={12} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Sinh viên */}
          <section className="bg-gray-50 dark:bg-gray-800/30 rounded-3xl p-6 border border-gray-100 dark:border-gray-800">
            <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
              <AlertCircle size={14} className="text-rose-500" /> Danh sách SV Cần chú ý khẩn cấp
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {students.map((s, i) => (
                <div key={i} className="flex flex-col p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-700 hover:border-rose-300 transition-colors shadow-sm">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-10 h-10 rounded-2xl bg-rose-50 dark:bg-rose-900/20 flex items-center justify-center text-rose-600 font-black text-xs shadow-inner">
                      {s.id.slice(-3)}
                    </div>
                    <div>
                      <p className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-tight leading-tight">{s.name}</p>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{s.id}</p>
                    </div>
                  </div>
                  <div className="mt-auto pt-3 border-t border-gray-50 dark:border-gray-800">
                    <span className="px-3 py-1 bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 text-[9px] font-black rounded-lg uppercase tracking-wider block text-center">
                      {s.reason}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30 flex justify-between items-center">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest italic">* Nhấn vào từng lớp để xem chi tiết tại trang Quản lý lớp</p>
          <div className="flex gap-3">
            <button onClick={onClose} className="px-6 py-3 text-[10px] font-black text-gray-500 hover:text-gray-700 uppercase tracking-widest">ĐÓNG</button>
            <button className="px-8 py-3 bg-gray-900 dark:bg-indigo-600 text-white text-[10px] font-black rounded-2xl hover:bg-black uppercase tracking-widest shadow-xl transition-all hover:scale-105 active:scale-95">
              XUẤT BÁO CÁO PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrillDownModal;
