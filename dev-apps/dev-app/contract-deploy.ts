import { FormatTypes } from 'ethers/lib/utils';
import { existsSync, mkdirSync } from 'fs';
import { writeFile, readdir } from 'fs/promises';
import { ethers, config, network } from 'hardhat';
import { join } from 'path';

const CONTRACT_NAME = 'NumberNft';

const AUTOGENERATED_PATTERN = `/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
`;

function generateFile(path: string, content: string): Promise<void> {
  const file = `${AUTOGENERATED_PATTERN}
${content}
`;

  return writeFile(path, file);
}

async function updateTsDirIndexFile(path: string): Promise<void> {
  const INDEX_FILE_NAME = 'index.ts';
  let content = '';
  let files = await readdir(path);

  files = files.filter(f => f.endsWith('.ts') && f !== INDEX_FILE_NAME).map(f => f.replace('.ts', ''));

  if (!files.length) {
    return;
  }

  for (let i = 0; i < files.length; i++) {
    content += `export * from './${files[i]}';
`;
  }

  return generateFile(join(path, INDEX_FILE_NAME), content);
}

function createContractAddressFile(path: string, address: string, contractName: string): Promise<void> {
  const content = `export const ${contractName.toUpperCase()}_ADDRESS = '${address}' as const;`;

  return generateFile(join(path, `${CONTRACT_NAME}-address.ts`), content);
}

function createContractAbiFile(path: string, abi: string, contractName: string): Promise<void> {
  let abiArr = JSON.parse(abi);
  abiArr = abiArr.map((item: any) => {
    if (item['gas']) {
      delete item['gas'];
    }
    if (item['payable']) {
      delete item['payable'];
    }

    return item;
  });
  const content = `
import { ContractInterface } from 'ethers';

export const ${contractName.toUpperCase()}_ABI: ContractInterface = ${JSON.stringify(abiArr)};`;

  return generateFile(join(path, `${CONTRACT_NAME}-abi.ts`), content);
}

function mkTsDir(): string {
  const tsDir = join(config.paths.artifacts, 'ts', `${network.config.chainId}`);

  if (!existsSync(tsDir)) {
    mkdirSync(tsDir);
  }

  return tsDir;
}

async function main(): Promise<void> {
  const numberNftFactory = await ethers.getContractFactory(CONTRACT_NAME);
  const numberNft = await numberNftFactory.deploy();
  await numberNft.deployed();
  const tsDir = mkTsDir();
  try {
    await createContractAddressFile(tsDir, numberNft.address, CONTRACT_NAME);
    await createContractAbiFile(tsDir, numberNft.interface.format(FormatTypes['json']) as string, CONTRACT_NAME);
    await updateTsDirIndexFile(tsDir);
    console.log(`Deployed at ${numberNft.address}`);
  } catch (err) {
    console.error(err);
  }
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
