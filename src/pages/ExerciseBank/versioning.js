// Hệ thống versioning và audit log
export const VERSION_TYPES = {
  CREATED: 'created',
  APPROVED: 'approved', 
  EDITED: 'edited',
  REJECTED: 'rejected',
  ARCHIVED: 'archived'
};

export const VERSION_STATUS = {
  DRAFT: 'draft',           // Bản nháp đang chỉnh sửa
  PENDING: 'pending',       // Chờ phê duyệt
  APPROVED: 'approved',     // Đã được duyệt (active)
  REJECTED: 'rejected',     // Bị từ chối
  SUPERSEDED: 'superseded'  // Bị thay thế bởi version mới
};

export const EDIT_TYPES = {
  TITLE: 'title',
  GOAL: 'goal',
  DESCRIPTION: 'description',
  TAGS: 'tags',
  HINTS: 'hints',
  LEVEL: 'level',
  CHAPTER: 'chapter',
  COURSE: 'course'
};

export const EDIT_SEVERITY = {
  MINOR: 'minor',     // Typo, format, hints
  MAJOR: 'major',     // Content, logic, structure
  CRITICAL: 'critical' // Sai kiến thức, security issue
};

// Mock data cho version history
export const EXERCISE_VERSIONS = {
  'approved_1703123456789': {
    currentVersion: '1.2.0',
    activeVersion: '1.1.0', // Version hiện tại đang được sử dụng
    versions: [
      {
        version: '1.2.0',
        type: VERSION_TYPES.EDITED,
        status: VERSION_STATUS.PENDING,
        timestamp: '2024-12-20T14:30:00Z',
        author: {
          id: 'teacher_003',
          name: 'TS. Nguyễn Văn An',
          role: 'teacher',
          email: 'an.nv@university.edu.vn'
        },
        // Content snapshot - lưu toàn bộ nội dung tại thời điểm này
        contentSnapshot: {
          title: 'Cài đặt Stack sử dụng Linked List với error handling',
          goal: 'Hiểu cách implement Stack sử dụng Linked List với các operations: push, pop, peek, isEmpty và xử lý lỗi',
          description: 'Implement Stack data structure sử dụng Linked List. Bao gồm error handling cho stack overflow/underflow.',
          tags: ['stack', 'linked-list', 'data-structure', 'error-handling'],
          hints: [
            'Sử dụng struct Node với data và next pointer',
            'Implement push/pop operations với O(1) complexity',
            'Xử lý trường hợp stack rỗng và stack đầy',
            'Thêm error codes cho các trường hợp exception'
          ],
          level: 'advanced',
          courseName: 'Kỹ thuật lập trình',
          chapterTitle: 'Chương 1: Con trỏ và bộ nhớ'
        },
        changes: [
          {
            field: EDIT_TYPES.TITLE,
            oldValue: 'Cài đặt Stack sử dụng Linked List',
            newValue: 'Cài đặt Stack sử dụng Linked List với error handling',
            severity: EDIT_SEVERITY.MAJOR,
            reason: 'Thêm yêu cầu xử lý lỗi để tăng độ khó và tính thực tế'
          },
          {
            field: EDIT_TYPES.DESCRIPTION,
            oldValue: 'Implement Stack data structure sử dụng Linked List với các operations cơ bản',
            newValue: 'Implement Stack data structure sử dụng Linked List. Bao gồm error handling cho stack overflow/underflow.',
            severity: EDIT_SEVERITY.MAJOR,
            reason: 'Bổ sung chi tiết về error handling'
          },
          {
            field: EDIT_TYPES.TAGS,
            oldValue: ['stack', 'linked-list', 'data-structure'],
            newValue: ['stack', 'linked-list', 'data-structure', 'error-handling'],
            severity: EDIT_SEVERITY.MINOR,
            reason: 'Thêm tag error-handling'
          }
        ],
        changeNote: 'Cập nhật bài tập để thêm yêu cầu xử lý lỗi, làm cho bài tập thực tế hơn và phù hợp với level advanced',
        approvedBy: null,
        reviewedBy: null
      },
      {
        version: '1.1.0',
        type: VERSION_TYPES.APPROVED,
        status: VERSION_STATUS.APPROVED, // Version hiện tại đang active
        timestamp: '2024-12-18T09:15:00Z',
        author: {
          id: 'manager_001',
          name: 'PGS. Trần Thị Bình',
          role: 'manager',
          email: 'binh.tt@university.edu.vn'
        },
        contentSnapshot: {
          title: 'Cài đặt Stack sử dụng Linked List',
          goal: 'Hiểu cách implement Stack sử dụng Linked List với các operations: push, pop, peek, isEmpty',
          description: 'Implement Stack data structure sử dụng Linked List với các operations cơ bản',
          tags: ['stack', 'linked-list', 'data-structure'],
          hints: [
            'Sử dụng struct Node với data và next pointer',
            'Implement push/pop operations',
            'Xử lý trường hợp stack rỗng'
          ],
          level: 'advanced',
          courseName: 'Kỹ thuật lập trình',
          chapterTitle: 'Chương 1: Con trỏ và bộ nhớ'
        },
        changes: [],
        changeNote: 'Phê duyệt bài tập từ giáo viên',
        approvedBy: {
          id: 'manager_001',
          name: 'PGS. Trần Thị Bình',
          timestamp: '2024-12-18T09:15:00Z'
        },
        reviewedBy: null
      },
      {
        version: '1.0.0',
        type: VERSION_TYPES.CREATED,
        status: VERSION_STATUS.SUPERSEDED,
        timestamp: '2024-12-17T16:45:00Z',
        author: {
          id: 'teacher_003',
          name: 'TS. Nguyễn Văn An',
          role: 'teacher',
          email: 'an.nv@university.edu.vn'
        },
        contentSnapshot: {
          title: 'Stack với Linked List',
          goal: 'Implement Stack',
          description: 'Tạo Stack bằng Linked List',
          tags: ['stack', 'linked-list'],
          hints: ['Dùng Node', 'Push/Pop'],
          level: 'basic',
          courseName: 'Kỹ thuật lập trình',
          chapterTitle: 'Chương 1: Con trỏ và bộ nhớ'
        },
        changes: [],
        changeNote: 'Tạo bài tập mới',
        approvedBy: null,
        reviewedBy: null
      }
    ]
  }
};

