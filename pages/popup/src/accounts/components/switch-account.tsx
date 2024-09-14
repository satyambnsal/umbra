import { useAtom, useAtomValue } from 'jotai';
import { accountsAtom, currentWalletAtom } from '@src/atoms.js';
import { OptionCard } from '@src/onboarding/views/start.js';
import { Copy, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const SwitchAccounts = () => {
  const [currentWallet, setCurrentWallet] = useAtom(currentWalletAtom);
  const accounts = useAtomValue(accountsAtom);
  const navigate = useNavigate();

  const copyAddress = async (walletAddress: string) => {
    await navigator.clipboard.writeText(walletAddress);
    toast.success('Address Copied');
  };

  return (
    <div className="flex flex-col flex-1 gap-4">
      <div className="flex flex-col">
        <h1 className="text-3xl mb-4">Switch Accounts</h1>

        <div className="flex flex-col gap-2">
          {accounts.map(account => {
            const isCurrentAccount =
              currentWallet?.account.getAddress().toShortString() === account.account.getAddress().toShortString();
            const walletAddress = account.account.getAddress().toString();
            return (
              <button
                className={`card p-3 text-left ${isCurrentAccount ? 'bg-primary text-secondary' : 'bg-secondary text-white'}`}
                onClick={() => {
                  setCurrentWallet(account);
                }}
                key={account.account.getAddress().toShortString()}>
                <p className="leading-none capitalize">{account.alias}</p>
                <div className="flex items-center justify-between gap-2">
                  <p
                    className={`text-xs max-w-[255px] break-all ${
                      isCurrentAccount ? 'text-secondary/70' : 'text-white/70'
                    }`}>
                    {walletAddress}
                  </p>

                  <button
                    onClick={e => {
                      e.stopPropagation();
                      copyAddress(walletAddress);
                    }}>
                    <Copy />
                  </button>
                </div>
              </button>
            );
          })}
        </div>
      </div>
      <hr className="border border-primary/30"></hr>
      <div className="flex w-full flex-col gap-2">
        <OptionCard
          title="Create a new wallet"
          description="Get a fresh address"
          icon={<Plus />}
          onClick={() => navigate('/onboarding/create')}
          testId="onboarding/createWalletButton"
        />
      </div>
    </div>
  );
};
