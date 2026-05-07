import { useState } from 'react';
import { Play, CheckCircle, Clock, RotateCcw } from 'lucide-react';
import { getLevelColors } from '../utils';

const DRILLS = {
  // Lập trình hướng đối tượng - Chương 1
  'Lập trình hướng đối tượng-ch1-b1': [
    { id: 1, q: 'In ra màn hình: "Xin chào, tôi là sinh viên!"', hint: 'Dùng Console.WriteLine("...")' },
    { id: 2, q: 'In ra 3 dòng: tên, tuổi, trường học của bạn', hint: 'Gọi Console.WriteLine() 3 lần' },
    { id: 3, q: 'In ra kết quả của 5 + 3 bằng Console.WriteLine', hint: 'Console.WriteLine(5 + 3)' },
    { id: 4, q: 'In ra chuỗi có dấu ngoặc kép: She said "Hello"', hint: 'Dùng ký tự thoát \\"' },
    { id: 5, q: 'In ra 5 dòng trống rồi in "Kết thúc"', hint: 'Gọi Console.WriteLine() 5 lần rồi in chuỗi' },
  ],
  'Lập trình hướng đối tượng-ch1-b2': [
    { id: 1, q: 'Khai báo biến int age = 20; và in ra', hint: 'int age = 20; Console.WriteLine(age);' },
    { id: 2, q: 'Khai báo string name = "Nam"; double height = 1.75; và in cả 2', hint: 'Khai báo rồi in từng biến' },
    { id: 3, q: 'Khai báo bool isStudent = true; và in "Tôi là sinh viên: true"', hint: 'Nối chuỗi với biến bool' },
    { id: 4, q: 'Tính và in diện tích hình chữ nhật: chiều dài 5, chiều rộng 3', hint: 'int area = length * width;' },
    { id: 5, q: 'Khai báo 3 biến điểm số và tính điểm trung bình', hint: 'double average = (a + b + c) / 3.0;' },
  ],
  
  // Kỹ thuật lập trình - Chương 1
  'Kỹ thuật lập trình-ch1-b1': [
    { id: 1, q: 'Khai báo con trỏ int *p; gán địa chỉ của biến x = 10; in địa chỉ', hint: 'int *p = &x; printf("%p", p);' },
    { id: 2, q: 'Dùng con trỏ p trỏ đến x = 5, in giá trị x qua con trỏ', hint: 'printf("%d", *p);' },
    { id: 3, q: 'Thay đổi giá trị x thành 20 thông qua con trỏ p', hint: '*p = 20;' },
    { id: 4, q: 'Khai báo mảng arr[5] = {1,2,3,4,5}; dùng con trỏ in phần tử đầu', hint: 'int *p = arr; printf("%d", *p);' },
    { id: 5, q: 'So sánh địa chỉ của arr và &arr[0]', hint: 'printf("%p %p", arr, &arr[0]);' },
  ],
  'Kỹ thuật lập trình-ch1-b2': [
    { id: 1, q: 'Viết hàm in giá trị: void printValue(int *p)', hint: 'printf("%d", *p); trong hàm' },
    { id: 2, q: 'Gọi hàm printValue với địa chỉ của biến num = 42', hint: 'printValue(&num);' },
    { id: 3, q: 'Viết hàm tăng giá trị: void increment(int *p)', hint: '(*p)++; hoặc *p = *p + 1;' },
    { id: 4, q: 'Dùng hàm increment để tăng biến count từ 0 lên 1', hint: 'increment(&count);' },
    { id: 5, q: 'Viết hàm nhận 2 con trỏ và in tổng: void sum(int *a, int *b)', hint: 'printf("%d", *a + *b);' },
  ],
  
  // Lập trình Back-end - Chương 1
  'Lập trình Back-end-ch1-b1': [
    { id: 1, q: 'Tạo file app.js, import express và tạo app = express()', hint: 'const express = require("express"); const app = express();' },
    { id: 2, q: 'Thêm route GET "/" trả về "Hello World"', hint: 'app.get("/", (req, res) => res.send("Hello World"));' },
    { id: 3, q: 'Cho server lắng nghe port 3000 và in "Server running..."', hint: 'app.listen(3000, () => console.log("Server running..."));' },
    { id: 4, q: 'Test bằng cách chạy node app.js và mở http://localhost:3000', hint: 'Kiểm tra browser hiển thị "Hello World"' },
    { id: 5, q: 'Thêm route GET "/about" trả về thông tin về bạn', hint: 'app.get("/about", (req, res) => res.send("Tôi là..."));' },
  ],
  'Lập trình Back-end-ch1-b2': [
    { id: 1, q: 'Tạo route GET "/users" trả về mảng JSON 3 user có id, name', hint: 'res.json([{id: 1, name: "Nam"}, ...])' },
    { id: 2, q: 'Thêm route GET "/users/:id" trả về user theo id', hint: 'const id = req.params.id; res.json({id, name: "User " + id});' },
    { id: 3, q: 'Route GET "/api/status" trả về {status: "OK", time: new Date()}', hint: 'res.json({status: "OK", time: new Date()});' },
    { id: 4, q: 'Test các route bằng Postman hoặc browser', hint: 'Kiểm tra JSON response đúng format' },
    { id: 5, q: 'Thêm route GET "/users/search?name=..." để tìm user', hint: 'const name = req.query.name; res.json({search: name});' },
  ],
  
  // Lập trình Front-end - Chương 1
  'Lập trình Front-end-ch1-b1': [
    { id: 1, q: 'Tạo file index.html với cấu trúc HTML5 cơ bản', hint: '<!DOCTYPE html><html><head><title>...</title></head><body>...</body></html>' },
    { id: 2, q: 'Thêm header, main, footer với nội dung phù hợp', hint: '<header>Tiêu đề</header><main>Nội dung</main><footer>Chân trang</footer>' },
    { id: 3, q: 'Trong main, thêm section "Giới thiệu" và section "Dịch vụ"', hint: '<section><h2>Giới thiệu</h2><p>...</p></section>' },
    { id: 4, q: 'Thêm nav với 3 link: Trang chủ, Giới thiệu, Liên hệ', hint: '<nav><a href="#home">Trang chủ</a>...</nav>' },
    { id: 5, q: 'Thêm aside với thông tin liên hệ', hint: '<aside><h3>Liên hệ</h3><p>Email: ...</p></aside>' },
  ],
  'Lập trình Front-end-ch1-b2': [
    { id: 1, q: 'Tạo file style.css, link vào HTML, set body margin: 0, font-family: Arial', hint: '<link rel="stylesheet" href="style.css"> trong <head>' },
    { id: 2, q: 'Tạo container với display: flex, justify-content: space-between', hint: '.container { display: flex; justify-content: space-between; }' },
    { id: 3, q: 'Đặt main flex: 1, aside width: 300px', hint: 'main { flex: 1; } aside { width: 300px; }' },
    { id: 4, q: 'Style header với background xanh, text trắng, padding 20px', hint: 'header { background: blue; color: white; padding: 20px; }' },
    { id: 5, q: 'Thêm hover effect cho nav links', hint: 'nav a:hover { color: blue; text-decoration: underline; }' },
  ],
  
  // Cơ sở dữ liệu - Chương 1
  'Cơ sở dữ liệu-ch1-b1': [
    { id: 1, q: 'Tạo bảng students với id (INT, PRIMARY KEY), name (VARCHAR(100)), age (INT)', hint: 'CREATE TABLE students (id INT PRIMARY KEY, name VARCHAR(100), age INT);' },
    { id: 2, q: 'Thêm constraint NOT NULL cho name và CHECK age > 0', hint: 'ALTER TABLE students MODIFY name VARCHAR(100) NOT NULL, ADD CHECK (age > 0);' },
    { id: 3, q: 'Tạo bảng courses với id, title, credits', hint: 'CREATE TABLE courses (id INT PRIMARY KEY, title VARCHAR(200), credits INT);' },
    { id: 4, q: 'Tạo bảng enrollments liên kết students và courses', hint: 'CREATE TABLE enrollments (student_id INT, course_id INT, FOREIGN KEY...);' },
    { id: 5, q: 'Thêm AUTO_INCREMENT cho id trong bảng students', hint: 'ALTER TABLE students MODIFY id INT AUTO_INCREMENT;' },
  ],
  'Cơ sở dữ liệu-ch1-b2': [
    { id: 1, q: 'INSERT 3 sinh viên vào bảng students', hint: 'INSERT INTO students (name, age) VALUES ("Nam", 20), ("Linh", 19), ("Duc", 21);' },
    { id: 2, q: 'INSERT 2 khóa học vào bảng courses', hint: 'INSERT INTO courses (title, credits) VALUES ("Math", 3), ("Physics", 4);' },
    { id: 3, q: 'Đăng ký sinh viên id=1 vào khóa học id=1', hint: 'INSERT INTO enrollments (student_id, course_id) VALUES (1, 1);' },
    { id: 4, q: 'Kiểm tra dữ liệu đã insert bằng SELECT *', hint: 'SELECT * FROM students; SELECT * FROM courses;' },
    { id: 5, q: 'INSERT thêm dữ liệu với các giá trị khác nhau', hint: 'Thử các tên và tuổi khác nhau' },
  ],
  
  // Lập trình Mobile - Chương 1
  'Lập trình Mobile-ch1-b1': [
    { id: 1, q: 'Cài đặt Expo CLI: npm install -g @expo/cli', hint: 'Chạy lệnh trong terminal, kiểm tra với expo --version' },
    { id: 2, q: 'Tạo project mới: expo init MyFirstApp', hint: 'Chọn blank template, cd vào thư mục project' },
    { id: 3, q: 'Chạy app: expo start', hint: 'Mở Expo Go app trên điện thoại, scan QR code' },
    { id: 4, q: 'Sửa App.js: thay đổi text thành "Hello Mobile World"', hint: 'Tìm <Text> component và sửa nội dung' },
    { id: 5, q: 'Test hot reload: lưu file và xem thay đổi trên điện thoại', hint: 'Thay đổi sẽ tự động cập nhật' },
  ],
  'Lập trình Mobile-ch1-b2': [
    { id: 1, q: 'Import View, Text từ react-native', hint: 'import { View, Text } from "react-native";' },
    { id: 2, q: 'Tạo View container với 2 Text components', hint: '<View><Text>Title</Text><Text>Subtitle</Text></View>' },
    { id: 3, q: 'Thêm style cho View: backgroundColor, padding', hint: 'style={{backgroundColor: "lightblue", padding: 20}}' },
    { id: 4, q: 'Style cho Text: fontSize, color, textAlign', hint: 'style={{fontSize: 24, color: "blue", textAlign: "center"}}' },
    { id: 5, q: 'Tạo nhiều View lồng nhau với styles khác nhau', hint: 'Thử các màu và kích thước khác nhau' },
  ],
  
  // DevOps và Cloud - Chương 1
  'DevOps và Cloud-ch1-b1': [
    { id: 1, q: 'Cài đặt Docker Desktop và kiểm tra: docker --version', hint: 'Download từ docker.com, restart máy sau khi cài' },
    { id: 2, q: 'Pull image hello-world: docker pull hello-world', hint: 'Kiểm tra image đã tải: docker images' },
    { id: 3, q: 'Chạy container hello-world: docker run hello-world', hint: 'Xem output "Hello from Docker!"' },
    { id: 4, q: 'Chạy Ubuntu container interactive: docker run -it ubuntu bash', hint: 'Thử các lệnh Linux trong container' },
    { id: 5, q: 'List containers đang chạy: docker ps', hint: 'Thêm -a để xem tất cả containers' },
  ],
  'DevOps và Cloud-ch1-b2': [
    { id: 1, q: 'Tạo Dockerfile cho Node.js app đơn giản', hint: 'FROM node:16, COPY package.json, RUN npm install, COPY ., CMD ["npm", "start"]' },
    { id: 2, q: 'Build image: docker build -t my-node-app .', hint: 'Chạy trong thư mục có Dockerfile' },
    { id: 3, q: 'Run container từ image vừa build', hint: 'docker run -p 3000:3000 my-node-app' },
    { id: 4, q: 'Test app bằng cách mở http://localhost:3000', hint: 'Kiểm tra app chạy trong container' },
    { id: 5, q: 'Stop và remove container', hint: 'docker stop <container_id>, docker rm <container_id>' },
  ],
};

