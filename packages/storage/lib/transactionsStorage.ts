import { createStorage } from './base';
import { StorageEnum } from './enums';
import type { PayTransaction, TransactionStorage } from './types';

const storage = createStorage<PayTransaction[]>('transactions-storage-key', [], {
  storageEnum: StorageEnum.Local,
  liveUpdate: true,
});

// You can extend it with your own methods
export const transactionStorage: TransactionStorage = {
  ...storage,
  addPayTransaction: async (transaction: PayTransaction) => {
    await storage.set(prevTransactions => {
      return [transaction, ...prevTransactions];
    });
  },
};
