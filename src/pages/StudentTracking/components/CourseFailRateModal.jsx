import React, { useState } from 'react';
import { X, BookOpen, AlertCircle, TrendingUp, User, ChevronRight, BarChart3, Calendar, CheckCircle } from 'lucide-react';

const CourseFailRateModal = ({ isOpen, onClose }) => {
  const [scheduled, setScheduled] = useState(false);
  const courses = [
    { id: 1, name: 'Lập trình hướng đối tượng (OOP)', failRate: 28, total: 120, failCount: 34, prevFailRate: 15, instructor: 'TS. Lê Văn Cường' },
  ];

  const handleSchedule = () => {
    setScheduled(true);
    setTimeout(() => {
      setScheduled(false);
      onClose();
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden">
        <div className="bg-gradient-to-r from-rose-500 to-pink-600 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BookOpen className="text-white" size={24} />
            <div>
              <h2 className="text-lg font-bold text-white">Môn học có tỷ lệ Rớt cao</h2>
              <p className="text-xs text-white/80">Cảnh báo chất lượng giảng dạy hoặc độ khó môn học</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-white/20 rounded-lg"><X size={20} className="text-white" /></button>
        </div>

        <div className="p-6">
          {courses.map(course => (
            <div key={course.id} className="space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{course.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <User size={14} className="text-gray-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">{course.instructor}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-black text-rose-600">{course.failRate}%</div>
                  <div className="text-[10px] text-gray-400 font-bold uppercase">Tỷ lệ rớt hiện tại</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-2xl">
                  <p className="text-xs text-gray-500 mb-2 font-bold uppercase">Thống kê chi tiết</p>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Tổng sinh viên:</span>
                      <span className="font-bold text-gray-900 dark:text-white">{course.total}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Số lượng rớt:</span>
                      <span className="font-bold text-red-500">{course.failCount}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Kỳ trước:</span>
                      <span className="font-bold text-gray-500">{course.prevFailRate}%</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-rose-50 dark:bg-rose-900/10 rounded-2xl border border-rose-100 dark:border-rose-900/30">
                  <p className="text-xs text-rose-500 mb-2 font-bold uppercase">Nguyên nhân dự đoán (AI)</p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-xs text-rose-800 dark:text-rose-300">
                      <div className="w-1 h-1 rounded-full bg-rose-500 mt-1.5 flex-shrink-0"></div>
                      Đề thi cuối kỳ có độ khó tăng 30% so với trung bình.
                    </li>
                    <li className="flex items-start gap-2 text-xs text-rose-800 dark:text-rose-300">
                      <div className="w-1 h-1 rounded-full bg-rose-500 mt-1.5 flex-shrink-0"></div>
                      Tỷ lệ chuyên cần của nhóm rớt thấp (&lt; 65%).
                    </li>
                    <li className="flex items-start gap-2 text-xs text-rose-800 dark:text-rose-300">
                      <div className="w-1 h-1 rounded-full bg-rose-500 mt-1.5 flex-shrink-0"></div>
                      Thiếu hụt kiến thức nền tảng về C++.
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-blue-50 dark:bg-blue-900/10 p-4 rounded-xl">
                <BarChart3 className="text-blue-600" size={20} />
                <div>
                  <p className="text-sm font-bold text-blue-800 dark:text-blue-300">Đề xuất quản lý</p>
                  <p className="text-xs text-blue-700/80 dark:text-blue-400/80 mt-0.5">Tổ chức buổi họp chuyên môn với giảng viên để đánh giá lại đề thi và phương pháp hướng dẫn bài tập.</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-700 flex justify-end gap-3">
          <button onClick={onClose} className="px-6 py-2 text-sm font-bold text-gray-500 hover:bg-gray-100 rounded-xl transition-all">Bỏ qua</button>
          <button 
            onClick={handleSchedule}
            className={`px-6 py-2 rounded-xl text-sm font-bold shadow-lg transition-all flex items-center gap-2 ${
              scheduled ? 'bg-green-600 text-white' : 'bg-gray-900 text-white hover:bg-black'
            }`}
          >
            {scheduled ? <><CheckCircle size={16} /> Đã lên lịch</> : <><Calendar size={16} /> Lên lịch họp</>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseFailRateModal;