/**
 * Tạo version mới khi có thay đổi
 */
export const createNewVersion = (exerciseId, changes, author, type = VERSION_TYPES.EDITED, contentSnapshot = null, changeNote = '') => {
  // Đảm bảo exerciseId tồn tại
  if (!exerciseId) {
    throw new Error('Exercise ID is required');
  }
  
  const existingVersions = EXERCISE_VERSIONS[exerciseId]?.versions || [];
  const currentVersion = EXERCISE_VERSIONS[exerciseId]?.currentVersion || '1.0.0';
  
  // Tính version mới
  const [major, minor, patch] = currentVersion.split('.').map(Number);
  let newVersion;
  let status;
  
  switch (type) {
    case VERSION_TYPES.CREATED:
      newVersion = '1.0.0';
      status = VERSION_STATUS.PENDING;
      break;
    case VERSION_TYPES.EDITED:
      // Kiểm tra severity để quyết định increment
      const hasMajorChanges = changes.some(change => change.severity === EDIT_SEVERITY.MAJOR || change.severity === EDIT_SEVERITY.CRITICAL);
      if (hasMajorChanges) {
        newVersion = `${major}.${minor + 1}.0`; // Minor increment cho major changes
      } else {
        newVersion = `${major}.${minor}.${patch + 1}`; // Patch increment cho minor changes
      }
      status = VERSION_STATUS.PENDING; // Cần phê duyệt
      break;
    case VERSION_TYPES.APPROVED:
      newVersion = currentVersion; // Giữ nguyên version, chỉ đổi status
      status = VERSION_STATUS.APPROVED;
      break;
    case VERSION_TYPES.REJECTED:
      newVersion = currentVersion;
      status = VERSION_STATUS.REJECTED;
      break;
    default:
      newVersion = `${major}.${minor}.${patch + 1}`;
      status = VERSION_STATUS.PENDING;
  }
  
  const newVersionEntry = {
    version: newVersion,
    type,
    status,
    timestamp: new Date().toISOString(),
    author,
    contentSnapshot: contentSnapshot || null,
    changes: changes || [],
    changeNote: changeNote || '',
    approvedBy: type === VERSION_TYPES.APPROVED ? author : null,
    reviewedBy: null
  };
  
  // Cập nhật version history
  if (!EXERCISE_VERSIONS[exerciseId]) {
    // Tạo mới nếu chưa tồn tại
    EXERCISE_VERSIONS[exerciseId] = {
      currentVersion: newVersion,
      activeVersion: type === VERSION_TYPES.APPROVED ? newVersion : '1.0.0',
      versions: [newVersionEntry]
    };
    
    // Nếu đây là bài tập đã tồn tại nhưng chưa có version history, tạo version gốc
    if (type === VERSION_TYPES.EDITED && contentSnapshot) {
      const originalVersion = {
        version: '1.0.0',
        type: VERSION_TYPES.APPROVED,
        status: VERSION_STATUS.APPROVED,
        timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 ngày trước
        author: {
          id: 'system',
          name: 'Hệ thống',
          role: 'system',
          email: 'system@university.edu.vn'
        },
        contentSnapshot: contentSnapshot,
        changes: [],
        changeNote: 'Version gốc được tạo tự động',
        approvedBy: null,
        reviewedBy: null
      };
      
      EXERCISE_VERSIONS[exerciseId].versions.push(originalVersion);
      EXERCISE_VERSIONS[exerciseId].activeVersion = '1.0.0';
    }
  } else {
    EXERCISE_VERSIONS[exerciseId].currentVersion = newVersion;
    
    // Cập nhật activeVersion khi approve
    if (type === VERSION_TYPES.APPROVED) {
      // Đánh dấu version cũ là superseded
      const oldActiveVersion = EXERCISE_VERSIONS[exerciseId].activeVersion;
      EXERCISE_VERSIONS[exerciseId].versions.forEach(v => {
        if (v.version === oldActiveVersion && v.status === VERSION_STATUS.APPROVED) {
          v.status = VERSION_STATUS.SUPERSEDED;
        }
      });
      
      EXERCISE_VERSIONS[exerciseId].activeVersion = newVersion;
    }
    
    EXERCISE_VERSIONS[exerciseId].versions.unshift(newVersionEntry);
  }
  
  return newVersionEntry;
};

