// import React, { useState } from 'react';
// import { useAtomValue } from 'jotai';
import { CreateWalletView } from '../views/create-wallet.js';
// import { useAccount } from '../../hooks/useAccount.js';
// import { pxeAtom } from '../../atoms.js';
// import { AccountWalletWithSecretKey } from '@aztec/aztec.js';
import { useNavigate } from 'react-router-dom';
// import { toast } from 'sonner';
// import { WizardLayout } from '@src/components/wizard-layout.js';
// import { Loader2Icon } from 'lucide-react';

// const title = 'Create Account';

export const CreateWalletRoute = () => {
  // const [isProgress, setIsProgress] = useState(false);
  const navigate = useNavigate();
  // const [alias, setAlias] = useState('');

  // const { createAccount } = useAccount();
  // const [setCurrentWallet] = useAtom(setCurrentWalletAtom);

  // const handleCreateAccount = async () => {
  //   setIsProgress(true);
  //   const newAccount = await createAccount();
  //   console.log('new account', newAccount);
  //   setIsProgress(false);
  //   navigate('/dashboard');
  //   toast(<>Account {newAccount?.getAddress()}create successfully</>);
  // };

  return <CreateWalletView onSubmit={() => navigate('/dashboard')} isProgress={false} />;
};
