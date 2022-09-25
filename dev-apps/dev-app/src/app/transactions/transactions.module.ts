import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { HashInputComponent } from './hash-input/hash-input.component';
import { TransactionReceiptComponent } from './transaction-receipt/transaction-receipt.component';
import { TransactionResponseComponent } from './transaction-response/transaction-response.component';

const routes: Routes = [
  { path: 'transaction-response', component: TransactionResponseComponent },
  { path: 'transaction-receipt', component: TransactionReceiptComponent },
];

@NgModule({
  declarations: [TransactionResponseComponent, TransactionReceiptComponent, HashInputComponent],
  imports: [CommonModule, ReactiveFormsModule, RouterModule.forChild(routes)],
})
export class TransactionsModule {}
