import React, { useState, useMemo } from 'react';
import {
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  Radar, ResponsiveContainer, Tooltip,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Legend,
  BarChart, Bar, Cell, ComposedChart,
} from 'recharts';
import { AlertTriangle, TrendingUp, TrendingDown, ChevronDown, ChevronUp, Info, ChevronRight } from 'lucide-react';

const COHORTS = [
  { value: '2018-2022', label: '2018-2022' },
  { value: '2019-2023', label: '2019-2023' },
  { value: '2020-2024', label: '2020-2024' },
  { value: '2021-2025', label: '2021-2025' },
  { value: '2022-2026', label: '2022-2026' },
];

const courses = [
  { id: 'intro-prog', name: 'Nhập môn lập trình' },
  { id: 'prog-technique', name: 'Kĩ thuật lập trình' },
  { id: 'oop', name: 'Lập trình hướng đối tượng' },
  { id: 'data-struct-algo', name: 'Cấu trúc dữ liệu và giải thuật' },
  { id: 'database', name: 'Cơ sở dữ liệu' },
  { id: 'web-dev', name: 'Phát triển web' },
  { id: 'mobile-dev', name: 'Phát triển ứng dụng di động' },
];

// Kỹ năng + mức độ thành thạo theo môn với phân bố sinh viên + NGUYÊN NHÂN YẾU
const skillsData = {
  'intro-prog': [
    { 
      skill: 'Nhập xuất dữ liệu', 
      proficiency: 88, 
      description: 'Input/Output console', 
      gioi: 45, kha: 35, tb: 15, yeu: 5,
      causes: {
        labFail: 15, homeworkIncomplete: 10, quizLow: 8, attendanceLow: 5
      },
      trend: 'up', trendValue: 3
    },
    { 
      skill: 'Biến & Kiểu dữ liệu', 
      proficiency: 85, 
      description: 'Khai báo và sử dụng biến', 
      gioi: 40, kha: 38, tb: 17, yeu: 5,
      causes: {
        labFail: 12, homeworkIncomplete: 8, quizLow: 10, attendanceLow: 3
      },
      trend: 'up', trendValue: 2
    },
    { 
      skill: 'Vòng lặp', 
      proficiency: 82, 
      description: 'For, while, do-while loops', 
      gioi: 38, kha: 35, tb: 20, yeu: 7,
      causes: {
        labFail: 18, homeworkIncomplete: 15, quizLow: 12, attendanceLow: 5
      },
      trend: 'up', trendValue: 4
    },
    { 
      skill: 'Cấu trúc điều khiển', 
      proficiency: 78, 
      description: 'If-else, switch-case', 
      gioi: 35, kha: 33, tb: 22, yeu: 10,
      causes: {
        labFail: 22, homeworkIncomplete: 18, quizLow: 15, attendanceLow: 8
      },
      trend: 'stable', trendValue: 0
    },
    { 
      skill: 'Hàm cơ bản', 
      proficiency: 75, 
      description: 'Định nghĩa và gọi hàm', 
      gioi: 30, kha: 35, tb: 25, yeu: 10,
      causes: {
        labFail: 25, homeworkIncomplete: 20, quizLow: 18, attendanceLow: 10
      },
      trend: 'up', trendValue: 2
    },
    { 
      skill: 'Mảng 1 chiều', 
      proficiency: 70, 
      description: 'Khai báo, truy cập mảng', 
      gioi: 25, kha: 35, tb: 28, yeu: 12,
      causes: {
        labFail: 30, homeworkIncomplete: 25, quizLow: 20, attendanceLow: 12
      },
      trend: 'stable', trendValue: 0
    },
    { 
      skill: 'Chuỗi ký tự', 
      proficiency: 68, 
      description: 'Xử lý chuỗi cơ bản', 
      gioi: 22, kha: 33, tb: 30, yeu: 15,
      causes: {
        labFail: 35, homeworkIncomplete: 28, quizLow: 22, attendanceLow: 15
      },
      trend: 'down', trendValue: -2
    },
    { 
      skill: 'Debug cơ bản', 
      proficiency: 55, 
      description: 'Tìm và sửa lỗi', 
      gioi: 15, kha: 25, tb: 35, yeu: 25,
      causes: {
        labFail: 40, homeworkIncomplete: 30, quizLow: 20, attendanceLow: 15
      },
      trend: 'down', trendValue: -5
    },
  ],
  'prog-technique': [
    { 
      skill: 'Struct', 
      proficiency: 75, 
      description: 'Cấu trúc dữ liệu', 
      gioi: 30, kha: 35, tb: 25, yeu: 10,
      causes: {
        labFail: 25, homeworkIncomplete: 20, quizLow: 15, attendanceLow: 8
      },
      trend: 'up', trendValue: 3
    },
    { 
      skill: 'Testing', 
      proficiency: 58, 
      description: 'Unit testing', 
      gioi: 12, kha: 26, tb: 37, yeu: 25,
      causes: {
        labFail: 45, homeworkIncomplete: 35, quizLow: 30, attendanceLow: 22
      },
      trend: 'down', trendValue: -7
    },
  ],
};

