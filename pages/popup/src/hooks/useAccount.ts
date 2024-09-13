import { getSchnorrAccount } from '@aztec/accounts/schnorr';
import type { AccountWalletWithSecretKey, PXE } from '@aztec/aztec.js';
import {
  // Contract,
  createPXEClient,
  Fr,
  GrumpkinScalar,
  waitForPXE,
} from '@aztec/aztec.js';
import { deriveSigningKey } from '@aztec/circuits.js';
// import { useAtomValue } from 'jotai';
// import { pxeAtom } from '../atoms.js';
import { RPC_URL } from '../constants.js';
import { TokenContract } from '@aztec/noir-contracts.js';
import { walletStorage } from '@extension/storage';

export const useAccount = () => {
  // const pxe = useAtomValue(pxeAtom)
  const createAccount = async (alias: string) => {
    const type = 'schnorr';
    try {
      const pxeClient = createPXEClient(RPC_URL);
      await waitForPXE(pxeClient);
      const secretKey = Fr.random();
      const signingPrivateKey = deriveSigningKey(secretKey);
      const account = getSchnorrAccount(pxeClient!, secretKey, signingPrivateKey);
      const wallet = await account.waitSetup();
      const salt = account.getInstance().salt;
      const { address, publicKeys, partialAddress } = account.getCompleteAddress();
      try {
        const accountData = {
          address,
          secretKey,
          salt,
          alias,
          type,
        };
        console.log(accountData);
        await walletStorage.addAccount(accountData);
      } catch (e) {
        console.error(e);
      }

      //TODO: Similarly fetch init hash and deployer
      // const deployedContract = await wallet.deploy()
      // console.log('Account created', wallet.getAddress().toShortString());
      return wallet;
    } catch (e) {
      console.error('Account error', e);
      return null;
    }
  };

  const deployToken = async (owner: AccountWalletWithSecretKey) => {
    const ownerAddress = owner.getAddress();
    const deployedContract = await TokenContract.deploy(owner, ownerAddress, 'TokenName', 'TKN', 18).send().deployed();

    const token = await TokenContract.at(deployedContract.address, owner);
    return token;
  };

  return { createAccount, deployToken };
};
