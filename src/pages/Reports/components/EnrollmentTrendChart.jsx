import React from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer
} from 'recharts';
import { Users } from 'lucide-react';

const EnrollmentTrendChart = ({ filters }) => {
  const baseData = [
    { year: 'K21', enrolled: 117, label: 'Khóa 2021' },
    { year: 'K22', enrolled: 132, label: 'Khóa 2022' },
    { year: 'K23', enrolled: 123, label: 'Khóa 2023' },
    { year: 'K24', enrolled: 172, label: 'Khóa 2024' },
    { year: 'K25', enrolled: 179, label: 'Khóa 2025' },
    { year: 'K26', enrolled: 186, label: 'Khóa 2026' },
  ];

  // Simulate filter effect
  const data = baseData.map(d => ({
    ...d,
    enrolled: filters?.dateRange === 'month' ? d.enrolled - 10 : d.enrolled
  }));

  const totalCurrentYear = data[data.length - 1].enrolled;
  const growth = Math.round(((data[data.length - 1].enrolled - data[data.length - 2].enrolled) / data[data.length - 2].enrolled) * 100);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const d = payload[0].payload;
      return (
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-4 border border-gray-100 dark:border-gray-700">
          <p className="font-bold text-gray-900 dark:text-white text-sm">{d.label}</p>
          <p className="text-sm mt-1">
            <span className="text-gray-500">Số SV tuyển: </span>
            <span className="font-bold text-blue-600">{d.enrolled}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-50 dark:bg-blue-900/30 rounded-xl">
            <Users className="text-blue-600 dark:text-blue-400" size={22} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Xu hướng Tuyển sinh</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Số lượng SV nhập học qua các khóa</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalCurrentYear}</p>
          <p className={`text-xs font-medium ${growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {growth > 0 ? '+' : ''}{growth}% so với K trước
          </p>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
            <defs>
              <linearGradient id="enrollGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.5} />
            <XAxis dataKey="year" tick={{ fontSize: 12, fill: '#6b7280', fontWeight: 500 }} />
            <YAxis tick={{ fontSize: 11, fill: '#6b7280' }} domain={[80, 'auto']} />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="enrolled"
              stroke="#3b82f6"
              strokeWidth={3}
              fill="url(#enrollGradient)"
              dot={{ r: 5, fill: '#3b82f6', stroke: '#fff', strokeWidth: 2 }}
              activeDot={{ r: 7, fill: '#2563eb', stroke: '#fff', strokeWidth: 3 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default EnrollmentTrendChart;
