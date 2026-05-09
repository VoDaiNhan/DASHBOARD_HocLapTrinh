import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend, LineChart, Line, AreaChart, Area
} from 'recharts';
import { History, LayoutGrid, Filter, ArrowDownToLine } from 'lucide-react';

const CourseAnalytics = ({ filters }) => {
  const cohortName = filters?.cohort && filters.cohort !== 'all' ? `(Khóa ${filters.cohort})` : '';
  const courseName = filters?.course && filters.course !== 'all' ? ` - Môn ${filters.course}` : '';
  
  // Fake dynamic data based on filters
  const baseComparison = [
    { name: 'OOP', prev: 18, current: 28, label: 'Fail Rate (%)' },
    { name: 'CTDLGT', prev: 15, current: 22, label: 'Fail Rate (%)' },
    { name: 'KTLT', prev: 12, current: 15, label: 'Fail Rate (%)' },
    { name: 'NMLT', prev: 10, current: 12, label: 'Fail Rate (%)' },
  ];
  
  const comparisonData = filters?.course && filters.course !== 'all' 
    ? baseComparison.filter(d => d.name === filters.course)
    : baseComparison.map(d => ({
        ...d,
        current: filters?.cohort === 'K25' ? d.current + 5 : filters?.cohort === 'K26' ? d.current - 3 : d.current
      }));

  const funnelData = [
    { step: 'Đăng ký', count: filters?.cohort === 'K25' ? 80 : 120, fill: '#6366f1' },
    { step: 'Tham gia', count: filters?.cohort === 'K25' ? 70 : 110, fill: '#8b5cf6' },
    { step: 'Hoàn thành', count: filters?.cohort === 'K25' ? 60 : 92, fill: '#ec4899' },
    { step: 'Đạt (Pass)', count: filters?.cohort === 'K25' ? 45 : 75, fill: '#10b981' },
  ];


  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* 1. Semester Comparison */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 flex flex-col">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-50 dark:bg-amber-900/20 rounded-2xl">
              <History className="text-amber-600" size={20} />
            </div>
            <div>
              <h3 className="text-base font-black text-gray-900 dark:text-white uppercase tracking-tight">So sánh Tỷ lệ Rớt (HK trước vs Nay)</h3>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-0.5">
                Xác định xu hướng biến động chất lượng {cohortName}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-gray-300"></div><span className="text-[10px] font-bold text-gray-400">HK trước</span></div>
            <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-rose-500"></div><span className="text-[10px] font-bold text-gray-400">HK này</span></div>
          </div>
        </div>

        <div className="h-72 w-full flex-1">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={comparisonData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} barGap={8}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" opacity={0.5} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 700, fill: '#6b7280' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#9ca3af' }} tickFormatter={(v) => `${v}%`} />
              <Tooltip 
                cursor={{ fill: '#f3f4f6', opacity: 0.4 }}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
              />
              <Bar dataKey="prev" name="HK trước" fill="#d1d5db" radius={[4, 4, 0, 0]} />
              <Bar dataKey="current" name="HK này" fill="#f43f5e" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 2. Completion Funnel */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 flex flex-col">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl">
              <Filter className="text-indigo-600" size={20} />
            </div>
            <div>
              <h3 className="text-base font-black text-gray-900 dark:text-white uppercase tracking-tight">Phễu Hoàn thành {courseName}</h3>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-0.5">
                Theo dõi tỷ lệ rơi rụng sinh viên {cohortName}
              </p>
            </div>
          </div>
          <button className="p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl transition-colors">
            <ArrowDownToLine size={18} className="text-gray-400" />
          </button>
        </div>

        <div className="flex-1 flex flex-col justify-center px-4">
          {funnelData.map((item, index) => {
            const nextCount = funnelData[index + 1]?.count;
            const dropRate = nextCount ? Math.round((1 - nextCount / item.count) * 100) : 0;
            const width = Math.round((item.count / funnelData[0].count) * 100);
            
            return (
              <div key={index} className="relative mb-3 last:mb-0 group">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{item.step}</span>
                  <span className="text-xs font-black text-gray-900 dark:text-white">{item.count} SV</span>
                </div>
                <div className="h-8 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden relative">
                  <div 
                    className="h-full transition-all duration-1000 ease-out" 
                    style={{ width: `${width}%`, backgroundColor: item.fill, opacity: 0.8 }}
                  ></div>
                  <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white drop-shadow-md">
                    {width}%
                  </div>
                </div>
                {index < funnelData.length - 1 && (
                  <div className="flex justify-center py-1">
                    <div className="px-2 py-0.5 bg-rose-50 text-rose-600 text-[9px] font-black rounded-full border border-rose-100">
                      ↓ Giảm {dropRate}%
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CourseAnalytics;
