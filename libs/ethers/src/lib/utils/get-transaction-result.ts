import { Interface, Result } from '@ethersproject/abi';
import { TransactionReceipt } from '@ethersproject/abstract-provider';
import { ContractInterface } from '@ethersproject/contracts';

import { getContractEvents } from './get-contract-events';

export function getTransactionResult(transactionReceipt: TransactionReceipt, abi: ContractInterface): Result[] {
  if (!Array.isArray(abi)) {
    throw new Error('Bad ABI array');
  }

  const iface = new Interface(abi);
  const events = getContractEvents(abi);

  const result: Result[] = [];

  for (let i = 0; i < transactionReceipt.logs.length; i++) {
    const log = transactionReceipt.logs[i];
    const topic = log.topics
      .filter(t => events.map(e => e.topic).includes(t))
      .map(t => events.find(e => e.topic === t))?.[0];

    if (!topic?.name) {
      continue;
    }

    result.push(iface.decodeEventLog(topic.name, log.data, log.topics));
  }

  return result;
}
