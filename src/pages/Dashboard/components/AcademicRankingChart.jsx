import React, { useState, useMemo } from 'react';
import { 
  ComposedChart, 
  Bar, 
  Line,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts';
import { 
  Award as AwardIcon, 
  ChevronRight, 
  ArrowUpDown, 
  Bell, 
  FileText,
  Send,
  User,
  CheckCircle2,
  X,
  Mail,
  MessageCircle,
  AlertCircle,
  Sparkles,
  Info
} from 'lucide-react';

import { COHORTS, courses, getDisplayData } from '../services/academicDataService';

// Initial data will be handled by useMemo using getDisplayData
const CATEGORY_MAP = {
  excellent: "xuatSac",
  good: "gioi",
  kha: "kha",
  tbKha: "trungBinhKha",
  trungBinh: "trungBinh",
  yeu: "yeu",
  kem: "kem"
};

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

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const total = payload.filter(e => !e.dataKey.startsWith('c_')).reduce((sum, entry) => sum + entry.value, 0);
    const filteredPayload = payload.filter(e => !e.dataKey.startsWith('c_')).reverse();

    const getNameWithMarks = (key) => {
      const names = {
        xuatSac: "Xuất sắc", gioi: "Giỏi", kha: "Khá",
        trungBinhKha: "Trung bình Khá", trungBinh: "Trung bình",
        yeu: "Yếu", kem: "Kém"
      };
      return names[key] || key;
    };

    return (
      <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl p-5 rounded-[24px] shadow-2xl border border-white/20 min-w-[220px]">
        <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-100 dark:border-gray-800">
          <span className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-tight">Năm {label}</span>
          <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 rounded-lg text-[9px] font-black text-gray-500 uppercase">Tóm tắt</span>
        </div>
        <div className="space-y-2.5">
          {filteredPayload.map((entry, index) => {
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
      </div>
    );
  }
  return null;
};

const mockStudents = [
  { id: 'SV001', name: 'Nguyễn Văn An', class: '25CT111', rank: 'Xuất sắc', gpa: 9.8, badgeColor: 'bg-emerald-100 text-emerald-700', subjects: [] },
  { id: 'SV002', name: 'Lê Thị Bình', class: '25CT112', rank: 'Giỏi', gpa: 8.8, badgeColor: 'bg-blue-100 text-blue-700', subjects: [] },
  { id: 'SV003', name: 'Trần Duy Chiến', class: '25CT113', rank: 'Khá', gpa: 7.8, badgeColor: 'bg-indigo-100 text-indigo-700', subjects: [] },
  { id: 'SV004', name: 'Phạm Hồng Đào', class: '25CT114', rank: 'Trung bình Khá', gpa: 6.8, badgeColor: 'bg-cyan-100 text-cyan-700', subjects: [] },
  { id: 'SV005', name: 'Hoàng Minh Em', class: '25CT115', rank: 'Trung bình', gpa: 5.8, badgeColor: 'bg-amber-100 text-amber-700', subjects: [] },
  { id: 'SV006', name: 'Vũ Quốc Huy', class: '25CT113', rank: 'Yếu', gpa: 4.21, badgeColor: 'bg-rose-100 text-rose-700', subjects: ['Nhập môn lập trình', 'Kỹ thuật lập trình'] },
  { id: 'SV007', name: 'Đặng Mỹ Linh', class: '25CT112', rank: 'Kém', gpa: 3.2, badgeColor: 'bg-red-100 text-red-700', subjects: ['Cấu trúc dữ liệu'] },
  { id: 'SV008', name: 'Bùi Thế Nam', class: '25CT111', rank: 'Xuất sắc', gpa: 9.6, badgeColor: 'bg-emerald-100 text-emerald-700', subjects: [] },
  { id: 'SV009', name: 'Phan Minh Nhật', class: '25CT116', rank: 'Giỏi', gpa: 8.5, badgeColor: 'bg-blue-100 text-blue-700', subjects: [] },
  { id: 'SV010', name: 'Ngô Bảo Quyên', class: '25CT112', rank: 'Khá', gpa: 7.9, badgeColor: 'bg-indigo-100 text-indigo-700', subjects: [] },
  { id: 'SV011', name: 'Đỗ Mạnh Thắng', class: '25CT118', rank: 'Trung bình Khá', gpa: 6.5, badgeColor: 'bg-cyan-100 text-cyan-700', subjects: [] },
  { id: 'SV012', name: 'Trịnh Thu Uyên', class: '25CT111', rank: 'Trung bình', gpa: 5.5, badgeColor: 'bg-amber-100 text-amber-700', subjects: [] },
  { id: 'SV013', name: 'Lương Công Vinh', class: '25CT111', rank: 'Yếu', gpa: 4.5, badgeColor: 'bg-rose-100 text-rose-700', subjects: ['Toán rời rạc'] },
  { id: 'SV014', name: 'Dương Thúy Vy', class: '25CT117', rank: 'Kém', gpa: 2.8, badgeColor: 'bg-red-100 text-red-700', subjects: ['Nhập môn lập trình'] },
  { id: 'SV015', name: 'Lý Hoàng Nam', class: '25CT112', rank: 'Xuất sắc', gpa: 9.4, badgeColor: 'bg-emerald-100 text-emerald-700', subjects: [] },
  { id: 'SV016', name: 'Mai Tuyết Nhung', class: '25CT111', rank: 'Giỏi', gpa: 8.2, badgeColor: 'bg-blue-100 text-blue-700', subjects: [] },
  { id: 'SV017', name: 'Tạ Văn Sơn', class: '25CT119', rank: 'Khá', gpa: 7.6, badgeColor: 'bg-indigo-100 text-indigo-700', subjects: [] },
  { id: 'SV018', name: 'Vương Gia Kiệt', class: '25CT111', rank: 'Trung bình Khá', gpa: 6.9, badgeColor: 'bg-cyan-100 text-cyan-700', subjects: [] },
  { id: 'SV019', name: 'Diệp Lâm Anh', class: '25CT116', rank: 'Trung bình', gpa: 5.2, badgeColor: 'bg-amber-100 text-amber-700', subjects: [] },
  { id: 'SV020', name: 'Tô Ngọc Vân', class: '25CT114', rank: 'Yếu', gpa: 4.0, badgeColor: 'bg-rose-100 text-rose-700', subjects: ['Kỹ thuật lập trình'] },
  { id: 'SV021', name: 'Hồ Vĩnh Khoa', class: '25CT119', rank: 'Kém', gpa: 2.2, badgeColor: 'bg-red-100 text-red-700', subjects: ['Cơ sở dữ liệu'] },
  { id: 'SV022', name: 'Đoàn Thiên Ân', class: '25CT113', rank: 'Xuất sắc', gpa: 9.9, badgeColor: 'bg-emerald-100 text-emerald-700', subjects: [] },
  { id: 'SV023', name: 'Quách Thu Trang', class: '25CT112', rank: 'Giỏi', gpa: 8.6, badgeColor: 'bg-blue-100 text-blue-700', subjects: [] },
  { id: 'SV024', name: 'Tăng Thanh Hà', class: '25CT111', rank: 'Khá', gpa: 7.4, badgeColor: 'bg-indigo-100 text-indigo-700', subjects: [] },
  { id: 'SV025', name: 'Hà Anh Tuấn', class: '25CT112', rank: 'Trung bình Khá', gpa: 6.4, badgeColor: 'bg-cyan-100 text-cyan-700', subjects: [] }
];

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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-900 w-full max-w-4xl rounded-[32px] shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800 animate-in zoom-in-95 duration-300">
        <div className={`p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-gradient-to-r ${group.gradient} to-transparent`}>
          <div className="flex items-center gap-4">
            <div className={`p-3 bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-sm`}>
              <AwardIcon size={24} className={`text-${group.color}-600`} />
            </div>
            <div>
              <h3 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight">{group.label}</h3>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1 italic">Danh sách sinh viên phân khúc {group.sub}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-black/5 rounded-full transition-colors text-gray-500">
            <X size={24} strokeWidth={3} />
          </button>
        </div>
        <div className="p-0 max-h-[60vh] overflow-y-auto">
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 bg-gray-50/95 dark:bg-gray-800/95 backdrop-blur-md z-10 border-b border-gray-100 dark:border-gray-700">
              <tr>
                {['Mã SV', 'Họ tên', 'Lớp', 'Học lực', 'GPA'].map((h, i) => (
                  <th key={i} onClick={() => requestSort(['id', 'name', 'class', 'rank', 'gpa'][i])} className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest cursor-pointer hover:text-indigo-600 transition-colors">
                    <div className="flex items-center gap-2">{h} <ArrowUpDown size={12} /></div>
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
                  <td className="px-6 py-4"><span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter ${s.badgeColor || 'bg-gray-100 text-gray-600'}`}>{s.rank}</span></td>
                  <td className="px-6 py-4 text-sm font-black text-indigo-600 dark:text-indigo-400">{s.gpa.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-5 bg-gray-50/50 dark:bg-gray-800/50 flex justify-end gap-3 border-t border-gray-100 dark:border-gray-800">
          <button className="flex items-center gap-2 px-6 py-2.5 bg-slate-100 dark:bg-gray-700 hover:bg-slate-200 dark:hover:bg-gray-600 text-slate-700 dark:text-gray-200 rounded-2xl text-[11px] font-black uppercase tracking-tight transition-all hover:scale-105 active:scale-95">
            <FileText size={14} className="text-purple-500" />
            Xuất báo cáo (Excel)
          </button>
        </div>
      </div>
    </div>
  );
};

const NotificationHubModal = ({ isOpen, onClose }) => {
  const [selectedIds, setSelectedIds] = useState(mockStudents.filter(s => ['Yếu', 'Kém'].includes(s.rank)).map(s => s.id));
  const [isSending, setIsSending] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [message, setMessage] = useState('Chào {{tên_sinh_viên}},\n\nDựa trên kết quả học tập môn {{tên_môn}}, khoa nhận thấy em đang gặp một chút khó khăn với mức điểm {{điểm_số}}. Để hỗ trợ kịp thời, khoa sẽ tổ chức buổi tư vấn riêng vào thứ 7 này.\n\nRất mong em có mặt để cùng thầy cô tìm giải pháp cải thiện kết quả học tập nhé.');

  const atRiskStudents = useMemo(() => mockStudents.filter(s => ['Yếu', 'Kém'].includes(s.rank)), []);

  const toggleSelect = (id) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handleSend = () => {
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setIsDone(true);
      setTimeout(() => {
        setIsDone(false);
        onClose();
      }, 1500);
    }, 2000);
  };

  if (!isOpen) return null;

  const selectedCount = selectedIds.length;
  const yeuCount = atRiskStudents.filter(s => selectedIds.includes(s.id) && s.rank === 'Yếu').length;
  const kemCount = atRiskStudents.filter(s => selectedIds.includes(s.id) && s.rank === 'Kém').length;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-[4px] overscroll-contain">
      <div className="bg-white dark:bg-gray-900 w-full max-w-5xl max-h-[90vh] rounded-[32px] shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800 animate-in zoom-in-95 duration-300 flex flex-col transform-gpu">
        {/* Header - Cố định */}
        <div className="p-5 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-white dark:bg-gray-900 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-red-50 dark:bg-red-500/10 rounded-xl flex items-center justify-center text-red-600">
              <Bell size={20} fill="currentColor" />
            </div>
            <h3 className="text-lg font-black text-gray-900 dark:text-white uppercase tracking-tight">Gửi thông báo & Hỗ trợ học tập</h3>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors text-gray-400">
            <X size={22} />
          </button>
        </div>

        {/* Nội dung - Có thể cuộn */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-700 scrollbar-track-transparent">
          {/* Bảng danh sách sinh viên */}
          <div className="border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50/50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800">
                <tr>
                  <th className="px-4 py-3 w-10">
                    <input type="checkbox" checked={selectedCount === atRiskStudents.length} onChange={() => setSelectedIds(selectedCount === atRiskStudents.length ? [] : atRiskStudents.map(s => s.id))} className="rounded border-gray-300 text-red-600 focus:ring-red-500" />
                  </th>
                  <th className="px-4 py-3 font-black text-gray-400 uppercase tracking-widest">Mã SV</th>
                  <th className="px-4 py-3 font-black text-gray-400 uppercase tracking-widest">Họ tên</th>
                  <th className="px-4 py-3 font-black text-gray-400 uppercase tracking-widest">Lớp</th>
                  <th className="px-4 py-3 font-black text-gray-400 uppercase tracking-widest">Môn học yếu</th>
                  <th className="px-4 py-3 font-black text-gray-400 uppercase tracking-widest text-center">Điểm</th>
                  <th className="px-4 py-3 font-black text-gray-400 uppercase tracking-widest text-center">Xếp loại</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                {atRiskStudents.map(s => (
                  <tr key={s.id} className={`hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors ${selectedIds.includes(s.id) ? 'bg-red-50/20 dark:bg-red-500/5' : ''}`}>
                    <td className="px-4 py-3">
                      <input type="checkbox" checked={selectedIds.includes(s.id)} onChange={() => toggleSelect(s.id)} className="rounded border-gray-300 text-red-600 focus:ring-red-500" />
                    </td>
                    <td className="px-4 py-3 font-bold text-gray-500">{s.id}</td>
                    <td className="px-4 py-3 font-black text-gray-900 dark:text-white uppercase tracking-tight">{s.name}</td>
                    <td className="px-4 py-3 font-bold text-gray-500">{s.class}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {s.subjects.map((sub, i) => (
                          <span key={i} className="px-2 py-0.5 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 rounded-md text-[9px] font-black uppercase tracking-tighter border border-red-100 dark:border-red-500/20">
                            {sub}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3 font-black text-center text-red-600">{s.gpa.toFixed(2)}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`px-2 py-1 rounded-lg text-[9px] font-black uppercase tracking-tighter ${s.rank === 'Yếu' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>
                        {s.rank}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Thanh tổng hợp */}
          <div className="p-4 bg-gray-50/50 dark:bg-gray-800/50 rounded-2xl flex items-center justify-between border border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-6">
              <div className="text-[11px] font-black text-gray-500 uppercase tracking-widest">Tổng hợp: <span className="text-gray-900 dark:text-white">Đã chọn {selectedCount} / {atRiskStudents.length} SV</span></div>
              <div className="text-[11px] font-black text-gray-500 uppercase tracking-widest">Phân loại: <span className="text-amber-600">Yếu: {yeuCount}</span> | <span className="text-red-600">Kém: {kemCount}</span></div>
            </div>
          </div>

          {/* Đối tượng & AI */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <label className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-tight">Đối tượng & Phân loại AI</label>
              <div className="flex gap-2">
                <span className="flex items-center gap-1.5 px-3 py-1 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 rounded-full text-[10px] font-black uppercase border border-indigo-100 dark:border-indigo-500/20">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-600"></div> Nguy cơ cao ({kemCount})
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1 bg-rose-50 dark:bg-rose-500/10 text-rose-600 rounded-full text-[10px] font-black uppercase border border-rose-100 dark:border-rose-500/20">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-600"></div> Nguy cơ rớt ({yeuCount})
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 dark:bg-gray-800 text-gray-500 rounded-full text-[10px] font-black uppercase border border-gray-200 dark:border-gray-700">
                   SMS & Zalo
                </span>
              </div>
            </div>

            <div className="p-4 bg-blue-50/50 dark:bg-blue-500/5 rounded-2xl border border-blue-100 dark:border-blue-500/10 flex gap-4 items-start shadow-inner">
              <div className="p-2 bg-blue-600 rounded-xl text-white shadow-lg shadow-blue-500/20">
                <Sparkles size={16} />
              </div>
              <p className="text-[11px] text-blue-700 dark:text-blue-400 font-bold leading-relaxed italic">
                <span className="font-black uppercase tracking-tight mr-1 underline">Gợi ý chiến lược AI:</span> 
                Nhóm này có <span className="text-blue-900 dark:text-blue-200 font-black">80% phản hồi tốt hơn</span> khi nhận tin nhắn mang tính động viên thay vì nhắc nhở kỷ luật. Khoa nên tập trung vào việc hỗ trợ lộ trình thay vì cảnh báo điểm số.
              </p>
            </div>
          </div>

          {/* Nội dung thông báo */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-tight">Nội dung thông báo</label>
              <div className="flex gap-1.5">
                {['{{tên_sinh_viên}}', '{{điểm_số}}', '{{tên_môn}}', '{{lớp}}'].map(tag => (
                  <span key={tag} className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-500 rounded-lg text-[9px] font-bold border border-gray-200 dark:border-gray-700 cursor-default shadow-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <textarea 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full h-40 p-5 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-800 focus:ring-2 focus:ring-red-500 outline-none text-xs font-bold text-gray-700 dark:text-gray-300 resize-none leading-relaxed shadow-inner"
            />
            <div className="flex items-center gap-2 text-gray-400">
              <Info size={14} />
              <span className="text-[9px] font-bold italic tracking-tight">Gợi ý AI: Sử dụng cá nhân hóa giúp tăng 40% tỷ lệ phản hồi từ sinh viên.</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 bg-gray-50/50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-800 flex justify-end gap-3 shrink-0">
          <button onClick={onClose} className="px-8 py-3 text-[12px] font-black text-gray-500 uppercase tracking-widest hover:bg-gray-200 dark:hover:bg-gray-700 rounded-2xl transition-all">
            Hủy
          </button>
          <button 
            disabled={isSending || isDone || selectedCount === 0}
            onClick={handleSend}
            className={`flex items-center gap-3 px-10 py-3 rounded-2xl text-[12px] font-black uppercase tracking-widest transition-all shadow-xl active:scale-95 ${
              isDone ? 'bg-emerald-500 text-white' : 'bg-red-600 hover:bg-red-700 text-white shadow-red-500/30'
            }`}
          >
            {isSending ? 'ĐANG GỬI...' : isDone ? 'ĐÃ GỬI XONG' : `Gửi thông báo (${selectedCount})`}
          </button>
        </div>
      </div>
    </div>
  );
};

const AcademicRankingChart = () => {
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [selectedCohort, setSelectedCohort] = useState('2022-2026');
  const [detailGroup, setDetailGroup] = useState(null);
  const [showNotifyModal, setShowNotifyModal] = useState(false);

  const rawData = useMemo(() => getDisplayData(selectedCourse, selectedCohort), [selectedCourse, selectedCohort]);

  const processedData = useMemo(() => {
    return rawData.map(d => {
      const entry = { year: d.year };
      const categories = [
        { key: 'xuatSac', value: d.excellent || 0 },
        { key: 'gioi', value: d.good || 0 },
        { key: 'kha', value: d.kha || 0 },
        { key: 'trungBinhKha', value: d.tbKha || 0 },
        { key: 'trungBinh', value: d.trungBinh || 0 },
        { key: 'yeu', value: d.yeu || 0 },
        { key: 'kem', value: d.kem || 0 }
      ];

      const total = categories.reduce((sum, c) => sum + c.value, 0);
      let currentY = 0;
      
      categories.forEach(c => {
        entry[c.key] = c.value;
        const height = (c.value / (total || 1));
        entry[`c_${c.key}`] = currentY + height / 2;
        currentY += height;
      });
      return entry;
    });
  }, [rawData]);

  const getFilteredStudents = (groupKey) => {
    switch(groupKey) {
      case 'uuTu': return mockStudents.filter(s => ['Xuất sắc', 'Giỏi'].includes(s.rank));
      case 'tiemNang': return mockStudents.filter(s => ['Khá', 'Trung bình Khá'].includes(s.rank));
      case 'canHoTro': return mockStudents.filter(s => ['Trung bình'].includes(s.rank));
      case 'nguyCo': return mockStudents.filter(s => ['Yếu', 'Kém'].includes(s.rank));
      default: return [];
    }
  };

  const kpiGroups = [
    { key: 'uuTu', label: 'Ưu tú (XS/Giỏi)', sub: 'Xuất sắc & Giỏi', value: '37 SV', color: 'emerald', gradient: 'from-emerald-50' },
    { key: 'tiemNang', label: 'Tiềm năng (Khá/TB Khá)', sub: 'Khá & TB Khá', value: '40 SV', color: 'blue', gradient: 'from-blue-50' },
    { key: 'canHoTro', label: 'Cần hỗ trợ (TB)', sub: 'Trung bình', value: '18 SV', color: 'amber', gradient: 'from-amber-50' },
    { key: 'nguyCo', label: 'Nguy cơ (Yếu/Kém)', sub: 'Yếu & Kém', value: '10 SV', color: 'red', gradient: 'from-red-50' }
  ];

  return (
    <div className="space-y-8">
      <RankingDetailModal isOpen={!!detailGroup} onClose={() => setDetailGroup(null)} group={detailGroup || {}} students={detailGroup ? getFilteredStudents(detailGroup.key) : []} />
      <NotificationHubModal isOpen={showNotifyModal} onClose={() => setShowNotifyModal(false)} />
      
      {/* 1. TẦNG TRÊN: BIỂU ĐỒ */}
      <div className="card p-6 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl overflow-hidden relative shadow-sm">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-6 gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-50 dark:bg-purple-500/10 rounded-2xl text-purple-600 dark:text-purple-400 shadow-sm"><AwardIcon size={22} /></div>
            <div>
              <h3 className="text-lg font-black text-gray-900 dark:text-white tracking-tight uppercase">Phân bổ Xếp loại học lực</h3>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-0.5 italic">Số liệu thống kê 4 năm • Đường nối tâm điểm chuẩn xác</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            {/* Course Selector */}
            <div className="relative group">
              <select 
                value={selectedCourse} 
                onChange={(e) => setSelectedCourse(e.target.value)} 
                className="pl-4 pr-12 py-2.5 border-none rounded-2xl text-[10px] font-black uppercase tracking-widest bg-gray-50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-200 outline-none appearance-none cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-all min-w-[180px] shadow-sm"
              >
                {courses.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
              <ArrowUpDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-hover:text-indigo-500 transition-colors" />
            </div>

            {/* Cohort Selector */}
            <div className="relative group">
              <select 
                value={selectedCohort} 
                onChange={(e) => setSelectedCohort(e.target.value)} 
                className="pl-4 pr-12 py-2.5 border-none rounded-2xl text-[10px] font-black uppercase tracking-widest bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 outline-none appearance-none cursor-pointer hover:bg-indigo-100/50 dark:hover:bg-indigo-900/50 transition-all min-w-[140px] shadow-sm"
              >
                {COHORTS.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
              <Sparkles size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-indigo-400 pointer-events-none group-hover:scale-110 transition-transform" />
            </div>
          </div>
        </div>

        <div className="h-[320px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={processedData} stackOffset="expand" margin={{ top: 20, right: 80, left: 80, bottom: 20 }}>
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
              <Tooltip cursor={{ fill: '#f1f5f9', opacity: 0.3 }} content={<CustomTooltip />} />

              {CATEGORY_KEYS.map((key, idx) => (
                <Bar 
                  key={`bar-${key}`} dataKey={key} stackId="a" fill={`url(#grad-${key})`} barSize={32}
                  radius={idx === 0 ? [0, 0, 10, 10] : idx === CATEGORY_KEYS.length - 1 ? [10, 10, 0, 0] : [0, 0, 0, 0]}
                />
              ))}

              {CATEGORY_KEYS.map((key) => (
                <Line
                  key={`line-${key}`}
                  type="monotone"
                  dataKey={`c_${key}`}
                  stroke={COLORS[key]}
                  strokeWidth={1.5}
                  strokeOpacity={0.4}
                  dot={{ r: 4, fill: 'white', stroke: COLORS[key], strokeWidth: 1.5, opacity: 0.8 }}
                  activeDot={false}
                  isAnimationActive={false}
                />
              ))}
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800 flex flex-wrap justify-center gap-x-6 gap-y-3">
          {[
            { name: "Xuất sắc", key: "xuatSac" },
            { name: "Giỏi", key: "gioi" },
            { name: "Khá", key: "kha" },
            { name: "Trung bình Khá", key: "trungBinhKha" },
            { name: "Trung bình", key: "trungBinh" },
            { name: "Yếu", key: "yeu" },
            { name: "Kém", key: "kem" },
          ].map((cat) => (
            <div key={cat.key} className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full shadow-sm" style={{ backgroundColor: COLORS[cat.key] }}></div>
              <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">{cat.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 2. TẦNG GIỮA: 4 THẺ KPI */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiGroups.map((stat, i) => (
          <div key={i} onClick={() => setDetailGroup(stat)} className={`p-5 rounded-3xl border-l-4 border-l-${stat.color}-500 bg-white dark:bg-gray-800 shadow-sm transition-all hover:scale-[1.03] cursor-pointer active:scale-95 group relative overflow-hidden`}>
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

      {/* 3. TẦNG DƯỚI CÙNG: NÚT CHỨC NĂNG */}
      <div className="flex justify-start gap-4 py-4 px-2">
        <button 
          onClick={() => setShowNotifyModal(true)}
          className="flex items-center gap-2 px-10 py-4 bg-red-600 hover:bg-red-700 text-white rounded-[24px] text-[13px] font-black uppercase tracking-tight shadow-xl shadow-red-500/25 transition-all hover:scale-105 active:scale-95"
        >
          <Bell size={18} fill="currentColor" />
          Gửi thông báo & Hỗ trợ học tập
        </button>
        <button 
          onClick={() => alert('Hệ thống đang trích xuất dữ liệu và khởi tạo tệp báo cáo Excel (.xlsx)...')}
          className="flex items-center gap-2 px-10 py-4 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-[24px] text-[13px] font-black uppercase tracking-tight shadow-sm transition-all hover:scale-105 active:scale-95 border border-gray-200/50 dark:border-white/5"
        >
          <FileText size={18} className="text-purple-500" />
          Xuất báo cáo (Excel)
        </button>
      </div>
    </div>
  );
};

export default React.memo(AcademicRankingChart);
