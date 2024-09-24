import { useNavigate } from 'react-router-dom';
import { truncateString } from '@src/common/lib/string.js';
import type { Contact } from '@src/common/types.js';

interface ContactTileProps {
  contact: Contact;
  index?: number;
}

export const ContactTile = ({ contact }: ContactTileProps) => {
  const navigate = useNavigate();
  // const removeContact = useAddressBookStore((state) => state.removeContact);
  return (
    <div className="card flex items-center justify-between p-1" data-testid="addressBook/contact">
      <div className="flex items-center justify-center">
        <button
          type="button"
          className="text-sky-400"
          onClick={() => navigate('/send', { state: { address: contact.address } })}
          data-testid="addressBook/contactName">
          <div className="badge">{contact.name}</div>
        </button>
      </div>
      <div className="flex items-center gap-2">
        <p className="text-sm break-keep truncate pr-2">
          {contact?.address &&
            truncateString({
              value: contact.address,
              firstCharCount: 4,
              endCharCount: 4,
            })}
        </p>
      </div>
    </div>
  );
};
