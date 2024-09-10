import React, { useState } from 'react';
// import { useAtomValue } from 'jotai';
import { CreateWalletView } from '../views/create-wallet.js';
// import { useAccount } from '../../hooks/useAccounts.js';
// import { pxeAtom } from '../../atoms.js';
// import { AccountWalletWithSecretKey } from '@aztec/aztec.js';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const CreateWalletRoute = () => {
  // const pxeClient = useAtomValue(pxeAtom);
  // const [wallets, setWallets] = useState<AccountWalletWithSecretKey[]>([]);
  const [isProgress, setIsProgress] = useState(false);
  const navigate = useNavigate();

  // const { createAccount } = useAccount();
  // const [setCurrentWallet] = useAtom(setCurrentWalletAtom);

  const handleCreateAccount = async () => {
    setIsProgress(true);
    // // createAccount({client: pxeAtom, ...CREATE_ACCOUNT_DEFAULT_PARAMS});
    // const wallet = await createAccount(pxeClient!);
    // if (wallet) {
    //   setWallets([...wallets, wallet]);
    // }
    setIsProgress(false);
    navigate('/dashboard');
    toast(<>Account 0X12kjvasofiusadfkjs create successfully</>);
  };

  return <CreateWalletView onSubmit={handleCreateAccount} isProgress={isProgress} />;
};
