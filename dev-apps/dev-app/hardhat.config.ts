import { config as dotenvConfig } from 'dotenv';
import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';

dotenvConfig({ path: 'dev-apps/dev-app/.env' });

const config: HardhatUserConfig = {
  solidity: {
    version: '0.8.9',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  paths: {
    artifacts: process.env['ARTIFACTS_PATH'],
    cache: './cache',
    sources: './contracts',
  },
  networks: {
    ganache: {
      url: process.env['GANACHE_RPC_URL'],
      accounts: [process.env['GANACHE_MAIN_WALLET'] || ''],
      chainId: 1337,
    },
    goerli: {
      url: process.env['GOERLI_RPC_URL'],
      accounts: [process.env['GOERLI_MAIN_WALLET'] || ''],
      chainId: 5,
    },
  },
  typechain: {
    outDir: './src/contract-types',
  },
};

export default config;
