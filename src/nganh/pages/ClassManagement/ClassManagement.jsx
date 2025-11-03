import React, { useState, useEffect, useMemo } from 'react';
import { BarChart3 } from 'lucide-react';
import ClassKPIs from './components/ClassKPIs';
import ClassSummaryTable from './components/ClassSummaryTable';
import { ProgressByInstructorChart, ScoreFluctuationChart, ClassStatusPieChart } from './components/ClassCharts';
import ClassWarningBox from './components/ClassWarningBox';
import RiskClassDetailModal from './components/RiskClassDetailModal';
import { mockClassData, mockDashboardData } from '../../data/mockData';

const ClassManagement = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRiskClass, setSelectedRiskClass] = useState(null);
  const [showRiskModal, setShowRiskModal] = useState(false);

  useEffect(() => {
    loadClassData();
  }, []);

  const loadClassData = async () => {
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 800));
      // Transform mock data to include risk levels
      const transformedClasses = (mockClassData.classes || []).map(cls => ({
        ...cls,
        course: cls.course || cls.courseName || '',
        instructor: cls.instructor || 'N/A',
        studentCount: cls.enrolledStudents || 0,
        averageProgress: cls.completionRate || 0,
        riskLevel: (cls.completionRate || 0) >= 80 ? 'low' : 
                   (cls.completionRate || 0) >= 60 ? 'medium' : 'high',
        note: (cls.completionRate || 0) < 60 ? 'Gần cảnh báo' :
              (cls.completionRate || 0) < 70 ? 'Cần theo dõi' : '-'
      }));
      setClasses(transformedClasses);
    } catch (error) {
      console.error('Error loading class data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Tính toán stats
  const stats = useMemo(() => {
    const total = classes.length;
    const meetingStandard = classes.filter(c => c.completionRate > 80).length;
    const problematic = classes.filter(c => 
      c.completionRate < 60 || (c.averageScore || 0) < 7
    ).length;
    const avgScore = classes.length > 0
      ? classes.reduce((sum, c) => sum + (c.averageScore || 0), 0) / classes.length
      : 0;
      
    // Tính giảng viên phụ trách nhiều lớp nhất
    const instructorCount = {};
    classes.forEach(cls => {
      const instructor = cls.instructor || 'N/A';
      instructorCount[instructor] = (instructorCount[instructor] || 0) + 1;
    });
    const topInstructor = Object.entries(instructorCount).sort((a, b) => b[1] - a[1])[0];

    return {
      totalClasses: total,
      meetingStandardPercentage: total > 0 ? Math.round((meetingStandard / total) * 100) : 0,
      problematicPercentage: total > 0 ? Math.round((problematic / total) * 100) : 0,
      topInstructorName: topInstructor ? topInstructor[0].split(' ').slice(-2).join(' ') : 'N/A',
      topInstructorClassCount: topInstructor ? topInstructor[1] : 0,
      averageScore: avgScore
    };
  }, [classes]);

  // Dữ liệu cho biểu đồ
  const progressByInstructorData = useMemo(() => {
    const instructorProgress = {};
    classes.forEach(cls => {
      const instructor = cls.instructor || 'N/A';
      if (!instructorProgress[instructor]) {
        instructorProgress[instructor] = { instructor, total: 0, sum: 0 };
        }
      instructorProgress[instructor].sum += cls.completionRate || 0;
      instructorProgress[instructor].total += 1;
    });

    return Object.values(instructorProgress).map(item => ({
      instructor: item.instructor.split(' ').slice(-2).join(' '), // Short name
      progress: Math.round(item.sum / item.total)
    }));
  }, [classes]);

  const classStatusData = useMemo(() => {
    const meeting = classes.filter(c => c.completionRate >= 80).length;
    const medium = classes.filter(c => c.completionRate >= 60 && c.completionRate < 80).length;
    const risk = classes.filter(c => c.completionRate < 60).length;

    return [
      { name: 'Đạt chuẩn', value: meeting, color: '#22c55e' },
      { name: 'Trung bình', value: medium, color: '#f59e0b' },
      { name: 'Rủi ro', value: risk, color: '#ef4444' }
    ];
  }, [classes]);

  const handleClassClick = (classItem) => {
    // Navigate to class detail or show modal
    console.log('View class detail:', classItem);
  };

  const handleViewRiskClasses = () => {
    // Tìm lớp có rủi ro cao nhất
    const riskClasses = classes.filter(c => c.riskLevel === 'high');
    if (riskClasses.length > 0) {
      const firstRiskClass = riskClasses[0];
      // Mock students at risk
      const atRiskStudents = [
        { id: 1, name: 'Nguyễn Văn A', studentId: 'SV001', email: 'a.nguyen@student.edu.vn', averageScore: 5.5, completionRate: 45 },
        { id: 2, name: 'Trần Thị B', studentId: 'SV002', email: 'b.tran@student.edu.vn', averageScore: 5.8, completionRate: 52 },
        { id: 3, name: 'Lê Văn C', studentId: 'SV003', email: 'c.le@student.edu.vn', averageScore: 6.2, completionRate: 58 }
      ];
      setSelectedRiskClass({ ...firstRiskClass, atRiskStudents });
      setShowRiskModal(true);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="card p-4">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
              <BarChart3 className="text-white" size={32} />
            </div>
        <div>
              <h1 className="text-3xl font-bold text-gray-900">Phân tích Lớp học</h1>
          <p className="text-gray-600 mt-1">
                Theo dõi sức khỏe và hiệu suất lớp trong toàn ngành
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* KPI Cards */}
        <ClassKPIs stats={stats} />

        {/* Summary Table */}
        <ClassSummaryTable
          classes={classes}
          onClassClick={handleClassClick}
      />

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Bar Chart */}
          <div className="lg:col-span-2">
            <ProgressByInstructorChart data={progressByInstructorData} />
            </div>

          {/* Pie Chart */}
          <div className="lg:col-span-1">
            <ClassStatusPieChart data={classStatusData} />
          </div>
        </div>

        {/* Line Chart */}
        <div className="mb-6">
          <ScoreFluctuationChart data={[]} />
        </div>

        {/* Warning Box */}
        <div className="mb-6">
          <ClassWarningBox
            warnings={[]}
            onViewRiskClasses={handleViewRiskClasses}
          />
              </div>
      </div>

      {/* Risk Class Detail Modal */}
      <RiskClassDetailModal
        isOpen={showRiskModal}
        onClose={() => {
          setShowRiskModal(false);
          setSelectedRiskClass(null);
        }}
        classData={selectedRiskClass}
        atRiskStudents={selectedRiskClass?.atRiskStudents || []}
      />
    </div>
  );
};

export default ClassManagement;
