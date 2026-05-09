import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Users, BookOpen, Award, UserCheck, GraduationCap, Briefcase, X } from 'lucide-react';
import { useTheme } from '../../../contexts/ThemeContext';
import { mockDepartmentData, mockClassData, mockStudentTrackingData } from '../../../data/mockData';

function getClassesSummary() {
  const { classes } = mockClassData;
  const classSummaries = classes.map(c => ({
    name: c.name,
    course: c.course,
    enrolled: c.enrolledStudents,
    instructor: c.instructor,
  }));
  return classSummaries;
}

function getTeachersSummary() {
  return mockDepartmentData.teachers.map(t => ({
    name: t.name,
    specialization: t.specialization,
    classes: t.classes || [],
  }));
}

function getTodayClasses() {
  const today = 'Thứ Sáu'; // Mock current day
  return mockClassData.classes.filter(c => c.schedule.includes(today)).map(c => ({
    name: c.name,
    course: c.course,
    location: c.location,
    instructor: c.instructor,
    session: c.session,
    time: c.time || "07:30 - 11:30"
  }));
}

function getProgressStats() {
  const { classes } = mockClassData;
  const classAvgs = classes.map(c => ({
    name: c.name,
    course: c.course,
    avg: (6.5 + Math.random() * 2).toFixed(1)
  }));
  const deptAvg = (classAvgs.reduce((acc, curr) => acc + parseFloat(curr.avg), 0) / classAvgs.length).toFixed(1);
  return { classAvgs, departmentAvg: deptAvg };
}

