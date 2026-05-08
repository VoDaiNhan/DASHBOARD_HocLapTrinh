import React, { useState } from 'react';
import { AlertTriangle, Eye, ChevronDown, ChevronUp, Users, TrendingDown, Clock, BookOpen } from 'lucide-react';

const RiskGroupsTable = ({ students = [], onViewGroup }) => {
  const [expandedGroup, setExpandedGroup] = useState(null);

  const riskGroups = [
    {
      id: 'academic', icon: AlertTriangle,
      iconBg: 'bg-red-100 dark:bg-red-900/30', iconColor: 'text-red-600 dark:text-red-400',
      name: 'Nguy cơ học vụ', description: 'GPA < 5.0 hoặc nhiều môn rớt',
      count: students.filter(s => s.averageScore < 6.0).length || 5,
      issue: 'GPA < 5.0', severity: 'critical',
      members: students.filter(s => s.averageScore < 6.0).slice(0, 3)
    },
    {
      id: 'attendance', icon: Clock,
      iconBg: 'bg-orange-100 dark:bg-orange-900/30', iconColor: 'text-orange-600 dark:text-orange-400',
      name: 'Chuyên cần thấp', description: 'Tỷ lệ đi học < 80%',
      count: 12, issue: '< 80%', severity: 'high', members: []
    },
    {
      id: 'declining', icon: TrendingDown,
      iconBg: 'bg-amber-100 dark:bg-amber-900/30', iconColor: 'text-amber-600 dark:text-amber-400',
      name: 'Giảm điểm mạnh', description: 'GPA giảm > 1.0 so với kỳ trước',
      count: students.filter(s => (s.scoreChange || 0) < -0.3).length || 8,
      issue: '↓ > 1.0', severity: 'medium',
      members: students.filter(s => (s.scoreChange || 0) < 0).slice(0, 3)
    },
    {
      id: 'incomplete', icon: BookOpen,
      iconBg: 'bg-purple-100 dark:bg-purple-900/30', iconColor: 'text-purple-600 dark:text-purple-400',
      name: 'Không nộp bài', description: 'Thiếu ≥ 3 bài tập',
      count: students.filter(s => (s.totalAssignments - s.completedAssignments) >= 5).length || 6,
      issue: '≥ 3 bài', severity: 'medium', members: []
    }
  ];

  const sevBadge = (s) => {
    const m = { critical: ['bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400','Nghiêm trọng'], high: ['bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400','Cao'], medium: ['bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400','Trung bình'] };
    return <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${m[s][0]}`}>{m[s][1]}</span>;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-5 mb-6">
      <div className="flex items-center gap-2.5 mb-5">
        <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded-lg">
          <Users size={18} className="text-red-600 dark:text-red-400" />
        </div>
        <div>
          <h2 className="text-base font-bold text-gray-900 dark:text-white">🔥 Nhóm cần can thiệp</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">Click để xem chi tiết từng nhóm</p>
        </div>
      </div>
      <div className="space-y-2">
        {riskGroups.map((g) => {
          const Icon = g.icon;
          const open = expandedGroup === g.id;
          return (
            <div key={g.id} className="border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3.5 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors" onClick={() => setExpandedGroup(open ? null : g.id)}>
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${g.iconBg}`}><Icon size={16} className={g.iconColor} /></div>
                  <div>
                    <div className="flex items-center gap-2"><span className="text-sm font-bold text-gray-900 dark:text-white">{g.name}</span>{sevBadge(g.severity)}</div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{g.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-lg font-bold text-gray-900 dark:text-white">{g.count}<span className="text-xs text-gray-500 ml-1">SV</span></span>
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-lg text-xs font-medium text-gray-600 dark:text-gray-400">{g.issue}</span>
                  {open ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
                </div>
              </div>
              {open && (
                <div className="border-t border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 px-4 py-3">
                  {g.members.length > 0 ? g.members.map((s, i) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700/50 last:border-0">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-700 flex items-center justify-center text-xs font-bold">{s.name?.[0]}</div>
                        <div><p className="text-sm font-medium text-gray-900 dark:text-white">{s.name}</p><p className="text-xs text-gray-500">{s.courses?.[0]?.className || ''}</p></div>
                      </div>
                      <span className={`text-xs font-bold ${s.averageScore < 6 ? 'text-red-600' : 'text-gray-600'}`}>GPA {s.averageScore?.toFixed(1)}</span>
                    </div>
                  )) : <p className="text-xs text-gray-500 py-2">Dữ liệu chi tiết sẽ được cập nhật từ hệ thống.</p>}
                  <div className="flex gap-2 mt-2">
                    <button onClick={() => onViewGroup?.(g)} className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700"><Eye size={12} />Xem đầy đủ</button>
                    <button className="px-3 py-1.5 bg-orange-600 text-white rounded-lg text-xs font-medium hover:bg-orange-700">Gửi cố vấn</button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RiskGroupsTable;
