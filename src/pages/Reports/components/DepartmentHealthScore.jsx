import React from 'react';
import {
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  Radar, ResponsiveContainer, Tooltip
} from 'recharts';
import { Shield } from 'lucide-react';

const DepartmentHealthScore = () => {
  const healthData = [
    { metric: 'GPA', value: 78, fullMark: 100 },
    { metric: 'Tốt nghiệp', value: 85, fullMark: 100 },
    { metric: 'Nghiên cứu', value: 72, fullMark: 100 },
    { metric: 'Chuyên cần', value: 86, fullMark: 100 },
    { metric: 'Hài lòng', value: 88, fullMark: 100 },
  ];

  const overallScore = Math.round(healthData.reduce((s, d) => s + d.value, 0) / healthData.length);

  const getScoreColor = (score) => {
    if (score >= 85) return 'text-emerald-600';
    if (score >= 70) return 'text-blue-600';
    return 'text-red-600';
  };

  const getScoreLabel = (score) => {
    if (score >= 85) return 'Xuất sắc';
    if (score >= 75) return 'Tốt';
    if (score >= 65) return 'Khá';
    return 'Cần cải thiện';
  };

  const getScoreBg = (score) => {
    if (score >= 85) return 'from-emerald-500 to-teal-600';
    if (score >= 70) return 'from-blue-500 to-indigo-600';
    return 'from-red-500 to-pink-600';
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const d = payload[0]?.payload;
      return (
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-3 border border-gray-100 dark:border-gray-700">
          <p className="font-bold text-gray-900 dark:text-white text-sm">{d?.metric}</p>
          <p className="text-sm mt-1">
            <span className="text-gray-500">Điểm: </span>
            <span className={`font-bold ${getScoreColor(d?.value)}`}>{d?.value}/100</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 bg-teal-50 dark:bg-teal-900/30 rounded-xl">
          <Shield className="text-teal-600 dark:text-teal-400" size={22} />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Chỉ Số Năng Lực</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Đánh giá tổng hợp 5 chỉ số</p>
        </div>
      </div>

      {/* Overall Score */}
      <div className="flex justify-center mb-4">
        <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${getScoreBg(overallScore)} flex flex-col items-center justify-center shadow-lg`}>
          <span className="text-2xl font-bold text-white">{overallScore}</span>
          <span className="text-xs text-white/80">{getScoreLabel(overallScore)}</span>
        </div>
      </div>

      {/* Radar Chart */}
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={healthData} cx="50%" cy="50%" outerRadius="75%">
            <PolarGrid stroke="#e5e7eb" />
            <PolarAngleAxis dataKey="metric" tick={{ fontSize: 11, fill: '#6b7280', fontWeight: 500 }} />
            <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Radar
              dataKey="value"
              stroke="#0d9488"
              fill="#0d9488"
              fillOpacity={0.25}
              strokeWidth={2}
              dot={{ r: 4, fill: '#0d9488', stroke: '#fff', strokeWidth: 2 }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Individual Scores */}
      <div className="grid grid-cols-2 gap-2 mt-4">
        {healthData.map((item, index) => (
          <div key={index} className="flex items-center justify-between px-3 py-2 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
            <span className="text-xs font-medium text-gray-600 dark:text-gray-400">{item.metric}</span>
            <span className={`text-xs font-bold ${getScoreColor(item.value)}`}>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DepartmentHealthScore;
