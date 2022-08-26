import { HardhatUserConfig } from "hardhat/config";
import { config as dotenvConfig } from 'dotenv';
import "@nomicfoundation/hardhat-toolbox";

dotenvConfig({ path: 'dev-apps/dev-app/.env' });

const config: HardhatUserConfig = {
  solidity: "0.8.9",
  paths: {
    artifacts: './src/artifacts',
    cache: './cache',
    sources: './contracts',
  },
  networks: {
    ganache: {
      url: process.env['GANACHE_RPC_URL'],
      accounts: [process.env['GANACHE_MAIN_WALLET'] || ''],
      chainId: 1337,
    },
  },
  typechain: {
    outDir: './src/contract-types',
  },
};

export default config;
