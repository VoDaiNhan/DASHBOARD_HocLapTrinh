import React from 'react';
import {
  ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend
} from 'recharts';
import { GraduationCap } from 'lucide-react';

const GraduationEmploymentChart = () => {
  const data = [
    { cohort: 'K18', graduationRate: 82, employmentRate: 85, label: 'Khóa 2018' },
    { cohort: 'K19', graduationRate: 84, employmentRate: 87, label: 'Khóa 2019' },
    { cohort: 'K20', graduationRate: 85, employmentRate: 90, label: 'Khóa 2020' },
    { cohort: 'K21', graduationRate: 87, employmentRate: 92, label: 'Khóa 2021' },
    { cohort: 'K22', graduationRate: 85, employmentRate: 93, label: 'Khóa 2022' },
  ];

  const latestGrad = data[data.length - 1].graduationRate;
  const latestEmp = data[data.length - 1].employmentRate;

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const d = payload[0]?.payload;
      return (
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-4 border border-gray-100 dark:border-gray-700">
          <p className="font-bold text-gray-900 dark:text-white text-sm mb-2">{d?.label}</p>
          <div className="space-y-1">
            <p className="text-sm flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm bg-emerald-500 inline-block"></span>
              <span className="text-gray-500">Tốt nghiệp: </span>
              <span className="font-bold text-emerald-600">{d?.graduationRate}%</span>
            </p>
            <p className="text-sm flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-blue-500 inline-block"></span>
              <span className="text-gray-500">Có việc làm: </span>
              <span className="font-bold text-blue-600">{d?.employmentRate}%</span>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-emerald-50 dark:bg-emerald-900/30 rounded-xl">
            <GraduationCap className="text-emerald-600 dark:text-emerald-400" size={22} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Tốt nghiệp & Việc làm</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Theo dõi qua các khóa đã ra trường</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-center">
            <p className="text-xl font-bold text-emerald-600">{latestGrad}%</p>
            <p className="text-xs text-gray-500">Tốt nghiệp</p>
          </div>
          <div className="w-px h-8 bg-gray-200 dark:bg-gray-700"></div>
          <div className="text-center">
            <p className="text-xl font-bold text-blue-600">{latestEmp}%</p>
            <p className="text-xs text-gray-500">Có việc</p>
          </div>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.5} />
            <XAxis dataKey="cohort" tick={{ fontSize: 12, fill: '#6b7280', fontWeight: 500 }} />
            <YAxis domain={[70, 100]} tick={{ fontSize: 11, fill: '#6b7280' }} tickFormatter={(v) => `${v}%`} />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              formatter={(value) => value === 'graduationRate' ? 'Tốt nghiệp' : 'Việc làm'}
              iconType="circle"
              wrapperStyle={{ fontSize: 12 }}
            />
            <Bar dataKey="graduationRate" fill="#10b981" radius={[6, 6, 0, 0]} maxBarSize={40} opacity={0.85} />
            <Line
              type="monotone"
              dataKey="employmentRate"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={{ r: 5, fill: '#3b82f6', stroke: '#fff', strokeWidth: 2 }}
              activeDot={{ r: 7 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default GraduationEmploymentChart;
