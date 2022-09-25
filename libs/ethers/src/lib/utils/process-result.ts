/* eslint-disable @typescript-eslint/no-explicit-any */
import { Result } from '@ethersproject/abi';
import { BigNumber } from 'ethers';

import { ArgumentType } from '../entities';
import { bigNumberToNumber } from './bignumber-to-number';

export function processResult(res: Result): ArgumentType[];
export function processResult<R>(res: Result): R;
export function processResult<R = any>(res: Result): any {
  const keys = Object.keys(res).filter(k => !k.match(/[0-9]/gi));
  if (!keys?.length) {
    return res.map(item => (item instanceof BigNumber ? bigNumberToNumber(item) : item));
  }

  return Object.assign(
    {},
    ...keys.map(output => ({
      [output]: res[output] instanceof BigNumber ? bigNumberToNumber(res[output]) : res[output],
    })),
  ) as R;
}
