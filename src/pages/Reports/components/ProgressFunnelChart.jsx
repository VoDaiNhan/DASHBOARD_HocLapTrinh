import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell
} from 'recharts';
import { Filter, UserMinus } from 'lucide-react';

const ProgressFunnelChart = () => {
  // Funnel Data mock
  const funnelData = [
    { stage: 'Nhập học', count: 500, color: '#3b82f6' },
    { stage: 'Học tiếp năm 2', count: 450, color: '#6366f1' },
    { stage: 'Học tiếp năm 3', count: 420, color: '#8b5cf6' },
    { stage: 'Thực tập', count: 390, color: '#a855f7' },
    { stage: 'Tốt nghiệp', count: 380, color: '#d946ef' },
  ];

  // Dropout data
  const dropoutData = [
    { cohort: 'K20', rate: 12 },
    { cohort: 'K21', rate: 15 },
    { cohort: 'K22', rate: 18 },
    { cohort: 'K23', rate: 14 },
    { cohort: 'K24', rate: 8 },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Phễu tiến độ */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 bg-blue-50 dark:bg-blue-900/30 rounded-xl">
            <Filter className="text-blue-600 dark:text-blue-400" size={22} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Phễu Tiến độ Học tập</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Tỷ lệ rơi rụng từ Nhập học tới Tốt nghiệp</p>
          </div>
        </div>
        <div className="h-64 relative">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={funnelData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
              <XAxis type="number" hide />
              <YAxis dataKey="stage" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#374151', fontWeight: 600 }} />
              <Tooltip 
                cursor={{ fill: '#f3f4f6' }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white p-3 shadow-lg rounded-lg border border-gray-100">
                        <p className="font-bold text-gray-900">{payload[0].payload.stage}</p>
                        <p className="text-blue-600 font-bold mt-1">Còn lại: {payload[0].value} SV</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="count" radius={[0, 6, 6, 0]} barSize={28}>
                {funnelData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tỷ lệ bỏ học */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 bg-red-50 dark:bg-red-900/30 rounded-xl">
            <UserMinus className="text-red-600 dark:text-red-400" size={22} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Tỷ lệ Bỏ học & Trễ tiến độ</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Theo dõi sự bất thường qua các khóa</p>
          </div>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dropoutData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
              <XAxis dataKey="cohort" tick={{ fontSize: 12, fill: '#6b7280' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#6b7280' }} tickFormatter={(v) => `${v}%`} axisLine={false} tickLine={false} />
              <Tooltip 
                cursor={{ fill: '#f3f4f6' }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white p-3 shadow-lg rounded-lg border border-gray-100">
                        <p className="font-bold text-gray-900">{payload[0].payload.cohort}</p>
                        <p className="text-red-600 font-bold mt-1">Bỏ học/Trễ: {payload[0].value}%</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="rate" fill="#f87171" radius={[6, 6, 0, 0]} maxBarSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ProgressFunnelChart;
