import { BinanceService } from './services/binanceService';
import { logger } from './utils/logger';

async function main() {
  try {
    const binanceService = new BinanceService();

    // Get all USD-M futures symbols
    const symbols = await binanceService.getUSDMFuturesSymbols();
    logger.info('Available USD-M Futures Symbols:', symbols);

    // Get 24h price change for the symbols
    const priceChanges = await binanceService.get24hPriceChange(symbols);
    
    // Display results
    console.log('\nUSD-M Futures Symbols with 24h Price Change:');
    priceChanges.forEach(({ symbol, priceChangePercent }) => {
      console.log(`${symbol}: ${priceChangePercent}%`);
    });

  } catch (error) {
    logger.error('Application error:', error);
    process.exit(1);
  }
}

main();