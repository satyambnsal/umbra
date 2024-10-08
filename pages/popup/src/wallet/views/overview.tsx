// import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MenuBar } from '../../components/menu-bar.js';
import { ArrowRightIcon, RefreshCw } from 'lucide-react';
import { TxTile } from '../../components/tx-tile.js';
import {
  currentTokenContractAtom,
  isPrivateAtom,
  payTransactionsAtom,
  privateBalanceAtom,
  publicBalanceAtom,
} from '@src/atoms.js';
import { useAtomValue } from 'jotai';
import { useBalance } from '@src/hooks/useBalance.js';

type OverviewViewProps = {
  publicAddress: string;
};

export const OverviewView = ({ publicAddress }: OverviewViewProps) => {
  const navigate = useNavigate();
  const currentTokenContract = useAtomValue(currentTokenContractAtom);
  const isPrivate = useAtomValue(isPrivateAtom);
  const { fetchBalance, isFetching } = useBalance();
  const publicBalance = useAtomValue(publicBalanceAtom);
  const privateBalance = useAtomValue(privateBalanceAtom);
  const payTransactions = useAtomValue(payTransactionsAtom);

  return (
    <div className="flex flex-col flex-1 bg-[#1a2b3c] max-w-[400px] mx-auto">
      <MenuBar variant="dashboard" publicAddress={publicAddress} />
      <div className="max-h-[460px] overflow-auto">
        <div className="card flex-col bg-secondary rounded-t-none px-8 pb-6 gap-12 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-primary text-base font-semibold">Portfolio value</h1>

            <button onClick={fetchBalance}>
              <RefreshCw className={`${isFetching && 'animate-spin'}`} />
            </button>
          </div>

          <h2 className="flex items-end">
            <span className="flex items-center text-4xl">
              <span className="mr-1">{currentTokenContract ? currentTokenContract.symbol : 'NA'}</span>
              {isPrivate ? privateBalance.toString() : publicBalance.toString()}
            </span>
          </h2>

          <div className="flex gap-4">
            <button
              type="button"
              className="flex-1 btn btn-primary"
              onClick={() => {
                navigate('/send');
              }}>
              Send
            </button>
            <button
              type="button"
              className="flex-1 btn btn-primary"
              onClick={() => {
                navigate('/receive');
              }}
              data-testid="dashboard/receive">
              Receive
            </button>
          </div>
        </div>

        <div className="flex flex-col px-8 py-4 gap-3 pb-16">
          <div className="flex justify-between items-end">
            <div className="flex flex-col gap-1">
              <p className="text-mint">Recent</p>
              <h2 className="text-xl">Transactions</h2>
            </div>
            <Link to="/transactions" className="flex items-center mb-[2px]">
              <span>See all</span>
              <span className="text-primary">
                <ArrowRightIcon />
              </span>
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {payTransactions.length > 0 ? (
              payTransactions.map(tx => <TxTile key={tx.txHash} tx={tx} currentWalletAddress={publicAddress} />)
            ) : (
              <p className="col-span-2">No transactions yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
