import React, { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, AreaChart, Area
} from 'recharts';
import { BookOpen, TrendingDown, Award } from 'lucide-react';

const AcademicQualityCharts = () => {
  // Data cho Top môn khó
  const hardCoursesData = [
    { name: 'Cấu trúc dữ liệu', failRate: 32, label: 'CTDL&GT' },
    { name: 'Mạng máy tính', failRate: 28, label: 'MMT' },
    { name: 'Hệ điều hành', failRate: 25, label: 'HĐH' },
    { name: 'Kiến trúc máy tính', failRate: 22, label: 'KTMT' },
    { name: 'Lập trình Web', failRate: 15, label: 'Web' },
  ];

  // Data cho Phân bố GPA
  const gpaData = [
    { range: '< 5.0', count: 45 },
    { range: '5.0-6.4', count: 120 },
    { range: '6.5-6.9', count: 180 },
    { range: '7.0-7.9', count: 210 },
    { range: '8.0-8.9', count: 85 },
    { range: '9.0-10', count: 20 },
  ];

  const availableCohorts = ['K20', 'K21', 'K22', 'K23', 'K24', 'K25'];
  const [startCohort, setStartCohort] = useState('K21');
  const [endCohort, setEndCohort] = useState('K24');

  // Data cho Heatmap (Tỷ lệ điểm theo Khóa)
  const heatmapData = [
    { course: 'CTDL&GT', K20: 'red', K21: 'red', K22: 'red', K23: 'yellow', K24: 'green', K25: 'green' },
    { course: 'OOP', K20: 'yellow', K21: 'yellow', K22: 'green', K23: 'green', K24: 'green', K25: 'green' },
    { course: 'Hệ Điều Hành', K20: 'red', K21: 'green', K22: 'yellow', K23: 'red', K24: 'red', K25: 'yellow' },
    { course: 'Cơ sở Dữ liệu', K20: 'green', K21: 'green', K22: 'green', K23: 'yellow', K24: 'yellow', K25: 'green' },
    { course: 'Nhập môn LT', K20: 'green', K21: 'green', K22: 'green', K23: 'green', K24: 'green', K25: 'green' },
  ];

  const startIndex = availableCohorts.indexOf(startCohort);
  const endIndex = availableCohorts.indexOf(endCohort);
  const displayCohorts = availableCohorts.slice(
    Math.min(startIndex, endIndex), 
    Math.max(startIndex, endIndex) + 1
  );

  const getColorCode = (color) => {
    switch(color) {
      case 'red': return 'bg-rose-500';
      case 'yellow': return 'bg-amber-400';
      case 'green': return 'bg-emerald-500';
      default: return 'bg-gray-200';
    }
  };

  const getText = (color) => {
    switch(color) {
      case 'red': return 'Nguy cơ';
      case 'yellow': return 'Cảnh báo';
      case 'green': return 'Tốt';
      default: return '';
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top môn khó nhất */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 bg-rose-50 dark:bg-rose-900/30 rounded-xl">
              <TrendingDown className="text-rose-600 dark:text-rose-400" size={22} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Top 5 Môn Rớt Nhiều Nhất</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Tỷ lệ rớt môn (%) theo môn học</p>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hardCoursesData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#e5e7eb" />
                <XAxis type="number" tickFormatter={(v) => `${v}%`} tick={{ fontSize: 11, fill: '#6b7280' }} />
                <YAxis dataKey="label" type="category" tick={{ fontSize: 12, fill: '#374151', fontWeight: 500 }} width={60} />
                <Tooltip 
                  cursor={{ fill: '#f3f4f6' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white p-3 shadow-lg rounded-lg border border-gray-100">
                          <p className="font-bold text-gray-900">{payload[0].payload.name}</p>
                          <p className="text-rose-600 font-bold mt-1">Tỷ lệ rớt: {payload[0].value}%</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="failRate" fill="#f43f5e" radius={[0, 6, 6, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Phân bố GPA */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl">
              <Award className="text-indigo-600 dark:text-indigo-400" size={22} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Phân bố GPA Toàn Ngành</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Số lượng sinh viên theo từng khung điểm</p>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={gpaData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                <defs>
                  <linearGradient id="colorGpa" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="range" tick={{ fontSize: 11, fill: '#6b7280' }} />
                <YAxis tick={{ fontSize: 11, fill: '#6b7280' }} />
                <Tooltip 
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white p-3 shadow-lg rounded-lg border border-gray-100">
                          <p className="font-bold text-gray-900">Điểm: {payload[0].payload.range}</p>
                          <p className="text-indigo-600 font-bold mt-1">{payload[0].value} Sinh viên</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area type="monotone" dataKey="count" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorGpa)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Heatmap */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-50 dark:bg-amber-900/30 rounded-xl">
              <BookOpen className="text-amber-600 dark:text-amber-400" size={22} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Heatmap Hiệu suất Môn học qua các Khóa</h3>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <span className="font-medium text-gray-600 dark:text-gray-400">Từ</span>
            <select 
              value={startCohort}
              onChange={(e) => setStartCohort(e.target.value)}
              className="border border-gray-200 dark:border-gray-600 rounded-lg px-2 py-1 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {availableCohorts.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <span className="font-medium text-gray-600 dark:text-gray-400">đến</span>
            <select 
              value={endCohort}
              onChange={(e) => setEndCohort(e.target.value)}
              className="border border-gray-200 dark:border-gray-600 rounded-lg px-2 py-1 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {availableCohorts.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 font-bold uppercase tracking-wider text-xs">
              <tr>
                <th className="px-4 py-3 rounded-tl-xl">Môn học</th>
                {displayCohorts.map((c, i) => (
                  <th key={c} className={`px-4 py-3 text-center ${i === displayCohorts.length - 1 ? 'rounded-tr-xl' : ''}`}>Khóa {c.replace('K', '')}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {heatmapData.map((row, idx) => (
                <tr key={idx} className="border-b border-gray-100 dark:border-gray-700 last:border-0">
                  <td className="px-4 py-4 font-bold text-gray-900 dark:text-white">{row.course}</td>
                  {displayCohorts.map(c => (
                    <td key={c} className="px-4 py-2">
                      <div className={`py-2 px-3 rounded-lg text-center text-white font-medium text-xs ${getColorCode(row[c])}`}>{getText(row[c])}</div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AcademicQualityCharts;
