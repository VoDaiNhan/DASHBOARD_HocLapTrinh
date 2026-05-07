import React, { Suspense, lazy } from 'react';
import DashboardHeader from './components/DashboardHeader';

// Lazy load heavy chart components
const CourseCompletionChart = lazy(() => import('./components/CourseCompletionChart'));
const AcademicRankingChart = lazy(() => import('./components/AcademicRankingChart'));
const SkillsProficiencyChart = lazy(() => import('./components/SkillsProficiencyChart'));

const ChartSkeleton = () => (
  <div className="animate-pulse card p-6">
    <div className="h-6 bg-gray-200 rounded w-1/4 mb-6"></div>
    <div className="h-64 bg-gray-100 rounded"></div>
  </div>
);

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <DashboardHeader />
      
      {/* 3 Bảng chính */}
      <div className="space-y-6">
        <Suspense fallback={<ChartSkeleton />}>
          {/* Bảng 1: Tỉ lệ hoàn thành môn qua các năm */}
          <CourseCompletionChart />
        </Suspense>
        
        <Suspense fallback={<ChartSkeleton />}>
          {/* Bảng 2: Xếp loại học lực 7 mức độ */}
          <AcademicRankingChart />
        </Suspense>
        
        <Suspense fallback={<ChartSkeleton />}>
          {/* Bảng 3: Tập kỹ năng và mức độ thành thạo */}
          <SkillsProficiencyChart />
        </Suspense>
      </div>
    </div>
  );
};

export default Dashboard;