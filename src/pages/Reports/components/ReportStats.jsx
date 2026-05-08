import React from 'react';
import { Users, UserCheck, GraduationCap, Briefcase, TrendingUp, TrendingDown, AlertTriangle, BarChart3 } from 'lucide-react';

const ReportStats = ({ stats }) => {
  const statCards = [
    {
      title: 'Tổng Sinh viên',
      value: stats.totalStudents || 660,
      subtitle: '4 khóa đang học',
      icon: Users,
      gradient: 'from-blue-500 to-indigo-600',
      change: stats.studentChange || 12
    },
    {
      title: 'Tổng Giảng viên',
      value: stats.totalTeachers || 8,
      subtitle: 'Cơ hữu + thỉnh giảng',
      icon: UserCheck,
      gradient: 'from-purple-500 to-violet-600',
      change: stats.teacherChange || 1
    },
    {
      title: 'Tỷ lệ Tốt nghiệp',
      value: `${stats.graduationRate || 85.2}%`,
      subtitle: 'Khóa gần nhất (K22)',
      icon: GraduationCap,
      gradient: 'from-emerald-500 to-teal-600',
      change: stats.graduationChange || 2.5
    },
    {
      title: 'Tỷ lệ Có việc',
      value: `${stats.employmentRate || 92.5}%`,
      subtitle: 'Sau 6 tháng tốt nghiệp',
      icon: Briefcase,
      gradient: 'from-cyan-500 to-blue-600',
      change: stats.employmentChange || 1.8
    },
    {
      title: 'GPA TB Ngành',
      value: (stats.averageScore || 7.5).toFixed(1),
      subtitle: 'Tất cả SV đang học',
      icon: BarChart3,
      gradient: 'from-orange-500 to-amber-600',
      change: stats.scoreChange || 3.2
    },
    {
      title: 'SV Nguy cơ',
      value: `${stats.atRiskPercentage || 8}%`,
      subtitle: `${stats.atRiskStudents || 15} sinh viên`,
      icon: AlertTriangle,
      gradient: 'from-red-500 to-pink-600',
      change: stats.riskChange || -5,
      invertColor: true
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
      {statCards.map((stat, index) => {
        const Icon = stat.icon;
        const isPositive = stat.invertColor ? stat.change < 0 : stat.change > 0;
        return (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-5 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2.5 rounded-xl bg-gradient-to-br ${stat.gradient} shadow-md`}>
                <Icon size={18} className="text-white" />
              </div>
              {stat.change !== undefined && (
                <div className={`flex items-center gap-0.5 text-xs font-bold ${
                  isPositive ? 'text-green-600' : 'text-red-600'
                }`}>
                  {isPositive ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                  {Math.abs(stat.change)}
                </div>
              )}
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 font-medium">{stat.title}</p>
            <p className="text-xs text-gray-400 dark:text-gray-500">{stat.subtitle}</p>
          </div>
        );
      })}
    </div>
  );
};

export default ReportStats;
