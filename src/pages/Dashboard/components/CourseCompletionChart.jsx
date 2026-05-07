
import React, { useState, useMemo, useCallback } from 'react';
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell, LabelList } from 'recharts';
import { TrendingUp, TrendingDown, Download, Info, ChevronUp, X, AlertTriangle, CheckCircle2, UserX, Mail, FileText, Users, Calendar, Clock, Send, Plus, Trash2, Paperclip, Edit2 } from 'lucide-react';

const courses = [
  { id: 'intro-prog', name: 'Nhập môn lập trình' },
  { id: 'prog-technique', name: 'Kĩ thuật lập trình' },
  { id: 'oop', name: 'Lập trình hướng đối tượng' },
  { id: 'data-struct-algo', name: 'Cấu trúc dữ liệu và giải thuật' },
  { id: 'database', name: 'Cơ sở dữ liệu' },
  { id: 'web-dev', name: 'Phát triển web' },
  { id: 'mobile-dev', name: 'Phát triển ứng dụng di động' },
  { id: 'software-eng', name: 'Công nghệ phần mềm' },
];

const allInstructors = [
  { id: 1, name: 'TS. Nguyễn Văn An', email: 'an.nv@university.edu.vn', department: 'CNTT' },
  { id: 2, name: 'ThS. Trần Thị Bình', email: 'binh.tt@university.edu.vn', department: 'CNTT' },
  { id: 3, name: 'PGS. Ngô Văn Hùng', email: 'hung.nv@university.edu.vn', department: 'CNTT' },
  { id: 4, name: 'TS. Hoàng Thị Em', email: 'em.ht@university.edu.vn', department: 'CNTT' },
];

const completionData = {
  'intro-prog': {
    data: [
      { year: '2022', completion: 75, studentCount: 120, failRate: 12, absenceRate: 8, midtermAvg: 7.2, failedByGrade: 6, dropout: 4, notEligible: 2 },
      { year: '2023', completion: 78, studentCount: 115, failRate: 11, absenceRate: 7, midtermAvg: 7.5, failedByGrade: 5, dropout: 4, notEligible: 2 },
      { year: '2024', completion: 82, studentCount: 110, failRate: 9, absenceRate: 6, midtermAvg: 7.8, failedByGrade: 4, dropout: 3, notEligible: 2 },
      { year: '2025', completion: 88, studentCount: 105, failRate: 7, absenceRate: 5, midtermAvg: 8.1, failedByGrade: 3, dropout: 3, notEligible: 1 },
    ],
    instructor: 'TS. Nguyễn Văn An',
    benchmark: 75,
    target: 85,
    bottleneck: { type: 'class', name: '22CT111', rate: 68 },
  },
  'prog-technique': {
    data: [
      { year: '2022', completion: 70, studentCount: 110, failRate: 15, absenceRate: 10, midtermAvg: 6.8, failedByGrade: 8, dropout: 5, notEligible: 2 },
      { year: '2023', completion: 72, studentCount: 108, failRate: 14, absenceRate: 9, midtermAvg: 7.0, failedByGrade: 7, dropout: 5, notEligible: 2 },
      { year: '2024', completion: 75, studentCount: 105, failRate: 12, absenceRate: 8, midtermAvg: 7.2, failedByGrade: 6, dropout: 4, notEligible: 2 },
      { year: '2025', completion: 79, studentCount: 100, failRate: 10, absenceRate: 7, midtermAvg: 7.5, failedByGrade: 5, dropout: 3, notEligible: 2 },
    ],
    instructor: 'ThS. Trần Thị Bình',
    benchmark: 70,
    target: 80,
    bottleneck: { type: 'class', name: '22CT112', rate: 65 },
  },
  'oop': {
    data: [
      { year: '2022', completion: 68, studentCount: 115, failRate: 18, absenceRate: 12, midtermAvg: 6.5, failedByGrade: 10, dropout: 6, notEligible: 2 },
      { year: '2023', completion: 70, studentCount: 112, failRate: 16, absenceRate: 11, midtermAvg: 6.7, failedByGrade: 9, dropout: 5, notEligible: 2 },
      { year: '2024', completion: 73, studentCount: 108, failRate: 14, absenceRate: 10, midtermAvg: 7.0, failedByGrade: 8, dropout: 4, notEligible: 2 },
      { year: '2025', completion: 76, studentCount: 105, failRate: 12, absenceRate: 9, midtermAvg: 7.3, failedByGrade: 7, dropout: 3, notEligible: 2 },
    ],
    instructor: 'TS. Lê Văn Cường',
    benchmark: 68,
    target: 78,
    bottleneck: { type: 'topic', name: 'Kế thừa & Đa hình', rate: 62 },
  },
  'data-struct-algo': {
    data: [
      { year: '2022', completion: 65, studentCount: 100, failRate: 20, absenceRate: 12, midtermAvg: 6.3, failedByGrade: 11, dropout: 7, notEligible: 2 },
      { year: '2023', completion: 68, studentCount: 98, failRate: 18, absenceRate: 11, midtermAvg: 6.6, failedByGrade: 10, dropout: 6, notEligible: 2 },
      { year: '2024', completion: 71, studentCount: 95, failRate: 16, absenceRate: 10, midtermAvg: 6.9, failedByGrade: 9, dropout: 5, notEligible: 2 },
      { year: '2025', completion: 74, studentCount: 92, failRate: 14, absenceRate: 9, midtermAvg: 7.2, failedByGrade: 8, dropout: 4, notEligible: 2 },
    ],
    instructor: 'PGS. Phạm Văn Đức',
    benchmark: 65,
    target: 75,
    bottleneck: { type: 'topic', name: 'Cây nhị phân', rate: 58 },
  },
  'database': {
    data: [
      { year: '2022', completion: 80, studentCount: 105, failRate: 10, absenceRate: 7, midtermAvg: 7.8, failedByGrade: 5, dropout: 3, notEligible: 2 },
      { year: '2023', completion: 82, studentCount: 102, failRate: 9, absenceRate: 6, midtermAvg: 8.0, failedByGrade: 4, dropout: 3, notEligible: 2 },
      { year: '2024', completion: 85, studentCount: 100, failRate: 8, absenceRate: 5, midtermAvg: 8.2, failedByGrade: 4, dropout: 2, notEligible: 2 },
      { year: '2025', completion: 87, studentCount: 98, failRate: 7, absenceRate: 4, midtermAvg: 8.4, failedByGrade: 3, dropout: 2, notEligible: 2 },
    ],
    instructor: 'TS. Hoàng Thị Em',
    benchmark: 80,
    target: 88,
    bottleneck: { type: 'class', name: '22CT115', rate: 75 },
  },
  'web-dev': {
    data: [
      { year: '2022', completion: 77, studentCount: 95, failRate: 12, absenceRate: 8, midtermAvg: 7.5, failedByGrade: 6, dropout: 4, notEligible: 2 },
      { year: '2023', completion: 79, studentCount: 93, failRate: 11, absenceRate: 7, midtermAvg: 7.7, failedByGrade: 5, dropout: 4, notEligible: 2 },
      { year: '2024', completion: 81, studentCount: 90, failRate: 10, absenceRate: 6, midtermAvg: 7.9, failedByGrade: 5, dropout: 3, notEligible: 2 },
      { year: '2025', completion: 84, studentCount: 88, failRate: 9, absenceRate: 5, midtermAvg: 8.1, failedByGrade: 4, dropout: 3, notEligible: 2 },
    ],
    instructor: 'ThS. Vũ Văn Phúc',
    benchmark: 77,
    target: 85,
    bottleneck: { type: 'topic', name: 'React Hooks', rate: 70 },
  },
  'mobile-dev': {
    data: [
      { year: '2022', completion: 72, studentCount: 85, failRate: 14, absenceRate: 10, midtermAvg: 7.0, failedByGrade: 7, dropout: 5, notEligible: 2 },
      { year: '2023', completion: 74, studentCount: 83, failRate: 13, absenceRate: 9, midtermAvg: 7.2, failedByGrade: 6, dropout: 5, notEligible: 2 },
      { year: '2024', completion: 77, studentCount: 80, failRate: 12, absenceRate: 8, midtermAvg: 7.4, failedByGrade: 6, dropout: 4, notEligible: 2 },
      { year: '2025', completion: 80, studentCount: 78, failRate: 10, absenceRate: 7, midtermAvg: 7.6, failedByGrade: 5, dropout: 3, notEligible: 2 },
    ],
    instructor: 'TS. Đỗ Thị Giang',
    benchmark: 72,
    target: 82,
    bottleneck: { type: 'topic', name: 'State Management', rate: 65 },
  },
  'software-eng': {
    data: [
      { year: '2022', completion: 78, studentCount: 90, failRate: 11, absenceRate: 8, midtermAvg: 7.6, failedByGrade: 5, dropout: 4, notEligible: 2 },
      { year: '2023', completion: 80, studentCount: 88, failRate: 10, absenceRate: 7, midtermAvg: 7.8, failedByGrade: 5, dropout: 3, notEligible: 2 },
      { year: '2024', completion: 83, studentCount: 85, failRate: 9, absenceRate: 6, midtermAvg: 8.0, failedByGrade: 4, dropout: 3, notEligible: 2 },
      { year: '2025', completion: 86, studentCount: 83, failRate: 8, absenceRate: 5, midtermAvg: 8.2, failedByGrade: 4, dropout: 2, notEligible: 2 },
    ],
    instructor: 'PGS. Ngô Văn Hùng',
    benchmark: 78,
    target: 87,
    bottleneck: { type: 'class', name: '22CT118', rate: 72 },
  },
};

