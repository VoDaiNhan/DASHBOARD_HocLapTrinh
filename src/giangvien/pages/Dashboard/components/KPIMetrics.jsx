import React from 'react';
import { TrendingUp, TrendingDown, Users, BookOpen, Award, AlertTriangle } from 'lucide-react';

const KPIMetrics = ({ data }) => {
  if (!data) return null;

  const metrics = [
    {
      title: 'Tổng Sinh Viên',
      value: data.totalStudents,
      change: data.studentChange,
      changeType: data.studentChange > 0 ? 'increase' : 'decrease',
      icon: Users,
      color: 'primary'
    },
    {
      title: 'Khóa Học Đang Diễn Ra',
      value: data.activeCourses,
      change: data.courseChange,
      changeType: data.courseChange > 0 ? 'increase' : 'decrease',
      icon: BookOpen,
      color: 'success'
    },
    {
      title: 'Tỷ Lệ Hoàn Thành Trung Bình',
      value: `${data.averageCompletion}%`,
      change: data.completionChange,
      changeType: data.completionChange > 0 ? 'increase' : 'decrease',
      icon: Award,
      color: 'warning'
    },
    {
      title: 'Sinh Viên Có Nguy Cơ',
      value: data.atRiskStudents,
      change: data.riskChange,
      changeType: data.riskChange > 0 ? 'increase' : 'decrease',
      icon: AlertTriangle,
      color: 'danger'
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      primary: 'bg-primary-50 text-primary-600',
      success: 'bg-success-50 text-success-600',
      warning: 'bg-warning-50 text-warning-600',
      danger: 'bg-danger-50 text-danger-600'
    };
    return colors[color] || colors.primary;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <div key={index} className="card p-6 hover:shadow-medium transition-shadow duration-200">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600 mb-1">{metric.title}</p>
              <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
              
              <div className="flex items-center mt-2">
                {metric.changeType === 'increase' ? (
                  <TrendingUp className="h-4 w-4 text-success-600 mr-1" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-danger-600 mr-1" />
                )}
                <span className={`text-sm font-medium ${
                  metric.changeType === 'increase' ? 'text-success-600' : 'text-danger-600'
                }`}>
                  {Math.abs(metric.change)}%
                </span>
                <span className="text-sm text-gray-500 ml-1">so với tháng trước</span>
              </div>
            </div>
            
            <div className={`p-3 rounded-lg ${getColorClasses(metric.color)}`}>
              <metric.icon className="h-6 w-6" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default KPIMetrics;