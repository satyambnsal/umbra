import React from 'react';
import { MenuBar } from '../../components/menu-bar.js';
import { FromTo } from '../../components/from-to.js';
import dayjs from 'dayjs';
import { HashDropdown } from '../../components/hash-dropdown.js';
type TransactionDetailsViewProps = {
  onGoBack: () => void;
  hash: string | undefined;
};

export const TransactionDetailsView = ({ onGoBack, hash }: TransactionDetailsViewProps) => {
  return (
    <div className="flex flex-col flex-1 bg-[#1a2b3c]" data-testid="appLayout">
      <MenuBar variant="back" onBackClicked={onGoBack} />
      <div className="px-8 pb-6">
        <h2 className="text-3xl mb-6">Transaction detail</h2>
        <div className="space-y-2">
          <FromTo />
          <div className="py-3 px-4 space-y-4 bg-secondary rounded-2xl">
            <div className="flex items-center justify-between">
              <p className="text-[#7D7A9C]">Kind</p>
              <p className="text-right">{true ? 'Transaction' : 'Delegation'}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-[#7D7A9C]">Type</p>
              <p className="text-right">{true ? 'Received' : 'Sent'}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-[#7D7A9C]">Amount</p>
              <p className="text-right">{`12 ETH`}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-[#7D7A9C]">Date and time</p>
              <p className="text-right">{dayjs('2023-09-07T15:30:45Z' ?? '').format('DD/MM/YY - HH:mm')}</p>
            </div>
            <hr className="border-[#413E5E]" />
            <div className="flex items-center justify-between">
              <p className="text-[#7D7A9C]">Hash</p>
              <HashDropdown
                hash={'5Jv9uVqJUn8Qq5jhBTEsntXHav2QEk8Qh7JbzNwZNN4Xa3PbH8ef'}
                className="w-32 break-all text-right"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
