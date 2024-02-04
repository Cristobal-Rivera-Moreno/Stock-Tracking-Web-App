export interface GlobalQuote{
  symbol             : string
  open               : number
  high               : number
  low                : number
  price              : number
  volume             : number
  latest_trading_day : Date
  previous_close     : number
  change             : number
  change_percent     : string
}
// export interface GlobalQuote{
//   "Global Quote":{
//     "01. symbol"             : string
//     "02. open"               : number
//     "03. high"               : number
//     "04. low"                : number
//     "05. price"              : number
//     "06. volume"             : number
//     "07. latest trading day" : Date
//     "08. previous close"     : number
//     "09. change"             : number
//     "10. change percent"     : string
//   }
// }

