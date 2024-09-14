import { MenuBar } from '../../components/menu-bar.js';

type ReceiveViewProps = {
  publicKey: string;
  walletName: string;
  onGoBack: () => void;
  onCopyWalletAddress: () => void;
};

export const ReceiveView = ({ publicKey, walletName, onGoBack, onCopyWalletAddress }: ReceiveViewProps) => (
  <div className="flex flex-col flex-1 bg-[#1a2b3c]" data-testid="appLayout">
    <div className="flex flex-col flex-1">
      <MenuBar variant="card" onCloseClicked={onGoBack} />
      <div className="animate-in fade-in slide-in-from-bottom-8 px-8 pb-8">
        <h1 className="text-3xl mb-4">Your address</h1>
        <div className="flex flex-col text-center justify-center items-center space-y-8 card bg-accent p-8">
          <div className="space-y-3">
            <h2 className="text-2xl text-secondary">{walletName}</h2>
            <p className="text-secondary break-all">{publicKey}</p>
            <button type="button" className="btn btn-link text-secondary text-sm" onClick={onCopyWalletAddress}>
              Copy to clipboard
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);
