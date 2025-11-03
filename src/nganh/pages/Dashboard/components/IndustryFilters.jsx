import React, { useState } from 'react';
import { Filter, BarChart3, FileText } from 'lucide-react';

const IndustryFilters = ({ onFilterChange, onAnalyze, onExport }) => {
  const [filters, setFilters] = useState({
    semester: 'all',
    subject: 'all',
    lecturer: 'all',
    status: 'all'
  });

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Bộ lọc */}
        <div className="flex flex-wrap items-center gap-3">
          <Filter className="h-4 w-4 text-gray-500" />
          <select
            value={filters.semester}
            onChange={(e) => handleFilterChange('semester', e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Học kỳ</option>
            <option value="2024-1">Học kỳ 1 - 2024</option>
            <option value="2024-2">Học kỳ 2 - 2024</option>
            <option value="2025-1">Học kỳ 1 - 2025</option>
          </select>

          <select
            value={filters.subject}
            onChange={(e) => handleFilterChange('subject', e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Môn</option>
            <option value="intro-prog">Nhập môn lập trình</option>
            <option value="prog-technique">Kĩ thuật lập trình</option>
            <option value="oop">Lập trình hướng đối tượng</option>
            <option value="data-struct-algo">Cấu trúc dữ liệu và giải thuật</option>
          </select>

          <select
            value={filters.lecturer}
            onChange={(e) => handleFilterChange('lecturer', e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Giảng viên</option>
            <option value="TS. Nguyễn Văn An">TS. Nguyễn Văn An</option>
            <option value="TS. Trần Thị Bình">TS. Trần Thị Bình</option>
            <option value="TS. Lê Văn Cường">TS. Lê Văn Cường</option>
          </select>

          <select
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Tình trạng môn</option>
            <option value="risk">Nguy cơ</option>
            <option value="stable">Ổn định</option>
            <option value="completed">Hoàn thành</option>
          </select>
        </div>

        {/* Các nút tương tác */}
        <div className="flex items-center gap-3">
          <button
            onClick={onAnalyze}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            <BarChart3 className="h-4 w-4" />
            Phân tích chi tiết ngành
          </button>
          
          <button
            onClick={onExport}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium"
          >
            <FileText className="h-4 w-4" />
            Xuất báo cáo ngành
          </button>
        </div>
      </div>
    </div>
  );
};

export default IndustryFilters;

