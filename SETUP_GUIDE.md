# Hướng Dẫn Cài Đặt và Chạy Dự Án Dashboard Quản Lý Ngành

## 📋 Mục Lục
1. [Yêu Cầu Hệ Thống](#yêu-cầu-hệ-thống)
2. [Cài Đặt Dependencies](#cài-đặt-dependencies)
3. [Chạy Dự Án](#chạy-dự-án)
4. [Cấu Trúc Thư Mục](#cấu-trúc-thư-mục)
5. [Troubleshooting](#troubleshooting)

---

## 🖥️ Yêu Cầu Hệ Thống

### Phần Mềm Cần Thiết:
- **Node.js:** Phiên bản 16.x trở lên (khuyến nghị: 18.x hoặc 20.x)
- **npm:** Đi kèm với Node.js hoặc **yarn** (phiên bản 1.22.x trở lên)
- **Git:** Để clone repository (nếu cần)

### Kiểm Tra Phiên Bản:
```bash
node --version    # Kiểm tra Node.js
npm --version     # Kiểm tra npm
yarn --version    # Kiểm tra yarn (nếu dùng yarn)
```

---

## 📦 Cài Đặt Dependencies

### Bước 1: Clone hoặc Tải Dự Án
Nếu bạn đã có thư mục dự án, bỏ qua bước này.

```bash
# Nếu clone từ Git
git clone <repository-url>
cd Dashboard_quan_ly_nganh

# Hoặc giải nén file ZIP vào thư mục
```

### Bước 2: Cài Đặt Dependencies

Có 2 cách:

#### Cách 1: Sử dụng npm (Khuyến nghị)
```bash
npm install
```

#### Cách 2: Sử dụng yarn (Nếu có yarn.lock)
```bash
yarn install
```

**Thời gian cài đặt:** Khoảng 2-5 phút tùy vào tốc độ mạng.

**Các package chính được cài đặt:**
- React 18.x
- React Router DOM
- Vite (Build tool)
- Tailwind CSS
- Recharts (Biểu đồ)
- Lucide React (Icons)
- date-fns (Xử lý ngày tháng)

---

## 🚀 Chạy Dự Án

### Chế Độ Development (Phát Triển)

#### Với npm:
```bash
npm run dev
```

#### Với yarn:
```bash
yarn dev
```

**Kết quả:**
- Server sẽ chạy tại: `http://localhost:5173` (hoặc port khác nếu 5173 đã bị chiếm)
- Mở trình duyệt và truy cập địa chỉ được hiển thị trong terminal
- Trang web sẽ tự động reload khi bạn thay đổi code

**Ví dụ output:**
```
  VITE v5.x.x  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### Chế Độ Production (Build)

#### Build Dự Án:
```bash
npm run build
# hoặc
yarn build
```

**Kết quả:**
- Tạo thư mục `dist/` chứa các file đã build
- Các file đã được tối ưu hóa và minify

#### Preview Production Build:
```bash
npm run preview
# hoặc
yarn preview
```

---

## 📁 Cấu Trúc Thư Mục

```
Dashboard_quan_ly_nganh/
├── public/              # Các file tĩnh (favicon, logo)
├── src/
│   ├── assets/         # Hình ảnh, fonts,...
│   ├── components/     # Components tái sử dụng
│   │   └── Layout/    # Header, Sidebar, Layout
│   ├── contexts/       # React Context (Theme)
│   ├── data/          # Mock data
│   │   └── mockData.js
│   ├── pages/         # Các trang chính
│   │   ├── Dashboard/
│   │   ├── TeacherManagement/
│   │   ├── StudentTracking/
│   │   ├── CourseManagement/
│   │   ├── ClassManagement/
│   │   ├── Reports/
│   │   └── Settings/
│   ├── App.jsx        # Component gốc
│   ├── App.css        # Styles chính
│   ├── index.css      # Global styles
│   └── main.jsx       # Entry point
├── index.html         # HTML template
├── package.json       # Dependencies và scripts
├── vite.config.js     # Cấu hình Vite
├── tailwind.config.js # Cấu hình Tailwind CSS
├── eslint.config.js   # Cấu hình ESLint
└── README.md          # File README chính
```

---

## 🛠️ Các Lệnh NPM/Yarn

### Development:
```bash
npm run dev        # Chạy server development
npm run build      # Build cho production
npm run preview    # Preview build production
```

### Code Quality:
```bash
npm run lint       # Chạy ESLint để kiểm tra code
```

---

## ⚙️ Cấu Hình

### Thay Đổi Port (Nếu cần)
Mở file `vite.config.js` và thêm:

```javascript
export default {
  server: {
    port: 3000,  // Thay đổi port mong muốn
  },
}
```

### Cấu Hình API (Khi tích hợp backend)
Chỉnh sửa file `src/data/mockData.js` hoặc tạo file `src/config/api.js`:

```javascript
export const API_BASE_URL = 'http://localhost:8000/api';
```

---

## 🐛 Troubleshooting

### Lỗi: "Cannot find module" hoặc "Module not found"

**Giải pháp:**
```bash
# Xóa node_modules và package-lock.json
rm -rf node_modules package-lock.json

# Cài đặt lại
npm install
```

### Lỗi: "Port 5173 is already in use"

**Giải pháp:**
1. Đóng ứng dụng khác đang dùng port 5173
2. Hoặc thay đổi port trong `vite.config.js`

### Lỗi: "Node version not supported"

**Giải pháp:**
- Nâng cấp Node.js lên phiên bản 16.x trở lên
- Hoặc sử dụng `nvm` để quản lý phiên bản Node:

```bash
# Cài đặt Node 18 (ví dụ)
nvm install 18
nvm use 18
```

### Lỗi Build: "Out of memory"

**Giải pháp:**
Tăng memory limit cho Node:
```bash
NODE_OPTIONS=--max-old-space-size=4096 npm run build
```

### Browser không mở được trang web

**Kiểm tra:**
1. Server đã chạy chưa? (xem terminal)
2. Đúng URL không? (http://localhost:5173)
3. Firewall có chặn không?
4. Thử mở bằng `http://127.0.0.1:5173`

### Lỗi Import Icons hoặc Components

**Giải pháp:**
- Kiểm tra đường dẫn import đúng chưa
- Đảm bảo file tồn tại trong thư mục
- Chạy lại `npm install` nếu thiếu package

---

## 📝 Ghi Chú Quan Trọng

### Mock Data
- Hiện tại dự án sử dụng **mock data** trong `src/data/mockData.js`
- Khi tích hợp backend thực tế, sẽ thay thế các hàm `useState` và `useEffect` bằng API calls

### Dark Mode
- Dự án hỗ trợ Dark Mode
- Toggle ở Header (icon mặt trăng/mặt trời)

### Routing
- Dự án sử dụng React Router với HashRouter
- URLs sẽ có dạng: `http://localhost:5173/#/dashboard`

---

## 🔗 Liên Kết Hữu Ích

- **Vite Documentation:** https://vitejs.dev/
- **React Documentation:** https://react.dev/
- **Tailwind CSS:** https://tailwindcss.com/
- **Recharts:** https://recharts.org/

---

## 💬 Hỗ Trợ

Nếu gặp vấn đề, hãy:
1. Kiểm tra lại các bước cài đặt
2. Xem phần Troubleshooting
3. Kiểm tra console trong trình duyệt (F12)
4. Kiểm tra terminal để xem lỗi cụ thể

---

## ✅ Checklist Trước Khi Chạy

- [ ] Đã cài đặt Node.js (16.x trở lên)
- [ ] Đã cài đặt npm hoặc yarn
- [ ] Đã chạy `npm install` hoặc `yarn install`
- [ ] Port 5173 chưa bị sử dụng
- [ ] Đã mở terminal trong thư mục dự án
- [ ] Đã chạy `npm run dev`

**Chúc bạn code vui vẻ! 🎉**

