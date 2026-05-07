import { useState, useMemo } from 'react';
import { Shield, User, Clock, Edit3, CheckCircle, XCircle, Archive, Filter, Search, Download } from 'lucide-react';
import { getAuditLog, getVersionStats, VERSION_TYPES } from '../versioning';

const AuditLogDashboard = ({ onClose }) => {
  const [filters, setFilters] = useState({
    authorId: '',
    type: '',
    dateFrom: '',
    dateTo: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('logs');
  
  const auditLogs = getAuditLog(filters);
  const versionStats = getVersionStats();
  
  // Filter logs by search term
  const filteredLogs = useMemo(() => {
    if (!searchTerm) return auditLogs;
    
    return auditLogs.filter(log => 
      log.exerciseTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.author.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.author.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [auditLogs, searchTerm]);
  
  const getActionIcon = (type) => {
    switch (type) {
      case VERSION_TYPES.CREATED:
        return <Edit3 className="h-4 w-4 text-blue-500" />;
      case VERSION_TYPES.APPROVED:
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case VERSION_TYPES.EDITED:
        return <Edit3 className="h-4 w-4 text-orange-500" />;
      case VERSION_TYPES.REJECTED:
        return <XCircle className="h-4 w-4 text-red-500" />;
      case VERSION_TYPES.ARCHIVED:
        return <Archive className="h-4 w-4 text-gray-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };
  
  const getActionLabel = (type) => {
    switch (type) {
      case VERSION_TYPES.CREATED:
        return 'Tạo mới';
      case VERSION_TYPES.APPROVED:
        return 'Phê duyệt';
      case VERSION_TYPES.EDITED:
        return 'Chỉnh sửa';
      case VERSION_TYPES.REJECTED:
        return 'Từ chối';
      case VERSION_TYPES.ARCHIVED:
        return 'Lưu trữ';
      default:
        return 'Không xác định';
    }
  };
  
  const clearFilters = () => {
    setFilters({
      authorId: '',
      type: '',
      dateFrom: '',
      dateTo: ''
    });
    setSearchTerm('');
  };
  
  const exportLogs = () => {
    // Trong thực tế sẽ export ra CSV/Excel
    const csvContent = [
      ['Thời gian', 'Hành động', 'Bài tập', 'Người thực hiện', 'Email', 'Vai trò'].join(','),
      ...filteredLogs.map(log => [
        new Date(log.timestamp).toLocaleString('vi-VN'),
        getActionLabel(log.type),
        log.exerciseTitle,
        log.author.name,
        log.author.email,
        log.author.role === 'teacher' ? 'Giáo viên' : 'Quản lý'
      ].join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `audit_log_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };
  
  const tabs = [
    { id: 'logs', label: 'Nhật ký hoạt động', icon: Shield },
    { id: 'stats', label: 'Thống kê', icon: CheckCircle }
  ];
  
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] flex flex-col overflow-hidden"
        onClick={e => e.stopPropagation()}>
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Nhật ký kiểm tra & Quản lý phiên bản</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Theo dõi và kiểm soát mọi thay đổi trong hệ thống
                </p>
              </div>
            </div>
            
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <span className="text-gray-500 text-xl leading-none">×</span>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-6 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
          <div className="flex space-x-1">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === 'logs' && (
            <div className="p-6">
              {/* Filters */}
              <div className="mb-6 space-y-4">
                <div className="flex flex-wrap items-center gap-4">
                  {/* Search */}
                  <div className="flex-1 min-w-64">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Tìm kiếm bài tập, người dùng..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Action Type Filter */}
                  <select
                    value={filters.type}
                    onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Tất cả hành động</option>
                    <option value={VERSION_TYPES.CREATED}>Tạo mới</option>
                    <option value={VERSION_TYPES.APPROVED}>Phê duyệt</option>
                    <option value={VERSION_TYPES.EDITED}>Chỉnh sửa</option>
                    <option value={VERSION_TYPES.REJECTED}>Từ chối</option>
                    <option value={VERSION_TYPES.ARCHIVED}>Lưu trữ</option>
                  </select>

                  {/* Date Range */}
                  <input
                    type="date"
                    value={filters.dateFrom}
                    onChange={(e) => setFilters(prev => ({ ...prev, dateFrom: e.target.value }))}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <span className="text-gray-500">đến</span>
                  <input
                    type="date"
                    value={filters.dateTo}
                    onChange={(e) => setFilters(prev => ({ ...prev, dateTo: e.target.value }))}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />

                  {/* Actions */}
                  <button
                    onClick={clearFilters}
                    className="px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                  >
                    Xóa bộ lọc
                  </button>
                  
                  <button
                    onClick={exportLogs}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Download className="h-4 w-4" />
                    Xuất CSV
                  </button>
                </div>
              </div>

              {/* Logs Table */}
              <div className="bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-600">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Thời gian
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Hành động
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Bài tập
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Người thực hiện
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Phiên bản
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                      {filteredLogs.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                            Không có dữ liệu phù hợp với bộ lọc
                          </td>
                        </tr>
                      ) : (
                        filteredLogs.map((log, index) => (
                          <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-600/50">
                            <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                              {new Date(log.timestamp).toLocaleString('vi-VN')}
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                {getActionIcon(log.type)}
                                <span className="text-sm text-gray-900 dark:text-white">
                                  {getActionLabel(log.type)}
                                </span>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                              {log.exerciseTitle}
                            </td>
                            <td className="px-4 py-3">
                              <div>
                                <div className="text-sm font-medium text-gray-900 dark:text-white">
                                  {log.author.name}
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                  {log.author.email} • {log.author.role === 'teacher' ? 'Giáo viên' : 'Quản lý'}
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                              v{log.version}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'stats' && (
            <div className="p-6 space-y-6">
              {/* Overview Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white dark:bg-gray-700 p-4 rounded-xl border border-gray-200 dark:border-gray-600">
                  <div className="flex items-center gap-3 mb-2">
                    <Edit3 className="h-5 w-5 text-blue-500" />
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Tổng bài tập</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {versionStats.totalExercises}
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-700 p-4 rounded-xl border border-gray-200 dark:border-gray-600">
                  <div className="flex items-center gap-3 mb-2">
                    <Clock className="h-5 w-5 text-green-500" />
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Tổng phiên bản</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {versionStats.totalVersions}
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-700 p-4 rounded-xl border border-gray-200 dark:border-gray-600">
                  <div className="flex items-center gap-3 mb-2">
                    <Edit3 className="h-5 w-5 text-orange-500" />
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Sửa đổi tuần này</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {versionStats.recentEdits}
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-700 p-4 rounded-xl border border-gray-200 dark:border-gray-600">
                  <div className="flex items-center gap-3 mb-2">
                    <CheckCircle className="h-5 w-5 text-purple-500" />
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Chờ phê duyệt</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {versionStats.pendingApprovals}
                  </div>
                </div>
              </div>

              {/* Top Editors */}
              <div className="bg-white dark:bg-gray-700 p-6 rounded-xl border border-gray-200 dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Top người chỉnh sửa
                </h3>
                <div className="space-y-3">
                  {Object.entries(versionStats.topEditors)
                    .sort(([,a], [,b]) => b - a)
                    .slice(0, 5)
                    .map(([name, count], index) => (
                      <div key={name} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                              {index + 1}
                            </span>
                          </div>
                          <span className="text-gray-900 dark:text-white">{name}</span>
                        </div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {count} lần chỉnh sửa
                        </span>
                      </div>
                    ))}
                </div>
              </div>

              {/* Actions by Type */}
              <div className="bg-white dark:bg-gray-700 p-6 rounded-xl border border-gray-200 dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Phân bố hành động
                </h3>
                <div className="space-y-3">
                  {Object.entries(versionStats.editsByType).map(([type, count]) => (
                    <div key={type} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {getActionIcon(type)}
                        <span className="text-gray-900 dark:text-white">
                          {getActionLabel(type)}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {count} lần
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuditLogDashboard;