import { useNavigate } from 'react-router-dom';

import { NewNomineeView } from '../views/new-nominee';

export const NewNomineeRoute = () => {
  const navigate = useNavigate();
  // const addContact = useAddressBookStore(state => state.addContact);
  return (
    <NewNomineeView
      onGoBack={() => navigate(-1)}
      onSubmit={() => {
        navigate('/contacts');
      }}
    />
  );
};