const KPIMetrics = () => {
  const { isDarkMode } = useTheme();
  const [openModal, setOpenModal] = useState(null);

  const metrics = [
    {
      title: 'Tng Sinh ViA?n',
      value: '1,284',
      change: '+12%',
      trend: 'up',
      icon: Users,
      color: 'blue',
      source: 'H? sA? giA?o vA? n',
      modalType: 'students',
      bgGradient: 'from-blue-500/10 to-indigo-500/10'
    },
    {
      title: 'Tng GiA?ng ViA?n',
      value: '86',
      change: '+4%',
      trend: 'up',
      icon: Briefcase,
      color: 'purple',
      source: 'PhA2ng nhA?n sA?',
      modalType: 'teachers',
      bgGradient: 'from-purple-500/10 to-violet-500/10'
    },
    {
      title: 'L?p ?ang DiAn Ra',
      value: '12',
      change: '?ang h?c',
      trend: 'stable',
      icon: BookOpen,
      color: 'emerald',
      source: 'ThA?i khA3a biAu',
      modalType: 'ongoing',
      bgGradient: 'from-emerald-500/10 to-teal-500/10'
    },
    {
      title: 'TiA?n ?A? Trung BAnh',
      value: '7.8',
      change: '+0.3',
      trend: 'up',
      icon: GraduationCap,
      color: 'amber',
      source: 'KA?t quA? h?c tA?p',
      modalType: 'progress',
      bgGradient: 'from-amber-500/10 to-orange-500/10'
    }
  ];

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {metrics.map((metric, i) => (
          <div 
            key={i} 
            onClick={() => setOpenModal(metric.modalType)}
            className={`relative group bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border-2 border-gray-50 dark:border-gray-800 shadow-sm transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-100/50 hover:-translate-y-2 cursor-pointer overflow-hidden`}
          >
            {/* Background Accent */}
            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${metric.bgGradient} blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className={`p-4 rounded-2xl bg-gradient-to-br ${metric.bgGradient} transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6`}>
                  <metric.icon size={28} className={
                    metric.color === 'blue' ? 'text-blue-600' :
                    metric.color === 'purple' ? 'text-purple-600' :
                    metric.color === 'emerald' ? 'text-emerald-600' :
                    'text-amber-600'
                  } />
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 bg-gray-50 dark:bg-gray-800 rounded-full">
                  {metric.trend === 'up' ? (
                    <TrendingUp size={14} className="text-emerald-500" />
                  ) : metric.trend === 'down' ? (
                    <TrendingDown size={14} className="text-rose-500" />
                  ) : (
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                  )}
                  <span className={`text-[10px] font-black uppercase tracking-widest ${
                    metric.trend === 'up' ? 'text-emerald-600' :
                    metric.trend === 'down' ? 'text-rose-600' :
                    'text-blue-600'
                  }`}>
                    {metric.change}
                  </span>
                </div>
              </div>

              <div className="space-y-1">
                <h4 className="text-[11px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">{metric.title}</h4>
                <p className="text-4xl font-black text-gray-900 dark:text-white tracking-tighter">{metric.value}</p>
                <p className="text-[9px] font-bold text-gray-400 dark:text-gray-600 uppercase tracking-widest mt-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="w-1 h-1 rounded-full bg-gray-300" />
                  Nguồn: {metric.source}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modals */}
      {openModal === 'students' && (
        <Modal onClose={() => setOpenModal(null)} title="Tổng Sinh Viên">
          <table className="min-w-full border text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800">
                <th className="py-2 px-4 border">Lớp</th>
                <th className="py-2 px-4 border">Khóa học</th>
                <th className="py-2 px-4 border">Số SV</th>
                <th className="py-2 px-4 border">Giảng viên</th>
              </tr>
            </thead>
            <tbody>
              {getClassesSummary().map((row, i) => (
                <tr key={i} className="text-center">
                  <td className="py-1 px-2 border">{row.name}</td>
                  <td className="py-1 px-2 border">{row.course}</td>
                  <td className="py-1 px-2 border">{row.enrolled}</td>
                  <td className="py-1 px-2 border">{row.instructor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Modal>
      )}

      {openModal === 'teachers' && (
        <Modal onClose={() => setOpenModal(null)} title="Tổng Giảng Viên">
          <table className="min-w-full border text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800">
                <th className="py-2 px-4 border">Tên GV</th>
                <th className="py-2 px-4 border">Chuyên môn</th>
                <th className="py-2 px-4 border">Lớp phu trách</th>
              </tr>
            </thead>
            <tbody>
              {getTeachersSummary().map((teacher, i) => (
                <tr key={i} className="text-center">
                  <td className="py-1 px-2 border">{teacher.name}</td>
                  <td className="py-1 px-2 border">{teacher.specialization}</td>
                  <td className="py-1 px-2 border">{teacher.classes.length} lớp</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Modal>
      )}

      {openModal === 'ongoing' && (
        <Modal onClose={() => setOpenModal(null)} title="Lớp Đang Diễn Ra">
          <table className="min-w-full border text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800">
                <th className="py-2 px-4 border">Lớp</th>
                <th className="py-2 px-4 border">Môn</th>
                <th className="py-2 px-4 border">Phòng</th>
                <th className="py-2 px-4 border">Ca</th>
              </tr>
            </thead>
            <tbody>
              {getTodayClasses().map((row, i) => (
                <tr key={i} className="text-center">
                  <td className="py-1 px-2 border">{row.name}</td>
                  <td className="py-1 px-2 border">{row.course}</td>
                  <td className="py-1 px-2 border">{row.location}</td>
                  <td className="py-1 px-2 border">{row.session}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Modal>
      )}

      {openModal === 'progress' && (
        <Modal onClose={() => setOpenModal(null)} title="Tiến Độ Trung Bình">
          <div className="mb-4 text-center">
            <span className="text-3xl font-black text-indigo-600">{getProgressStats().departmentAvg}</span>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Điểm TB Ngành</p>
          </div>
          <table className="min-w-full border text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800">
                <th className="py-2 px-4 border">Lớp</th>
                <th className="py-2 px-4 border">Môn</th>
                <th className="py-2 px-4 border">Điểm TB</th>
              </tr>
            </thead>
            <tbody>
              {getProgressStats().classAvgs.map((item, idx) => (
                <tr key={idx} className="text-center">
                  <td className="py-1 px-2 border">{item.name}</td>
                  <td className="py-1 px-2 border">{item.course}</td>
                  <td className="py-1 px-2 border">{item.avg}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Modal>
      )}
    </>
  );
};

function Modal({ onClose, title, children }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900/40 backdrop-blur-sm">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-2xl p-8 relative overflow-hidden border border-white/20">
        <button onClick={onClose} className="absolute right-6 top-6 text-gray-400 hover:text-indigo-600 transition-colors">
          <X size={24} />
        </button>
        <h3 className="text-xl font-black mb-6 text-gray-900 dark:text-white uppercase tracking-tight">{title}</h3>
        <div className="overflow-y-auto max-h-[60vh] scrollbar-none">
          {children}
        </div>
      </div>
    </div>
  );
}

export default KPIMetrics;