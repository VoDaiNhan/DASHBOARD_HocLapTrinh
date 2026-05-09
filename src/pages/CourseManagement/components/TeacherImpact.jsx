import React, { useState } from 'react';
import { Award, FileText, TrendingUp, TrendingDown, Minus, Users, X, BarChart2, CheckCircle, Calendar, Download } from 'lucide-react';

const TEACHER_REPORTS = {
  0: {
    name: 'TS. Nguyễn Văn An',
    subject: 'Nhập môn LT, CSDL',
    gpa: 8.1,
    completion: 92,
    risk: 'low',
    students: 125,
    trend: 'up',
    detail: [
      { label: 'Số lớp đang phụ trách', value: '2 lớp (22CT111, 22CT112)' },
      { label: 'Tổng sinh viên', value: '125 SV' },
      { label: 'GPA trung bình', value: '8.1 / 10' },
      { label: 'Tỉ lệ hoàn thành', value: '92%' },
      { label: 'Tỉ lệ đạt', value: '95%' },
      { label: 'Tỉ lệ xuất sắc', value: '22%' },
    ],
    suggestions: ['Tiếp tục phương pháp giảng dạy hiện tại', 'Có thể đảm nhận thêm lớp nâng cao', 'Chia sẻ kinh nghiệm với các giảng viên khác'],
  },
  1: {
    name: 'ThS. Trần Thị Bình',
    subject: 'OOP, CTDLGT',
    gpa: 6.4,
    completion: 71,
    risk: 'high',
    students: 98,
    trend: 'down',
    detail: [
      { label: 'Số lớp đang phụ trách', value: '2 lớp (22CT112, 22CT113)' },
      { label: 'Tổng sinh viên', value: '98 SV' },
      { label: 'GPA trung bình', value: '6.4 / 10 (Dưới chuẩn 7.0)' },
      { label: 'Tỉ lệ hoàn thành', value: '71% (Dưới chuẩn 80%)' },
      { label: 'Tỉ lệ rớt môn OOP', value: '28%' },
      { label: 'Xu hướng', value: 'Giảm so với HK trước' },
    ],
    suggestions: ['Lên kế hoạch hỗ trợ công cụ giảng dạy online', 'Họp tổ bộ môn review nội dung môn OOP', 'Tổ chức buổi phụ đạo cho SV yếu'],
  },
  2: {
    name: 'TS. Lê Văn Cường',
    subject: 'Kỹ thuật lập trình',
    gpa: 7.5,
    completion: 85,
    risk: 'medium',
    students: 110,
    trend: 'stable',
    detail: [
      { label: 'Số lớp đang phụ trách', value: '2 lớp (22CT111, 22CT113)' },
      { label: 'Tổng sinh viên', value: '110 SV' },
      { label: 'GPA trung bình', value: '7.5 / 10' },
      { label: 'Tỉ lệ hoàn thành', value: '85% (Đạt chuẩn)' },
      { label: 'Tỉ lệ rớt môn', value: '12%' },
      { label: 'Xu hướng', value: 'Ổn định so với HK trước' },
    ],
    suggestions: ['Tăng cường bài tập thực hành để cải thiện GPA', 'Theo dõi sát hơn các SV có tiến độ thấp'],
  },
};

