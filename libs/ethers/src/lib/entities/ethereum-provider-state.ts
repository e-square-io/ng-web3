import { Network } from './network';
import { ProviderRpcError } from './provider-rpc-error';

export interface EthereumProviderState {
  ready: boolean;
  busy: boolean;
  accounts: string[];
  currentNetwork?: Network;
  error?: ProviderRpcError;
}

export function createInitialEthereumProviderState(): EthereumProviderState {
  return {
    ready: false,
    busy: false,
    accounts: [],
  };
}