/**
 * Lấy lịch sử thay đổi của bài tập
 */
export const getVersionHistory = (exerciseId) => {
  return EXERCISE_VERSIONS[exerciseId] || {
    currentVersion: '1.0.0',
    activeVersion: '1.0.0',
    versions: []
  };
};

/**
 * Lấy nội dung của version cụ thể
 */
export const getVersionContent = (exerciseId, version) => {
  const history = getVersionHistory(exerciseId);
  const versionData = history.versions.find(v => v.version === version);
  return versionData?.contentSnapshot || null;
};

/**
 * Lấy version đang active (đang được sử dụng)
 */
export const getActiveVersion = (exerciseId) => {
  const history = getVersionHistory(exerciseId);
  const activeVersion = history.versions.find(v => v.version === history.activeVersion);
  
  // Nếu không tìm thấy active version, trả về version mới nhất có status APPROVED
  if (!activeVersion) {
    const approvedVersions = history.versions.filter(v => v.status === VERSION_STATUS.APPROVED);
    if (approvedVersions.length > 0) {
      return approvedVersions[0]; // Lấy version approved mới nhất
    }
    
    // Nếu không có version approved nào, trả về version đầu tiên
    if (history.versions.length > 0) {
      return history.versions[0];
    }
    
    // Nếu không có version nào, trả về null
    return null;
  }
  
  return activeVersion;
};

/**
 * Kiểm tra xem có version nào đang pending không
 */
export const hasPendingVersion = (exerciseId) => {
  const history = getVersionHistory(exerciseId);
  return history.versions.some(v => v.status === VERSION_STATUS.PENDING);
};

/**
 * Phê duyệt version pending
 */
export const approveVersion = (exerciseId, version, approver) => {
  const history = getVersionHistory(exerciseId);
  const versionToApprove = history.versions.find(v => v.version === version && v.status === VERSION_STATUS.PENDING);
  
  if (!versionToApprove) {
    throw new Error(`Version ${version} not found or not pending`);
  }
  
  // Đánh dấu version cũ là superseded
  const oldActiveVersion = history.activeVersion;
  history.versions.forEach(v => {
    if (v.version === oldActiveVersion && v.status === VERSION_STATUS.APPROVED) {
      v.status = VERSION_STATUS.SUPERSEDED;
    }
  });
  
  // Approve version mới
  versionToApprove.status = VERSION_STATUS.APPROVED;
  versionToApprove.approvedBy = {
    ...approver,
    timestamp: new Date().toISOString()
  };
  
  // Cập nhật activeVersion
  EXERCISE_VERSIONS[exerciseId].activeVersion = version;
  
  return versionToApprove;
};

/**
 * Từ chối version pending
 */
