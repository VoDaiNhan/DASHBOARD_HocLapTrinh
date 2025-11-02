# Hướng Dẫn Sử Dụng Sidebar - Dashboard Quản Lý Ngành

## Tổng Quan
Sidebar là menu điều hướng chính của hệ thống, giúp quản lý ngành truy cập các chức năng quản lý và phân tích.

---

## 📋 Danh Sách Các Mục Trong Sidebar

### 1. 🏠 **Trang Chủ** (`/dashboard`)
**Mục đích:** Trang tổng quan hiển thị các chỉ số và thống kê chính của ngành.

**Chức năng chính:**
- **KPI Cards:** Hiển thị các chỉ số quan trọng:
  - Tổng Sinh Viên (click để xem chi tiết số lớp, số sinh viên, giảng viên phụ trách)
  - Tổng Giảng Viên (click để xem danh sách giảng viên, môn phụ trách, lớp dạy)
  - Các Lớp Đang Diễn Ra (click để xem lịch học trong ngày: sáng/chiều, thời gian, giảng viên)
  - Tỷ Lệ Tiến Độ Học Tập Trung Bình (click để xem điểm trung bình các lớp)

- **Phân Tích Ngành:**
  - Xu hướng học tập ngành (biểu đồ đường)
  - Top 3 giảng viên/môn
  - 3 môn có nhiều sinh viên yếu

- **Thông Báo:** Cảnh báo và thông báo tự động về lớp/sinh viên rủi ro

- **Tổng quan tiến độ học tập:** Biểu đồ cột xếp chồng theo tháng (% Hoàn thành, Đang học, Chưa bắt đầu)

- **Hiệu suất trung bình toàn ngành:** Biểu đồ đường với 3 chỉ số:
  - Điểm TB ngành
  - Tỷ lệ hoàn thành TB
  - Mức độ tham gia LMS TB
  - So sánh với học kỳ trước

- **3 KPI Cards:** Điểm TB toàn ngành, Mức tiến độ chung, Mức độ hoạt động LMS

**Khi nào sử dụng:**
- Xem tổng quan nhanh về tình hình ngành
- Theo dõi các cảnh báo và thông báo quan trọng
- Phân tích xu hướng học tập

---

### 2. 👨‍🏫 **Quản Lý Giảng Viên** (`/teachers`)

**Mục đích:** Quản lý và theo dõi thông tin giảng viên trong ngành.

**Các tab phụ:**
- **Tổng quan:** Xem danh sách tất cả giảng viên với thông tin:
  - Môn phụ trách
  - Số lớp dạy
  - Tỷ lệ hoàn thành TB lớp
  - Số sinh viên yếu trong lớp
  - Đánh giá từ sinh viên
  - Hoạt động gần nhất
  - Nghiên cứu/Hướng dẫn
  - Cảnh báo tự động cho giảng viên có lớp <70% tiến độ

- **Lịch giảng dạy:** Xem lịch giảng dạy của từng giảng viên

**Chức năng:**
- Tìm kiếm giảng viên theo tên
- Lọc theo chuyên môn (dropdown)
- Xem chi tiết từng giảng viên
- Cảnh báo tự động cho giảng viên có vấn đề

**Khi nào sử dụng:**
- Kiểm tra tình hình giảng dạy của giảng viên
- Phát hiện giảng viên có lớp cần hỗ trợ
- Quản lý phân công giảng dạy

---

### 3. 👥 **Phân tích Sinh viên** (`/students`)

**Mục đích:** Phân tích và theo dõi xu hướng học tập, mức độ rủi ro của sinh viên toàn ngành.

**Chức năng chính:**
- **5 KPI Cards:**
  - Tổng Sinh Viên
  - Đang Học
  - Có Rủi Ro (%)
  - Đã Hoàn Thành (%)
  - Điểm TB Ngành

- **Bộ lọc nâng cao:**
  - Theo khóa học
  - Theo lớp
  - Theo học kỳ
  - Theo mức rủi ro
  - Theo năm học

- **3 Biểu đồ:**
  - **Pie Chart:** Phân bổ theo nhóm rủi ro (Thấp/Trung bình/Cao)
  - **Line Chart:** Xu hướng điểm trung bình theo thời gian
  - **Bar Chart:** Tiến độ trung bình theo khóa học

- **Bảng nhóm sinh viên:** Tổng hợp theo năm với Số lượng, Điểm TB, Tiến độ TB, Tỷ lệ rủi ro cao

