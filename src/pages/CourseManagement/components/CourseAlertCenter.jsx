import React, { useState } from 'react';
import { AlertCircle, ChevronRight, Users, FileWarning, X, BookOpen, TrendingDown, TrendingUp, CheckCircle } from 'lucide-react';

const ALERT_DETAILS = {
  1: {
    course: 'Lập trình hướng đối tượng (OOP)',
    issue: 'Tỷ lệ rớt tăng đột biến',
    metric: '28% Fail Rate',
    trend: '↑ 10% so với HK trước',
    action: 'Cần họp tổ bộ môn',
    detail: [
      { label: 'Số sinh viên rớt', value: '34 / 121 SV' },
      { label: 'Điểm trung bình lớp', value: '5.8 / 10' },
      { label: 'Tỉ lệ HK trước', value: '18%' },
      { label: 'Lớp bị ảnh hưởng nhiều nhất', value: '22CT112 (35% fail)' },
      { label: 'Nguyên nhân ghi nhận', value: 'Đề thi HK2 độ khó tăng, bài lab chưa cân bằng' },
    ],
    suggestions: ['Họp tổ bộ môn để review ngân hàng đề thi', 'Tổ chức buổi ôn tập trước kỳ thi', 'Điều chỉnh hệ số bài lab và quiz'],
  },
  2: {
    course: 'Cấu trúc dữ liệu & Giải thuật',
    issue: 'GPA trung bình giảm mạnh',
    metric: '6.2 GPA',
    trend: '↓ 0.8 điểm',
    action: 'Review độ khó đề thi',
    detail: [
      { label: 'GPA hiện tại', value: '6.2 / 10' },
      { label: 'GPA kỳ trước', value: '7.0 / 10' },
      { label: 'Mức giảm', value: '0.8 điểm (11.4%)' },
      { label: 'Số lớp dưới chuẩn 6.5', value: '3 / 5 lớp' },
      { label: 'Kỹ năng yếu nhất', value: 'Đệ quy, Sắp xếp nâng cao' },
    ],
    suggestions: ['Review độ khó đề thi so với chương trình giảng dạy', 'Tăng số buổi bài tập thực hành', 'Cân nhắc thêm tài liệu hỗ trợ cho SV yếu'],
  },
  3: {
    course: 'Kỹ thuật lập trình',
    issue: 'Tỷ lệ hoàn thành (Completion) thấp',
    metric: '72% Completed',
    trend: '3 lớp dưới chuẩn 80%',
    action: 'Kiểm tra tiến độ giảng dạy',
    detail: [
      { label: 'Tỉ lệ hoàn thành hiện tại', value: '72%' },
      { label: 'Chuẩn yêu cầu', value: '≥ 80%' },
      { label: 'Số lớp dưới chuẩn', value: '3 / 4 lớp' },
      { label: 'Lớp thấp nhất', value: '22CT113 (65%)' },
      { label: 'Số bài chưa nộp trung bình', value: '4.2 bài / SV' },
    ],
    suggestions: ['Kiểm tra tiến độ giảng dạy từng lớp', 'Nhắc nhở SV nộp bài trễ hạn', 'Liên hệ cố vấn học tập các lớp bị ảnh hưởng'],
  },
};