export const rejectVersion = (exerciseId, version, reviewer, reason) => {
  const history = getVersionHistory(exerciseId);
  const versionToReject = history.versions.find(v => v.version === version && v.status === VERSION_STATUS.PENDING);
  
  if (!versionToReject) {
    throw new Error(`Version ${version} not found or not pending`);
  }
  
  versionToReject.status = VERSION_STATUS.REJECTED;
  versionToReject.reviewedBy = {
    ...reviewer,
    timestamp: new Date().toISOString(),
    reason: reason
  };
  
  return versionToReject;
};

/**
 * So sánh 2 version để hiển thị diff
 */
export const compareVersions = (exerciseId, fromVersion, toVersion) => {
  const history = getVersionHistory(exerciseId);
  const fromVersionData = history.versions.find(v => v.version === fromVersion);
  const toVersionData = history.versions.find(v => v.version === toVersion);
  
  if (!fromVersionData || !toVersionData) {
    return null;
  }
  
  return {
    from: fromVersionData,
    to: toVersionData,
    changes: toVersionData.changes || []
  };
};

/**
 * Lấy audit log cho dashboard quản lý
 */
export const getAuditLog = (filters = {}) => {
  const allLogs = [];
  
  Object.entries(EXERCISE_VERSIONS).forEach(([exerciseId, data]) => {
    data.versions.forEach(version => {
      allLogs.push({
        exerciseId,
        ...version,
        exerciseTitle: `Bài tập ${exerciseId}` // Trong thực tế sẽ lookup từ database
      });
    });
  });
  
  // Apply filters
  let filteredLogs = allLogs;
  
  if (filters.authorId) {
    filteredLogs = filteredLogs.filter(log => log.author.id === filters.authorId);
  }
  
  if (filters.type) {
    filteredLogs = filteredLogs.filter(log => log.type === filters.type);
  }
  
  if (filters.dateFrom) {
    filteredLogs = filteredLogs.filter(log => new Date(log.timestamp) >= new Date(filters.dateFrom));
  }
  
  if (filters.dateTo) {
    filteredLogs = filteredLogs.filter(log => new Date(log.timestamp) <= new Date(filters.dateTo));
  }
  
  // Sort by timestamp desc
  return filteredLogs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
};

/**
 * Tạo audit log entry
 */
export const createAuditLog = (exerciseId, action, author, details = {}) => {
  const logEntry = {
    id: `audit_${Date.now()}`,
    exerciseId,
    action,
    author,
    details,
    timestamp: new Date().toISOString(),
    ipAddress: '192.168.1.100', // Mock IP
    userAgent: navigator.userAgent
  };
  
  // Trong thực tế sẽ ghi vào database
  console.log('Audit Log:', logEntry);
  
  return logEntry;
};

/**
 * Lấy thống kê version cho dashboard
 */
export const getVersionStats = () => {
  const stats = {
    totalExercises: Object.keys(EXERCISE_VERSIONS).length,
    totalVersions: 0,
    recentEdits: 0,
    pendingApprovals: 0,
    topEditors: {},
    editsByType: {}
  };
  
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  
  Object.values(EXERCISE_VERSIONS).forEach(data => {
    stats.totalVersions += data.versions.length;
    
    data.versions.forEach(version => {
      // Count recent edits
      if (new Date(version.timestamp) > oneWeekAgo) {
        stats.recentEdits++;
      }
      
      // Count pending approvals
      if (version.status === 'pending') {
        stats.pendingApprovals++;
      }
      
      // Count by editor
      const editorName = version.author.name;
      stats.topEditors[editorName] = (stats.topEditors[editorName] || 0) + 1;
      
      // Count by type
      stats.editsByType[version.type] = (stats.editsByType[version.type] || 0) + 1;
    });
  });
  
  return stats;
};

/**
 * Rollback về version trước đó
 */
export const rollbackToVersion = (exerciseId, targetVersion, author) => {
  const history = getVersionHistory(exerciseId);
  const targetVersionData = history.versions.find(v => v.version === targetVersion);
  
  if (!targetVersionData) {
    throw new Error(`Version ${targetVersion} not found`);
  }
  
  // Tạo version mới với nội dung của target version
  const rollbackChanges = [{
    field: 'rollback',
    oldValue: history.currentVersion,
    newValue: targetVersion,
    reason: `Rollback to version ${targetVersion}`
  }];
  
  return createNewVersion(exerciseId, rollbackChanges, author, VERSION_TYPES.EDITED);
};