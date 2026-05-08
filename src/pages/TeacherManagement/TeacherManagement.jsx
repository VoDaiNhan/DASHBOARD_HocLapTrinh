import React, { useMemo, useState } from 'react';
import { 
  Plus, Eye, Edit, Trash2, Mail, Phone, Star, Search, X, 
  BookOpen, Users, Award, Briefcase, GraduationCap, 
  BarChart2, AlertTriangle, CheckCircle, History, Send, Download, FileText
} from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Legend
} from 'recharts';
import { mockDepartmentData, mockClassData } from '../../data/mockData';
import { coursePerformanceData, COURSE_NAMES } from '../../data/coursePerformanceData';

// ─── Mock data ────────────────────────────────────────────────────────────────
const COURSE_ASSIGNMENTS = {
  1: ['Nhập môn lập trình', 'Cấu trúc dữ liệu & GT'],
  2: ['Lập trình hướng đối tượng', 'Kĩ thuật lập trình'],
  3: ['Kĩ thuật lập trình', 'Cấu trúc dữ liệu & GT'],
  4: ['Nhập môn lập trình'],
  5: ['Lập trình hướng đối tượng', 'Cấu trúc dữ liệu & GT'],
  6: ['Lập trình hướng đối tượng', 'Kĩ thuật lập trình'],
  7: ['Cấu trúc dữ liệu & GT'],
  8: ['Nhập môn lập trình', 'Kĩ thuật lập trình'],
};

const HOMEROOM = { 1: '22CT111', 2: '22CT112', 3: '22CT113' };

// Lịch sử chủ nhiệm lớp (các khóa trước)
const HOMEROOM_HISTORY = {
  1: [
    { className: '20CT111', year: '2020-2024', avgScore: 7.8, completion: 85, status: 'Tốt' },
    { className: '21CT111', year: '2021-2025', avgScore: 7.5, completion: 80, status: 'Tốt' },
  ],
  2: [
    { className: '20CT112', year: '2020-2024', avgScore: 7.2, completion: 76, status: 'Trung bình' },
  ],
  3: [
    { className: '21CT113', year: '2021-2025', avgScore: 7.6, completion: 82, status: 'Tốt' },
  ],
};

// Mock: số buổi nghỉ không phép theo lớp (> 3 buổi = cảnh báo)
const ABSENT_MOCK = {
  '22CT111': { count: 4, total: 40 },
  '22CT112': { count: 2, total: 40 },
  '22CT113': { count: 7, total: 40 },
};

// Mock: học sinh chưa đăng ký thi lại (nguy cơ rớt môn)
const NO_RETAKE_MOCK = {
  '22CT111': 2,
  '22CT112': 0,
  '22CT113': 3,
};

// Giảng viên dạy môn nào ở lớp nào — so le, không cùng 2 môn 1 lớp
// Chỉ dùng 4 môn thực tế trong coursePerformanceData
const TEACHING_ASSIGNMENTS = {
  1: [
    { className: '22CT111', courseName: 'Nhập môn lập trình' },
    { className: '22CT112', courseName: 'Cấu trúc dữ liệu & GT' },
  ],
  2: [
    { className: '22CT112', courseName: 'Lập trình hướng đối tượng' },
    { className: '22CT113', courseName: 'Kĩ thuật lập trình' },
  ],
  3: [
    { className: '22CT111', courseName: 'Kĩ thuật lập trình' },
    { className: '22CT113', courseName: 'Cấu trúc dữ liệu & GT' },
  ],
  4: [
    { className: '22CT112', courseName: 'Nhập môn lập trình' },
  ],
  5: [
    { className: '22CT113', courseName: 'Lập trình hướng đối tượng' },
    { className: '22CT111', courseName: 'Cấu trúc dữ liệu & GT' },
  ],
  6: [
    { className: '22CT111', courseName: 'Lập trình hướng đối tượng' },
    { className: '22CT112', courseName: 'Kĩ thuật lập trình' },
  ],
  7: [
    { className: '22CT112', courseName: 'Cấu trúc dữ liệu & GT' },
  ],
  8: [
    { className: '22CT113', courseName: 'Nhập môn lập trình' },
    { className: '22CT111', courseName: 'Kĩ thuật lập trình' },
  ],
};

