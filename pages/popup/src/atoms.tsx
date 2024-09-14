// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { PXE, AccountWalletWithSecretKey } from '@aztec/aztec.js';
import { TokenContract } from '@extension/storage/lib/types.js';
import { atom } from 'jotai';

// Existing PXE atom
export const pxeAtom = atom<PXE | null>(null);
export const accountsAtom = atom<{ alias: string; account: AccountWalletWithSecretKey }[]>([]);

// Current wallet atom
export const currentWalletAtom = atom<{ alias: string; account: AccountWalletWithSecretKey } | null>(null);
export const currentTokenContractAtom = atom<TokenContract | null>(null);
export const tokenContractsAtom = atom<TokenContract[]>([]);
export const publicBalanceAtom = atom<BigInt>(0n);
export const privateBalanceAtom = atom<BigInt>(0n);

export const isPrivateAtom = atom<boolean>(false);

// // Setter atom for current wallet
// export const setCurrentWalletAtom = atom(null, (get, set, newWallet: AccountWalletWithSecretKey | null) => {
//   set(currentWalletAtom, newWallet);
//   // Optionally, you can store the wallet address in localStorage here
//   if (newWallet) {
//     localStorage.setItem('currentWallet', JSON.stringify(newWallet));
//   } else {
//     localStorage.removeItem('wallet-address');
//   }
// });
