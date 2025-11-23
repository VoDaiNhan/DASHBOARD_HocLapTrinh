import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Calendar, TrendingUp } from 'lucide-react';

const PerformanceChart = ({ data }) => {
  const [timeRange, setTimeRange] = useState('7days');
  
  if (!data) return null;

  const timeRangeOptions = [
    { value: '7days', label: '7 ngày qua' },
    { value: '30days', label: '30 ngày qua' },
    { value: '3months', label: '3 tháng qua' },
    { value: '6months', label: '6 tháng qua' }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900 mb-2">{label}</p>
          {payload.map((entry, index) => {
            const isScore = entry.dataKey === 'averageScore' || entry.dataKey === 'engagement';
            const displayValue = isScore ? (entry.value / 10).toFixed(1) : `${entry.value}%`;
            const unit = isScore ? '/10' : '';
            return (
              <div key={index} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: entry.color }}
                ></div>
                <span className="text-sm text-gray-600">{entry.name}:</span>
                <span className="text-sm font-medium text-gray-900">{displayValue}{unit}</span>
              </div>
            );
          })}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <TrendingUp className="h-5 w-5 text-primary-600" />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Biểu Đồ Hiệu Suất</h3>
            <p className="text-sm text-gray-600">Theo dõi xu hướng học tập theo thời gian</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Calendar className="h-4 w-4 text-gray-500" />
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            {timeRangeOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart 
            data={data.map(d => ({
              ...d,
              averageScore: d.averageScore * 10,
              engagement: d.engagement * 10
            }))} 
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 12 }}
              stroke="#6b7280"
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              stroke="#6b7280"
              domain={[0, 100]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="averageScore" 
              name="Điểm trung bình"
              stroke="#3b82f6" 
              strokeWidth={3}
              dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
            />
            <Line 
              type="monotone" 
              dataKey="completionRate" 
              name="Tỷ lệ hoàn thành"
              stroke="#22c55e" 
              strokeWidth={3}
              dot={{ fill: '#22c55e', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#22c55e', strokeWidth: 2 }}
            />
            <Line 
              type="monotone" 
              dataKey="engagement" 
              name="Mức độ tham gia"
              stroke="#f59e0b" 
              strokeWidth={3}
              dot={{ fill: '#f59e0b', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#f59e0b', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="text-center p-3 bg-primary-50 rounded-lg">
          <p className="text-2xl font-bold text-primary-600">
            {data && data.length > 0 ? data[data.length - 1].averageScore.toFixed(1) : '0'}/10
          </p>
          <p className="text-sm text-gray-600">Điểm TB tháng này</p>
        </div>
        <div className="text-center p-3 bg-success-50 rounded-lg">
          <p className="text-2xl font-bold text-success-600">
            {data && data.length > 0 ? Math.round(data[data.length - 1].completionRate) : '0'}%
          </p>
          <p className="text-sm text-gray-600">Tỷ lệ hoàn thành</p>
        </div>
        <div className="text-center p-3 bg-warning-50 rounded-lg">
          <p className="text-2xl font-bold text-warning-600">
            {data && data.length > 0 ? data[data.length - 1].engagement.toFixed(1) : '0'}/10
          </p>
          <p className="text-sm text-gray-600">Mức độ tham gia</p>
        </div>
      </div>
    </div>
  );
};

export default PerformanceChart;