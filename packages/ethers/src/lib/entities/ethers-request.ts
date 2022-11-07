import { BaseContract, CallOverrides, ContractInterface, utils } from 'ethers';

import { processInputs } from '../utils';
import { ArgumentType } from './argument-type';
import { RequestInputs } from './request-inputs';

export type EthersRequestMethod = 'READ' | 'WRITE';

export class EthersRequest<T = BaseContract> {
  private readonly requestInputs?: RequestInputs;

  readonly requestMethod: EthersRequestMethod;
  readonly contractAddress: string;
  readonly abi: ContractInterface;
  readonly methodName: string;

  /**
   * Arguments of the method being called.
   */
  readonly inputs: ArgumentType[];

  /**
   * Amount of ERC-20 tokens being sent
   * with the request.
   */
  // readonly value: number;

  readonly overrides: CallOverrides;

  constructor(
    requestMethod: EthersRequestMethod,
    contractAddress: string,
    abi: ContractInterface,
    methodName: keyof T,
    inputs?: RequestInputs,
    value?: number,
  ) {
    this.requestMethod = requestMethod;
    this.contractAddress = contractAddress;
    this.abi = abi;
    this.methodName = methodName as string;
    this.requestInputs = inputs;
    this.inputs = processInputs(abi, methodName, inputs);
    this.overrides = {};

    if (value) {
      this.overrides.value = utils.parseEther(`${value}`);
    }
  }
}
