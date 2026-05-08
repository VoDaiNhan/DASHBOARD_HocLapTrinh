import React, { useState, useEffect } from 'react';
import { BarChart3 } from 'lucide-react';
import AlertPanel from './components/AlertPanel';
import CompactKPIs from './components/CompactKPIs';
import AttendanceChart from './components/AttendanceChart';
import AutoInsights from './components/AutoInsights';
import AttendanceReportModal from './components/AttendanceReportModal';
import AcademicProgressModal from './components/AcademicProgressModal';
import AssignmentMissingModal from './components/AssignmentMissingModal';
import CourseFailRateModal from './components/CourseFailRateModal';
import TopBottomStudents from './components/TopBottomStudents';
import StudentGroupDetailModal from './components/StudentGroupDetailModal';
import { mockStudentTrackingData } from '../../data/mockData';

const StudentTracking = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [showGroupModal, setShowGroupModal] = useState(false);

  // Modal states
  const [showAttendanceModal, setShowAttendanceModal] = useState(false);
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [showAssignmentModal, setShowAssignmentModal] = useState(false);
  const [showFailRateModal, setShowFailRateModal] = useState(false);

  const [modalStudents, setModalStudents] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        await new Promise(r => setTimeout(r, 800));
        setStudents(mockStudentTrackingData.students || []);
      } catch (e) {
        console.error('Error:', e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const stats = React.useMemo(() => {
    const total = students.length;
    const atRisk = students.filter(s => s.riskLevel === 'high' || s.completionRate < 70 || s.averageScore < 6.0).length;
    const completed = students.filter(s => s.completionRate >= 80).length;
    const avgScore = total > 0 ? students.reduce((sum, s) => sum + (s.averageScore || 0), 0) / total : 0;
    return {
      totalStudents: total,
      atRiskPercentage: total > 0 ? Math.round((atRisk / total) * 100) : 0,
      completedPercentage: total > 0 ? Math.round((completed / total) * 100) : 0,
      averageScore: avgScore
    };
  }, [students]);

  const handleAlertClick = (action) => {
    switch (action) {
      case 'attendance': setShowAttendanceModal(true); break;
      case 'progress': setShowProgressModal(true); break;
      case 'assignment': setShowAssignmentModal(true); break;
      case 'fail': setShowFailRateModal(true); break;
      default: break;
    }
  };

  if (loading) {
    return (
      <div className="space-y-6 p-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-4 gap-3 mb-6">
            {[...Array(4)].map((_, i) => (<div key={i} className="h-16 bg-gray-200 rounded-xl"></div>))}
          </div>
          <div className="h-40 bg-gray-200 rounded-2xl mb-4"></div>
          <div className="h-60 bg-gray-200 rounded-2xl"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
              <BarChart3 className="text-white" size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Phân tích Sinh viên Ngành</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">SV đang học ổn không? — Theo dõi rủi ro và kết quả đào tạo</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* 1. ALERT PANEL — Có vấn đề gì? */}
        <AlertPanel
          students={students}
          onAlertClick={handleAlertClick}
        />

        {/* 3. ATTENDANCE (FULL WIDTH) + INSIGHTS (BELOW) */}
        <div className="space-y-6 mb-6">
          <div className="w-full vip-card p-2">
            <AttendanceChart />
          </div>
          <div className="w-full vip-card p-2">
            <TopBottomStudents
              students={students}
            />
          </div>
        </div>
      </div>

      {/* Modals */}
      <AttendanceReportModal
        isOpen={showAttendanceModal}
        onClose={() => setShowAttendanceModal(false)}
      />

      <AcademicProgressModal
        isOpen={showProgressModal}
        onClose={() => setShowProgressModal(false)}
      />

      <AssignmentMissingModal
        isOpen={showAssignmentModal}
        onClose={() => setShowAssignmentModal(false)}
      />

      <CourseFailRateModal
        isOpen={showFailRateModal}
        onClose={() => setShowFailRateModal(false)}
      />

      <StudentGroupDetailModal
        isOpen={showGroupModal}
        onClose={() => { setShowGroupModal(false); setSelectedGroup(null); setModalStudents([]); }}
        groupData={selectedGroup}
        students={modalStudents}
      />
    </div>
  );
};

export default StudentTracking;
