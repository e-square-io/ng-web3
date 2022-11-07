import { Routes } from '@angular/router';

import { TransactionReceiptComponent } from './transaction-receipt/transaction-receipt.component';
import { TransactionResponseComponent } from './transaction-response/transaction-response.component';

export const TRANSACTIONS_ROUTES: Routes = [
  { path: 'transaction-response', component: TransactionResponseComponent },
  { path: 'transaction-receipt', component: TransactionReceiptComponent },
];
