import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, retry, throwError } from 'rxjs';
import { GlobalQuote } from '../models/GlobalQuote.model';
@Injectable({
  providedIn: 'root'
})
export class AlphaRestApiService {
  apiUrl : string;
  constructor(private httpClient:HttpClient) {
     this.apiUrl = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&apikey=VJ856XHXT0I8GR7N&symbol=";
  }

  getOneSymbol(symbol:string):Observable<GlobalQuote>{
    return this.httpClient.get(`${this.apiUrl}${symbol}`)
    .pipe(map((res:any)=>{
      if(res['Information']){
        alert(`${symbol} Symbol Request. ${res['Information']}`);
        return {symbol:symbol} as GlobalQuote;
      }
      res = res["Global Quote"]
      if(Object.keys(res).length>0)
        return {
          symbol             : res["01. symbol"],
          open               : res["02. open"],
          high               : res["03. high"],
          low                : res["04. low"],
          price              : res["05. price"],
          volume             : res["06. volume"],
          latest_trading_day : res["07. latest trading day"],
          previous_close     : res["08. previous close"],
          change             : res["09. change"],
          change_percent     : res["10. change percent"]
        } as GlobalQuote
      else
        return {} as GlobalQuote
    }))
    .pipe(retry(1),catchError(this.handleError));

  }

  private handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }

}
