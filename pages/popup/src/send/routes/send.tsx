import { useNavigate } from 'react-router-dom';
import { SendView } from '../views/send.js';
import { useAtomValue } from 'jotai';
import { currentWalletAtom, isPrivateAtom, tokenContractsAtom } from '@src/atoms.js';
import { toast } from 'sonner';
import { act, useState } from 'react';
import { AztecAddress } from '@aztec/circuits.js';

export const SendRoute = () => {
  const navigate = useNavigate();
  const isPrivate = useAtomValue(isPrivateAtom);
  const currentWallet = useAtomValue(currentWalletAtom);
  const [isProgress, setIsProgress] = useState(false);
  const tokenContracts = useAtomValue(tokenContractsAtom);
  const walletAddress = currentWallet?.account.getAddress().toString();

  const currentUserTokenContract = tokenContracts.filter(tokenContract => {
    return tokenContract.deployerAddress === walletAddress;
  });

  const activeTokenContract = currentUserTokenContract[currentUserTokenContract.length - 1];

  console.log('active token contract', activeTokenContract);

  const sendToken = async (receiverAddress: string, amount: string) => {
    if (!receiverAddress || Number(amount) === 0 || !tokenContracts || !currentWallet) {
      toast.error(`Invalid call`);
      return;
    }
    try {
      setIsProgress(true);

      let tx;
      if (isPrivate) {
        tx = await activeTokenContract.methods.transfer(receiverAddress as any as AztecAddress, Number(amount)).send();
      } else {
        tx = activeTokenContract.methods
          .transfer_public(
            currentWallet.account.getAddress(),
            AztecAddress.fromString(receiverAddress),
            BigInt(amount),
            BigInt(0),
          )
          .send();
      }

      console.log(`Sent mint transaction ${await tx.getTxHash()}`);
      const receipt1 = await tx.wait();
      console.log(`Transaction has been mined on block ${receipt1.blockNumber}`);
    } catch (e: any) {
      toast.error(e.toString());
    } finally {
      setIsProgress(false);
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
