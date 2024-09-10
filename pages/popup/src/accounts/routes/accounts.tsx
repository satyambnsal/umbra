import React from 'react';
import { SwitchAccountView } from '../views/accounts.js';
import { useNavigate } from 'react-router-dom';

export interface Account {
  name: string;
  publicKey: string;
  balance: number;
  key: string;
}

export type AccountsArray = Account[];

export const AccountsRoute: React.FC = () => {
  const navigate = useNavigate();
  const clickBackBtn = () => {
    navigate(-1);
    console.log('back clicked');
  };

  return <SwitchAccountView onGoBack={clickBackBtn} />;
};
