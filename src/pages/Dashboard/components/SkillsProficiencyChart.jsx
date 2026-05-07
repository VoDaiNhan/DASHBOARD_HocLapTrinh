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
  AlertCircle,
  ArrowRight,
  X,
  Search,
  Download,
  Mail,
  ExternalLink,
  Plus
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
    { skill: 'Hàm cơ bản', proficiency: 92, masteryScore: 9.2, passRate: 92, failedCount: 8, industryDemand: 'High', description: 'Định nghĩa và gọi hàm', gioi: 65, kha: 25, tb: 6, yeu: 4, causes: { labFail: 5, homeworkIncomplete: 2, quizLow: 2, attendanceLow: 1 }, trend: 'up', trendValue: 5 },
    { skill: 'Vòng lặp', proficiency: 88, masteryScore: 8.8, passRate: 90, failedCount: 10, industryDemand: 'High', description: 'For, while loops', gioi: 55, kha: 30, tb: 10, yeu: 5, causes: { labFail: 8, homeworkIncomplete: 4, quizLow: 3, attendanceLow: 2 }, trend: 'up', trendValue: 10 },
    { skill: 'Mảng 1 chiều', proficiency: 85, masteryScore: 8.5, passRate: 88, failedCount: 12, industryDemand: 'High', description: 'Array basics', gioi: 45, kha: 35, tb: 15, yeu: 5, causes: { labFail: 10, homeworkIncomplete: 5, quizLow: 5, attendanceLow: 2 }, trend: 'up', trendValue: 4 },
    { skill: 'Kiểu dữ liệu', proficiency: 90, masteryScore: 9.0, passRate: 91, failedCount: 9, industryDemand: 'Medium', description: 'Data types', gioi: 60, kha: 25, tb: 10, yeu: 5, causes: { labFail: 5, homeworkIncomplete: 2, quizLow: 2, attendanceLow: 1 }, trend: 'stable', trendValue: 0 },
    { skill: 'Debug cơ bản', proficiency: 82, masteryScore: 8.2, passRate: 89, failedCount: 11, industryDemand: 'High', description: 'Tìm lỗi', gioi: 40, kha: 35, tb: 15, yeu: 10, causes: { labFail: 15, homeworkIncomplete: 10, quizLow: 10, attendanceLow: 5 }, trend: 'up', trendValue: 6 }
  ],
  'prog-technique': [
    { skill: 'Con trỏ (Pointer)', proficiency: 52, masteryScore: 5.2, passRate: 48, failedCount: 52, industryDemand: 'High', description: 'Memory management', gioi: 10, kha: 20, tb: 40, yeu: 30, causes: { labFail: 50, homeworkIncomplete: 35, quizLow: 25, attendanceLow: 15 }, trend: 'down', trendValue: -15 },
    { skill: 'Đệ quy (Recursion)', proficiency: 55, masteryScore: 5.5, passRate: 52, failedCount: 48, industryDemand: 'High', description: 'Self-calling functions', gioi: 15, kha: 25, tb: 35, yeu: 25, causes: { labFail: 45, homeworkIncomplete: 30, quizLow: 20, attendanceLow: 15 }, trend: 'down', trendValue: -10 },
    { skill: 'File I/O', proficiency: 60, masteryScore: 6.0, passRate: 50, failedCount: 50, industryDemand: 'Medium', description: 'Read/Write files', gioi: 20, kha: 30, tb: 30, yeu: 20, causes: { labFail: 35, homeworkIncomplete: 25, quizLow: 20, attendanceLow: 10 }, trend: 'stable', trendValue: 0 },
    { skill: 'Cấu trúc (Struct)', proficiency: 48, masteryScore: 4.8, passRate: 49, failedCount: 51, industryDemand: 'Medium', description: 'Custom data types', gioi: 10, kha: 20, tb: 40, yeu: 30, causes: { labFail: 55, homeworkIncomplete: 40, quizLow: 30, attendanceLow: 20 }, trend: 'down', trendValue: -5 },
    { skill: 'Phân tích thuật toán', proficiency: 54, masteryScore: 5.4, passRate: 51, failedCount: 49, industryDemand: 'High', description: 'Complexity basics', gioi: 15, kha: 25, tb: 35, yeu: 25, causes: { labFail: 40, homeworkIncomplete: 30, quizLow: 25, attendanceLow: 15 }, trend: 'up', trendValue: 2 }
  ],
  'oop': [
    { skill: 'Tính đóng gói', proficiency: 42, masteryScore: 4.2, passRate: 30, failedCount: 70, industryDemand: 'High', description: 'Encapsulation', gioi: 5, kha: 15, tb: 40, yeu: 40, causes: { labFail: 60, homeworkIncomplete: 45, quizLow: 35, attendanceLow: 25 }, trend: 'down', trendValue: -20 },
    { skill: 'Tính đa hình', proficiency: 38, masteryScore: 3.8, passRate: 28, failedCount: 72, industryDemand: 'High', description: 'Polymorphism', gioi: 3, kha: 10, tb: 37, yeu: 50, causes: { labFail: 70, homeworkIncomplete: 50, quizLow: 40, attendanceLow: 30 }, trend: 'down', trendValue: -25 },
    { skill: 'Tính kế thừa', proficiency: 45, masteryScore: 4.5, passRate: 32, failedCount: 68, industryDemand: 'High', description: 'Inheritance', gioi: 5, kha: 15, tb: 45, yeu: 35, causes: { labFail: 65, homeworkIncomplete: 40, quizLow: 35, attendanceLow: 25 }, trend: 'down', trendValue: -15 },
    { skill: 'Tính trừu tượng', proficiency: 40, masteryScore: 4.0, passRate: 30, failedCount: 70, industryDemand: 'Medium', description: 'Abstraction', gioi: 5, kha: 12, tb: 43, yeu: 40, causes: { labFail: 60, homeworkIncomplete: 45, quizLow: 40, attendanceLow: 25 }, trend: 'stable', trendValue: 0 },
    { skill: 'Interface', proficiency: 35, masteryScore: 3.5, passRate: 30, failedCount: 70, industryDemand: 'High', description: 'Contracts', gioi: 2, kha: 8, tb: 40, yeu: 50, causes: { labFail: 75, homeworkIncomplete: 55, quizLow: 45, attendanceLow: 35 }, trend: 'down', trendValue: -10 }
  ],
  'web-dev': [
    { skill: 'React Hooks', proficiency: 78, masteryScore: 7.8, passRate: 78, failedCount: 18, industryDemand: 'High', description: 'State mgmt', gioi: 35, kha: 30, tb: 20, yeu: 15, causes: { labFail: 20, homeworkIncomplete: 15, quizLow: 10, attendanceLow: 5 }, trend: 'up', trendValue: 15 },
    { skill: 'Database Design', proficiency: 65, masteryScore: 6.5, passRate: 65, failedCount: 32, industryDemand: 'High', description: 'ER Modeling', gioi: 20, kha: 30, tb: 30, yeu: 20, causes: { labFail: 35, homeworkIncomplete: 25, quizLow: 15, attendanceLow: 10 }, trend: 'down', trendValue: -5 },
    { skill: 'Authentication', proficiency: 60, masteryScore: 6.0, passRate: 55, failedCount: 36, industryDemand: 'High', description: 'JWT/Sessions', gioi: 15, kha: 25, tb: 40, yeu: 20, causes: { labFail: 40, homeworkIncomplete: 30, quizLow: 20, attendanceLow: 12 }, trend: 'stable', trendValue: 0 },
    { skill: 'CSS Layout', proficiency: 85, masteryScore: 8.5, passRate: 90, failedCount: 8, industryDemand: 'Medium', description: 'Grid & Flex', gioi: 50, kha: 35, tb: 10, yeu: 5, causes: { labFail: 10, homeworkIncomplete: 5, quizLow: 5, attendanceLow: 2 }, trend: 'up', trendValue: 10 },
    { skill: 'Deployment', proficiency: 50, masteryScore: 5.0, passRate: 45, failedCount: 44, industryDemand: 'High', description: 'CI/CD & Cloud', gioi: 10, kha: 20, tb: 40, yeu: 30, causes: { labFail: 50, homeworkIncomplete: 35, quizLow: 25, attendanceLow: 15 }, trend: 'down', trendValue: -15 }
  ],
  'mobile-dev': [
    { skill: 'React Native UI', proficiency: 82, masteryScore: 8.2, passRate: 85, failedCount: 12, industryDemand: 'High', description: 'Mobile views', gioi: 40, kha: 35, tb: 15, yeu: 10, causes: { labFail: 15, homeworkIncomplete: 10, quizLow: 10, attendanceLow: 5 }, trend: 'up', trendValue: 10 },
    { skill: 'Redux Store', proficiency: 55, masteryScore: 5.5, passRate: 48, failedCount: 42, industryDemand: 'Medium', description: 'Global state', gioi: 15, kha: 25, tb: 35, yeu: 25, causes: { labFail: 40, homeworkIncomplete: 30, quizLow: 25, attendanceLow: 15 }, trend: 'down', trendValue: -7 },
    { skill: 'Navigation', proficiency: 75, masteryScore: 7.5, passRate: 80, failedCount: 16, industryDemand: 'High', description: 'Stack/Tabs', gioi: 35, kha: 35, tb: 20, yeu: 10, causes: { labFail: 20, homeworkIncomplete: 10, quizLow: 10, attendanceLow: 5 }, trend: 'up', trendValue: 5 },
    { skill: 'Push Notif', proficiency: 45, masteryScore: 4.5, passRate: 35, failedCount: 52, industryDemand: 'High', description: 'FCM/OneSignal', gioi: 5, kha: 15, tb: 45, yeu: 35, causes: { labFail: 60, homeworkIncomplete: 40, quizLow: 30, attendanceLow: 20 }, trend: 'down', trendValue: -18 },
    { skill: 'Camera API', proficiency: 68, masteryScore: 6.8, passRate: 70, failedCount: 24, industryDemand: 'Medium', description: 'Media access', gioi: 25, kha: 35, tb: 30, yeu: 10, causes: { labFail: 30, homeworkIncomplete: 20, quizLow: 15, attendanceLow: 8 }, trend: 'stable', trendValue: 0 }
  ]
};

