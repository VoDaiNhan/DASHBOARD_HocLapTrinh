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
      case 'success': return 'border-emerald-100 bg-gradient-to-br from-emerald-50/40 to-teal-50/40';
      case 'growth': return 'border-blue-100 bg-gradient-to-br from-blue-50/40 to-indigo-50/40';
      case 'info': return 'border-indigo-100 bg-gradient-to-br from-indigo-50/40 to-violet-50/40';
      case 'warning': return 'border-rose-100 bg-gradient-to-br from-rose-50/40 to-orange-50/40';
      default: return 'border-gray-100 bg-white';
    }
  };

  const getTextColor = (type) => {
    switch (type) {
      case 'success': return 'text-emerald-700';
      case 'growth': return 'text-blue-700';
      case 'info': return 'text-indigo-700';
      case 'warning': return 'text-rose-700';
      default: return 'text-gray-900';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      {stats.map((stat, i) => (
        <div key={i} className={`p-6 rounded-[2rem] border-2 ${getStyle(stat.type)} shadow-sm transition-all duration-500 hover:shadow-xl hover:shadow-indigo-100/50 hover:-translate-y-1 group`}>
          <div className="flex justify-between items-start mb-4">
            <span className={`text-3xl font-black tracking-tighter ${getTextColor(stat.type)}`}>
              {stat.value}
            </span>
            {stat.badge && (
              <span className="flex items-center gap-1.5 px-3 py-1 bg-white/80 text-emerald-700 text-[10px] font-black rounded-full uppercase tracking-widest shadow-sm">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                {stat.badge}
              </span>
            )}
            {stat.icon && (
              <div className={`p-2.5 rounded-2xl bg-white/80 shadow-sm transition-transform group-hover:rotate-12`}>
                <stat.icon size={16} className={getTextColor(stat.type)} />
              </div>
            )}
          </div>
          <div className="space-y-1">
            <p className="text-xs font-black text-gray-800 dark:text-gray-200 uppercase tracking-widest">{stat.label}</p>
            <p className={`text-[10px] font-bold ${stat.type === 'warning' ? 'text-rose-500' : 'text-gray-500'}`}>
              {stat.subLabel}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CourseSummaryCards;
