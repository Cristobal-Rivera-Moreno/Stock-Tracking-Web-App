import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-new-stock-symbol',
  standalone: true,
  imports: [],
  templateUrl: './new-stock-symbol.component.html',
  styleUrl: './new-stock-symbol.component.css'
})
export class NewStockSymbolComponent {

  constructor(private dialogRef : MatDialogRef<NewStockSymbolComponent>){

  }
  closeCurrentModal(symbol:string):void{
    this.dialogRef.close(symbol.trim());
  }
}
