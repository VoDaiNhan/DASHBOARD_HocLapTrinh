import React, { useMemo } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell, LineChart, Line, Legend,
  PieChart, Pie,
} from 'recharts';
import { TrendingUp } from 'lucide-react';
import { coursePerformanceData, COURSE_NAMES, CLASS_LIST } from '../../../data/coursePerformanceData';

const getBarColor = (v) => v >= 80 ? '#22c55e' : v >= 65 ? '#f59e0b' : '#ef4444';

const CustomTooltip = ({ active, payload, label, unit = '' }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white dark:bg-gray-800 px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg shadow text-sm">
      <p className="font-semibold text-gray-800 dark:text-white mb-1">{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color }}>
          {p.name}: <span className="font-medium">{typeof p.value === 'number' ? p.value.toFixed(1) : p.value}{unit}</span>
        </p>
      ))}
    </div>
  );
};

export const ProgressByInstructorChart = ({ data = [] }) => {
  const chartData = data.length > 0 ? data : [
    { instructor: 'TS. Nguyễn Văn An', progress: 85 },
    { instructor: 'TS. Trần Thị Bình', progress: 78 },
    { instructor: 'TS. Lê Văn Cường', progress: 72 },
    { instructor: 'ThS. Phạm Thị Dung', progress: 88 },
  ];
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
      <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4">Tiến độ TB theo giảng viên</h3>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 60 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
            <XAxis dataKey="instructor" angle={-35} textAnchor="end" height={80} tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis domain={[0, 100]} tickFormatter={(v) => `${v}%`} tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip unit="%" />} />
            <Bar dataKey="progress" name="Tiến độ TB" radius={[4, 4, 0, 0]}>
              {chartData.map((entry, i) => (<Cell key={i} fill={getBarColor(entry.progress)} />))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export const ScoreFluctuationChart = ({ data = [] }) => {
  const chartData = useMemo(() => {
    const courseList = Object.values(COURSE_NAMES);
    return courseList.map((courseName) => {
      const shortName = courseName.length > 22 ? courseName.slice(0, 20) + '…' : courseName;
      const row = { month: shortName };
      CLASS_LIST.forEach((cls) => {
        const students = coursePerformanceData.students.filter((s) => s.className === cls);
        if (!students.length) return;
        const avg = students.reduce((sum, s) => sum + (s.courses[courseName]?.avgScore ?? 0), 0) / students.length;
        row[cls] = Math.round(avg * 10) / 10;
      });
      return row;
    });
  }, []);

  const lineColors = { '22CT111': '#3b82f6', '22CT112': '#f59e0b', '22CT113': '#10b981' };
  const allScores = chartData.flatMap((d) => CLASS_LIST.map((c) => d[c] ?? 0));
  const half = Math.floor(allScores.length / 2);
  const avgFirst = allScores.slice(0, half).reduce((a, b) => a + b, 0) / half;
  const avgLast = allScores.slice(half).reduce((a, b) => a + b, 0) / (allScores.length - half);
  const trend = (avgLast - avgFirst).toFixed(1);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">Điểm TB theo môn học – từng lớp</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">So sánh 22CT111 / 22CT112 / 22CT113</p>
        </div>
        <div className={`flex items-center gap-1 text-sm font-semibold ${parseFloat(trend) >= 0 ? 'text-green-600' : 'text-red-500'}`}>
          <TrendingUp className="h-4 w-4" />
          {parseFloat(trend) >= 0 ? '+' : ''}{trend} điểm
        </div>
      </div>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 70 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" angle={-30} textAnchor="end" height={80} tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis domain={[0, 10]} tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />
            {CLASS_LIST.map((cls) => (
              <Line key={cls} type="monotone" dataKey={cls} stroke={lineColors[cls]} strokeWidth={2.5}
                dot={{ r: 4, fill: lineColors[cls] }} activeDot={{ r: 6 }} />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export const ClassStatusPieChart = ({ classes = [] }) => {
  const chartData = useMemo(() => {
    if (!classes.length) return [
      { name: 'Đạt chuẩn', value: 8, color: '#22c55e' },
      { name: 'Trung bình', value: 3, color: '#f59e0b' },
      { name: 'Rủi ro', value: 1, color: '#ef4444' },
    ];
    const good = classes.filter((c) => (c.completionRate ?? 0) >= 80).length;
    const mid  = classes.filter((c) => (c.completionRate ?? 0) >= 60 && (c.completionRate ?? 0) < 80).length;
    const bad  = classes.filter((c) => (c.completionRate ?? 0) < 60).length;
    return [
      { name: 'Đạt chuẩn', value: good, color: '#22c55e' },
      { name: 'Trung bình', value: mid,  color: '#f59e0b' },
      { name: 'Rủi ro',     value: bad,  color: '#ef4444' },
    ];
  }, [classes]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
      <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4">Phân loại lớp học</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={chartData} cx="50%" cy="50%" innerRadius={55} outerRadius={95}
              paddingAngle={3} dataKey="value"
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              labelLine={false}>
              {chartData.map((entry, i) => (<Cell key={i} fill={entry.color} />))}
            </Pie>
            <Tooltip formatter={(v, n) => [v + ' lớp', n]} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-3 gap-3 mt-2 pt-4 border-t border-gray-100 dark:border-gray-700">
        {chartData.map((item) => (
          <div key={item.name} className="text-center">
            <p className="text-2xl font-bold" style={{ color: item.color }}>{item.value}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
