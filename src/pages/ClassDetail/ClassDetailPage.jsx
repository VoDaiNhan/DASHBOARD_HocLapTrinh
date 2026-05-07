import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, GraduationCap, Users, BookOpen, CheckCircle, XCircle, Clock } from 'lucide-react';
import { mockClassData } from '../../data/mockData';

const ClassDetailPage = () => {
  const { classId } = useParams();
  const navigate = useNavigate();
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);

  // Find class data
  const classData = mockClassData.classes.find(c => c.id === parseInt(classId));

  if (!classData) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Không tìm thấy lớp</h2>
          <button onClick={() => navigate('/classes')} className="mt-4 text-blue-600 hover:underline">
            Quay lại danh sách lớp
          </button>
        </div>
      </div>
    );
  }

  const overallProgress = Math.round((classData.submittedAssignments / (classData.enrolledStudents * classData.totalAssignments)) * 100);
  const currentYear = new Date().getFullYear();
  const yearInProgram = currentYear - classData.cohort + 1;

  // Generate subjects based on year
  const getSubjects = () => {
    if (yearInProgram === 1) {
      return [
        { 
          id: 1, 
          name: 'Nhập môn lập trình', 
          progress: Math.min(100, overallProgress + 15),
          chapters: [
            { id: 1, name: 'Giới thiệu lập trình', progress: 100, assignments: [
              { id: 1, name: 'Bài 1: Hello World', status: 'completed' },
              { id: 2, name: 'Bài 2: Biến và kiểu dữ liệu', status: 'completed' },
              { id: 3, name: 'Bài 3: Input/Output', status: 'completed' }
            ]},
            { id: 2, name: 'Cấu trúc điều khiển', progress: 85, assignments: [
              { id: 4, name: 'Bài 4: If-else', status: 'completed' },
              { id: 5, name: 'Bài 5: Switch-case', status: 'completed' },
              { id: 6, name: 'Bài 6: Vòng lặp for', status: 'pending' }
            ]},
            { id: 3, name: 'Hàm và thủ tục', progress: 60, assignments: [
              { id: 7, name: 'Bài 7: Định nghĩa hàm', status: 'completed' },
              { id: 8, name: 'Bài 8: Tham số hàm', status: 'pending' },
              { id: 9, name: 'Bài 9: Đệ quy', status: 'pending' }
            ]}
          ]
        },
        { 
          id: 2, 
          name: 'Toán rời rạc', 
          progress: Math.max(0, overallProgress - 5),
          chapters: [
            { id: 4, name: 'Lý thuyết tập hợp', progress: 90, assignments: [
              { id: 10, name: 'Bài 1: Tập hợp cơ bản', status: 'completed' },
              { id: 11, name: 'Bài 2: Phép toán tập hợp', status: 'completed' }
            ]},
            { id: 5, name: 'Đồ thị', progress: 70, assignments: [
              { id: 12, name: 'Bài 3: Biểu diễn đồ thị', status: 'completed' },
              { id: 13, name: 'Bài 4: Duyệt đồ thị', status: 'pending' }
            ]}
          ]
        },
        { 
          id: 3, 
          name: 'Cấu trúc dữ liệu', 
          progress: Math.max(0, overallProgress - 10),
          chapters: [
            { id: 6, name: 'Mảng và danh sách', progress: 80, assignments: [
              { id: 14, name: 'Bài 1: Mảng 1 chiều', status: 'completed' },
              { id: 15, name: 'Bài 2: Mảng 2 chiều', status: 'pending' }
            ]},
            { id: 7, name: 'Stack và Queue', progress: 50, assignments: [
              { id: 16, name: 'Bài 3: Cài đặt Stack', status: 'pending' },
              { id: 17, name: 'Bài 4: Cài đặt Queue', status: 'pending' }
            ]}
          ]
        }
      ];
    } else if (yearInProgram === 2) {
      return [
        { 
          id: 4, 
          name: 'Lập trình hướng đối tượng', 
          progress: Math.min(100, overallProgress + 10),
          chapters: [
            { id: 8, name: 'Class và Object', progress: 100, assignments: [
              { id: 18, name: 'Bài 1: Định nghĩa class', status: 'completed' },
              { id: 19, name: 'Bài 2: Constructor', status: 'completed' }
            ]},
            { id: 9, name: 'Kế thừa', progress: 75, assignments: [
              { id: 20, name: 'Bài 3: Inheritance', status: 'completed' },
              { id: 21, name: 'Bài 4: Polymorphism', status: 'pending' }
            ]}
          ]
        },
        { 
          id: 5, 
          name: 'Cơ sở dữ liệu', 
          progress: overallProgress,
          chapters: [
            { id: 10, name: 'SQL cơ bản', progress: 85, assignments: [
              { id: 22, name: 'Bài 1: SELECT', status: 'completed' },
              { id: 23, name: 'Bài 2: JOIN', status: 'completed' }
            ]},
            { id: 11, name: 'Thiết kế CSDL', progress: 60, assignments: [
              { id: 24, name: 'Bài 3: ERD', status: 'pending' }
            ]}
          ]
        }
      ];
    } else if (yearInProgram === 3) {
      return [
        { 
          id: 6, 
          name: 'Phát triển Web', 
          progress: Math.min(100, overallProgress + 5),
          chapters: [
            { id: 12, name: 'HTML/CSS', progress: 95, assignments: [
              { id: 25, name: 'Bài 1: HTML cơ bản', status: 'completed' },
              { id: 26, name: 'Bài 2: CSS Layout', status: 'completed' }
            ]},
            { id: 13, name: 'JavaScript', progress: 70, assignments: [
              { id: 27, name: 'Bài 3: DOM', status: 'completed' },
              { id: 28, name: 'Bài 4: Event', status: 'pending' }
            ]},
            { id: 14, name: 'React', progress: 60, assignments: [
              { id: 29, name: 'Bài 5: Components', status: 'pending' },
              { id: 30, name: 'Bài 6: Hooks', status: 'pending' }
            ]}
          ]
        },
        { 
          id: 7, 
          name: 'Công nghệ phần mềm', 
          progress: overallProgress,
          chapters: [
            { id: 15, name: 'Quy trình phát triển', progress: 80, assignments: [
              { id: 31, name: 'Bài 1: Agile', status: 'completed' }
            ]},
            { id: 16, name: 'Testing', progress: 65, assignments: [
              { id: 32, name: 'Bài 2: Unit Test', status: 'pending' }
            ]}
          ]
        }
      ];
    } else {
      return [
        { 
          id: 8, 
          name: 'Đồ án tốt nghiệp', 
          progress: overallProgress,
          chapters: [
            { id: 17, name: 'Phân tích yêu cầu', progress: 100, assignments: [
              { id: 33, name: 'Đề cương', status: 'completed' }
            ]},
            { id: 18, name: 'Thiết kế hệ thống', progress: 80, assignments: [
              { id: 34, name: 'Thiết kế', status: 'completed' }
            ]},
            { id: 19, name: 'Cài đặt', progress: 60, assignments: [
              { id: 35, name: 'Code', status: 'pending' }
            ]}
          ]
        }
      ];
    }
  };

  const subjects = getSubjects();

  // Breadcrumb
  const getBreadcrumb = () => {
    const items = [{ label: 'Quản lý lớp', path: '/classes' }, { label: classData.name }];
    if (selectedSubject) {
      items.push({ label: selectedSubject.name });
    }
    if (selectedChapter) {
      items.push({ label: selectedChapter.name });
    }
    return items;
  };

  const breadcrumb = getBreadcrumb();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm mb-4">
            {breadcrumb.map((item, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && <span className="text-gray-400">/</span>}
                {item.path ? (
                  <button
                    onClick={() => navigate(item.path)}
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    {item.label}
                  </button>
                ) : (
                  <span className="text-gray-900 dark:text-white font-medium">{item.label}</span>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Back button */}
          <button
            onClick={() => {
              if (selectedChapter) {
                setSelectedChapter(null);
              } else if (selectedSubject) {
                setSelectedSubject(null);
              } else {
                navigate('/classes');
              }
            }}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Quay lại
          </button>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
                <GraduationCap className="text-white" size={28} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {selectedChapter ? selectedChapter.name : selectedSubject ? selectedSubject.name : `Lớp ${classData.name}`}
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                  {!selectedSubject && `Khóa ${classData.cohort} • ${classData.enrolledStudents} sinh viên`}
                  {selectedSubject && !selectedChapter && `${selectedSubject.chapters.length} chương`}
                  {selectedChapter && `${selectedChapter.assignments.length} bài tập`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* LEVEL 2: Chi tiết lớp - Breakdown theo môn */}
        {!selectedSubject && (
          <div className="space-y-6">
            {/* Tổng quan */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border border-blue-100 dark:border-blue-800">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">🔥 Tổng quan tiến độ</h2>
                <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  {overallProgress}%
                </span>
              </div>
              <div className="w-full bg-white dark:bg-gray-700 rounded-full h-4 overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all ${
                    overallProgress >= 75 ? 'bg-green-500' : 
                    overallProgress >= 50 ? 'bg-blue-500' : 
                    'bg-yellow-500'
                  }`}
                  style={{ width: `${overallProgress}%` }}
                />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-3">
                {classData.submittedAssignments} / {classData.enrolledStudents * classData.totalAssignments} bài đã hoàn thành
              </p>
            </div>

            {/* Breakdown theo môn */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">📊 Breakdown theo môn học</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {subjects.map((subject) => (
                  <button
                    key={subject.id}
                    onClick={() => setSelectedSubject(subject)}
                    className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-lg transition-all text-left"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-gray-900 dark:text-white">{subject.name}</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-gray-900 dark:text-white">
                          {subject.progress}%
                        </span>
                        {subject.progress < overallProgress - 10 && (
                          <span className="text-xs text-amber-600 dark:text-amber-400">⚠️</span>
                        )}
                        {subject.progress > overallProgress + 10 && (
                          <span className="text-xs text-green-600 dark:text-green-400">✅</span>
                        )}
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden mb-2">
                      <div 
                        className={`h-full rounded-full transition-all ${
                          subject.progress >= 75 ? 'bg-green-500' : 
                          subject.progress >= 50 ? 'bg-blue-500' : 
                          'bg-yellow-500'
                        }`}
                        style={{ width: `${subject.progress}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {subject.chapters.length} chương • Click để xem chi tiết
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* LEVEL 3: Chi tiết môn - Breakdown theo chương */}
        {selectedSubject && !selectedChapter && (
          <div className="space-y-6">
            {/* Subject overview */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 border border-purple-100 dark:border-purple-800">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">📘 {selectedSubject.name}</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {selectedSubject.chapters.length} chương học
                  </p>
                </div>
                <span className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                  {selectedSubject.progress}%
                </span>
              </div>
              <div className="w-full bg-white dark:bg-gray-700 rounded-full h-4 overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all ${
                    selectedSubject.progress >= 75 ? 'bg-green-500' : 
                    selectedSubject.progress >= 50 ? 'bg-blue-500' : 
                    'bg-yellow-500'
                  }`}
                  style={{ width: `${selectedSubject.progress}%` }}
                />
              </div>
            </div>

            {/* Breakdown theo chương */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">📗 Breakdown theo chương</h2>
              <div className="space-y-3">
                {selectedSubject.chapters.map((chapter) => (
                  <button
                    key={chapter.id}
                    onClick={() => setSelectedChapter(chapter)}
                    className="w-full bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 hover:shadow-lg transition-all text-left"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <BookOpen className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                        <h3 className="font-semibold text-gray-900 dark:text-white">{chapter.name}</h3>
                      </div>
                      <span className="text-lg font-bold text-gray-900 dark:text-white">
                        {chapter.progress}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden mb-2">
                      <div 
                        className={`h-full rounded-full transition-all ${
                          chapter.progress >= 75 ? 'bg-green-500' : 
                          chapter.progress >= 50 ? 'bg-blue-500' : 
                          'bg-yellow-500'
                        }`}
                        style={{ width: `${chapter.progress}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {chapter.assignments.length} bài tập • Click để xem chi tiết
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* LEVEL 4: Chi tiết chương - Danh sách bài tập */}
        {selectedChapter && (
          <div className="space-y-6">
            {/* Chapter overview */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6 border border-green-100 dark:border-green-800">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">📗 {selectedChapter.name}</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {selectedChapter.assignments.filter(a => a.status === 'completed').length} / {selectedChapter.assignments.length} bài đã hoàn thành
                  </p>
                </div>
                <span className="text-3xl font-bold text-green-600 dark:text-green-400">
                  {selectedChapter.progress}%
                </span>
              </div>
              <div className="w-full bg-white dark:bg-gray-700 rounded-full h-4 overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all ${
                    selectedChapter.progress >= 75 ? 'bg-green-500' : 
                    selectedChapter.progress >= 50 ? 'bg-blue-500' : 
                    'bg-yellow-500'
                  }`}
                  style={{ width: `${selectedChapter.progress}%` }}
                />
              </div>
            </div>

            {/* Danh sách bài tập */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">📝 Danh sách bài tập</h2>
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-900/50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                        Bài tập
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                        Trạng thái
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {selectedChapter.assignments.map((assignment) => (
                      <tr key={assignment.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            {assignment.status === 'completed' ? (
                              <CheckCircle className="h-5 w-5 text-green-500" />
                            ) : (
                              <Clock className="h-5 w-5 text-yellow-500" />
                            )}
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                              {assignment.name}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          {assignment.status === 'completed' ? (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300">
                              ✅ Đã hoàn thành
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300">
                              ⏳ Chưa hoàn thành
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClassDetailPage;
