# Cập nhật Ngân hàng Bài tập - Gộp thành 2 mức độ

## 🔄 **Thay đổi chính**

### **Trước đây: 3 mức độ**
- **Cơ bản** (Foundation): Hiểu và dùng được từng kiến thức riêng lẻ
- **Trung bình** (Application): Kết hợp kiến thức để giải bài hoàn chỉnh  
- **Nâng cao** (Mastery): Tối ưu, xử lý bài khó, gần thực tế

### **Hiện tại: 2 mức độ**
- **Cơ bản** (Foundation & Application): Hiểu kiến thức và kết hợp để giải bài hoàn chỉnh
- **Nâng cao** (Mastery & Optimization): Tối ưu, xử lý bài khó, áp dụng vào thực tế

## 📊 **Dữ liệu sau khi gộp**

### **Kỹ thuật lập trình**
- **Cơ bản**: 8 bài (4 cũ + 4 từ trung bình)
- **Nâng cao**: 4 bài (2 cũ + 2 mới)

### **Lập trình hướng đối tượng** 
- **Cơ bản**: 8 bài (4 cũ + 4 từ trung bình)
- **Nâng cao**: 4 bài (2 cũ + 2 mới)

### **Lập trình Back-end**
- **Cơ bản**: 8 bài (4 cũ + 4 từ trung bình) 
- **Nâng cao**: 4 bài (2 cũ + 2 mới)

### **Lập trình Front-end**
- **Cơ bản**: 8 bài (4 cũ + 4 từ trung bình)
- **Nâng cao**: 4 bài (2 cũ + 2 mới)

## 🎯 **Lợi ích của việc gộp**

### **1. Đơn giản hóa**
- Giảm từ 3 xuống 2 mức độ → dễ hiểu hơn
- Học viên không bị phân vân giữa "trung bình" và "nâng cao"
- Giảm complexity trong UI/UX

### **2. Tập trung hơn**
- **Cơ bản**: Từ hiểu lý thuyết → áp dụng thành thạo
- **Nâng cao**: Từ thành thạo → chuyên sâu, tối ưu

### **3. Progression tự nhiên**
- Bước nhảy rõ ràng giữa 2 mức độ
- Mỗi mức có đủ bài tập để luyện tập kỹ lưỡng
- Không bị "застрять" ở mức trung gian

## 🔧 **Files đã cập nhật**

### **Core Files**
- `constants.js`: Giảm LEVELS từ 3 → 2
- `data.js`: Gộp intermediate vào basic, thêm bài advanced
- `utils.js`: Cập nhật getLvColor(), validation functions

### **Components** 
- `AddExerciseModal.jsx`: Cập nhật getLevelLabel()
- `ProgressStats.jsx`: Xử lý 2 mức độ thay vì 3
- `ExerciseBank.jsx`: Cập nhật mô tả "2 mức độ"

### **Unchanged (tự động adapt)**
- `CourseDetail.jsx`: Sử dụng LEVELS array
- `CourseList.jsx`: Sử dụng LEVELS array  
- `ChapterAccordion.jsx`: Sử dụng dynamic level keys
- `ExportReport.jsx`: Sử dụng LEVELS array
- `ImportExercises.jsx`: Sử dụng dynamic structure

## ✅ **Kết quả**

- ✅ Build thành công không lỗi
- ✅ Tất cả tính năng hoạt động bình thường
- ✅ Dữ liệu được preserve và mở rộng
- ✅ UI/UX đơn giản và rõ ràng hơn
- ✅ Backward compatibility với export/import

## 🚀 **Sử dụng**

Hệ thống giờ đây có 2 mức độ rõ ràng:

1. **Học Cơ bản** → Nắm vững foundation + application
2. **Thử thách Nâng cao** → Mastery + optimization

Phù hợp với tâm lý học tập: "Học kỹ cơ bản rồi mới thử thách nâng cao"!