import { config as dotenvConfig } from 'dotenv';
import { ethers } from 'hardhat';

import { NUMBERNFT_ADDRESS, NUMBERNFT_ABI } from './src/artifacts/ts';

dotenvConfig();

async function mint() {
  const signer = await ethers.getSigner('');
  const numberNft = await ethers.getContractAt('NumberNft', NUMBERNFT_ADDRESS, signer);

  console.log('Minting NFT');

  const value = ethers.utils.parseEther('0.01');
  const txResponse = await numberNft.mint(12, { value });
  await txResponse.wait(1);
}

async function main() {
  // const signer = await ethers.getSigner(process.env['GANACHE_MAIN_WALLET'] || '');
  const numberNft = await ethers.getContractAt('NumberNft', NUMBERNFT_ADDRESS);

  console.log(await numberNft.getToken(0));
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
