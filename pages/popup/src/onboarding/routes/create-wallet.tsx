// import React, { useState } from 'react';
// import { useAtomValue } from 'jotai';
import { useState } from 'react';
import { CreateWalletView } from '../views/create-wallet.js';
import { useAccount } from '../../hooks/useAccount.js';
// import { pxeAtom } from '../../atoms.js';
// import { AccountWalletWithSecretKey } from '@aztec/aztec.js';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAtom } from 'jotai';
import { accountsAtom, currentWalletAtom } from '@src/atoms.js';

export const CreateWalletRoute = () => {
  const [isProgress, setIsProgress] = useState(false);
  const navigate = useNavigate();
  const [accounts, setAccounts] = useAtom(accountsAtom);
  const [currentWallet, setCurrentWallet] = useAtom(currentWalletAtom);

  const { createAccount } = useAccount();

  const handleCreateAccount = async (alias: string) => {
    setIsProgress(true);
    const newAccount = await createAccount(alias);
    console.log('new account', newAccount, alias);
    if (newAccount) {
      setAccounts([...accounts, { alias, account: newAccount }]);
    }
    if (newAccount && !currentWallet) {
      setCurrentWallet({ alias, account: newAccount });
    }
    setIsProgress(false);
    //  toast(<>Account {newAccount?.getAddress()}create successfully</>);
    navigate('/dashboard');
  };

  return <CreateWalletView onSubmit={handleCreateAccount} isProgress={isProgress} />;
};
