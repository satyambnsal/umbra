import { TxHash } from '@aztec/aztec.js';
import { useStorage } from '@extension/shared';
import { transactionStorage } from '@extension/storage';
import type { PayTransactionFull } from '@src/atoms.js';
import { payTransactionsAtom, pxeAtom } from '@src/atoms.js';
import { useAtom, useAtomValue } from 'jotai';
import { mergeTxWithReceipt } from '@src/utils.js';
import { useEffect } from 'react';

export const useLoadTransactions = () => {
  const transactionsStorageData = useStorage(transactionStorage);
  const pxeClient = useAtomValue(pxeAtom);
  const [payTransactions, setPayTransactions] = useAtom(payTransactionsAtom);

  const loadTransactions = async () => {
    try {
      const receiptPromises = transactionsStorageData.map(({ txHash }) =>
        pxeClient?.getTxReceipt(TxHash.fromString(txHash)),
      );
      const receipts = await Promise.all(receiptPromises);
      const jsonReceipts = receipts.map(receipt => receipt?.toJSON()).filter(receipt => receipt !== undefined);

      const transactions = mergeTxWithReceipt(transactionsStorageData, jsonReceipts) as PayTransactionFull[];

      console.log('TRANSACTIONS IN USE LOAD TRANSACTIONS FIRST', transactions);
      // setPayTransactions([...payTransactions, ...transactions]);
      setPayTransactions(transactions);
      console.log('TRANSACTIONS IN USE LOAD TRANSACTIONS AFTER', [...payTransactions, ...transactions]);
    } catch (error) {
      console.error(`Failed to load transactions from storage`, error);
    }
  };

  useEffect(() => {
    loadTransactions();
  }, []);
  return { loadTransactions };
};
