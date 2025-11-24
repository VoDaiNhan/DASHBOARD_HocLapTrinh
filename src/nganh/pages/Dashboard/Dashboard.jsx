import React, { useState, useEffect } from 'react';
import DashboardHeader from './components/DashboardHeader';
import KPIMetrics from './components/KPIMetrics';
import CoursePerformanceSection from './components/CoursePerformanceSection';
import ProgressOverview from './components/ProgressOverview';
import NotificationPanel from './components/NotificationPanel';
import PerformanceChart from './components/PerformanceChart';
import IndustryAnalysis from './components/IndustryAnalysis';
import CourseCompletionTrend from './components/CourseCompletionTrend';
import StudentRatingTrend from './components/StudentRatingTrend';
import SkillCompletionTrend from './components/SkillCompletionTrend';
import { mockDashboardData } from '../../data/mockData';

const CONFIG_STORAGE_KEY = 'dashboardCardConfigs';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    course: 'all',
    class: 'all',
    performance: 'all',
    status: 'all'
  });
  const [searchText, setSearchText] = useState('');
  const [completionRange, setCompletionRange] = useState('all');
  const [cardConfigs, setCardConfigs] = useState([]);

  useEffect(() => {
    // Simulate API call
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setDashboardData(mockDashboardData);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, [filters]);

  useEffect(() => {
    const saved = localStorage.getItem(CONFIG_STORAGE_KEY);
    if (saved) {
      try {
        setCardConfigs(JSON.parse(saved));
      } catch {
        setCardConfigs([]);
      }
    }
  }, []);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleIndustryFilterChange = (newFilters) => {
    console.log('Industry filters changed:', newFilters);
    // Xử lý filter change nếu cần
  };


  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="card p-6">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 card p-6">
              <div className="h-64 bg-gray-200 rounded"></div>
            </div>
            <div className="card p-6">
              <div className="h-64 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <DashboardHeader />
      
      {/* Phân bố năng lực theo môn học - đã gộp filter và bảng */}
      <div>
        <CoursePerformanceSection 
          searchText={searchText} 
          completionRange={completionRange}
          onSearchChange={setSearchText}
          onCompletionRangeChange={setCompletionRange}
          onFilterChange={handleIndustryFilterChange}
          showLectureCard={cardConfigs.find((c) => c.type === 'lectureEffectiveness' && c.enabled)}
          lectureTitle={cardConfigs.find((c) => c.type === 'lectureEffectiveness')?.title}
          lectureNote={cardConfigs.find((c) => c.type === 'lectureEffectiveness')?.description}
        />
        {cardConfigs.find((c) => c.type === 'courseCompletion' && c.enabled) && (
          <CourseCompletionTrend
            title={cardConfigs.find((c) => c.type === 'courseCompletion')?.title}
            description={cardConfigs.find((c) => c.type === 'courseCompletion')?.description}
          />
        )}
        {cardConfigs.find((c) => c.type === 'studentRating' && c.enabled) && (
          <StudentRatingTrend
            title={cardConfigs.find((c) => c.type === 'studentRating')?.title}
            description={cardConfigs.find((c) => c.type === 'studentRating')?.description}
          />
        )}
        {cardConfigs.find((c) => c.type === 'skillTrend' && c.enabled) && (
          <SkillCompletionTrend
            title={cardConfigs.find((c) => c.type === 'skillTrend')?.title}
            description={cardConfigs.find((c) => c.type === 'skillTrend')?.description}
          />
        )}
      </div>
      
      {/* Chỉ số tổng quan nhanh (KPI Cards) */}
      <div>
        <KPIMetrics data={dashboardData?.kpiMetrics} />
      </div>
      
      {/* Phân Tích Ngành */}
      <IndustryAnalysis />
      
      {/* Các phần khác giữ nguyên */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <ProgressOverview data={dashboardData?.progressOverview} selectedClass={filters.class} />
          <PerformanceChart data={dashboardData?.performanceChart} />
        </div>
        
        <div className="space-y-6">
          <NotificationPanel data={dashboardData?.notifications} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
