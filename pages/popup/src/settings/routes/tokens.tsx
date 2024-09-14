import { useNavigate } from 'react-router-dom';

import { TokensView } from '../views/tokens.js';

export const TokensRoute = () => {
  const navigate = useNavigate();
  return <TokensView onCloseClicked={() => navigate(-1)} />;
};
