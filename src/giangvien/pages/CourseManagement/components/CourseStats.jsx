import { TrendingUp, TrendingDown, BookOpen, Users, Award, Activity } from 'lucide-react';

const CourseStats = ({ stats }) => {
  const statCards = [
    {
      title: 'Tổng khóa học',
      value: stats?.totalCourses || 0,
      change: stats?.courseChange || 0,
      icon: BookOpen,
      color: 'blue'
    },
    {
      title: 'Khóa đang hoạt động',
      value: stats?.activeCourses || 0,
      change: stats?.activeChange || 0,
      icon: Activity,
      color: 'green'
    },
    {
      title: 'Tổng sinh viên',
      value: stats?.totalStudents || 0,
      change: stats?.studentChange || 0,
      icon: Users,
      color: 'purple'
    },
    {
      title: 'Điểm trung bình',
      value: stats?.averageScore?.toFixed(1) || 0,
      change: stats?.scoreChange || 0,
      icon: Award,
      color: 'yellow',
      suffix: '/10'
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-50 text-blue-600',
      green: 'bg-green-50 text-green-600',
      purple: 'bg-purple-50 text-purple-600',
      yellow: 'bg-yellow-50 text-yellow-600'
    };
    return colors[color] || colors.blue;
  };

  const renderChangeIndicator = (change) => {
    if (change === 0) return null;
    
    const isPositive = change > 0;
    return (
      <div className={`flex items-center gap-1 text-sm font-medium ${
        isPositive ? 'text-green-600' : 'text-red-600'
      }`}>
        {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
        <span>{Math.abs(change)}%</span>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statCards.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-lg ${getColorClasses(stat.color)}`}>
                <Icon size={24} />
              </div>
              {renderChangeIndicator(stat.change)}
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">{stat.title}</h3>
            <div className="flex items-baseline gap-1">
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              {stat.suffix && (
                <span className="text-lg text-gray-500">{stat.suffix}</span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CourseStats;

