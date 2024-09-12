import React, { useEffect } from 'react';
import { StartView } from '../views/start.js';
import { useNavigate } from 'react-router-dom';

export const StartRoute = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const initialRedirect = async () => {
      const walletAddress = localStorage.getItem('wallet-address');

      if (walletAddress) {
        return navigate('/dashboard');
      }
    };
    initialRedirect();
  }, []);
  return <StartView onCreateClicked={() => navigate('/onboarding/create')} />;
};
