# 🔗 Hệ thống tích hợp Ngân hàng bài tập với LMS

## 📋 Tổng quan

Hệ thống tích hợp cho phép Ngân hàng bài tập kết nối với Learning Management System (LMS) để:

- **Tự động đánh dấu** bài tập đang được sử dụng trong học kỳ hiện tại
- **Thu thập thống kê** về sinh viên đã làm và hoàn thành bài tập
- **Theo dõi tiến độ** của từng lớp học và môn học
- **Cung cấp báo cáo** chi tiết cho giáo viên và quản lý

## 🎯 Câu trả lời cho câu hỏi của bạn

### "Làm sao ngân hàng bài tập biết bài đó đang được dùng trong học kỳ này?"

**Trả lời:** Hệ thống sử dụng **mã định danh bài tập (Exercise Code)** để kết nối:

1. **Tạo mã định danh:** Mỗi bài tập có mã duy nhất (VD: `PROG-CH01-BASIC-001`)
2. **Giao bài trong LMS:** Giáo viên sử dụng mã này khi giao bài cho lớp
3. **Đồng bộ tự động:** Hệ thống kiểm tra LMS API mỗi 30 giây
4. **Cập nhật trạng thái:** Bài tập được đánh dấu `activeSemester = true`

### "Làm sao biết số liệu về sinh viên đã làm và hoàn thành?"

**Trả lời:** Hệ thống lấy dữ liệu từ **LMS Submission API**:

1. **Thu thập dữ liệu:** StudentID, Score, SubmittedAt, Status
2. **Tính toán thống kê:** Tỷ lệ hoàn thành, điểm TB, số bài trễ hạn
3. **Hiển thị real-time:** Cập nhật liên tục trong giao diện
4. **Báo cáo chi tiết:** Theo từng bài tập và toàn môn học

## 🏗️ Kiến trúc hệ thống

```
┌─────────────────┐    API Calls    ┌─────────────────┐
│   Exercise Bank │ ←──────────────→ │       LMS       │
│                 │                 │                 │
│ • Exercise Code │                 │ • Assignments   │
│ • Statistics    │                 │ • Submissions   │
│ • Active Status │                 │ • Student Data  │
└─────────────────┘                 └─────────────────┘
```

## 📊 Các loại thống kê có sẵn

### 1. Thống kê bài tập (Exercise Statistics)
- Tổng số sinh viên được giao
- Số lượng đã nộp bài / chưa nộp
- Tỷ lệ hoàn thành (%)
- Điểm trung bình
- Số bài nộp đúng hạn / trễ hạn
- Danh sách lớp đang sử dụng
- Chi tiết từng sinh viên

### 2. Thống kê môn học (Course Statistics)
- Tổng số lớp học
- Tổng số sinh viên
- Số bài tập đang sử dụng / tổng số bài
- Tỷ lệ hoàn thành trung bình
- Thống kê theo chương
- Tỷ lệ sử dụng bài tập
- Gợi ý cải thiện

## 🔄 Quy trình hoạt động

### Bước 1: Tạo bài tập
```javascript
// Hệ thống tự động tạo mã định danh
const exerciseCode = "PROG-CH01-BASIC-001";
```

### Bước 2: Giao bài trong LMS
```javascript
// Giáo viên sử dụng mã này trong LMS
const assignment = {
  exerciseCode: "PROG-CH01-BASIC-001",
  classId: "KTLT_N01",
  dueDate: "2024-09-22"
};
```

### Bước 3: Đồng bộ tự động
```javascript
// Hệ thống kiểm tra LMS mỗi 30 giây
const activeExercises = await LMS_API.getAssignedExercises();
const syncedBank = syncActiveSemesterStatus(exerciseBank);
```

### Bước 4: Thu thập dữ liệu sinh viên
```javascript
// Lấy kết quả làm bài từ LMS
const submissions = await LMS_API.getSubmissionData(exerciseCode);
const statistics = calculateStatistics(submissions);
```

## 🛠️ Cách sử dụng trong giao diện

### 1. Xem bài tập đang được sử dụng
- Badge **"Đang dùng HK"** xuất hiện trên bài tập đang được giao
- Nút **"Học kỳ hiện tại"** để bật/tắt chế độ đánh dấu học kỳ

### 2. Xem thống kê bài tập
- Nút **👥 (Users icon)** trên bài tập có badge "Đang dùng HK"
- Hiển thị modal với thống kê chi tiết