const AlertDetailModal = ({ alert, onClose }) => {
  if (!alert) return null;
  const d = ALERT_DETAILS[alert.id];
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl w-full max-w-lg max-h-[85vh] flex flex-col overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-700">
          <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{d.course}</p>
            <h3 className="text-base font-black text-gray-900 dark:text-white">{d.issue}</h3>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors">
            <X size={18} className="text-gray-500" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-2xl">
            <div>
              <p className="text-2xl font-black text-gray-900 dark:text-white">{d.metric}</p>
              <p className="text-xs font-bold text-gray-500 mt-0.5">{d.trend}</p>
            </div>
          </div>
          <div>
            <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Thông tin chi tiết</p>
            <div className="space-y-2">
              {d.detail.map((item, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 dark:border-gray-700">
                  <span className="text-sm text-gray-500">{item.label}</span>
                  <span className="text-sm font-bold text-gray-900 dark:text-white">{item.value}</span>
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
          <button className="px-5 py-2 bg-indigo-600 text-white text-sm font-black rounded-xl hover:bg-indigo-700 transition-colors">Gửi thông báo cho tổ bộ môn</button>
        </div>
      </div>
    </div>
  );
};

const AllReportsModal = ({ onClose }) => (
  <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={onClose}>
    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl w-full max-w-xl max-h-[85vh] flex flex-col overflow-hidden" onClick={e => e.stopPropagation()}>
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-700">
        <h3 className="text-base font-black text-gray-900 dark:text-white">Tất cả báo cáo cảnh báo</h3>
        <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors">
          <X size={18} className="text-gray-500" />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
        {Object.values(ALERT_DETAILS).map((d, i) => (
          <div key={i} className="p-4 border border-gray-100 dark:border-gray-700 rounded-2xl hover:shadow-md transition-all">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{d.course}</p>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-black text-gray-900 dark:text-white">{d.issue}</p>
                <p className="text-xs text-gray-500 mt-0.5">{d.metric} · {d.trend}</p>
              </div>
              <span className="text-xs font-bold text-indigo-600 px-3 py-1 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">{d.action}</span>
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

const CourseAlertCenter = () => {
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [showAllReports, setShowAllReports] = useState(false);

  const alerts = [
    { id: 1, course: 'Lập trình hướng đối tượng (OOP)', issue: 'Tỷ lệ rớt tăng đột biến', metric: '28% Fail Rate', trend: '↑ 10% so với HK trước', type: 'critical', action: 'Cần họp tổ bộ môn' },
    { id: 2, course: 'Cấu trúc dữ liệu & Giải thuật', issue: 'GPA trung bình giảm mạnh', metric: '6.2 GPA', trend: '↓ 0.8 điểm', type: 'warning', action: 'Review độ khó đề thi' },
    { id: 3, course: 'Kỹ thuật lập trình', issue: 'Tỷ lệ hoàn thành (Completion) thấp', metric: '72% Completed', trend: '3 lớp dưới chuẩn 80%', type: 'attention', action: 'Kiểm tra tiến độ giảng dạy' },
  ];

  const getTypeStyles = (type) => {
    switch (type) {
      case 'critical': return 'bg-rose-50 border-rose-100 text-rose-700 dark:bg-rose-900/20 dark:border-rose-800/40';
      case 'warning': return 'bg-amber-50 border-amber-100 text-amber-700 dark:bg-amber-900/20 dark:border-amber-800/40';
      default: return 'bg-blue-50 border-blue-100 text-blue-700 dark:bg-blue-900/20 dark:border-blue-800/40';
    }
  };

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-rose-100 dark:bg-rose-900/30 rounded-2xl animate-pulse">
              <AlertCircle size={22} className="text-rose-600 dark:text-rose-400" />
            </div>
            <div>
              <h3 className="text-lg font-black text-gray-900 dark:text-white uppercase tracking-tight">Trung tâm Cảnh báo Môn học</h3>
              <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-0.5 italic">⚠️ {alerts.length} vấn đề cần xử lý ngay</p>
            </div>
          </div>
          <button
            onClick={() => setShowAllReports(true)}
            className="text-xs font-black text-indigo-600 hover:underline uppercase tracking-widest"
          >
            Xem tất cả báo cáo
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-4 rounded-2xl border ${getTypeStyles(alert.type)} hover:shadow-md transition-all cursor-pointer group relative overflow-hidden`}
              onClick={() => setSelectedAlert(alert)}
            >
              <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                <FileWarning size={40} />
              </div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-black uppercase tracking-widest opacity-80">{alert.course}</span>
                  <ChevronRight size={14} />
                </div>
                <h4 className="text-sm font-black mb-1">{alert.issue}</h4>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-lg font-black">{alert.metric}</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 bg-white/50 dark:bg-black/20 rounded-md">{alert.trend}</span>
                </div>
                <div className="pt-3 border-t border-black/5 dark:border-white/5 flex items-center justify-between">
                  <span className="text-[10px] font-bold italic">💡 {alert.action}</span>
                  <div className="p-1 hover:bg-white/40 dark:hover:bg-black/40 rounded-lg transition-colors">
                    <Users size={14} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedAlert && <AlertDetailModal alert={selectedAlert} onClose={() => setSelectedAlert(null)} />}
      {showAllReports && <AllReportsModal onClose={() => setShowAllReports(false)} />}
    </>
  );
};

export default CourseAlertCenter;
