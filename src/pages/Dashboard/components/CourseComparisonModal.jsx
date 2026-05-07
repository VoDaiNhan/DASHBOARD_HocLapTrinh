import React from 'react';
import { X, TrendingUp, TrendingDown, Award, AlertCircle } from 'lucide-react';

const CourseComparisonModal = ({ show, onClose, currentCourse, top1Course, currentData, top1Data }) => {
  if (!show) return null;

  const gap = currentData.completion - top1Data.completion;
  const midtermGap = currentData.midtermAvg - top1Data.midtermAvg;
  const failRateGap = currentData.failRate - top1Data.failRate;
  const absenceGap = currentData.absenceRate - top1Data.absenceRate;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-75" onClick={onClose} />

        <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-5xl sm:w-full">
          {/* Header */}
      