### 3. Xem thống kê môn học
- Nút **"Thống kê môn học"** trong trang chi tiết môn học
- Hiển thị tổng quan toàn bộ môn học

### 4. Hướng dẫn tích hợp
- Nút **"Hướng dẫn tích hợp"** trong trang chính
- Giải thích chi tiết cách hệ thống hoạt động

## 📡 API Integration

### Endpoints cần thiết từ LMS:

```javascript
// 1. Lấy danh sách bài tập được giao
GET /api/assignments?semester={semesterId}

// 2. Lấy kết quả làm bài
GET /api/submissions?exerciseCode={code}

// 3. Cập nhật trạng thái bài tập
PUT /api/exercises/{code}/status
```

### Dữ liệu mẫu:

```javascript
// Assignment Data
{
  "exerciseCode": "PROG-CH01-BASIC-001",
  "classId": "KTLT_N01",
  "className": "Kỹ thuật lập trình - Nhóm 1",
  "teacher": "TS. Nguyễn Văn A",
  "studentCount": 45,
  "assignedDate": "2024-09-15",
  "dueDate": "2024-09-22",
  "status": "active"
}

// Submission Data
{
  "exerciseCode": "PROG-CH01-BASIC-001",
  "totalStudents": 45,
  "submissions": [
    {
      "studentId": "SV001",
      "studentName": "Nguyễn Văn An",
      "submittedAt": "2024-09-20T10:30:00Z",
      "score": 8.5,
      "status": "completed"
    }
  ],
  "statistics": {
    "submitted": 42,
    "notSubmitted": 3,
    "averageScore": 8.2,
    "completionRate": 93.3,
    "onTime": 38,
    "late": 4
  }
}
```

## 🔧 Cấu hình kỹ thuật

### 1. Environment Variables
```env
LMS_API_BASE_URL=https://lms.university.edu.vn/api
LMS_API_TOKEN=your_jwt_token_here
SYNC_INTERVAL=30000  # 30 seconds
```

### 2. Sync Configuration
```javascript
const syncConfig = {
  interval: 30000,        // 30 giây
  retryAttempts: 3,       // Thử lại 3 lần khi lỗi
  timeout: 5000,          // Timeout 5 giây
  fallbackToCache: true   // Dùng cache khi API lỗi
};
```

## 🚀 Triển khai thực tế

### Bước 1: Cấu hình API
1. Thiết lập endpoints trong LMS
2. Tạo JWT token cho authentication
3. Cấu hình CORS cho cross-origin requests

### Bước 2: Thay thế Mock Data
1. Thay `ASSIGNED_EXERCISES` bằng API calls thực
2. Thay `STUDENT_SUBMISSIONS` bằng dữ liệu từ database
3. Cập nhật `LMS_API` functions với endpoints thực

### Bước 3: Testing
1. Test API connectivity
2. Verify data synchronization
3. Check real-time updates
4. Performance testing với large datasets

## 📈 Lợi ích của hệ thống

### Cho Giáo viên:
- ✅ Tự động theo dõi tiến độ sinh viên
- ✅ Thống kê chi tiết về kết quả học tập
- ✅ Không cần cập nhật thủ công
- ✅ Phát hiện sớm sinh viên gặp khó khăn

### Cho Quản lý:
- ✅ Tổng quan toàn bộ chương trình học
- ✅ So sánh hiệu quả giữa các lớp
- ✅ Đánh giá chất lượng bài tập
- ✅ Báo cáo định kỳ tự động

### Cho Sinh viên:
- ✅ Theo dõi tiến độ cá nhân
- ✅ So sánh với lớp học
- ✅ Nhận feedback kịp thời
- ✅ Động lực học tập cao hơn

## 🔮 Tính năng mở rộng

### 1. AI Analytics
- Dự đoán khả năng hoàn thành của sinh viên
- Gợi ý bài tập phù hợp với từng sinh viên
- Phát hiện pattern học tập

### 2. Gamification
- Ranking sinh viên theo điểm số
- Achievement badges
- Progress streaks

### 3. Mobile App
- Thông báo push khi có bài tập mới
- Offline mode cho việc làm bài
- Sync khi có internet

---

**Kết luận:** Hệ thống tích hợp này giải quyết hoàn toàn câu hỏi của bạn về việc theo dõi bài tập đang được sử dụng và thống kê sinh viên. Tất cả đều được tự động hóa và cập nhật real-time! 🎉