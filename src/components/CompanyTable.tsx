import React from 'react';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { Company } from '../types';

interface CompanyTableProps {
  companies: Company[];
  isLoading: boolean;
}

const CompanyTable: React.FC<CompanyTableProps> = ({ companies, isLoading }) => {
  if (isLoading) {
    return <TableSkeleton />;
  }

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full divide-y divide-gray-200 shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Symbol
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Company
            </th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Price (₹)
            </th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Change
            </th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Market Cap (Cr)
            </th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Volume
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {companies.map((company) => (
            <tr key={company.symbol} className="hover:bg-gray-50 transition-colors duration-150">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="font-medium text-gray-900">{company.symbol}</div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-gray-900">{company.name}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right">
                <div className="text-sm font-medium text-gray-900">
                  {company.price.toLocaleString('en-IN', { 
                    style: 'currency', 
                    currency: 'INR',
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2
                  })}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right">
                <div className={`text-sm flex items-center justify-end gap-1 ${
                  company.change > 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {company.change > 0 ? (
                    <ArrowUp className="w-4 h-4" />
                  ) : (
                    <ArrowDown className="w-4 h-4" />
                  )}
                  {Math.abs(company.change).toFixed(2)} ({company.percentChange.toFixed(2)}%)
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right">
                <div className="text-sm text-gray-900">
                  {(company.marketCap / 10000000).toFixed(2)}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right">
                <div className="text-sm text-gray-900">{company.volume.toLocaleString()}</div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Loading skeleton component for the table
const TableSkeleton: React.FC = () => {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full divide-y divide-gray-200 shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Symbol
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Company
            </th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Price (₹)
            </th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Change
            </th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Market Cap (Cr)
            </th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Volume
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {Array.from({ length: 5 }).map((_, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="h-5 bg-gray-200 rounded animate-pulse w-16"></div>
              </td>
              <td className="px-6 py-4">
                <div className="h-5 bg-gray-200 rounded animate-pulse w-40"></div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right">
                <div className="h-5 bg-gray-200 rounded animate-pulse w-20 ml-auto"></div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right">
                <div className="h-5 bg-gray-200 rounded animate-pulse w-24 ml-auto"></div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right">
                <div className="h-5 bg-gray-200 rounded animate-pulse w-16 ml-auto"></div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right">
                <div className="h-5 bg-gray-200 rounded animate-pulse w-20 ml-auto"></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompanyTable;