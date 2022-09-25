import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionReceiptComponent } from './transaction-receipt.component';

describe('TransactionReceiptComponent', () => {
  let component: TransactionReceiptComponent;
  let fixture: ComponentFixture<TransactionReceiptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransactionReceiptComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TransactionReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
