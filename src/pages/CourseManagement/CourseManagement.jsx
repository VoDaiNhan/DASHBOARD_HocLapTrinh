import React, { useState, useEffect } from 'react';
import { BookOpen, Search, Filter, Download, AlertCircle } from 'lucide-react';
import CourseKPIs from './components/CourseKPIs';
import CourseAlertCenter from './components/CourseAlertCenter';
import CourseHealthScore from './components/CourseHealthScore';
import TeacherImpact from './components/TeacherImpact';
import CourseAnalytics from './components/CourseAnalytics';
import CourseFilters from './components/CourseFilters';
import { mockDashboardData } from '../../data/mockData';

const CourseManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-gray-900 pb-20">
      {/* Header section with Premium design */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 pt-8 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="p-4 bg-indigo-600 rounded-3xl shadow-xl shadow-indigo-100 rotate-3 hover:rotate-0 transition-transform">
                <BookOpen className="text-white" size={32} />
              </div>
              <div>
                <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Giám sát Chất lượng Đào tạo</h1>
                <p className="text-sm text-gray-500 font-bold uppercase tracking-widest mt-1">Hệ thống phân tích Hiệu suất khóa học cấp quản lý</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
                <input
                  type="text"
                  placeholder="Tìm kiếm môn học, giảng viên..."
                  className="pl-12 pr-6 py-3.5 bg-gray-50 dark:bg-gray-700/50 border-none rounded-2xl text-sm font-bold w-64 lg:w-80 focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className={`p-3.5 rounded-2xl border transition-all ${isFilterOpen ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white dark:bg-gray-800 border-gray-200 text-gray-600 hover:border-indigo-600 hover:text-indigo-600'}`}
              >
                <Filter size={20} />
              </button>
              <button className="flex items-center gap-2 px-6 py-3.5 bg-gray-900 dark:bg-black text-white text-xs font-black uppercase tracking-widest rounded-2xl hover:bg-black transition-all shadow-xl">
                <Download size={16} /> Xuất báo cáo
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        {/* TOP: KPI — Các chỉ số đào tạo then chốt */}
        <CourseKPIs />

        {/* MID 1: ALERTS — Những gì cần xử lý ngay? */}
        <CourseAlertCenter />

        {/* MID 2: HEALTH & HEATMAP — Scan nhanh sức khỏe toàn khóa */}
        <CourseHealthScore />

        {/* MID 3: TEACHER IMPACT — Đánh giá đội ngũ giảng dạy */}
        <TeacherImpact />

        {/* MID 4: ANALYTICS — Trend và Phễu hoàn thành */}
        <CourseAnalytics />

        {/* Footer recommendation (Factual only) */}
        <div className="bg-indigo-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl shadow-indigo-200">
          <div className="absolute top-0 right-0 p-10 opacity-10">
            <AlertCircle size={120} />
          </div>
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <h3 className="text-xl font-black mb-3 flex items-center gap-3">
                <AlertCircle className="text-indigo-300" /> Đề xuất hành động Factual
              </h3>
              <div className="space-y-2">
                <p className="text-sm font-medium text-indigo-100 flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0"></span>
                  Lập trình hướng đối tượng (OOP) có tỷ lệ rớt cao nhất ngành (28%) - Cần review ngân hàng đề thi.
                </p>
                <p className="text-sm font-medium text-indigo-100 flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0"></span>
                  3 lớp thuộc khóa K25 môn CTDLGT đang có GPA trung bình dưới chuẩn 6.5.
                </p>
                <p className="text-sm font-medium text-indigo-100 flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0"></span>
                  Giảng viên GV B có tỷ lệ Completion thấp (71%) cần được hỗ trợ về công cụ giảng dạy online.
                </p>
              </div>
            </div>
            <button className="px-8 py-4 bg-white text-indigo-900 text-xs font-black uppercase tracking-widest rounded-2xl hover:bg-indigo-50 transition-all shrink-0 shadow-lg">
              Lên lịch họp tổ bộ môn
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseManagement;
