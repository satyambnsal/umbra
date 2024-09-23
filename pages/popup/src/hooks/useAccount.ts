import { getSchnorrAccount } from '@aztec/accounts/schnorr';
import type { AccountWalletWithSecretKey } from '@aztec/aztec.js';
import {
  // Contract,
  Fr,
} from '@aztec/aztec.js';
import { deriveSigningKey } from '@aztec/circuits.js';
import { TokenContract } from '@aztec/noir-contracts.js';
import { walletStorage } from '@extension/storage';
import { useAtom, useAtomValue } from 'jotai';
import { pxeAtom, tokenContractsAtom } from '@src/atoms.js';
import { toast } from 'sonner';

export const useAccount = () => {
  const pxeClient = useAtomValue(pxeAtom);
  const [tokenContracts, setTokenContracts] = useAtom(tokenContractsAtom);
  const createAccount = async (alias: string) => {
    const type = 'schnorr';
    try {
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

        const formattedData = {
          address: address.toString(),
          secretKey: secretKey.toString(),
          salt: salt.toString(),
          alias,
          type,
        };

        console.log(formattedData);
        await walletStorage.addAccount(formattedData);
      } catch (e) {
        console.error(e);
        toast.error(`Error saving account data ${e}`);
      }

      //TODO: Similarly fetch init hash and deployer
      // const deployedContract = await wallet.deploy()
      // console.log('Account created', wallet.getAddress().toShortString());
      return wallet;
    } catch (e) {
      console.error('Account error', e);
      toast.error(`Error creating account ${e}`);
      return null;
    }
  };

  const recoverAccount = async (alias: string, privateKey: string) => {
    const type = 'schnorr';
    try {
      const secretKey = Fr.fromString(privateKey);
      const signingPrivateKey = deriveSigningKey(secretKey);
      const account = getSchnorrAccount(pxeClient!, secretKey, signingPrivateKey);
      const recoveredWallet = await account.waitSetup();
      const salt = recoveredWallet.salt;
      const { address } = account.getCompleteAddress();
      try {
        const accountData = {
          address,
          secretKey,
          salt,
          alias,
          type,
        };
        console.log(accountData);

        const formattedData = {
          address: address.toString(),
          secretKey: secretKey.toString(),
          salt: salt.toString(),
          alias,
          type,
        };

        console.log(formattedData);
        await walletStorage.addAccount(formattedData);
      } catch (e) {
        console.error(e);
        toast.error(`Error saving account data ${e}`);
      }

      return recoveredWallet;
    } catch (e) {
      console.error('Account error', e);
      toast.error(`Error creating account ${e}`);
      return null;
    }
  };

  const deployToken = async (owner: AccountWalletWithSecretKey, tokenName: string, tokenSymbol: string) => {
    const ownerAddress = owner.getAddress();
    const deployedContract = await TokenContract.deploy(owner, ownerAddress, tokenName, tokenSymbol, 18)
      .send()
      .deployed();
    try {
      const tokenContract = {
        contractAddress: deployedContract.address.toString(),
        name: tokenName,
        symbol: tokenSymbol,
        deployerAddress: ownerAddress.toString(),
      };
      await walletStorage.addTokenContract(tokenContract);
      setTokenContracts([tokenContract, ...tokenContracts]);
      toast.success(`Token ${tokenContract.name} deployed successfully`);
      return tokenContract;
    } catch (err) {
      console.error('Failed to save token contract address', err);
      toast.error(`Error in deploying token ${err}`);
      return null;
    }
  };

  return { createAccount, deployToken, recoverAccount };
};
