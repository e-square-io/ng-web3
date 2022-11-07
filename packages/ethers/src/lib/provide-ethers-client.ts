import { Provider } from '@angular/core';

import { EthersBackend, EthersHandler } from './entities/handler';
import { EthersBackendService } from './ethers-backend.service';
import { EthersClient } from './ethers-client.service';
import { EthersInterceptingHandler } from './ethers-intercepting-handler';
import { EthersProvider } from './ethers-provider.service';

export function provideEthersClient(): Provider[] {
  return [
    EthersProvider,
    EthersClient,
    { provide: EthersHandler, useClass: EthersInterceptingHandler },
    { provide: EthersBackend, useClass: EthersBackendService },
  ];
}
