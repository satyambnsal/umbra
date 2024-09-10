import React from 'react';
import { MenuBar } from '../../components/menu-bar.js';
import { SwitchAccounts } from '../components/switch-account.js';

type SendViewProps = {
  onGoBack: () => void;
};

export const SwitchAccountView = ({ onGoBack }: SendViewProps) => {
  return (
    <div className="flex flex-col flex-1 bg-[#1a2b3c]">
      <MenuBar variant="back" onBackClicked={onGoBack} />
      <div className="flex flex-col flex-1 px-8">
        <SwitchAccounts />
      </div>
    </div>
  );
};
