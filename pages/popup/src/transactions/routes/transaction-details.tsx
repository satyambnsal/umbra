import React, { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TransactionDetailsView } from '../views/transaction-details.js';
import { useAtomValue } from 'jotai';
import { PayTransactionFull, payTransactionsAtom } from '@src/atoms.js';

export const TransactionDetailsRoute = () => {
  const navigate = useNavigate();
  const { hash } = useParams();
  const payTransactions = useAtomValue(payTransactionsAtom);
  const tx: PayTransactionFull | undefined = useMemo(() => {
    return payTransactions.find(({ txHash }) => txHash === hash);
  }, [hash]);
  console.log('Transaction hash in params', hash);
  return <TransactionDetailsView onGoBack={() => navigate(-1)} hash={hash} tx={tx} />;
};
