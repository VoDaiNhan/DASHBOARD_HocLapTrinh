import React, { useState, useMemo } from 'react';
import { Search, Users, BookOpen, TrendingUp, Award, HelpCircle, X, ChevronUp, ChevronDown, ArrowUpDown, GraduationCap, BarChart2 } from 'lucide-react';
import { coursePerformanceData, COURSE_NAMES } from '../../../data/coursePerformanceData';

// ─── Helpers ─────────────────────────────────────────────────────────────────
const calcProficiency = (skills) => {
  const values = Object.values(skills || {});
  if (!values.length) return { basic: 0, advanced: 0 };
  return {
    basic:    Math.round(values.filter((v) => v >= 70).length / values.length * 100),
    advanced: Math.round(values.filter((v) => v >= 85).length / values.length * 100),
  };
};

// ─── Tooltip ─────────────────────────────────────────────────────────────────
const InfoTooltip = ({ text }) => {
  const [show, setShow] = useState(false);
  return (
    <div className="relative inline-block">
      <button onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}
        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
        <HelpCircle className="h-3.5 w-3.5" />
      </button>
      {show && (
        <div className="absolute z-50 bottom-full right-0 mb-2 w-72 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded-lg px-3 py-2 shadow-xl leading-relaxed whitespace-pre-line">
          {text}
          <div className="absolute top-full right-3 border-4 border-transparent border-t-gray-900 dark:border-t-gray-700" />
        </div>
      )}
    </div>
  );
};

// ─── Summary card ─────────────────────────────────────────────────────────────
const SummaryCard = ({ label, value, icon: Icon, color, bg, tooltip }) => (
  <div className={`${bg} rounded-lg p-4 relative`}>
    <div className="absolute top-2 right-2"><InfoTooltip text={tooltip} /></div>
    <div className="flex items-center gap-2 mb-1">
      <Icon className={`h-4 w-4 ${color} flex-shrink-0`} />
      <p className="text-xs text-gray-500 dark:text-gray-400 pr-4">{label}</p>
    </div>
    <p className={`text-2xl font-bold ${color}`}>{value}</p>
  </div>
);

// ─── Progress bar ─────────────────────────────────────────────────────────────
const ProficiencyBar = ({ basic, advanced, size = 'sm' }) => {
  const h = size === 'lg' ? 'h-2.5' : 'h-1.5';
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <div className="flex items-center gap-2">
        <span className={`text-xs text-gray-400 flex-shrink-0 ${size === 'lg' ? 'w-20' : 'w-16'}`}>Bình thường</span>
        <div className={`flex-1 bg-gray-200 dark:bg-gray-600 rounded-full ${h}`}>
          <div className={`bg-blue-500 ${h} rounded-full transition-all`} style={{ width: `${basic}%` }} />
        </div>
        <span className={`text-xs font-semibold text-blue-600 ${size === 'lg' ? 'w-10' : 'w-8'} text-right`}>{basic}%</span>
      </div>
      <div className="flex items-center gap-2">
        <span className={`text-xs text-gray-400 flex-shrink-0 ${size === 'lg' ? 'w-20' : 'w-16'}`}>Nâng cao</span>
        <div className={`flex-1 bg-gray-200 dark:bg-gray-600 rounded-full ${h}`}>
          <div className={`bg-purple-500 ${h} rounded-full transition-all`} style={{ width: `${advanced}%` }} />
        </div>
        <span className={`text-xs font-semibold text-purple-600 ${size === 'lg' ? 'w-10' : 'w-8'} text-right`}>{advanced}%</span>
      </div>
    </div>
  );
};

const LevelBadge = ({ advanced }) => {
  if (advanced >= 60) return <span className="px-2 py-0.5 text-xs rounded-full bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 font-medium">Nâng cao</span>;
  if (advanced >= 30) return <span className="px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 font-medium">Khá</span>;
  return <span className="px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 font-medium">Cơ bản</span>;
};

const ScoreColor = (score) =>
  score >= 8 ? 'text-green-600 dark:text-green-400'
  : score >= 6.5 ? 'text-blue-600 dark:text-blue-400'
  : score >= 5 ? 'text-yellow-600 dark:text-yellow-400'
  : 'text-red-600 dark:text-red-400';

