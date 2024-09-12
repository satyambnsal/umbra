import AztecIcon from '../../common/assets/aztec.svg?react';
// import ZekoIcon from "@/common/assets/zeko.svg?react"
// import { MenuBar } from "@/components/menu-bar"
import { MenuBar } from '../../components/menu-bar.js';

const NETWORKS = [
  {
    icon: AztecIcon,
    value: 'Mainnet',
    blockchain: 'Aztec',
    network: 'Mainnet',
  },
  {
    icon: AztecIcon,
    value: 'Devnet',
    blockchain: 'Aztec',
    network: 'Devnet',
  },
];

type NetworksViewProps = {
  onNetworkSwitch: (network: string) => Promise<void>;
  onCloseClicked: () => void;
};

export const NetworksView = ({ onCloseClicked }: NetworksViewProps) => {
  return (
    <div className="flex flex-col flex-1">
      <MenuBar variant="wallet" onCloseClicked={onCloseClicked} currentNetwork={'Mainnet'} networkManagement />
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
              className="card flex flex-row bg-secondary w-full py-2 px-4 justify-between items-center"
              onClick={() => console.log('NETWORK SWITCHED')}>
              <div className="flex items-center gap-2">
                <div className="btn btn-circle">
                  <entry.icon width={24} height={24} />
                </div>
                <h2 className="text-lg">{entry.blockchain}</h2>
              </div>
              <h3 className="text-[#7D7A9C]">{entry.network}</h3>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
