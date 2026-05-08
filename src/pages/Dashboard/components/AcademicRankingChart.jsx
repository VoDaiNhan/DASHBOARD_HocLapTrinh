import React, { useState, useMemo } from 'react';
import { 
  ComposedChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
} from 'recharts';
import { Award, ChevronRight, ArrowUpDown } from 'lucide-react';

const courses = [
  { id: 'all', name: 'Tất cả môn học' },
  { id: 'intro-prog', name: 'Nhập môn lập trình' },
  { id: 'database', name: 'Cơ sở dữ liệu' }
];

const academicData = [
  {
    year: "2022",
    categories: [
      { name: "Xuất sắc", value: 8, key: "xuatSac" },
      { name: "Giỏi", value: 15, key: "gioi" },
      { name: "Khá", value: 25, key: "kha" },
      { name: "Trung bình Khá", value: 15, key: "trungBinhKha" },
      { name: "Trung bình", value: 20, key: "trungBinh" },
      { name: "Yếu", value: 12, key: "yeu" },
      { name: "Kém", value: 5, key: "kem" },
    ]
  },
  {
    year: "2023",
    categories: [
      { name: "Xuất sắc", value: 10, key: "xuatSac" },
      { name: "Giỏi", value: 18, key: "gioi" },
      { name: "Khá", value: 22, key: "kha" },
      { name: "Trung bình Khá", value: 18, key: "trungBinhKha" },
      { name: "Trung bình", value: 17, key: "trungBinh" },
      { name: "Yếu", value: 10, key: "yeu" },
      { name: "Kém", value: 5, key: "kem" },
    ]
  },
  {
    year: "2024",
    categories: [
      { name: "Xuất sắc", value: 12, key: "xuatSac" },
      { name: "Giỏi", value: 20, key: "gioi" },
      { name: "Khá", value: 25, key: "kha" },
      { name: "Trung bình Khá", value: 15, key: "trungBinhKha" },
      { name: "Trung bình", value: 18, key: "trungBinh" },
      { name: "Yếu", value: 7, key: "yeu" },
      { name: "Kém", value: 3, key: "kem" },
    ]
  },
  {
    year: "2025",
    categories: [
      { name: "Xuất sắc", value: 15, key: "xuatSac" },
      { name: "Giỏi", value: 22, key: "gioi" },
      { name: "Khá", value: 28, key: "kha" },
      { name: "Trung bình Khá", value: 12, key: "trungBinhKha" },
      { name: "Trung bình", value: 13, key: "trungBinh" },
      { name: "Yếu", value: 7, key: "yeu" },
      { name: "Kém", value: 3, key: "kem" },
    ]
  }
];

const COLORS = {
  "xuatSac": "#10b981",
  "gioi": "#3b82f6",
  "kha": "#6366f1",
  "trungBinhKha": "#06b6d4",
  "trungBinh": "#f59e0b",
  "yeu": "#f43f5e",
  "kem": "#ef4444"
};

const CATEGORY_KEYS = ["xuatSac", "gioi", "kha", "trungBinhKha", "trungBinh", "yeu", "kem"];

