import React, { useState, useMemo } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell, ReferenceLine, Legend
} from 'recharts';
import { Clock, AlertTriangle, Calendar, ChevronRight, LayoutGrid, ListFilter } from 'lucide-react';

const AttendanceChart = () => {
  const [viewMode, setViewMode] = useState('all_months'); // 'all_months' or 'specific_month'
  const [selectedCohort, setSelectedCohort] = useState('K26');
  const [selectedRange, setSelectedRange] = useState('1-4'); // '1-4', '5-8', '9-12'
  const [selectedMonth, setSelectedMonth] = useState(1);

  const ranges = [
    { label: 'Tháng 1 - 4', value: '1-4', start: 1, end: 4 },
    { label: 'Tháng 5 - 8', value: '5-8', start: 5, end: 8 },
    { label: 'Tháng 9 - 12', value: '9-12', start: 9, end: 12 },
  ];

  const cohortClasses = useMemo(() => {
    return [`${selectedCohort}-01`, `${selectedCohort}-02`, `${selectedCohort}-03`, `${selectedCohort}-04`];
  }, [selectedCohort]);

  const chartData = useMemo(() => {
    const data = [];
    if (viewMode === 'all_months') {
      const range = ranges.find(r => r.value === selectedRange);
      for (let m = range.start; m <= range.end; m++) {
        const entry = { label: `Tháng ${m}`, month: m };
        cohortClasses.forEach(cls => {
          entry[cls] = 70 + Math.random() * 25;
        });
        data.push(entry);
      }
    } else {
      // Week view
      for (let w = 1; w <= 4; w++) {
        const entry = { label: `Tuần ${w}`, week: w };
        cohortClasses.forEach(cls => {
          entry[cls] = 65 + Math.random() * 30;
        });
        data.push(entry);
      }
    }
    return data;
  }, [viewMode, selectedCohort, selectedRange, selectedMonth, cohortClasses]);

  const getBarColor = (cls) => {
    const colors = { '01': '#6366f1', '02': '#10b981', '03': '#f59e0b', '04': '#ec4899' };
    return colors[cls.split('-')[1]] || '#94a3b8';
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-4 border border-gray-100 dark:border-gray-700 min-w-[200px]">
          <p className="font-bold text-gray-900 dark:text-white text-sm mb-3 border-b pb-2">{label}</p>
          <div className="space-y-2">
            {payload.map((p, i) => (
              <div key={i} className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }}></div>
                  <span className="text-xs font-semibold text-gray-500">{p.name}:</span>
                </div>
                <span className="text-xs font-bold text-gray-900 dark:text-white">{Math.round(p.value)}%</span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  const [isExporting, setIsExporting] = useState(false);

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      alert(`Đã xuất báo cáo chuyên cần chi tiết cho ${selectedCohort} - ${viewMode === 'all_months' ? 'Giai đoạn ' + selectedRange : 'Tháng ' + selectedMonth} thành công!`);
    }, 2000);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 p-8">
      {/* Filters Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg shadow-indigo-100">
            <Clock className="text-white" size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Biểu đồ Chuyên cần</h3>
            <p className="text-xs font-semibold text-gray-400 mt-1 uppercase">
              {viewMode === 'all_months' ? `Giai đoạn Tháng ${selectedRange}` : `Chi tiết Tháng ${selectedMonth}`}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Cohort Dropdown */}
          <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-600">
            <LayoutGrid size={14} className="text-gray-400" />
            <select 
              value={selectedCohort}
              onChange={(e) => setSelectedCohort(e.target.value)}
              className="bg-transparent text-xs font-bold text-gray-700 dark:text-gray-300 focus:outline-none cursor-pointer"
            >
              {['K26', 'K25', 'K24', 'K23', 'K22'].map(c => <option key={c} value={c}>Khóa {c}</option>)}
            </select>
          </div>

          {/* Month Range Dropdown (1-4, 5-8, 9-12) */}
          <div className="flex items-center gap-2 px-3 py-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl border border-indigo-100 dark:border-indigo-900/30">
            <ListFilter size={14} className="text-indigo-600" />
            <select 
              value={selectedRange}
              onChange={(e) => { setSelectedRange(e.target.value); setViewMode('all_months'); }}
              className="bg-transparent text-xs font-bold text-indigo-700 dark:text-indigo-300 focus:outline-none cursor-pointer"
            >
              {ranges.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
            </select>
          </div>

          {/* Week View Switcher */}
          <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-600">
            <Calendar size={14} className="text-gray-400" />
            <select 
              value={viewMode === 'all_months' ? '' : selectedMonth}
              onChange={(e) => { setSelectedMonth(parseInt(e.target.value)); setViewMode('specific_month'); }}
              className={`bg-transparent text-xs font-bold focus:outline-none cursor-pointer ${viewMode === 'specific_month' ? 'text-indigo-600' : 'text-gray-500'}`}
            >
              <option value="" disabled>{viewMode === 'all_months' ? 'Xem theo tuần' : `Đang xem Tháng ${selectedMonth}`}</option>
              {/* Show all 12 months for drill-down */}
              {Array.from({ length: 12 }, (_, i) => i + 1).map(m => (
                <option key={m} value={m}>Chi tiết Tháng {m}</option>
              ))}
            </select>
            {viewMode === 'specific_month' && (
              <button 
                onClick={() => setViewMode('all_months')}
                className="ml-2 text-[10px] font-bold text-indigo-600 hover:underline uppercase"
              >
                Thoát
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-6 mb-10 px-2 border-b border-gray-50 dark:border-gray-700 pb-6">
        {cohortClasses.map(cls => (
          <div key={cls} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-md shadow-sm" style={{ backgroundColor: getBarColor(cls) }}></div>
            <span className="text-xs font-bold text-gray-600 dark:text-gray-400">Lớp {cls}</span>
          </div>
        ))}
        <div className="h-4 w-px bg-gray-200 mx-2 hidden sm:block"></div>
        <div className="flex items-center gap-2">
          <AlertTriangle size={14} className="text-rose-500" />
          <span className="text-xs font-bold text-rose-500 italic">Mục tiêu: ≥ 80%</span>
        </div>
      </div>

      {/* Chart area - Fixed to show exactly 4 items */}
      <div className="h-[500px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }} barGap={12}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} opacity={0.4} />
            <XAxis 
              dataKey="label" 
              tick={{ fontSize: 14, fontWeight: 900, fill: '#1f2937' }}
              axisLine={false}
              tickLine={false}
              dy={15}
            />
            <YAxis 
              domain={[0, 100]} 
              tick={{ fontSize: 12, fontWeight: 700, fill: '#9ca3af' }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `${v}%`}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8fafc', radius: 10 }} />
            <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{ paddingBottom: 30, fontSize: 12, fontWeight: 'bold' }} />
            <ReferenceLine y={80} stroke="#f43f5e" strokeDasharray="8 8" strokeWidth={2} label={{ position: 'right', value: '80%', fill: '#f43f5e', fontSize: 12, fontWeight: 700 }} />
            
            {cohortClasses.map(cls => (
              <Bar 
                key={cls}
                dataKey={cls}
                name={cls}
                fill={getBarColor(cls)}
                radius={[8, 8, 0, 0]}
                isAnimationActive={false}
                barSize={40}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center text-gray-400">
        <p className="text-xs font-medium italic">
          💡 Chú thích: Chọn giai đoạn 4 tháng (1-4, 5-8, 9-12) để xem so sánh tổng quan giữa các lớp.
        </p>
        <button 
          onClick={handleExport}
          disabled={isExporting}
          className={`px-6 py-2.5 text-[10px] font-bold uppercase rounded-2xl transition-all shadow-xl flex items-center gap-2 ${
            isExporting ? 'bg-gray-400 cursor-not-allowed' : 'bg-gray-900 text-white hover:bg-black shadow-indigo-100'
          }`}
        >
          {isExporting ? (
            <>
              <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Đang chuẩn bị...
            </>
          ) : (
            'Xuất dữ liệu chi tiết'
          )}
        </button>
      </div>
    </div>
  );
};

export default AttendanceChart;
