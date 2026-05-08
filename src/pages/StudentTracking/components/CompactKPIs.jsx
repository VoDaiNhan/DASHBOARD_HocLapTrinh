import React from 'react';
import { Users, AlertTriangle, Target, TrendingUp, TrendingDown } from 'lucide-react';

const CompactKPIs = ({ stats }) => {
  const kpis = [
    {
      label: 'Tổng SV',
      value: stats.totalStudents || 660,
      icon: Users,
      color: 'text-blue-600 dark:text-blue-400',
      bg: 'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      label: 'GPA TB',
      value: (stats.averageScore || 7.5).toFixed(1),
      icon: TrendingUp,
      color: 'text-emerald-600 dark:text-emerald-400',
      bg: 'bg-emerald-50 dark:bg-emerald-900/20',
      change: +0.3
    },
    {
      label: '% Hoàn thành',
      value: `${stats.completedPercentage || 78}%`,
      icon: Target,
      color: 'text-purple-600 dark:text-purple-400',
      bg: 'bg-purple-50 dark:bg-purple-900/20',
      change: +3.2
    },
    {
      label: '% Nguy cơ',
      value: `${stats.atRiskPercentage || 8}%`,
      icon: AlertTriangle,
      color: 'text-red-600 dark:text-red-400',
      bg: 'bg-red-50 dark:bg-red-900/20',
      change: -2,
      invertColor: true
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
      {kpis.map((kpi, index) => {
        const Icon = kpi.icon;
        const isPositive = kpi.invertColor ? kpi.change < 0 : kpi.change > 0;
        return (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 px-4 py-3 flex items-center gap-3 hover:shadow-md transition-all"
          >
            <div className={`p-2 rounded-lg ${kpi.bg}`}>
              <Icon size={18} className={kpi.color} />
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">{kpi.label}</p>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl font-bold text-gray-900 dark:text-white">{kpi.value}</span>
                {kpi.change !== undefined && (
                  <span className={`text-xs font-bold flex items-center gap-0.5 ${
                    isPositive ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {isPositive ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                    {Math.abs(kpi.change)}
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CompactKPIs;
