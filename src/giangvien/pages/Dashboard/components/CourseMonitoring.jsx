import { useState, useEffect } from 'react';
import { Clock, Users, MoreVertical, X, TrendingUp, TrendingDown, Minus, Award, Search } from 'lucide-react';
import { mockStudentTrackingData } from '../../../data/mockData';

const CourseMonitoring = ({ data }) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [gradeFilter, setGradeFilter] = useState('all');
    const [teacherName, setTeacherName] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        // Lấy tên giảng viên từ sessionStorage (đã lưu khi đăng nhập)
        const userData = sessionStorage.getItem('user');
        if (userData) {
            const user = JSON.parse(userData);
            setTeacherName(user?.full_name || 'Giảng viên');
        }
    }, []);

    if (!data) return null;

    const getStatusBadge = (status) => {
        const statusConfig = {
            active: { class: 'status-badge status-active', text: 'Đang diễn ra' },
            upcoming: { class: 'status-badge status-pending', text: 'Sắp diễn ra' },
            completed: { class: 'status-badge status-completed', text: 'Hoàn thành' }
        };

        return statusConfig[status] || statusConfig.active;
    };

    const handleCourseClick = (course) => {
        setSelectedCourse(course);
        setGradeFilter('all');
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setGradeFilter('all');
        setSearchQuery('');
    };

    const getStudentsInCourse = (courseName) => {
        const students = mockStudentTrackingData?.students || [];
        return students.filter(student => 
            student.courses?.some(c => c.name === courseName)
        );
    };

    const getTrendIcon = (scoreChange) => {
        if (scoreChange > 0) return <TrendingUp className="h-4 w-4 text-success-600" />;
        if (scoreChange < 0) return <TrendingDown className="h-4 w-4 text-danger-600" />;
        return <Minus className="h-4 w-4 text-gray-400" />;
    };

    const getGradeCategory = (score) => {
        if (score >= 8.0) return 'excellent';
        if (score >= 6.5) return 'good';
        if (score >= 5.0) return 'average';
        if (score >= 4.0) return 'weak';
        return 'poor';
    };

    const filterStudentsByGrade = (students, courseName) => {
        let filtered = students;
        
        // Lọc theo điểm
        if (gradeFilter !== 'all') {
            filtered = filtered.filter(student => {
                const courseData = student.courses?.find(c => c.name === courseName);
                if (!courseData) return false;
                return getGradeCategory(courseData.score) === gradeFilter;
            });
        }
        
        // Lọc theo tìm kiếm
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(student => 
                student.name.toLowerCase().includes(query) ||
                student.studentId.toLowerCase().includes(query) ||
                student.email.toLowerCase().includes(query)
            );
        }
        
        return filtered;
    };

    const gradeFilters = [
        { value: 'all', label: 'Tất cả', color: 'gray' },
        { value: 'excellent', label: 'Giỏi (≥ 8.0)', color: 'success' },
        { value: 'good', label: 'Khá (6.5 - 8.0)', color: 'primary' },
        { value: 'average', label: 'TB (5.0 - 6.5)', color: 'warning' },
        { value: 'weak', label: 'Yếu (4.0 - 5.0)', color: 'orange' },
        { value: 'poor', label: 'Kém (< 4.0)', color: 'danger' }
    ];

    const getFilterButtonClass = (filterValue) => {
        const baseClass = "px-3 py-1.5 text-sm font-medium rounded-lg transition-colors";
        if (gradeFilter === filterValue) {
            const activeColors = {
                all: 'bg-gray-600 text-white',
                excellent: 'bg-success-600 text-white',
                good: 'bg-primary-600 text-white',
                average: 'bg-warning-600 text-white',
                orange: 'bg-orange-600 text-white',
                danger: 'bg-danger-600 text-white'
            };
            const filter = gradeFilters.find(f => f.value === filterValue);
            return `${baseClass} ${activeColors[filter?.color] || activeColors.all}`;
        }
        return `${baseClass} bg-gray-100 text-gray-700 hover:bg-gray-200`;
    };

    return (
        <div className="card p-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-lg font-semibold text-gray-900">Theo Dõi Khóa Học</h3>
                    <p className="text-sm text-gray-600">Trạng thái và hiệu suất các khóa học</p>
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <MoreVertical className="h-5 w-5 text-gray-500" />
                </button>
            </div>

            <div className="space-y-4">
                {data.map((course, index) => (
                    <button
                        key={index}
                        onClick={() => handleCourseClick(course)}
                        className="w-full border border-gray-200 rounded-lg p-4 hover:bg-gray-50 hover:border-primary-300 transition-all text-left cursor-pointer"
                    >
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                                <h4 className="font-medium text-gray-900 mb-1">{course.name}</h4>
                                <p className="text-sm text-gray-600 mb-2">Giảng viên: {teacherName}</p>
                                <div className="flex items-center space-x-4 text-sm text-gray-600">
                                    <div className="flex items-center space-x-1">
                                        <Users className="h-4 w-4" />
                                        <span>{course.enrolledStudents} sinh viên</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <Clock className="h-4 w-4" />
                                        <span>{course.duration}</span>
                                    </div>
                                </div>
                            </div>
                            <span className={getStatusBadge(course.status).class}>
                                {getStatusBadge(course.status).text}
                            </span>
                        </div>

                        <div>
                            <div className="flex items-center justify-between text-sm mb-1">
                                <span className="text-gray-600">Tiến độ hoàn thành</span>
                                <span className="font-medium text-gray-900">{course.completionRate}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                    className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${course.completionRate}%` }}
                                ></div>
                            </div>
                        </div>
                    </button>
                ))}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
                <button className="w-full text-center text-sm text-primary-600 hover:text-primary-700 font-medium">
                    Xem tất cả khóa học
                </button>
            </div>

            {/* Modal chi tiết khóa học */}
            {showModal && selectedCourse && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-hidden">
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-gray-200">
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900">
                                    {selectedCourse.name}
                                </h3>
                                <div className="flex items-center space-x-4 text-sm text-gray-600 mt-2">
                                    <div className="flex items-center space-x-1">
                                        <Users className="h-4 w-4" />
                                        <span>{selectedCourse.enrolledStudents} sinh viên</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <Clock className="h-4 w-4" />
                                        <span>{selectedCourse.duration}</span>
                                    </div>
                                    <span className={getStatusBadge(selectedCourse.status).class}>
                                        {getStatusBadge(selectedCourse.status).text}
                                    </span>
                                </div>
                            </div>
                            <button
                                onClick={handleCloseModal}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <X className="h-5 w-5 text-gray-500" />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
                            {/* Thống kê tổng quan */}
                            <div className="mb-6">
                                <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Thống kê tổng quan</h4>
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-4 rounded-lg">
                                        <div className="flex items-center space-x-2 mb-2">
                                            <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                            <p className="text-sm font-medium text-blue-900 dark:text-blue-300">Tổng sinh viên</p>
                                        </div>
                                        <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                                            {getStudentsInCourse(selectedCourse.name).length}
                                        </p>
                                    </div>
                                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-4 rounded-lg">
                                        <div className="flex items-center space-x-2 mb-2">
                                            <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
                                            <p className="text-sm font-medium text-green-900 dark:text-green-300">Tiến độ TB</p>
                                        </div>
                                        <p className="text-3xl font-bold text-green-600 dark:text-green-400">{selectedCourse.completionRate}%</p>
                                    </div>
                                    <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 p-4 rounded-lg">
                                        <div className="flex items-center space-x-2 mb-2">
                                            <Clock className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                                            <p className="text-sm font-medium text-purple-900 dark:text-purple-300">Thời lượng</p>
                                        </div>
                                        <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{selectedCourse.duration}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Phân tích hiệu suất */}
                            <div className="mb-6">
                                <h4 className="text-lg font-semibold text-gray-900 mb-4">Phân tích hiệu suất</h4>
                                <div className="grid grid-cols-2 gap-4">
                                    {/* Phân bố điểm */}
                                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                        <h5 className="font-medium text-gray-900 mb-3">Phân bố điểm số</h5>
                                        <div className="space-y-2">
                                            {(() => {
                                                const students = getStudentsInCourse(selectedCourse.name);
                                                const excellent = students.filter(s => {
                                                    const course = s.courses.find(c => c.name === selectedCourse.name);
                                                    return course && course.score >= 8.0;
                                                }).length;
                                                const good = students.filter(s => {
                                                    const course = s.courses.find(c => c.name === selectedCourse.name);
                                                    return course && course.score >= 6.5 && course.score < 8.0;
                                                }).length;
                                                const average = students.filter(s => {
                                                    const course = s.courses.find(c => c.name === selectedCourse.name);
                                                    return course && course.score >= 5.0 && course.score < 6.5;
                                                }).length;
                                                const poor = students.filter(s => {
                                                    const course = s.courses.find(c => c.name === selectedCourse.name);
                                                    return course && course.score < 5.0;
                                                }).length;

                                                return (
                                                    <>
                                                        <div className="flex items-center justify-between text-sm">
                                                            <span className="text-gray-600">Giỏi (≥8.0)</span>
                                                            <span className="font-bold text-green-600">{excellent} SV ({((excellent/students.length)*100).toFixed(0)}%)</span>
                                                        </div>
                                                        <div className="flex items-center justify-between text-sm">
                                                            <span className="text-gray-600">Khá (6.5-7.9)</span>
                                                            <span className="font-bold text-blue-600">{good} SV ({((good/students.length)*100).toFixed(0)}%)</span>
                                                        </div>
                                                        <div className="flex items-center justify-between text-sm">
                                                            <span className="text-gray-600">TB (5.0-6.4)</span>
                                                            <span className="font-bold text-yellow-600">{average} SV ({((average/students.length)*100).toFixed(0)}%)</span>
                                                        </div>
                                                        <div className="flex items-center justify-between text-sm">
                                                            <span className="text-gray-600">Yếu/Kém (&lt;5.0)</span>
                                                            <span className="font-bold text-red-600">{poor} SV ({((poor/students.length)*100).toFixed(0)}%)</span>
                                                        </div>
                                                    </>
                                                );
                                            })()}
                                        </div>
                                    </div>

                                    {/* Phân bố tiến độ */}
                                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                        <h5 className="font-medium text-gray-900 mb-3">Phân bố tiến độ</h5>
                                        <div className="space-y-2">
                                            {(() => {
                                                const students = getStudentsInCourse(selectedCourse.name);
                                                const completed = students.filter(s => {
                                                    const course = s.courses.find(c => c.name === selectedCourse.name);
                                                    return course && course.progress >= 90;
                                                }).length;
                                                const onTrack = students.filter(s => {
                                                    const course = s.courses.find(c => c.name === selectedCourse.name);
                                                    return course && course.progress >= 70 && course.progress < 90;
                                                }).length;
                                                const behind = students.filter(s => {
                                                    const course = s.courses.find(c => c.name === selectedCourse.name);
                                                    return course && course.progress >= 50 && course.progress < 70;
                                                }).length;
                                                const atRisk = students.filter(s => {
                                                    const course = s.courses.find(c => c.name === selectedCourse.name);
                                                    return course && course.progress < 50;
                                                }).length;

                                                return (
                                                    <>
                                                        <div className="flex items-center justify-between text-sm">
                                                            <span className="text-gray-600">Hoàn thành tốt (≥90%)</span>
                                                            <span className="font-bold text-green-600">{completed} SV ({((completed/students.length)*100).toFixed(0)}%)</span>
                                                        </div>
                                                        <div className="flex items-center justify-between text-sm">
                                                            <span className="text-gray-600">Đúng tiến độ (70-89%)</span>
                                                            <span className="font-bold text-blue-600">{onTrack} SV ({((onTrack/students.length)*100).toFixed(0)}%)</span>
                                                        </div>
                                                        <div className="flex items-center justify-between text-sm">
                                                            <span className="text-gray-600">Chậm tiến độ (50-69%)</span>
                                                            <span className="font-bold text-yellow-600">{behind} SV ({((behind/students.length)*100).toFixed(0)}%)</span>
                                                        </div>
                                                        <div className="flex items-center justify-between text-sm">
                                                            <span className="text-gray-600">Rủi ro cao (&lt;50%)</span>
                                                            <span className="font-bold text-red-600">{atRisk} SV ({((atRisk/students.length)*100).toFixed(0)}%)</span>
                                                        </div>
                                                    </>
                                                );
                                            })()}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Tìm kiếm và Bộ lọc */}
                            <div className="mb-6 space-y-4">
                                {/* Thanh tìm kiếm */}
                                <div>
                                    <h4 className="text-sm font-medium text-gray-700 mb-3">Tìm kiếm sinh viên</h4>
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                        <input
                                            type="text"
                                            placeholder="Tìm theo tên, MSSV, email..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                                        />
                                    </div>
                                </div>

                                {/* Bộ lọc theo điểm */}
                                <div>
                                    <h4 className="text-sm font-medium text-gray-700 mb-3">Lọc theo mức độ điểm</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {gradeFilters.map((filter) => {
                                            const studentsInGrade = filter.value === 'all' 
                                                ? getStudentsInCourse(selectedCourse.name)
                                                : filterStudentsByGrade(getStudentsInCourse(selectedCourse.name), selectedCourse.name);
                                            
                                            return (
                                                <button
                                                    key={filter.value}
                                                    onClick={() => setGradeFilter(filter.value)}
                                                    className={getFilterButtonClass(filter.value)}
                                                >
                                                    {filter.label} ({studentsInGrade.length})
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>

                            {/* Danh sách sinh viên */}
                            <div>
                                <h4 className="text-lg font-semibold text-gray-900 mb-4">
                                    Danh sách sinh viên trong khóa học
                                </h4>
                                {filterStudentsByGrade(getStudentsInCourse(selectedCourse.name), selectedCourse.name).length > 0 ? (
                                    <div className="space-y-3">
                                        {filterStudentsByGrade(getStudentsInCourse(selectedCourse.name), selectedCourse.name).map((student, index) => {
                                            const courseData = student.courses.find(c => c.name === selectedCourse.name);
                                            return (
                                                <div 
                                                    key={student.id}
                                                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                                >
                                                    <div className="flex items-center space-x-4 flex-1">
                                                        <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                                                            <span className="text-primary-600 font-semibold">{index + 1}</span>
                                                        </div>
                                                        <div className="flex-1">
                                                            <p className="font-medium text-gray-900">{student.name}</p>
                                                            <p className="text-sm text-gray-600">{student.studentId} • {student.email}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center space-x-6">
                                                        <div className="text-right">
                                                            <p className="text-sm text-gray-600">Tiến độ</p>
                                                            <p className="text-lg font-bold text-gray-900">{courseData?.progress || 0}%</p>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="text-sm text-gray-600">Điểm</p>
                                                            <div className="flex items-center space-x-1">
                                                                <p className="text-lg font-bold text-gray-900">
                                                                    {courseData?.score?.toFixed(1) || '-'}
                                                                </p>
                                                                {getTrendIcon(student.scoreChange)}
                                                            </div>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="text-sm text-gray-600">Trạng thái</p>
                                                            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                                                                student.status === 'active' 
                                                                    ? 'bg-success-100 text-success-700'
                                                                    : student.status === 'at_risk'
                                                                    ? 'bg-danger-100 text-danger-700'
                                                                    : 'bg-gray-100 text-gray-700'
                                                            }`}>
                                                                {student.status === 'active' ? 'Đang học' : student.status === 'at_risk' ? 'Có nguy cơ' : 'Hoàn thành'}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <div className="text-center py-12">
                                        <Users className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                                        <p className="text-gray-500">
                                            {gradeFilter === 'all' 
                                                ? 'Chưa có sinh viên nào trong khóa học này'
                                                : 'Không có sinh viên nào trong mức điểm này'
                                            }
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-end p-6 border-t border-gray-200 bg-gray-50">
                            <button
                                onClick={handleCloseModal}
                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                            >
                                Đóng
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CourseMonitoring;