// Xu hướng theo năm (cho line chart)
const yearlyTrendData = {
  'intro-prog': [
    { year: '2022', 'Debug cơ bản': 60, 'Chuỗi ký tự': 70, 'Mảng 1 chiều': 68, 'Hàm cơ bản': 68, 'Vòng lặp': 75 },
    { year: '2023', 'Debug cơ bản': 58, 'Chuỗi ký tự': 69, 'Mảng 1 chiều': 69, 'Hàm cơ bản': 71, 'Vòng lặp': 78 },
    { year: '2024', 'Debug cơ bản': 57, 'Chuỗi ký tự': 69, 'Mảng 1 chiều': 70, 'Hàm cơ bản': 73, 'Vòng lặp': 80 },
    { year: '2025', 'Debug cơ bản': 55, 'Chuỗi ký tự': 68, 'Mảng 1 chiều': 70, 'Hàm cơ bản': 75, 'Vòng lặp': 82 },
  ],
  'prog-technique': [
    { year: '2022', 'Testing': 65, 'Struct': 70 },
    { year: '2023', 'Testing': 62, 'Struct': 72 },
    { year: '2024', 'Testing': 60, 'Struct': 74 },
    { year: '2025', 'Testing': 58, 'Struct': 75 },
  ],
};

const LINE_COLORS = ['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6'];

// Helper functions
const getMainCauses = (causes) => {
  const causeList = [
    { key: 'labFail', label: 'Sai bài lab', value: causes.labFail },
    { key: 'homeworkIncomplete', label: 'Không làm bài tập', value: causes.homeworkIncomplete },
    { key: 'quizLow', label: 'Điểm quiz thấp', value: causes.quizLow },
    { key: 'attendanceLow', label: 'Vắng học nhiều', value: causes.attendanceLow },
  ];
  return causeList.sort((a, b) => b.value - a.value);
};

const getActionSuggestions = (skill) => {
  const causes = getMainCauses(skill.causes);
  const mainCause = causes[0];
  const suggestions = [];

  if (mainCause.key === 'labFail' && mainCause.value > 30) {
    suggestions.push('Tăng bài lab debug');
    suggestions.push('Mở lớp phụ đạo');
  } else if (mainCause.key === 'homeworkIncomplete' && mainCause.value > 25) {
    suggestions.push('Giảm khối lượng bài tập');
    suggestions.push('Tăng thời gian deadline');
  } else if (mainCause.key === 'quizLow' && mainCause.value > 20) {
    suggestions.push('Tổ chức buổi ôn tập');
    suggestions.push('Tạo quiz thử');
  } else {
    suggestions.push('Liên hệ sinh viên vắng');
    suggestions.push('Tăng tính tương tác');
  }

  return suggestions.slice(0, 2);
};

