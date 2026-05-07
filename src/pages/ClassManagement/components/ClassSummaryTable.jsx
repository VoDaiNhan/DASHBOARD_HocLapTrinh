import React, { useState, useEffect, useMemo } from 'react';
import { ArrowUpDown, ArrowUp, ArrowDown, Download, Eye, Search, ChevronDown, ChevronRight } from 'lucide-react';
import { coursePerformanceData, COURSE_NAMES } from '../../../data/coursePerformanceData';

// Tính điểm TB và tiến độ TB từ coursePerformanceData
const buildClassStats = () => {
  const map = {}; // className -> { totalScore, totalCompletion, count, courseMap }
  coursePerformanceData.students.forEach((student) => {
    const cn = student.className;
    if (!map[cn]) map[cn] = { totalScore: 0, totalCompletion: 0, count: 0, courseScores: {} };
    let scoreSum = 0, compSum = 0, courseCount = 0;
    Object.entries(student.courses).forEach(([courseName, data]) => {
      scoreSum += data.avgScore;
      compSum += data.completionRate;
      courseCount++;
      if (!map[cn].courseScores[courseName]) map[cn].courseScores[courseName] = { total: 0, count: 0 };
      map[cn].courseScores[courseName].total += data.avgScore;
      map[cn].courseScores[courseName].count++;
    });
    if (courseCount > 0) {
      map[cn].totalScore += scoreSum / courseCount;
      map[cn].totalCompletion += compSum / courseCount;
      map[cn].count++;
    }
  });
  const result = {};
  Object.entries(map).forEach(([cn, d]) => {
    result[cn] = {
      avgScore: d.count > 0 ? Math.round((d.totalScore / d.count) * 10) / 10 : 0,
      avgCompletion: d.count > 0 ? Math.round(d.totalCompletion / d.count) : 0,
      studentCount: d.count,
      courseScores: Object.fromEntries(
        Object.entries(d.courseScores).map(([cn2, v]) => [cn2, Math.round((v.total / v.count) * 10) / 10])
      ),
    };
  });
  return result;
};

const classStats = buildClassStats();

const HOMEROOM_TEACHERS = {
  '22CT111': 'TS. Nguyễn Văn An',
  '22CT112': 'TS. Trần Thị Bình',
  '22CT113': 'TS. Lê Văn Cường',
};

const getRiskLevel = (completion, score) => {
  if (completion < 60 || score < 6) return 'high';
  if (completion < 75 || score < 7) return 'medium';
  return 'low';
};

