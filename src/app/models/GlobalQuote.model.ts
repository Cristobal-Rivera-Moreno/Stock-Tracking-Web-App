export interface GlobalQuote{
  symbol             : string;
  open               : number;
  high               : number;
  low                : number;
  price              : number;
  volume             : number;
  latest_trading_day : Date  ;
  previous_close     : number;
  change             : number;
  change_percent     : string;
}


