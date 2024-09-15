import AztecIcon from '../../common/assets/aztec.svg?react';
import { MenuBar } from '../../components/menu-bar.js';
import { Edit } from 'lucide-react';
import { useState } from 'react';
import { useRPC } from '@src/hooks/useRPC.js';

const NETWORKS = [
  {
    icon: AztecIcon,
    value: 'Sandbox',
    blockchain: 'Aztec',
    network: 'Sandbox',
    disabled: false,
  },
  {
    icon: AztecIcon,
    value: 'Devnet',
    blockchain: 'Aztec',
    network: 'Devnet',
    disabled: true,
  },
];

type NetworksViewProps = {
  onNetworkSwitch: (network: string) => Promise<void>;
  onCloseClicked: () => void;
};

export const NetworksView = ({ onCloseClicked }: NetworksViewProps) => {
  const [showRpcInput, setShowRpcInput] = useState(false);
  const { rpcUrl, setRpcUrlFn } = useRPC();
  const [rpcUrlInput, setRpcUrlInput] = useState(rpcUrl);

  return (
    <div className="flex flex-col flex-1">
      <MenuBar variant="wallet" onCloseClicked={onCloseClicked} currentNetwork={'Sandbox'} networkManagement />
      <div className="px-8 pb-8">
        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <h1>
              <span className="text-mint">Available</span>
              <br />
              <span className="text-2xl">Networks</span>
            </h1>
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-4 mt-6">
          {NETWORKS.map(entry => (
            <button
              type="button"
              key={entry.value}
              disabled={entry.disabled}
              className="card flex flex-row bg-secondary w-full py-2 px-4 justify-between items-center disabled:opacity-50 text-left"
              onClick={() => console.log('NETWORK SWITCHED')}>
              <div>
                <div className="flex items-center gap-2">
                  <div className="btn btn-circle">
                    <entry.icon width={24} height={24} />
                  </div>
                  <div>
                    <h2 className="text-lg">{entry.blockchain}</h2>
                    <p className="text-sm text-white/60">{rpcUrl}</p>
                  </div>
                </div>

                {showRpcInput && (
                  <div className="flex items-center gap-3">
                    <input
                      className="rounded-md px-2 py-1"
                      value={rpcUrlInput}
                      onChange={e => {
                        setRpcUrlInput(e.target.value);
                      }}
                    />
                    <button
                      onClick={() => {
                        setRpcUrlFn(rpcUrlInput);
                      }}
                      className="btn btn-primary btn-sm">
                      Set
                    </button>
                  </div>
                )}
              </div>

              <div className="">
                <h3 className="text-[#7D7A9C]">{entry.network}</h3>

                <button
                  onClick={() => {
                    setShowRpcInput(!showRpcInput);
                  }}>
                  <Edit size={14} />
                </button>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
