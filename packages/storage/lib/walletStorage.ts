import { createStorage } from './base';
import { StorageEnum } from './enums';
import type { AztecAccount, TokenContract, Wallet, WalletStorage } from './types';

const DEFAULT_RPC_URL = 'http://localhost:8080';

const storage = createStorage<Wallet>(
  'wallet-storage-key',
  { rpcUrl: DEFAULT_RPC_URL, accounts: [], tokenContracts: [] },
  {
    storageEnum: StorageEnum.Local,
    liveUpdate: true,
  },
);

// You can extend it with your own methods
export const walletStorage: WalletStorage = {
  ...storage,
  setRpcURL: async (newUrl: string) => {
    await storage.set(prevConfig => {
      return { ...prevConfig, rpcUrl: newUrl };
    });
  },
  addAccount: async (newAccount: AztecAccount) => {
    await storage.set(prevConfig => {
      return { ...prevConfig, accounts: [newAccount, ...prevConfig.accounts] };
    });
  },
  addTokenContract: async (tokenContract: TokenContract) => {
    await storage.set(prevConfig => {
      return { ...prevConfig, tokenContracts: [tokenContract, ...prevConfig.tokenContracts] };
    });
  },
};
