// import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MenuBar } from '../../components/menu-bar.js';
import { ArrowRightIcon, Loader2Icon } from 'lucide-react';
import { TxTile } from '../../components/tx-tile.js';

type OverviewViewProps = {
  publicAddress: string;
  transactions: any;
  isProgress: boolean;
  handleDeployToken: () => void;
};

export const OverviewView = ({ transactions, publicAddress, isProgress, handleDeployToken }: OverviewViewProps) => {
  const navigate = useNavigate();
  console.log('PUBLIC ADDRESS IN OVERVIEW', publicAddress);

  return (
    <div className="flex flex-col flex-1 bg-[#1a2b3c] max-w-[400px] mx-auto">
      <MenuBar variant="dashboard" publicAddress={publicAddress} />
      <div className="max-h-[460px] overflow-auto">
        <div className="card flex-col bg-secondary rounded-t-none px-8 pb-6 gap-12 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-primary text-base font-semibold">Portfolio value</h1>
            <button type="button" className="btn btn-sm btn-primary" onClick={handleDeployToken}>
              Deploy token
              {isProgress && <Loader2Icon className="animate-spin" size={16} />}
            </button>
          </div>
          <h2 className="flex items-end">
            <span className="flex items-center text-4xl">
              <span className="mr-1">ETH</span>
              20.78
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
            {transactions.length > 0 ? (
              transactions.map(tx => <TxTile key={tx.hash} tx={tx} currentWalletAddress={publicAddress} />)
            ) : (
              <p className="col-span-2">No transactions yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
