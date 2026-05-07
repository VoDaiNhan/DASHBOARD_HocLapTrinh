# Ngân hàng Bài tập - Frontend Only

## Tổng quan

Đây là phiên bản **Frontend Only** của hệ thống Ngân hàng Bài tập. Không cần backend, database hay API - tất cả hoạt động với mock data trong JavaScript.

## Tính năng

### ✅ Đã có sẵn:
- **20 bài tập mẫu** từ 4 môn học:
  - Kỹ thuật lập trình (6 bài)
  - Lập trình hướng đối tượng (6 bài) 
  - Lập trình Back-end (4 bài)
  - Lập trình Front-end (4 bài)

- **3 mức độ**: Cơ bản, Trung bình, Nâng cao
- **Chủ đề đa dạng**: Con trỏ, Class, REST API, React, CSS...
- **CRUD hoàn chỉnh**: Thêm, sửa, xóa, xem chi tiết
- **Filter và tìm kiếm**: Theo môn học, mức độ, chủ đề
- **Pagination**: Phân trang dữ liệu
- **Responsive UI**: Tương thích mobile và desktop
- **Dark mode**: Hỗ trợ chế độ tối

### 🎯 Các thao tác có thể làm:
1. **Xem danh sách bài tập** với filter
2. **Xem chi tiết bài tập** (popup modal)
3. **Thêm bài tập mới** (lưu trong memory)
4. **Chỉnh sửa bài tập** (cập nhật trong memory)
5. **Xóa bài tập** (xóa khỏi memory)
6. **Filter theo môn học, mức độ, chủ đề**
7. **Phân trang** khi có nhiều bài tập

## Cách chạy

### Bước 1: Cài đặt dependencies
```bash
npm install
```

### Bước 2: Chạy ứng dụng
```bash
npm run dev
```

### Bước 3: Mở trình duyệt
Truy cập: http://localhost:5173

## Cấu trúc dữ liệu

### Bài tập (Exercise)
```javascript
{
  id: 1,
  title: "Khai báo con trỏ và in địa chỉ",
  description: "Hiểu khái niệm con trỏ", 
  content: "Viết chương trình khai báo một biến int...",
  level: "basic", // basic | medium | advanced
  subject: "Kỹ thuật lập trình",
  topic: "Con trỏ",
  createdAt: "2024-01-15T10:00:00Z",
  updatedAt: null
}
```

## Dữ liệu mẫu

### Kỹ thuật lập trình
- **Cơ bản**: Khai báo con trỏ, Dereference, Truyền con trỏ vào hàm
- **Trung bình**: Hoán đổi 2 số, Cấp phát động với malloc
- **Nâng cao**: Cài đặt linked list đơn

### Lập trình hướng đối tượng (C#)
- **Cơ bản**: Console.WriteLine, Khai báo biến, Toán tử số học, Class cơ bản
- **Trung bình**: Constructor và this
- **Nâng cao**: Property và Encapsulation

### Lập trình Back-end
- **Cơ bản**: Express.js Hello World, Route GET, Route POST
- **Trung bình**: MongoDB với Mongoose

### Lập trình Front-end
- **Cơ bản**: HTML semantic, Flexbox layout
- **Trung bình**: CSS Grid
- **React**: useState hook

## Lưu ý quan trọng

### ⚠️ Dữ liệu chỉ tồn tại trong session
- Khi refresh trang, dữ liệu sẽ reset về mẫu ban đầu
- Các bài tập thêm mới sẽ bị mất
- Đây là hành vi bình thường của mock data

### 🔄 Để dữ liệu persistent
Nếu muốn dữ liệu không bị mất, có thể:
1. Lưu vào localStorage
2. Tích hợp với backend API
3. Sử dụng database client-side như IndexedDB

### 📱 Responsive Design
- Desktop: Grid 3 cột
- Tablet: Grid 2 cột  
- Mobile: Grid 1 cột
- Tất cả modal đều responsive

## Mở rộng

### Thêm bài tập mới
Chỉnh sửa file `src/services/exerciseService.js`, thêm vào mảng `this.mockExercises`:

```javascript
{
  id: 21, // ID mới
  title: "Tên bài tập",
  description: "Mô tả ngắn",
  content: "Nội dung chi tiết bài tập...",
  level: "basic", // basic | medium | advanced
  subject: "Tên môn học",
  topic: "Chủ đề",
  createdAt: new Date().toISOString()
}
```

### Thêm môn học mới
Chỉ cần thêm bài tập với `subject` mới, hệ thống sẽ tự động cập nhật danh sách môn học.

### Thêm chủ đề mới
Chỉ cần thêm bài tập với `topic` mới, hệ thống sẽ tự động cập nhật danh sách chủ đề.

## File quan trọng

- `src/pages/ExerciseBank/ExerciseBank.jsx` - Component chính
- `src/services/exerciseService.js` - Mock data và business logic
- `src/App.jsx` - Routing configuration

## Troubleshooting

### Trang trắng hoặc lỗi JavaScript
1. Mở Developer Tools (F12)
2. Xem Console tab để biết lỗi cụ thể
3. Thường là lỗi syntax trong mock data

### Không hiển thị bài tập
1. Kiểm tra filter có đang được áp dụng không
2. Click "Xóa bộ lọc" để reset
3. Kiểm tra dữ liệu trong `exerciseService.js`

### UI bị vỡ
1. Kiểm tra TailwindCSS đã load chưa
2. Refresh trang (Ctrl+F5)
3. Kiểm tra responsive breakpoints

---

**🎉 Hệ thống đã sẵn sàng sử dụng với 20 bài tập mẫu!**

Chỉ cần chạy `npm run dev` và truy cập http://localhost:5173/exercises