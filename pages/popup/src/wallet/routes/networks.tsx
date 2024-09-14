import { useNavigate } from 'react-router-dom';
import { NetworksView } from '../views/networks.js';

export const NetworksRoute = () => {
  const navigate = useNavigate();
  const onNetworkSwitch = async () => {
    navigate('/dashboard');
  };
  return <NetworksView onCloseClicked={() => navigate(-1)} onNetworkSwitch={onNetworkSwitch} />;
};
