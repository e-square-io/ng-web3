import { Result } from '@ethersproject/abi';
import { TransactionReceipt } from '@ethersproject/abstract-provider';

import { getTransactionResult, processResult } from '../utils';
import { EthersRequest } from './ethers-request';
import { EthersResponseResult } from './ethers-response-result';
import { TransactionResponse } from './transaction-response';

export class EthersResponse<T = EthersResponseResult> {
  readonly request: EthersRequest;
  readonly transactionResult?: Result[];
  readonly transactionResponse?: TransactionResponse;
  readonly transactionReceipt?: TransactionReceipt;

  get result(): T[] | undefined {
    return this.transactionResult?.length ? this.transactionResult.map(r => processResult<T>(r)) : undefined;
  }

  constructor(
    request: EthersRequest,
    transactionResult?: Result,
    transactionResponse?: TransactionResponse,
    transactionReceipt?: TransactionReceipt,
  ) {
    this.request = request;

    if (!Array.isArray(this.request.abi)) {
      throw new Error('Bad ABI');
    }

    this.transactionResponse = transactionResponse;
    this.transactionReceipt = transactionReceipt;

    if (transactionResult && request.requestMethod === 'READ') {
      this.transactionResult = [transactionResult];
    } else if (transactionResponse && transactionReceipt) {
      this.transactionResult = getTransactionResult(transactionReceipt, request.abi);
    }
  }
}
