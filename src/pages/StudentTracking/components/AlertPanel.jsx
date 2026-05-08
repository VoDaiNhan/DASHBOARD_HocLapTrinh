import React from 'react';
import { Target, Clock, BookOpen, ChevronRight, Bell, FileWarning } from 'lucide-react';

const AlertPanel = ({ students = [], onAlertClick }) => {
  const lowAttendanceClasses = [
    { name: 'K26-03', rate: 78 },
    { name: 'K25-03', rate: 76 },
    { name: 'K24-03', rate: 79 },
  ];

  const progressAlerts = {
    onTime: 85,
    missingCredits: 12,
    delayedGraduation: 5
  };

  const missingAssignmentClasses = [
    { name: 'K25-02', missingRate: 35 },
    { name: 'K24-03', missingRate: 22 },
  ];

  const highFailCourses = [
    { name: 'Lập trình HĐT', failRate: 28 },
  ];

  const alerts = [
    {
      icon: Clock,
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
      borderColor: 'border-orange-200 dark:border-orange-800/40',
      iconColor: 'text-orange-600 dark:text-orange-400',
      title: `${lowAttendanceClasses.length} lớp dưới 80% chuyên cần`,
      detail: lowAttendanceClasses.map(c => `${c.name} (${c.rate}%)`).join(', '),
      action: 'attendance'
    },
    {
      icon: Target,
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      borderColor: 'border-blue-200 dark:border-blue-800/40',
      iconColor: 'text-blue-600 dark:text-blue-400',
      title: `Tiến độ hoàn thành: ${progressAlerts.onTime}% đúng hạn`,
      detail: `${progressAlerts.missingCredits} SV thiếu tín chỉ, ${progressAlerts.delayedGraduation} SV nguy cơ trễ tốt nghiệp`,
      action: 'progress'
    },
    {
      icon: FileWarning,
      bgColor: 'bg-amber-50 dark:bg-amber-900/20',
      borderColor: 'border-amber-200 dark:border-amber-800/40',
      iconColor: 'text-amber-600 dark:text-amber-400',
      title: `${missingAssignmentClasses.length} lớp thiếu bài tập nộp`,
      detail: missingAssignmentClasses.map(c => `${c.name} (vắng ${c.missingRate}% bài)`).join(', '),
      action: 'assignment'
    },
    {
      icon: BookOpen,
      bgColor: 'bg-rose-50 dark:bg-rose-900/20',
      borderColor: 'border-rose-200 dark:border-rose-800/40',
      iconColor: 'text-rose-600 dark:text-rose-400',
      title: `${highFailCourses.length} môn có tỷ lệ fail cao`,
      detail: highFailCourses.map(c => `${c.name} (${c.failRate}%)`).join(', '),
      action: 'fail'
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-5 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg animate-pulse">
            <Bell size={18} className="text-red-600 dark:text-red-400" />
          </div>
          <div>
            <h2 className="text-base font-bold text-gray-900 dark:text-white">⚠️ Cần chú ý hôm nay</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">Các vấn đề cần xử lý ngay</p>
          </div>
        </div>
        <span className="px-2.5 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-xs font-bold rounded-full">
          {alerts.length} cảnh báo
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {alerts.map((alert, index) => {
          const Icon = alert.icon;
          return (
            <div
              key={index}
              className={`flex items-start gap-3 p-3.5 rounded-xl border ${alert.bgColor} ${alert.borderColor} cursor-pointer hover:shadow-md transition-all duration-200 group`}
              onClick={() => onAlertClick && onAlertClick(alert.action)}
            >
              <div className={`p-1.5 rounded-lg ${alert.bgColor}`}>
                <Icon size={16} className={alert.iconColor} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 dark:text-white">{alert.title}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-1">{alert.detail}</p>
              </div>
              <ChevronRight size={16} className="text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 mt-1 flex-shrink-0 transition-colors" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AlertPanel;
