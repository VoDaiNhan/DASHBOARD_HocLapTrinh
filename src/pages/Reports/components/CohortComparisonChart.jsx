import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend
} from 'recharts';
import { BarChart3 } from 'lucide-react';

const CohortComparisonChart = () => {
  const data = [
    { cohort: 'K23 (Năm 4)', gpa: 7.7, completion: 87, avgScore: 7.7, students: 123 },
    { cohort: 'K24 (Năm 3)', gpa: 7.55, completion: 74, avgScore: 7.55, students: 172 },
    { cohort: 'K25 (Năm 2)', gpa: 7.35, completion: 51, avgScore: 7.35, students: 179 },
    { cohort: 'K26 (Năm 1)', gpa: 7.15, completion: 24, avgScore: 7.15, students: 186 },
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const d = payload[0]?.payload;
      return (
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-4 border border-gray-100 dark:border-gray-700">
          <p className="font-bold text-gray-900 dark:text-white text-sm mb-2">{d?.cohort}</p>
          <div className="space-y-1">
            <p className="text-sm">
              <span className="text-gray-500">Sĩ số: </span>
              <span className="font-bold text-gray-700 dark:text-gray-300">{d?.students} SV</span>
            </p>
            <p className="text-sm flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm bg-blue-500 inline-block"></span>
              <span className="text-gray-500">GPA TB: </span>
              <span className="font-bold text-blue-600">{d?.gpa.toFixed(2)}</span>
            </p>
            <p className="text-sm flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm bg-purple-500 inline-block"></span>
              <span className="text-gray-500">Completion: </span>
              <span className="font-bold text-purple-600">{d?.completion}%</span>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl">
          <BarChart3 className="text-indigo-600 dark:text-indigo-400" size={22} />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">So sánh giữa các Khóa</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">GPA trung bình và tỷ lệ hoàn thành bài tập</p>
        </div>
      </div>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.5} />
            <XAxis dataKey="cohort" tick={{ fontSize: 11, fill: '#6b7280', fontWeight: 500 }} />
            <YAxis yAxisId="left" domain={[0, 10]} tick={{ fontSize: 11, fill: '#6b7280' }} />
            <YAxis yAxisId="right" orientation="right" domain={[0, 100]} tick={{ fontSize: 11, fill: '#6b7280' }} tickFormatter={(v) => `${v}%`} />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              formatter={(value) => value === 'gpa' ? 'GPA Trung bình' : 'Completion Rate'}
              iconType="circle"
              wrapperStyle={{ fontSize: 12 }}
            />
            <Bar yAxisId="left" dataKey="gpa" fill="#3b82f6" radius={[6, 6, 0, 0]} maxBarSize={45} opacity={0.85} />
            <Bar yAxisId="right" dataKey="completion" fill="#8b5cf6" radius={[6, 6, 0, 0]} maxBarSize={45} opacity={0.85} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CohortComparisonChart;
