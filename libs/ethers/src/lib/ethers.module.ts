import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { EthersBackend, EthersHandler } from './entities';
import { EthersBackendService } from './ethers-backend.service';
import { EthersInterceptingHandler } from './ethers-intercepting-handler';

@NgModule({
  imports: [CommonModule],
  providers: [
    { provide: EthersHandler, useClass: EthersInterceptingHandler },
    { provide: EthersBackend, useClass: EthersBackendService },
  ],
})
export class EthersModule {}
