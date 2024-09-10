import React from 'react';
import { TransactionsView } from '../views/transactions.js';

const PENDING_HASHES = [
  '5Jv9uVqJUn8Qq5jhBTEsntXHav2QEk8Qh7JbzNwZNN4Xa3PbH8ef',
  '5Jv9uVqJUn8Qq5jhBTEsntXHav2QEk8Qh7JbzNwZNN4Xa3PbHedr',
];
export const TransactionsRoute = () => {
  return (
    <TransactionsView
      pendingHashes={PENDING_HASHES}
      openPendingTransactions={() => {
        console.log('PENDING TXN OPENED');
      }}
    />
  );
};
