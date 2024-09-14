import { getSchnorrAccount } from '@aztec/accounts/schnorr';
import { AccountWalletWithSecretKey } from '@aztec/aztec.js';
import { deriveSigningKey, Fr } from '@aztec/circuits.js';
import { useStorage } from '@extension/shared';
import { walletStorage } from '@extension/storage';
import { accountsAtom, currentWalletAtom, pxeAtom } from '@src/atoms.js';
import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect } from 'react';

export const useLoadAccountFromStorage = () => {
  const walletData = useStorage(walletStorage);
  const pxeClient = useAtomValue(pxeAtom);
  const setAccounts = useSetAtom(accountsAtom);
  const setCurrentWallet = useSetAtom(currentWalletAtom);

  const storageAccounts = walletData.accounts;
  console.log('Storage Accounts', storageAccounts);
  const load = async () => {
    if (!pxeClient) return;
    try {
      const registeredAccounts = await pxeClient.getRegisteredAccounts();
      const registeredAddresses = registeredAccounts.map(({ address }) => address.toString());
      console.log('Registered addresses', registeredAddresses);

      const accountsPromises = storageAccounts.map(async ({ secretKey, salt, alias, address }) => {
        const account = getSchnorrAccount(
          pxeClient,
          Fr.fromString(secretKey),
          deriveSigningKey(Fr.fromString(secretKey)),
          Fr.fromString(salt),
        );
        console.log('Storage account address', account.getAddress().toString(), address);

        const accountAddress = account.getAddress().toString();
        let wallet: AccountWalletWithSecretKey | null = null;
        if (registeredAddresses.includes(accountAddress)) {
          wallet = await account.getWallet();
        } else {
          try {
            wallet = await account.waitSetup();
          } catch (error) {
            console.error(error);
          }
        }
        if (wallet) return { alias, account: wallet };
        return null;
      });
      let accounts = (await Promise.all(accountsPromises)).filter(account => account !== null);
      setAccounts(accounts);
      if (accounts.length > 0) {
        setCurrentWallet(accounts[0]);
      }
    } catch (err) {
      console.log('Failed to load aaccounts from storage', err);
    }
  };
  useEffect(() => {
    load();
  }, []);
  return { loadAccounts: load };
};
