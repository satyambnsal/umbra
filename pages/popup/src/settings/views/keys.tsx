import React, { useState } from 'react';
import { SettingsPageLayout } from '@src/components/settings-page-layout.js';
import { Copy, EyeIcon, EyeOffIcon } from 'lucide-react';
import { useAtomValue } from 'jotai';
import { currentWalletAtom } from '@src/atoms.js';
import { toast } from 'sonner';

type KeysViewProps = {
  onCloseClicked: () => void;
};

export const KeysView = ({ onCloseClicked }: KeysViewProps) => {
  const [showPrivateKey, setShowPrivateKey] = useState(false);
  const currentWallet = useAtomValue(currentWalletAtom);
  const privateKey = currentWallet?.account.getSecretKey().toString();
  const togglePrivateKey = () => setShowPrivateKey(!showPrivateKey);

  const copyPrivateAddress = async () => {
    await navigator.clipboard.writeText(privateKey);
    toast.success('Private key copied successfully');
  };

  return (
    <div className="flex flex-col flex-1 bg-[#1a2b3c]" data-testid="appLayout">
      <SettingsPageLayout title="Keys" onCloseClicked={onCloseClicked}>
        <div className="flex flex-col space-y-4 p-4">
          <div className="bg-[#273a4f] rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-white text-lg font-semibold">Private Key</p>
              <button onClick={togglePrivateKey} className="text-[#F6C177] hover:text-[#f8d199] transition-colors">
                {showPrivateKey ? <EyeOffIcon width={24} height={24} /> : <EyeIcon width={24} height={24} />}
              </button>
            </div>
            <div className="bg-[#1f2937] rounded-lg p-3 flex gap-3 items-center justify-between">
              <p className="text-gray-300 font-mono break-all">{showPrivateKey ? privateKey : '•••••••••••••••••••'}</p>

              <button onClick={copyPrivateAddress}>
                <Copy />
              </button>
            </div>
          </div>
        </div>
      </SettingsPageLayout>
    </div>
  );
};
