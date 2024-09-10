import React from 'react';
import { WalletInfoForm } from '../components/wallet-info-form.js';

type CreateWalletViewProps = {
  onSubmit: () => void;
  isProgress: boolean;
};

export const CreateWalletView = ({ onSubmit, isProgress }: CreateWalletViewProps) => (
  <WalletInfoForm title="Create Wallet" onSubmit={onSubmit} isProgress={isProgress} />
);