const RiskBadge = ({ level }) => {
  const styles = {
    low:    'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    medium: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    high:   'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  };
  const labels = { low: 'Thấp', medium: 'Trung bình', high: 'Cao' };
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[level] || styles.low}`}>
      {labels[level] || level}
    </span>
  );
};

const ProgressBar = ({ value, size = 'md' }) => {
  const color = value >= 80 ? 'bg-green-500' : value >= 60 ? 'bg-yellow-500' : 'bg-red-500';
  const h = size === 'sm' ? 'h-1' : 'h-1.5';
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-700 dark:text-gray-300 w-10 text-right">{value}%</span>
      <div className={`flex-1 bg-gray-200 dark:bg-gray-600 rounded-full ${h}`}>
        <div className={`${color} ${h} rounded-full transition-all`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
};

const ScoreBadge = ({ score }) => {
  const color = score >= 8 ? 'text-green-600 dark:text-green-400' : score >= 7 ? 'text-blue-600 dark:text-blue-400' : score >= 6 ? 'text-yellow-600 dark:text-yellow-400' : 'text-red-600 dark:text-red-400';
  return <span className={`font-bold text-sm ${color}`}>{score.toFixed(1)}</span>;
};

const ClassSummaryTable = ({ classes = [], onClassClick }) => {
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [search, setSearch] = useState('');
  const [filterRisk, setFilterRisk] = useState('all');
  const [filterSemester, setFilterSemester] = useState('all');
  const [filterYear, setFilterYear] = useState('all');
  const [expandedGroups, setExpandedGroups] = useState({});

  // Merge class list với stats từ coursePerformanceData
  const enrichedClasses = useMemo(() => {
    return classes.map((cls) => {
      const stats = classStats[cls.name] || {};
      const avgScore = stats.avgScore ?? cls.averageScore ?? 0;
      const avgCompletion = stats.avgCompletion ?? cls.completionRate ?? 0;
      return {
        ...cls,
        studentCount: stats.studentCount ?? cls.enrolledStudents ?? 0,
        averageScore: avgScore,
        averageProgress: avgCompletion,
        riskLevel: getRiskLevel(avgCompletion, avgScore),
        courseScores: stats.courseScores ?? {},
      };
    });
  }, [classes]);

  // Filter + search
  const filtered = useMemo(() => {
    return enrichedClasses.filter((cls) => {
      const matchSearch = search === '' ||
        cls.name?.toLowerCase().includes(search.toLowerCase()) ||
        cls.course?.toLowerCase().includes(search.toLowerCase()) ||
        cls.instructor?.toLowerCase().includes(search.toLowerCase());
      const matchRisk = filterRisk === 'all' || cls.riskLevel === filterRisk;
      return matchSearch && matchRisk;
    });
  }, [enrichedClasses, search, filterRisk]);

  // Sort
  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      let aVal = a[sortConfig.key];
      let bVal = b[sortConfig.key];
      if (sortConfig.key === 'riskLevel') {
        const order = { high: 3, medium: 2, low: 1 };
        aVal = order[a.riskLevel] || 0;
        bVal = order[b.riskLevel] || 0;
      }
      if (typeof aVal === 'string') return sortConfig.direction === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      return sortConfig.direction === 'asc' ? aVal - bVal : bVal - aVal;
    });
  }, [filtered, sortConfig]);

  // Group by class name
  const grouped = useMemo(() => {
    const g = {};
    sorted.forEach((item) => {
      if (!g[item.name]) g[item.name] = [];
      g[item.name].push(item);
    });
    return g;
  }, [sorted]);

  // Init all groups expanded
  useEffect(() => {
    const init = {};
    Object.keys(grouped).forEach((k) => { init[k] = true; });
    setExpandedGroups(init);
  }, [Object.keys(grouped).join(',')]);

  const toggleGroup = (name) => setExpandedGroups((prev) => ({ ...prev, [name]: !prev[name] }));

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const SortIcon = ({ col }) => {
    if (sortConfig.key !== col) return <ArrowUpDown className="h-3 w-3 text-gray-400" />;
    return sortConfig.direction === 'asc'
      ? <ArrowUp className="h-3 w-3 text-blue-600" />
      : <ArrowDown className="h-3 w-3 text-blue-600" />;
  };

  const handleExport = () => alert('Tính năng xuất Excel sẽ được triển khai');

  // Summary stats
  const summary = useMemo(() => {
    const all = enrichedClasses;
    const avgScore = all.length ? (all.reduce((s, c) => s + c.averageScore, 0) / all.length).toFixed(1) : 0;
    const avgComp = all.length ? Math.round(all.reduce((s, c) => s + c.averageProgress, 0) / all.length) : 0;
    const highRisk = all.filter((c) => c.riskLevel === 'high').length;
    return { avgScore, avgComp, highRisk };
  }, [enrichedClasses]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 mb-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Tổng hợp lớp học</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {filtered.length} lớp · Điểm TB: <span className="font-medium text-blue-600">{summary.avgScore}</span> · Tiến độ TB: <span className="font-medium text-green-600">{summary.avgComp}%</span>
            {summary.highRisk > 0 && <span className="ml-2 text-red-500 font-medium">· {summary.highRisk} lớp rủi ro cao</span>}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-5">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm lớp, môn học, giảng viên..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <select
          value={filterSemester}
          onChange={(e) => setFilterSemester(e.target.value)}
          className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">Tất cả học kỳ</option>
          <option value="hk1">Học kỳ 1</option>
          <option value="hk2">Học kỳ 2</option>
          <option value="hk3">Học kỳ 3</option>
          <option value="hk4">Học kỳ 4</option>
        </select>
        <select
          value={filterYear}
          onChange={(e) => setFilterYear(e.target.value)}
          className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">Tất cả năm học</option>
          <option value="2018-2022">2018-2022</option>
          <option value="2019-2023">2019-2023</option>
          <option value="2020-2024">2020-2024</option>
          <option value="2021-2025">2021-2025</option>
          <option value="2022-2026">2022-2026</option>
        </select>
        <select
          value={filterRisk}
          onChange={(e) => setFilterRisk(e.target.value)}
          className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">Tất cả mức rủi ro</option>
          <option value="low">Rủi ro thấp</option>
          <option value="medium">Rủi ro trung bình</option>
          <option value="high">Rủi ro cao</option>
        </select>
        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
        >
          <Download className="h-4 w-4" />
          Xuất báo cáo
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-700/50">
              {[
                { key: 'name', label: 'Tên lớp' },
                { key: 'course', label: 'Môn học' },
                { key: 'instructor', label: 'Giảng viên' },
                { key: 'studentCount', label: 'Số SV' },
                { key: 'averageScore', label: 'Điểm TB' },
                { key: 'averageProgress', label: 'Tiến độ TB' },
                { key: 'riskLevel', label: 'Rủi ro' },
              ].map(({ key, label }) => (
                <th
                  key={key}
                  onClick={() => handleSort(key)}
                  className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 select-none"
                >
                  <div className="flex items-center gap-1">
                    {label}
                    <SortIcon col={key} />
                  </div>
                </th>
              ))}
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {Object.entries(grouped).map(([className, items]) => {
              const isExpanded = expandedGroups[className] !== false;
              // Group summary
              const groupAvgScore = (items.reduce((s, i) => s + i.averageScore, 0) / items.length).toFixed(1);
              const groupAvgComp = Math.round(items.reduce((s, i) => s + i.averageProgress, 0) / items.length);
              const groupRisk = items.some((i) => i.riskLevel === 'high') ? 'high' : items.some((i) => i.riskLevel === 'medium') ? 'medium' : 'low';
              const totalStudents = items[0]?.studentCount ?? 0;

              return (
                <React.Fragment key={className}>
                  {/* Group header row */}
                  <tr
                    className="bg-blue-50 dark:bg-blue-900/20 cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors border-t-2 border-blue-200 dark:border-blue-700"
                    onClick={() => toggleGroup(className)}
                  >
                    <td className="px-4 py-3 align-middle" colSpan={2}>
                      <div className="flex items-center gap-2">
                        {isExpanded
                          ? <ChevronDown className="h-4 w-4 text-blue-600" />
                          : <ChevronRight className="h-4 w-4 text-blue-600" />}
                        <div className="h-5 w-1 bg-blue-600 rounded-full" />
                        <span className="font-bold text-blue-900 dark:text-blue-300 text-sm">
                          Lớp {className}
                        </span>
                        <span className="text-xs text-blue-600 dark:text-blue-400">
                          ({items.length} môn)
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300 font-medium align-middle">
                      {HOMEROOM_TEACHERS[className] || '—'}
                    </td>
                    <td className="px-4 py-3 text-sm font-semibold text-gray-800 dark:text-gray-200 align-middle">{totalStudents} SV</td>
                    <td className="px-4 py-3 align-middle"><ScoreBadge score={parseFloat(groupAvgScore)} /></td>
                    <td className="px-4 py-3 align-middle"><ProgressBar value={groupAvgComp} /></td>
                    <td className="px-4 py-3 align-middle"><RiskBadge level={groupRisk} /></td>
                    <td className="px-4 py-3 align-middle" />
                  </tr>

                  {/* Child rows */}
                  {isExpanded && items.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors"
                    >
                      <td className="px-4 py-3 pl-10 text-sm font-medium text-gray-700 dark:text-gray-300 align-middle">
                        {item.name}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400 max-w-[180px] align-middle">
                        {item.course || '—'}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400 align-middle">
                        {item.instructor || '—'}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400 align-middle">
                        {item.studentCount}
                      </td>
                      <td className="px-4 py-3 align-middle">
                        <ScoreBadge score={item.averageScore} />
                      </td>
                      <td className="px-4 py-3 min-w-[140px] align-middle">
                        <ProgressBar value={item.averageProgress} />
                      </td>
                      <td className="px-4 py-3 align-middle">
                        <RiskBadge level={item.riskLevel} />
                      </td>
                      <td className="px-4 py-3 align-middle">
                        <button
                          onClick={() => onClassClick?.(item)}
                          className="flex items-center gap-1 text-blue-600 hover:text-blue-700 dark:text-blue-400 text-sm font-medium"
                        >
                          <Eye className="h-4 w-4" />
                          Chi tiết
                        </button>
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              );
            })}

            {Object.keys(grouped).length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-12 text-center text-gray-400 dark:text-gray-500">
                  Không tìm thấy lớp học nào
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClassSummaryTable;
