import { getSchnorrAccount } from '@aztec/accounts/schnorr';
import type { AccountWalletWithSecretKey, PXE } from '@aztec/aztec.js';
import {
  // Contract,
  createPXEClient,
  Fr,
  GrumpkinScalar,
  waitForPXE,
} from '@aztec/aztec.js';
// import { useAtomValue } from 'jotai';
// import { pxeAtom } from '../atoms.js';
import { RPC_URL } from '../constants.js';
import { TokenContract } from '@aztec/noir-contracts.js';

export const useAccount = () => {
  // const pxe = useAtomValue(pxeAtom)
  const createAccount = async () => {
    try {
      const pxeClient = createPXEClient(RPC_URL);
      await waitForPXE(pxeClient);
      const secretKey = Fr.random();
      const signingPrivateKey = GrumpkinScalar.random();
      const wallet = await getSchnorrAccount(pxeClient!, secretKey, signingPrivateKey).waitSetup();
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
