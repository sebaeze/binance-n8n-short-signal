export interface SymbolInfo {
  symbol: string;
  priceChangePercent: string;
}

export interface ExchangeInfo {
  symbols: Array<{
    symbol: string;
    contractType: string;
    status: string;
  }>;
}