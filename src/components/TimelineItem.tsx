import React from 'react';

interface TimelineItemProps {
  company: string;
  role: string;
  date: string;
  description: string;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ company, role, date, description }) => {
  return (
    <div className="relative pl-8 border-l-2 border-gray-200 dark:border-gray-700">
      <div className="absolute left-[-8px] top-2 w-4 h-4 bg-blue-500 rounded-full" />
      <div className="mb-2">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{company}</h3>
        <p className="text-blue-500 font-medium">{role}</p>
        <span className="text-sm text-gray-500 dark:text-gray-400">{date}</span>
      </div>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
};

export default TimelineItem;