import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

import { EthersHandler, EthersRequest, EthersResponse } from './entities';

export interface EthersInterceptor {
  intercept(req: EthersRequest, next: EthersHandler): Observable<EthersResponse>;
}

export class EthersInterceptorHandler implements EthersHandler {
  constructor(private readonly next: EthersHandler, private readonly interceptor: EthersInterceptor) {}

  handle(req: EthersRequest): Observable<EthersResponse> {
    return this.interceptor.intercept(req, this.next);
  }
}

export const ETHERS_INTERCEPTORS = new InjectionToken<EthersInterceptor[]>('ETHERS_INTERCEPTORS');
