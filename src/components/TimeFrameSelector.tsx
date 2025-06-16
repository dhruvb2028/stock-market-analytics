import React from 'react';
import { TimeFrame } from '../types';

interface TimeFrameSelectorProps {
  selectedTimeFrame: TimeFrame;
  onSelectTimeFrame: (timeFrame: TimeFrame) => void;
}

const timeFrames: { value: TimeFrame; label: string }[] = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'quarterly', label: 'Quarterly' },
  { value: 'yearly', label: 'Yearly' }
];

const TimeFrameSelector: React.FC<TimeFrameSelectorProps> = ({
  selectedTimeFrame,
  onSelectTimeFrame
}) => {
  return (
    <div className="flex flex-wrap gap-2">
      {timeFrames.map(({ value, label }) => (
        <button
          key={value}
          className={`px-4 py-2 rounded-md font-medium transition-all duration-300 ${
            selectedTimeFrame === value
              ? 'bg-indigo-600 text-white shadow-md'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
          }`}
          onClick={() => onSelectTimeFrame(value)}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default TimeFrameSelector;