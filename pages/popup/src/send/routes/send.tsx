import { useNavigate } from 'react-router-dom';
import { SendView } from '../views/send.js';
import { useAtomValue } from 'jotai';
import { currentTokenContractAtom, currentWalletAtom } from '@src/atoms.js';
import { toast } from 'sonner';
import { useState } from 'react';
import { AztecAddress, Fr } from '@aztec/circuits.js';
import { TokenContract as TokenContractAztec } from '@aztec/noir-contracts.js';

export type SendTokenParams = { receiverAddress: string; amount: number; isPrivate: boolean };
export type sendTokenFnType = ({ receiverAddress, amount, isPrivate }: SendTokenParams) => void;

export const SendRoute = () => {
  const navigate = useNavigate();
  const currentWallet = useAtomValue(currentWalletAtom);
  const [isProgress, setIsProgress] = useState(false);
  const currentTokenContract = useAtomValue(currentTokenContractAtom);

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

      console.log(`Sent mint transaction ${await tx.getTxHash()}`);
      const receipt1 = await tx.wait();
      console.log(`Transaction has been mined on block ${receipt1.blockNumber}`);
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
