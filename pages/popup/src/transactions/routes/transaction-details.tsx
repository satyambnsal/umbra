import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TransactionDetailsView } from '../views/transaction-details.js';
import { useAtom, useAtomValue } from 'jotai';
import type { PayTransactionFull, TransactionStatus } from '@src/atoms.js';
import { payTransactionsAtom, pxeAtom } from '@src/atoms.js';
import { TxHash } from '@aztec/aztec.js';

export const TransactionDetailsRoute = () => {
  const navigate = useNavigate();
  const { hash } = useParams();
  const pxeClient = useAtomValue(pxeAtom);
  const [payTransactions, setPayTransactions] = useAtom(payTransactionsAtom);
  const [isFetching, setIsFetching] = useState(false);

  const tx: PayTransactionFull | undefined = useMemo(() => {
    return payTransactions.find(({ txHash }) => txHash === hash);
  }, [hash, payTransactions]);

  const handleRefetch = async () => {
    console.log('Refetching transactions');
    if (tx?.txHash) {
      setIsFetching(true);
      const txReceipt = (await pxeClient?.getTxReceipt(TxHash.fromString(tx.txHash)))?.toJSON();
      const updatedTxns: PayTransactionFull[] = payTransactions.map(tx => {
        if (tx.txHash === txReceipt?.txHash.toString()) {
          return {
            ...tx,
            status: txReceipt.status as TransactionStatus,
            transactionFee: txReceipt.transactionFee,
            blockHash: txReceipt.blockHash,
            blockNumber: txReceipt.blockNumber,
          };
        }
        return tx;
      });
      console.log('Updated Transactions', updatedTxns);
      setPayTransactions(updatedTxns);
      setIsFetching(false);
    }
  };

  console.log('Transaction hash in params', hash);
  return (
    <TransactionDetailsView
      onGoBack={() => navigate(-1)}
      hash={hash}
      tx={tx}
      refetchTx={handleRefetch}
      isFetching={isFetching}
    />
  );
};
