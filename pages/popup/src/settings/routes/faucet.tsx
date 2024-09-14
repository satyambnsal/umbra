import { useNavigate } from 'react-router-dom';
import { FaucetView } from '../views/faucet.js';

export const FaucetRoute = () => {
  const navigate = useNavigate();
  return <FaucetView onCloseClicked={() => navigate(-1)} />;
};
