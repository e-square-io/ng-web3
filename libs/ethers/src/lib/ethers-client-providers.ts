import { Provider } from '@angular/core';

import { EthersBackend, EthersHandler } from './entities/handler';
import { EthersBackendService } from './ethers-backend.service';
import { EthersInterceptingHandler } from './ethers-intercepting-handler';

export function ethersClientProviders(): Provider[] {
  return [
    { provide: EthersHandler, useClass: EthersInterceptingHandler },
    { provide: EthersBackend, useClass: EthersBackendService },
  ];
}