// Xu hướng theo năm (cho line chart)
const yearlyTrendData = {
  'intro-prog': [
    { year: '2022', 'Hàm cơ bản': 85, 'Vòng lặp': 78, 'Mảng 1 chiều': 80, 'Kiểu dữ liệu': 88, 'Debug cơ bản': 75 },
    { year: '2023', 'Hàm cơ bản': 88, 'Vòng lặp': 82, 'Mảng 1 chiều': 83, 'Kiểu dữ liệu': 89, 'Debug cơ bản': 80 },
    { year: '2024', 'Hàm cơ bản': 90, 'Vòng lặp': 86, 'Mảng 1 chiều': 85, 'Kiểu dữ liệu': 90, 'Debug cơ bản': 85 },
    { year: '2025', 'Hàm cơ bản': 92, 'Vòng lặp': 90, 'Mảng 1 chiều': 88, 'Kiểu dữ liệu': 91, 'Debug cơ bản': 89 },
  ],
  'prog-technique': [
    { year: '2022', 'Con trỏ (Pointer)': 65, 'Đệ quy (Recursion)': 60, 'File I/O': 55, 'Cấu trúc (Struct)': 58, 'Phân tích thuật toán': 45 },
    { year: '2023', 'Con trỏ (Pointer)': 60, 'Đệ quy (Recursion)': 58, 'File I/O': 55, 'Cấu trúc (Struct)': 55, 'Phân tích thuật toán': 48 },
    { year: '2024', 'Con trỏ (Pointer)': 55, 'Đệ quy (Recursion)': 55, 'File I/O': 55, 'Cấu trúc (Struct)': 52, 'Phân tích thuật toán': 50 },
    { year: '2025', 'Con trỏ (Pointer)': 48, 'Đệ quy (Recursion)': 52, 'File I/O': 50, 'Cấu trúc (Struct)': 49, 'Phân tích thuật toán': 51 },
  ],
  'oop': [
    { year: '2022', 'Tính đóng gói': 50, 'Tính đa hình': 45, 'Tính kế thừa': 48, 'Tính trừu tượng': 42, 'Interface': 40 },
    { year: '2023', 'Tính đóng gói': 45, 'Tính đa hình': 40, 'Tính kế thừa': 42, 'Tính trừu tượng': 38, 'Interface': 35 },
    { year: '2024', 'Tính đóng gói': 40, 'Tính đa hình': 35, 'Tính kế thừa': 38, 'Tính trừu tượng': 35, 'Interface': 32 },
    { year: '2025', 'Tính đóng gói': 35, 'Tính đa hình': 28, 'Tính kế thừa': 32, 'Tính trừu tượng': 30, 'Interface': 30 },
  ],
  'web-dev': [
    { year: '2022', 'React Hooks': 65, 'Database Design': 75, 'Authentication': 60, 'CSS Layout': 80, 'Deployment': 55 },
    { year: '2023', 'React Hooks': 70, 'Database Design': 72, 'Authentication': 58, 'CSS Layout': 82, 'Deployment': 52 },
    { year: '2024', 'React Hooks': 75, 'Database Design': 68, 'Authentication': 55, 'CSS Layout': 85, 'Deployment': 48 },
    { year: '2025', 'React Hooks': 78, 'Database Design': 65, 'Authentication': 55, 'CSS Layout': 90, 'Deployment': 45 },
  ],
  'mobile-dev': [
    { year: '2022', 'React Native UI': 70, 'Redux Store': 65, 'Navigation': 75, 'Push Notif': 55, 'Camera API': 72 },
    { year: '2023', 'React Native UI': 75, 'Redux Store': 62, 'Navigation': 78, 'Push Notif': 50, 'Camera API': 70 },
    { year: '2024', 'React Native UI': 78, 'Redux Store': 58, 'Navigation': 80, 'Push Notif': 45, 'Camera API': 68 },
    { year: '2025', 'React Native UI': 82, 'Redux Store': 55, 'Navigation': 80, 'Push Notif': 35, 'Camera API': 70 },
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
  const [viewType, setViewType] = useState('table'); 
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [toast, setToast] = useState(null);
  const [activePlan, setActivePlan] = useState([]);

  const skills = skillsData[selectedCourse] || skillsData['intro-prog'];
  const yearlyTrend = yearlyTrendData[selectedCourse] || yearlyTrendData['intro-prog'];

  // Mock student generator for "SV chưa đạt"
  const failedStudents = useMemo(() => {
    return Array.from({ length: 15 }, (_, i) => ({
      id: `${22 + i}CT${String(100 + i).padStart(3, '0')}`,
      name: ['Nguyễn Văn An', 'Trần Thị Bình', 'Lê Văn Cường', 'Phạm Minh Đức', 'Hoàng Thu Hà'][i % 5],
      class: '22CT111',
      score: (Math.random() * 4 + 3).toFixed(1), // 3.0 - 7.0
      lastActive: '2 ngày trước'
    })).sort((a, b) => a.score - b.score);
  }, [selectedCourse]);

  const handleExportCSV = () => {
    const csvContent = [
      ['Báo cáo năng lực kỹ năng - ' + courses.find(c => c.id === selectedCourse)?.name],
      ['Kỹ năng', 'Tỷ lệ đạt (%)', 'Điểm thành thạo', 'Nhu cầu DN', 'Xu hướng (%)'],
      ...skills.map(s => [s.skill, s.passRate, s.masteryScore, s.industryDemand, s.trendValue])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `bao-cao-nang-luc-${selectedCourse}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setToast('Đã xuất báo cáo thành công!');
    setTimeout(() => setToast(null), 3000);
  };
  
  // KPI Calculations
  const avgPassRate = Math.round(skills.reduce((acc, s) => acc + s.passRate, 0) / skills.length);
  const weakestSkill = [...skills].sort((a, b) => a.passRate - b.passRate)[0];
  const topGrowthSkill = [...skills].sort((a, b) => b.trendValue - a.trendValue)[0];

  return (
    <div className="card p-4 shadow-xl border-0 bg-white dark:bg-gray-900">
      {/* 🔷 1. HEADER & FILTERS */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4 gap-4">
        <div>
          <h3 className="text-xl font-black text-gray-900 dark:text-white tracking-tight">
            Tập kỹ năng & Mức độ thành thạo
          </h3>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
            {[
              { id: 'table', label: 'Bảng năng lực' },
              { id: 'trend', label: 'Xu hướng' },
              { id: 'radar', label: 'So sánh (Radar)' }
            ].map(type => (
              <button
                key={type.id}
                onClick={() => setViewType(type.id)}
                className={`px-4 py-1.5 text-[10px] font-black rounded-lg transition-all ${
                  viewType === type.id 
                    ? 'bg-white dark:bg-gray-700 text-blue-600 shadow-sm' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {type.label}
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="p-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl text-white shadow-lg shadow-blue-200 dark:shadow-none">
          <div className="flex items-center justify-between mb-2">
            <div className="p-1.5 bg-white/20 rounded-lg"><Target className="h-4 w-4" /></div>
            <span className="text-[10px] font-bold bg-white/20 px-2 py-0.5 rounded-full uppercase tracking-wider">Tổng quát</span>
          </div>
          <div className="text-2xl font-black mb-0.5">{avgPassRate}%</div>
          <div className="text-[11px] font-medium opacity-80">Độ bao phủ kỹ năng đạt chuẩn</div>
          <div className="mt-3 h-1 bg-white/20 rounded-full overflow-hidden">
            <div className="h-full bg-white" style={{ width: `${avgPassRate}%` }} />
          </div>
        </div>

        <div className="p-4 bg-white dark:bg-gray-800 rounded-2xl border border-red-100 dark:border-red-900/30 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-3 opacity-10"><AlertCircle className="h-12 w-12 text-red-500" /></div>
          <div className="flex items-center gap-2 text-red-600 mb-2">
             <ArrowDownRight className="h-4 w-4" />
             <span className="text-[10px] font-black uppercase tracking-wider">Yếu nhất</span>
          </div>
          <div className="text-lg font-black text-gray-900 dark:text-white mb-0.5">{weakestSkill.skill}</div>
          <div className="text-[11px] text-red-500 font-bold">
            Đạt {weakestSkill.passRate}% {weakestSkill.passRate < 75 && '(Dưới chuẩn ⚠️)'}
          </div>
        </div>

        <div className="p-4 bg-white dark:bg-gray-800 rounded-2xl border border-green-100 dark:border-green-900/30 shadow-sm">
          <div className="flex items-center gap-2 text-green-600 mb-2">
             <ArrowUpRight className="h-4 w-4" />
             <span className="text-[10px] font-black uppercase tracking-wider">Cải thiện nhất</span>
          </div>
          <div className="text-lg font-black text-gray-900 dark:text-white mb-0.5">{topGrowthSkill.skill}</div>
          <div className="text-[11px] text-green-600 font-bold">Tăng trưởng +{topGrowthSkill.trendValue}%</div>
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
                  <td className="px-6 py-2.5">
                    <div className="flex flex-col">
                      <span className="font-bold text-sm text-gray-900 dark:text-white">{skill.skill}</span>
                      <span className="text-[10px] text-gray-400 font-medium">{skill.description}</span>
                    </div>
                  </td>
                  <td className="px-6 py-2.5">
                    <div className="flex flex-col items-center gap-1">
                      <div className="flex items-center gap-2 w-28">
                        <div className="flex-1 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${skill.passRate >= 75 ? 'bg-green-500' : skill.passRate >= 50 ? 'bg-amber-500' : 'bg-red-500'}`}
                            style={{ width: `${skill.passRate}%` }}
                          />
                        </div>
                        <span className="text-[10px] font-black text-gray-700 dark:text-gray-300">{skill.passRate}%</span>
                      </div>
                      <span className="text-[9px] font-bold text-red-500/70 leading-none">{skill.failedCount} SV chưa đạt</span>
                    </div>
                  </td>
                  <td className="px-6 py-2.5 text-center">
                     <div className="flex flex-col items-center">
                        <span className="text-sm font-black text-gray-900 dark:text-white">{skill.masteryScore}</span>
                        <span className={`text-[9px] font-bold px-1.5 py-0 rounded ${
                          skill.masteryScore >= 8 ? 'text-green-600 bg-green-50' : 
                          skill.masteryScore >= 6 ? 'text-blue-600 bg-blue-50' : 'text-red-600 bg-red-50'
                        }`}>
                          {skill.masteryScore >= 8 ? 'Adv' : skill.masteryScore >= 6 ? 'Int' : 'Beg'}
                        </span>
                     </div>
                  </td>
                  <td className="px-6 py-2.5">
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase border ${
                      skill.industryDemand === 'High' ? 'border-red-200 text-red-600 bg-red-50' : 'border-gray-200 text-gray-500'
                    }`}>
                      {skill.industryDemand === 'High' ? '🔥 Cao' : 'Bình thường'}
                    </span>
                  </td>
                  <td className="px-6 py-2.5 text-right">
                    <div className="flex flex-col items-end">
                      <div className={`flex items-center gap-1 text-[10px] font-bold ${skill.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                        {skill.trendValue}%
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : viewType === 'trend' ? (
        <div className="h-80 bg-gray-50/50 dark:bg-gray-800/20 rounded-3xl border border-gray-100 dark:border-gray-800 p-6">
           <ResponsiveContainer width="100%" height="100%">
             <LineChart data={yearlyTrend}>
               <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#94a3b8" strokeOpacity={0.4} />
               <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 500, fill: '#64748b' }} dy={10} />
               <YAxis axisLine={false} tickLine={false} domain={[0, 100]} tick={{ fontSize: 12, fill: '#64748b' }} />
               <Tooltip contentStyle={{ borderRadius: 16, border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
               <Legend iconType="circle" />
               {Object.keys(yearlyTrend[0] || {}).filter(k => k !== 'year').map((key, i) => (
                 <Line key={key} type="monotone" dataKey={key} stroke={LINE_COLORS[i % LINE_COLORS.length]} strokeWidth={4} dot={{ r: 6, strokeWidth: 3 }} />
               ))}
             </LineChart>
           </ResponsiveContainer>
        </div>
      ) : (
        <div className="h-80 bg-gray-50/50 dark:bg-gray-800/20 rounded-3xl border border-gray-100 dark:border-gray-800 p-6 flex items-center justify-center">
           <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skills}>
                <PolarGrid stroke="#94a3b8" strokeOpacity={0.3} />
                <PolarAngleAxis dataKey="skill" tick={{ fill: '#64748b', fontSize: 10, fontWeight: 600 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#94a3b8', fontSize: 8 }} axisLine={false} />
                <Radar
                  name="Tỷ lệ đạt (%)"
                  dataKey="passRate"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.5}
                />
                <Radar
                  name="Thành thạo (x10)"
                  dataKey={(d) => d.masteryScore * 10}
                  stroke="#8b5cf6"
                  fill="#8b5cf6"
                  fillOpacity={0.3}
                />
                <Tooltip contentStyle={{ borderRadius: 16, border: 'none' }} />
                <Legend iconType="diamond" />
              </RadarChart>
           </ResponsiveContainer>
        </div>
      )}


      {/* 🎯 4. BOTTOM: ACTIONS & INSIGHTS */}
      <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div 
          onClick={() => {
            setShowPlanModal(true);
            setToast('Đã khởi tạo kế hoạch cải thiện dựa trên gợi ý AI');
            setTimeout(() => setToast(null), 3000);
          }}
          className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-800 cursor-pointer hover:border-blue-300 transition-all group"
        >
           <h4 className="flex items-center gap-2 text-blue-900 dark:text-blue-100 font-black mb-2 text-sm">
             <Zap className="h-4 w-4 text-amber-500 fill-amber-500" /> Gợi ý AI (Click để áp dụng)
           </h4>
           <div className="space-y-1.5">
              <div className="flex gap-2 text-[11px] leading-snug">
                 <div className="w-4 h-4 rounded-full bg-blue-500 text-white flex items-center justify-center text-[9px] font-black flex-shrink-0 mt-0.5">1</div>
                 <p className="text-blue-800 dark:text-blue-200"><strong>{weakestSkill.skill}</strong> lệch 40% nhu cầu DN. Cần tăng 15 tiết bài tập.</p>
                 <ArrowRight className="h-3 w-3 text-blue-400 opacity-0 group-hover:opacity-100 transition-all" />
              </div>
           </div>
        </div>


        <div className="flex flex-wrap gap-2 content-start">
           <button 
            onClick={() => setShowStudentModal(true)}
            className="flex-1 min-w-[120px] px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl font-bold text-[11px] text-gray-700 dark:text-gray-200 flex items-center justify-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">
             <Users className="h-3 w-3" /> SV chưa đạt
           </button>
           <button 
            onClick={() => setViewType('radar')}
            className={`flex-1 min-w-[120px] px-3 py-2 border rounded-xl font-bold text-[11px] flex items-center justify-center gap-2 transition-all ${
              viewType === 'radar' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50'
            }`}>
             <Activity className="h-3 w-3" /> So sánh (Radar)
           </button>

           <button 
            onClick={handleExportCSV}
            className="flex-1 min-w-[120px] px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl font-bold text-[11px] text-gray-700 dark:text-gray-200 flex items-center justify-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">
             <FileText className="h-3 w-3" /> Báo cáo
           </button>
           <button 
            onClick={() => setShowPlanModal(true)}
            className="w-full px-3 py-2 bg-indigo-600 text-white rounded-xl font-black text-xs shadow-lg shadow-indigo-200 dark:shadow-none flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all">
             <Zap className="h-4 w-4" /> Lập kế hoạch cải thiện
           </button>
        </div>
      </div>

      {/* 🟢 MODAL: DANH SÁCH SV CHƯA ĐẠT */}
      {showStudentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-900 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl border border-gray-100 dark:border-gray-800 animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-gray-50 dark:border-gray-800 flex justify-between items-center bg-gray-50/50 dark:bg-gray-800/50">
              <div>
                <h4 className="text-lg font-black text-gray-900 dark:text-white">Sinh viên chưa đạt chuẩn</h4>
                <p className="text-xs text-gray-500 font-medium">Môn: {courses.find(c => c.id === selectedCourse)?.name} • Ngưỡng chuẩn 75%</p>
              </div>
              <button onClick={() => setShowStudentModal(false)} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors">
                <X className="h-5 w-5 text-gray-400" />
              </button>
            </div>
            
            <div className="p-4">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Tìm tên, mã số sinh viên..."
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-100 dark:bg-gray-800 border-0 rounded-2xl text-sm focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="max-h-[400px] overflow-y-auto pr-2 space-y-2">
                {failedStudents.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase())).map(student => (
                  <div key={student.id} className="p-3 bg-gray-50 dark:bg-gray-800/40 rounded-2xl flex items-center justify-between border border-transparent hover:border-red-100 dark:hover:border-red-900/30 transition-all">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center font-black text-red-600 text-xs">
                        {student.name.split(' ').pop()?.[0]}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-gray-900 dark:text-white">{student.name}</div>
                        <div className="text-[10px] text-gray-400 font-medium">{student.id} • Lớp {student.class}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-black text-red-600">{student.score}đ</div>
                      <div className="text-[9px] text-gray-400 font-bold uppercase tracking-tighter">Cần hỗ trợ ⚠️</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="p-4 bg-gray-50 dark:bg-gray-800/50 flex gap-3">
              <button className="flex-1 py-2.5 bg-blue-600 text-white rounded-2xl font-black text-xs hover:bg-blue-700 flex items-center justify-center gap-2">
                <Mail className="h-3.5 w-3.5" /> Gửi thông báo hỗ trợ học tập
              </button>
            </div>
          </div>
        </div>
      )}



      {/* 🟣 MODAL: LẬP KẾ HOẠCH CẢI THIỆN (Interactive Action Center) */}
      {showPlanModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-900 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in slide-in-from-bottom-8 duration-300">
            <div className="p-6 border-b border-gray-50 dark:border-gray-800 flex justify-between items-center bg-indigo-600">
              <div className="flex items-center gap-3">
                <Zap className="h-6 w-6 text-white fill-white" />
                <h4 className="text-lg font-black text-white uppercase tracking-wider">Trung tâm hành động AI</h4>
              </div>
              <button onClick={() => setShowPlanModal(false)} className="p-2 hover:bg-white/10 rounded-full">
                <X className="h-5 w-5 text-white" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="mb-6">
                <h5 className="text-sm font-black text-gray-900 dark:text-white mb-2">Lộ trình cải thiện môn: {courses.find(c => c.id === selectedCourse)?.name}</h5>
                <p className="text-xs text-gray-500 font-medium">AI đã tự động lập danh sách 5 nhiệm vụ khẩn cấp để kéo tỷ lệ đạt lên chuẩn 75%.</p>
              </div>

              <div className="space-y-3">
                {[
                  { id: 1, title: `Phụ đạo chuyên sâu: ${weakestSkill.skill}`, type: 'Lịch trình', icon: '📅', detail: 'Tổ chức 2 buổi phụ đạo vào T4, T6 cho 15 SV yếu.' },
                  { id: 2, title: `Kho bài tập thích nghi (Adaptive)`, type: 'Bài tập', icon: '📝', detail: 'Giao 10 bài tập mức độ Dễ - Trung bình để SV lấy lại gốc.' },
                  { id: 3, title: `Gửi Mail/Zalo nhắc nhở tự động`, type: 'Liên lạc', icon: '✉️', detail: 'Cảnh báo rủi ro học vụ cho các SV vắng quá 20%.' },
                  { id: 4, title: `Review code trực tuyến (1-1)`, type: 'Hỗ trợ', icon: '💻', detail: 'Mời các SV giỏi hỗ trợ nhóm SV yếu thông qua Discord.' }
                ].map(action => (
                  <label key={action.id} className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-transparent hover:border-indigo-200 transition-all cursor-pointer group">
                    <div className="mt-1">
                      <input type="checkbox" className="w-5 h-5 rounded-lg border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer" defaultChecked />
                    </div>
                    <div className="flex-1">
                       <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-black text-gray-900 dark:text-white">{action.icon} {action.title}</span>
                          <span className="text-[10px] font-bold px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded-full">{action.type}</span>
                       </div>
                       <p className="text-xs text-gray-500">{action.detail}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="p-6 bg-gray-50 dark:bg-gray-800/50 flex gap-4">
               <button 
                onClick={() => setShowPlanModal(false)}
                className="flex-1 py-3.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 rounded-2xl font-black text-sm hover:bg-gray-100 transition-all">
                 Lưu bản nháp
               </button>
               <button 
                onClick={() => {
                  setShowPlanModal(false);
                  setToast('Đã kích hoạt lộ trình cải thiện & Gửi nhiệm vụ cho Giảng viên');
                  setTimeout(() => setToast(null), 3000);
                }}
                className="flex-2 py-3.5 bg-indigo-600 text-white rounded-2xl font-black text-sm hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200">
                 Kích hoạt lộ trình ngay 🚀
               </button>
            </div>
          </div>
        </div>
      )}


      {/* 🚀 TOAST NOTIFICATION */}
      {toast && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 bg-gray-900 text-white rounded-full text-sm font-bold flex items-center gap-3 shadow-2xl animate-in slide-in-from-bottom-8">
          <CheckCircle2 className="h-5 w-5 text-green-400" />
          {toast}
        </div>
      )}
    </div>
  );
};

export default React.memo(SkillsProficiencyChart);