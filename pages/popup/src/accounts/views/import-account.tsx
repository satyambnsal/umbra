import { MenuBar } from '../../components/menu-bar.js';
import { ImportAccounts } from '../components/import-account.js';

type ImportAccountProps = {
  onGoBack: () => void;
};

export const ImportAccountsView = ({ onGoBack }: ImportAccountProps) => {
  return (
    <div className="flex flex-col flex-1 bg-[#1a2b3c]">
      <MenuBar variant="back" onBackClicked={onGoBack} />
      <div className="flex flex-col flex-1 px-8">
        <ImportAccounts />
      </div>
    </div>
  );
};
