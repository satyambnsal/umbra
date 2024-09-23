import { useNavigate } from 'react-router-dom';
import { ImportAccountsView } from '../views/import-account.js';

export const ImportAccountsRoute: React.FC = () => {
  const navigate = useNavigate();
  const clickBackBtn = () => {
    navigate(-1);
  };

  return <ImportAccountsView onGoBack={clickBackBtn} />;
};
