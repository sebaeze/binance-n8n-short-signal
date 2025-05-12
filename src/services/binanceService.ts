import { DerivativesTradingUsdsFutures } from '@binance/derivatives-trading-usds-futures';
import { ExchangeInformationResponse } from '@binance/derivatives-trading-usds-futures/dist/index.mjs';
import { config } from '../config/env';
import { SymbolInfo, ExchangeInfo } from '../interfaces/binance';
import { logger } from '../utils/logger';

export class BinanceService {
  private client: DerivativesTradingUsdsFutures;

  constructor() {
    this.client = new DerivativesTradingUsdsFutures({
        configurationRestAPI:{
            apiKey: config.binance.apiKey,
            apiSecret: config.binance.apiSecret,
            //baseUrl: config.binance.baseUrl,
        },
    });
  }

  async getUSDMFuturesSymbols(): Promise<string[]> {
    try {
      const exchangeInfo = await this.client.restAPI.exchangeInformation() ;
      const data = await exchangeInfo.data();
      console.log("....exchangeInfo::exchangeFilters: ",data.exchangeFilters,
        " assets: ",data.assets,
        ";") ;
    
      if ( data.symbols!=undefined ){
        for ( let pos=0; pos<3; pos++ ){
            console.log("...pos: ",pos," symbol: ",data.symbols[pos],";");
        }
        console.log("..ALPACAUSDT:: ",data.symbols.find((a)=>a.symbol==="ALPACAUSDT"),";");
      }
      const symbols:string[] = [] ;
      /*
      const symbols = exchangeInfo.symbols
        .filter(symbol => 
          symbol.contractType === 'PERPETUAL' && 
          symbol.status === 'TRADING'
        )
        .map(symbol => symbol.symbol);
      */
      logger.info(`Retrieved ${symbols.length} USD-M futures symbols`);
      return symbols;
    } catch (error) {
      logger.error('Error fetching USD-M futures symbols:', error);
      throw new Error('Failed to retrieve USD-M futures symbols');
    }
  }

  async get24hPriceChange(symbols: string[]): Promise<SymbolInfo[]> {
    try {
      const tickerData = await this.client.restAPI.ticker24hrPriceChangeStatistics();
      
      let data2 = await tickerData.data();
      if ( data2!=undefined ){
        if ( Array.isArray(data2) ){
            data2 = data2.sort((a,b)=> (parseInt(String(b.priceChangePercent))-parseInt(String(a.priceChangePercent))) );
            for ( let pos=0; pos<3; pos++ ){
                console.log("...pos: ",pos," symbol: ",data2[pos],";");
            }
            // MOODENGUSDT
            const data3 = data2.filter((a)=>a.symbol==="MOODENGUSDT");
            console.log("...data3: ",data3,";");
        }
      }
      console.log("...data:: ",Object.keys(data2),";") ;
      const result:SymbolInfo[] = [] ;
      /*
      const result = tickerData
        .filter((ticker: any) => symbols.includes(ticker.symbol))
        .map((ticker: any) => ({
          symbol: ticker.symbol,
          priceChangePercent: ticker.priceChangePercent,
        }));
      */
      logger.info(`Retrieved 24h price change for ${result.length} symbols`);
      return result;
    } catch (error) {
      logger.error('Error fetching 24h price change:', error);
      throw new Error('Failed to retrieve 24h price change data');
    }
  }
}