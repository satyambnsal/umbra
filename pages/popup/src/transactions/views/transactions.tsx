import React from 'react';
import { useState } from 'react';
import { formatCompact } from '../../common/lib/numbers.js';
import dayjs from 'dayjs';
import { MenuBar } from '../../components/menu-bar.js';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { Filter, X } from 'lucide-react';
import { getTxSide } from '../../common/lib/tx.js';
import { TxTile } from '../../components/tx-tile.js';

const Filters = {
  all: 'All',
  sent: 'Sent',
  received: 'Received',
};

const transactions = [
  {
    hash: '233oikjffwpoiuwu230ur029',
    publicAddress: 'lsjfkldsjsadflj',
    amount: 2,
  },
  {
    hash: '233oikjffwpoiuwu230ur029asdf',
    publicAddress: 'lsjfkldsjsadflj',
    amount: 2,
  },
];

type TransactionsViewProps = {
  pendingHashes: string[];
  openPendingTransactions: () => void;
};

const dateFromNow = (dateTime: string) => {
  const now = dayjs();
  const date = dayjs(dateTime);
  return date.format('DD MMM YYYY');
};

const structurizeTx = (tx: any, fiatPrice: number) => {
  const rawAmount = Number(tx.amount);
  const minaAmount = formatCompact({ value: rawAmount });
  return {
    ...tx,
    date: dateFromNow(tx.dateTime!),
    time: dayjs(tx.dateTime!).format('HH:mm'),
    minaAmount,
    fiatAmount: Number(rawAmount * fiatPrice).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    }),
  };
};
const transactionsError = false;

const fiatPrice = 1;
const publicKey = '239p8vdf09efjef';

export const TransactionsView = ({ pendingHashes, openPendingTransactions }: TransactionsViewProps) => {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [currentFilter, setCurrentFilter] = useState(Filters.all);
  const showTransactions = transactions.length > 0 && !transactionsError;

  const txs = transactions.map(tx => structurizeTx(tx, fiatPrice));

  const txsFiltered = txs.filter(tx => {
    if (currentFilter === Filters.all) return true;
    const side = getTxSide({ tx, currentWalletAddress: publicKey });
    return side === (currentFilter === Filters.sent ? 'outgoing' : 'incoming');
  });
  // const txsGrouped = groupBy((tx) => tx.date, txsFiltered);

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
      {showTransactions ? (
        <div className="px-8 pb-8 mt-6 space-y-4">
          {pendingHashes.length > 0 && (
            <p data-testid="transactions/pendingTransactions">
              There are pending transactions.{' '}
              <button type="button" onClick={openPendingTransactions}>
                Preview
              </button>
            </p>
          )}
          {/* {(txs) => (
            <div key={txs[0].date} className="flex flex-col space-y-4">
              <p>809 09 09</p>
              {transactions.map((tx) => (
                <TxTile
                  key={tx.hash}
                  tx={tx}
                  // currentWalletAddress={publicKey}
                />
              ))}
            </div>
          )} */}
        </div>
      ) : (
        <div className="flex flex-col flex-1 items-center justify-center text-center">
          <p className="mb-2 text-xl">Nothing here yet :(</p>
          <p className="mb-4 w-64">
            Here you'll find details about your transactions. Fund your wallet to get started!
          </p>
          <Link to="/receive" className="w-36 btn btn-primary">
            Receive
          </Link>
        </div>
      )}
    </div>
  );
};
