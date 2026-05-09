import React from 'react';
import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ZAxis
} from 'recharts';
import { UserCheck } from 'lucide-react';

const TeachingImpactChart = () => {
  // Scatter data: x = Teaching Workload (hours), y = Class GPA, z = Number of students (bubble size)
  const data = [
    { name: 'GV. Nguyễn Văn A', workload: 120, gpa: 7.2, students: 45 },
    { name: 'GV. Trần Thị B', workload: 80, gpa: 8.5, students: 30 },
    { name: 'GV. Lê Văn C', workload: 150, gpa: 6.5, students: 60 },
    { name: 'GV. Phạm Thị D', workload: 90, gpa: 7.8, students: 40 },
    { name: 'GV. Hoàng Văn E', workload: 110, gpa: 7.5, students: 50 },
    { name: 'GV. Vũ Thị F', workload: 70, gpa: 8.2, students: 25 },
    { name: 'GV. Đặng Văn G', workload: 140, gpa: 6.8, students: 55 },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 bg-purple-50 dark:bg-purple-900/30 rounded-xl">
          <UserCheck className="text-purple-600 dark:text-purple-400" size={22} />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Ảnh hưởng Giảng dạy tới GPA</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Tương quan giữa khối lượng giảng dạy và điểm trung bình lớp</p>
        </div>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: -20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              type="number" 
              dataKey="workload" 
              name="Khối lượng (Giờ)" 
              domain={['auto', 'auto']}
              tick={{ fontSize: 12, fill: '#6b7280' }}
              label={{ value: 'Khối lượng giảng dạy (Giờ)', position: 'bottom', offset: 0, fontSize: 12, fill: '#6b7280' }}
            />
            <YAxis 
              type="number" 
              dataKey="gpa" 
              name="GPA" 
              domain={[5, 10]}
              tick={{ fontSize: 12, fill: '#6b7280' }}
              label={{ value: 'GPA Trung bình', angle: -90, position: 'insideLeft', fontSize: 12, fill: '#6b7280' }}
            />
            <ZAxis type="number" dataKey="students" range={[100, 500]} name="Sinh viên" />
            <Tooltip 
              cursor={{ strokeDasharray: '3 3' }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const d = payload[0].payload;
                  return (
                    <div className="bg-white p-3 shadow-lg rounded-lg border border-gray-100">
                      <p className="font-bold text-gray-900 mb-1">{d.name}</p>
                      <p className="text-sm text-gray-600">Khối lượng: <span className="font-bold">{d.workload}h</span></p>
                      <p className="text-sm text-gray-600">GPA Lớp: <span className="font-bold text-purple-600">{d.gpa}</span></p>
                      <p className="text-sm text-gray-600">Sinh viên: <span className="font-bold">{d.students}</span></p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Scatter name="Giảng viên" data={data} fill="#8b5cf6" fillOpacity={0.7} stroke="#7c3aed" strokeWidth={2} />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 p-4 bg-purple-50 rounded-xl">
        <p className="text-sm text-purple-800">
          <span className="font-bold">Nhận định:</span> Các giảng viên có khối lượng giảng dạy quá cao (&gt;130h) có xu hướng ghi nhận mức GPA trung bình lớp thấp hơn.
        </p>
      </div>
    </div>
  );
};

export default TeachingImpactChart;
