import { useNavigate } from 'react-router-dom';
import { KeysView } from '../views/keys.js';

export const KeysRoute = () => {
  const navigate = useNavigate();
  return <KeysView onCloseClicked={() => navigate(-1)} />;
};
