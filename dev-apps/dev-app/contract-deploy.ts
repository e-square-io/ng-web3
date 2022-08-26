import { ethers } from "hardhat";
import { writeFile } from 'fs/promises';
import { join } from 'path';

const ENV_FOLDER = '/src/environments';

async function main() {
  const numberNftFactory = await ethers.getContractFactory('NumberNft');
  const numberNft = await numberNftFactory.deploy();
  await numberNft.deployed();
  const contractAddressFile = `export const NUMBER_NFT_ADDRESS = '${numberNft.address}' as const;`;
  await writeFile(join(__dirname, ENV_FOLDER, 'contract-address.ts'), contractAddressFile);

  console.log(`Deployed at ${numberNft.address}`)
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
