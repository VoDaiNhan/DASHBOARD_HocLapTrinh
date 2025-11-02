# Hướng Dẫn Sử Dụng Dark Mode

## Tổng Quan
Hệ thống đã được tích hợp chế độ tối (dark mode) hoàn chỉnh với khả năng chuyển đổi linh hoạt.

## Cách Sử Dụng

### 1. Chuyển Đổi Chế Độ
- **Từ Sidebar:** Click vào nút "Chế độ tối" hoặc "Chế độ sáng" ở cuối sidebar
- **Tự động:** Hệ thống sẽ nhớ lựa chọn của bạn và áp dụng cho lần truy cập tiếp theo

### 2. Tính Năng Dark Mode

#### **Tự Động Lưu Trữ**
- Lựa chọn theme được lưu trong `localStorage`
- Tự động phát hiện system preference (nếu chưa có lựa chọn trước đó)
- Áp dụng ngay khi load trang

#### **Giao Diện Hỗ Trợ**
- ✅ **Sidebar:** Màu nền tối, text sáng
- ✅ **KPI Cards:** Nền tối với text sáng
- ✅ **Department Overview:** Hoàn toàn tương thích dark mode
- ✅ **Settings Page:** Tất cả components hỗ trợ dark mode
- ✅ **Layout:** Background và transitions mượt mà

### 3. Các Màu Sắc Dark Mode

#### **Background Colors**
- `bg-gray-900` - Background chính
- `bg-gray-800` - Cards và containers
- `bg-gray-700` - Borders và dividers

#### **Text Colors**
- `text-white` - Text chính
- `text-gray-300` - Text phụ
- `text-gray-400` - Text mờ

#### **Interactive Elements**
- `hover:bg-gray-700` - Hover states
- `border-gray-700` - Borders
- `text-blue-400` - Active states

### 4. Cách Tùy Chỉnh

#### **Thêm Dark Mode cho Component Mới**
```jsx
import { useTheme } from '../contexts/ThemeContext';

const MyComponent = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <div className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
      Content here
    </div>
  );
};
```

#### **Conditional Styling Pattern**
```jsx
className={`base-classes ${
  isDarkMode 
    ? 'dark-specific-classes' 
    : 'light-specific-classes'
}`}
```

### 5. Technical Details

#### **ThemeContext**
- Sử dụng React Context để quản lý state
- Tự động sync với localStorage
- Detect system preference

#### **Tailwind Configuration**
- `darkMode: 'class'` trong tailwind.config.js
- Sử dụng `dark:` prefix cho dark mode styles

#### **Performance**
- Không re-render không cần thiết
- Smooth transitions với CSS
- Optimized cho mobile và desktop

### 6. Browser Support
- ✅ Chrome/Edge (tất cả versions)
- ✅ Firefox (tất cả versions)  
- ✅ Safari (tất cả versions)
- ✅ Mobile browsers

### 7. Troubleshooting

#### **Dark Mode Không Hoạt Động**
1. Kiểm tra `darkMode: 'class'` trong tailwind.config.js
2. Đảm bảo ThemeProvider bao quanh App
3. Clear localStorage và thử lại

#### **Styles Không Áp Dụng**
1. Kiểm tra `dark:` prefix trong className
2. Đảm bảo component import useTheme
3. Kiểm tra console errors

### 8. Future Enhancements
- [ ] System preference detection nâng cao
- [ ] Multiple theme options (blue, green, purple)
- [ ] Theme transition animations
- [ ] User preference sync across devices

## Kết Luận
Dark mode đã được tích hợp hoàn chỉnh và sẵn sàng sử dụng. Tất cả components chính đều hỗ trợ chế độ tối với giao diện đẹp và trải nghiệm người dùng tốt.
