import React from 'react';
import { Download } from 'lucide-react';
import { exportToExcel } from '../utils/excelExport';
import { Company, TimeFrame } from '../types';

interface ExcelExportProps {
  companies: Company[];
  indexName: string;
  timeFrame: TimeFrame;
  disabled: boolean;
}

const ExcelExport: React.FC<ExcelExportProps> = ({
  companies,
  indexName,
  timeFrame,
  disabled
}) => {
  const handleExport = () => {
    if (disabled || companies.length === 0) return;
    exportToExcel(companies, indexName, timeFrame);
  };

  return (
    <button
      className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
        disabled
          ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
          : 'bg-green-600 text-white hover:bg-green-700 shadow-sm hover:shadow'
      }`}
      onClick={handleExport}
      disabled={disabled}
    >
      <Download className="w-4 h-4" />
      <span>Export to Excel</span>
    </button>
  );
};

export default ExcelExport;