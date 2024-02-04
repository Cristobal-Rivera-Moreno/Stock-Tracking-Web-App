import { Component, Inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AlphaRestApiService } from './services/alpha-rest-api.service';
import { GlobalQuote } from './models/GlobalQuote.model';
import { forkJoin } from 'rxjs';
import { CommonModule } from '@angular/common';
import {MatDialog} from '@angular/material/dialog';
import { NewStockSymbolComponent } from './modals/new-stock-symbol/new-stock-symbol.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'StockTrackingWebApp';
  stock : GlobalQuote[] = []

  constructor(private restApi:AlphaRestApiService,private dialog:MatDialog){

  }

  ngAfterViewInit():void{
      this.retrieveData();
  }

  retrieveData():void{
    let symbolList:string[] = JSON.parse(localStorage.getItem('stock') ?? "[]")
    let requestList = symbolList.map( (symbol,index) => this.restApi.getOneSymbol((index+1).toString()))
    forkJoin(requestList)
    .subscribe({
      next:(res:GlobalQuote[])=>{
        this.stock = res
      },
      error:err=>console.error(err),
      complete:()=>{}
    })
  }

  openModalNewStock():void{
    let dialogRef = this.dialog.open(NewStockSymbolComponent)
    dialogRef.afterClosed().subscribe((response:string)=>{
      if(response){
        let index = this.stock.findIndex( p => p.symbol === response)
        if( index === -1 )
          this.addNewStockSymbol(response)
      }
    })
  }

  addNewStockSymbol(symbol:string):void{
    this.restApi.getOneSymbol(symbol).subscribe({
      next : (res)=>{
        let index = this.stock.findIndex( p => p.symbol === res.symbol)
        if( index === -1 ){
          this.stock.push(res)
          localStorage.setItem("stock",JSON.stringify(this.stock.map(item => item.symbol)))
        }
      },
      error:err=>console.error(err),
      complete:()=>{}
    })
  }

}
