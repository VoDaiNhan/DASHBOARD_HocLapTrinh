import React, { useMemo } from 'react';
import {
  TrendingUp,
  Award,
  AlertTriangle,
  Eye,
  CalendarClock,
  Activity,
  AlertOctagon
} from 'lucide-react';
import { mockDepartmentData, mockClassData, mockDashboardData } from '../../../data/mockData';

const IndustryAnalysis = () => {
  const learningTrend = useMemo(
    () => [
      { day: 'T2', progress: 72 },
      { day: 'T3', progress: 74 },
      { day: 'T4', progress: 73 },
      { day: 'T5', progress: 76 },
      { day: 'T6', progress: 77 },
      { day: 'T7', progress: 78 },
      { day: 'CN', progress: 78.5 }
    ],
    []
  );

  const maxProgress = Math.max(...learningTrend.map((d) => d.progress));

  const topPerformers = useMemo(() => {
    const courses = mockDashboardData.courseMonitoring || [];
    const teachers = mockDepartmentData.teachers || [];

    const teacherPerformance = teachers
      .map((teacher) => {
        const teacherClasses = mockClassData.classes.filter((c) => c.instructor === teacher.name);
        const avgCompletion =
          teacherClasses.length > 0
            ? teacherClasses.reduce((sum, c) => sum + (c.completionRate || 0), 0) / teacherClasses.length
            : 0;
        const avgScore =
          teacherClasses.length > 0
            ? teacherClasses.reduce((sum, c) => sum + (c.averageScore || 0), 0) / teacherClasses.length
            : 0;
        return {
          name: teacher.name,
          performance: (avgCompletion * 0.6 + avgScore * 10 * 0.4).toFixed(1)
        };
      })
      .sort((a, b) => parseFloat(b.performance) - parseFloat(a.performance))
      .slice(0, 3);

    const coursePerformance = courses
      .map((course) => ({
        name: course.name,
        performance: ((course.completionRate || 0) * 0.6 + (course.averageScore || 0) * 10 * 0.4).toFixed(1)
      }))
      .sort((a, b) => parseFloat(b.performance) - parseFloat(a.performance))
      .slice(0, 3);

    return { teachers: teacherPerformance, courses: coursePerformance };
  }, []);

  const weakSubjects = useMemo(() => {
    const allClasses = mockClassData.classes || [];
    const classDetails = mockClassData.classDetails || {};

    const subjectWeakCount = {};

    allClasses.forEach((cls) => {
      const details = classDetails[cls.id];
      if (details && details.students) {
        const weakCount = details.students.filter(
          (s) => (s.averageScore || 0) < 6 || (s.completionRate || 0) < 60
        ).length;

        if (!subjectWeakCount[cls.course]) {
          subjectWeakCount[cls.course] = { count: 0, total: 0 };
        }
        subjectWeakCount[cls.course].count += weakCount;
        subjectWeakCount[cls.course].total += details.students.length;
      }
    });

    return Object.entries(subjectWeakCount)
      .map(([course, data]) => ({
        name: course,
        weakCount: data.count,
        totalStudents: data.total,
        percentage: data.total > 0 ? Math.round((data.count / data.total) * 100) : 0
      }))
      .sort((a, b) => b.weakCount - a.weakCount)
      .slice(0, 3);
  }, []);

  const teacherMonthlyProgress = useMemo(
    () => [
      { name: 'TS. Nguyễn Văn An', subject: 'Nhập môn lập trình', required: 48, taught: 42 },
      { name: 'ThS. Trần Thị Bình', subject: 'Cấu trúc dữ liệu', required: 45, taught: 33 },
      { name: 'ThS. Lê Văn Cường', subject: 'Kỹ thuật lập trình', required: 42, taught: 28 },
      { name: 'ThS. Phạm Mai Hương', subject: 'OOP nâng cao', required: 36, taught: 36 }
    ],
    []
  );

  const postponedSessions = useMemo(
    () => [
      {
        date: '12/12',
        lecturer: 'TS. Nguyễn Văn An',
        course: 'Nhập môn lập trình',
        reason: 'Phòng máy bảo trì',
        status: 'pending'
      },
      {
        date: '14/12',
        lecturer: 'ThS. Trần Thị Bình',
        course: 'Cấu trúc dữ liệu',
        reason: 'Giảng viên công tác',
        status: 'pending'
      },
      {
        date: '16/12',
        lecturer: 'ThS. Lê Văn Cường',
        course: 'Kỹ thuật lập trình',
        reason: 'Sinh viên thi cuối kỳ',
        status: 'resolved'
      }
    ],
    []
  );

  const earlyWarning = useMemo(
    () => ({
      delayedCourses: 4,
      pendingMakeup: postponedSessions.filter((s) => s.status === 'pending').length,
      shortageLecturers: teacherMonthlyProgress.filter((t) => t.required - t.taught >= 8).length,
      inactivityRate: 15
    }),
    [postponedSessions, teacherMonthlyProgress]
  );

  const statusPalette = {
    onTrack: { label: 'Đúng hạn', color: 'text-green-700', bg: 'bg-green-50' },
    warning: { label: 'Nguy cơ trễ', color: 'text-amber-700', bg: 'bg-amber-50' },
    overdue: { label: 'Đã trễ', color: 'text-rose-700', bg: 'bg-rose-50' }
  };

  const determineStatus = (required, taught) => {
    const remaining = required - taught;
    if (remaining <= 2) return 'onTrack';
    if (remaining <= 6) return 'warning';
    return 'overdue';
  };

  const renderProgressBar = (value, tone = 'blue') => {
    const color = tone === 'blue' ? '#2d9cdb' : tone === 'amber' ? '#f2c94c' : '#eb5757';
    return (
      <div className="h-2.5 w-full rounded-full bg-gray-100">
        <div className="h-full rounded-full" style={{ width: `${Math.min(100, value)}%`, backgroundColor: color }} />
      </div>
    );
  };

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-xs uppercase tracking-wide text-gray-500">Tổng quan vận hành</p>
          <h3 className="text-2xl font-bold text-gray-900">Phân Tích Ngành</h3>
        </div>
        <span className="text-xs text-gray-500">Cập nhật 15 phút trước</span>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        {/* Left column */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-gray-100 bg-gradient-to-br from-blue-50 to-white p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <div className="rounded-full bg-white p-2 shadow-sm">
                <TrendingUp className="h-4 w-4 text-blue-500" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Xu hướng học tập</p>
                <h4 className="text-base font-semibold text-gray-900">Theo dõi toàn ngành</h4>
              </div>
            </div>
            <div className="relative h-36">
              <svg className="w-full h-full" viewBox="0 0 300 120" preserveAspectRatio="none">
                {[0, 25, 50, 75, 100].map((y) => (
                  <line
                    key={y}
                    x1="0"
                    y1={110 - y}
                    x2="300"
                    y2={110 - y}
                    stroke="#e5e7eb"
                    strokeWidth="0.5"
                    strokeDasharray="2"
                  />
                ))}
                <polyline
                  points={learningTrend
                    .map((point, idx) => {
                      const x = (idx / (learningTrend.length - 1)) * 300;
                      const y = 110 - (point.progress / maxProgress) * 100;
                      return `${x},${y}`;
                    })
                    .join(' ')}
                  fill="none"
                  stroke="#2d9cdb"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                {learningTrend.map((point, idx) => {
                  const x = (idx / (learningTrend.length - 1)) * 300;
                  const y = 110 - (point.progress / maxProgress) * 100;
                  return <circle key={idx} cx={x} cy={y} r="3" fill="#2d9cdb" stroke="#fff" strokeWidth="1.5" />;
                })}
              </svg>
              <div className="absolute bottom-0 left-0 right-0 flex justify-between text-[11px] text-gray-500">
                {learningTrend.map((point, idx) => (
                  <span key={idx}>{point.day}</span>
                ))}
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between text-xs text-gray-600">
              <span>Tiến độ trung bình</span>
              <span className="font-semibold text-blue-600">{learningTrend[learningTrend.length - 1].progress}%</span>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <div className="rounded-full bg-blue-50 p-2">
                <CalendarClock className="h-4 w-4 text-blue-500" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Giảng viên</p>
                <h4 className="text-base font-semibold text-gray-900">Tiến độ giảng dạy theo tháng</h4>
              </div>
            </div>
            <div className="space-y-4">
              {teacherMonthlyProgress.map((teacher, idx) => {
                const completion = Math.round((teacher.taught / teacher.required) * 100);
                const statusKey = determineStatus(teacher.required, teacher.taught);
                const status = statusPalette[statusKey];
                return (
                  <div key={idx} className="rounded-xl border border-gray-100 p-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{teacher.name}</p>
                        <p className="text-xs text-gray-500">{teacher.subject}</p>
                      </div>
                      <span className={`text-xs font-semibold ${status.color}`}>{status.label}</span>
                    </div>
                    <div className="mt-3 space-y-2 text-xs text-gray-600">
                      <div className="flex justify-between">
                        <span>Đã dạy</span>
                        <span>
                          {teacher.taught}/{teacher.required} tiết
                        </span>
                      </div>
                      {renderProgressBar(completion, statusKey === 'overdue' ? 'red' : statusKey === 'warning' ? 'amber' : 'blue')}
                      <div className="flex justify-between text-[11px]">
                        <span>Thiếu {teacher.required - teacher.taught} tiết</span>
                        <span className="font-semibold text-gray-900">{completion}%</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Middle column */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <div className="rounded-full bg-amber-50 p-2">
                <Award className="h-4 w-4 text-amber-500" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Khen thưởng</p>
                <h4 className="text-base font-semibold text-gray-900">Top hiệu suất cao</h4>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-xs text-gray-500 mb-2">Giảng viên</p>
                {topPerformers.teachers.map((teacher, idx) => (
                  <div key={idx} className="flex items-center justify-between rounded-xl bg-gray-50 px-3 py-2 mb-2">
                    <span className="text-sm text-gray-700">
                      {idx + 1}. {teacher.name}
                    </span>
                    <span className="text-sm font-semibold text-amber-600">{teacher.performance}</span>
                  </div>
                ))}
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-2">Môn học</p>
                {topPerformers.courses.map((course, idx) => (
                  <div key={idx} className="flex items-center justify-between rounded-xl bg-gray-50 px-3 py-2 mb-2">
                    <span className="text-sm text-gray-700">
                      {idx + 1}. {course.name}
                    </span>
                    <span className="text-sm font-semibold text-amber-600">{course.performance}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <div className="rounded-full bg-amber-50 p-2">
                <Activity className="h-4 w-4 text-amber-500" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Lịch giảng dạy</p>
                <h4 className="text-base font-semibold text-gray-900">Buổi dạy hoãn / dời lịch</h4>
              </div>
            </div>
            <div className="space-y-3">
              {postponedSessions.map((session, idx) => {
                const isPending = session.status === 'pending';
                return (
                  <div
                    key={idx}
                    className={`rounded-xl border px-3 py-3 text-sm ${
                      isPending ? 'border-rose-200 bg-rose-50/60' : 'border-gray-100 bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-900">{session.course}</span>
                      <span
                        className={`text-xs font-semibold ${
                          isPending ? 'text-rose-600' : 'text-green-600'
                        } flex items-center gap-1`}
                      >
                        {isPending ? <AlertTriangle className="h-3.5 w-3.5" /> : null}
                        {isPending ? 'Chưa dạy bù' : 'Đã dạy bù'}
                      </span>
                    </div>
                    <div className="mt-1 text-xs text-gray-600">
                      <span className="font-medium">{session.date}</span> · {session.lecturer}
                    </div>
                    <div className="mt-2 text-xs text-gray-500">{session.reason}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <div className="rounded-full bg-rose-50 p-2">
                <AlertTriangle className="h-4 w-4 text-rose-500" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Học vụ</p>
                <h4 className="text-base font-semibold text-gray-900">Môn có nhiều sinh viên yếu</h4>
              </div>
            </div>
            <div className="space-y-3">
              {weakSubjects.map((subject, idx) => (
                <div key={idx} className="rounded-2xl border border-rose-100 bg-rose-50/50 p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{subject.name}</p>
                      <p className="text-xs text-gray-500">
                        {subject.weakCount}/{subject.totalStudents} sinh viên
                      </p>
                    </div>
                    <span className="text-base font-bold text-rose-600">{subject.percentage}%</span>
                  </div>
                  <button className="mt-2 w-full text-xs font-medium text-blue-600 flex items-center justify-center gap-1">
                    <Eye className="h-3.5 w-3.5" /> Xem chi tiết
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-gradient-to-br from-rose-50 via-white to-amber-50 p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <div className="rounded-full bg-rose-500 p-2 text-white">
                <AlertOctagon className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Early Warning</p>
                <h4 className="text-base font-semibold text-gray-900">Cảnh báo tổng hợp</h4>
              </div>
            </div>
            <div className="space-y-4 text-sm">
              <div className="rounded-xl border border-rose-200 bg-white/70 p-3">
                <p className="text-xs text-gray-500">Môn có nguy cơ trễ tiến độ</p>
                <p className="text-2xl font-bold text-rose-600">{earlyWarning.delayedCourses}</p>
                <span className="text-xs text-rose-500">Cần rà soát kế hoạch giảng dạy</span>
              </div>
              <div className="rounded-xl border border-rose-100 bg-white/70 p-3">
                <p className="text-xs text-gray-500">Buổi hoãn chưa dạy bù</p>
                <p className="text-2xl font-bold text-rose-500">{earlyWarning.pendingMakeup}</p>
                <span className="text-xs text-gray-500">Ưu tiên xếp lịch bù trong tuần</span>
              </div>
              <div className="rounded-xl border border-amber-200 bg-white/70 p-3">
                <p className="text-xs text-gray-500">Giảng viên thiếu tiết nhiều</p>
                <p className="text-2xl font-bold text-amber-500">{earlyWarning.shortageLecturers}</p>
                <span className="text-xs text-amber-500">Cần hỗ trợ thêm trợ giảng</span>
              </div>
              <div className="rounded-xl border border-amber-100 bg-white/70 p-3">
                <p className="text-xs text-gray-500">Tỷ lệ sinh viên giảm hoạt động</p>
                <div className="mt-1 flex items-center gap-3">
                  <p className="text-2xl font-bold text-amber-500">{earlyWarning.inactivityRate}%</p>
                  <div className="flex-1">{renderProgressBar(earlyWarning.inactivityRate, 'amber')}</div>
                </div>
                <span className="text-xs text-gray-500">Kích hoạt nhóm cố vấn hỗ trợ</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndustryAnalysis;