// ─── Student detail page/modal ────────────────────────────────────────────────
const StudentDetail = ({ student, onClose }) => {
  if (!student) return null;
  const courseEntries = Object.entries(student.courses || {});
  const avgScore = courseEntries.reduce((s, [, c]) => s + c.avgScore, 0) / courseEntries.length;
  const avgCompletion = courseEntries.reduce((s, [, c]) => s + c.completionRate, 0) / courseEntries.length;
  const allProf = (() => {
    const allSkills = {};
    courseEntries.forEach(([, cd]) => {
      Object.entries(cd.skills || {}).forEach(([k, v]) => {
        allSkills[k] = allSkills[k] ? Math.round((allSkills[k] + v) / 2) : v;
      });
    });
    return calcProficiency(allSkills);
  })();

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[92vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-2xl shadow-lg">
              {student.name.split(' ').pop().charAt(0)}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">{student.name}</h2>
              <p className="text-blue-100 text-sm mt-0.5">{student.studentId} · Lớp {student.className}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-xl transition-colors">
            <X className="h-6 w-6 text-white" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
          {/* KPI row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { icon: GraduationCap, label: 'Mã sinh viên', value: student.studentId, color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/20' },
              { icon: Users,         label: 'Lớp',          value: student.className,  color: 'text-indigo-600', bg: 'bg-indigo-50 dark:bg-indigo-900/20' },
              { icon: BarChart2,     label: 'Điểm TB',      value: `${avgScore.toFixed(1)} / 10`, color: 'text-green-600', bg: 'bg-green-50 dark:bg-green-900/20' },
              { icon: TrendingUp,    label: 'Tiến độ TB',   value: `${Math.round(avgCompletion)}%`, color: 'text-orange-600', bg: 'bg-orange-50 dark:bg-orange-900/20' },
            ].map(({ icon: Icon, label, value, color, bg }) => (
              <div key={label} className={`${bg} rounded-xl p-4 flex items-center gap-3`}>
                <Icon className={`h-6 w-6 ${color} flex-shrink-0`} />
                <div>
                  <p className="text-xs text-gray-400 dark:text-gray-500">{label}</p>
                  <p className={`text-lg font-bold ${color}`}>{value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Overall proficiency */}
          <div className="bg-gray-50 dark:bg-gray-700/40 rounded-xl p-5">
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Tổng hợp thành thạo (tất cả môn)</h4>
            <ProficiencyBar basic={allProf.basic} advanced={allProf.advanced} size="lg" />
          </div>

          {/* Per-course results */}
          <div>
            <h4 className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-4">Kết quả từng môn học</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {courseEntries.map(([courseName, data]) => {
                const prof = calcProficiency(data.skills);
                const skillEntries = Object.entries(data.skills || {});
                return (
                  <div key={courseName} className="border border-gray-200 dark:border-gray-700 rounded-xl p-5 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 leading-tight max-w-[180px]">{courseName}</p>
                      <div className="text-right flex-shrink-0 ml-2">
                        <span className={`text-xl font-bold ${ScoreColor(data.avgScore)}`}>{data.avgScore.toFixed(1)}</span>
                        <span className="text-xs text-gray-400 ml-1">· {data.completionRate}%</span>
                      </div>
                    </div>
                    <ProficiencyBar basic={prof.basic} advanced={prof.advanced} size="lg" />
                    {/* Skill breakdown */}
                    <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
                      <p className="text-xs text-gray-400 mb-2">Chi tiết kỹ năng</p>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                        {skillEntries.map(([skill, val]) => (
                          <div key={skill} className="flex items-center justify-between">
                            <span className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[100px]">{skill}</span>
                            <span className={`text-xs font-semibold ml-1 flex-shrink-0 ${val >= 85 ? 'text-purple-600' : val >= 70 ? 'text-blue-600' : val >= 50 ? 'text-yellow-600' : 'text-red-500'}`}>
                              {val}%
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Column sort header ───────────────────────────────────────────────────────
// cycle: null → 'asc' → 'desc' → null
const ColHeader = ({ label, field, sortConfig, onSort, className: cls = '' }) => {
  const active = sortConfig.key === field;
  const dir = active ? sortConfig.dir : null;
  return (
    <th
      onClick={() => onSort(field)}
      className={`px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer select-none hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${cls}`}
    >
      <div className="flex items-center gap-1">
        {label}
        {!active && <ArrowUpDown className="h-3 w-3 text-gray-300" />}
        {active && dir === 'asc'  && <ChevronUp   className="h-3 w-3 text-blue-600" />}
        {active && dir === 'desc' && <ChevronDown  className="h-3 w-3 text-blue-600" />}
      </div>
    </th>
  );
};

// ─── Main component ───────────────────────────────────────────────────────────
const CARDS_META = [
  {
    key: 'avgBasic',
    label: 'Thành thạo bình thường',
    icon: BookOpen,
    color: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    tooltip: 'Tỉ lệ % kỹ năng đạt mức bình thường (≥ 70%) trung bình toàn lớp.\n\nCách tính: Với mỗi sinh viên, đếm số kỹ năng ≥ 70 / tổng kỹ năng → lấy trung bình toàn lớp.\n\nÝ nghĩa: Sinh viên hoàn thành được các bài tập cơ bản.',
    fmt: (v) => `${v}%`,
  },
  {
    key: 'avgAdvanced',
    label: 'Thành thạo nâng cao',
    icon: Award,
    color: 'text-purple-600 dark:text-purple-400',
    bg: 'bg-purple-50 dark:bg-purple-900/20',
    tooltip: 'Tỉ lệ % kỹ năng đạt mức nâng cao (≥ 85%) trung bình toàn lớp.\n\nCách tính: Với mỗi sinh viên, đếm số kỹ năng ≥ 85 / tổng kỹ năng → lấy trung bình toàn lớp.\n\nÝ nghĩa: Sinh viên hoàn thành được bài tập khó và vận dụng sáng tạo.',
    fmt: (v) => `${v}%`,
  },
  {
    key: 'avgScore',
    label: 'Điểm TB',
    icon: TrendingUp,
    color: 'text-green-600 dark:text-green-400',
    bg: 'bg-green-50 dark:bg-green-900/20',
    tooltip: 'Điểm trung bình toàn lớp (thang 10).\n\nCách tính: Trung bình điểm avgScore của tất cả sinh viên trong lớp, được tính từ điểm trung bình các kỹ năng của môn đó.',
    fmt: (v) => v,
  },
  {
    key: 'avgCompletion',
    label: 'Tiến độ TB',
    icon: Users,
    color: 'text-orange-600 dark:text-orange-400',
    bg: 'bg-orange-50 dark:bg-orange-900/20',
    tooltip: 'Tỉ lệ % hoàn thành bài tập trung bình toàn lớp.\n\nCách tính: Trung bình completionRate của tất cả sinh viên với môn đang chọn.\n\n100% = đã hoàn thành tất cả bài tập được giao.',
    fmt: (v) => `${v}%`,
  },
];

const ClassStudentTable = ({ className }) => {
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [search, setSearch] = useState('');
  // sortConfig: { key, dir } — dir: 'asc' | 'desc' | null
  const [sortConfig, setSortConfig] = useState({ key: 'name', dir: 'asc' });
  const [selectedStudent, setSelectedStudent] = useState(null);

  const courseOptions = [
    { id: 'all', name: 'Tất cả môn học' },
    ...Object.values(COURSE_NAMES).map((name) => ({ id: name, name })),
  ];

  const students = useMemo(
    () => coursePerformanceData.students.filter((s) => s.className === className),
    [className]
  );

  const tableData = useMemo(() => {
    return students.map((student) => {
      if (selectedCourse === 'all') {
        const allSkills = {};
        Object.values(student.courses).forEach((cd) => {
          Object.entries(cd.skills || {}).forEach(([k, v]) => {
            allSkills[k] = allSkills[k] ? Math.round((allSkills[k] + v) / 2) : v;
          });
        });
        const prof = calcProficiency(allSkills);
        const vals = Object.values(student.courses);
        return {
          ...student,
          avgScore: Math.round(vals.reduce((s, c) => s + c.avgScore, 0) / vals.length * 10) / 10,
          completionRate: Math.round(vals.reduce((s, c) => s + c.completionRate, 0) / vals.length),
          ...prof,
        };
      }
      const cd = student.courses[selectedCourse];
      if (!cd) return null;
      return { ...student, avgScore: cd.avgScore, completionRate: cd.completionRate, ...calcProficiency(cd.skills) };
    }).filter(Boolean);
  }, [students, selectedCourse]);

  const searched = useMemo(() => {
    if (!search) return tableData;
    const q = search.toLowerCase();
    return tableData.filter((s) => s.name.toLowerCase().includes(q) || s.studentId.toLowerCase().includes(q));
  }, [tableData, search]);

  const handleSort = (field) => {
    setSortConfig((prev) => {
      if (prev.key !== field) return { key: field, dir: 'asc' };
      if (prev.dir === 'asc')  return { key: field, dir: 'desc' };
      if (prev.dir === 'desc') return { key: 'name', dir: 'asc' }; // reset → default A-Z
      return { key: field, dir: 'asc' };
    });
  };

  const sorted = useMemo(() => {
    const { key, dir } = sortConfig;
    if (!key || !dir) return searched;
    return [...searched].sort((a, b) => {
      let av = a[key], bv = b[key];
      if (key === 'name') {
        av = a.name.split(' ').pop();
        bv = b.name.split(' ').pop();
      }
      if (typeof av === 'string') return dir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av);
      return dir === 'asc' ? av - bv : bv - av;
    });
  }, [searched, sortConfig]);

  const summary = useMemo(() => {
    if (!tableData.length) return { avgBasic: 0, avgAdvanced: 0, avgScore: 0, avgCompletion: 0 };
    return {
      avgBasic:      Math.round(tableData.reduce((s, r) => s + r.basic, 0) / tableData.length),
      avgAdvanced:   Math.round(tableData.reduce((s, r) => s + r.advanced, 0) / tableData.length),
      avgScore:      Math.round(tableData.reduce((s, r) => s + r.avgScore, 0) / tableData.length * 10) / 10,
      avgCompletion: Math.round(tableData.reduce((s, r) => s + r.completionRate, 0) / tableData.length),
    };
  }, [tableData]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-900 dark:text-white">
              Lớp {className} — Tỉ lệ thành thạo kỹ năng
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{students.length} sinh viên</p>
          </div>
        </div>
        <select
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
          className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 min-w-[200px]"
        >
          {courseOptions.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        {CARDS_META.map((card) => (
          <SummaryCard key={card.key} label={card.label} value={card.fmt(summary[card.key])}
            icon={card.icon} color={card.color} bg={card.bg} tooltip={card.tooltip} />
        ))}
      </div>

      {/* Search */}
      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm sinh viên theo tên hoặc mã SV..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
          />
        </div>

      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-100 dark:border-gray-700">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-700/60">
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider w-12">STT</th>
              <ColHeader label="Tên lớp"    field="className"    sortConfig={sortConfig} onSort={handleSort} />
              <ColHeader label="Tên sinh viên" field="name"      sortConfig={sortConfig} onSort={handleSort} />
              <ColHeader label="Mã SV"      field="studentId"    sortConfig={sortConfig} onSort={handleSort} />
              <ColHeader label="Điểm TB"    field="avgScore"     sortConfig={sortConfig} onSort={handleSort} />
              <ColHeader label="Tiến độ"    field="completionRate" sortConfig={sortConfig} onSort={handleSort} />
              <ColHeader label="CƠ BẢN"          field="basic"   sortConfig={sortConfig} onSort={handleSort} cls="min-w-[100px]" />
              <ColHeader label="NÂNG CAO"           field="advanced" sortConfig={sortConfig} onSort={handleSort} />
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Mức độ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {sorted.map((row, idx) => (
              <tr key={row.id} onClick={() => setSelectedStudent(row)}
                className="hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-colors cursor-pointer">
                <td className="px-4 py-3 text-sm text-gray-400 dark:text-gray-500 align-middle">{idx + 1}</td>
                <td className="px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 align-middle">{row.className}</td>
                <td className="px-4 py-3 text-sm font-medium text-blue-600 dark:text-blue-400 align-middle">{row.name}</td>
                <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400 align-middle">{row.studentId}</td>
                <td className="px-4 py-3 align-middle">
                  <span className={`text-sm font-bold ${ScoreColor(row.avgScore)}`}>{row.avgScore.toFixed(1)}</span>
                </td>
                <td className="px-4 py-3 align-middle">
                  <div className="flex items-center gap-2">
                    <div className="w-20 bg-gray-200 dark:bg-gray-600 rounded-full h-1.5">
                      <div className={`h-1.5 rounded-full ${row.completionRate >= 80 ? 'bg-green-500' : row.completionRate >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
                        style={{ width: `${row.completionRate}%` }} />
                    </div>
                    <span className="text-xs text-gray-600 dark:text-gray-400 w-8">{row.completionRate}%</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-center align-middle">
                  <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">{row.basic}%</span>
                </td>
                <td className="px-4 py-3 text-center align-middle">
                  <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">{row.advanced}%</span>
                </td>
                <td className="px-4 py-3 align-middle"><LevelBadge advanced={row.advanced} /></td>
              </tr>
            ))}
            {sorted.length === 0 && (
              <tr><td colSpan={9} className="px-4 py-12 text-center text-gray-400 dark:text-gray-500 text-sm">Không tìm thấy sinh viên nào</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-gray-400 dark:text-gray-500 mt-3">
        * Bình thường: kỹ năng ≥ 70% · Nâng cao: kỹ năng ≥ 85%
      </p>

      {selectedStudent && <StudentDetail student={selectedStudent} onClose={() => setSelectedStudent(null)} />}
    </div>
  );
};

export default ClassStudentTable;
