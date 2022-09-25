import { Injector } from '@angular/core';
import { Injectable } from '@angular/core';
import { BaseContract } from 'ethers';
import { Observable } from 'rxjs';

import { EthersHandler, EthersBackend, EthersRequest, EthersResponse } from './entities';
import { EthersInterceptorHandler, ETHERS_INTERCEPTORS } from './ethers-interceptor';

@Injectable()
export class EthersInterceptingHandler implements EthersHandler {
  private chain?: EthersHandler;

  constructor(private readonly ethersBackendService: EthersBackend, private readonly injector: Injector) {}

  handle(req: EthersRequest<BaseContract>): Observable<EthersResponse> {
    if (!this.chain) {
      const interceptors = this.injector.get(ETHERS_INTERCEPTORS, []);
      this.chain = interceptors.reduceRight(
        (next, interceptor) => new EthersInterceptorHandler(next, interceptor),
        this.ethersBackendService,
      );
    }

    return this.chain.handle(req);
  }
}
