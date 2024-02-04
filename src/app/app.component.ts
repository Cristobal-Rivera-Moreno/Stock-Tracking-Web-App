import { Component, Inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AlphaRestApiService } from './services/alpha-rest-api.service';
import { GlobalQuote } from './models/GlobalQuote.model';
import { forkJoin } from 'rxjs';
import { CommonModule } from '@angular/common';
import {MatDialog} from '@angular/material/dialog';
import { NewStockSymbolComponent } from './modals/new-stock-symbol/new-stock-symbol.component';
import { LoaderComponent } from './modals/loader/loader.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  stock : GlobalQuote[] = [];

  constructor(private restApi:AlphaRestApiService,private dialog:MatDialog){
    this.retrieveData();
  }


  retrieveData():void{
    let loaderRef = this.dialog.open(LoaderComponent);
    let symbolList:string[] = JSON.parse(localStorage.getItem('stock') ?? "[]");
    let requestList = symbolList.map( (symbol,index) => this.restApi.getOneSymbol(symbol));
    forkJoin(requestList)
    .subscribe({
      next:(res:GlobalQuote[])=>{
        //res = res.map(element=>Object.keys(res[0]).length === 1?{symbol:`${res.}`})
        res = res.filter(element => Object.keys(element).length!=0)
        this.stock = res;
      },
      error:err=>console.error(err),
      complete:()=>{loaderRef.close()}
    });
  }

  openModalNewStock():void{
    let dialogRef = this.dialog.open(NewStockSymbolComponent);
    dialogRef.afterClosed().subscribe((response:string)=>{
      if(response){
        let index = this.stock.findIndex( p => p.symbol.toUpperCase() === response.toUpperCase());
        if( index === -1 )
          this.addNewStockSymbol(response);
      }
    });
  }

  addNewStockSymbol(symbol:string):void{
    let loaderRef = this.dialog.open(LoaderComponent);
    this.restApi.getOneSymbol(symbol).subscribe({
      next : (res:GlobalQuote)=>{
        console.log(Object.keys(res))
        if( Object.keys(res).length === 0 )
          alert("The entered symbol does not exist.");
        if(Object.keys(res).length === 1 || Object.keys(res).length === 0)
          return;

        this.stock.push(res);
        localStorage.setItem("stock",JSON.stringify(this.stock.map(item => item.symbol)));

      },
      error:err=>console.error(err),
      complete:()=>{loaderRef.close()}
    })
  }

}