- **Cảnh báo hệ thống:** Hiển thị các cảnh báo cụ thể và nút gửi thông báo đến giảng viên phụ trách

- **Drill-down:** Click vào nhóm/biểu đồ để xem danh sách sinh viên chi tiết, xuất Excel

**Khi nào sử dụng:**
- Phân tích xu hướng học tập toàn ngành
- Xác định nhóm sinh viên có rủi ro
- Theo dõi hiệu quả đào tạo

---

### 4. 📚 **Hiệu suất Khóa học** (`/courses`)

**Mục đích:** Quản lý và phân tích hiệu suất các khóa học trong ngành.

**Chức năng chính:**
- **Course Cards hiển thị:**
  - 3 chỉ số đầu: Số giảng viên, Số lớp học, Tỷ lệ hoàn thành TB
  - Tên khóa học và thời lượng
  - Badge trạng thái
  - Progress bar tiến độ hoàn thành
  - Số lượng sinh viên
  - Tên giảng viên (rút gọn)
  - Badge điểm TB
  - Mini chart tiến độ theo lớp
  - Thông tin cập nhật lần cuối

- **Phân tích cấp ngành:**
  - Phân bổ sinh viên (Hoàn thành/Đang học/Thôi học)
  - So sánh với mức trung bình ngành
  - Top 3 ranking badge

- **Bộ lọc:**
  - Theo giảng viên
  - Theo học kỳ
  - Theo mức rủi ro
  - Tìm kiếm theo tên

- **Stats Overview:**
  - Hiệu suất trung bình toàn ngành
  - Khóa có rủi ro
  - Xu hướng ngành
  - Giảng viên phụ trách nhiều nhất

**Khi nào sử dụng:**
- Đánh giá hiệu suất các khóa học
- So sánh khóa học với mức trung bình ngành
- Xác định khóa học cần hỗ trợ

---

### 5. 🎓 **Phân tích Lớp học** (`/classes`)

**Mục đích:** Theo dõi sức khỏe và hiệu suất lớp học trong toàn ngành.

**Chức năng chính:**
- **5 KPI Cards:**
  - Tổng số lớp toàn ngành
  - Lớp đạt chuẩn tiến độ (% lớp có tiến độ >80%)
  - Lớp có vấn đề (% lớp có tiến độ <60% hoặc điểm TB <7)
  - Giảng viên phụ trách nhiều lớp nhất
  - Điểm TB ngành

- **Bảng tổng hợp lớp học:**
  - Tên lớp, Môn học, Giảng viên, Số SV
  - Điểm TB, Tiến độ TB (với progress bar)
  - Mức rủi ro (Thấp/Trung bình/Cao)
  - Ghi chú
  - Nút xem chi tiết
  - Sắp xếp theo bất kỳ cột nào
  - Xuất báo cáo

- **3 Biểu đồ:**
  - **Bar Chart:** Tiến độ trung bình các lớp theo giảng viên
  - **Line Chart:** Biến động điểm trung bình trong 3 tháng
  - **Pie Chart:** Tỷ lệ lớp đạt/trung bình/rủi ro

- **Box cảnh báo:** Cảnh báo động và nút "Xem chi tiết lớp rủi ro"

- **Modal drill-down:** Click vào lớp rủi ro để xem danh sách sinh viên có nguy cơ, gửi cảnh báo

**Khi nào sử dụng:**
- Giám sát hiệu suất lớp học toàn ngành
- Phát hiện lớp có vấn đề
- Phân tích xu hướng điểm và tiến độ

---

### 6. 📊 **Phân Tích Ngành** (`/reports`)

**Mục đích:** Trang phân tích và báo cáo sâu về tình hình ngành.

**Chức năng chính:**
- **8 KPI Cards:**
  - Tổng Sinh Viên
  - Tổng Giảng Viên
  - Khóa Học Đang Hoạt Động
  - Lớp Học Đang Hoạt Động
  - Điểm TB Ngành
  - Tỷ Lệ Hoàn Thành Ngành
  - Sinh Viên Có Rủi Ro
  - Khóa Học Có Rủi Ro

- **Bộ lọc phân tích:**
  - Theo Học kỳ
  - Theo Khóa học
  - Theo Lớp học
  - Theo Giảng viên
  - Theo Sinh viên
  - Theo Thời gian

- **Biểu đồ so sánh:** So sánh học kỳ hiện tại với học kỳ trước

