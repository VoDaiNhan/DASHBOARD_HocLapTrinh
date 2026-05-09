import React, { useState, useEffect } from 'react';
import { BarChart3, FileText, Download } from 'lucide-react';
import ReportStats from './components/ReportStats';
import ReportFilters from './components/ReportFilters';
import EnrollmentTrendChart from './components/EnrollmentTrendChart';
import GraduationEmploymentChart from './components/GraduationEmploymentChart';

import DepartmentHealthScore from './components/DepartmentHealthScore';
import { mockDashboardData, mockStudentTrackingData, mockClassData } from '../../data/mockData';

const Reports = () => {
  const [stats, setStats] = useState({});
  const [performanceData, setPerformanceData] = useState([]);
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [filters, setFilters] = useState({ dateRange: 'week', reportType: 'all' });

  useEffect(() => {
    // Load stats
    setStats({
      totalStudents: 660,
      studentChange: 12,
      totalTeachers: mockDashboardData.kpiMetrics.totalTeachers,
      teacherChange: mockDashboardData.kpiMetrics.teacherChange,
      graduationRate: 85.2,
      graduationChange: 2.5,
      employmentRate: 92.5,
      employmentChange: 1.8,
      averageScore: 7.5,
      scoreChange: 3.2,
      atRiskStudents: 15,
      atRiskPercentage: 8,
      riskChange: -5,
      activeCourses: mockDashboardData.kpiMetrics.activeCourses || 4,
      courseChange: mockDashboardData.kpiMetrics.courseChange || 0,
      activeClasses: 12,
      classChange: 2,
      completionRate: mockDashboardData.kpiMetrics.averageProgress || 78.5,
      completionChange: mockDashboardData.kpiMetrics.progressChange || 3.2,
      atRiskCourses: 1,
      riskCourseChange: 0
    });

    // Load performance data
    setPerformanceData(mockDashboardData.performanceChart);

    // Load students
    setStudents(mockStudentTrackingData.students);

    // Load courses
    setCourses(mockDashboardData.courseMonitoring);
  }, []);

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
                <BarChart3 className="text-white" size={32} />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Phân Tích Ngành</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  Ngành mình đang đi đúng hướng không? — Phân tích vĩ mô toàn ngành
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Cập nhật: {new Date().toLocaleDateString('vi-VN')}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* KPI Stats - 6 cards */}
        <ReportStats stats={stats} />

        {/* Filters */}
        <ReportFilters onFilterChange={handleFilterChange} />

        {/* Row 1: Enrollment Trend + Graduation/Employment */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <EnrollmentTrendChart filters={filters} />
          <GraduationEmploymentChart filters={filters} />
        </div>


        {/* Row 3: Department Health */}
        <div className="flex justify-center mb-6">
          <div className="w-full lg:w-1/2">
            <DepartmentHealthScore />
          </div>
        </div>

        {/* Export Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 mt-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Xuất Báo Cáo</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Tải xuống báo cáo chi tiết định dạng PDF hoặc Excel</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => alert('Tính năng xuất PDF sẽ được triển khai')}
                className="flex items-center gap-2 px-4 py-2.5 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors text-sm font-medium shadow-sm"
              >
                <FileText className="h-4 w-4" />
                Xuất PDF
              </button>
              <button
                onClick={() => alert('Tính năng xuất Excel sẽ được triển khai')}
                className="flex items-center gap-2 px-4 py-2.5 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors text-sm font-medium shadow-sm"
              >
                <Download className="h-4 w-4" />
                Xuất Excel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
