import React, { useMemo, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { BookOpenCheck, CalendarRange } from 'lucide-react';

const COURSE_OPTIONS = [
  { value: 'intro', label: 'Nhập môn lập trình' },
  { value: 'tech', label: 'Kỹ thuật lập trình' },
  { value: 'ds', label: 'Cấu trúc dữ liệu & GT' },
  { value: 'oop', label: 'Lập trình HĐT' }
];

const COMPLETION_BY_YEAR = {
  intro: { 2019: 58, 2020: 62, 2021: 65, 2022: 45, 2023: 75, 2024: 30 },
  tech: { 2019: 55, 2020: 60, 2021: 61, 2022: 52, 2023: 68, 2024: 49 },
  ds: { 2019: 50, 2020: 57, 2021: 59, 2022: 54, 2023: 66, 2024: 51 },
  oop: { 2019: 52, 2020: 59, 2021: 63, 2022: 56, 2023: 71, 2024: 55 }
};

const currentYear = new Date().getFullYear();
const YEAR_OPTIONS = Array.from({ length: 12 }, (_, idx) => currentYear - idx).filter((y) => y >= 2013);

const CourseCompletionTrend = ({ title, description }) => {
  const [selectedCourse, setSelectedCourse] = useState(COURSE_OPTIONS[0].value);
  const [startYear, setStartYear] = useState(Math.max(currentYear - 3, 2019));

  const chartData = useMemo(() => {
    const years = Array.from({ length: 4 }, (_, i) => startYear + i);
    return years.map((year) => ({
      year: `${year}`,
      completion:
        selectedCourse && COMPLETION_BY_YEAR[selectedCourse]
          ? COMPLETION_BY_YEAR[selectedCourse][year] ?? null
          : null
    }));
  }, [selectedCourse, startYear]);

  const hasData = chartData.some((item) => item.completion !== null);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const value = payload[0].value;
      if (value === null || value === undefined) return null;
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow">
          <p className="text-sm font-medium text-gray-900 mb-1">Năm {label}</p>
          <p className="text-sm text-gray-700">
            Ty le hoan thanh: <span className="font-semibold">{value}%</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="card p-6 mt-4">
      <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center">
            <BookOpenCheck className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {title || 'Tỷ lệ hoàn thành môn học'}
            </h3>
            <p className="text-sm text-gray-600">
              {description || 'Chọn môn và mốc năm (4 năm liên tiếp)'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Môn</span>
            <select
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
            >
              {COURSE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <CalendarRange className="h-4 w-4 text-gray-500" />
            <select
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              value={startYear}
              onChange={(e) => setStartYear(Number(e.target.value))}
            >
              {YEAR_OPTIONS.map((y) => {
                const isFuture = y > currentYear;
                const isSelected = y === startYear;
                const style = {
                  color: isFuture ? '#dc2626' : '#111827',
                  backgroundColor: isSelected ? '#e8eaf6' : 'white'
                };
                return (
                  <option key={y} value={y} style={style}>
                    {y} - {y + 3}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="year" tick={{ fontSize: 12 }} stroke="#6b7280" />
            <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} stroke="#6b7280" tickFormatter={(v) => `${v}%`} />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="completion"
              name="Ty le hoan thanh"
              stroke="#3f51b5"
              strokeWidth={3}
              dot={{ r: 5, strokeWidth: 2, fill: '#3f51b5', stroke: '#e0e7ff' }}
              activeDot={{ r: 7, stroke: '#3f51b5', strokeWidth: 2 }}
              connectNulls
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {!hasData && <div className="mt-4 text-sm text-gray-600">Không có dữ liệu cho giai đoạn này</div>}
    </div>
  );
};

export default CourseCompletionTrend;
