import React from 'react';
import { WalletInfoForm } from '../components/wallet-info-form.js';

type CreateWalletViewProps = {
  onSubmit: (alias: string) => void;
  isProgress: boolean;
};

export const CreateWalletView = ({ onSubmit, isProgress }: CreateWalletViewProps) => (
  <WalletInfoForm title="Create Account" onSubmit={onSubmit} isProgress={isProgress} />
);
