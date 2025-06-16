import React, { useEffect, useState } from 'react';
import { getAvailableIndices, getTopCompanies } from './services/api';
import { getGainersAndLosers } from './services/gemini';
import { IndexData, NSEIndex, TimeFrame, GainersLosersData } from './types';
import Header from './components/Header';
import IndexSelector from './components/IndexSelector';
import TimeFrameSelector from './components/TimeFrameSelector';
import CompanyTable from './components/CompanyTable';
import GainersLosersTable from './components/GainersLosersTable';
import ExcelExport from './components/ExcelExport';
import InfoCard from './components/InfoCard';

function App() {
  const [indices, setIndices] = useState<NSEIndex[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<NSEIndex>({ id: '', name: '' });
  const [timeFrame, setTimeFrame] = useState<TimeFrame>('daily');
  const [data, setData] = useState<IndexData | null>(null);
  const [gainersLosersData, setGainersLosersData] = useState<GainersLosersData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingGainersLosers, setIsLoadingGainersLosers] = useState(true);
  const [gainersLosersError, setGainersLosersError] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetch available indices
  useEffect(() => {
    const fetchIndices = async () => {
      try {
        const availableIndices = await getAvailableIndices();
        setIndices(availableIndices);
        if (availableIndices.length > 0) {
          setSelectedIndex(availableIndices[0]);
        }
      } catch (err) {
        setError('Failed to fetch indices. Please try again later.');
        console.error('Error fetching indices:', err);
      }
    };

    fetchIndices();
  }, []);

  // Fetch data when index or timeframe changes
  useEffect(() => {
    if (!selectedIndex.id) return;
    
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const indexData = await getTopCompanies(selectedIndex.id, timeFrame);
        setData(indexData);
      } catch (err) {
        setError('Failed to fetch company data. Please try again later.');
        console.error('Error fetching companies:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [selectedIndex, timeFrame]);

  // Fetch gainers and losers data when index or timeframe changes
  useEffect(() => {
    if (!selectedIndex.name) return;
    
    const fetchGainersLosers = async () => {
      setIsLoadingGainersLosers(true);
      setGainersLosersError(null);
      
      try {
        const gainersLosersData = await getGainersAndLosers(selectedIndex.name, timeFrame);
        setGainersLosersData(gainersLosersData);
      } catch (err) {
        console.error('Error fetching gainers/losers:', err);
        setGainersLosersError('Failed to fetch market movers data from Gemini API. Please try again later.');
        setGainersLosersData(null);
      } finally {
        setIsLoadingGainersLosers(false);
      }
    };

    fetchGainersLosers();
  }, [selectedIndex, timeFrame]);

  const handleIndexChange = (index: NSEIndex) => {
    setSelectedIndex(index);
  };

  const handleTimeFrameChange = (newTimeFrame: TimeFrame) => {
    setTimeFrame(newTimeFrame);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {error ? (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 my-6 rounded shadow-sm">
            <p className="text-red-700">{error}</p>
            <button
              className="mt-2 text-sm text-red-600 underline hover:text-red-800"
              onClick={() => window.location.reload()}
            >
              Refresh page
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-4">
                <h2 className="text-lg font-medium text-gray-700">Select NSE Index</h2>
                <IndexSelector 
                  indices={indices}
                  selectedIndex={selectedIndex}
                  onSelectIndex={handleIndexChange}
                />
              </div>
              
              <div className="space-y-4">
                <h2 className="text-lg font-medium text-gray-700">Select Time Frame</h2>
                <TimeFrameSelector 
                  selectedTimeFrame={timeFrame}
                  onSelectTimeFrame={handleTimeFrameChange}
                />
              </div>
            </div>
            
            {data && data.companies.length > 0 && (
              <div className="mb-6">
                <InfoCard 
                  lastUpdated={data.lastUpdated}
                  indexName={data.name}
                />
              </div>
            )}
            
            {data && data.companies.length > 0 && (
              <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">Top 5 Companies</h2>
                  <ExcelExport 
                    companies={data?.companies || []}
                    indexName={data?.name || ''}
                    timeFrame={timeFrame}
                    disabled={isLoading || !data}
                  />
                </div>
                
                <CompanyTable 
                  companies={data?.companies || []}
                  isLoading={isLoading}
                />
              </div>
            )}

            {/* Gainers and Losers Section */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  Market Movers - {selectedIndex.name} ({timeFrame.charAt(0).toUpperCase() + timeFrame.slice(1)})
                </h2>
                <p className="text-sm text-gray-500">
                  {gainersLosersData?.lastUpdated && `Last updated: ${gainersLosersData.lastUpdated}`}
                </p>
              </div>
              
              {gainersLosersError ? (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded shadow-sm">
                  <p className="text-red-700">{gainersLosersError}</p>
                  <button
                    className="mt-2 text-sm text-red-600 underline hover:text-red-800"
                    onClick={() => window.location.reload()}
                  >
                    Retry
                  </button>
                </div>
              ) : (
                <GainersLosersTable 
                  gainers={gainersLosersData?.gainers || []}
                  losers={gainersLosersData?.losers || []}
                  isLoading={isLoadingGainersLosers}
                  timeFrame={timeFrame}
                />
              )}
            </div>
          </>
        )}
      </main>
      
      <footer className="bg-gray-800 text-gray-300 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm">
              © {new Date().getFullYear()} NSE Top Companies Dashboard
            </p>
            <p className="text-xs text-gray-400 mt-2 md:mt-0">
              Disclaimer: The data shown is for demonstration purposes only.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;