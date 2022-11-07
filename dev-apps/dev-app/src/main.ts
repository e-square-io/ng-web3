import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { provideEthersClient } from '@ng-web3/ethers';

import { AppComponent } from './app/app.component';
import { ROUTES } from './app/routes';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideEthersClient(),
    importProvidersFrom(RouterModule.forRoot(ROUTES, { initialNavigation: 'enabledBlocking' })),
  ],
}).catch(err => console.error(err));
