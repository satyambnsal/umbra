import { useNavigate } from 'react-router-dom';
import { SettingsView } from '../views/settings.js';

export const SettingsRoute = () => {
  const navigate = useNavigate();
  const onDonateClicked = () => {
    navigate('/send', {
      state: {
        address: 'B62qnVUL6A53E4ZaGd3qbTr6RCtEZYTu3kTijVrrquNpPo4d3MuJ3nb',
      },
    });
  };
  return (
    <SettingsView
      onCloseClicked={() => navigate(-1)}
      onDonateClicked={onDonateClicked}
      onLogOut={() => {
        console.log('LOGOUT');
      }}
    />
  );
};
