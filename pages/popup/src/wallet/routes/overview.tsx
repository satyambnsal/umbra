import { useAtomValue } from 'jotai';
import { OverviewView } from '../views/overview.js';
import { currentWalletAtom } from '@src/atoms.js';

export const OverviewRoute = () => {
  const currentWallet = useAtomValue(currentWalletAtom);
  const publicAddress = currentWallet ? currentWallet.account.getAddress().toString() : 'No Account found';

  return <OverviewView publicAddress={publicAddress} />;
};
