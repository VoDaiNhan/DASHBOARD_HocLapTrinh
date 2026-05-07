import { useState } from 'react';
import { CheckCircle, XCircle, Clock, AlertTriangle, Eye, MessageCircle, ArrowLeftRight } from 'lucide-react';
import { getVersionHistory, VERSION_STATUS, approveVersion, rejectVersion } from '../versioning';

const VersionManagement = ({ exerciseId, onClose, currentUserRole = 'manager', currentLevel = 'basic', onLevelSwitch }) => {
  const [selectedVersion, setSelectedVersion] = useState(null);
  const [rejectReason, setRejectReason] = useState('');
  const [showRejectModal, setShowRejectModal] = useState(null);
  const [showLevelSwitchConfirm, setShowLevelSwitchConfirm] = useState(false);
  
  const history = getVersionHistory(exerciseId);
  const pendingVersions = history.versions.filter(v => v.status === VERSION_STATUS.PENDING);
  const activeVersion = history.versions.find(v => v.version === history.activeVersion);
  
  const handleApprove = (version) => {
    try {
      approveVersion(exerciseId, version.version, {
        id: 'manager_001',
        name: 'PGS. Trần Thị Bình',
        role: 'manager',
        email: 'binh.tt@university.edu.vn'
      });
      
      alert(`Version ${version.version} đã được phê duyệt và áp dụng!`);
      // Refresh hoặc callback để update UI
    } catch (error) {
      alert(`Lỗi: ${error.message}`);
    }
  };
  
  const handleReject = (version) => {
    if (!rejectReason.trim()) {
      alert('Vui lòng nhập lý do từ chối');
      return;
    }
    
    try {
      rejectVersion(exerciseId, version.version, {
        id: 'manager_001',
        name: 'PGS. Trần Thị Bình',
        role: 'manager',
        email: 'binh.tt@university.edu.vn'
      }, rejectReason);
      
      alert(`Version ${version.version} đã bị từ chối!`);
      setShowRejectModal(null);
      setRejectReason('');
    } catch (error) {
      alert(`Lỗi: ${error.message}`);
    }
  };
  
  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-300';
      case 'major':
        return 'bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300';
      case 'minor':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-300';
    }
  };
  
  const handleLevelSwitch = () => {
    const targetLevel = currentLevel === 'basic' ? 'advanced' : 'basic';
    if (onLevelSwitch) {
      onLevelSwitch(targetLevel);
      setShowLevelSwitchConfirm(false);
      alert(`Đã chuyển bài tập sang mức độ ${targetLevel === 'basic' ? 'Cơ bản' : 'Nâng cao'}`);
    }
  };
  
  return (
    <>
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={onClose}>
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden"
          onClick={e => e.stopPropagation()}>
          
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Quản lý phiên bản</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Đang sử dụng: v{history.activeVersion} • {pendingVersions.length} version chờ duyệt
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {currentUserRole === 'manager' && onLevelSwitch && (
                  <button
                    onClick={() => setShowLevelSwitchConfirm(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                    title="Chuyển mức độ bài tập"
                  >
                    <ArrowLeftRight className="h-4 w-4" />
                    Chuyển sang {currentLevel === 'basic' ? 'Nâng cao' : 'Cơ bản'}
                  </button>
                )}
                
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <span className="text-gray-500 text-xl leading-none">×</span>
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {/* Active Version */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Phiên bản đang sử dụng
              </h3>
              
              {activeVersion && (
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-bold text-green-700 dark:text-green-300">
                        v{activeVersion.version}
                      </span>
                      <span className="px-2 py-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 rounded-full text-xs font-medium">
                        Đang sử dụng
                      </span>
                    </div>
                    
                    <button
                      onClick={() => setSelectedVersion(selectedVersion === activeVersion.version ? null : activeVersion.version)}
                      className="flex items-center gap-2 px-3 py-1 text-sm text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/20 rounded-lg transition-colors"
                    >
                      <Eye className="h-4 w-4" />
                      {selectedVersion === activeVersion.version ? 'Ẩn' : 'Xem'} chi tiết
                    </button>
                  </div>
                  
                  {activeVersion.contentSnapshot && (
                    <div className="text-sm text-green-700 dark:text-green-300">
                      <p className="font-medium">{activeVersion.contentSnapshot.title}</p>
                      <p className="opacity-75">{activeVersion.contentSnapshot.goal}</p>
                    </div>
                  )}
                  
                  {selectedVersion === activeVersion.version && activeVersion.contentSnapshot && (
                    <div className="mt-4 pt-4 border-t border-green-200 dark:border-green-800">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <h5 className="font-medium text-green-800 dark:text-green-200 mb-2">Nội dung:</h5>
                          <div className="space-y-1 text-green-700 dark:text-green-300">
                            <p><span className="font-medium">Mô tả:</span> {activeVersion.contentSnapshot.description || 'Không có'}</p>
                            <p><span className="font-medium">Mức độ:</span> {activeVersion.contentSnapshot.level}</p>
                            <p><span className="font-medium">Tags:</span> {activeVersion.contentSnapshot.tags?.join(', ') || 'Không có'}</p>
                          </div>
                        </div>
                        <div>
                          <h5 className="font-medium text-green-800 dark:text-green-200 mb-2">Gợi ý:</h5>
                          <ul className="text-green-700 dark:text-green-300 text-xs space-y-1">
                            {activeVersion.contentSnapshot.hints?.map((hint, index) => (
                              <li key={index}>• {hint}</li>
                            )) || <li>Không có gợi ý</li>}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Pending Versions */}
            {pendingVersions.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Phiên bản chờ phê duyệt ({pendingVersions.length})
                </h3>
                
                <div className="space-y-4">
                  {pendingVersions.map(version => (
                    <div key={version.version} className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-4">
                      {/* Version Header */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <span className="text-lg font-bold text-yellow-700 dark:text-yellow-300">
                            v{version.version}
                          </span>
                          <span className="px-2 py-1 bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300 rounded-full text-xs font-medium">
                            Chờ phê duyệt
                          </span>
                          <span className="text-xs text-yellow-600 dark:text-yellow-400">
                            {new Date(version.timestamp).toLocaleDateString('vi-VN')}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setSelectedVersion(selectedVersion === version.version ? null : version.version)}
                            className="flex items-center gap-1 px-2 py-1 text-xs text-yellow-600 dark:text-yellow-400 hover:bg-yellow-100 dark:hover:bg-yellow-900/20 rounded transition-colors"
                          >
                            <Eye className="h-3 w-3" />
                            {selectedVersion === version.version ? 'Ẩn' : 'Xem'}
                          </button>
                          
                          {currentUserRole === 'manager' && (
                            <>
                              <button
                                onClick={() => handleApprove(version)}
                                className="flex items-center gap-1 px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700 transition-colors"
                              >
                                <CheckCircle className="h-3 w-3" />
                                Duyệt
                              </button>
                              <button
                                onClick={() => setShowRejectModal(version)}
                                className="flex items-center gap-1 px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700 transition-colors"
                              >
                                <XCircle className="h-3 w-3" />
                                Từ chối
                              </button>
                            </>
                          )}
                          
                          {currentUserRole === 'teacher' && (
                            <span className="text-xs text-yellow-600 dark:text-yellow-400 px-2 py-1 bg-yellow-100 dark:bg-yellow-900/20 rounded">
                              Chờ quản lý phê duyệt
                            </span>
                          )}
                        </div>
                      </div>
                      
                      {/* Author & Change Note */}
                      <div className="text-sm text-yellow-700 dark:text-yellow-300 mb-3">
                        <p><span className="font-medium">Người sửa:</span> {version.author.name} ({version.author.role === 'teacher' ? 'Giáo viên' : 'Quản lý'})</p>
                        {version.changeNote && (
                          <p><span className="font-medium">Lý do:</span> {version.changeNote}</p>
                        )}
                      </div>
                      
                      {/* Changes Summary */}
                      {version.changes && version.changes.length > 0 && (
                        <div className="mb-3">
                          <h5 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                            Thay đổi ({version.changes.length}):
                          </h5>
                          <div className="flex flex-wrap gap-2">
                            {version.changes.map((change, index) => (
                              <span key={index} className={`px-2 py-1 text-xs rounded-full ${getSeverityColor(change.severity)}`}>
                                {change.field} ({change.severity === 'critical' ? 'Quan trọng' : 
                                              change.severity === 'major' ? 'Lớn' : 'Nhỏ'})
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Detailed Content */}
                      {selectedVersion === version.version && version.contentSnapshot && (
                        <div className="mt-4 pt-4 border-t border-yellow-200 dark:border-yellow-800">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <h5 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">Nội dung mới:</h5>
                              <div className="space-y-1 text-yellow-700 dark:text-yellow-300">
                                <p><span className="font-medium">Tiêu đề:</span> {version.contentSnapshot.title}</p>
                                <p><span className="font-medium">Mục tiêu:</span> {version.contentSnapshot.goal}</p>
                                <p><span className="font-medium">Mô tả:</span> {version.contentSnapshot.description || 'Không có'}</p>
                                <p><span className="font-medium">Mức độ:</span> {version.contentSnapshot.level}</p>
                                <p><span className="font-medium">Tags:</span> {version.contentSnapshot.tags?.join(', ') || 'Không có'}</p>
                              </div>
                            </div>
                            <div>
                              <h5 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">Chi tiết thay đổi:</h5>
                              <div className="space-y-2">
                                {version.changes?.map((change, index) => (
                                  <div key={index} className="text-xs">
                                    <div className="font-medium text-yellow-800 dark:text-yellow-200">{change.field}:</div>
                                    {change.oldValue && (
                                      <div className="text-red-600 dark:text-red-400">- {Array.isArray(change.oldValue) ? change.oldValue.join(', ') : change.oldValue}</div>
                                    )}
                                    {change.newValue && (
                                      <div className="text-green-600 dark:text-green-400">+ {Array.isArray(change.newValue) ? change.newValue.join(', ') : change.newValue}</div>
                                    )}
                                  </div>
                                )) || <p className="text-yellow-600 dark:text-yellow-400 text-xs">Không có chi tiết thay đổi</p>}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {pendingVersions.length === 0 && (
              <div className="text-center py-8">
                <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Không có phiên bản chờ phê duyệt
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Tất cả thay đổi đã được xử lý
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-60 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                <MessageCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Từ chối phiên bản v{showRejectModal.version}
              </h3>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Lý do từ chối *
              </label>
              <textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="Nhập lý do từ chối và gợi ý cải thiện..."
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
              />
            </div>
            
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => {
                  setShowRejectModal(null);
                  setRejectReason('');
                }}
                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={() => handleReject(showRejectModal)}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <XCircle className="h-4 w-4" />
                Từ chối
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Level Switch Confirmation Modal */}
      {showLevelSwitchConfirm && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-60 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                <ArrowLeftRight className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Chuyển mức độ bài tập
              </h3>
            </div>
            
            <div className="mb-6">
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                Bạn có chắc muốn chuyển bài tập này từ mức độ <span className="font-semibold">{currentLevel === 'basic' ? 'Cơ bản' : 'Nâng cao'}</span> sang <span className="font-semibold">{currentLevel === 'basic' ? 'Nâng cao' : 'Cơ bản'}</span>?
              </p>
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3">
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  ⚠️ Lưu ý: Thao tác này sẽ di chuyển bài tập sang chương tương ứng ở mức độ khác. Các thông tin phiên bản và lịch sử sẽ được giữ nguyên.
                </p>
              </div>
            </div>
            
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setShowLevelSwitchConfirm(false)}
                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={handleLevelSwitch}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <ArrowLeftRight className="h-4 w-4" />
                Xác nhận chuyển
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VersionManagement;