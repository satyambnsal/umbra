import { PXE, AccountWalletWithSecretKey } from '@aztec/aztec.js';
import { atom } from 'jotai';

// Existing PXE atom
export const pxeAtom = atom<PXE | null>(null);

// Current wallet atom
export const currentWalletAtom = atom<AccountWalletWithSecretKey | null>(null);

// Setter atom for current wallet
export const setCurrentWalletAtom = atom(null, (get, set, newWallet: AccountWalletWithSecretKey | null) => {
  set(currentWalletAtom, newWallet);
  // Optionally, you can store the wallet address in localStorage here
  if (newWallet) {
    localStorage.setItem('currentWallet', JSON.stringify(newWallet));
  } else {
    localStorage.removeItem('wallet-address');
  }
});
