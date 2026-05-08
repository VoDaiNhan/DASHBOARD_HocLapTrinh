import React from 'react';
import { Eye, Download, Send, Filter } from 'lucide-react';

const QuickActions = ({ onAction }) => {
  const actions = [
    { icon: Eye, label: 'Xem nhóm nguy cơ', color: 'bg-red-600 hover:bg-red-700', key: 'viewRisk' },
    { icon: Download, label: 'Xuất danh sách cảnh báo', color: 'bg-amber-600 hover:bg-amber-700', key: 'export' },
    { icon: Send, label: 'Gửi cố vấn học tập', color: 'bg-blue-600 hover:bg-blue-700', key: 'sendAdvisor' },
    { icon: Filter, label: 'Lọc lớp yếu', color: 'bg-purple-600 hover:bg-purple-700', key: 'filterWeak' },
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {actions.map((a, i) => {
        const Icon = a.icon;
        return (
          <button key={i} onClick={() => onAction?.(a.key) || alert(`Tính năng "${a.label}" sẽ được triển khai`)}
            className={`flex items-center gap-2 px-4 py-2.5 ${a.color} text-white rounded-xl text-sm font-medium shadow-sm transition-colors`}>
            <Icon size={15} />{a.label}
          </button>
        );
      })}
    </div>
  );
};

export default QuickActions;
