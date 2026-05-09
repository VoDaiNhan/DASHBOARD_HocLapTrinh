import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend
} from 'recharts';
import { GraduationCap } from 'lucide-react';

const GraduationEmploymentChart = ({ filters }) => {
  // Base data for 6 cohorts
  const baseData = [
    { cohort: 'K18', graduated: 450, label: 'Khóa 2018' },
    { cohort: 'K19', graduated: 480, label: 'Khóa 2019' },
    { cohort: 'K20', graduated: 510, label: 'Khóa 2020' },
    { cohort: 'K21', graduated: 535, label: 'Khóa 2021' },
    { cohort: 'K22', graduated: 520, label: 'Khóa 2022' },
    { cohort: 'K23', graduated: 560, label: 'Khóa 2023' },
  ];

  // Simulate filter effect
  const data = baseData.map(d => ({
    ...d,
    graduated: filters?.dateRange === 'month' ? d.graduated + 15 : d.graduated
  }));

  const latestGrad = data[data.length - 1].graduated;

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const d = payload[0]?.payload;
      return (
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-4 border border-gray-100 dark:border-gray-700">
          <p className="font-bold text-gray-900 dark:text-white text-sm mb-2">{d?.label}</p>
          <div className="space-y-1">
            <p className="text-sm flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm bg-emerald-500 inline-block"></span>
              <span className="text-gray-500">Đã tốt nghiệp: </span>
              <span className="font-bold text-emerald-600">{d?.graduated} SV</span>
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
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Sinh viên Tốt nghiệp</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Số lượng sinh viên ra trường (6 khóa gần nhất)</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-center">
            <p className="text-xl font-bold text-emerald-600">{latestGrad}</p>
            <p className="text-xs text-gray-500">Sinh viên (K23)</p>
          </div>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.5} vertical={false} />
            <XAxis dataKey="cohort" tick={{ fontSize: 12, fill: '#6b7280', fontWeight: 500 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#6b7280' }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="graduated" name="Sinh viên tốt nghiệp" fill="#10b981" radius={[6, 6, 0, 0]} maxBarSize={50} opacity={0.85} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default GraduationEmploymentChart;
