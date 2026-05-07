import React, { useState, useMemo } from 'react';
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, Download, Info, ChevronUp, ChevronDown, X, AlertTriangle } from 'lucide-react';

const courses = [
  { id: 'intro-prog', name: 'Nhập môn lập trình' },
  { id: 'prog-technique', name: 'Kĩ thuật lập trình' },
  { id: 'oop', name: 'Lập trình hướng đối tượng' },
  { id: 'data-struct-algo', name: 'Cấu trúc dữ liệu và giải thuật' },
  { id: 'database', name: 'Cơ sở dữ liệu' },
  { id: 'web-dev', name: 'Phát triển web' },
  { id: 'mobile-dev', name: 'Phát triển ứng dụng di động' },
  { id: 'software-eng', name: 'Công nghệ phần mềm' },
];

const completionData = {
  'intro-prog': {
    data: [
      { year: '2022', completion: 75, studentCount: 120, failRate: 12, absenceRate: 8, midtermAvg: 7.2, failedByGrade: 6, dropout: 4, notEligible: 2 },
      { year: '2023', completion: 78, studentCount: 115, failRate: 11, absenceRate: 7, midtermAvg: 7.5, failedByGrade: 5, dropout: 4, notEligible: 2 },
      { year: '2024', completion: 82, studentCount: 110, failRate: 9, absenceRate: 6, midtermAvg: 7.8, failedByGrade: 4, dropout: 3, notEligible: 2 },
      { year: '2025', completion: 88, studentCount: 105, failRate: 7, absenceRate: 5, midtermAvg: 8.1, failedByGrade: 3, dropout: 3, notEligible: 1 },
    ],
    instructor: 'TS. Nguyễn Văn An',
    benchmark: 75,
    target: 85,
    bottleneck: { type: 'class', name: '22CT111', rate: 68 },
  },
  'prog-technique': {
    data: [
      { year: '2022', completion: 70, studentCount: 110, failRate: 15, absenceRate: 10, midtermAvg: 6.8, failedByGrade: 8, dropout: 5, notEligible: 2 },
      { year: '2023', completion: 72, studentCount: 108, failRate: 14, absenceRate: 9, midtermAvg: 7.0, failedByGrade: 7, dropout: 5, notEligible: 2 },
      { year: '2024', completion: 75, studentCount: 105, failRate: 12, absenceRate: 8, midtermAvg: 7.2, failedByGrade: 6, dropout: 4, notEligible: 2 },
      { year: '2025', completion: 79, studentCount: 100, failRate: 10, absenceRate: 7, midtermAvg: 7.5, failedByGrade: 5, dropout: 3, notEligible: 2 },
    ],
    instructor: 'ThS. Trần Thị Bình',
    benchmark: 70,
    target: 80,
    bottleneck: { type: 'class', name: '22CT112', rate: 65 },
  },
  'oop': {
    data: [
      { year: '2022', completion: 68, studentCount: 115, failRate: 18, absenceRate: 12, midtermAvg: 6.5, failedByGrade: 10, dropout: 6, notEligible: 2 },
      { year: '2023', completion: 70, studentCount: 112, failRate: 16, absenceRate: 11, midtermAvg: 6.7, failedByGrade: 9, dropout: 5, notEligible: 2 },
      { year: '2024', completion: 73, studentCount: 108, failRate: 14, absenceRate: 10, midtermAvg: 7.0, failedByGrade: 8, dropout: 4, notEligible: 2 },
      { year: '2025', completion: 76, studentCount: 105, failRate: 12, absenceRate: 9, midtermAvg: 7.3, failedByGrade: 7, dropout: 3, notEligible: 2 },
    ],
    instructor: 'TS. Lê Văn Cường',
    benchmark: 68,
    target: 78,
    bottleneck: { type: 'topic', name: 'Kế thừa & Đa hình', rate: 62 },
  },
  'data-struct-algo': {
    data: [
      { year: '2022', completion: 65, studentCount: 100, failRate: 20, absenceRate: 12, midtermAvg: 6.3, failedByGrade: 11, dropout: 7, notEligible: 2 },
      { year: '2023', completion: 68, studentCount: 98, failRate: 18, absenceRate: 11, midtermAvg: 6.6, failedByGrade: 10, dropout: 6, notEligible: 2 },
      { year: '2024', completion: 71, studentCount: 95, failRate: 16, absenceRate: 10, midtermAvg: 6.9, failedByGrade: 9, dropout: 5, notEligible: 2 },
      { year: '2025', completion: 74, studentCount: 92, failRate: 14, absenceRate: 9, midtermAvg: 7.2, failedByGrade: 8, dropout: 4, notEligible: 2 },
    ],
    instructor: 'PGS. Phạm Văn Đức',
    benchmark: 65,
    target: 75,
    bottleneck: { type: 'topic', name: 'Cây nhị phân', rate: 58 },
  },
  'database': {
    data: [
      { year: '2022', completion: 80, studentCount: 105, failRate: 10, absenceRate: 7, midtermAvg: 7.8, failedByGrade: 5, dropout: 3, notEligible: 2 },
      { year: '2023', completion: 82, studentCount: 102, failRate: 9, absenceRate: 6, midtermAvg: 8.0, failedByGrade: 4, dropout: 3, notEligible: 2 },
      { year: '2024', completion: 85, studentCount: 100, failRate: 8, absenceRate: 5, midtermAvg: 8.2, failedByGrade: 4, dropout: 2, notEligible: 2 },
      { year: '2025', completion: 87, studentCount: 98, failRate: 7, absenceRate: 4, midtermAvg: 8.4, failedByGrade: 3, dropout: 2, notEligible: 2 },
    ],
    instructor: 'TS. Hoàng Thị Em',
    benchmark: 80,
    target: 88,
    bottleneck: { type: 'class', name: '22CT115', rate: 75 },
  },
  'web-dev': {
    data: [
      { year: '2022', completion: 77, studentCount: 95, failRate: 12, absenceRate: 8, midtermAvg: 7.5, failedByGrade: 6, dropout: 4, notEligible: 2 },
      { year: '2023', completion: 79, studentCount: 93, failRate: 11, absenceRate: 7, midtermAvg: 7.7, failedByGrade: 5, dropout: 4, notEligible: 2 },
      { year: '2024', completion: 81, studentCount: 90, failRate: 10, absenceRate: 6, midtermAvg: 7.9, failedByGrade: 5, dropout: 3, notEligible: 2 },
      { year: '2025', completion: 84, studentCount: 88, failRate: 9, absenceRate: 5, midtermAvg: 8.1, failedByGrade: 4, dropout: 3, notEligible: 2 },
    ],
    instructor: 'ThS. Vũ Văn Phúc',
    benchmark: 77,
    target: 85,
    bottleneck: { type: 'topic', name: 'React Hooks', rate: 70 },
  },
  'mobile-dev': {
    data: [
      { year: '2022', completion: 72, studentCount: 85, failRate: 14, absenceRate: 10, midtermAvg: 7.0, failedByGrade: 7, dropout: 5, notEligible: 2 },
      { year: '2023', completion: 74, studentCount: 83, failRate: 13, absenceRate: 9, midtermAvg: 7.2, failedByGrade: 6, dropout: 5, notEligible: 2 },
      { year: '2024', completion: 77, studentCount: 80, failRate: 12, absenceRate: 8, midtermAvg: 7.4, failedByGrade: 6, dropout: 4, notEligible: 2 },
      { year: '2025', completion: 80, studentCount: 78, failRate: 10, absenceRate: 7, midtermAvg: 7.6, failedByGrade: 5, dropout: 3, notEligible: 2 },
    ],
    instructor: 'TS. Đỗ Thị Giang',
    benchmark: 72,
    target: 82,
    bottleneck: { type: 'topic', name: 'State Management', rate: 65 },
  },
  'software-eng': {
    data: [
      { year: '2022', completion: 78, studentCount: 90, failRate: 11, absenceRate: 8, midtermAvg: 7.6, failedByGrade: 5, dropout: 4, notEligible: 2 },
      { year: '2023', completion: 80, studentCount: 88, failRate: 10, absenceRate: 7, midtermAvg: 7.8, failedByGrade: 5, dropout: 3, notEligible: 2 },
      { year: '2024', completion: 83, studentCount: 85, failRate: 9, absenceRate: 6, midtermAvg: 8.0, failedByGrade: 4, dropout: 3, notEligible: 2 },
      { year: '2025', completion: 86, studentCount: 83, failRate: 8, absenceRate: 5, midtermAvg: 8.2, failedByGrade: 4, dropout: 2, notEligible: 2 },
    ],
    instructor: 'PGS. Ngô Văn Hùng',
    benchmark: 78,
    target: 87,
    bottleneck: { type: 'class', name: '22CT118', rate: 72 },
  },
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const currentYear = label;
    const previousYearData = completionData[Object.keys(completionData)[0]]?.data.find(d => d.year === String(parseInt(currentYear) - 1));
    
    const mainCourse = payload.find(p => p.dataKey !== 'benchmark');
    const compareCourse = payload.find(p => p.dataKey !== 'benchmark' && p.dataKey !== mainCourse?.dataKey);
    
    const mainValue = mainCourse?.value || data.completion;
    const compareValue = compareCourse?.value;
    const benchmark = 75;
    
    const vsLastYear = previousYearData ? mainValue - previousYearData.completion : null;
    const vsBenchmark = mainValue - benchmark;
    const vsCompare = compareValue ? mainValue - compareValue : null;
    
    let trend = 'Ổn định';
    if (vsLastYear > 3) trend = 'Tăng mạnh ↗';
    else if (vsLastYear > 0) trend = 'Tăng nhẹ ↗';
    else if (vsLastYear < -3) trend = 'Giảm mạnh ↘';
    else if (vsLastYear < 0) trend = 'Giảm nhẹ ↘';
    
    return (
      <div className="bg-white dark:bg-gray-800 px-4 py-3 border-2 border-blue-500 dark:border-blue-400 rounded-xl shadow-2xl min-w-[280px]">
        <p className="font-bold text-gray-900 dark:text-white mb-3 text-base border-b pb-2">Năm {label}</p>
        
        <div className="space-y-2.5">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-2">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-gray-600 dark:text-gray-400">Tỉ lệ hoàn thành:</span>
              <span className="font-bold text-lg text-blue-600 dark:text-blue-400">{mainValue}%</span>
            </div>
            {vsLastYear !== null && (
              <div className="text-xs">
                <span className={`font-semibold ${vsLastYear >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {vsLastYear > 0 ? '+' : ''}{vsLastYear.toFixed(1)}% vs năm trước
                </span>
                <span className="text-gray-500 ml-2">({trend})</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-600 dark:text-gray-400">So với mức chuẩn:</span>
            <span className={`font-bold ${vsBenchmark >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {vsBenchmark > 0 ? '+' : ''}{vsBenchmark.toFixed(1)}%
            </span>
          </div>
          
          {vsCompare !== null && (
            <div className="flex items-center justify-between text-xs bg-purple-50 dark:bg-purple-900/20 rounded p-2">
              <span className="text-gray-600 dark:text-gray-400">Chênh lệch:</span>
              <span className={`font-bold ${vsCompare >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {vsCompare > 0 ? 'Cao hơn' : 'Thấp hơn'} {Math.abs(vsCompare).toFixed(1)}%
              </span>
            </div>
          )}
          
          {data.studentCount && (
            <>
              <div className="border-t pt-2 mt-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-600 dark:text-gray-400">Số sinh viên:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{data.studentCount}</span>
                </div>
                <div className="flex items-center justify-between text-xs mt-1">
                  <span className="text-gray-600 dark:text-gray-400">Tỷ lệ rớt:</span>
                  <span className={`font-medium ${data.failRate > 15 ? 'text-red-600' : 'text-gray-900 dark:text-white'}`}>
                    {data.failRate}%
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs mt-1">
                  <span className="text-gray-600 dark:text-gray-400">Điểm TB giữa kỳ:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{data.midtermAvg}</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
  return null;
};

const CourseCompletionChart = () => {
  const [selectedCourse, setSelectedCourse] = useState('intro-prog');
  const [compareCourse, setCompareCourse] = useState('');
  const [selectedYear, setSelectedYear] = useState('2022-2026');
  const [showDrillDown, setShowDrillDown] = useState(false);
  const [drillDownYear, setDrillDownYear] = useState(null);
  const [showImprovementPlanModal, setShowImprovementPlanModal] = useState(false);
  const [hoveredBar, setHoveredBar] = useState(null);

  const data = completionData[selectedCourse]?.data || [];
  const courseInfo = completionData[selectedCourse] || {};
  const compareData = compareCourse ? completionData[compareCourse]?.data || [] : [];
  const compareCourseInfo = compareCourse ? completionData[compareCourse] || {} : null;

  const SCHOOL_BENCHMARK = 75;

  const chartData = useMemo(() => {
    if (!compareCourse) {
      return data.map(d => ({
        year: d.year,
        completion: d.completion,
        benchmark: SCHOOL_BENCHMARK
      }));
    }
    
    const years = ['2022', '2023', '2024', '2025'];
    return years.map(year => {
      const mainData = data.find(d => d.year === year) || {};
      const compData = compareData.find(d => d.year === year) || {};
      return {
        year,
        [courses.find(c => c.id === selectedCourse)?.name || 'Môn 1']: mainData.completion,
        [courses.find(c => c.id === compareCourse)?.name || 'Môn 2']: compData.completion,
        benchmark: SCHOOL_BENCHMARK
      };
    });
  }, [data, compareData, selectedCourse, compareCourse]);

  // Analytics
  const analytics = useMemo(() => {
    if (data.length === 0) return { trend: 'stable', avgGrowth: 0, latest: 0, causes: [], shortTermTrend: 0, prediction: 0 };
    
    const latest = data[data.length - 1].completion;
    const first = data[0].completion;
    const growth = latest - first;
    const avgGrowth = (growth / (data.length - 1)).toFixed(1);
    
    // Short-term trend (last 2 years)
    const shortTermTrend = data.length >= 2 ? data[data.length - 1].completion - data[data.length - 2].completion : 0;
    
    // Simple prediction (extrapolate)
    const prediction = latest + parseFloat(avgGrowth);
    
    let trend = 'stable';
    if (growth > 5) trend = 'increasing';
    else if (growth < -5) trend = 'decreasing';
    
    const causes = [];
    if (data[data.length - 1].failRate > 15) causes.push('Tỷ lệ rớt cao');
    if (data[data.length - 1].absenceRate > 10) causes.push('Tỷ lệ vắng cao');
    if (data[data.length - 1].midtermAvg < 7.0) causes.push('Điểm giữa kỳ thấp');
    
    return { trend, avgGrowth, latest, first, growth, causes, shortTermTrend, prediction };
  }, [data]);

  // Course ranking
  const courseRanking = useMemo(() => {
    const rankings = Object.entries(completionData).map(([id, info]) => ({
      id,
      name: courses.find(c => c.id === id)?.name || id,
      completion: info.data[info.data.length - 1].completion,
      instructor: info.instructor,
    })).sort((a, b) => b.completion - a.completion);
    
    const currentRank = rankings.findIndex(r => r.id === selectedCourse) + 1;
    const gapToTop1 = analytics.latest - rankings[0].completion;
    
    return { top3: rankings.slice(0, 3), currentRank, gapToTop1 };
  }, [selectedCourse, analytics.latest]);

  const handleBarClick = (data) => {
    setDrillDownYear(data.year);
    setShowDrillDown(true);
  };

  return (
    <div className="card p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6 gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Tỉ lệ hoàn thành môn học
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Phân tích xu hướng qua các năm • Mức chuẩn: {SCHOOL_BENCHMARK}%
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 font-medium"
          >
            {courses.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          
          <select
            value={compareCourse}
            onChange={(e) => setCompareCourse(e.target.value)}
            className="px-4 py-2 border border-purple-300 dark:border-purple-600 rounded-lg bg-purple-50 dark:bg-purple-900/20 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-purple-500 font-medium"
          >
            <option value="">So sánh với...</option>
            {courses.filter(c => c.id !== selectedCourse).map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 font-medium"
          >
            <option value="2018-2022">2018-2022</option>
            <option value="2019-2023">2019-2023</option>
            <option value="2020-2024">2020-2024</option>
            <option value="2021-2025">2021-2025</option>
            <option value="2022-2026">2022-2026</option>
          </select>
        </div>
      </div>

      {/* Chart */}
      <div className="h-80 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart 
            data={chartData} 
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            barCategoryGap="20%"
            barGap={4}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" opacity={0.5} />
            <XAxis 
              dataKey="year" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6b7280', fontSize: 13 }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6b7280', fontSize: 12 }}
              domain={[0, 100]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ paddingTop: '10px' }}
              iconType="line"
            />
            
            <Line
              type="monotone"
              dataKey="benchmark"
              stroke="#f59e0b"
              strokeWidth={3}
              strokeDasharray="8 4"
              dot={{ fill: '#f59e0b', r: 6, strokeWidth: 2, stroke: '#fff' }}
              name="Mức chuẩn (75%)"
            />
            
            {!compareCourse ? (
              <>
                <Bar 
                  dataKey="completion"
                  fill="#3b82f6"
                  radius={[8, 8, 0, 0]}
                  name="Tỉ lệ hoàn thành"
                  maxBarSize={100}
                  legendType="none"
                  onMouseEnter={(data) => setHoveredBar(data.year)}
                  onMouseLeave={() => setHoveredBar(null)}
                  onClick={handleBarClick}
                  cursor="pointer"
                  opacity={hoveredBar ? (hoveredBar === chartData.find(d => d.completion)?.year ? 1 : 0.3) : 1}
                />
                <Line
                  type="monotone"
                  dataKey="completion"
                  stroke="#3b82f6"
                  strokeWidth={hoveredBar ? 4 : 3}
                  dot={{ fill: '#3b82f6', r: 5, strokeWidth: 2, stroke: '#fff' }}
                  name={courses.find(c => c.id === selectedCourse)?.name}
                />
              </>
            ) : (
              <>
                <Bar 
                  dataKey={courses.find(c => c.id === selectedCourse)?.name || 'Môn 1'}
                  fill="#3b82f6"
                  radius={[8, 8, 0, 0]}
                  maxBarSize={70}
                  legendType="none"
                  onMouseEnter={(data) => setHoveredBar(data.year + '-1')}
                  onMouseLeave={() => setHoveredBar(null)}
                  onClick={handleBarClick}
                  cursor="pointer"
                  opacity={hoveredBar ? (hoveredBar.includes(chartData.find(d => d[courses.find(c => c.id === selectedCourse)?.name])?.year) ? 1 : 0.3) : 1}
                />
                <Line
                  type="monotone"
                  dataKey={courses.find(c => c.id === selectedCourse)?.name || 'Môn 1'}
                  stroke="#3b82f6"
                  strokeWidth={hoveredBar && hoveredBar.includes('-1') ? 4 : 3}
                  dot={{ fill: '#3b82f6', r: 5, strokeWidth: 2, stroke: '#fff' }}
                  name={courses.find(c => c.id === selectedCourse)?.name}
                />
                <Bar
                  dataKey={courses.find(c => c.id === compareCourse)?.name || 'Môn 2'}
                  fill="#8b5cf6"
                  radius={[8, 8, 0, 0]}
                  maxBarSize={70}
                  legendType="none"
                  onMouseEnter={(data) => setHoveredBar(data.year + '-2')}
                  onMouseLeave={() => setHoveredBar(null)}
                  onClick={handleBarClick}
                  cursor="pointer"
                  opacity={hoveredBar ? (hoveredBar.includes(chartData.find(d => d[courses.find(c => c.id === compareCourse)?.name])?.year) ? 1 : 0.3) : 1}
                />
                <Line
                  type="monotone"
                  dataKey={courses.find(c => c.id === compareCourse)?.name || 'Môn 2'}
                  stroke="#8b5cf6"
                  strokeWidth={hoveredBar && hoveredBar.includes('-2') ? 4 : 3}
                  dot={{ fill: '#8b5cf6', r: 5, strokeWidth: 2, stroke: '#fff' }}
                  name={courses.find(c => c.id === compareCourse)?.name}
                />
              </>
            )}
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Compare Summary & Insights */}
      {compareCourse && compareCourseInfo && (() => {
        const mainLatest = analytics.latest;
        const compareLatest = compareData[compareData.length - 1]?.completion || 0;
        const diff = mainLatest - compareLatest;
        const mainName = courses.find(c => c.id === selectedCourse)?.name;
        const compareName = courses.find(c => c.id === compareCourse)?.name;
        
        const mainTrend = data[data.length - 1].completion - data[0].completion;
        const compareTrend = compareData[compareData.length - 1]?.completion - compareData[0]?.completion;
        
        return (
          <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10 rounded-xl border border-blue-200 dark:border-blue-800">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <span className="text-lg">📊</span> So sánh tổng quan
            </h4>
            <div className="space-y-2 text-sm">
              <p className="text-gray-700 dark:text-gray-300">
                <span className="font-bold text-blue-600">{mainName}</span> {diff >= 0 ? 'cao hơn' : 'thấp hơn'} <span className="font-bold text-purple-600">{compareName}</span> trung bình <span className="font-bold text-lg">{Math.abs(diff).toFixed(1)}%</span>.
              </p>
              <div className="grid grid-cols-2 gap-3 mt-3">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
                  <div className="text-xs text-gray-500 mb-1">{mainName}</div>
                  <div className="font-bold text-blue-600">{mainLatest}%</div>
                  <div className="text-xs text-gray-600 mt-1">
                    {mainTrend > 0 ? '↗' : '↘'} {mainTrend > 0 ? '+' : ''}{mainTrend.toFixed(1)}% (2022-2025)
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
                  <div className="text-xs text-gray-500 mb-1">{compareName}</div>
                  <div className="font-bold text-purple-600">{compareLatest}%</div>
                  <div className="text-xs text-gray-600 mt-1">
                    {compareTrend > 0 ? '↗' : '↘'} {compareTrend > 0 ? '+' : ''}{compareTrend.toFixed(1)}% (2022-2025)
                  </div>
                </div>
              </div>
              {compareLatest < SCHOOL_BENCHMARK && (
                <p className="text-amber-700 dark:text-amber-300 text-xs mt-2">
                  ⚠️ <span className="font-semibold">{compareName}</span> vẫn thấp hơn mức chuẩn {SCHOOL_BENCHMARK}% (thiếu {(SCHOOL_BENCHMARK - compareLatest).toFixed(1)}%).
                </p>
              )}
            </div>
          </div>
        );
      })()}
      
      {/* Auto Insights */}
      {(() => {
        const insights = [];
        
        if (data.length >= 2) {
          const recentGrowth = data[data.length - 1].completion - data[data.length - 2].completion;
          const avgGrowth = (data[data.length - 1].completion - data[0].completion) / (data.length - 1);
          
          if (recentGrowth < avgGrowth * 0.5 && recentGrowth < 2) {
            insights.push({
              type: 'warning',
              icon: '⚠️',
              text: `${data[data.length - 1].year} có mức tăng chậm bất thường (chỉ +${recentGrowth.toFixed(1)}% so với trung bình +${avgGrowth.toFixed(1)}%/năm).`
            });
          }
          
          if (data[data.length - 1].failRate > 15) {
            insights.push({
              type: 'danger',
              icon: '🚨',
              text: `Tỷ lệ rớt cao (${data[data.length - 1].failRate}%) - cần can thiệp ngay.`
            });
          }
          
          if (analytics.latest >= SCHOOL_BENCHMARK && analytics.shortTermTrend > 0) {
            insights.push({
              type: 'success',
              icon: '✅',
              text: `Xu hướng tích cực: Đã đạt chuẩn và đang tiếp tục cải thiện (+${analytics.shortTermTrend.toFixed(1)}% năm gần nhất).`
            });
          }
          
          if (analytics.latest < SCHOOL_BENCHMARK && analytics.shortTermTrend < 0) {
            insights.push({
              type: 'danger',
              icon: '📉',
              text: `Cảnh báo: Chưa đạt chuẩn và đang có xu hướng giảm (${analytics.shortTermTrend.toFixed(1)}%).`
            });
          }
        }
        
        if (insights.length === 0) return null;
        
        return (
          <div className="mb-6 space-y-2">
            {insights.map((insight, idx) => (
              <div 
                key={idx}
                className={`p-3 rounded-lg border-l-4 ${
                  insight.type === 'success' ? 'bg-green-50 dark:bg-green-900/20 border-green-500' :
                  insight.type === 'warning' ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-500' :
                  'bg-red-50 dark:bg-red-900/20 border-red-500'
                }`}
              >
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  <span className="mr-2">{insight.icon}</span>
                  {insight.text}
                </p>
              </div>
            ))}
          </div>
        );
      })()}

      {/* Progress Bar - Target Achievement */}
      <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-100">📊 So với mức chuẩn</h4>
          <span className="text-xs text-blue-700 dark:text-blue-300">
            Mức chuẩn: {SCHOOL_BENCHMARK}%
          </span>
        </div>
        <div className="space-y-3">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                {courses.find(c => c.id === selectedCourse)?.name}
              </span>
              <span className={`text-xs font-bold ${analytics.latest >= SCHOOL_BENCHMARK ? 'text-green-600' : 'text-red-600'}`}>
                {analytics.latest}%
              </span>
            </div>
            <div className="relative w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
              <div
                className={`h-full rounded-full transition-all ${
                  analytics.latest >= SCHOOL_BENCHMARK ? 'bg-green-500' : 'bg-red-500'
                }`}
                style={{ width: `${Math.min(100, analytics.latest)}%` }}
              />
              <div 
                className="absolute top-0 h-full w-0.5 bg-yellow-500"
                style={{ left: `${SCHOOL_BENCHMARK}%` }}
                title={`Mức chuẩn: ${SCHOOL_BENCHMARK}%`}
              />
            </div>
          </div>
          
          {compareCourse && compareCourseInfo && (() => {
            const compareLatest = compareData[compareData.length - 1]?.completion || 0;
            return (
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                    {courses.find(c => c.id === compareCourse)?.name}
                  </span>
                  <span className={`text-xs font-bold ${compareLatest >= SCHOOL_BENCHMARK ? 'text-green-600' : 'text-red-600'}`}>
                    {compareLatest}%
                  </span>
                </div>
                <div className="relative w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div
                    className={`h-full rounded-full transition-all ${
                      compareLatest >= SCHOOL_BENCHMARK ? 'bg-green-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${Math.min(100, compareLatest)}%` }}
                  />
                  <div 
                    className="absolute top-0 h-full w-0.5 bg-yellow-500"
                    style={{ left: `${SCHOOL_BENCHMARK}%` }}
                  />
                </div>
              </div>
            );
          })()}
        </div>
        <div className="mt-3 text-xs text-blue-700 dark:text-blue-300">
          {analytics.latest >= SCHOOL_BENCHMARK ? (
            <span className="flex items-center gap-1">
              ✓ Đạt mức chuẩn (+{(analytics.latest - SCHOOL_BENCHMARK).toFixed(1)}%)
            </span>
          ) : (
            <span className="flex items-center gap-1">
              ⚠ Chưa đạt mức chuẩn (còn thiếu {(SCHOOL_BENCHMARK - analytics.latest).toFixed(1)}%)
            </span>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {analytics.latest}%
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Hiện tại</div>
          <div className={`text-xs font-semibold mt-2 ${analytics.latest >= SCHOOL_BENCHMARK ? 'text-green-600' : 'text-red-600'}`}>
            {analytics.latest >= SCHOOL_BENCHMARK 
              ? `+${(analytics.latest - SCHOOL_BENCHMARK).toFixed(1)}% vượt chuẩn`
              : `${(analytics.latest - SCHOOL_BENCHMARK).toFixed(1)}% so với chuẩn ${SCHOOL_BENCHMARK}%`
            }
          </div>
        </div>
        <div className={`rounded-lg p-4 border ${analytics.shortTermTrend > 0 ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' : analytics.shortTermTrend < 0 ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800' : 'bg-gray-50 dark:bg-gray-900/20 border-gray-200 dark:border-gray-800'}`}>
          <div className={`text-2xl font-bold flex items-center gap-1 ${analytics.shortTermTrend > 0 ? 'text-green-600 dark:text-green-400' : analytics.shortTermTrend < 0 ? 'text-red-600 dark:text-red-400' : 'text-gray-600 dark:text-gray-400'}`}>
            {analytics.shortTermTrend > 0 ? '+' : ''}{analytics.shortTermTrend.toFixed(1)}%
            {analytics.shortTermTrend > 0 ? <TrendingUp className="h-4 w-4" /> : analytics.shortTermTrend < 0 ? <TrendingDown className="h-4 w-4" /> : null}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Xu hướng gần đây</div>
          <div className="text-xs font-medium mt-2 text-gray-700 dark:text-gray-300">
            {analytics.shortTermTrend > 0 ? '↗ Đang cải thiện' : analytics.shortTermTrend < 0 ? '↘ Đang giảm' : '→ Ổn định'}
          </div>
        </div>
        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
            {analytics.prediction.toFixed(0)}%
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Dự kiến năm sau</div>
          <div className="text-xs font-medium mt-2 text-gray-700 dark:text-gray-300">
            {analytics.prediction >= courseInfo.target ? '✓ Sẽ đạt mục tiêu' : '⚠ Cần cải thiện'}
          </div>
        </div>
        <div className={`rounded-lg p-4 border ${analytics.latest >= SCHOOL_BENCHMARK ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' : 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800'}`}>
          <div className={`text-2xl font-bold ${analytics.latest >= SCHOOL_BENCHMARK ? 'text-green-600 dark:text-green-400' : 'text-amber-600 dark:text-amber-400'}`}>
            {analytics.latest >= SCHOOL_BENCHMARK ? 'Đạt chuẩn' : 'Chưa đạt'}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Trạng thái</div>
          <div className="text-xs font-medium mt-2 text-gray-700 dark:text-gray-300">
            Mức chuẩn: {SCHOOL_BENCHMARK}%
          </div>
        </div>
      </div>

      {/* Breakdown - Nguyên nhân không hoàn thành */}
      {data.length > 0 && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
          <h4 className="text-sm font-semibold text-red-900 dark:text-red-100 mb-3 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Phân tích {100 - data[data.length - 1].completion}% sinh viên KHÔNG hoàn thành
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
              <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                {data[data.length - 1].failedByGrade}%
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Trượt điểm</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Không đạt điểm tối thiểu</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                {data[data.length - 1].dropout}%
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Bỏ học</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Rút môn giữa chừng</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-3">
              <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                {data[data.length - 1].notEligible}%
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Không đủ điều kiện</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Vắng quá nhiều buổi</div>
            </div>
          </div>
          <div className="mt-3 text-xs text-red-700 dark:text-red-300">
            💡 <span className="font-semibold">Ưu tiên:</span> Tập trung vào nhóm "Trượt điểm" ({data[data.length - 1].failedByGrade}%) - có thể cải thiện nhanh nhất
          </div>
        </div>
      )}

      {/* Bottleneck - Nhóm kéo tụt */}
      {courseInfo.bottleneck && (
        <div className="mb-6 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
          <h4 className="text-sm font-semibold text-amber-900 dark:text-amber-100 mb-2 flex items-center gap-2">
            🎯 Điểm nghẽn chính
          </h4>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-amber-800 dark:text-amber-200">
                <span className="font-bold">{courseInfo.bottleneck.name}</span> có tỉ lệ hoàn thành thấp nhất: <span className="font-bold text-red-600">{courseInfo.bottleneck.rate}%</span>
              </p>
              <p className="text-xs text-amber-700 dark:text-amber-300 mt-1">
                {courseInfo.bottleneck.type === 'class' ? '📚 Lớp học' : '📖 Chủ đề'} này đang kéo tụt tỉ lệ hoàn thành chung
              </p>
            </div>
            <button
              onClick={() => alert(`Xem chi tiết ${courseInfo.bottleneck.name} - Tính năng sẽ được triển khai`)}
              className="px-3 py-1.5 text-xs font-medium text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-900/30 rounded-lg hover:bg-amber-200 dark:hover:bg-amber-900/50 transition-colors"
            >
              Xem chi tiết
            </button>
          </div>
        </div>
      )}

      {/* Ranking Section */}
      <div className="mb-6 p-4 bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
        <h4 className="text-sm font-semibold text-amber-900 dark:text-amber-100 mb-3">🏆 Xếp hạng môn học</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {courseRanking.top3.map((course, idx) => (
            <div key={course.id} className={`p-3 rounded-lg ${idx === 0 ? 'bg-yellow-100 dark:bg-yellow-900/30 border-2 border-yellow-400' : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700'}`}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-gray-600 dark:text-gray-400">#{idx + 1}</span>
                <span className="text-lg font-bold text-gray-900 dark:text-white">{course.completion}%</span>
              </div>
              <div className="text-xs font-medium text-gray-900 dark:text-white mb-1">{course.name}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">GV: {course.instructor}</div>
            </div>
          ))}
        </div>
        <div className="mt-3 text-xs text-amber-700 dark:text-amber-300">
          Môn hiện tại xếp hạng <span className="font-bold">#{courseRanking.currentRank}</span>
          {courseRanking.gapToTop1 < 0 && (
            <span> • Kém top 1: <span className="font-bold text-red-600">{Math.abs(courseRanking.gapToTop1).toFixed(1)}%</span></span>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 mb-6">
        <button
          onClick={() => alert('Xem danh sách sinh viên chưa hoàn thành - Tính năng sẽ được triển khai')}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
        >
          <AlertTriangle className="h-4 w-4" />
          Xem SV chưa hoàn thành
        </button>
        <button
          onClick={() => alert(`Xem chi tiết ${courseInfo.bottleneck?.name || 'nhóm yếu'} - Tính năng sẽ được triển khai`)}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-amber-600 rounded-lg hover:bg-amber-700 transition-colors"
        >
          Xem nhóm kéo tụt
        </button>
        <button
          onClick={() => setShowImprovementPlanModal(true)}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Info className="h-4 w-4" />
          Tạo kế hoạch cải thiện
        </button>
        <button
          onClick={() => alert('Lọc theo lớp - Tính năng sẽ được triển khai')}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
        >
          Lọc theo lớp
        </button>
        <button
          onClick={() => {
            const csvContent = [
              ['Báo cáo tỉ lệ hoàn thành môn học'],
              ['Năm', 'Tỉ lệ hoàn thành', 'Số SV', 'Tỷ lệ rớt', 'Trượt điểm', 'Bỏ học', 'Không đủ ĐK'],
              ...data.map(d => [d.year, d.completion, d.studentCount, d.failRate, d.failedByGrade, d.dropout, d.notEligible]),
            ].map(row => row.join(',')).join('\n');
            
            const BOM = '\uFEFF';
            const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', `tỉ-lệ-hoàn-thành-${selectedCourse}-${new Date().getTime()}.csv`);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
        >
          <Download className="h-4 w-4" />
          Xuất báo cáo
        </button>
      </div>

      {/* Drill-down Modal */}
      {showDrillDown && drillDownYear && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-75" onClick={() => setShowDrillDown(false)} />

            <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Chi tiết năm {drillDownYear}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                      {courses.find(c => c.id === selectedCourse)?.name}
                    </p>
                  </div>
                  <button 
                    onClick={() => setShowDrillDown(false)} 
                    className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
              </div>

              <div className="px-6 py-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {data.find(d => d.year === drillDownYear) && (() => {
                    const yearData = data.find(d => d.year === drillDownYear);
                    return (
                      <>
                        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{yearData.completion}%</div>
                          <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Tỉ lệ hoàn thành</div>
                        </div>
                        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{yearData.studentCount}</div>
                          <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Số sinh viên</div>
                        </div>
                        <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
                          <div className="text-2xl font-bold text-red-600 dark:text-red-400">{yearData.failRate}%</div>
                          <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Tỷ lệ rớt</div>
                        </div>
                        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                          <div className="text-2xl font-bold text-green-600 dark:text-green-400">{yearData.midtermAvg}</div>
                          <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Điểm giữa kỳ TB</div>
                        </div>
                      </>
                    );
                  })()}
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
                <button
                  onClick={() => setShowDrillDown(false)}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Improvement Plan Modal */}
      {showImprovementPlanModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-75" onClick={() => setShowImprovementPlanModal(false)} />

            <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Tạo kế hoạch cải thiện
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                  {courses.find(c => c.id === selectedCourse)?.name}
                </p>
              </div>

              <div className="px-6 py-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Mục tiêu cải thiện
                  </label>
                  <input
                    type="text"
                    defaultValue={`Nâng tỉ lệ hoàn thành từ ${analytics.latest}% lên ${courseInfo.target}%`}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Thời gian thực hiện
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                    <option>Học kỳ 1 - 2026</option>
                    <option>Học kỳ 2 - 2026</option>
                    <option>Cả năm 2026</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Hành động cụ thể
                  </label>
                  <div className="space-y-2">
                    {analytics.causes.map((cause, idx) => (
                      <div key={idx} className="flex items-start gap-2 p-2 bg-gray-50 dark:bg-gray-700/50 rounded">
                        <input type="checkbox" defaultChecked className="mt-1" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          Giải quyết: {cause}
                        </span>
                      </div>
                    ))}
                    <div className="flex items-start gap-2 p-2 bg-gray-50 dark:bg-gray-700/50 rounded">
                      <input type="checkbox" defaultChecked className="mt-1" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        Tổ chức lớp phụ đạo cho sinh viên yếu kém
                      </span>
                    </div>
                    <div className="flex items-start gap-2 p-2 bg-gray-50 dark:bg-gray-700/50 rounded">
                      <input type="checkbox" defaultChecked className="mt-1" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        Cập nhật tài liệu và bài tập
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Người chịu trách nhiệm
                  </label>
                  <input
                    type="text"
                    defaultValue={courseInfo.instructor}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
                <button
                  onClick={() => setShowImprovementPlanModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                >
                  Hủy
                </button>
                <button
                  onClick={() => {
                    alert('Kế hoạch đã được lưu! Sẽ gửi thông báo đến giảng viên.');
                    setShowImprovementPlanModal(false);
                  }}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Lưu kế hoạch
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseCompletionChart;
