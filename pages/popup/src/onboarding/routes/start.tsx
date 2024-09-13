import React, { useEffect } from 'react';
import { StartView } from '../views/start.js';
import { useNavigate } from 'react-router-dom';
import { useStorage } from '@extension/shared';
import { walletStorage } from '@extension/storage';

export const StartRoute = () => {
  const navigate = useNavigate();
  // const walletData = useStorage(walletStorage);

  // useEffect(() => {
  //   const initialRedirect = async () => {
  //     if (walletData.accounts.length > 0) {
  //       return navigate('/dashboard');
  //     }
  //   };
  //   initialRedirect();
  // }, []);

  return <StartView onCreateClicked={() => navigate('/onboarding/create')} />;
};
