import { ArgumentType, EthersHandler, EthersInterceptor, EthersRequest, EthersResponse } from '@ng-web3/ethers';
import { BaseContract } from 'ethers';
import { Observable } from 'rxjs';

export class FirstInterceptor implements EthersInterceptor {
  intercept(
    req: EthersRequest<BaseContract>,
    next: EthersHandler,
  ): Observable<EthersResponse<ArgumentType[] | Record<string, ArgumentType | ArgumentType[]>>> {
    console.log('FirstInterceptor', req);
    return next.handle(req);
  }
}
