import { MenuBar } from '../../components/menu-bar.js';
import { SendForm } from '../components/send-form.js';

type SendViewProps = {
  onGoBack: () => void;
  balance: number;
  currentNetwork: string;
  sendToken: (receiverAddress: string, amount: string) => void;
  isProgress: boolean;
};

export const SendView = ({ onGoBack, currentNetwork, sendToken, isProgress }: SendViewProps) => {
  return (
    <div className="flex flex-col flex-1 bg-[#1a2b3c]">
      <MenuBar variant="wallet" onCloseClicked={onGoBack} currentNetwork={currentNetwork} />
      <div className="flex flex-col flex-1 px-8">
        <SendForm sendToken={sendToken} isProgress={isProgress} />
      </div>
    </div>
  );
};
