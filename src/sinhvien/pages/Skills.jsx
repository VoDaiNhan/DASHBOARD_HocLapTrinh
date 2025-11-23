import React from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Tooltip } from 'recharts';
import { softSkills, projects, skillImprovements } from '../data/data';

const Skills = () => {
  const radarData = [
    { skill: 'Giao tiếp', value: softSkills.communication, fullMark: 5 },
    { skill: 'Teamwork', value: softSkills.teamwork, fullMark: 5 },
    { skill: 'Quản lý TG', value: softSkills.timeManagement, fullMark: 5 },
    { skill: 'Giải quyết VĐ', value: softSkills.problemSolving, fullMark: 5 },
    { skill: 'Sáng tạo', value: softSkills.creativity, fullMark: 5 },
    { skill: 'Lãnh đạo', value: softSkills.leadership, fullMark: 5 }
  ];

  const getProjectStatusColor = (status) => {
    switch (status) {
      case 'on-track':
        return 'bg-green-100 text-green-800';
      case 'at-risk':
        return 'bg-yellow-100 text-yellow-800';
      case 'delayed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getProjectStatusLabel = (status) => {
    switch (status) {
      case 'on-track':
        return 'Đúng tiến độ';
      case 'at-risk':
        return 'Có rủi ro';
      case 'delayed':
        return 'Trễ hạn';
      default:
        return 'N/A';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Kỹ năng Mềm & Teamwork</h1>
        <p className="text-gray-600 dark:text-gray-400">Đánh giá kỹ năng mềm và quản lý dự án nhóm</p>
      </div>

      {/* Radar Chart */}
      <div className="card">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Biểu đồ Kỹ năng Mềm</h2>
        <div className="w-full h-96">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={radarData}>
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis dataKey="skill" stroke="#6b7280" />
              <PolarRadiusAxis angle={90} domain={[0, 5]} stroke="#6b7280" />
              <Radar
                name="Điểm kỹ năng"
                dataKey="value"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.6}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Skill Scores */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(softSkills).map(([skill, value]) => {
          const skillNames = {
            communication: 'Giao tiếp',
            teamwork: 'Hợp tác',
            timeManagement: 'Quản lý thời gian',
            problemSolving: 'Giải quyết vấn đề',
            creativity: 'Sáng tạo',
            leadership: 'Lãnh đạo'
          };

          return (
            <div key={skill} className="card">
              <h3 className="font-semibold text-gray-800 dark:text-white mb-3">{skillNames[skill]}</h3>
              <div className="flex items-center justify-between mb-2">
                <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-3 mr-3">
                  <div
                    className="bg-primary-600 dark:bg-primary-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${(value / 5) * 100}%` }}
                  ></div>
                </div>
                <span className="text-lg font-bold text-gray-800 dark:text-white">{value}/5</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Projects Table */}
      <div className="card">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Tiến độ Dự án Nhóm</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">Tên dự án</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">Vai trò</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">Tiến độ</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">Deadline</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="py-4 px-4">
                    <div>
                      <p className="font-medium text-gray-800 dark:text-white">{project.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {project.teamMembers} thành viên • {project.tasks.completed}/{project.tasks.total} tasks
                      </p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-gray-700 dark:text-gray-300">{project.role}</span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="w-32">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-600 dark:text-gray-400">{project.progress}%</span>
                      </div>
                      <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            project.progress >= 70 ? 'bg-green-500' : project.progress >= 40 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-gray-700 dark:text-gray-300">{project.deadline}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`badge ${getProjectStatusColor(project.status)}`}>
                      {getProjectStatusLabel(project.status)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Skill Improvements */}
      <div className="card">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Gợi ý Cải thiện Kỹ năng</h2>
        <div className="space-y-4">
          {skillImprovements.map((improvement, idx) => (
            <div key={idx} className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 border-l-4 border-primary-600 dark:border-primary-400 p-4 rounded-r-lg">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-12 h-12 bg-primary-600 dark:bg-primary-500 rounded-full flex items-center justify-center text-white font-bold">
                  {improvement.currentLevel}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800 dark:text-white mb-2">{improvement.skill}</h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{improvement.suggestion}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tips */}
      <div className="card bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 dark:border-green-400">
        <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-3">🌟 Mẹo phát triển Kỹ năng Mềm</h2>
        <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <li className="flex items-start">
            <span className="mr-2">✓</span>
            <span>Tham gia các buổi workshop và seminar để học hỏi kinh nghiệm từ người khác.</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">✓</span>
            <span>Đặt mục tiêu cụ thể cho từng kỹ năng và theo dõi tiến độ hàng tuần.</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">✓</span>
            <span>Thực hành thường xuyên qua các dự án thực tế và hoạt động nhóm.</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">✓</span>
            <span>Nhận phản hồi từ giảng viên và bạn bè để biết điểm cần cải thiện.</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Skills;

