import React from 'react';
import { BarChart2, ArrowUp, ArrowDown } from 'lucide-react';

const DifficultyRanking = () => {
  const courses = [
    {
      name: 'Lập trình hướng đối tượng',
      gpa: 6.8,
      failRate: 28,
      difficultyScore: 8.5,
      level: 'hard',
      trend: 'up'
    },
    {
      name: 'Cấu trúc dữ liệu & Giải thuật',
      gpa: 7.1,
      failRate: 22,
      difficultyScore: 7.2,
      level: 'hard',
      trend: 'stable'
    },
    {
      name: 'Kĩ thuật lập trình',
      gpa: 7.4,
      failRate: 18,
      difficultyScore: 5.8,
      level: 'medium',
      trend: 'down'
    },
    {
      name: 'Nhập môn lập trình',
      gpa: 7.8,
      failRate: 12,
      difficultyScore: 3.5,
      level: 'easy',
      trend: 'stable'
    }
  ];

  const getLevelBadge = (level) => {
    switch (level) {
      case 'hard':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400">
            Khó
          </span>
        );
      case 'medium':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400">
            Trung bình
          </span>
        );
      case 'easy':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
            Dễ
          </span>
        );
      default:
        return null;
    }
  };

  const getDifficultyBar = (score) => {
    const width = (score / 10) * 100;
    const color = score >= 7 ? 'bg-red-500' : score >= 5 ? 'bg-yellow-500' : 'bg-green-500';
    return (
      <div className="flex items-center gap-2">
        <div className="flex-1 h-2.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
          <div className={`h-full rounded-full ${color} transition-all duration-500`} style={{ width: `${width}%` }}></div>
        </div>
        <span className="text-xs font-bold text-gray-600 dark:text-gray-400 w-8 text-right">{score.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 bg-orange-50 dark:bg-orange-900/30 rounded-xl">
          <BarChart2 className="text-orange-600 dark:text-orange-400" size={22} />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Xếp hạng Độ khó</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Dựa trên GPA + Tỷ lệ rớt</p>
        </div>
      </div>

      <div className="overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 dark:border-gray-700">
              <th className="text-left py-3 px-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">#</th>
              <th className="text-left py-3 px-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Môn học</th>
              <th className="text-center py-3 px-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">GPA TB</th>
              <th className="text-center py-3 px-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">% Rớt</th>
              <th className="text-left py-3 px-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider min-w-[120px]">Độ khó</th>
              <th className="text-center py-3 px-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Mức</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 dark:divide-gray-700/50">
            {courses.map((course, index) => (
              <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                <td className="py-3 px-2">
                  <span className="text-sm font-bold text-gray-400">{index + 1}</span>
                </td>
                <td className="py-3 px-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">{course.name}</span>
                    {course.trend === 'up' && <ArrowUp size={12} className="text-red-500" />}
                    {course.trend === 'down' && <ArrowDown size={12} className="text-green-500" />}
                  </div>
                </td>
                <td className="py-3 px-2 text-center">
                  <span className={`text-sm font-bold ${course.gpa < 7.0 ? 'text-red-600' : 'text-gray-700 dark:text-gray-300'}`}>
                    {course.gpa.toFixed(1)}
                  </span>
                </td>
                <td className="py-3 px-2 text-center">
                  <span className={`text-sm font-bold ${course.failRate >= 20 ? 'text-red-600' : course.failRate >= 15 ? 'text-yellow-600' : 'text-green-600'}`}>
                    {course.failRate}%
                  </span>
                </td>
                <td className="py-3 px-2">
                  {getDifficultyBar(course.difficultyScore)}
                </td>
                <td className="py-3 px-2 text-center">
                  {getLevelBadge(course.level)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DifficultyRanking;
