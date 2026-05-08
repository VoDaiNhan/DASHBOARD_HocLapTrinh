import React from 'react';
import { AlertCircle, ChevronRight, TrendingDown, Users, FileWarning } from 'lucide-react';

const CourseAlertCenter = () => {
  const alerts = [
    {
      id: 1,
      course: 'Lập trình hướng đối tượng (OOP)',
      issue: 'Tỷ lệ rớt tăng đột biến',
      metric: '28% Fail Rate',
      trend: '↑ 10% so với HK trước',
      type: 'critical',
      action: 'Cần họp tổ bộ môn'
    },
    {
      id: 2,
      course: 'Cấu trúc dữ liệu & Giải thuật',
      issue: 'GPA trung bình giảm mạnh',
      metric: '6.2 GPA',
      trend: '↓ 0.8 điểm',
      type: 'warning',
      action: 'Review độ khó đề thi'
    },
    {
      id: 3,
      course: 'Kỹ thuật lập trình',
      issue: 'Tỷ lệ hoàn thành (Completion) thấp',
      metric: '72% Completed',
      trend: '3 lớp dưới chuẩn 80%',
      type: 'attention',
      action: 'Kiểm tra tiến độ giảng dạy'
    }
  ];

  const getTypeStyles = (type) => {
    switch (type) {
      case 'critical': return 'bg-rose-50 border-rose-100 text-rose-700 dark:bg-rose-900/20 dark:border-rose-800/40';
      case 'warning': return 'bg-amber-50 border-amber-100 text-amber-700 dark:bg-amber-900/20 dark:border-amber-800/40';
      default: return 'bg-blue-50 border-blue-100 text-blue-700 dark:bg-blue-900/20 dark:border-blue-800/40';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-rose-100 dark:bg-rose-900/30 rounded-2xl animate-pulse">
            <AlertCircle size={22} className="text-rose-600 dark:text-rose-400" />
          </div>
          <div>
            <h3 className="text-lg font-black text-gray-900 dark:text-white uppercase tracking-tight">Trung tâm Cảnh báo Môn học</h3>
            <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-0.5 italic">⚠️ 3 vấn đề cần xử lý ngay</p>
          </div>
        </div>
        <button className="text-xs font-black text-indigo-600 hover:underline uppercase tracking-widest">Xem tất cả báo cáo</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {alerts.map((alert) => (
          <div key={alert.id} className={`p-4 rounded-2xl border ${getTypeStyles(alert.type)} hover:shadow-md transition-all cursor-pointer group relative overflow-hidden`}>
            <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
              <FileWarning size={40} />
            </div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-black uppercase tracking-widest opacity-80">{alert.course}</span>
                <ChevronRight size={14} />
              </div>
              <h4 className="text-sm font-black mb-1">{alert.issue}</h4>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-lg font-black">{alert.metric}</span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 bg-white/50 dark:bg-black/20 rounded-md">
                  {alert.trend}
                </span>
              </div>
              <div className="pt-3 border-t border-black/5 dark:border-white/5 flex items-center justify-between">
                <span className="text-[10px] font-bold italic">💡 {alert.action}</span>
                <button className="p-1 hover:bg-white/40 dark:hover:bg-black/40 rounded-lg transition-colors">
                  <Users size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseAlertCenter;
