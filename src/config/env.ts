import dotenv from 'dotenv';

dotenv.config();

export const config = {
  binance: {
    apiKey: process.env.BINANCE_API_KEY || '',
    apiSecret: process.env.BINANCE_API_SECRET || '',
    baseUrl: process.env.BINANCE_FUTURES_URL || 'https://fapi.binance.com',
  },
};