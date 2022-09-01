export interface Network {
  name: string;
  chainId: number;
  currency: string;
}

const DEFAULT_CHAIN: { name: string; currency: string } = {
  name: 'Unknown Network',
  currency: 'ETH',
} as const;

export const CHAINLIST: Record<number, { name: string; currency: string }> = {
  1: {
    name: 'Ethereum Mainnet',
    currency: 'ETH',
  },
  56: {
    name: 'Binance Smart Chain Mainnet',
    currency: 'BNB',
  },
} as const;

export function getNetwork(chainId: number): Network | undefined {
  const { name, currency } = CHAINLIST[chainId] || DEFAULT_CHAIN;

  return { chainId, name, currency };
}
