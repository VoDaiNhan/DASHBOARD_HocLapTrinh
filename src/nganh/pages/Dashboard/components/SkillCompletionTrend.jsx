import React, { useMemo, useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { Layers, CalendarRange, BookOpen } from 'lucide-react';

const COURSE_OPTIONS = [
  { value: 'intro', label: 'Nhập môn lập trình' },
  { value: 'tech', label: 'Kỹ thuật lập trình' },
  { value: 'ds', label: 'Cấu trúc dữ liệu & GT' },
  { value: 'oop', label: 'Lập trình HĐT' }
];

const SKILL_MAP = {
  intro: ['If / Else', 'Vòng lặp For/While', 'Hàm & Tham số', 'Mảng 1 chiều', 'Xử lý Chuỗi', 'Debug cơ bản'],
  tech: ['Con trỏ & Bộ nhớ động', 'Struct', 'File', 'Hàm & Thủ tục', 'Mảng động'],
  ds: ['Array & Linked List', 'Stack', 'Queue', 'Tree', 'Graph', 'Sorting'],
  oop: ['Class & Object', 'Inheritance', 'Polymorphism', 'Exception', 'Collections']
};

const COMPLETION_BY_SKILL = {
  intro: {
    'If / Else': { 2022: 72, 2023: 78, 2024: 82, 2025: 85 },
    'Vong lap For/While': { 2022: 68, 2023: 74, 2024: 79, 2025: 83 },
    'Ham & Tham so': { 2022: 65, 2023: 71, 2024: 76, 2025: 81 },
    'Mang 1 chieu': { 2022: 60, 2023: 68, 2024: 74, 2025: 78 },
    'Xu ly Chuoi': { 2022: 58, 2023: 64, 2024: 70, 2025: 75 },
    'Debug co ban': { 2022: 62, 2023: 69, 2024: 73, 2025: 77 }
  },
  tech: {
    'Con trỏ & Bộ nhớ động': { 2022: 55, 2023: 62, 2024: 70, 2025: 75 },
    Struct: { 2022: 60, 2023: 66, 2024: 72, 2025: 78 },
    File: { 2022: 58, 2023: 64, 2024: 69, 2025: 73 },
    'Hàm & Thủ tục': { 2022: 63, 2023: 68, 2024: 74, 2025: 79 },
    'Mảng động': { 2022: 57, 2023: 63, 2024: 69, 2025: 74 }
  },
  ds: {
    'Array & Linked List': { 2022: 52, 2023: 60, 2024: 66, 2025: 72 },
    Stack: { 2022: 54, 2023: 62, 2024: 68, 2025: 74 },
    Queue: { 2022: 53, 2023: 60, 2024: 66, 2025: 71 },
    Tree: { 2022: 50, 2023: 58, 2024: 64, 2025: 70 },
    Graph: { 2022: 48, 2023: 56, 2024: 62, 2025: 68 },
    Sorting: { 2022: 55, 2023: 63, 2024: 69, 2025: 75 }
  },
  oop: {
    'Class & Object': { 2022: 62, 2023: 70, 2024: 76, 2025: 81 },
    Inheritance: { 2022: 58, 2023: 66, 2024: 73, 2025: 78 },
    Polymorphism: { 2022: 55, 2023: 63, 2024: 70, 2025: 75 },
    Exception: { 2022: 50, 2023: 58, 2024: 64, 2025: 70 },
    Collections: { 2022: 56, 2023: 64, 2024: 70, 2025: 76 }
  }
};

const currentYear = new Date().getFullYear();
const YEAR_OPTIONS = Array.from({ length: 12 }, (_, idx) => currentYear - idx).filter((y) => y >= 2013);

const SkillCompletionTrend = ({ title, description }) => {
  const [selectedCourse, setSelectedCourse] = useState(COURSE_OPTIONS[0].value);
  const [selectedSkill, setSelectedSkill] = useState(SKILL_MAP[COURSE_OPTIONS[0].value][0]);
  const [startYear, setStartYear] = useState(Math.max(currentYear - 3, 2022));

  useEffect(() => {
    const nextSkills = SKILL_MAP[selectedCourse] || [];
    if (!nextSkills.includes(selectedSkill)) {
      setSelectedSkill(nextSkills[0]);
    }
  }, [selectedCourse, selectedSkill]);

  const chartData = useMemo(() => {
    const years = Array.from({ length: 4 }, (_, i) => startYear + i);
    return years.map((year) => ({
      year: `${year}`,
      completion:
        COMPLETION_BY_SKILL[selectedCourse]?.[selectedSkill]?.[year] ?? null
    }));
  }, [selectedCourse, selectedSkill, startYear]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload || !payload.length) return null;
    const value = payload[0]?.value;
    if (value === null || value === undefined) return null;
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow">
          <p className="text-sm font-medium text-gray-900 mb-1">Năm {label}</p>
        <p className="text-sm text-gray-700">
          Hoan thanh: <span className="font-semibold">{value}%</span>
        </p>
      </div>
    );
  };

  const optionStyle = (value, selectedValue, isFuture = false) => ({
    backgroundColor: value === selectedValue ? '#e8eaf6' : 'white',
    color: isFuture ? '#dc2626' : '#111827'
  });

  const CustomDot = (props) => {
    const { cx, cy, stroke, payload, value } = props;
    if (value === null || value === undefined) return null;
    const yearNum = parseInt(payload.year, 10);
    const isFuture = yearNum > currentYear;
    return <circle cx={cx} cy={cy} r={6} fill={isFuture ? '#ef4444' : stroke} stroke="white" strokeWidth={1.5} />;
  };

  return (
    <div className="card p-6 mt-6">
      <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center">
            <Layers className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{title || 'Tập kỹ năng'}</h3>
            <p className="text-sm text-gray-600">{description || 'Mức độ hoàn thành kỹ năng theo 4 năm'}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-gray-500" />
            <select
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
            >
              {COURSE_OPTIONS.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Kỹ năng</span>
            <select
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              value={selectedSkill}
              onChange={(e) => setSelectedSkill(e.target.value)}
            >
              {(SKILL_MAP[selectedCourse] || []).map((skill) => (
                <option key={skill} value={skill}>
                  {skill}
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
      </div>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="year" tick={{ fontSize: 12 }} stroke="#6b7280" />
            <YAxis domain={[0, 100]} tickFormatter={(v) => `${v}%`} tick={{ fontSize: 12 }} stroke="#6b7280" />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="completion"
              stroke="#3f51b5"
              strokeWidth={3}
              dot={<CustomDot />}
              activeDot={{ r: 7, stroke: '#3f51b5', strokeWidth: 2 }}
              connectNulls
              isAnimationActive
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {!chartData || chartData.length === 0 ? (
        <div className="mt-4 text-sm text-gray-600">Không có dữ liệu cho giai đoạn này</div>
      ) : null}
    </div>
  );
};

export default SkillCompletionTrend;
