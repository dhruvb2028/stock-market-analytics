import { GoogleGenerativeAI } from '@google/generative-ai';
import { Company, TimeFrame } from '../types';

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY || 'AIzaSyDMySFteTwbRBcbjt5pl46BH5g5AGLBMF8';

export interface GainersLosersData {
  gainers: Company[];
  losers: Company[];
  lastUpdated: string;
}

export const getGainersAndLosers = async (indexName: string, timeFrame: TimeFrame): Promise<GainersLosersData> => {
  try {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const timeFrameDescription = {
      'daily': 'today',
      'weekly': 'this week',
      'monthly': 'this month', 
      'quarterly': 'this quarter',
      'yearly': 'this year'
    };

    const prompt = `Return only a JSON object with top 5 gainers and top 5 losers for ${indexName} index for ${timeFrameDescription[timeFrame]}:
    
    {
      "gainers": [{"symbol": "RELIANCE", "name": "Reliance Industries Ltd.", "price": 2890.75, "change": 45.30, "percentChange": 1.59, "marketCap": 1956000000000, "volume": 8765432}],
      "losers": [{"symbol": "TCS", "name": "Tata Consultancy Services Ltd.", "price": 3678.25, "change": -12.45, "percentChange": -0.34, "marketCap": 1350000000000, "volume": 3452100}]
    }`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Invalid response format');
    }

    const data = JSON.parse(jsonMatch[0]);
    
    if (!data.gainers || !data.losers) {
      throw new Error('Missing gainers or losers data');
    }

    return {
      gainers: data.gainers.slice(0, 5),
      losers: data.losers.slice(0, 5),
      lastUpdated: new Date().toLocaleString()
    };

  } catch (error) {
    console.error('Gemini API Error:', error);
    throw new Error('Failed to fetch market data');
  }
};
