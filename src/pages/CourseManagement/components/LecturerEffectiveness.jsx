import React from 'react';
import { Users, Star, TrendingUp, TrendingDown, Minus } from 'lucide-react';

const LecturerEffectiveness = () => {
  const lecturers = [
    {
      name: 'TS. Nguyễn Văn An',
      subjects: ['Nhập môn LT', 'CTDL&GT'],
      avgGPA: 8.0,
      completionRate: 92,
      rating: 4.8,
      classes: 4,
      students: 45,
      trend: 'up'
    },
    {
      name: 'TS. Trần Thị Bình',
      subjects: ['Lập trình HĐT', 'Phát triển PM'],
      avgGPA: 7.6,
      completionRate: 85,
      rating: 4.7,
      classes: 3,
      students: 36,
      trend: 'up'
    },
    {
      name: 'TS. Lê Văn Cường',
      subjects: ['CTDL&GT', 'CSDL'],
      avgGPA: 7.4,
      completionRate: 82,
      rating: 4.6,
      classes: 3,
      students: 42,
      trend: 'stable'
    },
    {
      name: 'ThS. Phạm Thị Dung',
      subjects: ['Mạng MT', 'An toàn TT'],
      avgGPA: 7.2,
      completionRate: 78,
      rating: 4.5,
      classes: 2,
      students: 30,
      trend: 'down'
    },
    {
      name: 'ThS. Hoàng Văn Em',
      subjects: ['AI', 'Machine Learning'],
      avgGPA: 7.0,
      completionRate: 75,
      rating: 4.4,
      classes: 2,
      students: 24,
      trend: 'down'
    },
    {
      name: 'ThS. Vũ Thị Phương',
      subjects: ['UX/UI', 'Thiết kế GĐ'],
      avgGPA: 7.8,
      completionRate: 88,
      rating: 4.3,
      classes: 2,
      students: 28,
      trend: 'up'
    }
  ];

  const getGPAColor = (gpa) => {
    if (gpa >= 8.0) return 'text-emerald-600 dark:text-emerald-400';
    if (gpa >= 7.0) return 'text-blue-600 dark:text-blue-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getCompletionColor = (rate) => {
    if (rate >= 85) return 'bg-emerald-500';
    if (rate >= 75) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const TrendIcon = ({ trend }) => {
    if (trend === 'up') return <TrendingUp size={14} className="text-green-500" />;
    if (trend === 'down') return <TrendingDown size={14} className="text-red-500" />;
    return <Minus size={14} className="text-gray-400" />;
  };

  const renderStars = (rating) => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map(i => (
          <Star
            key={i}
            size={12}
            className={i <= Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 dark:text-gray-600'}
          />
        ))}
        <span className="ml-1 text-xs font-bold text-gray-600 dark:text-gray-400">{rating}</span>
      </div>
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-purple-50 dark:bg-purple-900/30 rounded-xl">
            <Users className="text-purple-600 dark:text-purple-400" size={22} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Hiệu quả Giảng viên</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">So sánh GPA sinh viên & tỷ lệ hoàn thành theo giảng viên</p>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 dark:border-gray-700">
              <th className="text-left py-3 px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Giảng viên</th>
              <th className="text-left py-3 px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Môn giảng dạy</th>
              <th className="text-center py-3 px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">GPA TB SV</th>
              <th className="text-center py-3 px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider min-w-[140px]">Completion</th>
              <th className="text-center py-3 px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Rating</th>
              <th className="text-center py-3 px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Lớp</th>
              <th className="text-center py-3 px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Trend</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 dark:divide-gray-700/50">
            {lecturers.map((lecturer, index) => (
              <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                <td className="py-3.5 px-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                      {lecturer.name.split(' ').pop()[0]}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{lecturer.name}</p>
                      <p className="text-xs text-gray-500">{lecturer.students} sinh viên</p>
                    </div>
                  </div>
                </td>
                <td className="py-3.5 px-3">
                  <div className="flex flex-wrap gap-1">
                    {lecturer.subjects.map((s, i) => (
                      <span key={i} className="px-2 py-0.5 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md">
                        {s}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="py-3.5 px-3 text-center">
                  <span className={`text-sm font-bold ${getGPAColor(lecturer.avgGPA)}`}>
                    {lecturer.avgGPA.toFixed(1)}
                  </span>
                </td>
                <td className="py-3.5 px-3">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${getCompletionColor(lecturer.completionRate)} transition-all duration-500`}
                        style={{ width: `${lecturer.completionRate}%` }}
                      ></div>
                    </div>
                    <span className="text-xs font-bold text-gray-600 dark:text-gray-400 w-9 text-right">{lecturer.completionRate}%</span>
                  </div>
                </td>
                <td className="py-3.5 px-3">
                  {renderStars(lecturer.rating)}
                </td>
                <td className="py-3.5 px-3 text-center">
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{lecturer.classes}</span>
                </td>
                <td className="py-3.5 px-3 text-center">
                  <TrendIcon trend={lecturer.trend} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LecturerEffectiveness;
