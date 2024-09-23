import React, { useEffect } from 'react';
import { StartView } from '../views/start.js';
import { useNavigate } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import { accountsAtom } from '@src/atoms.js';

export const StartRoute = () => {
  const navigate = useNavigate();
  const accounts = useAtomValue(accountsAtom);
  console.log('ACCOUNTS', accounts);

  useEffect(() => {
    if (accounts.length > 0) {
      return navigate('/dashboard');
    }
  }, [accounts]);

  return (
    <StartView
      onCreateClicked={() => navigate('/onboarding/create')}
      onRestoreClicked={() => navigate('/accounts/import')}
    />
  );
};