- **Insights Panel:** Phân tích tự động và đề xuất hành động
  - Insights chính
  - Xu hướng tích cực
  - Cảnh báo
  - Khuyến nghị

- **Bảng dữ liệu chi tiết:** 
  - Có thể chọn xem Khóa học/Lớp/Sinh viên
  - Sắp xếp theo các cột
  - Progress bars và badges
  - Xuất Excel

- **Xuất Báo Cáo:**
  - Xuất PDF
  - Xuất Excel

**Khi nào sử dụng:**
- Tạo báo cáo chi tiết cho ban giám hiệu
- Phân tích sâu các chỉ số ngành
- So sánh giữa các kỳ học

---

### 7. ⚙️ **Cấu hình Ngành** (`/settings`)

**Mục đích:** Cấu hình hệ thống, phân quyền và quản lý dữ liệu toàn ngành.

**4 Tab chính:**

#### a) **Cấu hình chung**
- Ngưỡng cảnh báo rủi ro sinh viên (tiến độ %, điểm)
- Ngưỡng "đạt yêu cầu" của lớp học (tiến độ %, điểm)
- Chu kỳ cập nhật dữ liệu (Hàng ngày/Hàng tuần/Thủ công)
- Toggle: Thông báo tự động cho giảng viên
- Toggle: Ẩn/hiện lớp đã kết thúc

#### b) **Phân quyền & Truy cập**
- Bảng danh sách người dùng theo vai trò
- Quyền: Quản lý lớp, Quản lý sinh viên, Xóa khóa học, Gửi thông báo rủi ro
- Modal chỉnh sửa quyền cho từng người dùng

#### c) **Tích hợp & Dữ liệu**
- Kết nối với LMS (Moodle, Canvas, Google Classroom, Blackboard)
- Toggle: Tự động đồng bộ điểm và tiến độ
- Xuất dữ liệu (CSV, Excel, PDF)
- Lịch trình backup (Hàng ngày/Hàng tuần/Hàng tháng)
- Nút "Tải lại dữ liệu ngành"

#### d) **Báo cáo & Giám sát**
- Tần suất gửi báo cáo đến ban giám hiệu (Hàng ngày/Hàng tuần/Hàng tháng)
- Quản lý danh sách người nhận tự động
- Toggle: Gửi bản sao lưu dữ liệu định kỳ qua email

**Thông tin ngành:** Hiển thị ở đầu trang với Tên ngành, Mã ngành, Số giảng viên/sinh viên/khóa học, Người phụ trách

**Khi nào sử dụng:**
- Thiết lập các ngưỡng cảnh báo
- Quản lý quyền truy cập người dùng
- Kết nối với hệ thống LMS
- Cấu hình báo cáo tự động

---

### 8. 🚪 **Đăng Xuất** (Logout)

**Mục đích:** Đăng xuất khỏi hệ thống.

**Khi nào sử dụng:**
- Khi hoàn thành công việc và muốn bảo mật tài khoản

---

## 🔄 Cách Sử Dụng Sidebar

### Điều Hướng
- Click vào tên mục trong sidebar để chuyển trang
- Một số mục có menu con (dropdown) - click để mở rộng
- Mục hiện tại sẽ được highlight màu xanh

### Menu Con
- **Quản Lý Giảng Viên** có 2 tab: Tổng quan, Lịch giảng dạy
- Các mục khác là link trực tiếp

### Tìm Kiếm
- Sử dụng thanh tìm kiếm ở Header để tìm nhanh các chức năng
- Mỗi trang có bộ lọc và tìm kiếm riêng

---

## 💡 Tips Sử Dụng

1. **Theo dõi Dashboard thường xuyên** để nắm bắt tình hình tổng thể
2. **Kiểm tra cảnh báo** ở Dashboard và các trang quản lý
3. **Sử dụng bộ lọc** để tìm kiếm thông tin cụ thể
4. **Xuất báo cáo** định kỳ từ trang Phân Tích Ngành
5. **Cấu hình ngưỡng** phù hợp ở Cấu hình Ngành để cảnh báo chính xác

---

## 📝 Lưu Ý

- Quyền truy cập: Một số chức năng có thể bị giới hạn theo vai trò người dùng
- Dữ liệu: Tất cả dữ liệu được cập nhật theo chu kỳ đã cấu hình
- Báo cáo: Có thể xuất báo cáo ở nhiều định dạng (PDF, Excel)

