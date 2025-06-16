import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { Company, TimeFrame } from '../types';

export const exportToExcel = (
  companies: Company[],
  indexName: string,
  timeFrame: TimeFrame
): void => {
  // Create worksheet from the company data
  const worksheet = XLSX.utils.json_to_sheet(
    companies.map(company => ({
      Symbol: company.symbol,
      Name: company.name,
      Price: company.price,
      'Change (₹)': company.change,
      'Change (%)': `${company.percentChange}%`,
      'Market Cap (Cr)': (company.marketCap / 10000000).toFixed(2), // Convert to Crores
      Volume: company.volume.toLocaleString()
    }))
  );

  // Set column widths for better readability
  const columnWidths = [
    { wch: 10 }, // Symbol
    { wch: 30 }, // Name
    { wch: 12 }, // Price
    { wch: 12 }, // Change (₹)
    { wch: 12 }, // Change (%)
    { wch: 15 }, // Market Cap
    { wch: 15 }  // Volume
  ];
  worksheet['!cols'] = columnWidths;

  // Create workbook and add the worksheet
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Top Companies');

  // Generate Excel file
  const currentDate = new Date().toISOString().split('T')[0];
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
  
  // Save the file
  saveAs(data, `${indexName}_Top5_${timeFrame}_${currentDate}.xlsx`);
};