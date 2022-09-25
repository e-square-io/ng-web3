import { BigNumber } from 'ethers';

export function bigNumberToNumber(value: BigNumber): number | bigint {
  try {
    return value.toNumber();
  } catch {
    return value.toBigInt();
  }
}
