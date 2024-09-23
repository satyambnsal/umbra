import { Loader2Icon } from 'lucide-react';
import { useState } from 'react';
import { useAccount } from '@src/hooks/useAccount.js';
import { useAtom } from 'jotai';
import { accountsAtom, currentWalletAtom } from '@src/atoms.js';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

export const ImportAccounts = () => {
  const [alias, setAlias] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const { recoverAccount } = useAccount();
  const [isProgress, setIsProgress] = useState(false);
  const [accounts, setAccounts] = useAtom(accountsAtom);
  const [currentWallet, setCurrentWallet] = useAtom(currentWalletAtom);
  const navigate = useNavigate();

  const handleRecoverAccount = async (alias: string, privateKey: string) => {
    setIsProgress(true);
    const recoveredAccount = await recoverAccount(alias, privateKey);
    console.log('recovered account', recoveredAccount, alias);
    if (recoveredAccount) {
      setAccounts([...accounts, { alias, account: recoveredAccount }]);
    }
    if (recoveredAccount && !currentWallet) {
      setCurrentWallet({ alias, account: recoveredAccount });
    }
    setIsProgress(false);
    toast(<>Account {recoveredAccount?.getAddress().toString()} recovered successfully</>);
    navigate('/dashboard');
  };

  return (
    <div className="flex flex-col flex-1 gap-4">
      <div className="flex flex-col">
        <h1 className="text-3xl mb-4">Import Accounts</h1>
        <div className="flex flex-col">
          <div className="flex flex-col gap-3">
            <div>
              <label htmlFor="walletNameInput" className="label">
                Alias
              </label>
              <input
                placeholder="Account name"
                className="input w-full"
                autoComplete="off"
                value={alias}
                onChange={e => {
                  setAlias(e.target.value);
                }}
              />
            </div>

            <div>
              <label htmlFor="walletNameInput" className="label">
                Put your Private key here
              </label>
              <textarea
                name=""
                id=""
                placeholder="Private key..."
                className="textarea w-full rounded-md"
                autoComplete="off"
                value={privateKey}
                rows={3}
                onChange={e => {
                  setPrivateKey(e.target.value);
                }}></textarea>
            </div>
          </div>

          <button
            type="button"
            className="btn btn-primary max-w-48 w-full"
            onClick={() => {
              handleRecoverAccount(alias, privateKey);
            }}
            data-testid="formSubmit"
            disabled={isProgress || !privateKey.length || !alias}>
            <span>Next</span>

            {isProgress ? <Loader2Icon className="animate-spin" size={16} /> : ''}
          </button>
        </div>
      </div>
    </div>
  );
};
