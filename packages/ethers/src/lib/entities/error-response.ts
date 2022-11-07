import { Result } from '@ethersproject/abi';
import { TransactionRequest } from '@ethersproject/providers';

import { EthereumErrorCode } from './ethereum-error-codes';
import { ProviderRpcError } from './provider-rpc-error';

export interface ErrorResponse {
  reason: string;
  code: EthereumErrorCode;
  method?: string;
  data: string;
  errorArgs?: unknown[];
  errorName?: string;
  errorSignature?: string;
  address?: string;
  transaction: TransactionRequest;
  error: ProviderRpcError;
  errorResult?: Result;
}
