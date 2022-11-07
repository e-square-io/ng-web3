import { JsonFragment } from '@ethersproject/abi';
import { BaseContract, ContractInterface } from 'ethers';

import { ArgumentType, RequestInputs } from '../entities';

export function processInputs<T = BaseContract>(
  abi: ContractInterface,
  methodName: keyof T,
  inputs?: RequestInputs,
): ArgumentType[] {
  if (!Array.isArray(abi)) {
    throw new Error('Bad ABI array');
  }

  const functionDefinition = (abi as JsonFragment[]).find(item => item.name === methodName);

  if (!functionDefinition || functionDefinition.type !== 'function') {
    throw new Error(`Can't find definition for method name ${methodName.toString()}`);
  }

  const inputsDef = functionDefinition.inputs;
  const result: ArgumentType[] = [];
  if (!inputsDef?.length || !inputs) {
    return result;
  }

  for (let i = 0; i < inputsDef.length; i++) {
    const inputName = inputsDef[i].name;
    const input = inputName ? inputs.get(inputName) : undefined;

    if (input === undefined) {
      throw new Error(`Input argument ${inputName} is missing.`);
    }

    result.push(input);
  }

  return result;
}
