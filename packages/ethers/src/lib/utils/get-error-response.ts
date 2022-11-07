import { Interface, ErrorFragment, Result } from '@ethersproject/abi';
import { ContractInterface } from '@ethersproject/contracts';

import { ErrorResponse } from '../entities';
import { processResult } from './process-result';

function getErrorResult(iface: Interface, errorFragment: ErrorFragment, data?: string): Result {
  if (!data) {
    return [];
  }

  try {
    const result = iface.decodeErrorResult(errorFragment, data);

    return result.length ? result : [errorFragment.name];
  } catch (ex) {
    return [];
  }
}

/**
 * Create `ErrorResponse` object from chain error.
 * @param err Chain error
 * @param abi Contract interface
 * @returns `ErrorResponse` object
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getErrorResponse(err: Record<keyof ErrorResponse, any>, abi: ContractInterface): ErrorResponse {
  if (!Array.isArray(abi)) {
    throw new Error('Bad ABI array');
  }

  const iface = new Interface(abi);
  const method = err.method.split('(')?.[0];
  const errorResult = Object.entries(iface.errors)
    .map(([, e]) => getErrorResult(iface, e, err.data || err.error?.data?.originalError?.data))
    .filter(r => r.length)
    .map(r => processResult(r));
  let reason = err.reason ?? 'Unknown reason';

  if (errorResult.length) {
    const errRes = errorResult[0];

    if (Array.isArray(errRes) && errRes.length) {
      reason = errRes[0];
    } else if (typeof errRes === 'object' && 'reason' in errRes) {
      reason = (errRes as unknown as { reason: string }).reason;
    }
  }

  const res: ErrorResponse = {
    reason,
    code: err.code,
    data: err.data,
    method,
    errorArgs: err.errorArgs,
    errorName: err.errorName,
    errorSignature: err.errorSignature,
    address: err.address,
    transaction: { ...err.transaction },
    error: err.error,
    errorResult: errorResult?.[0],
  };

  return res;
}
