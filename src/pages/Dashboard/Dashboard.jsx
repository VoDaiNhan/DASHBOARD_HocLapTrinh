import React, { Suspense, lazy } from 'react';
import DashboardHeader from './components/DashboardHeader';

// Lazy load heavy chart components
const SkillsProficiencyChart = lazy(() => import('./components/SkillsProficiencyChart'));
const AcademicRankingChart = lazy(() => import('./components/AcademicRankingChart'));
const CourseCompletionChart = lazy(() => import('./components/CourseCompletionChart'));
const PerformanceHeatmap = lazy(() => import('./components/PerformanceHeatmap'));

const ChartSkeleton = () => (
  <div className="animate-pulse bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm">
    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-6"></div>
    <div className="h-64 bg-gray-100 dark:bg-gray-700 rounded"></div>
  </div>
);

const Dashboard = () => {
  return (
    <div className="space-y-6 pb-20">
      <DashboardHeader />
      
      <div className="space-y-6">
        <Suspense fallback={<ChartSkeleton />}>
          <CourseCompletionChart />
        </Suspense>
        
        <Suspense fallback={<ChartSkeleton />}>
          <AcademicRankingChart />
        </Suspense>

        <Suspense fallback={<ChartSkeleton />}>
          <SkillsProficiencyChart />
        </Suspense>
      </div>
    </div>
  );
};

export default Dashboard;