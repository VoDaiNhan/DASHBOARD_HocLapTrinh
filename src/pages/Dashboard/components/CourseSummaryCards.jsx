import React from 'react';
import { TrendingUp, Info, AlertCircle } from 'lucide-react';

const CourseSummaryCards = () => {
  const stats = [
    {
      value: '88%',
      label: 'Tỉ lệ hoàn thành',
      subLabel: 'Vượt chuẩn +13.0%',
      badge: 'Tốt',
      type: 'success',
      icon: null
    },
    {
      value: '+6.0%',
      label: 'Biến động (YoY)',
      subLabel: 'So với năm 2024',
      badge: null,
      type: 'growth',
      icon: TrendingUp
    },
    {
      value: '~92.3%',
      label: 'Dự báo năm tới',
      subLabel: 'Dựa trên xu hướng hiện tại',
      badge: null,
      type: 'info',
      icon: Info
    },
    {
      value: '22CT111',
      label: 'Điểm nghẽn chính',
      subLabel: 'Tỉ lệ đạt: 68%',
      badge: null,
      type: 'warning',
      icon: null
    }
  ];

  const getStyle = (type) => {
    switch (type) {
      case 'success': return 'border-emerald-100 bg-emerald-50/20';
      case 'growth': return 'border-gray-100 bg-white';
      case 'info': return 'border-gray-100 bg-white';
      case 'warning': return 'border-orange-100 bg-orange-50/30';
      default: return 'border-gray-100 bg-white';
    }
  };

  const getTextColor = (type) => {
    switch (type) {
      case 'success': return 'text-gray-900';
      case 'growth': return 'text-emerald-600';
      case 'info': return 'text-blue-600';
      case 'warning': return 'text-orange-700';
      default: return 'text-gray-900';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, i) => (
        <div key={i} className={`p-5 rounded-2xl border ${getStyle(stat.type)} shadow-sm transition-all hover:shadow-md`}>
          <div className="flex justify-between items-start mb-2">
            <span className={`text-2xl font-black ${getTextColor(stat.type)}`}>
              {stat.value}
            </span>
            {stat.badge && (
              <span className="flex items-center gap-1 px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-black rounded-full uppercase">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                {stat.badge}
              </span>
            )}
            {stat.icon && (
              <div className={`p-1.5 rounded-lg ${stat.type === 'growth' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'}`}>
                <stat.icon size={14} />
              </div>
            )}
          </div>
          <div className="space-y-0.5">
            <p className="text-xs font-bold text-gray-700 dark:text-gray-300">{stat.label}</p>
            <p className={`text-[10px] font-medium ${stat.type === 'warning' ? 'text-orange-500' : 'text-gray-400'}`}>
              {stat.subLabel}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CourseSummaryCards;
