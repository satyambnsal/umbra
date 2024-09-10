import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { OverviewView } from '../views/overview.js';
import { currentWalletAtom } from '@src/atoms.js';
// import { useAccount } from "../../hooks/useAccounts.js";
// import { Contract } from "@aztec/aztec.js";
// import { currentWalletAtom } from '../../atoms.js';

const transactions = [
  {
    hash: '233oikjffwpoiuwu230ur029',
    amount: 2,
  },
  {
    hash: '233oikjffwpoiuwu230ur029asdf',
    amount: 2,
  },
];

export const OverviewRoute = () => {
  // const [tokenContract, setTokenContract] = useState<Contract | null>(null);
  const [isProgress, setIsProgress] = useState(false);
  // const { deployToken } = useAccount();
  const [currentWallet] = useAtom(currentWalletAtom);

  const handleDeployToken = async () => {
    if (!currentWallet) {
      console.error('Current Wallet not found!');
      return;
    }
    setIsProgress(true);
    console.log('Deploying token');
    // const tokenContract = await deployToken(currentWallet);
    // setTokenContract(tokenContract);
    setIsProgress(false);
  };

  // Get the public address from the current wallet
  const publicAddress = '0X193jlsafkms9d9003rnq2f09q230r2inf02je09j';

  return (
    <OverviewView
      publicAddress={publicAddress}
      transactions={transactions}
      isProgress={isProgress}
      handleDeployToken={handleDeployToken}
    />
  );
};