const CustomLegend = (props) => {
  const { payload } = props;
  return (
    <ul className="flex justify-center items-center gap-4 pt-4">
      {payload.map((entry, index) => (
        <li key={`item-${index}`} className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800/50 px-3 py-1.5 rounded-full border border-gray-100 dark:border-gray-700">
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color }}></span>
          <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{entry.value}</span>
        </li>
      ))}
    </ul>
  );
};

const CustomTooltip = ({ active, payload, label, selectedCourse, compareCourse }) => {
  if (active && payload && payload.length) {
    const currentYear = label;
    const dataObj = completionData[selectedCourse]?.data.find(d => d.year === currentYear) || {};
    const compareDataObj = compareCourse ? completionData[compareCourse]?.data.find(d => d.year === currentYear) || {} : null;
    const previousYearData = completionData[selectedCourse]?.data.find(d => d.year === String(parseInt(currentYear) - 1));

    const completion = dataObj.completion;
    const benchmark = 75;
    const vsLastYear = previousYearData ? completion - previousYearData.completion : null;

    const studentCount = dataObj.studentCount || 0;
    const failedByGrade = dataObj.failedByGrade || 0;
    const dropout = dataObj.dropout || 0;
    const notEligible = dataObj.notEligible || 0;
    const totalFailed = failedByGrade + dropout + notEligible;
    const totalPassed = studentCount - totalFailed;

    return (
      <div className="bg-white dark:bg-gray-800 px-5 py-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-600 min-w-[280px]">
        <p className="font-bold text-gray-500 dark:text-gray-400 mb-3 text-xs uppercase tracking-wider">Năm {label}</p>

        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {compareCourse ? courses.find(c => c.id === selectedCourse)?.name : 'Tỉ lệ hoàn thành'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg text-gray-900 dark:text-white">{completion}%</span>
                {!compareCourse && vsLastYear !== null && (
                  <span className={`text-xs font-semibold ${vsLastYear >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {vsLastYear >= 0 ? '▲' : '▼'} {Math.abs(vsLastYear).toFixed(1)}%
                  </span>
                )}
              </div>
            </div>

            {compareCourse && compareDataObj && (
              <>
                <div className="flex items-center justify-between mb-1 mt-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {courses.find(c => c.id === compareCourse)?.name}
                    </span>
                  </div>
                  <span className="font-bold text-lg text-gray-900 dark:text-white">{compareDataObj.completion}%</span>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                  <span className="text-xs text-gray-500 dark:text-gray-400">Chênh lệch</span>
                  <span className={`font-bold text-sm px-2 py-0.5 rounded ${completion - compareDataObj.completion >= 0 ? 'bg-green-50 text-green-600 dark:bg-green-900/30' : 'bg-red-50 text-red-600 dark:bg-red-900/30'}`}>
                    {completion - compareDataObj.completion >= 0 ? '+' : ''}{(completion - compareDataObj.completion).toFixed(1)}%
                  </span>
                </div>
              </>
            )}

            {!compareCourse && completion < benchmark && (
              <div className="flex items-center text-xs text-orange-600 bg-orange-50 dark:bg-orange-900/20 px-2 py-1.5 rounded mt-2">
                <AlertTriangle className="w-3.5 h-3.5 mr-1.5" />
                <span>Dưới mức chuẩn KPI ({benchmark}%)</span>
              </div>
            )}
          </div>

          {!compareCourse && (
            <>
              <div className="grid grid-cols-2 gap-2 bg-slate-50 dark:bg-gray-800/50 p-2.5 rounded-lg border border-slate-100 dark:border-gray-700">
                <div>
                  <span className="text-gray-500 block text-xs mb-0.5">Đạt</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{totalPassed} SV</span>
                </div>
                <div>
                  <span className="text-gray-500 block text-xs mb-0.5">Không hoàn thành</span>
                  <span className="font-semibold text-red-500">{totalFailed} SV</span>
                </div>
              </div>

              {totalFailed > 0 && (
                <div className="text-xs">
                  <p className="font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Phân tích nguyên nhân:</p>
                  <ul className="space-y-1.5 text-gray-600 dark:text-gray-400 ml-1">
                    {failedByGrade > 0 && <li>• Trượt điểm: <span className="font-medium text-gray-900 dark:text-white">{failedByGrade}</span></li>}
                    {dropout > 0 && <li>• Bỏ học: <span className="font-medium text-gray-900 dark:text-white">{dropout}</span></li>}
                    {notEligible > 0 && <li>• Thiếu điều kiện: <span className="font-medium text-gray-900 dark:text-white">{notEligible}</span></li>}
                  </ul>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    );
  }
  return null;
};

const CourseCompletionChart = () => {
  const [selectedCourse, setSelectedCourse] = useState('intro-prog');
  const [compareCourse, setCompareCourse] = useState('');
  const [selectedYear, setSelectedYear] = useState('2022-2026');

  const data = completionData[selectedCourse]?.data || [];
  const courseInfo = completionData[selectedCourse] || {};
  const compareData = compareCourse ? completionData[compareCourse]?.data || [] : [];



  const [showStudentListModal, setShowStudentListModal] = useState(false);
  const [showBottleneckModal, setShowBottleneckModal] = useState(false);
  const [showClassBreakdownModal, setShowClassBreakdownModal] = useState(false);
  const [selectedBreakdownData, setSelectedBreakdownData] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [showMeetingModal, setShowMeetingModal] = useState(false);
  const [showDirectoryModal, setShowDirectoryModal] = useState(false);
  const [directorySearch, setDirectorySearch] = useState('');
  const [showAssignTaskModal, setShowAssignTaskModal] = useState(false);
  const [modalTasks, setModalTasks] = useState([
    { id: 1, title: 'Phụ đạo SV yếu lớp 22CT111', priority: 'Cao', deadline: '2026-05-30' },
  ]);
  const [newTask, setNewTask] = useState({ title: '', priority: 'Trung bình', deadline: '' });
  const [selectedInstructorId, setSelectedInstructorId] = useState(1);
  const [taskSubject, setTaskSubject] = useState('');
  const [emailCC, setEmailCC] = useState(['Trưởng bộ môn', 'Phòng Đào tạo']);
  const [emailAttachments, setEmailAttachments] = useState(['danh-sach-sv-yeu.pdf', 'bao-cao-phan-tich-ky-4.xlsx']);
  const [meetingType, setMeetingType] = useState('direct');

  const [emailMessage, setEmailMessage] = useState('');
  const [meetingTitle, setMeetingTitle] = useState('Lên lịch họp hội đồng bộ môn');
  const [meetingSubject, setMeetingSubject] = useState('');
  const [meetingAttendees, setMeetingAttendees] = useState([
    { id: 1, name: 'TS. Nguyễn Văn An', role: 'Trưởng bộ môn', isRequired: true },
    { id: 2, name: 'TS. Nguyễn Văn An', role: 'Giảng viên phụ trách', isRequired: true },
  ]);





  // Update meeting subject when course info changes
  useMemo(() => {
    if (courseInfo.bottleneck) {
      setMeetingSubject(`Giải quyết tình trạng tỉ lệ hoàn thành thấp tại lớp ${courseInfo.bottleneck.name} (${courseInfo.bottleneck.rate}%).`);
    } else {
      setMeetingSubject('Thảo luận về hiệu suất hoàn thành môn học và các giải pháp cải thiện.');
    }
  }, [courseInfo.bottleneck]);

  // Auto-generate subject and message when course changes
  useMemo(() => {
    const courseName = courses.find(c => c.id === selectedCourse)?.name;
    const instructorName = allInstructors.find(i => i.id === selectedInstructorId)?.name;
    setTaskSubject(`[Nhiệm vụ] Điều phối & Cải thiện tỉ lệ hoàn thành - Môn: ${courseName}`);
    setEmailMessage(`Dựa trên báo cáo hiệu suất chi tiết và phân tích biến động kết quả học tập từ Dashboard Quản lý, tôi xin chính thức giao cho anh/chị danh sách các nhiệm vụ chiến lược sau đây để đảm bảo chất lượng đào tạo.`);
  }, [selectedCourse, selectedInstructorId]);

  const SCHOOL_BENCHMARK = 75;

  const chartData = useMemo(() => {
    if (!compareCourse) {
      return data.map(d => ({
        year: d.year,
        completion: d.completion,
        benchmark: SCHOOL_BENCHMARK
      }));
    }

    const years = ['2022', '2023', '2024', '2025'];
    return years.map(year => {
      const mainData = data.find(d => d.year === year) || {};
      const compData = compareData.find(d => d.year === year) || {};
      return {
        year,
        completion: mainData.completion,
        completionCompare: compData.completion,
        benchmark: SCHOOL_BENCHMARK
      };
    });
  }, [data, compareData, compareCourse]);

  // Analytics
  const analytics = useMemo(() => {
    if (data.length === 0) return { trend: 'stable', avgGrowth: 0, latest: 0, causes: [], shortTermTrend: 0, prediction: 0 };

    const latest = data[data.length - 1].completion;
    const first = data[0].completion;
    const growth = latest - first;
    const avgGrowth = (growth / (data.length - 1)).toFixed(1);

    // Short-term trend (last 2 years)
    const shortTermTrend = data.length >= 2 ? data[data.length - 1].completion - data[data.length - 2].completion : 0;

    // Simple prediction (extrapolate)
    const prediction = latest + parseFloat(avgGrowth);

    let trend = 'stable';
    if (growth > 5) trend = 'increasing';
    else if (growth < -5) trend = 'decreasing';

    const causes = [];
    if (data[data.length - 1].failRate > 15) causes.push('Tỷ lệ rớt cao');
    if (data[data.length - 1].absenceRate > 10) causes.push('Tỷ lệ vắng cao');
    if (data[data.length - 1].midtermAvg < 7.0) causes.push('Điểm giữa kỳ thấp');

    return { trend, avgGrowth, latest, first, growth, causes, shortTermTrend, prediction };
  }, [data]);

  // Course ranking
  const courseRanking = useMemo(() => {
    const rankings = Object.entries(completionData).map(([id, info]) => ({
      id,
      name: courses.find(c => c.id === id)?.name || id,
      completion: info.data[info.data.length - 1].completion,
      instructor: info.instructor,
    })).sort((a, b) => b.completion - a.completion);

    const currentRank = rankings.findIndex(r => r.id === selectedCourse) + 1;
    const gapToTop1 = analytics.latest - rankings[0].completion;

    return { top3: rankings.slice(0, 3), currentRank, gapToTop1 };
  }, [selectedCourse, analytics.latest]);



  const generateQuickReport = () => {
    const courseName = courses.find(c => c.id === selectedCourse)?.name;
    const latestYearData = data[data.length - 1] || {};
    const reportText = `BÁO CÁO NHANH MÔN ${courseName?.toUpperCase()} (${latestYearData.year || ''})\n- Tỉ lệ hoàn thành: ${latestYearData.completion}% (${analytics.latest >= SCHOOL_BENCHMARK ? 'Đạt chuẩn' : 'Chưa đạt'})\n- So với năm trước: ${analytics.shortTermTrend > 0 ? '+' : ''}${analytics.shortTermTrend.toFixed(1)}% (${analytics.shortTermTrend > 0 ? 'Tăng' : 'Giảm'})\n- Điểm nghẽn chính: ${courseInfo.bottleneck?.name || 'Không rõ'} (${courseInfo.bottleneck?.rate || 0}%)\n- Vấn đề cần khắc phục: ${analytics.causes.join(', ')}\n- Đề xuất hành động: Tập trung nhóm trượt điểm (${latestYearData.failedByGrade || 0}%)`;

    navigator.clipboard.writeText(reportText);
    setToastMessage('Đã copy báo cáo vào clipboard!');
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleBarClick = useCallback((data) => {
    // Generate mock classes based on the aggregate percentage
    const classes = [
      { name: `22CT111`, completion: data.completion - 7, studentCount: Math.floor(data.studentCount * 0.35 || 40), instructor: 'ThS. Nguyễn Văn A' },
      { name: `22CT112`, completion: data.completion + 5, studentCount: Math.floor(data.studentCount * 0.35 || 40), instructor: 'TS. Trần Thị B' },
      { name: `22CT113`, completion: data.completion + 2, studentCount: Math.floor(data.studentCount * 0.3 || 35), instructor: 'ThS. Lê Văn C' },
    ];

    setSelectedBreakdownData({
      ...data,
      classes,
      courseName: courses.find(c => c.id === selectedCourse)?.name
    });
    setShowClassBreakdownModal(true);
  }, [selectedCourse]);

  return (
    <div className="card p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-8 gap-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
            Tỉ lệ hoàn thành môn học
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Phân tích xu hướng qua các năm • So sánh KPI • Mức chuẩn: {SCHOOL_BENCHMARK}%
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <select
            value={selectedCourse}
            onChange={useCallback((e) => setSelectedCourse(e.target.value), [])}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 transition-all"
          >
            {courses.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <select
            value={compareCourse}
            onChange={useCallback((e) => setCompareCourse(e.target.value), [])}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 transition-all"
          >
            <option value="">So sánh với...</option>
            {courses.filter(c => c.id !== selectedCourse).map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>

          <select
            value={selectedYear}
            onChange={useCallback((e) => setSelectedYear(e.target.value), [])}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 transition-all"
          >
            <option value="2018-2022">2018-2022</option>
            <option value="2019-2023">2019-2023</option>
            <option value="2020-2024">2020-2024</option>
            <option value="2021-2025">2021-2025</option>
            <option value="2022-2026">2022-2026</option>
          </select>
        </div>
      </div>

      {/* Chart */}
      <div className="mb-6">
        <div className="h-80 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 [&_*]:outline-none [&_*]:focus:outline-none">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={chartData}
              margin={{ top: 25, right: 30, left: 20, bottom: 5 }}
              barCategoryGap="35%"
              barGap={8}
            >

              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" opacity={0.5} />
              <XAxis
                dataKey="year"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#6b7280', fontSize: 13 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#6b7280', fontSize: 12 }}
                domain={[0, 100]}
                tickFormatter={(val) => `${val}%`}
              />
              <Tooltip content={<CustomTooltip selectedCourse={selectedCourse} compareCourse={compareCourse} />} cursor={{ fill: 'transparent' }} wrapperStyle={{ outline: 'none', border: 'none', pointerEvents: 'none' }} />
              <Legend
                content={<CustomLegend />}
              />

              <Line
                type="monotone"
                dataKey="benchmark"
                stroke="#fbbf24"
                strokeWidth={2}
                strokeOpacity={0.7}
                strokeDasharray="4 4"
                dot={false}
                activeDot={false}
                name="Mức chuẩn (75%)"

              />

              {/* Trend Line with dots */}
              <Line
                type="monotone"
                dataKey="completion"
                stroke="#3b82f6"
                strokeWidth={2.5}
                dot={{ r: 4, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff' }}
                activeDot={{ r: 6 }}
                name="Xu hướng"
                legendType="none"
                isAnimationActive={false}
                style={{ pointerEvents: 'none' }}
              />

              {!compareCourse ? (
                <Bar
                  dataKey="completion"
                  radius={[6, 6, 0, 0]}
                  name="Tỉ lệ hoàn thành"
                  maxBarSize={60}
                  legendType="none"
                  animationDuration={300}
                  fill="#3b82f6"
                  onClick={handleBarClick}
                  className="cursor-pointer"
                >
                  <LabelList dataKey="completion" position="top" fill="#64748b" fontSize={11} fontWeight={600} formatter={(val) => `${val}%`} />
                </Bar>
              ) : (
                <>
                  <Bar
                    dataKey="completion"
                    radius={[6, 6, 0, 0]}
                    name={courses.find(c => c.id === selectedCourse)?.name}
                    maxBarSize={45}
                    legendType="none"
                    animationDuration={300}
                    fill="#3b82f6"
                    onClick={handleBarClick}
                    className="cursor-pointer"
                  >
                    <LabelList dataKey="completion" position="top" fill="#64748b" fontSize={11} fontWeight={600} formatter={(val) => `${val}%`} />
                  </Bar>
                  <Bar
                    dataKey="completionCompare"
                    radius={[6, 6, 0, 0]}
                    name={courses.find(c => c.id === compareCourse)?.name}
                    maxBarSize={45}
                    legendType="none"
                    animationDuration={300}
                    fill="#8b5cf6"
                    onClick={(data) => {
                      // Logic for compared course breakdown
                      const classes = [
                        { name: `CL-COMP-A`, completion: data.completionCompare - 5, studentCount: 35, instructor: 'GV. Hỗ trợ' },
                        { name: `CL-COMP-B`, completion: data.completionCompare + 5, studentCount: 35, instructor: 'GV. Hỗ trợ' },
                      ];
                      setSelectedBreakdownData({
                        year: data.year,
                        completion: data.completionCompare,
                        classes,
                        courseName: courses.find(c => c.id === compareCourse)?.name
                      });
                      setShowClassBreakdownModal(true);
                    }}
                    className="cursor-pointer"
                  >
                    <LabelList dataKey="completionCompare" position="top" fill="#64748b" fontSize={11} fontWeight={600} formatter={(val) => `${val}%`} />
                  </Bar>
                </>
              )}
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* KPI Cards - Premium Style */}
      <div className="mb-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Card 1: Tăng trưởng YoY */}
        <div className="p-4 rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800/50 hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-2">
            <div className={`text-2xl font-bold ${analytics.shortTermTrend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {analytics.shortTermTrend >= 0 ? '+' : ''}{analytics.shortTermTrend.toFixed(1)}%
            </div>
            <div className={`p-1.5 rounded-lg ${analytics.shortTermTrend >= 0 ? 'bg-green-50 dark:bg-green-900/30' : 'bg-red-50 dark:bg-red-900/30'}`}>
              {analytics.shortTermTrend >= 0 ? <TrendingUp className="h-4 w-4 text-green-600" /> : <TrendingDown className="h-4 w-4 text-red-600" />}
            </div>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Tăng trưởng (YoY)</div>
          <div className="text-xs text-gray-500 mt-1">So với năm {data[data.length - 2]?.year || 'trước'}</div>
        </div>

        {/* Card 2: Tăng trưởng 4 năm */}
        <div className="p-4 rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800/50 hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-2">
            <div className={`text-2xl font-bold ${analytics.growth >= 0 ? 'text-blue-600' : 'text-orange-600'}`}>
              {analytics.growth >= 0 ? '+' : ''}{analytics.growth.toFixed(1)}%
            </div>
            <div className="p-1.5 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
              <CheckCircle2 className="h-4 w-4 text-blue-600" />
            </div>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Tăng trưởng 4 năm</div>
          <div className="text-xs text-gray-500 mt-1">Từ năm {data[0]?.year} - {data[data.length - 1]?.year}</div>
        </div>

        {/* Card 3: Điểm nghẽn hệ thống */}
        <div
          onClick={() => setShowBottleneckModal(true)}
          className="p-4 rounded-xl border border-orange-100 dark:border-orange-900/30 bg-orange-50 dark:bg-orange-900/20 hover:shadow-md transition-all cursor-pointer">
          <div className="flex items-center justify-between mb-2">
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
              {courseInfo.bottleneck?.name || 'Không có'}
            </div>
            <div className="p-1.5 bg-orange-100 dark:bg-orange-900/40 rounded-lg">
              <AlertTriangle className="h-4 w-4 text-orange-600" />
            </div>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Điểm nghẽn hệ thống</div>
          <div className="text-xs text-orange-600 dark:text-orange-400 mt-1">Chuỗi hiệu suất thấp kéo dài</div>
        </div>

        {/* Card 4: Chỉ số ổn định */}
        <div className="p-4 rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800/50 hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-2">
            <div className={`text-2xl font-bold ${data[data.length - 1]?.failRate < 10 ? 'text-green-600' : 'text-amber-600'}`}>
              {(100 - (data[data.length - 1]?.failRate || 0)).toFixed(1)}%
            </div>
            <div className={`p-1.5 rounded-lg ${data[data.length - 1]?.failRate < 10 ? 'bg-green-50 dark:bg-green-900/30' : 'bg-amber-50 dark:bg-amber-900/30'}`}>
              <AlertTriangle className={`h-4 w-4 ${data[data.length - 1]?.failRate < 10 ? 'text-green-600' : 'text-amber-600'}`} />
            </div>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Chỉ số ổn định</div>
          <div className="text-xs text-gray-500 mt-1">Tỷ lệ SV không bị rớt/bỏ học</div>
        </div>
      </div>

      {/* Auto Insights - Premium Style */}
      {(() => {
        const insights = [];

        if (data.length >= 2) {
          const recentGrowth = data[data.length - 1].completion - data[data.length - 2].completion;
          const avgGrowth = (data[data.length - 1].completion - data[0].completion) / (data.length - 1);

          if (recentGrowth < avgGrowth * 0.5 && recentGrowth < 2) {
            insights.push({
              type: 'warning',
              icon: <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />,
              text: `${data[data.length - 1].year} có mức tăng chậm bất thường (chỉ +${recentGrowth.toFixed(1)}% so với trung bình +${avgGrowth.toFixed(1)}%/năm).`
            });
          }

          if (data[data.length - 1].failRate > 15) {
            insights.push({
              type: 'danger',
              icon: <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />,
              text: `Tỷ lệ rớt cao (${data[data.length - 1].failRate}%) - cần can thiệp ngay để đảm bảo KPI.`
            });
          }

          if (analytics.latest >= SCHOOL_BENCHMARK && analytics.shortTermTrend > 0) {
            insights.push({
              type: 'success',
              icon: <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />,
              text: `Xu hướng tích cực: Đã đạt chuẩn và đang tiếp tục cải thiện (+${analytics.shortTermTrend.toFixed(1)}% năm gần nhất).`
            });
          }

          if (analytics.latest < SCHOOL_BENCHMARK && analytics.shortTermTrend < 0) {
            insights.push({
              type: 'danger',
              icon: <TrendingDown className="h-5 w-5 text-red-600 dark:text-red-400" />,
              text: `Cảnh báo: Chưa đạt chuẩn và đang có xu hướng giảm (${analytics.shortTermTrend.toFixed(1)}%).`
            });
          }
        }
        if (insights.length === 0) return null;
        return (
          <div className="mb-8 space-y-3">
            {insights.map((insight, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-xl border flex items-start gap-3 transition-all hover:shadow-md ${insight.type === 'success' ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' :
                  insight.type === 'warning' ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800' :
                    'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
                  }`}
              >
                <div className="flex-shrink-0 mt-0.5">{insight.icon}</div>
                <span className={`text-sm font-medium ${insight.type === 'success' ? 'text-green-900 dark:text-green-100' :
                  insight.type === 'warning' ? 'text-amber-900 dark:text-amber-100' :
                    'text-red-900 dark:text-red-100'
                  }`}>
                  {insight.text}
                </span>
              </div>
            ))}
          </div>
        );
      })()}









      {/* 1. Ranking Section - Top priority, Blue theme */}
      <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-3 flex items-center gap-2">
          🏆 Xếp hạng môn học
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {courseRanking.top3.map((course, idx) => (
            <div key={course.id} className={`p-3 rounded-lg ${idx === 0 ? 'bg-blue-100 dark:bg-blue-900/40 border-2 border-blue-400' : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700'}`}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-blue-600 dark:text-blue-400">#{idx + 1}</span>
                <span className="text-lg font-bold text-gray-900 dark:text-white">{course.completion}%</span>
              </div>
              <div className="text-xs font-medium text-gray-900 dark:text-white mb-1">{course.name}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">GV: {course.instructor}</div>
            </div>
          ))}
        </div>
        <div className="mt-3 text-xs text-blue-700 dark:text-blue-300">
          Môn hiện tại xếp hạng <span className="font-bold">#{courseRanking.currentRank}</span>
          {courseRanking.gapToTop1 < 0 && (
            <span> • Kém top 1: <span className="font-bold text-red-600">{Math.abs(courseRanking.gapToTop1).toFixed(1)}%</span></span>
          )}
        </div>
      </div>

      {/* 2. Bottleneck - Middle section, Amber theme */}
      {courseInfo.bottleneck && (
        <div className="mb-6 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
          <h4 className="text-sm font-semibold text-amber-900 dark:text-amber-100 mb-2 flex items-center gap-2">
            🎯 Điểm nghẽn chính
          </h4>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-amber-800 dark:text-amber-200">
                <span className="font-bold">{courseInfo.bottleneck.name}</span> có tỉ lệ hoàn thành thấp nhất: <span className="font-bold text-red-600">{courseInfo.bottleneck.rate}%</span>
              </p>
              <p className="text-xs text-amber-700 dark:text-amber-300 mt-1">
                {courseInfo.bottleneck.type === 'class' ? '📚 Lớp học' : '📖 Chủ đề'} này đang kéo tụt tỉ lệ hoàn thành chung
              </p>
            </div>
            <button
              onClick={() => setShowBottleneckModal(true)}
              className="px-3 py-1.5 text-xs font-medium text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-900/30 rounded-lg hover:bg-amber-200 dark:hover:bg-amber-900/50 transition-colors"
            >
              Xem chi tiết
            </button>
          </div>
        </div>
      )}



      {/* Action Buttons - Styled as per screenshot */}
      <div className="flex flex-wrap gap-3 mb-8">


        <button
          onClick={() => setShowAssignTaskModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
        >
          <Send className="h-4 w-4" />
          Giao nhiệm vụ GV
        </button>

        <button
          onClick={() => setShowMeetingModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
        >
          <Calendar className="h-4 w-4" />
          Lên lịch họp
        </button>

        <button
          onClick={() => {
            const csvContent = [
              ['Báo cáo tỉ lệ hoàn thành môn học'],
              ['Năm', 'Tỉ lệ hoàn thành', 'Số SV', 'Tỷ lệ rớt', 'Trượt điểm', 'Bỏ học', 'Không đủ ĐK'],
              ...data.map(d => [d.year, d.completion, d.studentCount, d.failRate, d.failedByGrade, d.dropout, d.notEligible]),
            ].map(row => row.join(',')).join('\n');

            const BOM = '\uFEFF';
            const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', `tỉ-lệ-hoàn-thành-${selectedCourse}-${new Date().getTime()}.csv`);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }}
          className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
        >
          <Download className="h-4 w-4" />
          Xuất báo cáo
        </button>
      </div>



      {/* Meeting Modal - Fully Interactive */}
      {showMeetingModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-75" onClick={() => setShowMeetingModal(false)} />

            <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-indigo-50 dark:bg-indigo-900/20">
                <h3 className="text-lg font-bold text-indigo-900 dark:text-indigo-100 flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Lên lịch họp hội đồng bộ môn
                </h3>
                <button onClick={() => setShowMeetingModal(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="px-6 py-4 space-y-4">
                <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-800 flex items-start gap-3 group/subject">
                  <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-bold text-amber-800 dark:text-amber-200 uppercase tracking-wider">Chủ đề thảo luận trọng tâm</div>
                      <div className="flex items-center gap-1 text-[10px] text-amber-600 font-medium opacity-0 group-hover/subject:opacity-100 transition-opacity">
                        <Edit2 className="h-2.5 w-2.5" /> Nhấp để chỉnh sửa
                      </div>
                    </div>
                    <textarea
                      value={meetingSubject}
                      onChange={(e) => setMeetingSubject(e.target.value)}
                      className="w-full bg-transparent border-none text-sm text-amber-900 dark:text-amber-100 focus:ring-0 outline-none p-2 mt-1 resize-none font-medium hover:bg-amber-100/50 dark:hover:bg-amber-800/30 rounded-lg transition-colors border-dashed border border-transparent hover:border-amber-300 dark:hover:border-amber-700"
                      rows="2"
                      placeholder="Nhập chủ đề cuộc họp..."
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Ngày họp</label>
                    <input type="date" defaultValue="2026-05-15" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Giờ họp</label>
                    <input type="time" defaultValue="09:00" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Hình thức họp</label>
                  <div className="flex gap-3">
                    <label className={`flex-1 flex items-center justify-center gap-2 p-2 border rounded-lg cursor-pointer transition-all ${meetingType === 'direct' ? 'bg-indigo-50 border-indigo-200 dark:bg-indigo-900/20 shadow-sm' : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'}`}>
                      <input 
                        type="radio" 
                        name="meetingType" 
                        checked={meetingType === 'direct'} 
                        onChange={() => setMeetingType('direct')}
                        className="text-indigo-600 w-3 h-3" 
                      />
                      <span className={`text-xs font-bold ${meetingType === 'direct' ? 'text-indigo-700 dark:text-indigo-300' : 'text-gray-500'}`}>Trực tiếp (Phòng 402)</span>
                    </label>
                    <label className={`flex-1 flex items-center justify-center gap-2 p-2 border rounded-lg cursor-pointer transition-all ${meetingType === 'online' ? 'bg-indigo-50 border-indigo-200 dark:bg-indigo-900/20 shadow-sm' : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'}`}>
                      <input 
                        type="radio" 
                        name="meetingType" 
                        checked={meetingType === 'online'} 
                        onChange={() => setMeetingType('online')}
                        className="text-indigo-600 w-3 h-3" 
                      />
                      <span className={`text-xs font-bold ${meetingType === 'online' ? 'text-indigo-700 dark:text-indigo-300' : 'text-gray-500'}`}>Trực tuyến (Google Meet)</span>
                    </label>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300">Thành phần tham gia</label>
                    <button
                      onClick={() => setShowDirectoryModal(true)}
                      className="text-xs font-bold text-indigo-600 hover:bg-indigo-50 px-2 py-1 rounded-lg transition-colors flex items-center gap-1 border border-indigo-100"
                    >
                      <Plus className="h-3 w-3" /> Thêm từ danh bạ
                    </button>
                  </div>
                  <div className="space-y-2 max-h-40 overflow-y-auto pr-1 custom-scrollbar">
                    {meetingAttendees.map((person) => (
                      <div key={person.id} className="flex items-center justify-between p-2.5 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-100 dark:border-gray-600 group">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                            {person.name.charAt(0)}
                          </div>
                          <div>
                            <div className="text-sm font-bold text-gray-900 dark:text-white">{person.name}</div>
                            <div className="text-[10px] text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">{person.role}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => {
                              setMeetingAttendees(meetingAttendees.map(p =>
                                p.id === person.id ? { ...p, isRequired: !p.isRequired } : p
                              ));
                            }}
                            className={`text-[10px] font-bold uppercase px-2 py-1 rounded-md transition-all hover:scale-105 active:scale-95 ${person.isRequired ? 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                          >
                            {person.isRequired ? 'Bắt buộc' : 'Tùy chọn'}
                          </button>
                          <button
                            onClick={() => setMeetingAttendees(meetingAttendees.filter(p => p.id !== person.id))}
                            className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-50 rounded-lg"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Nội dung của cuộc họp</label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                    rows="3"
                    defaultValue={`1. Phân tích nguyên nhân tỉ lệ hoàn thành lớp ${courseInfo.bottleneck?.name} thấp.
2. Thống nhất phương án phụ đạo và điều chỉnh đề kiểm tra.
3. Đề xuất hỗ trợ từ khoa.`}
                  ></textarea>
                </div>
              </div>

              <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 flex justify-end gap-3">
                <button onClick={() => setShowMeetingModal(false)} className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors">
                  Đóng
                </button>
                <button
                  onClick={() => {
                    setShowMeetingModal(false);
                    setToastMessage('Đã tạo cuộc họp và gửi lời mời thành công!');
                    setTimeout(() => setToastMessage(''), 3000);
                  }}
                  className="px-6 py-2 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-lg shadow-indigo-200 dark:shadow-none transition-all"
                >
                  Tạo cuộc họp & Gửi lời mời
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Meeting Directory Selection Sub-Modal */}
      {showDirectoryModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowDirectoryModal(false)} />
          <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-4 border-b border-gray-100 dark:border-gray-700 bg-indigo-600 flex justify-between items-center text-white">
              <h4 className="font-bold flex items-center gap-2">
                <Users className="h-4 w-4" /> Danh bạ giảng viên
              </h4>
              <button onClick={() => setShowDirectoryModal(false)} className="hover:bg-white/20 p-1 rounded-lg">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-4">
              <div className="relative mb-4">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Tìm theo tên hoặc bộ môn..."
                  value={directorySearch}
                  onChange={(e) => setDirectorySearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                  autoFocus
                />
              </div>

              <div className="space-y-1 max-h-[350px] overflow-y-auto custom-scrollbar">
                {allInstructors
                  .filter(i =>
                    i.name.toLowerCase().includes(directorySearch.toLowerCase()) ||
                    i.department.toLowerCase().includes(directorySearch.toLowerCase())
                  )
                  .map((instructor) => {
                    const isAlreadyAdded = meetingAttendees.some(a => a.id === instructor.id);
                    return (
                      <div
                        key={instructor.id}
                        onClick={() => {
                          if (!isAlreadyAdded) {
                            setMeetingAttendees([...meetingAttendees, { id: instructor.id, name: instructor.name, role: 'Giảng viên', isRequired: false }]);
                            setShowDirectoryModal(false);
                          }
                        }}
                        className={`flex items-center justify-between p-3 rounded-xl transition-all cursor-pointer ${isAlreadyAdded ? 'opacity-50 cursor-not-allowed bg-gray-50 dark:bg-gray-900' : 'hover:bg-indigo-50 dark:hover:bg-indigo-900/20 group'
                          }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-indigo-600 font-bold group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                            {instructor.name.charAt(instructor.name.lastIndexOf(' ') + 1)}
                          </div>
                          <div>
                            <div className="text-sm font-bold text-gray-900 dark:text-white">{instructor.name}</div>
                            <div className="text-[11px] text-gray-500">{instructor.department} • {instructor.email}</div>
                          </div>
                        </div>
                        {!isAlreadyAdded && <Plus className="h-4 w-4 text-indigo-600" />}
                        {isAlreadyAdded && <CheckCircle2 className="h-4 w-4 text-green-500" />}
                      </div>
                    );
                  })
                }
                {allInstructors.filter(i => i.name.toLowerCase().includes(directorySearch.toLowerCase())).length === 0 && (
                  <div className="text-center py-10">
                    <UserX className="h-10 w-10 text-gray-300 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">Không tìm thấy giảng viên nào phù hợp.</p>
                  </div>
                )}
              </div>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-100 dark:border-gray-700">
              <p className="text-[10px] text-gray-400 italic text-center">
                * Nhấp vào tên giảng viên để thêm nhanh vào danh sách tham gia cuộc họp.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Class Breakdown Modal */}
      {showClassBreakdownModal && selectedBreakdownData && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-75" onClick={() => setShowClassBreakdownModal(false)} />
            <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                    📊 Chi tiết tỉ lệ hoàn thành theo lớp
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {selectedBreakdownData?.courseName} - Năm {selectedBreakdownData?.year}
                  </p>
                </div>
                <button onClick={() => setShowClassBreakdownModal(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div className="px-6 py-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-100 dark:border-blue-800 mb-6 flex items-center justify-between">
                  <div>
                    <div className="text-sm text-blue-600 dark:text-blue-400 font-medium uppercase tracking-wider">Tỉ lệ trung bình</div>
                    <div className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{selectedBreakdownData?.completion}%</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Mục tiêu năm</div>
                    <div className="text-lg font-semibold text-green-600">85.0%</div>
                  </div>
                </div>

                <div className="space-y-3">
                  {selectedBreakdownData?.classes?.map((cls, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-white dark:bg-gray-700/50 border border-gray-100 dark:border-gray-700 rounded-xl hover:shadow-md transition-all">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg ${cls.completion >= 80 ? 'bg-green-100 text-green-600' :
                          cls.completion >= 70 ? 'bg-blue-100 text-blue-600' :
                            'bg-red-100 text-red-600'
                          }`}>
                          {cls.completion}%
                        </div>
                        <div>
                          <div className="font-bold text-gray-900 dark:text-white">{cls.name}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">GV: {cls.instructor} • {cls.studentCount} SV</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-32 h-2 bg-gray-100 dark:bg-gray-600 rounded-full overflow-hidden hidden sm:block">
                          <div
                            className={`h-full transition-all duration-1000 ${cls.completion >= 80 ? 'bg-green-500' :
                              cls.completion >= 70 ? 'bg-blue-500' :
                                'bg-red-500'
                              }`}
                            style={{ width: `${cls.completion}%` }}
                          />
                        </div>
                        <button
                          onClick={() => {
                            setShowClassBreakdownModal(false);
                            setShowStudentListModal(true);
                          }}
                          className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                          title="Xem danh sách SV"
                        >
                          <ChevronUp className="h-5 w-5 rotate-90" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg text-xs text-gray-500 dark:text-gray-400">
                  💡 <strong>Ghi chú:</strong> Tỉ lệ hoàn thành của năm được tính dựa trên hiệu suất tổng hợp của các lớp học phần trong năm học đó.
                </div>
              </div>
              <div className="flex items-center justify-end px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
                <button
                  onClick={() => setShowClassBreakdownModal(false)}
                  className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Student List Modal */}
      {showStudentListModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-75" onClick={() => setShowStudentListModal(false)} />
            <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                    <UserX className="h-5 w-5 text-red-500" /> Danh sách sinh viên chưa hoàn thành
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {courses.find(c => c.id === selectedCourse)?.name} - Năm {data[data.length - 1]?.year}
                  </p>
                </div>
                <button onClick={() => setShowStudentListModal(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div className="px-6 py-4">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-900/50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Họ tên</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lớp</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lí do</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {[
                      { name: 'Nguyễn Văn A', class: '22CT111', reason: 'Trượt điểm (4.0)', type: 'grade' },
                      { name: 'Trần Thị B', class: '22CT112', reason: 'Bỏ học (Không thi GK)', type: 'dropout' },
                      { name: 'Lê Văn C', class: '22CT111', reason: 'Không đủ ĐK (Vắng 5 buổi)', type: 'absence' },
                      { name: 'Phạm Minh D', class: '22CT114', reason: 'Trượt điểm (3.5)', type: 'grade' },
                      { name: 'Hoàng Ngọc E', class: '22CT111', reason: 'Trượt điểm (4.5)', type: 'grade' },
                    ].sort((a, b) => a.class.localeCompare(b.class)).map((student, i) => (
                      <tr key={i}>
                        <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">{student.name}</td>
                        <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">{student.class}</td>
                        <td className="px-4 py-3 text-sm">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${student.type === 'grade' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' :
                            student.type === 'dropout' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300' :
                              'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300'
                            }`}>
                            {student.reason}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 flex justify-end">
                <button
                  onClick={() => setShowStudentListModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Assign Task Modal - Email Dispatch Style */}
      {showAssignTaskModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-75" onClick={() => setShowAssignTaskModal(false)} />

            <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full border border-gray-200 dark:border-gray-700">
              {/* Header: "New Message" style */}
              <div className="px-6 py-3 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-gray-900 text-white rounded-t-xl">
                <h3 className="text-sm font-bold flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Soạn thảo nhiệm vụ giảng dạy (Email Dispatch)
                </h3>
                <div className="flex items-center gap-3">
                  <button onClick={() => setShowAssignTaskModal(false)} className="hover:bg-white/10 p-1 rounded transition-colors">
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="px-6 py-4 space-y-0 max-h-[80vh] overflow-y-auto custom-scrollbar">
                {/* Recipients (To) */}
                <div className="flex items-center gap-3 py-3 border-b border-gray-100 dark:border-gray-700">
                  <span className="text-sm font-medium text-gray-500 w-20">Người nhận:</span>
                  <div className="flex-1">
                    <select
                      value={selectedInstructorId}
                      onChange={(e) => setSelectedInstructorId(parseInt(e.target.value))}
                      className="w-full bg-transparent border-none text-sm font-bold text-blue-600 focus:ring-0 outline-none cursor-pointer"
                    >
                      {allInstructors.map(ins => (
                        <option key={ins.id} value={ins.id} className="text-gray-900">
                          {ins.name} &lt;{ins.email}&gt;
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Subject & CC */}
                <div className="flex items-center gap-3 py-2.5 border-b border-gray-100 dark:border-gray-700">
                  <span className="text-sm font-medium text-gray-500 w-20">Đồng kính gửi:</span>
                  <div className="flex-1 flex flex-wrap gap-2 items-center">
                    {emailCC.map((cc, idx) => (
                      <span key={idx} className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-xs font-medium text-gray-600 dark:text-gray-400 flex items-center gap-1 border border-gray-200 dark:border-gray-600 group">
                        {cc}
                        <X
                          className="h-3 w-3 cursor-pointer hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => setEmailCC(emailCC.filter((_, i) => i !== idx))}
                        />
                      </span>
                    ))}
                    <div className="flex items-center gap-1 ml-1">
                      <input
                        type="text"
                        placeholder="Thêm CC..."
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && e.currentTarget.value) {
                            setEmailCC([...emailCC, e.currentTarget.value]);
                            e.currentTarget.value = '';
                          }
                        }}
                        className="text-xs bg-transparent border-none focus:ring-0 w-24 placeholder:italic"
                      />
                      <Plus className="h-3 w-3 text-blue-600 cursor-pointer" />
                    </div>
                  </div>
                </div>

                {/* Subject */}
                <div className="flex items-center gap-3 py-3 border-b border-gray-100 dark:border-gray-700">
                  <span className="text-sm font-medium text-gray-500 w-20">Tiêu đề:</span>
                  <input
                    type="text"
                    value={taskSubject}
                    onChange={(e) => setTaskSubject(e.target.value)}
                    className="flex-1 bg-transparent border-none text-sm font-bold text-gray-900 dark:text-white focus:ring-0 outline-none"
                  />
                </div>

                {/* Email Body - Tasks Section */}
                <div className="py-6 space-y-6">
                  <div className="space-y-4">
                    <div className="text-sm font-bold text-gray-900 dark:text-white">
                      Chào {allInstructors.find(i => i.id === selectedInstructorId)?.name},
                    </div>
                    <textarea
                      value={emailMessage}
                      onChange={(e) => setEmailMessage(e.target.value)}
                      className="w-full bg-transparent border-none text-sm text-gray-700 dark:text-gray-300 focus:ring-0 resize-none min-h-[80px]"
                      placeholder="Nhập nội dung thư..."
                    />
                  </div>



                  {/* Task Creation Form (Inline) */}
                  <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-inner">
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                      <Plus className="h-3 w-3" /> Thêm nhiệm vụ vào danh sách
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      <input
                        type="text"
                        placeholder="Nhiệm vụ..."
                        value={newTask.title}
                        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                        className="flex-1 min-w-[200px] px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                      />
                      <select
                        value={newTask.priority}
                        onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                        className="w-32 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                      >
                        <option value="Cao">🚨 Cao</option>
                        <option value="Trung bình">⏳ Trung bình</option>
                        <option value="Thấp">✅ Thấp</option>
                      </select>
                      <input
                        type="date"
                        value={newTask.deadline}
                        onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
                        className="px-2 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                      />
                      <button
                        onClick={() => {
                          if (newTask.title) {
                            setModalTasks([...modalTasks, { ...newTask, id: Date.now() }]);
                            setNewTask({ title: '', priority: 'Trung bình', deadline: '' });
                          }
                        }}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md transition-all font-bold text-sm"
                      >
                        Thêm
                      </button>
                    </div>
                  </div>

                  {/* Tasks Table */}
                  <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead className="bg-gray-50 dark:bg-gray-700/50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Công việc chi tiết</th>
                          <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Ưu tiên</th>
                          <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Hạn chót</th>
                          <th className="px-4 py-3 text-right"></th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
                        {modalTasks.map((task) => (
                          <tr key={task.id}>
                            <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">{task.title}</td>
                            <td className="px-4 py-3">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${task.priority === 'Cao' ? 'bg-red-100 text-red-700' :
                                  task.priority === 'Trung bình' ? 'bg-amber-100 text-amber-700' :
                                    'bg-blue-100 text-blue-700'
                                }`}>
                                {task.priority}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-500">{task.deadline || 'Chưa đặt'}</td>
                            <td className="px-4 py-3 text-right">
                              <button onClick={() => setModalTasks(modalTasks.filter(t => t.id !== task.id))} className="text-gray-400 hover:text-red-500">
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Attachments Section (Interactive) */}
                  <div className="space-y-3 py-4 border-y border-gray-100 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-gray-500 uppercase flex items-center gap-1">
                        <Paperclip className="h-3 w-3" /> Tệp đính kèm ({emailAttachments.length})
                      </span>
                      <button
                        onClick={() => {
                          const fileName = prompt('Nhập tên tệp đính kèm:');
                          if (fileName) setEmailAttachments([...emailAttachments, fileName]);
                        }}
                        className="text-xs font-bold text-blue-600 hover:bg-blue-50 px-2 py-1 rounded"
                      >
                        + Thêm tệp
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {emailAttachments.map((file, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-xs text-blue-600 group">
                          <FileText className="h-3.5 w-3.5" />
                          {file}
                          <X
                            className="h-3 w-3 text-gray-400 hover:text-red-500 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => setEmailAttachments(emailAttachments.filter((_, i) => i !== idx))}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="text-sm text-gray-700 dark:text-gray-300">
                    Ghi chú thêm từ Quản lý: <br />
                    <textarea
                      className="w-full mt-2 p-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800/50 text-sm focus:ring-1 focus:ring-blue-500 outline-none"
                      rows="3"
                      placeholder="Lời nhắn bổ sung từ quản lý..."
                      defaultValue={`Ưu tiên cải thiện lớp ${courseInfo.bottleneck?.name} vì đang kéo tụt điểm chung môn học.`}
                    ></textarea>
                  </div>

                  <div className="pt-4 text-xs text-gray-500 border-t border-gray-100 dark:border-gray-700">
                    Trân trọng, <br />
                    <strong>TS. Nguyễn Văn An</strong> (Quản lý ngành)
                  </div>
                </div>
              </div>

              {/* Footer: Action Button */}
              <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex items-center gap-4">
                <button
                  onClick={() => {
                    setShowAssignTaskModal(false);
                    setToastMessage(`Đã gửi email nhiệm vụ thành công cho GV ${allInstructors.find(i => i.id === selectedInstructorId)?.name}!`);
                    setTimeout(() => setToastMessage(''), 3000);
                  }}
                  className="px-8 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all font-bold flex items-center gap-2 group"
                >
                  <Send className="h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  Gửi nhiệm vụ qua Email
                </button>
                <button
                  onClick={() => setShowAssignTaskModal(false)}
                  className="px-6 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  Lưu nháp
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottleneck Modal */}
      {showBottleneckModal && courseInfo.bottleneck && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-75" onClick={() => setShowBottleneckModal(false)} />
            <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between bg-amber-50 dark:bg-amber-900/20">
                <h3 className="text-lg font-semibold text-amber-900 dark:text-amber-100 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" /> Phân tích điểm nghẽn
                </h3>
                <button onClick={() => setShowBottleneckModal(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div className="px-6 py-4 space-y-4">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h4 className="text-sm font-medium text-gray-500 uppercase">Đối tượng kéo tụt</h4>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                    {courseInfo.bottleneck.name}
                  </div>
                  <div className="text-sm text-red-600 font-medium mt-1">Tỉ lệ hoàn thành: {courseInfo.bottleneck.rate}% (Rất thấp)</div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Chi tiết vấn đề</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Theo dữ liệu phân tích, {courseInfo.bottleneck.type === 'class' ? 'lớp học' : 'chủ đề'} này đang gặp khó khăn lớn nhất.
                    {courseInfo.bottleneck.type === 'class'
                      ? ' Điểm trung bình của sinh viên lớp này đang thấp hơn 1.5 điểm so với mặt bằng chung.'
                      : ' Bài kiểm tra phần này có số lượng câu trả lời sai chiếm đến 60%.'}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
                <button
                  onClick={() => setShowBottleneckModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                >
                  Đóng
                </button>
                <button
                  onClick={() => {
                    setToastMessage('Đã gửi yêu cầu giải trình đến Giảng viên phụ trách!');
                    setTimeout(() => setToastMessage(''), 3000);
                    setShowBottleneckModal(false);
                  }}
                  className="px-4 py-2 text-sm font-medium text-white bg-amber-600 rounded-lg hover:bg-amber-700 transition-colors flex items-center gap-2"
                >
                  <FileText className="h-4 w-4" /> Yêu cầu GV giải trình
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-4 right-4 z-50 bg-gray-900 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-green-400" />
          <span className="font-medium text-sm">{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export default React.memo(CourseCompletionChart);
