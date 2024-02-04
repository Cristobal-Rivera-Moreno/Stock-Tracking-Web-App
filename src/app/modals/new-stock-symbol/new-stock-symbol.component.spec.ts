import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewStockSymbolComponent } from './new-stock-symbol.component';

describe('NewStockSymbolComponent', () => {
  let component: NewStockSymbolComponent;
  let fixture: ComponentFixture<NewStockSymbolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewStockSymbolComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewStockSymbolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
