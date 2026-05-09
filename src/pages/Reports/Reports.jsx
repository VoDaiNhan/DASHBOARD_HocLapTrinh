import React, { useState, useEffect } from 'react';
import { BarChart3, FileText, Download } from 'lucide-react';
import ReportStats from './components/ReportStats';
import ReportFilters from './components/ReportFilters';
import EnrollmentTrendChart from './components/EnrollmentTrendChart';
import GraduationEmploymentChart from './components/GraduationEmploymentChart';
import AcademicQualityCharts from './components/AcademicQualityCharts';
import ProgressFunnelChart from './components/ProgressFunnelChart';
import EmploymentOutcomesChart from './components/EmploymentOutcomesChart';
import CohortComparisonTable from './components/CohortComparisonTable';

import DepartmentHealthScore from './components/DepartmentHealthScore';
import { AlertTriangle, TrendingUp, TrendingDown, Lightbulb } from 'lucide-react';
import { mockDashboardData, mockStudentTrackingData, mockClassData } from '../../data/mockData';

const AutoInsightsBanner = () => {
  return (
    <div className="bg-indigo-50 border-l-4 border-indigo-500 rounded-r-xl p-4 mb-6 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <Lightbulb className="text-indigo-600" size={20} />
        <h3 className="font-bold text-indigo-900 text-sm uppercase tracking-wider">Insight Tự động (Phát hiện bất thường)</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg p-3 shadow-sm border border-indigo-100 flex items-start gap-3">
          <TrendingUp className="text-rose-500 shrink-0 mt-0.5" size={18} />
          <div>
            <p className="text-sm font-bold text-gray-900">Khóa K23: Nợ môn tăng 18%</p>
            <p className="text-xs text-gray-500 mt-1">So với học kỳ trước. Tập trung ở môn Cấu trúc dữ liệu.</p>
          </div>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border border-indigo-100 flex items-start gap-3">
          <AlertTriangle className="text-amber-500 shrink-0 mt-0.5" size={18} />
          <div>
            <p className="text-sm font-bold text-gray-900">Môn CTDL&GT: Rớt cao (32%)</p>
            <p className="text-xs text-gray-500 mt-1">Đề thi giữa kỳ có mức độ khó cao hơn trung bình.</p>
          </div>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm border border-indigo-100 flex items-start gap-3">
          <TrendingDown className="text-emerald-500 shrink-0 mt-0.5" size={18} />
          <div>
            <p className="text-sm font-bold text-gray-900">GPA toàn ngành giảm 0.4</p>
            <p className="text-xs text-gray-500 mt-1">Đang ở mức 7.1/10. Cần rà soát lại phương pháp đánh giá.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Reports = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({});
  const [performanceData, setPerformanceData] = useState([]);
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [filters, setFilters] = useState({ dateRange: 'week', reportType: 'all' });

  const tabs = [
    { id: 'overview', label: 'Tổng quan & Insight' },
    { id: 'academic', label: 'Chất lượng Đào tạo' },
    { id: 'retention', label: 'Tiến độ & Giữ chân' },
    { id: 'outcomes', label: 'Đầu ra' }
  ];

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

      {/* Tabs Navigation */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-bold text-sm whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ReportFilters onFilterChange={handleFilterChange} />

        {activeTab === 'overview' && (
          <div className="space-y-6">
            <AutoInsightsBanner />
            <ReportStats stats={stats} />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <div className="lg:col-span-1">
                <DepartmentHealthScore />
              </div>
              <div className="lg:col-span-2">
                <CohortComparisonTable />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'academic' && (
          <AcademicQualityCharts />
        )}

        {activeTab === 'retention' && (
          <div className="space-y-6">
            <ProgressFunnelChart />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <EnrollmentTrendChart filters={filters} />
            </div>
          </div>
        )}

        {activeTab === 'outcomes' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <GraduationEmploymentChart filters={filters} />
              <EmploymentOutcomesChart />
            </div>
          </div>
        )}

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
