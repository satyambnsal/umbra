import { useAtom, useAtomValue } from 'jotai';
import { accountsAtom, currentWalletAtom } from '@src/atoms.js';

export const SwitchAccounts = () => {
  const [currentWallet, setCurrentWallet] = useAtom(currentWalletAtom);
  const accounts = useAtomValue(accountsAtom);
  return (
    <div className="flex flex-col flex-1 gap-4">
      <div className="flex flex-col">
        <h1 className="text-3xl mb-4">Switch Accounts</h1>

        <div className="flex flex-col gap-2">
          {accounts.map(account => {
            const isCurrentAccount =
              currentWallet?.account.getAddress().toShortString() === account.account.getAddress().toShortString();
            return (
              <button
                className={`card p-3 ${isCurrentAccount ? 'bg-primary text-secondary' : 'bg-secondary text-white'}`}
                onClick={() => {
                  setCurrentWallet(account);
                }}
                key={account.account.getAddress().toShortString()}>
                <p className="leading-none capitalize">{account.alias}</p>
                <p
                  className={`text-xs max-w-[200px] break-all ${
                    isCurrentAccount ? 'text-secondary/70' : 'text-white/70'
                  }`}>
                  {account.account.getAddress().toString()}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
