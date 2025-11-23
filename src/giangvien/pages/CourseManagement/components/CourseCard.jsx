import { Users, Clock, TrendingUp, Award, BarChart3, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const CourseCard = ({ course }) => {
  const getStatusBadge = (status) => {
    const styles = {
      active: 'bg-green-100 text-green-700 border-green-200',
      completed: 'bg-gray-100 text-gray-700 border-gray-200',
      upcoming: 'bg-blue-100 text-blue-700 border-blue-200'
    };
    
    const labels = {
      active: 'Đang hoạt động',
      completed: 'Đã hoàn thành',
      upcoming: 'Sắp diễn ra'
    };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${styles[status] || styles.active}`}>
        {labels[status] || status}
      </span>
    );
  };

  const getCompletionColor = (rate) => {
    if (rate >= 80) return 'bg-green-500';
    if (rate >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 overflow-hidden group">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-2 group-hover:text-blue-100 transition-colors">
              {course.name}
            </h3>
            <div className="flex items-center gap-2 text-blue-100 text-sm">
              <Clock size={16} />
              <span>{course.duration}</span>
            </div>
          </div>
          {getStatusBadge(course.status)}
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-blue-100">Tỷ lệ hoàn thành</span>
            <span className="font-semibold">{course.completionRate}%</span>
          </div>
          <div className="w-full bg-blue-400/30 rounded-full h-2 overflow-hidden">
            <div
              className="bg-white h-full rounded-full transition-all duration-500"
              style={{ width: `${course.completionRate}%` }}
            />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="p-6">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-50 rounded-lg">
              <Users className="text-purple-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Sinh viên</p>
              <p className="text-lg font-bold text-gray-900">{course.enrolledStudents}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-50 rounded-lg">
              <Award className="text-yellow-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Điểm TB</p>
              <p className="text-lg font-bold text-gray-900">{course.averageScore?.toFixed(1)}</p>
            </div>
          </div>
        </div>

        {/* Progress by Class */}
        {course.classes && course.classes.length > 0 && (
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <BarChart3 size={16} />
              Tiến độ theo lớp
            </h4>
            <div className="space-y-2">
              {course.classes.slice(0, 3).map((cls, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <span className="text-xs font-medium text-gray-600 w-16">{cls.name}</span>
                  <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${getCompletionColor(cls.completionRate)}`}
                      style={{ width: `${cls.completionRate}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium text-gray-700 w-10 text-right">
                    {cls.completionRate}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* View Details Button */}
        <Link
          to={`/courses/${course.id}`}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-50 hover:bg-blue-50 text-gray-700 hover:text-blue-600 rounded-lg font-medium transition-colors group"
        >
          <span>Xem chi tiết</span>
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;

