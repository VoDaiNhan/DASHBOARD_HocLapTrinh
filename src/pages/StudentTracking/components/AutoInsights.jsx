import React from 'react';
import { Lightbulb, TrendingDown, AlertTriangle, BarChart3 } from 'lucide-react';

const AutoInsights = ({ students = [] }) => {
  const insights = [
    { icon: TrendingDown, color: 'text-red-600 dark:text-red-400', bg: 'bg-red-50 dark:bg-red-900/20', text: 'Khóa K25 có xu hướng giảm chuyên cần 3 tuần liên tiếp', type: 'warning' },
    { icon: AlertTriangle, color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-900/20', text: 'SV có GPA thấp thường có chuyên cần < 80% (tương quan 87%)', type: 'insight' },
    { icon: BarChart3, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-900/20', text: '3 lớp K26-03, K25-03, K24-03 đang kéo tụt KPI chuyên cần ngành', type: 'action' },
    { icon: TrendingDown, color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-50 dark:bg-purple-900/20', text: 'Môn Lập trình HĐT có tỷ lệ fail cao nhất (28%), cần review nội dung', type: 'suggestion' },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-5">
      <div className="flex items-center gap-2.5 mb-4">
        <div className="p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
          <Lightbulb size={18} className="text-indigo-600 dark:text-indigo-400" />
        </div>
        <div>
          <h2 className="text-base font-bold text-gray-900 dark:text-white">🧠 Nhận định tự động</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">Dashboard tự phân tích dữ liệu</p>
        </div>
      </div>
      <div className="space-y-2.5">
        {insights.map((item, i) => {
          const Icon = item.icon;
          return (
            <div key={i} className={`flex items-start gap-3 p-3 rounded-xl ${item.bg} border border-transparent hover:border-gray-200 dark:hover:border-gray-600 transition-colors`}>
              <Icon size={16} className={`${item.color} mt-0.5 flex-shrink-0`} />
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{item.text}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AutoInsights;
