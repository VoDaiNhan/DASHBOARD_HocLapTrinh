import { useState } from 'react';
import { History, User, Clock, Edit3, CheckCircle, XCircle, Archive, GitBranch, RotateCcw, Eye, AlertTriangle } from 'lucide-react';
import { getVersionHistory, VERSION_TYPES, VERSION_STATUS, EDIT_TYPES, approveVersion, rejectVersion } from '../versioning';

const VersionHistory = ({ exerciseId, onClose, onRollback, onApprove, onReject, currentUserRole = 'teacher' }) => {
  const [selectedVersion, setSelectedVersion] = useState(null);
  const [showRollbackConfirm, setShowRollbackConfirm] = useState(null);
  const [showContentModal, setShowContentModal] = useState(null);
  
  const history = getVersionHistory(exerciseId);
  
  const getVersionIcon = (type) => {
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
  
  const getVersionLabel = (type) => {
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

  const getStatusLabel = (status) => {
    switch (status) {
      case VERSION_STATUS.DRAFT:
        return 'Bản nháp';
      case VERSION_STATUS.PENDING:
        return 'Chờ phê duyệt';
      case VERSION_STATUS.APPROVED:
        return 'Đã duyệt';
      case VERSION_STATUS.REJECTED:
        return 'Bị từ chối';
      case VERSION_STATUS.SUPERSEDED:
        return 'Đã thay thế';
      default:
        return 'Không xác định';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case VERSION_STATUS.DRAFT:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300';
      case VERSION_STATUS.PENDING:
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300';
      case VERSION_STATUS.APPROVED:
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300';
      case VERSION_STATUS.REJECTED:
        return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300';
      case VERSION_STATUS.SUPERSEDED:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };
  
  const getEditTypeLabel = (editType) => {
    switch (editType) {
      case EDIT_TYPES.TITLE:
        return 'Tiêu đề';
      case EDIT_TYPES.GOAL:
        return 'Mục tiêu';
      case EDIT_TYPES.DESCRIPTION:
        return 'Mô tả';
      case EDIT_TYPES.TAGS:
        return 'Tags';
      case EDIT_TYPES.HINTS:
        return 'Gợi ý';
      case EDIT_TYPES.LEVEL:
        return 'Mức độ';
      case EDIT_TYPES.CHAPTER:
        return 'Chương';
      case EDIT_TYPES.COURSE:
        return 'Môn học';
      default:
        return editType;
    }
  };
  
  const handleApprove = (version) => {
    if (onApprove) {
      onApprove(exerciseId, version.version);
    }
  };

  const handleReject = (version, reason) => {
    if (onReject) {
      onReject(exerciseId, version.version, reason);
    }
  };
  
  const handleRollback = (version) => {
    if (onRollback) {
      onRollback(version.version);
    }
    setShowRollbackConfirm(null);
  };
  
  return (
    <>
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={onClose}>
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden"
          onClick={e => e.stopPropagation()}>
          
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                  <History className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Lịch sử phiên bản</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Phiên bản hiện tại: {history.currentVersion} • {history.versions.length} phiên bản
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

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {history.versions.length === 0 ? (
              <div className="text-center py-12">
                <History className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Chưa có lịch sử phiên bản
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Bài tập này chưa có thay đổi nào được ghi lại
                </p>
              </div>
            ) : (
              <div className="p-6">
                {/* Timeline */}
                <div className="relative">
                  {/* Timeline line */}
                  <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700"></div>
                  
                  {history.versions.map((version, index) => (
                    <div key={version.version} className="relative flex items-start gap-4 pb-8">
                      {/* Timeline dot */}
                      <div className="relative z-10 flex items-center justify-center w-16 h-16 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-full">
                        {getVersionIcon(version.type)}
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 p-4">
                          {/* Version Header */}
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <span className="text-lg font-bold text-gray-900 dark:text-white">
                                v{version.version}
                              </span>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                version.type === VERSION_TYPES.APPROVED ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' :
                                version.type === VERSION_TYPES.CREATED ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' :
                                version.type === VERSION_TYPES.EDITED ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300' :
                                'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300'
                              }`}>
                                {getVersionLabel(version.type)}
                              </span>
                              {index === 0 && (
                                <span className="px-2 py-1 bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 rounded-full text-xs font-medium">
                                  Hiện tại
                                </span>
                              )}
                            </div>
                            
                            {index > 0 && (
                              <button
                                onClick={() => setShowRollbackConfirm(version)}
                                className="flex items-center gap-1 px-3 py-1 text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                              >
                                <RotateCcw className="h-3 w-3" />
                                Rollback
                              </button>
                            )}
                          </div>
                          
                          {/* Author & Time */}
                          <div className="flex items-center gap-4 mb-3 text-sm text-gray-600 dark:text-gray-400">
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4" />
                              <span>{version.author.name}</span>
                              <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-600 rounded text-xs">
                                {version.author.role === 'teacher' ? 'Giáo viên' : 'Quản lý'}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4" />
                              <span>{new Date(version.timestamp).toLocaleString('vi-VN')}</span>
                            </div>
                          </div>
                          
                          {/* Changes */}
                          {version.changes && version.changes.length > 0 && (
                            <div className="space-y-3">
                              <h4 className="font-medium text-gray-900 dark:text-white">Thay đổi:</h4>
                              {version.changes.map((change, changeIndex) => (
                                <div key={changeIndex} className="bg-gray-50 dark:bg-gray-600/50 p-3 rounded-lg">
                                  <div className="flex items-center gap-2 mb-2">
                                    <GitBranch className="h-4 w-4 text-gray-500" />
                                    <span className="font-medium text-gray-900 dark:text-white">
                                      {getEditTypeLabel(change.field)}
                                    </span>
                                  </div>
                                  
                                  {change.field !== 'rollback' && (
                                    <div className="space-y-2 text-sm">
                                      {change.oldValue && (
                                        <div>
                                          <span className="text-red-600 dark:text-red-400 font-medium">- Cũ: </span>
                                          <span className="text-gray-700 dark:text-gray-300">
                                            {Array.isArray(change.oldValue) ? change.oldValue.join(', ') : change.oldValue}
                                          </span>
                                        </div>
                                      )}
                                      {change.newValue && (
                                        <div>
                                          <span className="text-green-600 dark:text-green-400 font-medium">+ Mới: </span>
                                          <span className="text-gray-700 dark:text-gray-300">
                                            {Array.isArray(change.newValue) ? change.newValue.join(', ') : change.newValue}
                                          </span>
                                        </div>
                                      )}
                                    </div>
                                  )}
                                  
                                  {change.reason && (
                                    <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                      <span className="font-medium">Lý do: </span>
                                      {change.reason}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                          
                          {/* Approval Info */}
                          {version.approvedBy && (
                            <div className="mt-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                              <div className="flex items-center gap-2 text-green-700 dark:text-green-300">
                                <CheckCircle className="h-4 w-4" />
                                <span className="font-medium">
                                  Đã phê duyệt bởi {version.approvedBy.name}
                                </span>
                                <span className="text-sm">
                                  • {new Date(version.approvedBy.timestamp).toLocaleString('vi-VN')}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Rollback Confirmation Modal */}
      {showRollbackConfirm && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-60 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                <RotateCcw className="h-5 w-5 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Xác nhận Rollback
              </h3>
            </div>
            
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Bạn có chắc chắn muốn rollback về phiên bản <strong>v{showRollbackConfirm.version}</strong>?
              Thao tác này sẽ tạo một phiên bản mới với nội dung của phiên bản đã chọn.
            </p>
            
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setShowRollbackConfirm(null)}
                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={() => handleRollback(showRollbackConfirm)}
                className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
              >
                <RotateCcw className="h-4 w-4" />
                Rollback
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VersionHistory;