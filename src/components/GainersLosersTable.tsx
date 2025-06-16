import React from 'react';
import { Company, TimeFrame } from '../types';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface GainersLosersTableProps {
  gainers: Company[];
  losers: Company[];
  isLoading: boolean;
  timeFrame?: TimeFrame;
}

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
};



const formatPercentage = (value: number): string => {
  return `${value > 0 ? '+' : ''}${value.toFixed(2)}%`;
};

const GainersLosersTable: React.FC<GainersLosersTableProps> = ({ gainers, losers, isLoading, timeFrame }) => {
  const getTimeFrameLabel = (tf: TimeFrame = 'daily') => {
    const labels = {
      'daily': 'Today',
      'weekly': 'This Week', 
      'monthly': 'This Month',
      'quarterly': 'This Quarter',
      'yearly': 'This Year'
    };
    return labels[tf];
  };
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">          <div className="p-6">
            <div className="flex items-center mb-4">
              <TrendingUp className="w-5 h-5 text-green-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-800">Top 5 Gainers</h3>
              {timeFrame && (
                <span className="ml-2 text-sm text-gray-500">({getTimeFrameLabel(timeFrame)})</span>
              )}
            </div>
            <div className="animate-pulse">
              {[...Array(5)].map((_, index) => (
                <div key={index} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0">
                  <div>
                    <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-32"></div>
                  </div>
                  <div className="text-right">
                    <div className="h-4 bg-gray-200 rounded w-16 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-12"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">          <div className="p-6">
            <div className="flex items-center mb-4">
              <TrendingDown className="w-5 h-5 text-red-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-800">Top 5 Losers</h3>
              {timeFrame && (
                <span className="ml-2 text-sm text-gray-500">({getTimeFrameLabel(timeFrame)})</span>
              )}
            </div>
            <div className="animate-pulse">
              {[...Array(5)].map((_, index) => (
                <div key={index} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0">
                  <div>
                    <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-32"></div>
                  </div>
                  <div className="text-right">
                    <div className="h-4 bg-gray-200 rounded w-16 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-12"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">      {/* Gainers Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex items-center mb-4">
            <TrendingUp className="w-5 h-5 text-green-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-800">Top 5 Gainers</h3>
            {timeFrame && (
              <span className="ml-2 text-sm text-gray-500">({getTimeFrameLabel(timeFrame)})</span>
            )}
          </div>
          <div className="space-y-3">
            {gainers.map((company, index) => (
              <div key={company.symbol} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0">
                <div className="flex-1">
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-500 mr-2">#{index + 1}</span>
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">{company.symbol}</p>
                      <p className="text-xs text-gray-600 truncate max-w-xs">{company.name}</p>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-800 text-sm">{formatCurrency(company.price)}</p>
                  <div className="flex items-center justify-end">
                    <span className="text-green-600 text-xs font-medium">
                      +{formatCurrency(company.change)}
                    </span>
                    <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                      {formatPercentage(company.percentChange)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>      {/* Losers Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex items-center mb-4">
            <TrendingDown className="w-5 h-5 text-red-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-800">Top 5 Losers</h3>
            {timeFrame && (
              <span className="ml-2 text-sm text-gray-500">({getTimeFrameLabel(timeFrame)})</span>
            )}
          </div>
          <div className="space-y-3">
            {losers.map((company, index) => (
              <div key={company.symbol} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0">
                <div className="flex-1">
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-500 mr-2">#{index + 1}</span>
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">{company.symbol}</p>
                      <p className="text-xs text-gray-600 truncate max-w-xs">{company.name}</p>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-800 text-sm">{formatCurrency(company.price)}</p>
                  <div className="flex items-center justify-end">
                    <span className="text-red-600 text-xs font-medium">
                      {formatCurrency(company.change)}
                    </span>
                    <span className="ml-2 bg-red-100 text-red-800 text-xs px-2 py-1 rounded">
                      {formatPercentage(company.percentChange)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GainersLosersTable;
