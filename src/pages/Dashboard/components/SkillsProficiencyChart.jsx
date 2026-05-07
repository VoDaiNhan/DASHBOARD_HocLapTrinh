import React, { useState, useMemo, useCallback } from 'react';
import {
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  Radar, ResponsiveContainer, Tooltip,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Legend,
  BarChart, Bar, Cell, ComposedChart,
} from 'recharts';
import { 
  AlertTriangle, 
  TrendingUp, 
  TrendingDown, 
  ChevronDown, 
  ChevronUp, 
  Info, 
  ChevronRight,
  Users, 
  Target, 
  ArrowUpRight, 
  ArrowDownRight, 
  Activity, 
  FileText, 
  Share2, 
  Zap,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

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
      skill: 'Hàm cơ bản', 
      proficiency: 75, 
      masteryScore: 7.5,
      passRate: 85,
      failedCount: 12,
      industryDemand: 'High',
      description: 'Định nghĩa và gọi hàm', 
      gioi: 40, kha: 30, tb: 15, yeu: 15,
      causes: { labFail: 15, homeworkIncomplete: 10, quizLow: 8, attendanceLow: 5 },
      trend: 'up', trendValue: 5
    },
    { 
      skill: 'Mảng 1 chiều', 
      proficiency: 70, 
      masteryScore: 6.8,
      passRate: 72,
      failedCount: 22,
      industryDemand: 'High',
      description: 'Khai báo, truy cập mảng', 
      gioi: 25, kha: 35, tb: 28, yeu: 12,
      causes: { labFail: 30, homeworkIncomplete: 25, quizLow: 20, attendanceLow: 12 },
      trend: 'stable', trendValue: 0
    },
    { 
      skill: 'Chuỗi ký tự', 
      proficiency: 68, 
      masteryScore: 6.2,
      passRate: 65,
      failedCount: 28,
      industryDemand: 'Medium',
      description: 'Xử lý chuỗi cơ bản', 
      gioi: 22, kha: 33, tb: 30, yeu: 15,
      causes: { labFail: 35, homeworkIncomplete: 28, quizLow: 22, attendanceLow: 15 },
      trend: 'down', trendValue: -2
    },
    { 
      skill: 'Debug cơ bản', 
      proficiency: 55, 
      masteryScore: 4.8,
      passRate: 42,
      failedCount: 45,
      industryDemand: 'High',
      description: 'Tìm và sửa lỗi', 
      gioi: 15, kha: 25, tb: 35, yeu: 25,
      causes: { labFail: 40, homeworkIncomplete: 30, quizLow: 20, attendanceLow: 15 },
      trend: 'down', trendValue: -8
    },
    { 
      skill: 'Vòng lặp', 
      proficiency: 82, 
      masteryScore: 8.2,
      passRate: 91,
      failedCount: 7,
      industryDemand: 'High',
      description: 'Cấu trúc lặp', 
      gioi: 45, kha: 35, tb: 12, yeu: 8,
      causes: { labFail: 10, homeworkIncomplete: 5, quizLow: 5, attendanceLow: 2 },
      trend: 'up', trendValue: 12
    },
  ],
  'web-dev': [
    { 
      skill: 'ReactJS', 
      proficiency: 78, 
      masteryScore: 7.8,
      passRate: 78,
      failedCount: 18,
      industryDemand: 'High',
      description: 'Frontend library', 
      gioi: 35, kha: 30, tb: 20, yeu: 15,
      causes: { labFail: 20, homeworkIncomplete: 15, quizLow: 10, attendanceLow: 5 },
      trend: 'up', trendValue: 15
    },
    { 
      skill: 'Database Design', 
      proficiency: 65, 
      masteryScore: 6.5,
      passRate: 65,
      failedCount: 32,
      industryDemand: 'High',
      description: 'SQL & NoSQL', 
      gioi: 20, kha: 30, tb: 30, yeu: 20,
      causes: { labFail: 35, homeworkIncomplete: 25, quizLow: 15, attendanceLow: 10 },
      trend: 'down', trendValue: -5
    },
    { 
      skill: 'Git/GitHub', 
      proficiency: 91, 
      masteryScore: 9.1,
      passRate: 95,
      failedCount: 4,
      industryDemand: 'High',
      description: 'Version Control', 
      gioi: 60, kha: 25, tb: 10, yeu: 5,
      causes: { labFail: 5, homeworkIncomplete: 2, quizLow: 2, attendanceLow: 1 },
      trend: 'up', trendValue: 8
    },
  ]
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

