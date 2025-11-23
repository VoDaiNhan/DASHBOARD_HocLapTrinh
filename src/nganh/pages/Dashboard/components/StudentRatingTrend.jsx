import React, { useMemo, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { BarChart3, CalendarRange } from 'lucide-react';

const LEVELS = [
  { key: 'xs', label: 'Xuất sắc', color: '#4c8bf5' },
  { key: 'g', label: 'Giỏi', color: '#63b3f3' },
  { key: 'kg', label: 'Khá giỏi', color: '#f5a623' },
  { key: 'k', label: 'Khá', color: '#f6b84f' },
  { key: 'tbk', label: 'Trung bình khá', color: '#f8cc6b' },
  { key: 'tb', label: 'Trung bình', color: '#fbd38d' },
  { key: 'yk', label: 'Yếu / Kém', color: '#eb4d4b' }
];

// Mock phân bố xếp loại theo năm (tổng 100%)
const RATING_DISTRIBUTION = {
  2022: { xs: 8, g: 15, kg: 20, k: 22, tbk: 18, tb: 12, yk: 5 },
  2023: { xs: 10, g: 18, kg: 21, k: 20, tbk: 16, tb: 10, yk: 5 },
  2024: { xs: 12, g: 20, kg: 22, k: 18, tbk: 14, tb: 9, yk: 5 },
  2025: { xs: 14, g: 20, kg: 22, k: 17, tbk: 13, tb: 9, yk: 5 }
};

const currentYear = new Date().getFullYear();
const YEAR_OPTIONS = Array.from({ length: 12 }, (_, idx) => currentYear - idx).filter((y) => y >= 2013);

const StudentRatingTrend = () => {
  const [startYear, setStartYear] = useState(Math.max(currentYear - 3, 2022));

  const chartData = useMemo(() => {
    const years = Array.from({ length: 4 }, (_, i) => startYear + i);
    return years.map((year) => ({
      year: `${year}`,
      ...(RATING_DISTRIBUTION[year] || {})
    }));
  }, [startYear]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload || !payload.length) return null;
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow">
        <p className="text-sm font-medium text-gray-900 mb-1">Năm {label}</p>
        {payload.map((entry) => (
          <div key={entry.name} className="text-sm text-gray-700 flex items-center gap-2">
            <span
              className="inline-block h-3 w-3 rounded-full"
              style={{ backgroundColor: entry.fill }}
            ></span>
            <span className="font-medium">{entry.name}:</span>
            <span>{entry.value}%</span>
          </div>
        ))}
      </div>
    );
  };

  const optionStyle = (value, selectedValue, isFuture = false) => ({
    backgroundColor: value === selectedValue ? '#e8eaf6' : 'white',
    color: isFuture ? '#dc2626' : '#111827'
  });

  return (
    <div className="card p-6 mt-6">
      <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center">
            <BarChart3 className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Xếp loại học lực sinh viên</h3>
            <p className="text-sm text-gray-600">Theo quy chuẩn 4 năm, xếp loại 7 mức</p>
          </div>
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
              const style = optionStyle(y, startYear, isFuture);
              return (
                <option key={y} value={y} style={style}>
                  {y} - {y + 3}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 10 }} barCategoryGap="20%">
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="year" tick={{ fontSize: 12 }} stroke="#6b7280" />
            <YAxis
              type="number"
              domain={[0, 100]}
              tickFormatter={(v) => `${v}%`}
              tick={{ fontSize: 11 }}
              stroke="#6b7280"
            />
            <Tooltip content={<CustomTooltip />} />
            {LEVELS.map((lvl, idx) => (
              <Bar
                key={lvl.key}
                dataKey={lvl.key}
                name={lvl.label}
                stackId="rating"
                fill={lvl.color}
                radius={idx === LEVELS.length - 1 ? [6, 6, 0, 0] : 0}
                isAnimationActive
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>

      {!chartData || chartData.length === 0 ? (
        <div className="mt-4 text-sm text-gray-600">Không có dữ liệu cho giai đoạn này</div>
      ) : null}
    </div>
  );
};

export default StudentRatingTrend;
