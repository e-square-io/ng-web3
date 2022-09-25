import { Injectable } from '@angular/core';
import { ErrorResponse, EthersHandler, EthersInterceptor, EthersRequest, EthersResponse } from '@ng-web3/ethers';
import { BaseContract } from 'ethers';
import { catchError, EMPTY, Observable, tap } from 'rxjs';

import { InfoService } from './info.service';

@Injectable({ providedIn: 'root' })
export class InfoInterceptor implements EthersInterceptor {
  constructor(private readonly infoService: InfoService) {}
  intercept(req: EthersRequest<BaseContract>, next: EthersHandler): Observable<EthersResponse> {
    this.infoService.error(null);
    let result: Observable<EthersResponse>;

    if (req.requestMethod === 'READ') {
      this.infoService.update('Reading...');
      result = next.handle(req).pipe(tap(() => this.infoService.update('Done.', 1000)));
    } else {
      result = next.handle(req).pipe(
        tap(res => {
          if (!res.transactionReceipt) {
            this.infoService.update(
              `Transaction #${res.transactionResponse?.hash} created. Waiting for confirmation...`,
            );
            return;
          }

          this.infoService.update(`Transaction #${res.transactionResponse?.hash} confirmed.`, 3000);
        }),
      );
    }

    return result.pipe(
      catchError((err: ErrorResponse) => {
        console.log(err);
        this.infoService.error(err);
        this.infoService.update(null);
        return EMPTY;
      }),
    );
  }
}
