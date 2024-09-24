import { PlusIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const NewAddressForm = () => {
  const navigate = useNavigate();

  return (
    <form
      className="flex flex-col flex-1 gap-4"
      onSubmit={() => {
        navigate('/contacts');
      }}>
      <div className="gap-2">
        <label htmlFor="contactName">Contact&apos;s Name</label>
        <input id="contactName" placeholder="Name" data-testid="newAddress/nameInput" />
      </div>
      <div className="gap-2 flex-1">
        <label htmlFor="contactAddress">Receiver Address</label>
        <input id="contactAddress" placeholder="B62XXXXXXXXXXXX" data-testid="newAddress/addressInput" />
      </div>
      <button type="submit" className="group gap-2" data-testid="newAddress/createButton">
        <PlusIcon size={16} />
        <span>Create Contact</span>
      </button>
    </form>
  );
};
