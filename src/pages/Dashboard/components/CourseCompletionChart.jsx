import React, { useState, useMemo } from 'react';
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  LabelList
} from 'recharts';
import {
  ChevronUp,
  ChevronDown,
  MousePointer2,
  FileText,
  Send,
  Calendar as CalendarIcon,
  Download,
  CheckCircle2
} from 'lucide-react';
import DrillDownModal from './DrillDownModal';
import CourseSummaryCards from './CourseSummaryCards';
import ImprovementPlanModal from './ImprovementPlanModal';
import AssignTaskModal from './AssignTaskModal';
import MeetingModal from './MeetingModal';

const courses = [
  { id: 'intro-prog', name: 'Nhập môn lập trình' },
  { id: 'prog-tech', name: 'Kỹ thuật lập trình' },
  { id: 'oop', name: 'Lập trình hướng đối tượng' },
  { id: 'dsa', name: 'Cấu trúc dữ liệu & GT' },
  { id: 'database', name: 'Cơ sở dữ liệu' },
  { id: 'web-dev', name: 'Lập trình Web' },
  { id: 'mobile-dev', name: 'Lập trình Di động' }
];

const mockDataMap = {
  'intro-prog': [
    { year: '2022', completion: 75, fail: 15, pending: 10, totalStudents: 450, classes: 12 },
    { year: '2023', completion: 78, fail: 12, pending: 10, totalStudents: 480, classes: 13 },
    { year: '2024', completion: 82, fail: 10, pending: 8, totalStudents: 520, classes: 14 },
    { year: '2025', completion: 88, fail: 7, pending: 5, totalStudents: 550, classes: 15 }
  ],
  'prog-tech': [
    { year: '2022', completion: 65, fail: 25, pending: 10, totalStudents: 400, classes: 10 },
    { year: '2023', completion: 68, fail: 22, pending: 10, totalStudents: 420, classes: 11 },
    { year: '2024', completion: 72, fail: 18, pending: 10, totalStudents: 450, classes: 12 },
    { year: '2025', completion: 76, fail: 15, pending: 9, totalStudents: 480, classes: 13 }
  ],
  'oop': [
    { year: '2022', completion: 70, fail: 20, pending: 10, totalStudents: 380, classes: 9 },
    { year: '2023', completion: 72, fail: 18, pending: 10, totalStudents: 400, classes: 10 },
    { year: '2024', completion: 75, fail: 15, pending: 10, totalStudents: 430, classes: 11 },
    { year: '2025', completion: 80, fail: 12, pending: 8, totalStudents: 460, classes: 12 }
  ],
  'dsa': [
    { year: '2022', completion: 55, fail: 35, pending: 10, totalStudents: 420, classes: 11 },
    { year: '2023', completion: 58, fail: 32, pending: 10, totalStudents: 440, classes: 12 },
    { year: '2024', completion: 62, fail: 28, pending: 10, totalStudents: 470, classes: 13 },
    { year: '2025', completion: 68, fail: 22, pending: 10, totalStudents: 500, classes: 14 }
  ],
  'database': [
    { year: '2022', completion: 58, fail: 30, pending: 12, totalStudents: 400, classes: 10 },
    { year: '2023', completion: 60, fail: 28, pending: 12, totalStudents: 420, classes: 11 },
    { year: '2024', completion: 65, fail: 20, pending: 15, totalStudents: 450, classes: 12 },
    { year: '2025', completion: 70, fail: 15, pending: 15, totalStudents: 480, classes: 13 }
  ],
  'web-dev': [
    { year: '2022', completion: 82, fail: 10, pending: 8, totalStudents: 350, classes: 8 },
    { year: '2023', completion: 85, fail: 8, pending: 7, totalStudents: 380, classes: 9 },
    { year: '2024', completion: 88, fail: 7, pending: 5, totalStudents: 410, classes: 10 },
    { year: '2025', completion: 92, fail: 5, pending: 3, totalStudents: 440, classes: 11 }
  ],
  'mobile-dev': [
    { year: '2022', completion: 60, fail: 25, pending: 15, totalStudents: 300, classes: 7 },
    { year: '2023', completion: 65, fail: 20, pending: 15, totalStudents: 320, classes: 8 },
    { year: '2024', completion: 70, fail: 15, pending: 15, totalStudents: 350, classes: 9 },
    { year: '2025', completion: 78, fail: 12, pending: 10, totalStudents: 380, classes: 10 }
  ]
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const isComparing = data.compareCompletion !== undefined;

    return (
      <div className="bg-slate-900 text-white p-5 rounded-2xl shadow-2xl border border-slate-800 animate-in fade-in zoom-in-95 duration-200 min-w-[200px]">
        <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-2">
          <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Năm {label}</p>
          <span className="text-[9px] font-black bg-indigo-500/20 text-indigo-400 px-2 py-0.5 rounded-lg uppercase tracking-tighter">Đối soát dữ liệu</span>
        </div>

        <div className="space-y-4">
          {/* Môn chính */}
          <div className="space-y-2">
            <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
              Môn hiện tại
            </p>
            <div className="flex items-center justify-between gap-8">
              <span className="text-[11px] font-bold text-slate-300">Hoàn thành:</span>
              <span className="text-sm font-black text-emerald-400">{data.completion}%</span>
            </div>
            <div className="flex items-center justify-between gap-8">
              <span className="text-[11px] font-bold text-slate-300">Rớt môn:</span>
              <span className="text-sm font-black text-rose-400">{data.fail}%</span>
            </div>
          </div>

          {/* Môn so sánh (nếu có) */}
          {isComparing && (
            <div className="pt-3 border-t border-slate-800 space-y-2">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-500"></span>
                Môn so sánh
              </p>
              <div className="flex items-center justify-between gap-8">
                <span className="text-[11px] font-bold text-slate-400">Hoàn thành:</span>
                <span className="text-sm font-black text-slate-200">{data.compareCompletion}%</span>
              </div>
              <div className="flex items-center justify-between gap-8">
                <span className="text-[11px] font-bold text-slate-500 italic">Chênh lệch:</span>
                <span className={`text-xs font-black ${(data.completion - data.compareCompletion) >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {(data.completion - data.compareCompletion) >= 0 ? '+' : ''}{data.completion - data.compareCompletion}%
                </span>
              </div>
            </div>
          )}

          <div className="pt-3 border-t border-slate-800 flex justify-between items-center mt-2 opacity-60">
            <div className="text-[9px] text-slate-500 font-bold uppercase">{data.totalStudents} SV</div>
            <div className="text-[9px] text-slate-500 font-bold uppercase">{data.classes} Lớp</div>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

const CourseCompletionChart = () => {
  const [selectedCourse, setSelectedCourse] = useState('intro-prog');
  const [comparisonCourse, setComparisonCourse] = useState('');
  const [yearRange, setYearRange] = useState('2022-2026');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [drillData, setDrillData] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  // States for 4 buttons
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showMeetingModal, setShowMeetingModal] = useState(false);

  // States for AssignTaskModal
  const [selectedInstructorId, setSelectedInstructorId] = useState('gv01');
  const [taskSubject, setTaskSubject] = useState('Cải thiện tỉ lệ hoàn thành môn học');
  const [emailMessage, setEmailMessage] = useState('Kính gửi giảng viên, dựa trên dữ liệu thống kê...');
  const [modalTasks, setModalTasks] = useState([
    { id: 1, title: 'Rà soát lại ngân hàng đề thi', priority: 'Cao', deadline: '2026-05-30' },
    { id: 2, title: 'Hỗ trợ sinh viên có điểm thành phần thấp', priority: 'Trung bình', deadline: '2026-06-05' }
  ]);
  const [newTask, setNewTask] = useState({ title: '', priority: 'Trung bình' });

  // States for MeetingModal
  const [meetingTitle, setMeetingTitle] = useState('Họp bộ môn đột xuất về kết quả học tập');
  const [meetingSubject, setMeetingSubject] = useState('Thảo luận giải pháp nâng cao tỉ lệ hoàn thành...');
  const [meetingType, setMeetingType] = useState('online');
  const [meetingAttendees, setMeetingAttendees] = useState([
    { id: 1, name: 'TS. Trần Thị B', role: 'Trưởng bộ môn', isRequired: true },
    { id: 2, name: 'ThS. Nguyễn Văn A', role: 'Giảng viên chính', isRequired: true },
    { id: 3, name: 'ThS. Lê Hoàng C', role: 'Giảng viên', isRequired: false }
  ]);

  const [instructors, setInstructors] = useState([
    { id: 'gv01', name: 'ThS. Nguyễn Văn A', email: 'anv@university.edu.vn', department: 'CNTT' },
    { id: 'gv02', name: 'TS. Trần Thị B', email: 'btt@university.edu.vn', department: 'Hệ thống thông tin' },
    { id: 'gv03', name: 'ThS. Lê Hoàng C', email: 'clh@university.edu.vn', department: 'Mạng máy tính' }
  ]);

  const chartData = useMemo(() => {
    const primary = mockDataMap[selectedCourse] || [];
    if (!comparisonCourse) return primary;

    const secondary = mockDataMap[comparisonCourse] || [];
    return primary.map((item, idx) => ({
      ...item,
      compareCompletion: secondary[idx]?.completion || 0
    }));
  }, [selectedCourse, comparisonCourse]);

  const handleBarClick = (data) => {
    setDrillData(data);
    setIsModalOpen(true);
  };

  const handleExport = () => {
    setToastMessage('Đang khởi tạo tệp báo cáo... Vui lòng đợi.');
    setTimeout(() => {
      setToastMessage('Đã xuất báo cáo thành công! Tải xuống tự động bắt đầu.');
      setTimeout(() => setToastMessage(''), 3000);
    }, 1500);
  };

  const handleAddMember = () => {
    const newMember = {
      id: Date.now(),
      name: 'Giảng viên mới',
      role: 'Giảng viên',
      isRequired: false
    };
    setMeetingAttendees([...meetingAttendees, newMember]);
    setToastMessage('Đã thêm một thành viên mặc định. Vui lòng chỉnh sửa thông tin.');
    setTimeout(() => setToastMessage(''), 3000);
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden relative">
      {/* Modals */}
      <DrillDownModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} data={drillData} />

      <ImprovementPlanModal
        isOpen={showPlanModal}
        onClose={() => setShowPlanModal(false)}
        courseName={courses.find(c => c.id === selectedCourse)?.name}
        setToastMessage={(msg) => {
          setToastMessage(msg);
          setTimeout(() => setToastMessage(''), 3000);
        }}
      />

      <AssignTaskModal
        isOpen={showAssignModal}
        onClose={() => setShowAssignModal(false)}
        selectedInstructorId={selectedInstructorId}
        setSelectedInstructorId={setSelectedInstructorId}
        allInstructors={instructors}
        setAllInstructors={setInstructors}
        taskSubject={taskSubject}
        setTaskSubject={setTaskSubject}
        emailMessage={emailMessage}
        setEmailMessage={setEmailMessage}
        modalTasks={modalTasks}
        setModalTasks={setModalTasks}
        newTask={newTask}
        setNewTask={setNewTask}
        emailCC={['truongkhoa@edu.vn', 'pdt@edu.vn']}
        emailAttachments={['Báo-cáo-chi-tiết.pdf', 'Danh-sách-SV-nguy-cơ.xlsx']}
        setToastMessage={(msg) => {
          setToastMessage(msg);
          setTimeout(() => setToastMessage(''), 3000);
        }}
      />

      <MeetingModal
        isOpen={showMeetingModal}
        onClose={() => setShowMeetingModal(false)}
        meetingTitle={meetingTitle}
        setMeetingTitle={setMeetingTitle}
        meetingSubject={meetingSubject}
        setMeetingSubject={setMeetingSubject}
        meetingAttendees={meetingAttendees}
        setMeetingAttendees={setMeetingAttendees}
        onAddAttendee={handleAddMember}
        meetingType={meetingType}
        setMeetingType={setMeetingType}
        setToastMessage={(msg) => {
          setToastMessage(msg);
          setTimeout(() => setToastMessage(''), 3000);
        }}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[200] animate-in slide-in-from-bottom-5 duration-300">
          <div className="bg-slate-900 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-slate-700">
            <CheckCircle2 className="text-emerald-400" size={20} />
            <span className="text-sm font-bold">{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Header section */}
      <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between mb-8 gap-6">
        <div>
          <h3 className="text-xl font-black text-gray-900 dark:text-white tracking-tight flex items-center gap-2">
            Tỉ lệ hoàn thành môn học
          </h3>
          <p className="text-xs text-gray-500 font-medium mt-1">Phân tích xu hướng • Click vào cột để xem chi tiết các lớp đóng góp</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="px-4 py-2 border rounded-xl text-sm font-bold bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 outline-none focus:ring-2 focus:ring-indigo-500/20 cursor-pointer"
          >
            {courses.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>

          <select
            value={comparisonCourse}
            onChange={(e) => setComparisonCourse(e.target.value)}
            className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-bold bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 outline-none focus:ring-2 focus:ring-indigo-500/20 cursor-pointer transition-colors"
          >
            <option value="">So sánh với...</option>
            {courses.filter(c => c.id !== selectedCourse).map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>

          <select
            value={yearRange}
            onChange={(e) => setYearRange(e.target.value)}
            className="px-4 py-2 border rounded-xl text-sm font-bold bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 outline-none focus:ring-2 focus:ring-indigo-500/20 cursor-pointer"
          >
            <option value="2022-2026">2022-2026</option>
            <option value="2018-2022">2018-2022</option>
            <option value="2024-2028">2024-2028</option>
          </select>
        </div>
      </div>

      {/* Chart Area */}
      <div className="h-[320px] w-full mb-8">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#cbd5e1" strokeOpacity={0.5} />

            <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12, fontWeight: 700 }} dy={10} />
            <YAxis 
              tick={{ fontSize: 10, fontWeight: 'bold', fill: '#94a3b8' }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => `${value}%`}
              domain={[0, 100]}
              ticks={[0, 25, 50, 75, 100]}
            />

            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f1f5f9', radius: 10 }} />

            <ReferenceLine 
              y={75} 
              stroke="#64748b" 
              strokeDasharray="5 5" 
              strokeWidth={1}
              label={{ 
                value: 'MỨC CHUẨN (75%)', 
                position: 'insideBottomRight', 
                fill: '#64748b', 
                fontSize: 9, 
                fontWeight: 'bold',
                offset: 10
              }} 
            />

            <Bar
              dataKey="completion"
              fill="#2563eb"
              radius={[8, 8, 0, 0]}
              barSize={comparisonCourse ? 30 : 50}
              name="Hoàn thành"
              className="cursor-pointer hover:opacity-80 transition-opacity"
              onClick={handleBarClick}
            >
              {!comparisonCourse && (
                <LabelList
                  dataKey="completion"
                  position="top"
                  formatter={(val) => `${val}%`}
                  style={{ fill: '#2563eb', fontSize: 12, fontWeight: 900 }}
                  offset={10}
                />
              )}
            </Bar>

            {comparisonCourse && (
              <Bar dataKey="compareCompletion" fill="#94a3b8" radius={[8, 8, 0, 0]} barSize={30} name="So sánh" onClick={handleBarClick} className="cursor-pointer" />
            )}

            <Line type="monotone" dataKey="completion" stroke="#2563eb" strokeWidth={3} dot={{ r: 4, fill: '#2563eb' }} name="Xu hướng" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* SUMMARY CARDS */}
      <CourseSummaryCards />

      {/* ACTION BUTTONS */}
      <div className="flex flex-wrap items-center gap-3 mt-8 border-t border-gray-100 dark:border-gray-800 pt-8">
        <button
          onClick={() => setShowPlanModal(true)}
          className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl text-sm font-black shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all hover:-translate-y-0.5 active:translate-y-0"
        >
          <FileText size={18} />
          Tạo kế hoạch cải thiện
        </button>

        <button
          onClick={() => setShowAssignModal(true)}
          className="flex items-center gap-2 px-5 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 rounded-xl text-sm font-bold hover:bg-gray-50 transition-all"
        >
          <Send size={18} />
          Giao nhiệm vụ GV
        </button>

        <button
          onClick={() => setShowMeetingModal(true)}
          className="flex items-center gap-2 px-5 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 rounded-xl text-sm font-bold hover:bg-gray-50 transition-all"
        >
          <CalendarIcon size={18} />
          Lên lịch họp
        </button>

        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-5 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 rounded-xl text-sm font-bold hover:bg-gray-50 transition-all"
        >
          <Download size={18} />
          Xuất báo cáo
        </button>
      </div>
    </div>
  );
};

export default React.memo(CourseCompletionChart);
