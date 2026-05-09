import React from 'react';
import {
  ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend
} from 'recharts';
import { Briefcase } from 'lucide-react';

const EmploymentOutcomesChart = () => {
  const data = [
    { cohort: 'K18', employmentRate: 85, salary: 8.5 },
    { cohort: 'K19', employmentRate: 87, salary: 9.0 },
    { cohort: 'K20', employmentRate: 90, salary: 10.5 },
    { cohort: 'K21', employmentRate: 92, salary: 12.0 },
    { cohort: 'K22', employmentRate: 93, salary: 13.5 },
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-4 border border-gray-100 dark:border-gray-700">
          <p className="font-bold text-gray-900 dark:text-white text-sm mb-2">{payload[0].payload.cohort}</p>
          <div className="space-y-1">
            <p className="text-sm flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm bg-blue-500 inline-block"></span>
              <span className="text-gray-500">Việc làm: </span>
              <span className="font-bold text-blue-600">{payload[0].payload.employmentRate}%</span>
            </p>
            <p className="text-sm flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-amber-500 inline-block"></span>
              <span className="text-gray-500">Mức lương: </span>
              <span className="font-bold text-amber-600">{payload[0].payload.salary} Tr</span>
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
        <div className="p-2.5 bg-blue-50 dark:bg-blue-900/30 rounded-xl">
          <Briefcase className="text-blue-600 dark:text-blue-400" size={22} />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Tỷ lệ Việc làm & Mức lương TB</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Xu hướng việc làm của sinh viên sau khi tốt nghiệp</p>
        </div>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
            <XAxis dataKey="cohort" tick={{ fontSize: 12, fill: '#6b7280' }} axisLine={false} tickLine={false} />
            <YAxis yAxisId="left" domain={[70, 100]} tick={{ fontSize: 11, fill: '#6b7280' }} tickFormatter={(v) => `${v}%`} axisLine={false} tickLine={false} />
            <YAxis yAxisId="right" orientation="right" domain={[0, 20]} tick={{ fontSize: 11, fill: '#6b7280' }} tickFormatter={(v) => `${v}Tr`} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Bar yAxisId="left" dataKey="employmentRate" name="Tỷ lệ có việc (%)" fill="#3b82f6" radius={[6, 6, 0, 0]} maxBarSize={40} />
            <Line yAxisId="right" type="monotone" dataKey="salary" name="Lương TB (Triệu)" stroke="#f59e0b" strokeWidth={3} dot={{ r: 5, fill: '#f59e0b', stroke: '#fff', strokeWidth: 2 }} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default EmploymentOutcomesChart;
