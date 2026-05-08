import React from 'react';
import { ShieldCheck, ShieldAlert, Shield, HelpCircle, Info } from 'lucide-react';

const CourseHealthScore = () => {
  const courses = [
    { name: 'OOP', health: 'critical', score: 42, gpa: 6.2, fail: 28, attend: 75, k24: 'green', k25: 'red', k26: 'orange' },
    { name: 'CTDLGT', health: 'warning', score: 65, gpa: 7.1, fail: 22, attend: 82, k24: 'orange', k25: 'red', k26: 'red' },
    { name: 'Nhập môn LT', health: 'stable', score: 92, gpa: 8.4, fail: 12, attend: 91, k24: 'green', k25: 'green', k26: 'green' },
    { name: 'Cơ sở dữ liệu', health: 'stable', score: 88, gpa: 7.9, fail: 15, attend: 88, k24: 'green', k25: 'orange', k26: 'green' },
  ];

  const getHealthBadge = (health) => {
    switch (health) {
      case 'critical': return <div className="flex items-center gap-1.5 px-2 py-1 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 rounded-lg text-[10px] font-black uppercase"><ShieldAlert size={12}/> Nguy hiểm</div>;
      case 'warning': return <div className="flex items-center gap-1.5 px-2 py-1 bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 rounded-lg text-[10px] font-black uppercase"><Shield size={12}/> Cần chú ý</div>;
      default: return <div className="flex items-center gap-1.5 px-2 py-1 bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 rounded-lg text-[10px] font-black uppercase"><ShieldCheck size={12}/> Ổn định</div>;
    }
  };

  const getHeatmapColor = (status) => {
    switch (status) {
      case 'red': return 'bg-red-500 shadow-sm shadow-red-200';
      case 'orange': return 'bg-orange-500 shadow-sm shadow-orange-200';
      default: return 'bg-emerald-500 shadow-sm shadow-emerald-200';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* 1. Health Score Table */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-50 dark:border-gray-700 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-black text-gray-900 dark:text-white uppercase tracking-tight">Chỉ số sức khỏe Môn học</h3>
            <div className="group relative">
              <Info size={14} className="text-gray-400 cursor-help" />
              <div className="absolute bottom-full left-0 mb-2 w-48 p-2 bg-gray-900 text-white text-[10px] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity z-50">
                Tính toán dựa trên: 40% Fail rate + 30% GPA + 20% Attendance + 10% Completion
              </div>
            </div>
          </div>
          <span className="text-[10px] font-bold text-gray-400">Cập nhật: 2 giờ trước</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 dark:bg-gray-700/30">
              <tr>
                <th className="px-6 py-3 text-[10px] font-black text-gray-500 uppercase">Môn học</th>
                <th className="px-6 py-3 text-[10px] font-black text-gray-500 uppercase">Sức khỏe</th>
                <th className="px-6 py-3 text-[10px] font-black text-gray-500 uppercase text-center">Health Score</th>
                <th className="px-6 py-3 text-[10px] font-black text-gray-500 uppercase text-right">GPA / Fail</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
              {courses.map((course, idx) => (
                <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                  <td className="px-6 py-4 font-bold text-sm text-gray-900 dark:text-white">{course.name}</td>
                  <td className="px-6 py-4">{getHealthBadge(course.health)}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-16 h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div className={`h-full ${course.score < 50 ? 'bg-red-500' : course.score < 80 ? 'bg-orange-500' : 'bg-emerald-500'}`} style={{ width: `${course.score}%` }}></div>
                      </div>
                      <span className="text-xs font-black text-gray-700 dark:text-gray-300">{course.score}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="text-sm font-black text-gray-900 dark:text-white">{course.gpa}</div>
                    <div className="text-[10px] font-bold text-red-500">{course.fail}% Fail</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 2. Heatmap theo lớp/khóa */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
        <div className="mb-6">
          <h3 className="text-base font-black text-gray-900 dark:text-white uppercase tracking-tight mb-1">Ma trận Hiệu suất theo Khóa (Heatmap)</h3>
          <p className="text-xs text-gray-500 italic">Theo dõi biến động chất lượng giữa các thế hệ sinh viên</p>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-4">
          <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">Tên môn</div>
          <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Khóa K24</div>
          <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Khóa K25</div>
          <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Khóa K26</div>
        </div>

        <div className="space-y-3">
          {courses.map((course, idx) => (
            <div key={idx} className="grid grid-cols-4 gap-4 items-center p-2 hover:bg-gray-50 dark:hover:bg-gray-700/30 rounded-xl transition-all">
              <div className="text-xs font-black text-gray-700 dark:text-gray-300 uppercase pl-2">{course.name}</div>
              <div className="flex justify-center"><div className={`w-8 h-8 rounded-lg ${getHeatmapColor(course.k24)}`}></div></div>
              <div className="flex justify-center"><div className={`w-8 h-8 rounded-lg ${getHeatmapColor(course.k25)}`}></div></div>
              <div className="flex justify-center"><div className={`w-8 h-8 rounded-lg ${getHeatmapColor(course.k26)}`}></div></div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex items-center justify-between pt-6 border-t border-gray-50 dark:border-gray-700">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded bg-emerald-500"></div><span className="text-[10px] font-bold text-gray-400 italic">Tốt</span></div>
            <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded bg-orange-500"></div><span className="text-[10px] font-bold text-gray-400 italic">Cần chú ý</span></div>
            <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded bg-red-500"></div><span className="text-[10px] font-bold text-gray-400 italic">Báo động</span></div>
          </div>
          <button className="px-4 py-1.5 bg-gray-100 dark:bg-gray-700 text-[10px] font-black uppercase rounded-lg">Chi tiết khóa học</button>
        </div>
      </div>
    </div>
  );
};

export default CourseHealthScore;
