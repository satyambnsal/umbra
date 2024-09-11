import { EyeIcon } from 'lucide-react';
import { SettingsPageLayout } from '@src/components/settings-page-layout';

const ButtonWrapperStyles = 'flex items-center justify-between p-6 rounded-xl bg-secondary';

type keysViewProps = {
  onCloseClicked: () => void;
};

export const KeysView = ({ onCloseClicked }: keysViewProps) => {
  return (
    <div className="flex flex-col flex-1 bg-[#1a2b3c]" data-testid="appLayout">
      <SettingsPageLayout title="Keys" onCloseClicked={onCloseClicked}>
        <div className="flex flex-col space-y-2">
          <a href="/" target="_blank" rel="noreferrer" className={ButtonWrapperStyles}>
            <p>Private Key</p>
            <EyeIcon width={24} height={24} className="text-[#F6C177]" />
          </a>
        </div>
      </SettingsPageLayout>
    </div>
  );
};