const getTrendIcon = (trend, trendValue) => {
  if (trend === 'up') return { icon: '↗️', color: 'text-green-600', text: `+${trendValue}%` };
  if (trend === 'down') return { icon: '↘️', color: 'text-red-600', text: `${trendValue}%` };
  return { icon: '→', color: 'text-gray-600', text: '0%' };
};
const SkillsProficiencyChart = () => {
  const [selectedCourse, setSelectedCourse] = useState('intro-prog');
  const [selectedCohort, setSelectedCohort] = useState('2022-2026');
  const [viewType, setViewType] = useState('trend');
  const [comparisonCourse, setComparisonCourse] = useState(null);
  const [showAllSkills, setShowAllSkills] = useState(false);
  const [expandedWeakSkill, setExpandedWeakSkill] = useState(null);
  const [showTopSkills, setShowTopSkills] = useState(5);

  const skills = skillsData[selectedCourse] || skillsData['intro-prog'];
  const yearlyTrend = yearlyTrendData[selectedCourse] || yearlyTrendData['intro-prog'];
  const comparisonSkills = comparisonCourse ? (skillsData[comparisonCourse] || skillsData['intro-prog']) : null;
  
  // Sort skills by proficiency (weakest first for management focus)
  const sortedSkills = useMemo(() => {
    return [...skills].sort((a, b) => a.proficiency - b.proficiency);
  }, [skills]);

  // Identify weak skills (< 70%)
  const weakSkills = useMemo(() => {
    return skills.filter(s => s.proficiency < 70).sort((a, b) => a.proficiency - b.proficiency);
  }, [skills]);

  // Identify strong skills (>= 80%)
  const strongSkills = useMemo(() => {
    return skills.filter(s => s.proficiency >= 80).sort((a, b) => b.proficiency - a.proficiency);
  }, [skills]);

  // Calculate summary stats
  const stats = useMemo(() => {
    const counts = {
      thanhThao: skills.filter(s => s.proficiency >= 80).length,
      kha: skills.filter(s => s.proficiency >= 70 && s.proficiency < 80).length,
      trungBinh: skills.filter(s => s.proficiency >= 60 && s.proficiency < 70).length,
      yeu: skills.filter(s => s.proficiency < 60).length,
    };
    return counts;
  }, [skills]);

  // Critical declining skills
  const criticalSkills = useMemo(() => {
    return weakSkills.filter(s => s.trend === 'down' && Math.abs(s.trendValue) >= 3);
  }, [weakSkills]);

  // Prepare chart data (top skills only)
  const chartData = useMemo(() => {
    const topSkillNames = [...skills]
      .sort((a, b) => a.proficiency - b.proficiency)
      .slice(0, showTopSkills)
      .map(s => s.skill);
    
    return yearlyTrend.map(yearData => {
      const filteredData = { year: yearData.year };
      topSkillNames.forEach(skillName => {
        if (yearData[skillName] !== undefined) {
          filteredData[skillName] = yearData[skillName];
        }
      });
      return filteredData;
    });
  }, [yearlyTrend, skills, showTopSkills]);

  // Auto-expand worst skill
  React.useEffect(() => {
    if (weakSkills.length > 0 && !expandedWeakSkill) {
      setExpandedWeakSkill(weakSkills[0].skill);
    }
  }, [weakSkills, expandedWeakSkill]);
  return (
    <div className="card p-6">
      {/* 🔷 1. HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6 gap-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
            Tập kỹ năng và mức độ thành thạo
          </h3>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 transition-all"
          >
            {courses.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          
          <select
            value={comparisonCourse || ''}
            onChange={(e) => setComparisonCourse(e.target.value || null)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 transition-all"
          >
            <option value="">So sánh ▼</option>
            {courses.filter(c => c.id !== selectedCourse).map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          
          <select
            value={selectedCohort}
            onChange={(e) => setSelectedCohort(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 transition-all"
          >
            {COHORTS.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
          </select>
          
          <div className="flex border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
            {[
              { value: 'trend', label: 'Xu hướng' },
              { value: 'distribution', label: 'Phân bố' },
              { value: 'radar', label: 'Radar' },
            ].map(type => (
              <button
                key={type.value}
                onClick={() => setViewType(type.value)}
                className={`px-3 py-2 text-sm font-medium transition-all ${
                  viewType === type.value
                    ? 'bg-blue-600 text-white'
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* 🔴 2. ALERT + SUMMARY (NGẮN GỌN) */}
      {criticalSkills.length > 0 && (
        <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <div className="flex items-center gap-2 text-sm">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <span className="font-medium text-red-900 dark:text-red-100">
              {criticalSkills[0].skill} giảm {Math.abs(criticalSkills[0].trendValue)}% trong năm qua ({criticalSkills[0].proficiency}%)
            </span>
          </div>
        </div>
      )}

      {weakSkills.length > 0 && (
        <div className="mb-4 p-3 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg">
          <div className="text-sm text-orange-900 dark:text-orange-100">
            <span className="font-medium">⚠️ {weakSkills.length} kỹ năng cần cải thiện:</span>
            <div className="flex flex-wrap gap-2 mt-2">
              {weakSkills.map(skill => {
                const trendInfo = getTrendIcon(skill.trend, skill.trendValue);
                return (
                  <span key={skill.skill} className="inline-flex items-center gap-1 px-2 py-1 bg-white dark:bg-orange-900/40 rounded text-xs">
                    {skill.skill} – {skill.proficiency}% 
                    <span className={trendInfo.color}>{trendInfo.text}</span>
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* 🔵 3. OVERVIEW STATS (1 dòng) */}
      <div className="mb-6 flex items-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-green-600">{stats.thanhThao}</span>
          <span className="text-gray-600 dark:text-gray-400">🟢 Thành thạo</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-blue-600">{stats.kha}</span>
          <span className="text-gray-600 dark:text-gray-400">🔵 Khá</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-yellow-600">{stats.trungBinh}</span>
          <span className="text-gray-600 dark:text-gray-400">🟡 Trung bình</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-red-600">{stats.yeu}</span>
          <span className="text-gray-600 dark:text-gray-400">🔴 Cần cải thiện</span>
        </div>
      </div>
      {/* 📈 4. CHART */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Xu hướng kỹ năng theo năm</h4>
          <select
            value={showTopSkills}
            onChange={(e) => setShowTopSkills(parseInt(e.target.value))}
            className="px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value={3}>Hiển thị top 3 skill ▼</option>
            <option value={5}>Hiển thị top 5 skill ▼</option>
            <option value={8}>Hiển thị tất cả ▼</option>
          </select>
        </div>
        
        <div className="h-64 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.5} vertical={false} />
              <XAxis 
                dataKey="year" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#6b7280', fontSize: 12 }}
              />
              <YAxis 
                domain={[0, 100]}
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#6b7280', fontSize: 11 }}
              />
              <Tooltip 
                contentStyle={{ 
                  borderRadius: 8, 
                  fontSize: 12,
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid #e5e7eb'
                }}
              />
              <Legend 
                wrapperStyle={{ paddingTop: '10px' }}
                iconType="line"
              />
              {Object.keys(chartData[0] || {}).filter(k => k !== 'year').map((key, i) => (
                <Line
                  key={key}
                  type="monotone"
                  dataKey={key}
                  stroke={LINE_COLORS[i % LINE_COLORS.length]}
                  strokeWidth={2}
                  dot={{ r: 3, strokeWidth: 2, fill: '#fff' }}
                  activeDot={{ r: 5 }}
                  name={key}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* 🔥 5. FOCUS AREA (CHỈ HIỂN THỊ SKILL YẾU) */}
      {weakSkills.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            ⚠️ Kỹ năng cần ưu tiên xử lý
          </h4>
          <div className="space-y-3">
            {weakSkills.map((skill, idx) => {
              const isExpanded = expandedWeakSkill === skill.skill;
              const trendInfo = getTrendIcon(skill.trend, skill.trendValue);
              const mainCauses = getMainCauses(skill.causes);
              const suggestions = getActionSuggestions(skill);
              
              return (
                <div key={skill.skill} className="border border-gray-200 dark:border-gray-700 rounded-lg">
                  {/* Header - Always visible */}
                  <div 
                    className="p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                    onClick={() => setExpandedWeakSkill(isExpanded ? null : skill.skill)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className={isExpanded ? 'rotate-90' : ''}>
                          <ChevronRight className="h-4 w-4 text-gray-400 transition-transform" />
                        </span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {skill.skill} ({skill.proficiency}% 
                          <span className={`ml-1 ${trendInfo.color}`}>{trendInfo.text}</span>)
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          skill.proficiency < 60 ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {skill.proficiency < 60 ? '🔴' : '🟡'}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500">
                        {isExpanded ? 'Thu gọn' : 'Xem chi tiết'}
                      </div>
                    </div>
                  </div>

                  {/* Expanded Content */}
                  {isExpanded && (
                    <div className="px-4 pb-4 border-t border-gray-100 dark:border-gray-700">
                      {/* Phân bố SV */}
                      <div className="mb-4 pt-3">
                        <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">├─ Phân bố SV:</div>
                        <div className="flex items-center gap-4 text-xs ml-4">
                          <span className="text-green-600">🟢{skill.gioi}%</span>
                          <span className="text-blue-600">🔵{skill.kha}%</span>
                          <span className="text-yellow-600">🟡{skill.tb}%</span>
                          <span className="text-red-600">🔴{skill.yeu}%</span>
                        </div>
                      </div>

                      {/* Nguyên nhân */}
                      <div className="mb-4">
                        <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">├─ Nguyên nhân:</div>
                        <div className="ml-4 space-y-1">
                          {mainCauses.slice(0, 3).map(cause => (
                            <div key={cause.key} className="text-xs text-gray-700 dark:text-gray-300">
                              │   • {cause.label} ({cause.value}%)
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Đề xuất */}
                      <div>
                        <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">└─ 👉 Đề xuất:</div>
                        <div className="ml-8 space-y-1">
                          {suggestions.map((suggestion, idx) => (
                            <div key={idx} className="text-xs text-blue-700 dark:text-blue-300">
                              • {suggestion}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
      {/* 🟢 6. TOP + QUICK VIEW (GỌN LẠI) */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Top 3 yếu */}
        <div>
          <h5 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Top 3 yếu</h5>
          <div className="space-y-2">
            {sortedSkills.slice(0, 3).map((skill, idx) => (
              <div key={skill.skill} className="flex items-center justify-between text-sm">
                <span className="text-gray-700 dark:text-gray-300">
                  {idx + 1}. {skill.skill}
                </span>
                <span className="font-medium text-red-600">{skill.proficiency}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top 3 mạnh */}
        <div>
          <h5 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Top 3 mạnh</h5>
          <div className="space-y-2">
            {strongSkills.slice(0, 3).map((skill, idx) => (
              <div key={skill.skill} className="flex items-center justify-between text-sm">
                <span className="text-gray-700 dark:text-gray-300">
                  {idx + 1}. {skill.skill}
                </span>
                <span className="font-medium text-green-600">{skill.proficiency}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ⚪ 7. ALL SKILLS (ẨN ĐI – KHÔNG SHOW MẶC ĐỊNH) */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
        <button
          onClick={() => setShowAllSkills(!showAllSkills)}
          className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <span>Xem tất cả kỹ năng</span>
          {showAllSkills ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
        
        {showAllSkills && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {sortedSkills.map((skill) => {
              const trendInfo = getTrendIcon(skill.trend, skill.trendValue);
              return (
                <div 
                  key={skill.skill} 
                  className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                  onClick={() => setExpandedWeakSkill(skill.skill)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {skill.skill}
                    </span>
                    <span className={`text-xs ${trendInfo.color}`}>
                      {trendInfo.icon}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-900 dark:text-white">
                      {skill.proficiency}%
                    </span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      skill.proficiency >= 80 ? 'bg-green-100 text-green-800' :
                      skill.proficiency >= 70 ? 'bg-blue-100 text-blue-800' :
                      skill.proficiency >= 60 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {skill.proficiency >= 80 ? '🟢' :
                       skill.proficiency >= 70 ? '🔵' :
                       skill.proficiency >= 60 ? '🟡' : '🔴'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillsProficiencyChart;