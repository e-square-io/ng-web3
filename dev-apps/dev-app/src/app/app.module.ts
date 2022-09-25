import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { ethersClientProviders, ETHERS_INTERCEPTORS } from '@ng-web3/ethers';

import { AppComponent } from './app.component';
import { FirstInterceptor } from './first.interceptor';
import { InfoInterceptor } from './info.interceptor';

const routes: Routes = [
  {
    path: 'power',
    loadChildren: () => import('./power/power.module').then(m => m.PowerModule),
  },
  {
    path: 'number-nft',
    loadChildren: () => import('./number-nft/number-nft.module').then(m => m.NumberNftModule),
  },
  {
    path: 'transactions',
    loadChildren: () => import('./transactions/transactions.module').then(m => m.TransactionsModule),
  },
];

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' })],
  providers: [
    ethersClientProviders(),
    // { provide: ETHERS_INTERCEPTORS, useClass: FirstInterceptor, multi: true },
    { provide: ETHERS_INTERCEPTORS, useClass: InfoInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