// Map tên hiển thị → key thực trong coursePerformanceData
const COURSE_NAME_MAP = {
  'Nhập môn lập trình':        'Nhập môn lập trình',
  'Kĩ thuật lập trình':        'Kỹ thuật lập trình',
  'Kỹ thuật lập trình':        'Kỹ thuật lập trình',
  'Cấu trúc dữ liệu & GT':     'Cấu trúc dữ liệu & GT',
  'Lập trình hướng đối tượng': 'Lập trình HĐT',
  'Lập trình HĐT':             'Lập trình HĐT',
};

// Tính completionRate trung bình của toàn lớp (tất cả môn) — đồng bộ với ClassSummaryTable
const getClassAvgCompletion = (className) => {
  const students = coursePerformanceData.students.filter((s) => s.className === className);
  if (!students.length) return 0;
  const rates = students.map((s) => {
    const vals = Object.values(s.courses);
    return vals.reduce((sum, c) => sum + c.completionRate, 0) / vals.length;
  });
  return Math.round(rates.reduce((a, b) => a + b, 0) / rates.length);
};

// Tính tỉ lệ kỹ năng nâng cao (>= 85%) theo lớp + môn cụ thể (thông tin tham khảo cho GV)
const getAdvancedRate = (className, courseName) => {
  const courseKey = COURSE_NAME_MAP[courseName];
  if (!courseKey) return 0;
  const students = coursePerformanceData.students.filter((s) => s.className === className);
  if (!students.length) return 0;
  const allVals = students.flatMap((s) => Object.values(s.courses[courseKey]?.skills || {}));
  if (!allVals.length) return 0;
  return Math.round(allVals.filter((v) => v >= 85).length / allVals.length * 100);
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
const getSubmissionColor = (rate) => {
  if (rate >= 80) return { bar: 'bg-green-500', text: 'text-green-600', label: 'Tốt' };
  if (rate >= 65) return { bar: 'bg-yellow-500', text: 'text-yellow-600', label: 'Trung bình' };
  return { bar: 'bg-red-500', text: 'text-red-600', label: 'Cần cải thiện' };
};

// Tính % học sinh yếu (điểm TB tổng < 5) trong lớp từ coursePerformanceData
const calcWeakStudents = (className) => {
  const students = coursePerformanceData.students.filter((s) => s.className === className);
  if (!students.length) return { weak: 0, total: 0, pct: 0 };
  const weak = students.filter((s) => {
    const vals = Object.values(s.courses);
    const avg = vals.reduce((sum, c) => sum + c.avgScore, 0) / vals.length;
    return avg < 5;
  }).length;
  return { weak, total: students.length, pct: Math.round((weak / students.length) * 100) };
};

// Thông tin chung lớp từ mockClassData
const getClassInfo = (className) => {
  const classes = mockClassData?.classes || [];
  const classItems = classes.filter((c) => c.name === className);
  if (!classItems.length) return null;
  const avgCompletion = Math.round(classItems.reduce((s, c) => s + (c.completionRate || 0), 0) / classItems.length);
  const avgScore = Math.round(classItems.reduce((s, c) => s + (c.averageScore || 0), 0) / classItems.length * 10) / 10;
  const totalStudents = coursePerformanceData.students.filter((s) => s.className === className).length;
  return { avgCompletion, avgScore, totalStudents, courseCount: classItems.length };
};

// ─── Lớp đang chủ nhiệm section ──────────────────────────────────────────────
const HomeroomSection = ({ className, teacherId }) => {
  const [showWeakModal, setShowWeakModal] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showProgressModal, setShowProgressModal] = useState(false);

  const info = getClassInfo(className);
  const { weak, total, pct } = calcWeakStudents(className);
  if (!info) return null;

  // Rủi ro lớp học
  const absent = ABSENT_MOCK[className] || { count: 0, total: 40 };
  const noRetake = NO_RETAKE_MOCK[className] || 0;
  const history = HOMEROOM_HISTORY[teacherId] || [];

  // Học sinh yếu chi tiết
  const weakStudents = coursePerformanceData.students
    .filter((s) => s.className === className)
    .map((s) => {
      const vals = Object.values(s.courses);
      const avg = vals.reduce((sum, c) => sum + c.avgScore, 0) / vals.length;
      return { ...s, avgScore: Math.round(avg * 10) / 10 };
    })
    .filter((s) => s.avgScore < 5)
    .sort((a, b) => a.avgScore - b.avgScore);

  const getRiskLabel = (score) => {
    if (score < 3.5) return { label: 'Nguy cơ cao', color: 'text-red-600', bg: 'bg-red-100 dark:bg-red-900/30', dot: 'bg-red-500' };
    if (score < 4.5) return { label: 'Trung bình', color: 'text-yellow-600', bg: 'bg-yellow-100 dark:bg-yellow-900/30', dot: 'bg-yellow-500' };
    return { label: 'Ổn định', color: 'text-green-600', bg: 'bg-green-100 dark:bg-green-900/30', dot: 'bg-green-500' };
  };

  // Tiến độ từng môn trong lớp
  const courseProgressList = Object.values(COURSE_NAMES).map((courseName) => {
    const students = coursePerformanceData.students.filter((s) => s.className === className);
    const rates = students.map((s) => s.courses[courseName]?.completionRate ?? 0);
    const avg = rates.length ? Math.round(rates.reduce((a, b) => a + b, 0) / rates.length) : 0;
    const plan = 85;
    return { courseName, avg, plan, diff: avg - plan };
  });

  const overallRisk = pct > 15 || absent.count > 5 ? 'high' : pct > 5 || absent.count > 3 ? 'medium' : 'low';
  const riskStyle = {
    high:   { label: 'Nguy cơ cao', color: 'text-red-600',    bg: 'bg-red-50 dark:bg-red-900/20',    border: 'border-red-200 dark:border-red-700' },
    medium: { label: 'Trung bình',  color: 'text-yellow-600', bg: 'bg-yellow-50 dark:bg-yellow-900/20', border: 'border-yellow-200 dark:border-yellow-700' },
    low:    { label: 'Ổn định',     color: 'text-green-600',  bg: 'bg-green-50 dark:bg-green-900/20',  border: 'border-green-200 dark:border-green-700' },
  }[overallRisk];

  return (
    <div>
      {/* Header với icon lịch sử */}
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
          <GraduationCap className="h-4 w-4 text-indigo-500" /> Lớp đang chủ nhiệm
        </h4>
        {history.length > 0 && (
          <button
            onClick={() => setShowHistory(!showHistory)}
            title="Lịch sử chủ nhiệm"
            className="flex items-center gap-1 px-2 py-1 text-xs text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/40 transition-colors"
          >
            <History className="h-3.5 w-3.5" />
            Lịch sử ({history.length})
          </button>
        )}
      </div>

      {/* Lịch sử chủ nhiệm dropdown */}
      {showHistory && history.length > 0 && (
        <div className="mb-3 border border-indigo-200 dark:border-indigo-700 rounded-xl p-3 bg-indigo-50/30 dark:bg-indigo-900/10 space-y-2">
          <p className="text-xs font-semibold text-indigo-700 dark:text-indigo-300 mb-2">Các lớp đã từng chủ nhiệm</p>
          {history.map((h) => (
            <div key={h.className} className="flex items-center justify-between bg-white dark:bg-gray-700/50 rounded-lg px-3 py-2">
              <div>
                <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">{h.className}</span>
                <span className="text-xs text-gray-400 ml-2">{h.year}</span>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className={`font-medium ${h.avgScore >= 7 ? 'text-green-600' : 'text-yellow-600'}`}>Điểm TB: {h.avgScore}</span>
                <span className={`font-medium ${h.completion >= 80 ? 'text-green-600' : 'text-yellow-600'}`}>Tiến độ: {h.completion}%</span>
                <span className={`px-2 py-0.5 rounded-full font-medium ${h.status === 'Tốt' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                  {h.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className={`border ${riskStyle.border} rounded-xl p-4 ${riskStyle.bg}`}>
        {/* Header lớp */}
        <div className="flex items-center justify-between mb-3">
          <span className="font-bold text-indigo-700 dark:text-indigo-300 text-base">{className}</span>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">{info.totalStudents} sinh viên · {info.courseCount} môn</span>
            <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${riskStyle.bg} ${riskStyle.color} border ${riskStyle.border}`}>
              {riskStyle.label}
            </span>
          </div>
        </div>

        {/* Thông tin chung — Tiến độ giảng dạy + Trạng thái học tập */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          {/* Card 1: Tiến độ giảng dạy (clickable) */}
          {(() => {
            const plan = 85; // kế hoạch 85%
            const diff = info.avgCompletion - plan;
            const diffLabel = diff >= 0 ? `đúng tiến độ` : `chậm ${Math.abs(diff)}%`;
            const diffColor = diff >= 0 ? 'text-green-600' : 'text-red-500';
            return (
              <button
                onClick={() => setShowProgressModal(true)}
                className="bg-white dark:bg-gray-700/50 rounded-lg p-3 text-center hover:shadow-md transition-shadow cursor-pointer w-full"
              >
                <p className="text-xs text-gray-400 mb-1">Tiến độ giảng dạy</p>
                <p className={`text-lg font-bold ${info.avgCompletion >= 80 ? 'text-green-600' : info.avgCompletion >= 65 ? 'text-yellow-600' : 'text-red-600'}`}>
                  {info.avgCompletion}%
                </p>
                <p className={`text-xs font-medium mt-0.5 ${diffColor}`}>
                  {diff >= 0 ? '✓' : '↓'} {diffLabel}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">Kế hoạch: {plan}%</p>
              </button>
            );
          })()}

          {/* Card 2: Trạng thái học tập */}
          {(() => {
            const isGood   = info.avgScore >= 8 && pct <= 5;
            const isBad    = info.avgScore < 6.5 || pct > 20;
            const status   = isGood ? 'Tốt' : isBad ? 'Kém' : 'Trung bình';
            const statusColor = isGood ? 'text-green-600' : isBad ? 'text-red-600' : 'text-yellow-600';
            const statusBg    = isGood ? 'bg-green-100 dark:bg-green-900/30' : isBad ? 'bg-red-100 dark:bg-red-900/30' : 'bg-yellow-100 dark:bg-yellow-900/30';
            const emoji = isGood ? '🟢' : isBad ? '🔴' : '🟡';
            // Trend so với lịch sử (nếu có)
            const prevHistory = HOMEROOM_HISTORY[teacherId];
            const prevScore = prevHistory?.length ? prevHistory[prevHistory.length - 1].avgScore : null;
            const trend = prevScore !== null ? (info.avgScore > prevScore ? '↑' : info.avgScore < prevScore ? '↓' : '→') : null;
            return (
              <div className="bg-white dark:bg-gray-700/50 rounded-lg p-3 text-center">
                <p className="text-xs text-gray-400 mb-1">Trạng thái học tập</p>
                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-bold ${statusBg} ${statusColor}`}>
                  {emoji} {status} {trend && <span className="text-xs">{trend}</span>}
                </span>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1.5">
                  TB: {info.avgScore} · {weak}/{total} SV yếu
                </p>
              </div>
            );
          })()}
        </div>

        {/* ── Rủi ro lớp học ── */}
        <div className="bg-white dark:bg-gray-700/50 rounded-xl p-3 space-y-3">
          <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-1">
            <AlertTriangle className="h-3.5 w-3.5 text-orange-400" /> Rủi ro lớp học
          </p>

          {/* 1. Học sinh yếu */}
          <div
            className="flex items-center justify-between cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-600/30 rounded-lg px-2 py-1.5 transition-colors"
            onClick={() => setShowWeakModal(true)}
          >
            <span className="text-xs text-gray-600 dark:text-gray-400">Học sinh yếu (điểm TB &lt; 5)</span>
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
              pct > 15 ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
              : pct > 5 ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
              : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
            }`}>
              {weak}/{total} · {pct > 15 ? 'Nguy cơ cao' : pct > 5 ? 'Trung bình' : 'Ổn định'}
            </span>
          </div>

          {/* 2. Nghỉ học nhiều */}
          <div className="flex items-center justify-between px-2 py-1.5">
            <span className="text-xs text-gray-600 dark:text-gray-400">Nghỉ &gt; 3 buổi không phép</span>
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
              absent.count > 5 ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
              : absent.count > 2 ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
              : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
            }`}>
              {absent.count} SV · {absent.count > 5 ? 'Nguy cơ cao' : absent.count > 2 ? 'Trung bình' : 'Ổn định'}
            </span>
          </div>
        </div>
      </div>

      {/* Modal tiến độ giảng dạy từng môn */}
      {showProgressModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[60] p-4" onClick={() => setShowProgressModal(false)}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg max-h-[80vh] flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white">Tiến độ giảng dạy — {className}</h3>
                <p className="text-xs text-gray-500 mt-0.5">So sánh với kế hoạch (85%)</p>
              </div>
              <button onClick={() => setShowProgressModal(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {courseProgressList.map(({ courseName, avg, plan, diff }) => (
                <div key={courseName} className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{courseName}</span>
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-bold ${avg >= 80 ? 'text-green-600' : avg >= 65 ? 'text-yellow-600' : 'text-red-600'}`}>{avg}%</span>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${diff >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {diff >= 0 ? `+${diff}%` : `${diff}%`}
                      </span>
                    </div>
                  </div>
                  <div className="relative w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                    <div className={`h-2.5 rounded-full transition-all ${avg >= 80 ? 'bg-green-500' : avg >= 65 ? 'bg-yellow-500' : 'bg-red-500'}`}
                      style={{ width: `${avg}%` }} />
                    {/* Marker kế hoạch */}
                    <div className="absolute top-0 h-2.5 w-0.5 bg-gray-500 dark:bg-gray-300"
                      style={{ left: `${plan}%` }} title={`Kế hoạch: ${plan}%`} />
                  </div>
                  <p className="text-xs text-gray-400">Kế hoạch: {plan}% · {diff >= 0 ? 'Đúng tiến độ' : `Chậm ${Math.abs(diff)}%`}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Modal học sinh yếu + nguy cơ rớt môn */}
      {showWeakModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[60] p-4" onClick={() => setShowWeakModal(false)}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg max-h-[80vh] flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white">Học sinh yếu — {className}</h3>
                <p className="text-xs text-gray-500 mt-0.5">{weakStudents.length} học sinh có điểm TB &lt; 5</p>
              </div>
              <button onClick={() => setShowWeakModal(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
              {weakStudents.length === 0 ? (
                <p className="text-center text-gray-400 py-8">Không có học sinh yếu</p>
              ) : weakStudents.map((s) => {
                const risk = getRiskLabel(s.avgScore);
                const hasNoRetake = noRetake > 0;
                return (
                  <div key={s.id} className={`border rounded-xl p-4 ${risk.bg} border-opacity-50`}>
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white text-sm">{s.name}</p>
                        <p className="text-xs text-gray-500">{s.studentId}</p>
                      </div>
                      <div className="text-right">
                        <p className={`text-lg font-bold ${risk.color}`}>{s.avgScore}</p>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${risk.bg} ${risk.color}`}>
                          {risk.label}
                        </span>
                      </div>
                    </div>
                    {/* Nguy cơ rớt môn */}
                    {s.avgScore < 4.5 && (
                      <div className={`mt-2 flex items-center gap-2 px-3 py-2 rounded-lg ${hasNoRetake ? 'bg-red-100 dark:bg-red-900/30' : 'bg-green-100 dark:bg-green-900/30'}`}>
                        <AlertTriangle className={`h-3.5 w-3.5 flex-shrink-0 ${hasNoRetake ? 'text-red-600' : 'text-green-600'}`} />
                        <p className={`text-xs font-medium ${hasNoRetake ? 'text-red-700 dark:text-red-400' : 'text-green-700 dark:text-green-400'}`}>
                          {hasNoRetake ? 'Nguy cơ rớt môn — Chưa đăng ký thi lại' : 'Đã đăng ký thi lại'}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── Các lớp đang giảng dạy section ──────────────────────────────────────────
const TeachingClassesSection = ({ teacherId }) => {
  const assignments = TEACHING_ASSIGNMENTS[teacherId] || [];

  return (
    <div>
      <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
        <BarChart2 className="h-4 w-4 text-blue-500" /> Các lớp đang giảng dạy
      </h4>
      {assignments.length === 0 ? (
        <p className="text-xs text-gray-400 dark:text-gray-500 italic">Hiện tại đang không có lớp giảng dạy.</p>
      ) : (
        <div className="space-y-3">
          {assignments.map(({ className, courseName }) => {
            const basicRate = getClassAvgCompletion(className);
            const advRate   = getAdvancedRate(className, courseName);
            const { bar, text, label } = getSubmissionColor(basicRate);
            return (
              <div key={`${className}-${courseName}`} className="border border-gray-200 dark:border-gray-700 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <span className="font-semibold text-gray-800 dark:text-gray-200 text-sm">{className}</span>
                    <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">· {courseName}</span>
                  </div>
                  <span className={`text-xs font-semibold ${text}`}>{label}</span>
                </div>

                {/* Tiến độ TB lớp — đồng bộ với bảng quản lý lớp */}
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xs text-gray-400 w-28 flex-shrink-0">Tiến độ TB lớp</span>
                  <div className="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                    <div className={`${bar} h-2 rounded-full transition-all`} style={{ width: `${basicRate}%` }} />
                  </div>
                  <span className={`text-xs font-bold ${text} w-10 text-right`}>{basicRate}%</span>
                </div>

                {/* Tỉ lệ nâng cao (thông tin tham khảo cho GV) */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400 w-28 flex-shrink-0">Kỹ năng nâng cao</span>
                  <div className="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-1.5">
                    <div className="bg-purple-400 h-1.5 rounded-full transition-all" style={{ width: `${advRate}%` }} />
                  </div>
                  <span className="text-xs font-semibold text-purple-600 dark:text-purple-400 w-10 text-right">{advRate}%</span>
                </div>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1.5 italic">
                  * Nâng cao: sinh viên tự tìm hiểu thêm từ ngân hàng bài tập nâng cao
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

// ─── Teacher profile modal ────────────────────────────────────────────────────
const TeacherProfile = ({ teacher, onClose }) => {
  if (!teacher) return null;
  const courses = COURSE_ASSIGNMENTS[teacher.id] || [];
  const homeroom = HOMEROOM[teacher.id] || null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-2xl shadow-lg">
              {teacher.name.split(' ').pop().charAt(0)}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">{teacher.name}</h2>
              <div className="flex items-center gap-2 mt-0.5">
                <p className="text-blue-100 text-sm">{teacher.position}</p>
                <span className="w-1 h-1 bg-white/30 rounded-full"></span>
                <p className="text-blue-100 text-xs italic">ID: GV-{teacher.id.toString().padStart(3, '0')}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => onShowToast(`Đã xuất báo cáo năng lực cho giảng viên ${teacher.name}`)}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-colors text-white" title="Xuất báo cáo PDF">
              <Download className="h-5 w-5" />
            </button>
            <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-xl transition-colors">
              <X className="h-6 w-6 text-white" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
          {/* Contact */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-700/40 rounded-xl p-4">
              <Mail className="h-5 w-5 text-blue-500 flex-shrink-0" />
              <div>
                <p className="text-xs text-gray-400">Email</p>
                <p className="text-sm font-medium text-gray-800 dark:text-gray-200 break-all">{teacher.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-700/40 rounded-xl p-4">
              <Phone className="h-5 w-5 text-green-500 flex-shrink-0" />
              <div>
                <p className="text-xs text-gray-400">Điện thoại</p>
                <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{teacher.phone}</p>
              </div>
            </div>
          </div>

          {/* Chức vụ */}
          <div className="flex items-center gap-3 bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4">
            <Briefcase className="h-5 w-5 text-purple-500 flex-shrink-0" />
            <div>
              <p className="text-xs text-gray-400">Chức vụ</p>
              <p className="text-sm font-semibold text-purple-700 dark:text-purple-300">{teacher.position}</p>
            </div>
          </div>

          {/* Môn phụ trách */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-blue-500" /> Môn phụ trách
            </h4>
            <div className="flex flex-wrap gap-2">
              {courses.map((c) => (
                <span key={c} className="px-3 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-sm rounded-full font-medium">
                  {c}
                </span>
              ))}
            </div>
          </div>

          {/* Lớp đang chủ nhiệm */}
          {homeroom && <HomeroomSection className={homeroom} teacherId={teacher.id} />}

          {/* Các lớp đang giảng dạy */}
          <TeachingClassesSection teacherId={teacher.id} />

          {/* Hiệu suất & Đánh giá năng lực */}
          <div className="bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
            <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <BarChart2 className="h-4 w-4 text-blue-500" /> Phân tích hiệu suất & Năng lực
            </h4>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Line Chart: Student GPA Trend */}
              <div>
                <p className="text-xs font-semibold text-gray-500 mb-4 uppercase tracking-wider">Xu hướng điểm TB sinh viên (4 Học kỳ)</p>
                <div className="h-48 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={[
                      { name: 'HK1-23', score: 7.2 },
                      { name: 'HK2-23', score: 7.5 },
                      { name: 'HK1-24', score: 7.4 },
                      { name: 'HK2-24', score: 7.8 },
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.1} />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                      <YAxis axisLine={false} tickLine={false} domain={[0, 10]} hide />
                      <RechartsTooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                      <Line type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, fill: '#3b82f6' }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Radar Chart: Competency */}
              <div>
                <p className="text-xs font-semibold text-gray-500 mb-4 uppercase tracking-wider">Đánh giá năng lực giảng dạy</p>
                <div className="h-48 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="70%" data={[
                      { subject: 'Chuyên môn', A: 90 },
                      { subject: 'Sư phạm', A: 85 },
                      { subject: 'Hỗ trợ SV', A: 95 },
                      { subject: 'Nghiên cứu', A: 75 },
                      { subject: 'Công nghệ', A: 80 },
                    ]}>
                      <PolarGrid strokeOpacity={0.1} />
                      <PolarAngleAxis dataKey="subject" tick={{fontSize: 10}} />
                      <Radar name="Năng lực" dataKey="A" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.5} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-gray-100 dark:border-gray-800 pt-4">
              <div className="flex items-center gap-6">
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">Đánh giá chung</span>
                  <span className="text-xl font-black text-yellow-500">{teacher.averageRating} / 5.0</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">Xếp hạng khoa</span>
                  <span className="text-xl font-black text-blue-600">Top 5%</span>
                </div>
              </div>
              <button 
                onClick={() => onShowToast(`Đã gửi thông báo nhắc nhở cập nhật học liệu cho giảng viên ${teacher.name}`)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 rounded-xl text-xs font-bold hover:bg-blue-100 transition-all">
                <Send className="h-3.5 w-3.5" /> Gửi nhắc nhở
              </button>
            </div>
          </div>

          {/* Học vấn */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Học vấn</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700/40 rounded-xl p-4">{teacher.education}</p>
          </div>

          {/* Nghiên cứu */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
              <Award className="h-4 w-4 text-green-500" /> Nghiên cứu & Hướng dẫn
            </h4>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">{teacher.projects}</p>
                <p className="text-xs text-gray-500 mt-1">Dự án nghiên cứu</p>
              </div>
              <div className="bg-teal-50 dark:bg-teal-900/20 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-teal-600 dark:text-teal-400">{teacher.publications}</p>
                <p className="text-xs text-gray-500 mt-1">Bài báo khoa học</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {(teacher.researchAreas || []).map((area) => (
                <span key={area} className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs rounded-full">
                  {area}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Main component ───────────────────────────────────────────────────────────
const TeacherManagement = () => {
  const [filterSpecialization, setFilterSpecialization] = useState('all');
  const [searchName, setSearchName] = useState('');
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  const [toast, setToast] = useState(null);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const teachers = useMemo(
    () => (mockDepartmentData?.teachers || []).map((t) => ({
      ...t,
      courses: COURSE_ASSIGNMENTS[t.id] || [],
      homeroomClass: HOMEROOM[t.id] || null,
    })),
    []
  );

  // Tất cả môn học từ COURSE_ASSIGNMENTS
  const allCourses = useMemo(() => {
    const set = new Set();
    Object.values(COURSE_ASSIGNMENTS).forEach((arr) => arr.forEach((c) => set.add(c)));
    return Array.from(set).sort();
  }, []);

  const filtered = useMemo(() => {
    return teachers.filter((t) => {
      const matchSearch = !searchName || t.name.toLowerCase().includes(searchName.toLowerCase());
      const matchSpec = filterSpecialization === 'all' || t.courses.includes(filterSpecialization);
      
      let matchTab = true;
      if (activeTab === 'teaching') matchTab = (TEACHING_ASSIGNMENTS[t.id] || []).length > 0;
      if (activeTab === 'research') matchTab = t.projects > 5 || t.publications > 15;
      if (activeTab === 'homeroom') matchTab = !!HOMEROOM[t.id];
      
      return matchSearch && matchSpec && matchTab;
    });
  }, [teachers, searchName, filterSpecialization, activeTab]);

  const getPositionColor = (pos) => {
    switch (pos) {
      case 'Trưởng khoa':      return 'text-purple-700 bg-purple-100 dark:bg-purple-900/30 dark:text-purple-300';
      case 'Phó trưởng khoa':  return 'text-blue-700 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300';
      case 'Giảng viên chính': return 'text-indigo-700 bg-indigo-100 dark:bg-indigo-900/30 dark:text-indigo-300';
      default:                 return 'text-green-700 bg-green-100 dark:bg-green-900/30 dark:text-green-300';
    }
  };

  return (
    <div className="p-4 text-sm">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Quản Lý Giảng Viên</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Quản lý thông tin và hoạt động của đội ngũ giảng viên trong khoa</p>
      </div>

      {/* Filters & Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 mb-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <div className="flex bg-gray-100 dark:bg-gray-700/50 p-1 rounded-xl w-fit">
            {[
              { id: 'all', label: 'Tất cả', icon: Users },
              { id: 'teaching', label: 'Khối Giảng dạy', icon: BookOpen },
              { id: 'research', label: 'Khối Nghiên cứu', icon: Award },
              { id: 'homeroom', label: 'Cố vấn học tập', icon: GraduationCap },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  activeTab === tab.id 
                    ? 'bg-white dark:bg-gray-600 text-blue-600 shadow-sm' 
                    : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                <tab.icon className="h-3.5 w-3.5" />
                {tab.label}
              </button>
            ))}
          </div>

          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 text-sm font-medium">
            <Plus className="h-4 w-4" />
            Thêm Giảng Viên
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-3 border-t border-gray-50 dark:border-gray-700 pt-4">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              placeholder="Tìm theo tên giảng viên..."
              className="w-full pl-9 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={filterSpecialization}
            onChange={(e) => setFilterSpecialization(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 min-w-[220px]"
          >
            <option value="all">Tất cả chuyên môn</option>
            {allCourses.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700/50">
                {['Giảng Viên', 'Lớp chủ nhiệm', 'Môn phụ trách', 'Hoạt động gần nhất', 'Nghiên cứu / Hướng dẫn', 'Đánh giá', 'Thao tác'].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {filtered.map((teacher) => (
                <tr
                  key={teacher.id}
                  className="hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-colors cursor-pointer"
                  onClick={() => setSelectedTeacher(teacher)}
                >
                  {/* Giảng viên */}
                  <td className="px-4 py-3 align-middle">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                        {teacher.name.split(' ').pop().charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">{teacher.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{teacher.email}</p>
                        <span className={`inline-block mt-0.5 px-2 py-0.5 text-xs font-medium rounded-full ${getPositionColor(teacher.position)}`}>
                          {teacher.position}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Lớp chủ nhiệm */}
                  <td className="px-4 py-3 align-middle text-center">
                    {teacher.homeroomClass
                      ? <span className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-xs font-semibold rounded-full">{teacher.homeroomClass}</span>
                      : <span className="text-gray-400 text-xs">—</span>}
                  </td>

                  {/* Môn phụ trách */}
                  <td className="px-4 py-3 align-middle">
                    <div className="flex flex-wrap gap-1">
                      {(TEACHING_ASSIGNMENTS[teacher.id] || []).map(({ className, courseName }) => (
                        <span key={`${className}-${courseName}`} className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-full">
                          {courseName} <span className="text-blue-400">({className})</span>
                        </span>
                      ))}
                    </div>
                  </td>

                  {/* Hoạt động gần nhất */}
                  <td className="px-4 py-3 align-middle text-xs text-gray-600 dark:text-gray-400">
                    {['2 ngày trước','1 ngày trước','5 giờ trước','3 ngày trước','8 giờ trước','hôm qua','4 giờ trước','2 giờ trước'][teacher.id - 1] || '—'}
                  </td>

                  {/* Nghiên cứu */}
                  <td className="px-4 py-3 align-middle">
                    <p className="text-xs text-gray-800 dark:text-gray-200 font-medium">{teacher.projects} dự án</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{teacher.publications} bài báo</p>
                  </td>

                  {/* Đánh giá */}
                  <td className="px-4 py-3 align-middle">
                    <div className="flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400" />
                      <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">{teacher.averageRating}</span>
                    </div>
                  </td>

                  {/* Thao tác */}
                  <td className="px-4 py-3 align-middle" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center gap-1">
                      <button 
                        onClick={() => setSelectedTeacher(teacher)} 
                        className="p-1.5 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors" title="Xem chi tiết">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => showToast(`Mở cửa sổ chat với giảng viên ${teacher.name}`)}
                        className="p-1.5 text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors" title="Gửi tin nhắn">
                        <Mail className="h-4 w-4" />
                      </button>
                      <button className="p-1.5 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors" title="Chỉnh sửa">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors" title="Xóa">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-gray-400 dark:text-gray-500">
                    Không tìm thấy giảng viên nào
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Profile modal */}
      {selectedTeacher && (
        <TeacherProfile teacher={selectedTeacher} onClose={() => setSelectedTeacher(null)} onShowToast={showToast} />
      )}

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 bg-gray-900 text-white rounded-full text-sm font-bold flex items-center gap-3 shadow-2xl animate-in slide-in-from-bottom-8">
          <CheckCircle className="h-5 w-5 text-green-400" />
          {toast}
        </div>
      )}
    </div>
  );
};

export default TeacherManagement;
