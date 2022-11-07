import { JsonFragment, Interface } from '@ethersproject/abi';
import { ContractInterface } from '@ethersproject/contracts';

import { ContractEvent } from '../entities';

export function getContractEvents(abi: ContractInterface): ContractEvent[] {
  if (!Array.isArray(abi)) {
    throw new Error('Bad ABI array');
  }

  const iface = new Interface(abi);

  return (abi as JsonFragment[])
    .filter(item => item.type === 'event' && item.name)
    .map(e => ({ name: e.name || '', topic: iface.getEventTopic(e.name || '') }));
}
