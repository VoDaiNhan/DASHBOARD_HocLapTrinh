import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell, ReferenceLine
} from 'recharts';
import { TrendingDown } from 'lucide-react';

const FailRateChart = ({ courses }) => {
  const data = [
    { name: 'Lập trình HĐT', failRate: 28, students: 10, failed: 3 },
    { name: 'CTDL&GT', failRate: 22, students: 10, failed: 2 },
    { name: 'Kĩ thuật LT', failRate: 18, students: 10, failed: 2 },
    { name: 'Nhập môn LT', failRate: 12, students: 10, failed: 1 },
  ].sort((a, b) => b.failRate - a.failRate);

  const getBarColor = (rate) => {
    if (rate >= 25) return '#ef4444';
    if (rate >= 15) return '#f59e0b';
    return '#10b981';
  };

  const highFailCount = data.filter(d => d.failRate >= 20).length;

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const d = payload[0].payload;
      return (
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-4 border border-gray-100 dark:border-gray-700">
          <p className="font-bold text-gray-900 dark:text-white text-sm">{d.name}</p>
          <div className="mt-2 space-y-1">
            <p className="text-sm">
              <span className="text-gray-500">Tỷ lệ rớt: </span>
              <span className={`font-bold ${d.failRate >= 25 ? 'text-red-600' : d.failRate >= 15 ? 'text-yellow-600' : 'text-green-600'}`}>
                {d.failRate}%
              </span>
            </p>
            <p className="text-sm">
              <span className="text-gray-500">SV rớt / Tổng: </span>
              <span className="font-medium text-gray-700 dark:text-gray-300">{d.failed} / {d.students}</span>
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
          <div className="p-2.5 bg-red-50 dark:bg-red-900/30 rounded-xl">
            <TrendingDown className="text-red-600 dark:text-red-400" size={22} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Tỷ lệ Rớt theo Môn</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {highFailCount > 0 ? (
                <span className="text-red-600 font-medium">{highFailCount} môn có tỷ lệ rớt ≥ 20%</span>
              ) : (
                'Tất cả các môn đều ổn định'
              )}
            </p>
          </div>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.5} horizontal={false} />
            <XAxis
              type="number"
              domain={[0, 40]}
              tick={{ fontSize: 11, fill: '#6b7280' }}
              tickFormatter={(v) => `${v}%`}
            />
            <YAxis
              type="category"
              dataKey="name"
              tick={{ fontSize: 12, fill: '#374151', fontWeight: 500 }}
              width={120}
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine x={20} stroke="#ef4444" strokeDasharray="5 5" strokeWidth={1.5} />
            <Bar dataKey="failRate" radius={[0, 8, 8, 0]} maxBarSize={32}>
              {data.map((entry, index) => (
                <Cell key={index} fill={getBarColor(entry.failRate)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default FailRateChart;
