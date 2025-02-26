import React from 'react';
import TimelineItem from './TimelineItem';

const Timeline: React.FC = () => {
  return (
    <div className="bg-navy-800 p-8 rounded-lg mt-8">
      <h2 className="text-2xl font-bold mb-6">Professional Journey</h2>
      <div className="space-y-4">
        <TimelineItem 
          company="Greystar"
          role="Leasing Executive"
          date="2023 - Present"
          description="Leading residential property management..."
        />
        <TimelineItem 
          company="RE/MAX"
          role="Sales Manager"
          date="2022 - 2023"
          description="Managed sales team and strategies..."
        />
        {/* Add more timeline items */}
      </div>
    </div>
  );
};

export default Timeline;