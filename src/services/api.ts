import { IndexData, NSEIndex, TimeFrame } from '../types';

// List of available NSE indices
export const getAvailableIndices = async (): Promise<NSEIndex[]> => {
  return [
    { id: 'nifty50', name: 'NIFTY 50' },
    { id: 'niftybank', name: 'NIFTY Bank' },
    { id: 'niftyit', name: 'NIFTY IT' },
    { id: 'niftypharma', name: 'NIFTY Pharma' },
    { id: 'niftyauto', name: 'NIFTY Auto' },
    { id: 'niftyfmcg', name: 'NIFTY FMCG' },
    { id: 'niftymetal', name: 'NIFTY Metal' },
    { id: 'niftyrealty', name: 'NIFTY Realty' }
  ];
};

// Function to get top companies - this now returns empty data since we focus on Gemini API
export const getTopCompanies = async (
  indexId: string,
  timeFrame: TimeFrame
): Promise<IndexData> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  const indexNames: Record<string, string> = {
    'nifty50': 'NIFTY 50',
    'niftybank': 'NIFTY Bank',
    'niftyit': 'NIFTY IT',
    'niftypharma': 'NIFTY Pharma',
    'niftyauto': 'NIFTY Auto',
    'niftyfmcg': 'NIFTY FMCG',
    'niftymetal': 'NIFTY Metal',
    'niftyrealty': 'NIFTY Realty'
  };

  return {
    name: indexNames[indexId] || indexId,
    companies: [], // Empty array - no mock data
    lastUpdated: new Date().toLocaleString()
  };
};