import React from 'react';
import { BookOpen, Percent, TrendingUp, AlertTriangle } from 'lucide-react';

const CourseKPIs = () => {
  const kpis = [
    {
      title: 'Tỷ lệ Hoàn thành',
      value: '88.5%',
      target: 'Target: 90%',
      trend: '+2.4%',
      trendType: 'up',
      icon: BookOpen,
      color: 'blue'
    },
    {
      title: 'Tỷ lệ Rớt (Fail Rate)',
      value: '18.2%',
      target: 'Target: <15%',
      trend: '-1.5%',
      trendType: 'down',
      icon: Percent,
      color: 'rose'
    },
    {
      title: 'GPA Trung bình',
      value: '7.2',
      target: 'Target: >7.5',
      trend: '+0.3',
      trendType: 'up',
      icon: TrendingUp,
      color: 'emerald'
    },
    {
      title: 'Môn Nguy cơ Cao',
      value: '2 môn',
      target: '1 môn tăng risk',
      trend: '+1',
      trendType: 'up',
      icon: AlertTriangle,
      color: 'amber'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {kpis.map((kpi, index) => {
        const Icon = kpi.icon;
        return (
          <div key={index} className="bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-2.5 rounded-xl bg-${kpi.color}-50 dark:bg-${kpi.color}-900/20 text-${kpi.color}-600 dark:text-${kpi.color}-400 group-hover:scale-110 transition-transform`}>
                <Icon size={20} />
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded-lg ${
                kpi.trendType === 'up' 
                ? (kpi.color === 'rose' ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600')
                : (kpi.color === 'rose' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600')
              }`}>
                {kpi.trend}
              </span>
            </div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{kpi.title}</p>
            <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-2">{kpi.value}</h3>
            <div className="flex items-center justify-between text-[10px]">
              <span className="text-gray-500 font-medium italic">{kpi.target}</span>
              <div className="h-1 w-16 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                <div className={`h-full bg-${kpi.color}-500 w-3/4`}></div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CourseKPIs;
