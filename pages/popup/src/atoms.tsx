// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { PXE, AccountWalletWithSecretKey } from '@aztec/aztec.js';
import { PayTransaction, TokenContract } from '@extension/storage/lib/types.js';
import { atom } from 'jotai';

export type TransactionStatus = 'dropped' | 'pending' | 'success';
export type PayTransactionFull = PayTransaction & {
  transactionFee?: string;
  status: TransactionStatus;
  error?: string;
  blockHash?: string;
  blockNumber?: number;
};
// Existing PXE atom
export const pxeAtom = atom<PXE | null>(null);
export const accountsAtom = atom<{ alias: string; account: AccountWalletWithSecretKey }[]>([]);

// Current wallet atom
export const currentWalletAtom = atom<{ alias: string; account: AccountWalletWithSecretKey } | null>(null);
export const currentTokenContractAtom = atom<TokenContract | null>(null);
export const tokenContractsAtom = atom<TokenContract[]>([]);
export const publicBalanceAtom = atom<BigInt>(0n);
export const privateBalanceAtom = atom<BigInt>(0n);

export const payTransactionsAtom = atom<PayTransactionFull[]>([]);

export const isPrivateAtom = atom<boolean>(false);
