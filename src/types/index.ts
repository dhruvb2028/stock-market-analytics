export interface Company {
  symbol: string;
  name: string;
  price: number;
  change: number;
  percentChange: number;
  marketCap: number;
  volume: number;
}

export interface IndexData {
  name: string;
  companies: Company[];
  lastUpdated: string;
}

export interface GainersLosersData {
  gainers: Company[];
  losers: Company[];
  lastUpdated: string;
}

export type TimeFrame = 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';

export interface NSEIndex {
  id: string;
  name: string;
}