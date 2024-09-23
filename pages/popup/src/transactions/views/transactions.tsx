// import React from 'react';
import { useState } from 'react';
import { MenuBar } from '../../components/menu-bar.js';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { Filter, X } from 'lucide-react';
import { currentWalletAtom, payTransactionsAtom } from '@src/atoms.js';
import { useAtomValue } from 'jotai';
import { TxTile } from '../components/tx-tile.js';
// import { TxTile } from '../../components/tx-tile.js';

const Filters = {
  all: 'All',
  sent: 'Sent',
  received: 'Received',
};

export const TransactionsView = () => {
  const currentWallet = useAtomValue(currentWalletAtom);
  const publicAddress = currentWallet ? currentWallet.account.getAddress().toString() : 'No Account found';
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [currentFilter, setCurrentFilter] = useState(Filters.all);
  const payTransactions = useAtomValue(payTransactionsAtom);

  return (
    <div className="flex flex-col flex-1 bg-[#1a2b3c]" data-testid="appLayout">
      <MenuBar variant="dashboard" />
      <div className="px-8 mt-1 flex items-center justify-between">
        <h2 className="text-3xl">Activity</h2>
        {true && (
          <button type="button" className="flex items-center space-x-1" onClick={() => setFiltersOpen(!filtersOpen)}>
            <p>Filters</p>
            {filtersOpen ? (
              <X width={24} height={24} className="text-[#F6C177] animate-in fade-in" />
            ) : (
              <Filter width={24} height={24} className="text-[#F6C177] animate-in fade-in" />
            )}
          </button>
        )}
      </div>
      {filtersOpen && (
        <div className="px-8 mt-5 flex space-x-1">
          {Object.values(Filters).map(filter => {
            return (
              <button
                key={filter}
                type="button"
                onClick={() => setCurrentFilter(filter)}
                className={clsx('btn', filter === currentFilter && 'btn-primary')}>
                {filter}
              </button>
            );
          })}
        </div>
      )}
      {payTransactions.length > 0 ? (
        <div className="px-8 pb-8 mt-6 divide-y divide-secondary">
          {payTransactions.map(tx => (
            <TxTile key={tx.txHash} tx={tx} currentWalletAddress={publicAddress} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col flex-1 items-center justify-center text-center">
          <p className="mb-2 text-xl">Nothing here yet :(</p>
          <p className="mb-4 w-64">
            Here you&apos;ll find details about your transactions. Fund your wallet to get started!
          </p>
          <Link to="/receive" className="w-36 btn btn-primary">
            Receive
          </Link>
        </div>
      )}
    </div>
  );
};
