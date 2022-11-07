import { Routes } from '@angular/router';

export const ROUTES: Routes = [
  {
    path: 'power',
    loadChildren: () => import('./power/power.routes').then(r => r.POWER_ROUTES),
  },
  {
    path: 'number-nft',
    loadChildren: () => import('./number-nft/number-nft.routes').then(r => r.NUMBER_NFT_ROUTES),
  },
  {
    path: 'transactions',
    loadChildren: () => import('./transactions/transactions.routes').then(r => r.TRANSACTIONS_ROUTES),
  },
];
