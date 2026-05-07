import React, { useState, useMemo } from 'react';
import { X, Send, Download, User, AlertTriangle, Search } from 'lucide-react';
import { coursePerformanceData, COURSE_NAMES } from '../../../data/coursePerformanceData';

const RiskClassDetailModal = ({ isOpen, onClose, classData }) => {
  const [selectedIds, setSelectedIds] = useState([]);
  const [search, setSearch] = useState('');

  // Lấy sinh viên rủi ro thực từ coursePerformanceData
  const atRiskStudents = useMemo(() => {
    if (!classData?.name) return [];
    return coursePerformanceData.students
      .filter((s) => s.className === classData.name)
      .map((s) => {
        const courseEntries = Object.entries(s.courses);
        const avgScore = courseEntries.reduce((sum, [, d]) => sum + d.avgScore, 0) / courseEntries.length;
        const avgCompletion = courseEntries.reduce((sum, [, d]) => sum + d.completionRate, 0) / courseEntries.length;
        const worstCourse = courseEntries.reduce((worst, [name, d]) =>
          d.avgScore < (worst[1]?.avgScore ?? 99) ? [name, d] : worst, ['', null]);
        return {
          id: s.id,
          name: s.name,
          studentId: s.studentId,
          avgScore: Math.round(avgScore * 10) / 10,
          avgCompletion: Math.round(avgCompletion),
          worstCourse: worstCourse[0],
          worstScore: worstCourse[1]?.avgScore ?? 0,
          riskReason: avgScore < 6 ? 'Điểm thấp' : avgCompletion < 60 ? 'Tiến độ chậm' : 'Cần theo dõi',
        };
      })
      .filter((s) => s.avgScore < 7 || s.avgCompletion < 70)
      .sort((a, b) => a.avgScore - b.avgScore);
  }, [classData]);

  const filtered = useMemo(() => {
    if (!search) return atRiskStudents;
    const q = search.toLowerCase();
    return atRiskStudents.filter((s) =>
      s.name.toLowerCase().includes(q) || s.studentId.toLowerCase().includes(q)
    );
  }, [atRiskStudents, search]);

  if (!isOpen || !classData) return null;

  const toggleSelect = (id) =>
    setSelectedIds((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  const toggleAll = () =>
    setSelectedIds(selectedIds.length === filtered.length ? [] : filtered.map((s) => s.id));

  const getRiskColor = (s) => {
    if (s.avgScore < 5 || s.avgCompletion < 50) return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
    if (s.avgScore < 6.5 || s.avgCompletion < 65) return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400';
    return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
  };

  const criticalCount = atRiskStudents.filter((s) => s.avgScore < 5 || s.avgCompletion < 50).length;
  const warningCount  = atRiskStudents.filter((s) => (s.avgScore >= 5 && s.avgScore < 6.5) || (s.avgCompletion >= 50 && s.avgCompletion < 65)).length;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Chi tiết lớp rủi ro</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              {classData.name} · {atRiskStudents.length} sinh viên cần chú ý
            </p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Alert banner */}
        <div className="px-6 py-3 bg-red-50 dark:bg-red-900/20 border-b border-red-200 dark:border-red-800 flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <span className="text-sm font-medium text-red-800 dark:text-red-300">
              {criticalCount} sinh viên nguy cơ cao
            </span>
          </div>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-orange-500" />
            <span className="text-sm font-medium text-orange-700 dark:text-orange-300">
              {warningCount} sinh viên cần theo dõi
            </span>
          </div>
          <div className="ml-auto text-sm text-gray-600 dark:text-gray-400">
            Tiến độ TB: <span className="font-semibold text-red-600">{classData.averageProgress ?? '—'}%</span>
            &nbsp;·&nbsp;Điểm TB: <span className="font-semibold text-red-600">{classData.averageScore?.toFixed?.(1) ?? '—'}</span>
          </div>
        </div>

        {/* Toolbar */}
        <div className="px-6 py-3 flex flex-wrap items-center gap-3 border-b border-gray-100 dark:border-gray-700">
          <div className="relative flex-1 min-w-48">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm sinh viên..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
            <input
              type="checkbox"
              checked={selectedIds.length === filtered.length && filtered.length > 0}
              onChange={toggleAll}
              className="w-4 h-4 text-blue-600 rounded"
            />
            Chọn tất cả ({filtered.length})
          </label>
          <button
            onClick={() => alert(`Xuất ${selectedIds.length} sinh viên ra Excel`)}
            disabled={!selectedIds.length}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <Download className="h-4 w-4" />
            Xuất Excel
          </button>
        </div>

        {/* Student list */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-gray-400 dark:text-gray-500">
              Không tìm thấy sinh viên nào
            </div>
          ) : (
            <div className="space-y-2">
              {filtered.map((student) => (
                <div
                  key={student.id}
                  onClick={() => toggleSelect(student.id)}
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    selectedIds.includes(student.id)
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(student.id)}
                      onChange={() => {}}
                      onClick={(e) => e.stopPropagation()}
                      className="mt-1 w-4 h-4 text-blue-600 rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <User className="h-4 w-4 text-gray-400 flex-shrink-0" />
                        <span className="font-semibold text-gray-900 dark:text-white text-sm">{student.name}</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">{student.studentId}</span>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getRiskColor(student)}`}>
                          {student.riskReason}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-2">
                        <div>
                          <p className="text-xs text-gray-400">Điểm TB</p>
                          <p className={`text-sm font-bold ${student.avgScore < 6 ? 'text-red-600' : 'text-orange-500'}`}>
                            {student.avgScore.toFixed(1)}/10
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">Tiến độ TB</p>
                          <p className={`text-sm font-bold ${student.avgCompletion < 60 ? 'text-red-600' : 'text-orange-500'}`}>
                            {student.avgCompletion}%
                          </p>
                        </div>
                        <div className="col-span-2">
                          <p className="text-xs text-gray-400">Môn yếu nhất</p>
                          <p className="text-sm text-gray-700 dark:text-gray-300 truncate">
                            {student.worstCourse} <span className="text-red-500 font-medium">({student.worstScore.toFixed(1)})</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
          <button
            onClick={() => alert(`Đã gửi cảnh báo về ${selectedIds.length} sinh viên tới giảng viên và cố vấn học tập`)}
            disabled={!selectedIds.length}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors font-medium"
          >
            <Send className="h-5 w-5" />
            Gửi cảnh báo tới giảng viên và cố vấn ({selectedIds.length} sinh viên)
          </button>
        </div>
      </div>
    </div>
  );
};

export default RiskClassDetailModal;