const TeacherReportModal = ({ teacher, onClose }) => {
  if (!teacher) return null;
  const d = TEACHER_REPORTS[teacher.idx];
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl w-full max-w-lg max-h-[85vh] flex flex-col overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-700">
          <div>
            <h3 className="text-base font-black text-gray-900 dark:text-white">{d.name}</h3>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">{d.subject}</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-[10px] font-black uppercase rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
              <Download size={12} /> Xuất PDF
            </button>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors">
              <X size={18} className="text-gray-500" />
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-2xl text-center">
              <p className="text-[10px] font-black text-gray-400 uppercase mb-1">GPA TB</p>
              <p className={`text-xl font-black ${d.gpa < 7 ? 'text-red-500' : 'text-gray-900 dark:text-white'}`}>{d.gpa}</p>
            </div>
            <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-2xl text-center">
              <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Completion</p>
              <p className={`text-xl font-black ${d.completion < 80 ? 'text-orange-500' : 'text-emerald-500'}`}>{d.completion}%</p>
            </div>
          </div>
          <div>
            <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Thông tin chi tiết</p>
            <div className="space-y-2">
              {d.detail.map((item, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 dark:border-gray-700">
                  <span className="text-sm text-gray-500">{item.label}</span>
                  <span className="text-sm font-bold text-gray-900 dark:text-white text-right max-w-[55%]">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Đề xuất hành động</p>
            <div className="space-y-2">
              {d.suggestions.map((s, i) => (
                <div key={i} className="flex items-start gap-2 p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl">
                  <CheckCircle size={14} className="text-indigo-500 mt-0.5 shrink-0" />
                  <p className="text-xs font-medium text-indigo-800 dark:text-indigo-300">{s}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-700 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 text-sm font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors">Đóng</button>
        </div>
      </div>
    </div>
  );
};

const StaffDetailModal = ({ onClose }) => (
  <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={onClose}>
    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden" onClick={e => e.stopPropagation()}>
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-700">
        <h3 className="text-base font-black text-gray-900 dark:text-white">Chi tiết nhân sự giảng dạy</h3>
        <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors">
          <X size={18} className="text-gray-500" />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl text-center">
            <p className="text-[10px] font-black text-indigo-400 uppercase mb-1">Tổng giảng viên</p>
            <p className="text-2xl font-black text-indigo-600">3</p>
          </div>
          <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl text-center">
            <p className="text-[10px] font-black text-emerald-400 uppercase mb-1">Hiệu suất TB</p>
            <p className="text-2xl font-black text-emerald-600">82.4%</p>
          </div>
          <div className="p-4 bg-rose-50 dark:bg-rose-900/20 rounded-2xl text-center">
            <p className="text-[10px] font-black text-rose-400 uppercase mb-1">Cần hỗ trợ</p>
            <p className="text-2xl font-black text-rose-600">1</p>
          </div>
        </div>
        {Object.values(TEACHER_REPORTS).map((t, i) => (
          <div key={i} className="p-4 border border-gray-100 dark:border-gray-700 rounded-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-black text-sm text-gray-900 dark:text-white">{t.name}</p>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter mt-0.5">{t.subject} · {t.students} SV</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-black text-gray-900 dark:text-white">GPA {t.gpa}</span>
                <span className={`text-sm font-black ${t.completion < 80 ? 'text-orange-500' : 'text-emerald-500'}`}>{t.completion}%</span>
                <span className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase ${t.risk === 'high' ? 'bg-red-100 text-red-700' : t.risk === 'medium' ? 'bg-orange-100 text-orange-700' : 'bg-emerald-100 text-emerald-700'}`}>
                  {t.risk === 'high' ? 'Cao' : t.risk === 'medium' ? 'TB' : 'Thấp'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-700 flex justify-end">
        <button onClick={onClose} className="px-5 py-2 bg-gray-900 text-white text-sm font-black rounded-xl hover:bg-black transition-colors">Đóng</button>
      </div>
    </div>
  </div>
);

const TeacherImpact = () => {
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [showStaffDetail, setShowStaffDetail] = useState(false);

  const teachers = [
    { name: 'TS. Nguyễn Văn An', subject: 'Nhập môn LT, CSDL', gpa: 8.1, completion: 92, risk: 'low', students: 125, trend: 'up' },
    { name: 'ThS. Trần Thị Bình', subject: 'OOP, CTDLGT', gpa: 6.4, completion: 71, risk: 'high', students: 98, trend: 'down' },
    { name: 'TS. Lê Văn Cường', subject: 'Kỹ thuật lập trình', gpa: 7.5, completion: 85, risk: 'medium', students: 110, trend: 'stable' },
  ];

  const getRiskBadge = (risk) => {
    switch (risk) {
      case 'high': return <span className="px-2 py-0.5 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 rounded-md text-[10px] font-black uppercase">Cao</span>;
      case 'medium': return <span className="px-2 py-0.5 bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 rounded-md text-[10px] font-black uppercase">Trung bình</span>;
      default: return <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 rounded-md text-[10px] font-black uppercase">Thấp</span>;
    }
  };

  const TrendIcon = ({ trend }) => {
    if (trend === 'up') return <TrendingUp size={14} className="text-emerald-500" />;
    if (trend === 'down') return <TrendingDown size={14} className="text-red-500" />;
    return <Minus size={14} className="text-gray-400" />;
  };

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 p-8 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg shadow-blue-100">
              <Award className="text-white" size={24} />
            </div>
            <div>
              <h3 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight">Hiệu quả Giảng dạy (Teacher Impact)</h3>
              <p className="text-sm text-gray-500 font-medium">Đánh giá giảng viên dựa trên hiệu suất học tập của sinh viên</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Hiệu suất trung bình</span>
              <span className="text-lg font-black text-blue-600">82.4%</span>
            </div>
            <div className="h-10 w-px bg-gray-100 dark:bg-gray-700 mx-2"></div>
            <button
              onClick={() => setShowStaffDetail(true)}
              className="px-5 py-2.5 bg-gray-900 text-white text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-black transition-all"
            >
              Chi tiết nhân sự
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teachers.map((t, idx) => (
            <div key={idx} className="p-6 border border-gray-50 dark:border-gray-700 rounded-3xl bg-white dark:bg-gray-800/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
              <div className="flex items-start justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 font-black text-lg group-hover:bg-blue-600 group-hover:text-white transition-all">
                    {t.name[0]}
                  </div>
                  <div>
                    <h4 className="font-black text-gray-900 dark:text-white text-base leading-tight">{t.name}</h4>
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter mt-1">{t.subject}</p>
                  </div>
                </div>
                <TrendIcon trend={t.trend} />
              </div>

              <div className="grid grid-cols-2 gap-4 mb-5 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-2xl">
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">GPA TB</p>
                  <p className={`text-lg font-black ${t.gpa < 7 ? 'text-red-500' : 'text-gray-900 dark:text-white'}`}>{t.gpa}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Completion</p>
                  <p className={`text-lg font-black ${t.completion < 80 ? 'text-orange-500' : 'text-emerald-500'}`}>{t.completion}%</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-bold text-gray-400 uppercase">Rủi ro:</span>
                  {getRiskBadge(t.risk)}
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-500">
                  <Users size={12} /> {t.students} SV
                </div>
              </div>

              <button
                onClick={() => setSelectedTeacher({ ...t, idx })}
                className="w-full mt-5 py-2.5 rounded-xl border border-gray-100 dark:border-gray-700 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-blue-600 hover:border-blue-100 transition-all"
              >
                Báo cáo hiệu quả chi tiết
              </button>
            </div>
          ))}
        </div>
      </div>

      {selectedTeacher && <TeacherReportModal teacher={selectedTeacher} onClose={() => setSelectedTeacher(null)} />}
      {showStaffDetail && <StaffDetailModal onClose={() => setShowStaffDetail(false)} />}
    </>
  );
};

export default TeacherImpact;