const SkillsProficiencyChart = () => {
  const [selectedCourse, setSelectedCourse] = useState('intro-prog');
  const [selectedCohort, setSelectedCohort] = useState('2022-2026');
  const [viewType, setViewType] = useState('table'); // Default to table for clarity
  const [showTopSkills, setShowTopSkills] = useState(5);

  const skills = skillsData[selectedCourse] || skillsData['intro-prog'];
  const yearlyTrend = yearlyTrendData[selectedCourse] || yearlyTrendData['intro-prog'];
  
  // KPI Calculations
  const avgPassRate = Math.round(skills.reduce((acc, s) => acc + s.passRate, 0) / skills.length);
  const weakestSkill = [...skills].sort((a, b) => a.passRate - b.passRate)[0];
  const topGrowthSkill = [...skills].sort((a, b) => b.trendValue - a.trendValue)[0];

  return (
    <div className="card p-6 shadow-xl border-0 bg-white dark:bg-gray-900">
      {/* 🔷 1. HEADER & FILTERS */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-6">
        <div>
          <h3 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
            Tập kỹ năng & Mức độ thành thạo
          </h3>
          <p className="text-sm text-gray-500 mt-1">Hệ thống phân tích năng lực chuẩn đầu ra & nhu cầu doanh nghiệp</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
            {['table', 'trend'].map(type => (
              <button
                key={type}
                onClick={() => setViewType(type)}
                className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  viewType === type 
                    ? 'bg-white dark:bg-gray-700 text-blue-600 shadow-sm' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {type === 'table' ? 'Bảng năng lực' : 'Xu hướng'}
              </button>
            ))}
          </div>
          
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="px-3 py-1.5 bg-gray-50 dark:bg-gray-800 border-0 rounded-xl text-sm font-bold text-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-blue-500"
          >
            {courses.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>

          <select
            value={selectedCohort}
            onChange={(e) => setSelectedCohort(e.target.value)}
            className="px-3 py-1.5 bg-gray-50 dark:bg-gray-800 border-0 rounded-xl text-sm font-bold text-gray-700 dark:text-gray-200"
          >
            {COHORTS.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
          </select>

          <button className="p-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors">
            <Share2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* 🔥 2. TOP KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="p-5 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl text-white shadow-lg shadow-blue-200 dark:shadow-none">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-white/20 rounded-lg"><Target className="h-5 w-5" /></div>
            <span className="text-xs font-bold bg-white/20 px-2 py-1 rounded-full">Tổng quát</span>
          </div>
          <div className="text-3xl font-black mb-1">{avgPassRate}%</div>
          <div className="text-sm font-medium opacity-80">Độ bao phủ kỹ năng đạt chuẩn</div>
          <div className="mt-4 h-1.5 bg-white/20 rounded-full overflow-hidden">
            <div className="h-full bg-white" style={{ width: `${avgPassRate}%` }} />
          </div>
        </div>

        <div className="p-5 bg-white dark:bg-gray-800 rounded-3xl border border-red-100 dark:border-red-900/30 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10"><AlertCircle className="h-16 w-16 text-red-500" /></div>
          <div className="flex items-center gap-2 text-red-600 mb-3">
             <ArrowDownRight className="h-5 w-5" />
             <span className="text-xs font-black uppercase">Yếu nhất cần cải thiện</span>
          </div>
          <div className="text-xl font-black text-gray-900 dark:text-white mb-1">{weakestSkill.skill}</div>
          <div className="text-sm text-red-500 font-bold">Chỉ đạt {weakestSkill.passRate}% (Dưới chuẩn ⚠️)</div>
          <div className="mt-4 text-xs text-gray-400 font-medium italic">Nguyên nhân: {getMainCauses(weakestSkill.causes)[0].label}</div>
        </div>

        <div className="p-5 bg-white dark:bg-gray-800 rounded-3xl border border-green-100 dark:border-green-900/30 shadow-sm">
          <div className="flex items-center gap-2 text-green-600 mb-3">
             <ArrowUpRight className="h-5 w-5" />
             <span className="text-xs font-black uppercase">Cải thiện mạnh nhất</span>
          </div>
          <div className="text-xl font-black text-gray-900 dark:text-white mb-1">{topGrowthSkill.skill}</div>
          <div className="text-sm text-green-600 font-bold">Tăng trưởng +{topGrowthSkill.trendValue}% so với khóa trước</div>
          <div className="mt-4 flex items-center gap-2">
             <div className="flex -space-x-2">
                {[1,2,3].map(i => <div key={i} className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white dark:border-gray-800" />)}
             </div>
             <span className="text-[10px] text-gray-400 font-bold">+120 SV đạt mức Advanced</span>
          </div>
        </div>
      </div>

      {/* 📊 3. MAIN CONTENT (TABLE OR CHART) */}
      {viewType === 'table' ? (
        <div className="bg-gray-50/50 dark:bg-gray-800/20 rounded-3xl border border-gray-100 dark:border-gray-800 overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-800">
                <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase">Kỹ năng</th>
                <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase text-center">Tỷ lệ Đạt</th>
                <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase text-center">Thành thạo (0-10)</th>
                <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase">Nhu cầu DN</th>
                <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase text-right">Trạng thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
              {skills.map(skill => (
                <tr key={skill.skill} className="hover:bg-white dark:hover:bg-gray-800 transition-colors group">
                  <td className="px-6 py-5">
                    <div className="flex flex-col">
                      <span className="font-black text-gray-900 dark:text-white">{skill.skill}</span>
                      <span className="text-[10px] text-gray-400 font-medium">{skill.description}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col items-center gap-2">
                      <div className="flex items-center gap-2 w-32">
                        <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${skill.passRate > 80 ? 'bg-green-500' : skill.passRate > 60 ? 'bg-amber-500' : 'bg-red-500'}`}
                            style={{ width: `${skill.passRate}%` }}
                          />
                        </div>
                        <span className="text-xs font-black text-gray-700 dark:text-gray-300">{skill.passRate}%</span>
                      </div>
                      <span className="text-[10px] font-bold text-red-500/70">{skill.failedCount} SV chưa đạt</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                     <div className="flex flex-col items-center">
                        <span className="text-lg font-black text-gray-900 dark:text-white">{skill.masteryScore}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          skill.masteryScore >= 8 ? 'text-green-600 bg-green-50' : 
                          skill.masteryScore >= 6 ? 'text-blue-600 bg-blue-50' : 'text-red-600 bg-red-50'
                        }`}>
                          {skill.masteryScore >= 8 ? 'Advanced' : skill.masteryScore >= 6 ? 'Intermediate' : 'Beginner'}
                        </span>
                     </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase border ${
                      skill.industryDemand === 'High' ? 'border-red-200 text-red-600 bg-red-50' : 'border-gray-200 text-gray-500'
                    }`}>
                      {skill.industryDemand === 'High' ? '🔥 Cao' : 'Bình thường'}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex flex-col items-end">
                      <div className={`flex items-center gap-1 text-xs font-bold ${skill.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                        {skill.trend === 'up' ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                        {skill.trendValue}%
                      </div>
                      <span className="text-[10px] text-gray-400 mt-1">So với 2024</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="h-80 bg-gray-50/50 dark:bg-gray-800/20 rounded-3xl border border-gray-100 dark:border-gray-800 p-6">
           <ResponsiveContainer width="100%" height="100%">
             <LineChart data={yearlyTrend}>
               <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.1} />
               <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 'bold' }} />
               <YAxis axisLine={false} tickLine={false} domain={[0, 100]} tick={{ fontSize: 12 }} />
               <Tooltip contentStyle={{ borderRadius: 16, border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
               <Legend iconType="circle" />
               {Object.keys(yearlyTrend[0] || {}).filter(k => k !== 'year').map((key, i) => (
                 <Line key={key} type="monotone" dataKey={key} stroke={LINE_COLORS[i % LINE_COLORS.length]} strokeWidth={4} dot={{ r: 6, strokeWidth: 3 }} />
               ))}
             </LineChart>
           </ResponsiveContainer>
        </div>
      )}

      {/* 🎯 4. BOTTOM: ACTIONS & INSIGHTS */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-3xl border border-blue-100 dark:border-blue-800">
           <h4 className="flex items-center gap-2 text-blue-900 dark:text-blue-100 font-black mb-4">
             <Zap className="h-5 w-5 text-amber-500 fill-amber-500" /> Gợi ý hành động từ AI
           </h4>
           <div className="space-y-3">
              <div className="flex gap-3 text-sm">
                 <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-[10px] font-black flex-shrink-0 mt-0.5">1</div>
                 <p className="text-blue-800 dark:text-blue-200">Kỹ năng <strong>{weakestSkill.skill}</strong> đang lệch 40% so với nhu cầu doanh nghiệp. Cần bổ sung 15 tiết bài tập thực tế.</p>
              </div>
              <div className="flex gap-3 text-sm">
                 <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-[10px] font-black flex-shrink-0 mt-0.5">2</div>
                 <p className="text-blue-800 dark:text-blue-200">Có <strong>{weakestSkill.failedCount} sinh viên</strong> chưa đạt chuẩn kỹ năng nền tảng. Khuyến nghị tổ chức lớp phụ đạo tối thứ 6.</p>
              </div>
           </div>
        </div>

        <div className="flex flex-wrap gap-3 content-start">
           <button className="flex-1 min-w-[140px] px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl font-bold text-gray-700 dark:text-gray-200 flex items-center justify-center gap-2 hover:bg-gray-50 transition-all">
             <Users className="h-4 w-4" /> Xem SV chưa đạt
           </button>
           <button className="flex-1 min-w-[140px] px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl font-bold text-gray-700 dark:text-gray-200 flex items-center justify-center gap-2 hover:bg-gray-50 transition-all">
             <Activity className="h-4 w-4" /> So sánh khóa
           </button>
           <button className="flex-1 min-w-[140px] px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl font-bold text-gray-700 dark:text-gray-200 flex items-center justify-center gap-2 hover:bg-gray-50 transition-all">
             <FileText className="h-4 w-4" /> Xuất báo cáo
           </button>
           <button className="w-full px-4 py-4 bg-indigo-600 text-white rounded-2xl font-black shadow-lg shadow-indigo-200 dark:shadow-none flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all">
             <Zap className="h-5 w-5" /> Tự động lập kế hoạch cải thiện
           </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(SkillsProficiencyChart);