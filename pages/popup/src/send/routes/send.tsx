import { useNavigate } from 'react-router-dom';
import { SendView } from '../views/send.js';
import { useAtom, useAtomValue } from 'jotai';
import {
  currentTokenContractAtom,
  currentWalletAtom,
  PayTransactionFull,
  payTransactionsAtom,
  TransactionStatus,
} from '@src/atoms.js';
import { toast } from 'sonner';
import { useState } from 'react';
import { AztecAddress, Fr } from '@aztec/circuits.js';
import { TokenContract as TokenContractAztec } from '@aztec/noir-contracts.js';
import { transactionStorage } from '@extension/storage';
import { PayTransaction } from '@extension/storage/lib/types.js';

export type SendTokenParams = { receiverAddress: string; amount: number; isPrivate: boolean };
export type sendTokenFnType = ({ receiverAddress, amount, isPrivate }: SendTokenParams) => void;

export const SendRoute = () => {
  const navigate = useNavigate();
  const currentWallet = useAtomValue(currentWalletAtom);
  const [isProgress, setIsProgress] = useState(false);
  const currentTokenContract = useAtomValue(currentTokenContractAtom);
  const [payTransactions, setPayTransactions] = useAtom(payTransactionsAtom);

  const sendToken = async ({ receiverAddress, amount, isPrivate }: SendTokenParams) => {
    try {
      if (!currentTokenContract || !currentWallet) return toast.error('Invalid call');
      console.log('sen token called', amount);
      const tokenContract = await TokenContractAztec.at(
        AztecAddress.fromString(currentTokenContract.contractAddress),
        currentWallet.account,
      );
      setIsProgress(true);
      let tx;
      if (isPrivate) {
        tx = await tokenContract.methods.transfer(receiverAddress as any as AztecAddress, amount).send();
      } else {
        tx = tokenContract.methods
          .transfer_public(
            currentWallet.account.getAddress(),
            AztecAddress.fromString(receiverAddress),
            amount,
            BigInt(0),
          )
          .send();
      }

      const transactionHash = await tx.getTxHash();
      console.log(`Sent mint transaction ${transactionHash}`);
      const txStoragePayload: PayTransaction = {
        from: currentWallet.account.getAddress().toString(),
        to: receiverAddress,
        type: isPrivate ? 'private' : 'public',
        dateTime: new Date().toLocaleString(),
        amount: amount,
        txHash: transactionHash.toString(),
        tokenContractAddress: currentTokenContract.contractAddress,
        currencySymbol: currentTokenContract.symbol,
      };
      console.log('storage payload', txStoragePayload);
      await transactionStorage.addPayTransaction(txStoragePayload);
      console.log(' Added to wallet storage');
      const receipt = (await tx.getReceipt()).toJSON();

      const txFullPayload: PayTransactionFull = {
        ...txStoragePayload,
        status: receipt.status as TransactionStatus,
        transactionFee: receipt.transactionFee,
        blockHash: receipt.blockHash,
        blockNumber: receipt.blockNumber,
        error: receipt.error,
      };
      const updatedTxns = [txFullPayload, ...payTransactions];
      console.log('updated tns', updatedTxns);
      setPayTransactions(updatedTxns);
      console.log(`Transaction has been mined on block ${receipt.blockNumber}`);
      return true;
    } catch (e: any) {
      toast.error(e.toString());
    } finally {
      setIsProgress(false);
      return false;
    }
  };

  return (
    <SendView
      onGoBack={() => navigate(-1)}
      balance={12}
      currentNetwork={'mainnet'}
      sendToken={sendToken}
      isProgress={isProgress}
    />
  );
};
