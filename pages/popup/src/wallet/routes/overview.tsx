import { useAtomValue } from 'jotai';
import { OverviewView } from '../views/overview.js';
import { currentWalletAtom } from '@src/atoms.js';

const transactions = [
  {
    hash: '233oikjffwpoiuwu230ur029',
    amount: 2,
  },
  {
    hash: '233oikjffwpoiuwu230ur029asdf',
    amount: 2,
  },
];

export const OverviewRoute = () => {
  const currentWallet = useAtomValue(currentWalletAtom);
  const publicAddress = currentWallet ? currentWallet.account.getAddress().toString() : 'No Account found';

  return <OverviewView publicAddress={publicAddress} transactions={transactions} />;
};
