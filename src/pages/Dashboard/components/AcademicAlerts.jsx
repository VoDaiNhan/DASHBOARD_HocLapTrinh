import React from 'react';
import { AlertTriangle, TrendingDown, Users, ChevronRight } from 'lucide-react';

const AcademicAlerts = () => {
  const alerts = [
    {
      id: 1,
      type: 'critical',
      icon: AlertTriangle,
      message: '3 môn học hiện đang dưới mức KPI 75%',
      subMessage: 'Cần xem xét phương pháp giảng dạy hoặc điều chỉnh đề thi.',
      color: 'rose'
    },
    {
      id: 2,
      type: 'trend',
      icon: TrendingDown,
      message: 'OOP (K22) giảm 12% so với cùng kỳ',
      subMessage: 'Dấu hiệu bất thường trong kết quả bài thi giữa kỳ.',
      color: 'amber'
    },
    {
      id: 3,
      type: 'student',
      icon: Users,
      message: '48 sinh viên chưa hoàn thành học phí & học tập',
      subMessage: 'Có nguy cơ bị cấm thi nếu không giải quyết trong tuần này.',
      color: 'indigo'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {alerts.map((alert) => (
        <div 
          key={alert.id} 
          className="relative overflow-hidden group cursor-pointer bg-white dark:bg-gray-900 p-5 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-all"
        >
          <div className={`absolute top-0 left-0 w-1.5 h-full ${
            alert.color === 'rose' ? 'bg-rose-500' : alert.color === 'amber' ? 'bg-amber-500' : 'bg-indigo-500'
          }`}></div>
          <div className="flex items-start gap-4">
            <div className={`p-2.5 rounded-xl ${
              alert.color === 'rose' ? 'bg-rose-50 text-rose-600' : alert.color === 'amber' ? 'bg-amber-50 text-amber-600' : 'bg-indigo-50 text-indigo-600'
            }`}>
              <alert.icon size={20} />
            </div>
            <div className="flex-1 pr-4">
              <h4 className="text-sm font-bold text-gray-900 dark:text-white leading-tight mb-1">
                {alert.message}
              </h4>
              <p className="text-[11px] text-gray-500 font-medium leading-relaxed">
                {alert.subMessage}
              </p>
            </div>
            <div className="flex items-center text-gray-300 group-hover:text-gray-500 transition-colors">
              <ChevronRight size={16} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AcademicAlerts;
