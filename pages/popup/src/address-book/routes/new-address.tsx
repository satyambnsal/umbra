import { useNavigate } from 'react-router-dom';
import { NewAddressView } from '../views/new-address.js';

export const NewAddressRoute = () => {
  const navigate = useNavigate();
  const addContact = () => console.log('ADD CONTACT');
  return (
    <NewAddressView
      onGoBack={() => navigate(-1)}
      onSubmit={() => {
        addContact();
        navigate('/contacts');
      }}
    />
  );
};
