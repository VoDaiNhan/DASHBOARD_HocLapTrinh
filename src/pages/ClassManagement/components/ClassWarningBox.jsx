import React from 'react';
import { AlertTriangle, Clock, CheckCircle, Eye } from 'lucide-react';

const ICON_MAP = {
  critical: AlertTriangle,
  warning:  Clock,
  info:     CheckCircle,
  red:      AlertTriangle,
  orange:   Clock,
  green:    CheckCircle,
};

const ClassWarningBox = ({ warnings = [], onViewRiskClasses }) => {
  const defaultWarnings = warnings.length > 0 ? warnings : [
    { id: 1, type: 'critical', color: 'red',    message: '3 lớp có tiến độ <60%' },
    { id: 2, type: 'warning',  color: 'orange', message: '2 lớp chưa cập nhật kết quả 2 tuần' },
    { id: 3, type: 'info',     color: 'green',  message: 'Tỷ lệ hoàn thành ngành tăng 5% so với kỳ trước' },
  ];

  const getColorClasses = (color) => {
    const colors = {
      red:    { bg: 'bg-red-50 dark:bg-red-900/20',    border: 'border-red-200 dark:border-red-800',    icon: 'text-red-600 dark:text-red-400',    dot: 'bg-red-500' },
      orange: { bg: 'bg-orange-50 dark:bg-orange-900/20', border: 'border-orange-200 dark:border-orange-800', icon: 'text-orange-600 dark:text-orange-400', dot: 'bg-orange-500' },
      green:  { bg: 'bg-green-50 dark:bg-green-900/20',  border: 'border-green-200 dark:border-green-800',  icon: 'text-green-600 dark:text-green-400',  dot: 'bg-green-500' },
    };
    return colors[color] || colors.red;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Cảnh báo & Rủi ro</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Theo dõi và hành động kịp thời</p>
        </div>
      </div>

      <div className="space-y-3 mb-6">
        {defaultWarnings.map((warning) => {
          // Lấy icon từ type hoặc color, fallback về AlertTriangle
          const Icon = warning.icon ?? ICON_MAP[warning.type] ?? ICON_MAP[warning.color] ?? AlertTriangle;
          const colors = getColorClasses(warning.color);
          return (
            <div key={warning.id} className={`${colors.bg} ${colors.border} border rounded-lg p-4 flex items-start gap-3`}>
              <div className={`${colors.dot} w-2 h-2 rounded-full mt-2 flex-shrink-0`} />
              <Icon className={`${colors.icon} flex-shrink-0 mt-0.5`} size={18} />
              <p className="flex-1 text-sm text-gray-700 dark:text-gray-300">{warning.message}</p>
            </div>
          );
        })}
      </div>

      <button
        onClick={() => onViewRiskClasses?.()}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
      >
        <Eye className="h-5 w-5" />
        <span>Xem chi tiết lớp rủi ro</span>
      </button>
    </div>
  );
};

export default ClassWarningBox;
