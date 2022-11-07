import { Injectable } from '@angular/core';
import { Result } from '@ethersproject/abi';
import { TransactionReceipt } from '@ethersproject/abstract-provider';
import { TransactionResponse } from '@ethersproject/providers';
import { CallOverrides, Contract } from 'ethers';
import { catchError, EMPTY, from, map, merge, Observable, of, switchMap, throwError } from 'rxjs';

import { ArgumentType, EthersRequest, EthersResponse } from './entities';
import { EthersBackend } from './entities/handler';
import { EthersProvider } from './ethers-provider.service';
import { getErrorResponse } from './utils';

type ReadableContractMethod = (...args: ArgumentType[]) => Promise<Result>;
type WriteableContractMethod = (...args: (ArgumentType | CallOverrides)[]) => Promise<TransactionResponse>;

@Injectable()
export class EthersBackendService implements EthersBackend {
  constructor(private readonly ethersProvider: EthersProvider) {}

  handle(req: EthersRequest): Observable<EthersResponse> {
    const signer = this.ethersProvider.provider?.getSigner();
    if (!signer) {
      throw new Error('Not signed in.');
    }

    const contract = new Contract(req.contractAddress, req.abi, signer);
    let contractMethod: ReadableContractMethod | WriteableContractMethod;
    let res$: Observable<EthersResponse>;

    if (req.requestMethod === 'READ') {
      contractMethod = contract[req.methodName] as unknown as ReadableContractMethod;

      res$ = from(contractMethod(...req.inputs)).pipe(
        catchError(err => throwError(() => getErrorResponse(err, req.abi))),
        map(res => new EthersResponse(req, res)),
      );
    } else {
      let txResponse: TransactionResponse;

      contractMethod = contract[req.methodName] as unknown as WriteableContractMethod;

      res$ = from(contractMethod(...req.inputs, req.overrides)).pipe(
        catchError(err => throwError(() => getErrorResponse(err, req.abi))),
        switchMap(tx => {
          txResponse = tx;

          return merge(
            of(tx),
            this.ethersProvider.provider ? from(this.ethersProvider.getTransactionReceipt(tx.hash)) : EMPTY,
          );
        }),
        map((tx, index) =>
          index === 1
            ? new EthersResponse(req, undefined, txResponse, tx as TransactionReceipt)
            : new EthersResponse(req, undefined, tx as TransactionResponse),
        ),
      );
    }

    return res$;
  }
}
