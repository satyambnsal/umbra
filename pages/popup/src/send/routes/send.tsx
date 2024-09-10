import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { SendView } from '../views/send.js';
import chalk from 'chalk';
import { toast } from 'sonner';

export const SendRoute = () => {
  const [advanced, setAdvanced] = useState(false);
  const [receipentAddress, setReceipentAddress] = useState('');
  const [transferAmount, setTransferAmount] = useState<number>(0);
  const navigate = useNavigate();
  const [isProgress, setIsProgress] = useState(false);

  // const handlePublicTransfer = async () => {
  //   if (
  //     !receipentAddress ||
  //     transferAmount === 0 ||
  //     !tokenContract ||
  //     !currentWallet
  //   ) {
  //     return toast.error(`Invalid call`);
  //   }
  //   try {
  //     setIsProgress(true);

  //     const tx = await tokenContract.methods
  //       .transfer_public(
  //         currentWallet.getAddress(),
  //         receipentAddress,
  //         BigInt(transferAmount),
  //         BigInt(0)
  //       )
  //       .send();
  //     console.log(`Sent mint transaction ${await tx.getTxHash()}`);
  //     console.log(chalk.blackBright("Awaiting transaction to be mined"));
  //     const receipt1 = await tx.wait();
  //     console.log(
  //       chalk.green(
  //         `Transaction has been mined on block ${chalk.bold(
  //           receipt1.blockNumber
  //         )}`
  //       )
  //     );
  //   } catch (e: any) {
  //     toast.error(e.toString());
  //   } finally {
  //     setIsProgress(false);
  //   }
  // };
  // const handlePrivateTransfer = async () => {
  //   if (
  //     !receipentAddress ||
  //     transferAmount === 0 ||
  //     !tokenContract ||
  //     !currentWallet
  //   ) {
  //     return toast.error(`Invalid call`);
  //   }

  //   try {
  //     setIsInProgressObj({ ...isInProgressObj, transferPrivate: true });
  //     const tx = (
  //       await TokenContract.at(tokenContract.address, currentWallet)
  //     ).methods
  //       .transfer(receipentAddress as any as AztecAddress, transferAmount)
  //       .send();
  //     console.log(`Sent mint transaction ${await tx.getTxHash()}`);
  //     console.log(chalk.blackBright("Awaiting transaction to be mined"));
  //     const receipt1 = await tx.wait();
  //     console.log(
  //       chalk.green(
  //         `Transaction has been mined on block ${chalk.bold(
  //           receipt1.blockNumber
  //         )}`
  //       )
  //     );
  //   } catch (e: any) {
  //     toast.error(e.toString());
  //   } finally {
  //     setIsInProgressObj({ ...isInProgressObj, transferPrivate: false });
  //   }
  // };

  return (
    <SendView
      onGoBack={() => navigate(-1)}
      balance={12}
      fiatPrice={12}
      advanced={advanced}
      setAdvanced={setAdvanced}
      currentNetwork={'mainnet'}
      // setReceipentAddress={setReceipentAddress}
      // transferAmount={transferAmount}
    />
  );
};
