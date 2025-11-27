# PHÂN LOẠI ĐỀ TÀI VÀ PHÂN TÍCH CHỈ SỐ - DASHBOARD SINH VIÊN

## 📋 TỔNG QUAN (QUẢN LÝ GIẢNG VIÊN)

Tài liệu này phân loại các đề tài theo từng trang và phân tích các chỉ số/metrics của từng đề tài trong Dashboard Sinh viên.

---

## 🏠 TRANG 1: DASHBOARD (Dashboard.jsx)

### DT050: Dashboard Tiến độ Học lập trình cho Sinh viên
**Vị trí:** Hàng 1 - Bên phải (cùng hàng với "Các môn đã đăng ký")

**Mô tả:**
- Biểu đồ LineChart hiển thị tiến độ học tập theo tuần
- So sánh "Mục tiêu (theo tuần)" với tiến độ thực tế của từng khóa học

**Input:**
- `enrolledCourses`: Danh sách khóa học đã đăng ký
- `generateProgressData()`: Hàm tạo dữ liệu tiến độ từ enrolledCourses
- `weeklyTargets`: Mục tiêu tiến độ theo tuần (12.5%, 25%, 37.5%, ..., 100%)

**Output/Chỉ số hiển thị:**
- **Biểu đồ LineChart:**
  - Đường "Mục tiêu (theo tuần)": Đường nét đứt màu cam (#ff9800)
  - Đường tiến độ từng khóa học: Mỗi khóa học 1 đường riêng với màu khác nhau
  - Trục X: Tuần 1-8
  - Trục Y: 0-100% (tiến độ)
- **Tooltip:** Hiển thị % tiến độ và tên khóa học khi hover
- **Legend:** "Mục tiêu" đứng đầu, sau đó là các khóa học

**Metrics/Chỉ số:**
- Tiến độ theo tuần của từng khóa học (%)
- So sánh tiến độ thực tế vs mục tiêu
- Số lượng khóa học đang theo dõi

**Dữ liệu nguồn:**
- `data.js`: `generateProgressData()`, `weeklyTargets`
- `sessionStorage`: `enrolledCourses`

---

### DT055: Phân loại Trình độ Sinh viên
**Vị trí:** Hàng 2 - "Phân loại năng lực theo từng môn"

**Mô tả:**
- Hiển thị phân loại năng lực (Giỏi/Khá/Trung bình/Yếu) cho từng môn học
- Mỗi môn hiển thị các tiêu chí/năng lực với điểm số và progress bar

**Input:**
- `enrolledCourses`: Danh sách khóa học đã đăng ký
- `competencyByCourse`: Object chứa điểm năng lực theo từng khóa học
  - Key: courseId (1, 2, 3, 4)
  - Value: Object { "Tên năng lực": điểm % }

**Output/Chỉ số hiển thị:**
- **Grid layout:** 4 cột (1 môn/cột)
- **Mỗi môn hiển thị:**
  - Tên môn học
  - Danh sách năng lực với:
    - Tên năng lực
    - Điểm số (%)
    - Progress bar (màu theo mức độ)
    - Nhãn phân loại (Giỏi/Khá/Trung bình/Yếu)

**Metrics/Chỉ số:**
- Điểm năng lực theo từng môn (%)
- Phân loại: Giỏi (≥90%), Khá (≥80%), Trung bình (≥60%), Yếu (<60%)
- Số lượng tiêu chí/năng lực được đánh giá

**Logic phân loại:**
```javascript
getLevel(score):
  - ≥90%: Giỏi (bg-success-500)
  - ≥80%: Khá (bg-primary-500)
  - ≥60%: Trung bình (bg-warning-500)
  - <60%: Yếu (bg-danger-500)
```

**Dữ liệu nguồn:**
- `data.js`: `competencyByCourse`
- `sessionStorage`: `enrolledCourses`

---

### DT045: Phân tích Mức độ Hoàn thành & Gợi ý Cấp độ Tiếp theo
**Vị trí:** Hàng 3 - "Đánh giá tổng hợp theo tiêu chí/năng lực"

**Mô tả:**
- Đánh giá tổng hợp các tiêu chí/năng lực xuyên suốt tất cả môn học
- Hiển thị tỉ lệ đạt, mức độ, mô tả và danh sách môn học liên quan

**Input:**
- `competencyAssessment`: Object chứa đánh giá tổng hợp
  - Key: Tên tiêu chí/năng lực
  - Value: { score, level, description, courses[] }

**Output/Chỉ số hiển thị:**
- **Grid layout:** 3 cột
- **Mỗi card hiển thị:**
  - Tên tiêu chí/năng lực
  - Badge phân loại (Giỏi/Khá/Trung bình/Yếu)
  - Tỉ lệ đạt (%)
  - Progress bar
  - Mô tả
  - Danh sách môn học liên quan

**Metrics/Chỉ số:**
- Điểm tổng hợp theo tiêu chí (%)
- Phân loại mức độ
- Số lượng môn học áp dụng tiêu chí này
- Mô tả đánh giá

**Dữ liệu nguồn:**
- `data.js`: `competencyAssessment`

---

### Hiển thị Các môn đã đăng ký
**Vị trí:** Hàng 1 - Bên trái (cùng hàng với biểu đồ tiến độ)

**Mô tả:**
- Hiển thị danh sách các khóa học đã đăng ký
- Progress bar cho từng khóa học

**Chỉ số hiển thị:**
- Tên khóa học
- Mã khóa học (code)
- Tiến độ (%)
- Progress bar với màu:
  - 100%: Xanh lá (bg-success-500)
  - ≥50%: Xanh dương (bg-primary-500)
  - <50%: Vàng (bg-warning-500)

**Dữ liệu nguồn:**
- `sessionStorage`: `enrolledCourses`

---

## 📝 TRANG 2: BÀI TẬP (Exercises.jsx)

### DT051 + DT052 + DT054: Gợi ý Bài tập Cá nhân hóa
**Vị trí:** Danh sách bài tập với badge "⭐ Gợi ý cho bạn"

**Mô tả:**
- Hệ thống gợi ý bài tập dựa trên năng lực/kỹ năng của sinh viên
- Tính toán độ phù hợp (fitPercent) và sắp xếp theo độ phù hợp giảm dần

**Input:**
- `enrolledCourses`: Danh sách khóa học đã đăng ký
- `courseExercises`: Object chứa bài tập theo từng khóa học
- `competencyByCourse`: Điểm năng lực theo từng khóa học
- `exercise.criteria`: Danh sách tiêu chí/năng lực mà bài tập yêu cầu
- `exercise.level`: Độ khó (Easy/Medium/Hard)

**Output/Chỉ số hiển thị:**
- **Badge "⭐ Gợi ý cho bạn":** Hiển thị khi `calculatedFitPercent >= 80%`
- **Badge "% phù hợp":** Hiển thị `calculatedFitPercent`
- **Sắp xếp:** Theo `calculatedFitPercent` giảm dần

**Metrics/Chỉ số:**
- `calculatedFitPercent`: Điểm phù hợp (0-100%)
  - Tính từ điểm năng lực trung bình của các tiêu chí
  - Điều chỉnh theo độ khó:
    - Easy: ×1.1
    - Medium: ×1.0
    - Hard: ×0.9
- `isRecommended`: true nếu `fitPercent >= 80%`
- Số lượng bài tập được gợi ý

**Logic tính toán:**
```javascript
calculateFitPercent(exercise):
  1. Lấy điểm năng lực từ competencyByCourse[courseId]
  2. Tính điểm trung bình của các tiêu chí trong exercise.criteria
  3. Áp dụng difficultyMultiplier
  4. Trả về fitPercent (0-100)
```

**Dữ liệu nguồn:**
- `data.js`: `courseExercises`, `competencyByCourse`
- `sessionStorage`: `enrolledCourses`

---

### DT039-DT042: Kết quả Chấm điểm Tự động
**Vị trí:** Modal "Nộp bài" khi click nút "Nộp bài"

**Mô tả:**
- Hệ thống chấm điểm tự động cho bài tập Python
- Hiển thị kết quả ngay sau khi nộp bài

**Input:**
- `submissionCode`: Code Python do sinh viên nhập
- `exercise`: Thông tin bài tập (title, id, ...)

**Output/Chỉ số hiển thị:**
- **Kết quả chấm điểm:**
  - Điểm số: `score/totalScore` (ví dụ: 8/10)
  - Trạng thái: "✅ Đạt" hoặc "⚠️ Đạt một phần"
  - Test Cases: `testsPassed/testsTotal` (ví dụ: 8/10 passed)
  - Progress bar test cases
  - Thời gian thực thi: `executionTime` (ms)
  - Thời gian nộp: `submittedAt`

**Metrics/Chỉ số:**
- `score`: Điểm số (0-10)
- `totalScore`: Tổng điểm (10)
- `testsPassed`: Số test case pass
- `testsTotal`: Tổng số test case
- `passed`: true/false (dựa trên tỉ lệ pass)
- `executionTime`: Thời gian chạy (ms)
- Tỉ lệ pass: `(testsPassed / testsTotal) * 100%`

**API Mock:**
```javascript
handleSubmit(exercise):
  - Simulate API call (2s delay)
  - Return mock result với:
    - score: 8-10 (random)
    - testsPassed: 8-10 (random)
    - passed: 70% chance
```

**Dữ liệu nguồn:**
- User input: `submissionCode`
- Mock API: `handleSubmit()`

---

### DT053: Hệ thống Gợi ý Lỗi & Feedback Tự động
**Vị trí:** Modal "AI Feedback" khi click nút "AI Feedback"

**Mô tả:**
- Công cụ AI Feedback phân tích code và đưa ra đánh giá chi tiết
- Phát hiện lỗi và gợi ý cách sửa

**Input:**
- `feedbackCode`: Code Python do sinh viên nhập
- `exercise`: Thông tin bài tập (title, criteria, ...)

**Output/Chỉ số hiển thị:**
- **Điểm tổng thể:** `overallScore/10`
- **Đánh giá theo tiêu chí:**
  - Mỗi tiêu chí trong `exercise.criteria`:
    - Tên tiêu chí
    - Điểm: `score/maxScore` (ví dụ: 7/10)
    - Feedback mô tả
- **Lỗi phát hiện:**
  - Loại lỗi (Logic Error, Runtime Error, ...)
  - Mô tả lỗi
  - Gợi ý sửa lỗi
- **Gợi ý cải thiện:** Danh sách suggestions

**Metrics/Chỉ số:**
- `overallScore`: Điểm tổng thể (0-10)
- `criteriaScores[]`: 
  - `criterion`: Tên tiêu chí
  - `score`: Điểm (0-10)
  - `maxScore`: Điểm tối đa (10)
  - `feedback`: Mô tả đánh giá
- `errors[]`:
  - `type`: Loại lỗi
  - `description`: Mô tả lỗi
  - `suggestion`: Gợi ý sửa
- `suggestions[]`: Danh sách gợi ý cải thiện
- `submittedAt`: Thời gian phân tích

**API Mock:**
```javascript
handleGetFeedback(exercise):
  - Simulate API call (2.5s delay)
  - Return mock feedback với:
    - overallScore: 7-10 (random)
    - criteriaScores: Điểm cho từng tiêu chí
    - errors: Danh sách lỗi phát hiện
    - suggestions: Gợi ý cải thiện
```

**Dữ liệu nguồn:**
- User input: `feedbackCode`
- Mock API: `handleGetFeedback()`

---

### DT046: Kỹ năng Mềm
**Vị trí:** Section "💼 Kỹ năng Mềm Phát triển" ở cuối trang

**Mô tả:**
- Hiển thị 6 kỹ năng mềm được phát triển từ việc làm bài tập

**Input:**
- `softSkills`: Object chứa điểm kỹ năng mềm
  - Key: Tên kỹ năng (communication, teamwork, ...)
  - Value: Điểm số (1-5)

**Output/Chỉ số hiển thị:**
- **Grid layout:** 3 cột
- **Mỗi kỹ năng hiển thị:**
  - Icon
  - Tên kỹ năng (tiếng Việt)
  - Điểm số (0-5)
  - Progress bar (tính từ điểm/5)

**Metrics/Chỉ số:**
- 6 kỹ năng mềm:
  1. Giao tiếp (communication): 0-5
  2. Làm việc nhóm (teamwork): 0-5
  3. Quản lý thời gian (timeManagement): 0-5
  4. Giải quyết vấn đề (problemSolving): 0-5
  5. Sáng tạo (creativity): 0-5
  6. Lãnh đạo (leadership): 0-5
- Progress bar: `(score / 5) * 100%`

**Dữ liệu nguồn:**
- `data.js`: `softSkills`

---

### DT059: Lộ trình Học tập Thích ứng
**Vị trí:** Section "Lộ trình Học tập" ở cuối trang

**Mô tả:**
- Timeline hiển thị các bước trong lộ trình học tập

**Input:**
- `learningPath`: Array chứa các bước trong lộ trình
  - `id`: ID bước
  - `title`: Tên bước
  - `status`: "completed", "current", "upcoming"
  - `date`: Thời gian

**Output/Chỉ số hiển thị:**
- **Timeline với:**
  - Số thứ tự hoặc dấu ✓ (nếu completed)
  - Tên bước
  - Thời gian
  - Badge "Đang học" (nếu current)
  - Màu sắc theo trạng thái:
    - completed: Xanh lá (bg-success-500)
    - current: Xanh dương (bg-primary-500)
    - upcoming: Xám (bg-gray-200)

**Metrics/Chỉ số:**
- Số lượng bước đã hoàn thành
- Bước hiện tại đang học
- Số bước còn lại
- Tỉ lệ hoàn thành: `(completed / total) * 100%`

**Dữ liệu nguồn:**
- `data.js`: `learningPath`

---

### Thống kê Bài tập
**Vị trí:** Grid 4 cột ở đầu trang

**Chỉ số hiển thị:**
- Tổng số bài tập: `allExercises.length`
- Đã hoàn thành: `allExercises.filter(e => e.completed).length`
- Còn lại: `allExercises.filter(e => !e.completed).length`
- Gợi ý cho bạn: `allExercises.filter(e => e.isRecommended).length`

**Dữ liệu nguồn:**
- `data.js`: `courseExercises`
- `sessionStorage`: `enrolledCourses`

---

## 👤 TRANG 3: HỒ SƠ (Profile.jsx)

### DT050: Dashboard Tiến độ (Mở rộng)
**Vị trí:** Section "Tổng kết Học tập" và "Mục tiêu & Tiến độ"

**Mô tả:**
- Thống kê tổng quan về học tập và tiến độ

**Chỉ số hiển thị:**
- **Grid 4 cột:**
  1. Bài tập hoàn thành: `completedAssignments / totalAssignments`
  2. Điểm trung bình: `averageScore`
  3. Tổng giờ học: `totalStudyHours`
  4. Khóa học: `enrolledCourses.length`

- **Tổng kết Học tập:**
  - Tổng số bài tập
  - Đã hoàn thành
  - Tổng số khóa học
  - Khóa học hoàn thành
  - Điểm trung bình
  - Cấp độ hiện tại (Beginner/Intermediate/Advanced)

- **Mục tiêu & Tiến độ:**
  - Hoàn thành khóa học: `avgProgress%`
  - Bài tập: `(completedAssignments / totalAssignments) * 100%`
  - Khóa học: `(completedProjects / totalProjects) * 100%`

**Metrics/Chỉ số:**
- `totalAssignments`: Tổng số bài tập
- `completedAssignments`: Số bài tập đã hoàn thành
- `totalProjects`: Tổng số khóa học
- `completedProjects`: Số khóa học đã hoàn thành (progress = 100%)
- `totalStudyHours`: Tổng giờ học (enrolledCourses.length * 42)
- `averageScore`: Điểm trung bình các khóa học
- `avgProgress`: Tiến độ trung bình (%)
- `highestScore`: Điểm cao nhất
- `lowestScore`: Điểm thấp nhất

**Dữ liệu nguồn:**
- `sessionStorage`: `enrolledCourses`, `user`

---

### DT055: Phân loại Trình độ (Mở rộng)
**Vị trí:** Section "Tổng kết Học tập" - "Cấp độ hiện tại"

**Mô tả:**
- Hiển thị cấp độ hiện tại của sinh viên

**Logic phân loại:**
```javascript
- enrolledCourses.length >= 5: "Advanced"
- enrolledCourses.length >= 2: "Intermediate"
- else: "Beginner"
```

**Chỉ số hiển thị:**
- Badge "Cấp độ hiện tại" với text: Beginner/Intermediate/Advanced

**Dữ liệu nguồn:**
- `sessionStorage`: `enrolledCourses`

---

### DT048 + DT057: Cảnh báo Sinh viên Yếu & Phân tích Hành vi LMS
**Vị trí:** 
1. Profile card header - Badge "Nguy cơ: Low"
2. Section "Mục tiêu & Tiến độ" - Card cảnh báo

**Mô tả:**
- Phân tích nguy cơ học kém dựa trên tiến độ học tập

**Input:**
- `avgProgress`: Tiến độ trung bình (%)

**Output/Chỉ số hiển thị:**
- **Nguy cơ học kém:**
  - Low: `avgProgress >= 70%`
  - Medium: `40% <= avgProgress < 70%`
  - High: `avgProgress < 40%`

- **Badge trong Profile card:**
  - Màu xanh lá (bg-success-500) nếu Low
  - Text: "Nguy cơ: Low/Medium/High"

- **Card cảnh báo:**
  - Icon: ✅ (Low), ⚠️ (Medium), 🚨 (High)
  - Màu nền và border theo mức độ
  - Thông điệp cảnh báo

**Metrics/Chỉ số:**
- `avgProgress`: Tiến độ trung bình (%)
- Risk Level: Low/Medium/High
- Thông điệp cảnh báo tương ứng

**Logic:**
```javascript
if (avgProgress >= 70) {
  riskLevel = "Low"
  message = "🎉 Tiến độ học tập tốt! Hãy duy trì nhịp độ này."
} else if (avgProgress >= 40) {
  riskLevel = "Medium"
  message = "⚠️ Cần chú ý hơn đến việc học. Hãy nộp bài đúng hạn."
} else {
  riskLevel = "High"
  message = "🚨 Cảnh báo! Cần cải thiện tiến độ học tập ngay."
}
```

**Dữ liệu nguồn:**
- `sessionStorage`: `enrolledCourses`

---

### DT062: Dashboard Kỹ năng Mềm với Radar Chart
**Vị trí:** Section "📊 Dashboard Kỹ năng Mềm" - Bên trái

**Mô tả:**
- Radar chart hiển thị 6 kỹ năng mềm dưới dạng biểu đồ radar

**Input:**
- `softSkills`: Object chứa điểm kỹ năng mềm (1-5)

**Output/Chỉ số hiển thị:**
- **Radar Chart:**
  - 6 trục: Giao tiếp, Làm việc nhóm, Quản lý thời gian, Giải quyết vấn đề, Sáng tạo, Lãnh đạo
  - Giá trị: `score * 20` (chuyển từ thang 1-5 sang 0-100)
  - Màu: Xanh dương (#3f51b5) với opacity 0.6

- **Grid 6 ô hiển thị điểm chi tiết:**
  - Tên kỹ năng (tiếng Việt)
  - Điểm số: `score/5.0`

**Metrics/Chỉ số:**
- 6 kỹ năng mềm với điểm số (1-5):
  1. Giao tiếp: `softSkills.communication`
  2. Làm việc nhóm: `softSkills.teamwork`
  3. Quản lý thời gian: `softSkills.timeManagement`
  4. Giải quyết vấn đề: `softSkills.problemSolving`
  5. Sáng tạo: `softSkills.creativity`
  6. Lãnh đạo: `softSkills.leadership`
- Radar chart value: `score * 20` (0-100%)
- Điểm trung bình: `(sum of all scores) / 6`

**Dữ liệu nguồn:**
- `data.js`: `softSkills`

---

### DT060: Gợi ý Kết bạn
**Vị trí:** Section "👥 Gợi ý Kết bạn" - Bên phải

**Mô tả:**
- Gợi ý bạn học dựa trên năng lực và sở thích tương đồng

**Input:**
- `friendSuggestions`: Array chứa danh sách bạn học được gợi ý
  - `name`: Tên
  - `mssv`: Mã số sinh viên
  - `avatar`: URL avatar
  - `matchingScore`: Độ phù hợp (%)
  - `commonCourses`: Mảng môn học chung
  - `similarSkills`: Mảng kỹ năng tương đồng
  - `level`: Trình độ (Beginner/Intermediate/Advanced)
  - `averageScore`: Điểm trung bình
  - `interests`: Mảng sở thích
  - `isFriend`: Đã là bạn chưa

**Output/Chỉ số hiển thị:**
- **Mỗi card hiển thị:**
  - Avatar
  - Tên và MSSV
  - Độ phù hợp: `matchingScore%`
  - Badge trình độ (Beginner/Intermediate/Advanced)
  - Badge điểm trung bình
  - Môn học chung: `commonCourses.join(', ')`
  - Kỹ năng tương đồng: `similarSkills.join(', ')`
  - Sở thích: `interests.join(', ')`
  - Nút "👋 Kết bạn" và "📄 Xem hồ sơ"

**Metrics/Chỉ số:**
- `matchingScore`: Độ phù hợp (0-100%)
- `commonCourses.length`: Số môn học chung
- `similarSkills.length`: Số kỹ năng tương đồng
- `level`: Trình độ
- `averageScore`: Điểm trung bình
- `interests.length`: Số sở thích

**Dữ liệu nguồn:**
- `data.js`: `friendSuggestions`

---

### Thông tin User
**Vị trí:** Profile card header

**Chỉ số hiển thị:**
- Avatar
- Họ tên: `userInfo.full_name`
- MSSV: `userInfo.mssv`
- Email: `userInfo.email`
- Role: Sinh Viên/Giảng Viên/Quản Lý Ngành
- Badge "Nguy cơ: Low/Medium/High"

**Dữ liệu nguồn:**
- `sessionStorage`: `user`

---

## 📚 TRANG 4: KHÓA HỌC (Courses.jsx)

### DT050: Dashboard Tiến độ (Mở rộng)
**Vị trí:** Section "Tiến độ các Khóa học Đã Đăng ký"

**Mô tả:**
- Biểu đồ LineChart tương tự Dashboard nhưng chỉ hiển thị trong trang Courses

**Chỉ số hiển thị:**
- Tương tự như Dashboard (DT050)
- Đường "Mục tiêu (theo tuần)"
- Đường tiến độ từng khóa học

**Dữ liệu nguồn:**
- `data.js`: `generateProgressData()`
- `sessionStorage`: `enrolledCourses`

---

### DT056: Nhóm Học tập
**Vị trí:** Section "👥 Nhóm Học tập"

**Mô tả:**
- Hiển thị các nhóm học tập mà sinh viên tham gia

**Input:**
- `studyGroups`: Array chứa thông tin nhóm học tập
  - `id`: ID nhóm
  - `name`: Tên nhóm
  - `courseId`: ID khóa học
  - `courseName`: Tên khóa học
  - `members[]`: Danh sách thành viên
    - `id`: ID thành viên
    - `name`: Tên
    - `mssv`: MSSV
    - `role`: "Leader" hoặc "Member"
  - `progress`: Tiến độ nhóm (%)
  - `assignments`: { completed, total }
  - `nextMeeting`: Thời gian buổi họp tiếp theo
  - `status`: "active" hoặc "inactive"

**Output/Chỉ số hiển thị:**
- **Grid layout:** 3 cột
- **Mỗi card hiển thị:**
  - Tên nhóm
  - Tên khóa học
  - Badge trạng thái (Hoạt động/Tạm dừng)
  - Tiến độ nhóm: `progress%` với progress bar
  - Danh sách thành viên:
    - Tên và MSSV
    - Badge "👑 Leader" cho leader
    - "(Bạn)" nếu là user hiện tại
  - Thông tin bài tập: `assignments.completed/assignments.total`
  - Buổi họp tiếp theo: Format ngày giờ
  - Nút "📝 Xem chi tiết"
  - Nút "⚙️ Quản lý" (chỉ hiển thị nếu user là Leader)

**Metrics/Chỉ số:**
- `progress`: Tiến độ nhóm (%)
- `members.length`: Số thành viên
- `assignments.completed`: Số bài tập đã hoàn thành
- `assignments.total`: Tổng số bài tập
- `nextMeeting`: Thời gian buổi họp tiếp theo
- `status`: Trạng thái nhóm
- `isUserLeader`: User có phải Leader không

**Dữ liệu nguồn:**
- `data.js`: `studyGroups`
- `sessionStorage`: `user` (để xác định user hiện tại)

---

### Thống kê Khóa học
**Vị trí:** Grid 4 cột ở đầu trang

**Chỉ số hiển thị:**
- Khóa học đã đăng ký: `enrolledCourses.length`
- Khóa học hoàn thành: `enrolledCourses.filter(c => c.progress === 100).length`
- Tổng tín chỉ đang học: `enrolledCourses.reduce((sum, c) => sum + c.credits, 0)`
- Tiến độ trung bình: `Math.round(enrolledCourses.reduce((sum, c) => sum + c.progress, 0) / enrolledCourses.length)%`

**Dữ liệu nguồn:**
- `sessionStorage`: `enrolledCourses`

---

## 🔍 TRANG 5: LỖI & PHẢN HỒI (Feedback.jsx)

### DT053: Hệ thống Gợi ý Lỗi & Feedback (Mở rộng)
**Vị trí:** 
1. Section "Thống kê Lỗi" - PieChart
2. Section "Biểu đồ Số lượng Lỗi" - BarChart
3. Section "Danh sách Bài nộp Gần đây"

**Mô tả:**
- Phân tích và hiển thị thống kê lỗi, danh sách bài nộp với lỗi và gợi ý sửa

**Input:**
- `errorStats`: Array chứa thống kê lỗi
  - `type`: Loại lỗi (Syntax Error, Logic Error, ...)
  - `count`: Số lượng lỗi
  - `color`: Màu sắc
- `submissions`: Array chứa danh sách bài nộp
  - `id`: ID bài nộp
  - `assignmentName`: Tên bài tập
  - `submittedAt`: Thời gian nộp
  - `testsPassed`: Số test case pass
  - `testsTotal`: Tổng số test case
  - `score`: Điểm số
  - `status`: "passed", "partial", "failed"
  - `errors[]`: Danh sách lỗi
    - `type`: Loại lỗi
    - `description`: Mô tả lỗi
    - `suggestion`: Gợi ý sửa

**Output/Chỉ số hiển thị:**
- **PieChart:**
  - Phân bổ lỗi theo loại
  - Label: `type: count`
  - Màu sắc theo `errorStats[].color`

- **BarChart:**
  - Cột biểu đồ số lượng lỗi theo loại
  - Trục X: Loại lỗi
  - Trục Y: Số lượng

- **Danh sách Bài nộp:**
  - Tên bài tập
  - Thời gian nộp
  - Badge trạng thái (Đạt/Đạt một phần/Chưa đạt)
  - Điểm số
  - Test Cases: `testsPassed/testsTotal` với progress bar
  - Danh sách lỗi:
    - Loại lỗi
    - Mô tả lỗi
    - Gợi ý sửa (trong box màu xanh)

**Metrics/Chỉ số:**
- Tổng số lỗi: `errorStats.reduce((sum, e) => sum + e.count, 0)`
- Số lượng lỗi theo loại: `errorStats[].count`
- Tỉ lệ lỗi theo loại: `(count / total) * 100%`
- Số bài nộp: `submissions.length`
- Tỉ lệ pass: `(testsPassed / testsTotal) * 100%`
- Số lỗi trung bình mỗi bài: `totalErrors / submissions.length`

**Dữ liệu nguồn:**
- `data.js`: `errorStats`, `submissions`

---

### DT037: Cảnh báo Đạo văn (Plagiarism Detection)
**Vị trí:** Section "🔍 Cảnh báo Đạo văn (Plagiarism Detection)"

**Mô tả:**
- Hệ thống phát hiện đạo văn tự động, hiển thị mức độ tương đồng

**Input:**
- `plagiarismWarnings`: Array chứa cảnh báo đạo văn
  - `id`: ID cảnh báo
  - `assignmentName`: Tên bài tập
  - `submittedAt`: Thời gian nộp
  - `similarityScore`: Mức độ tương đồng (%)
  - `status`: "safe", "warning", "high-risk"
  - `matchedSources[]`: Danh sách nguồn tương đồng
    - `source`: Tên nguồn (MSSV hoặc Repository)
    - `similarity`: % tương đồng với nguồn này
  - `message`: Thông điệp cảnh báo

**Output/Chỉ số hiển thị:**
- **Mỗi card cảnh báo hiển thị:**
  - Icon: ✅ (safe), ⚠️ (warning), 🚨 (high-risk)
  - Tên bài tập
  - Badge trạng thái (An toàn/Cảnh báo/Nguy cơ cao)
  - Thời gian nộp
  - Mức độ tương đồng: `similarityScore%` với progress bar
  - Thông điệp cảnh báo
  - Danh sách nguồn tương đồng:
    - Tên nguồn
    - % tương đồng

**Metrics/Chỉ số:**
- `similarityScore`: Mức độ tương đồng (0-100%)
- `status`: Trạng thái (safe/warning/high-risk)
- `matchedSources.length`: Số nguồn tương đồng
- Tổng % tương đồng từ các nguồn

**Logic phân loại:**
```javascript
if (similarityScore < 30) {
  status = "safe"
  color = success (xanh lá)
} else if (similarityScore < 60) {
  status = "warning"
  color = warning (vàng)
} else {
  status = "high-risk"
  color = danger (đỏ)
}
```

**Dữ liệu nguồn:**
- `data.js`: `plagiarismWarnings`

---

### Mẹo tránh Lỗi
**Vị trí:** Section "💡 Mẹo tránh lỗi thường gặp"

**Mô tả:**
- Danh sách mẹo để tránh các lỗi thường gặp

**Nội dung:**
- Syntax Error: Kiểm tra dấu ngoặc, dấu chấm phẩy
- Logic Error: Test với nhiều trường hợp
- Runtime Error: Kiểm tra null/undefined
- Best Practice: Sử dụng console.log() để debug

---

## 📊 TỔNG HỢP CHỈ SỐ THEO ĐỀ TÀI

### DT037: AI Phát hiện Đạo văn
**Trang:** Feedback.jsx
**Chỉ số:**
- Mức độ tương đồng (%)
- Trạng thái: safe/warning/high-risk
- Số nguồn tương đồng
- % tương đồng từng nguồn

---

### DT039-DT042: Hệ thống Chấm điểm Python Tự động
**Trang:** Exercises.jsx (Modal)
**Chỉ số:**
- Điểm số (score/totalScore)
- Test cases passed/total
- Tỉ lệ pass (%)
- Thời gian thực thi (ms)
- Trạng thái: passed/partial

---

### DT045: Phân tích Mức độ Hoàn thành & Gợi ý Cấp độ Tiếp theo
**Trang:** Dashboard.jsx
**Chỉ số:**
- Điểm tổng hợp theo tiêu chí (%)
- Phân loại: Giỏi/Khá/Trung bình/Yếu
- Số môn học áp dụng tiêu chí
- Mô tả đánh giá

---

### DT046: Phân tích & Đánh giá Kỹ năng Mềm
**Trang:** Exercises.jsx, Profile.jsx
**Chỉ số:**
- 6 kỹ năng mềm (1-5 điểm):
  - Giao tiếp
  - Làm việc nhóm
  - Quản lý thời gian
  - Giải quyết vấn đề
  - Sáng tạo
  - Lãnh đạo
- Điểm trung bình kỹ năng mềm
- Progress bar cho từng kỹ năng

---

### DT048: Cảnh báo & Can thiệp Sớm với Sinh viên Yếu
**Trang:** Profile.jsx
**Chỉ số:**
- Nguy cơ học kém: Low/Medium/High
- Tiến độ trung bình (%)
- Thông điệp cảnh báo

---

### DT050: Dashboard Tiến độ Học lập trình cho Sinh viên
**Trang:** Dashboard.jsx, Courses.jsx
**Chỉ số:**
- Tiến độ theo tuần của từng khóa học (%)
- Mục tiêu theo tuần (%)
- So sánh tiến độ thực tế vs mục tiêu
- Số khóa học đang theo dõi

---

### DT051: Đề xuất Bài tập theo Cấp độ Năng lực
**Trang:** Exercises.jsx
**Chỉ số:**
- Độ phù hợp (fitPercent): 0-100%
- isRecommended: true/false (nếu ≥80%)
- Số bài tập được gợi ý
- Sắp xếp theo độ phù hợp giảm dần

---

### DT052: Đề xuất Bài tập Thích ứng theo Tiến trình Học tập
**Trang:** Exercises.jsx
**Chỉ số:**
- Tương tự DT051
- Điều chỉnh theo tiến trình học tập

---

### DT053: Hệ thống Gợi ý Lỗi & Feedback Tự động
**Trang:** Exercises.jsx (Modal), Feedback.jsx
**Chỉ số:**
- Điểm tổng thể (overallScore/10)
- Điểm theo tiêu chí (score/maxScore)
- Số lỗi phát hiện
- Số gợi ý cải thiện
- Thống kê lỗi theo loại (PieChart, BarChart)
- Tỉ lệ lỗi theo loại (%)

---

### DT054: Module Hiển thị & Tích hợp Gợi ý Cá nhân hóa
**Trang:** Exercises.jsx
**Chỉ số:**
- Badge "⭐ Gợi ý cho bạn"
- % phù hợp
- Sắp xếp theo độ phù hợp

---

### DT055: Phân loại Trình độ Sinh viên
**Trang:** Dashboard.jsx, Profile.jsx
**Chỉ số:**
- Phân loại theo môn: Giỏi/Khá/Trung bình/Yếu
- Điểm năng lực theo môn (%)
- Cấp độ tổng thể: Beginner/Intermediate/Advanced
- Số tiêu chí/năng lực được đánh giá

---

### DT056: Chia Nhóm Học tập
**Trang:** Courses.jsx
**Chỉ số:**
- Tiến độ nhóm (%)
- Số thành viên
- Số bài tập hoàn thành/tổng số
- Thời gian buổi họp tiếp theo
- Trạng thái nhóm: active/inactive
- Vai trò: Leader/Member

---

### DT057: Phân tích Hành vi LMS để Phát hiện Nguy cơ Học kém
**Trang:** Profile.jsx
**Chỉ số:**
- Tương tự DT048
- Phân tích dựa trên hành vi học tập

---

### DT059: Thiết kế Lộ trình Học tập Thích ứng
**Trang:** Exercises.jsx
**Chỉ số:**
- Số bước đã hoàn thành
- Bước hiện tại
- Số bước còn lại
- Tỉ lệ hoàn thành (%)

---

### DT060: Tìm Bạn học theo Năng lực và Sở thích
**Trang:** Profile.jsx
**Chỉ số:**
- Độ phù hợp (matchingScore): 0-100%
- Số môn học chung
- Số kỹ năng tương đồng
- Trình độ: Beginner/Intermediate/Advanced
- Điểm trung bình
- Số sở thích

---

### DT062: Dashboard Kỹ năng Mềm
**Trang:** Profile.jsx
**Chỉ số:**
- Radar chart với 6 kỹ năng mềm
- Điểm số từng kỹ năng (1-5)
- Giá trị radar chart (0-100%)
- Điểm trung bình kỹ năng mềm

---

## 📁 DỮ LIỆU NGUỒN

### sessionStorage
- `user`: Thông tin user hiện tại
- `enrolledCourses`: Danh sách khóa học đã đăng ký

### data.js
- `availableCourses`: Danh sách khóa học có sẵn
- `courseExercises`: Bài tập theo từng khóa học
- `competencyByCourse`: Điểm năng lực theo từng khóa học
- `competencyAssessment`: Đánh giá tổng hợp theo tiêu chí
- `generateProgressData()`: Hàm tạo dữ liệu tiến độ
- `weeklyTargets`: Mục tiêu tiến độ theo tuần
- `learningPath`: Lộ trình học tập
- `errorStats`: Thống kê lỗi
- `submissions`: Danh sách bài nộp
- `softSkills`: Điểm kỹ năng mềm
- `friendSuggestions`: Gợi ý kết bạn
- `studyGroups`: Nhóm học tập
- `plagiarismWarnings`: Cảnh báo đạo văn

---

## 🔄 LUỒNG DỮ LIỆU

1. **User đăng nhập** → Lưu `user` vào sessionStorage
2. **User đăng ký khóa học** → Lưu `enrolledCourses` vào sessionStorage
3. **Dashboard load** → Đọc `enrolledCourses` từ sessionStorage → Hiển thị biểu đồ, phân loại năng lực
4. **Exercises load** → Đọc `enrolledCourses` → Tính `fitPercent` → Hiển thị bài tập gợi ý
5. **Profile load** → Đọc `user`, `enrolledCourses` → Tính toán stats → Hiển thị dashboard kỹ năng mềm, gợi ý kết bạn
6. **Courses load** → Đọc `enrolledCourses` → Hiển thị nhóm học tập
7. **Feedback load** → Đọc `errorStats`, `submissions`, `plagiarismWarnings` → Hiển thị thống kê

---

## 📝 GHI CHÚ

- Tất cả dữ liệu hiện tại là mock data trong `data.js`
- Các API chấm điểm và feedback là mock API (simulate delay)
- Cần tích hợp với backend API thật để lấy dữ liệu thực tế
- Các chỉ số/metrics được tính toán real-time từ dữ liệu hiện có
- UI responsive, hỗ trợ dark mode

---

**Tài liệu được tạo tự động • Cập nhật: 2025-11-23**

