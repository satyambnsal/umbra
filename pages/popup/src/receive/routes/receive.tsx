import { useNavigate } from 'react-router-dom';
import { ReceiveView } from '../views/receive.js';
import { currentWalletAtom } from '@src/atoms.js';
import { useAtomValue } from 'jotai';
import { toast } from 'sonner';

export const ReceiveRoute = () => {
  const navigate = useNavigate();
  const currentWallet = useAtomValue(currentWalletAtom);
  const publicAddress = currentWallet ? currentWallet.account.getAddress().toString() : 'No Account found';
  const walletName = currentWallet ? currentWallet.alias : '';

  const copyWalletAddress = async () => {
    await navigator.clipboard.writeText(publicAddress ?? '');
    toast.success(`Address ${publicAddress} copied`);
  };

  return (
    <ReceiveView
      publicKey={publicAddress}
      walletName={walletName}
      onCopyWalletAddress={copyWalletAddress}
      onGoBack={() => navigate(-1)}
    />
  );
};