// MODAL CHI TIẾT
const RankingDetailModal = ({ isOpen, onClose, group, students }) => {
  const [sortConfig, setSortConfig] = useState({ key: 'gpa', direction: 'desc' });

  if (!isOpen) return null;

  const sortedStudents = [...students].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
    if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
    setSortConfig({ key, direction });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white dark:bg-gray-900 w-full max-w-4xl rounded-[32px] shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800 animate-in zoom-in-95 duration-300">
        <div className={`p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-gradient-to-r ${group.gradient} to-transparent`}>
          <div className="flex items-center gap-4">
            <div className={`p-3 bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-sm text-${group.color}-600`}>
              <Award size={24} />
            </div>
            <div>
              <h3 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight">{group.label}</h3>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1 italic">Danh sách sinh viên phân khúc {group.sub}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-black/5 rounded-full transition-colors text-gray-500">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>

        <div className="p-0 max-h-[60vh] overflow-y-auto">
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 bg-gray-50/95 dark:bg-gray-800/95 backdrop-blur-md z-10 border-b border-gray-100 dark:border-gray-700">
              <tr>
                {[
                  { label: 'Mã SV', key: 'id' },
                  { label: 'Họ tên', key: 'name' },
                  { label: 'Lớp', key: 'class' },
                  { label: 'Học lực', key: 'rank' },
                  { label: 'GPA', key: 'gpa' }
                ].map((header) => (
                  <th 
                    key={header.key}
                    onClick={() => requestSort(header.key)}
                    className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest cursor-pointer hover:text-indigo-600 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      {header.label}
                      <ArrowUpDown size={12} className={sortConfig.key === header.key ? 'text-indigo-600' : 'text-gray-300'} />
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
              {sortedStudents.map((s, idx) => (
                <tr key={idx} className="hover:bg-indigo-50/30 dark:hover:bg-indigo-500/5 transition-colors group">
                  <td className="px-6 py-4 text-xs font-bold text-gray-500">{s.id}</td>
                  <td className="px-6 py-4 text-xs font-black text-gray-900 dark:text-white">{s.name}</td>
                  <td className="px-6 py-4 text-xs font-bold text-gray-600 dark:text-gray-400">{s.class}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter ${s.badgeColor}`}>
                      {s.rank}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-black text-indigo-600 dark:text-indigo-400">{s.gpa.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-6 bg-gray-50/50 dark:bg-gray-800/50 flex justify-between items-center">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest italic">Tổng số: {sortedStudents.length} sinh viên</span>
          <button className="px-6 py-2 bg-gray-900 dark:bg-white dark:text-gray-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg">
            XUẤT BÁO CÁO CHI TIẾT
          </button>
        </div>
      </div>
    </div>
  );
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const total = payload.reduce((sum, entry) => sum + entry.value, 0);
    const sortedPayload = [...payload].reverse();

    const getNameWithMarks = (key) => {
      const names = {
        xuatSac: "Xuất sắc",
        gioi: "Giỏi",
        kha: "Khá",
        trungBinhKha: "Trung bình Khá",
        trungBinh: "Trung bình",
        yeu: "Yếu",
        kem: "Kém"
      };
      return names[key] || key;
    };

    return (
      <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl p-5 rounded-[24px] shadow-2xl border border-white/20 min-w-[220px] animate-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-100 dark:border-gray-800">
          <span className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-tight">Năm {label}</span>
          <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 rounded-lg text-[9px] font-black text-gray-500 uppercase">Tóm tắt</span>
        </div>
        <div className="space-y-2.5">
          {sortedPayload.map((entry, index) => {
            const percentage = ((entry.value / total) * 100).toFixed(1);
            return (
              <div key={index} className="flex items-center justify-between gap-6">
                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full shadow-sm" style={{ backgroundColor: entry.color }}></div>
                  <span className="text-[11px] font-black text-gray-600 dark:text-gray-300 uppercase tracking-tight">
                    {getNameWithMarks(entry.dataKey)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-gray-900 dark:text-white">{entry.value} SV</span>
                  <span className="text-[10px] font-bold text-indigo-500 bg-indigo-50 dark:bg-indigo-500/10 px-1.5 py-0.5 rounded-md">
                    {percentage}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center opacity-60">
          <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest italic">Hệ thống Dashboard 2025</span>
        </div>
      </div>
    );
  }
  return null;
};

const AcademicRankingChart = () => {
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [detailGroup, setDetailGroup] = useState(null);

  const mockStudents = [
    { id: 'SV001', name: 'Nguyễn Văn An', class: 'K65-CNTT1', rank: 'Xuất sắc', gpa: 3.92, badgeColor: 'bg-emerald-100 text-emerald-700' },
    { id: 'SV002', name: 'Lê Thị Bình', class: 'K65-CNTT2', rank: 'Giỏi', gpa: 3.55, badgeColor: 'bg-blue-100 text-blue-700' },
    { id: 'SV003', name: 'Trần Duy Chiến', class: 'K64-CNTT1', rank: 'Khá', gpa: 3.12, badgeColor: 'bg-indigo-100 text-indigo-700' },
    { id: 'SV004', name: 'Phạm Hồng Đào', class: 'K66-HTTT', rank: 'Trung bình Khá', gpa: 2.85, badgeColor: 'bg-cyan-100 text-cyan-700' },
    { id: 'SV005', name: 'Hoàng Minh Em', class: 'K65-KHMT', rank: 'Trung bình', gpa: 2.45, badgeColor: 'bg-amber-100 text-amber-700' },
    { id: 'SV006', name: 'Vũ Quốc Huy', class: 'K64-CNTT3', rank: 'Yếu', gpa: 1.85, badgeColor: 'bg-rose-100 text-rose-700' },
    { id: 'SV007', name: 'Đặng Mỹ Linh', class: 'K66-CNTT2', rank: 'Kém', gpa: 1.20, badgeColor: 'bg-red-100 text-red-700' },
    { id: 'SV008', name: 'Bùi Thế Nam', class: 'K65-CNTT1', rank: 'Giỏi', gpa: 3.48, badgeColor: 'bg-blue-100 text-blue-700' },
    { id: 'SV009', name: 'Trịnh Công Sơn', class: 'K65-KHMT', rank: 'Xuất sắc', gpa: 3.88, badgeColor: 'bg-emerald-100 text-emerald-700' },
    { id: 'SV010', name: 'Phan Châu Trinh', class: 'K64-CNTT1', rank: 'Yếu', gpa: 1.95, badgeColor: 'bg-rose-100 text-rose-700' },
  ];

  const getFilteredStudents = (groupKey) => {
    switch(groupKey) {
      case 'uuTu': return mockStudents.filter(s => ['Xuất sắc', 'Giỏi'].includes(s.rank));
      case 'tiemNang': return mockStudents.filter(s => ['Khá', 'Trung bình Khá'].includes(s.rank));
      case 'canHoTro': return mockStudents.filter(s => ['Trung bình'].includes(s.rank));
      case 'nguyCo': return mockStudents.filter(s => ['Yếu', 'Kém'].includes(s.rank));
      default: return [];
    }
  };

  const rechartsData = useMemo(() => {
    return academicData.map(d => {
      const entry = { year: d.year };
      d.categories.forEach(c => entry[c.key] = c.value);
      return entry;
    });
  }, []);

  const kpiGroups = [
    { key: 'uuTu', label: 'Ưu tú (XS/Giỏi)', sub: 'Xuất sắc & Giỏi', value: '37 SV', color: 'emerald', gradient: 'from-emerald-50' },
    { key: 'tiemNang', label: 'Tiềm năng (Khá/TB Khá)', sub: 'Khá & TB Khá', value: '40 SV', color: 'blue', gradient: 'from-blue-50' },
    { key: 'canHoTro', label: 'Cần hỗ trợ (TB)', sub: 'Trung bình', value: '18 SV', color: 'amber', gradient: 'from-amber-50' },
    { key: 'nguyCo', label: 'Nguy cơ (Yếu/Kém)', sub: 'Yếu & Kém', value: '10 SV', color: 'red', gradient: 'from-red-50' }
  ];

  return (
    <div className="space-y-4">
      {/* Detail Modal */}
      <RankingDetailModal 
        isOpen={!!detailGroup} 
        onClose={() => setDetailGroup(null)} 
        group={detailGroup || {}} 
        students={detailGroup ? getFilteredStudents(detailGroup.key) : []}
      />

      <div className="card p-6 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-6 gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-50 dark:bg-purple-500/10 rounded-2xl text-purple-600 dark:text-purple-400 shadow-sm shadow-purple-500/10">
              <Award size={22} />
            </div>
            <div>
              <h3 className="text-lg font-black text-gray-900 dark:text-white tracking-tight uppercase">Phân bổ Xếp loại học lực</h3>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-0.5 italic">Thống kê biến động chu kỳ 4 năm • Hover để xem chi tiết</p>
            </div>
          </div>
          
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="pl-4 pr-10 py-1.5 border-none rounded-xl text-[10px] font-black uppercase tracking-widest bg-gray-50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-200 outline-none focus:ring-2 focus:ring-purple-500/20 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20fill%3D%22%236b7280%22%20d%3D%22M5.293%207.293a1%201%200%20011.414%200L10%2010.586l3.293-3.293a1%201%200%20111.414%201.414l-4%204a1%201%200%2001-1.414%200l-4-4a1%201%200%20010-1.414z%22/%3E%3C/svg%3E')] bg-[length:20px_20px] bg-[right_12px_center] bg-no-repeat cursor-pointer"
          >
            {courses.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>

        <div className="h-[320px] w-full relative">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={rechartsData} stackOffset="expand" margin={{ top: 10, right: 30, left: -20, bottom: 10 }}>
              <defs>
                {CATEGORY_KEYS.map(key => (
                  <linearGradient key={key} id={`grad-${key}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={COLORS[key]} stopOpacity={1} />
                    <stop offset="100%" stopColor={COLORS[key]} stopOpacity={0.7} />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#cbd5e1" opacity={0.15} />
              <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 13, fontWeight: 800 }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 600 }} tickFormatter={(val) => `${(val * 100).toFixed(0)}%`} />
              <Tooltip
                cursor={{ fill: '#f1f5f9', opacity: 0.3 }}
                content={<CustomTooltip />}
              />

              {CATEGORY_KEYS.map((key, idx) => (
                <Bar 
                  key={key}
                  dataKey={key} 
                  stackId="a" 
                  fill={`url(#grad-${key})`}
                  barSize={32}
                  className="transition-all duration-500"
                  radius={idx === 0 ? [0, 0, 10, 10] : idx === CATEGORY_KEYS.length - 1 ? [10, 10, 0, 0] : [0, 0, 0, 0]}
                />
              ))}
            </ComposedChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800 flex flex-wrap justify-center gap-x-6 gap-y-3">
          {academicData[0].categories.map((cat) => (
            <div 
              key={cat.key} 
              className="flex items-center gap-2 transition-all duration-300"
            >
              <div className="w-2.5 h-2.5 rounded-full shadow-sm" style={{ backgroundColor: COLORS[cat.key] }}></div>
              <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">
                {cat.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiGroups.map((stat, i) => (
          <div 
            key={i} 
            onClick={() => setDetailGroup(stat)}
            className={`p-5 rounded-3xl border-l-4 border-l-${stat.color}-500 bg-white dark:bg-gray-800 shadow-sm transition-all hover:scale-[1.03] hover:shadow-xl cursor-pointer active:scale-95 group relative overflow-hidden`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} to-transparent opacity-0 group-hover:opacity-100 transition-opacity`}></div>
            <div className="relative z-10 flex justify-between items-start mb-2">
              <span className={`text-[8px] font-black text-${stat.color}-500 uppercase tracking-widest block`}>{stat.label}</span>
              <ChevronRight size={14} className={`text-${stat.color}-400 group-hover:translate-x-1 transition-transform`} />
            </div>
            <div className="relative z-10 text-2xl font-black text-gray-900 dark:text-white mb-0.5 tracking-tighter">{stat.value}</div>
            <div className="relative z-10 text-[9px] text-gray-400 font-bold uppercase tracking-tight italic">Click xem danh sách</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(AcademicRankingChart);
