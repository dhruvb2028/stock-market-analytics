import React from 'react';
import { Download } from 'lucide-react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { Company, TimeFrame } from '../types';

interface GainersLosersExportProps {
  gainers: Company[];
  losers: Company[];
  indexName: string;
  timeFrame: TimeFrame;
  disabled?: boolean;
}

const GainersLosersExport: React.FC<GainersLosersExportProps> = ({
  gainers,
  losers,
  indexName,
  timeFrame,
  disabled = false
}) => {
  const formatCurrency = (amount: number): number => {
    return parseFloat(amount.toFixed(2));
  };

  const formatMarketCap = (value: number): string => {
    if (value >= 10000000000) {
      return `${(value / 10000000000).toFixed(2)} Billion`;
    } else if (value >= 10000000) {
      return `${(value / 10000000).toFixed(2)} Million`;
    }
    return value.toString();
  };

  const getTimeFrameLabel = (tf: TimeFrame): string => {
    const labels = {
      'daily': 'Daily',
      'weekly': 'Weekly',
      'monthly': 'Monthly',
      'quarterly': 'Quarterly',
      'yearly': 'Yearly'
    };
    return labels[tf];
  };

  const handleExport = () => {
    if (gainers.length === 0 && losers.length === 0) {
      alert('No data available to export');
      return;
    }

    // Create workbook
    const workbook = XLSX.utils.book_new();

    // Header information
    const headerData = [
      ['Stock Market Analytics Dashboard'],
      [''],
      ['Index:', indexName],
      ['Timeframe:', getTimeFrameLabel(timeFrame)],
      ['Export Date:', new Date().toLocaleString()],
      [''],
    ];

    // Gainers data
    const gainersHeader = [
      ['TOP 5 GAINERS'],
      [''],
      ['Rank', 'Symbol', 'Company Name', 'Price (₹)', 'Change (₹)', 'Change (%)', 'Market Cap', 'Volume']
    ];

    const gainersData = gainers.map((company, index) => [
      index + 1,
      company.symbol,
      company.name,
      formatCurrency(company.price),
      formatCurrency(company.change),
      `${company.percentChange.toFixed(2)}%`,
      formatMarketCap(company.marketCap),
      company.volume.toLocaleString()
    ]);

    // Losers data
    const losersHeader = [
      [''],
      [''],
      ['TOP 5 LOSERS'],
      [''],
      ['Rank', 'Symbol', 'Company Name', 'Price (₹)', 'Change (₹)', 'Change (%)', 'Market Cap', 'Volume']
    ];

    const losersData = losers.map((company, index) => [
      index + 1,
      company.symbol,
      company.name,
      formatCurrency(company.price),
      formatCurrency(company.change),
      `${company.percentChange.toFixed(2)}%`,
      formatMarketCap(company.marketCap),
      company.volume.toLocaleString()
    ]);

    // Combine all data
    const allData = [
      ...headerData,
      ...gainersHeader,
      ...gainersData,
      ...losersHeader,
      ...losersData
    ];

    // Create worksheet
    const worksheet = XLSX.utils.aoa_to_sheet(allData);

    // Set column widths
    const columnWidths = [
      { wch: 6 },   // Rank
      { wch: 12 },  // Symbol
      { wch: 35 },  // Company Name
      { wch: 12 },  // Price
      { wch: 12 },  // Change
      { wch: 10 },  // Change %
      { wch: 15 },  // Market Cap
      { wch: 15 }   // Volume
    ];
    worksheet['!cols'] = columnWidths;

    // Style the header cells
    const headerStyle = {
      font: { bold: true, sz: 14 },
      fill: { fgColor: { rgb: "366092" } },
      alignment: { horizontal: "center" }
    };

    const subHeaderStyle = {
      font: { bold: true, sz: 12 },
      fill: { fgColor: { rgb: "D9E2F3" } },
      alignment: { horizontal: "center" }
    };

    // Apply styles to specific cells
    if (worksheet['A1']) worksheet['A1'].s = headerStyle;
    if (worksheet['A7']) worksheet['A7'].s = subHeaderStyle;
    if (worksheet['A9']) worksheet['A9'].s = subHeaderStyle;

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Market Movers');

    // Generate filename
    const timeFrameShort = timeFrame.charAt(0).toUpperCase() + timeFrame.slice(1);
    const fileName = `${indexName.replace(/\s+/g, '_')}_${timeFrameShort}_Market_Movers_${new Date().toISOString().split('T')[0]}.xlsx`;

    // Save file
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(data, fileName);
  };

  return (
    <button
      onClick={handleExport}
      disabled={disabled || (gainers.length === 0 && losers.length === 0)}
      className={`
        inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md
        ${disabled || (gainers.length === 0 && losers.length === 0)
          ? 'text-gray-400 bg-gray-100 cursor-not-allowed'
          : 'text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
        }
        transition-colors duration-200
      `}
      title={`Export ${indexName} ${getTimeFrameLabel(timeFrame)} market movers to Excel`}
    >
      <Download className="w-4 h-4 mr-2" />
      Export to Excel
    </button>
  );
};

export default GainersLosersExport;
