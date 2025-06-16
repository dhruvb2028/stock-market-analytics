import React from 'react';
import { Info } from 'lucide-react';

interface InfoCardProps {
  lastUpdated: string;
  indexName: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ lastUpdated, indexName }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-100">
      <div className="flex items-start gap-3">
        <div className="p-2 bg-blue-50 rounded-full">
          <Info className="w-5 h-5 text-blue-700" />
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-900">Top 5 Companies - {indexName}</h3>
          <p className="text-sm text-gray-500">
            Last updated: {lastUpdated}
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Data shows top 5 companies by market capitalization. Select different time frames to see performance over time.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;