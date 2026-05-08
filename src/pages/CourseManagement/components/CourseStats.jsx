import React from 'react';
import { TrendingUp, TrendingDown, BookOpen, AlertTriangle, Activity, Target } from 'lucide-react';

const CourseStats = ({ stats, courses = [] }) => {
  const totalCourses = courses.length || 4;
  
  const avgCompletionAllCourses = courses.length > 0
    ? Math.round(courses.reduce((sum, c) => sum + (c.completionRate || 0), 0) / courses.length)
    : 72;
  
  const avgFailRate = 20; // mock
  const riskCoursesCount = courses.filter(c => (c.completionRate || 0) < 70).length;

  const statCards = [
    {
      title: 'Tổng Môn học',
      value: totalCourses,
      subtitle: 'Đang giảng dạy trong ngành',
      icon: BookOpen,
      color: 'blue',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      title: 'TB Completion Rate',
      value: `${avgCompletionAllCourses}%`,
      subtitle: '% hoàn thành trung bình',
      icon: Target,
      color: 'green',
      gradient: 'from-emerald-500 to-teal-600',
      change: +3.5
    },
    {
      title: 'TB Fail Rate',
      value: `${avgFailRate}%`,
      subtitle: '% rớt trung bình toàn ngành',
      icon: Activity,
      color: 'orange',
      gradient: 'from-orange-500 to-red-500',
      change: -2.1
    },
    {
      title: 'Môn nguy cơ',
      value: riskCoursesCount,
      subtitle: 'Completion < 70%',
      icon: AlertTriangle,
      color: 'red',
      gradient: 'from-red-500 to-pink-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statCards.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-300 group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.gradient} shadow-lg`}>
                <Icon size={22} className="text-white" />
              </div>
              {stat.change !== undefined && (
                <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold ${
                  stat.change > 0 
                    ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400' 
                    : 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400'
                }`}>
                  {stat.change > 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                  {stat.change > 0 ? '+' : ''}{stat.change}%
                </div>
              )}
            </div>
            <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">{stat.title}</h3>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</p>
            <p className="text-xs text-gray-400 dark:text-gray-500">{stat.subtitle}</p>
          </div>
        );
      })}
    </div>
  );
};

export default CourseStats;
