import React from 'react';
import { MenuBar } from '../../components/menu-bar.js';
import { SendForm } from '../components/send-form.js';

type SendViewProps = {
  onGoBack: () => void;
  balance: number;
  fiatPrice: number;
  advanced: boolean;
  setAdvanced: (advanced: boolean) => void;
  currentNetwork: string;
};

export const SendView = ({ onGoBack, currentNetwork }: SendViewProps) => {
  return (
    <div className="flex flex-col flex-1 bg-[#1a2b3c]">
      <MenuBar variant="wallet" onCloseClicked={onGoBack} currentNetwork={currentNetwork} />
      <div className="flex flex-col flex-1 px-8">
        <SendForm />
      </div>
    </div>
  );
};
