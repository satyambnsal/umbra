import React, { useState } from 'react';
import { truncateString } from '../../common/lib/string.js';
import type { AccountsArray } from '../routes/accounts.js';

const ACCOUNTS: AccountsArray = [
  {
    name: 'yash-aztec',
    publicKey: 'B62qk1KqJq2m59NJuPmHHWDFsejzc21Hr8gcHqWYfhM51dwpsVxtEQS',
    balance: 12,
    key: '0',
  },
  {
    name: 'yash-aztec',
    publicKey: 'B62qk1KqJq2m59NJuPmHHWDFsejzc21Hr8gcHqWYfhM51dwpsVxtEQS',
    balance: 12,
    key: '1',
  },
];

export const SwitchAccounts = () => {
  const [selectedAccount, setSelectedAccount] = useState(ACCOUNTS[0]);
  return (
    <div className="flex flex-col flex-1 gap-4">
      <div className="flex flex-col">
        <h1 className="text-3xl mb-4">Switch Accounts</h1>

        <div className="flex flex-col gap-2">
          {ACCOUNTS.map(account => {
            return (
              <button
                className={`card p-3 ${
                  selectedAccount.key === account.key ? 'bg-primary text-secondary' : 'bg-secondary text-white'
                }`}
                onClick={() => {
                  setSelectedAccount(ACCOUNTS[Number(account.key)]);
                }}
                key={account.key}>
                <p className="leading-none">Account-1</p>
                <p
                  className={`text-xs max-w-[200px] ${
                    selectedAccount.key === account.key ? 'text-secondary/70' : 'text-white/70'
                  }`}>
                  {truncateString({
                    value: 'B62qk1KqJq2m59NJuPmHHWDFsejzc21Hr8gcHqWYfhM51dwpsVxtEQS' ?? '',
                    firstCharCount: 12,
                    endCharCount: 12,
                  })}
                </p>

                <p className="mt-2">{account.balance} ETH</p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
