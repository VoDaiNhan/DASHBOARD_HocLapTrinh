import React, { useState, useMemo } from 'react';
import { Trophy, AlertTriangle, TrendingUp, TrendingDown, Minus, Filter } from 'lucide-react';

const TopBottomStudents = ({ students, onStudentClick }) => {
  const [topFilters, setTopFilters] = useState({ cohort: 'Tất cả', class: 'Tất cả' });
  const [bottomFilters, setBottomFilters] = useState({ cohort: 'Tất cả', class: 'Tất cả' });

  // Get unique classes and cohorts for filters
  const cohorts = ['Tất cả', 'K26', 'K25', 'K24'];
  const classes = useMemo(() => {
    const cls = new Set(['Tất cả']);
    students?.forEach(s => {
      const name = s.courses?.[0]?.className;
      if (name) cls.add(name);
    });
    return Array.from(cls);
  }, [students]);

  const filterData = (filters) => {
    return (students || []).filter(s => {
      const sClass = s.courses?.[0]?.className || '';
      const sCohort = sClass.split('-')[0];
      const matchCohort = filters.cohort === 'Tất cả' || sCohort === filters.cohort;
      const matchClass = filters.class === 'Tất cả' || sClass === filters.class;
      return matchCohort && matchClass;
    });
  };

  const topData = useMemo(() => {
    const filtered = filterData(topFilters);
    return [...filtered]
      .sort((a, b) => (b.averageScore || 0) - (a.averageScore || 0))
      .slice(0, 20) // Increased from 5 to 20 for scrolling
      .map(s => ({
        name: s.name,
        class: s.courses?.[0]?.className || 'N/A',
        gpa: s.averageScore || 0,
        trend: s.scoreChange || 0,
        id: s.id
      }));
  }, [students, topFilters]);

  const bottomData = useMemo(() => {
    const filtered = filterData(bottomFilters);
    return [...filtered]
      .sort((a, b) => (a.averageScore || 0) - (b.averageScore || 0))
      .slice(0, 20) // Increased from 5 to 20 for scrolling
      .map(s => ({
        name: s.name,
        class: s.courses?.[0]?.className || 'N/A',
        gpa: s.averageScore || 0,
        trend: s.scoreChange || 0,
        id: s.id
      }));
  }, [students, bottomFilters]);

  const TrendIcon = ({ value }) => {
    if (value > 0) return <TrendingUp size={14} className="text-green-500" />;
    if (value < 0) return <TrendingDown size={14} className="text-red-500" />;
    return <Minus size={14} className="text-gray-400" />;
  };

  const SectionHeader = ({ isTop, filters, setFilters }) => (
    <div className={`px-5 py-4 ${isTop ? 'bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20' : 'bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20'}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className={`p-2 rounded-lg ${isTop ? 'bg-emerald-100 dark:bg-emerald-800/40' : 'bg-red-100 dark:bg-red-800/40'}`}>
            {isTop ? <Trophy size={18} className="text-emerald-600 dark:text-emerald-400" /> : <AlertTriangle size={18} className="text-red-600 dark:text-red-400" />}
          </div>
          <div>
            <h4 className={`font-bold text-sm ${isTop ? 'text-emerald-800 dark:text-emerald-300' : 'text-red-800 dark:text-red-300'}`}>
              {isTop ? 'Top SV có điểm tốt' : 'Những sinh viên cần hỗ trợ'}
            </h4>
            <p className="text-[10px] text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">
              Dựa trên điểm trung bình toàn khóa
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <select 
            value={filters.cohort}
            onChange={(e) => setFilters({ ...filters, cohort: e.target.value })}
            className="text-[10px] font-bold bg-white/80 dark:bg-gray-700/80 border border-gray-200 dark:border-gray-600 rounded-lg px-2 py-1 focus:outline-none"
          >
            {cohorts.map(c => <option key={c} value={c}>{c === 'Tất cả' ? 'Khóa: Tất cả' : c}</option>)}
          </select>
          <select 
            value={filters.class}
            onChange={(e) => setFilters({ ...filters, class: e.target.value })}
            className="text-[10px] font-bold bg-white/80 dark:bg-gray-700/80 border border-gray-200 dark:border-gray-600 rounded-lg px-2 py-1 focus:outline-none max-w-[100px]"
          >
            {classes.map(c => <option key={c} value={c}>{c === 'Tất cả' ? 'Lớp: Tất cả' : c}</option>)}
          </select>
        </div>
      </div>
    </div>
  );

  const StudentList = ({ data, isTop }) => (
    <div className="divide-y divide-gray-50 dark:divide-gray-700/50 max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200">
      {data.length > 0 ? data.map((student, index) => (
        <div
          key={student.id || index}
          className="flex items-center justify-between px-5 py-4 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors cursor-pointer border-l-4 border-transparent hover:border-indigo-500"
          onClick={() => onStudentClick && onStudentClick(student)}
        >
          <div className="flex items-center gap-4">
            <span className={`text-xs font-black w-6 ${index < 3 ? (isTop ? 'text-emerald-500' : 'text-rose-500') : 'text-gray-300'}`}>
              {index === 0 ? '🏆' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
            </span>
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${isTop ? 'from-emerald-50 to-teal-50 text-emerald-600' : 'from-rose-50 to-orange-50 text-rose-600'} flex items-center justify-center text-sm font-black shadow-sm`}>
              {student.name[0]}
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900 dark:text-white">{student.name}</p>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter">{student.class}</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className={`text-base font-black ${isTop ? 'text-emerald-600' : 'text-rose-600'}`}>
                {student.gpa.toFixed(1)}
              </p>
              <div className="flex items-center justify-end gap-1">
                <TrendIcon value={student.trend} />
                <span className={`text-[10px] font-black ${student.trend > 0 ? 'text-green-500' : student.trend < 0 ? 'text-red-500' : 'text-gray-400'}`}>
                  {student.trend > 0 ? '+' : ''}{student.trend.toFixed(1)}
                </span>
              </div>
            </div>
          </div>
        </div>
      )) : (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
          <Filter size={24} className="mb-2 opacity-20" />
          <p className="text-xs italic">Không có dữ liệu cho bộ lọc này</p>
        </div>
      )}
    </div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Top Students */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-emerald-100 dark:border-emerald-900/30 overflow-hidden">
        <SectionHeader isTop={true} filters={topFilters} setFilters={setTopFilters} />
        <StudentList data={topData} isTop={true} />
      </div>

      {/* Bottom Students */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-red-100 dark:border-red-900/30 overflow-hidden">
        <SectionHeader isTop={false} filters={bottomFilters} setFilters={setBottomFilters} />
        <StudentList data={bottomData} isTop={false} />
      </div>
    </div>
  );
};

export default TopBottomStudents;