const getDefaultDrills = (title, goal) => [
  { id: 1, q: `Bài 1: ${goal} — Thực hành cơ bản`, hint: 'Áp dụng trực tiếp lý thuyết vừa học' },
  { id: 2, q: `Bài 2: ${goal} — Biến thể đơn giản`, hint: 'Thay đổi giá trị đầu vào, giữ nguyên cấu trúc' },
  { id: 3, q: `Bài 3: ${goal} — Kết hợp với kiến thức trước`, hint: 'Dùng thêm 1 khái niệm đã học' },
  { id: 4, q: `Bài 4: ${goal} — Tình huống thực tế`, hint: 'Áp dụng vào bài toán có ngữ cảnh' },
  { id: 5, q: `Bài 5: ${goal} — Thử thách nhỏ`, hint: 'Tự nghĩ thêm điều kiện hoặc yêu cầu' },
];

const getDrills = (courseKey, chapterId, exId) => {
  const key = `${courseKey}-ch${chapterId}-${exId}`;
  return DRILLS[key] || null;
};

const DrillPanel = ({ ex, chapterId, courseKey, lk, onClose }) => {
  const drills = getDrills(courseKey, chapterId, ex.id) || getDefaultDrills(ex.title, ex.goal);
  const lc = getLevelColors(lk);
  
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden"
        onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white text-base">{ex.title}</h3>
              <p className="text-xs italic text-gray-400 mt-0.5">{ex.goal}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${lc.badge}`}>
                  {drills.length} bài luyện tập
                </span>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg flex-shrink-0">
              <span className="text-gray-500 text-lg leading-none">×</span>
            </button>
          </div>
        </div>
        
        {/* Drill list */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
          {drills.map((drill, idx) => (
            <div key={drill.id} className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:shadow-sm transition-shadow">
              <div className="flex items-start gap-3">
                <span className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${lc.badge}`}>
                  {idx + 1}
                </span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{drill.q}</p>
                  <p className="text-xs text-gray-400 mt-1.5 flex items-start gap-1">
                    <span className="text-yellow-500">💡</span>
                    <span className="italic">{drill.hint}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DrillPanel;