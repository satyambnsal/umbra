import { AddressBookView } from '../views/address-book.js';

const contacts = [
  {
    name: 'yash',
    address: 'B62qk1KqJq2m59NJuPmHHWDFsejzc21Hr8gcHqWYfhM51dwpsVxtEQS',
  },

  {
    name: 'yash 2',
    address: 'B62qnvHBRpBo5TX8LNJh6d2s9C7EraNChtKCmZhqxWnJ185UhZHWsi2',
  },

  {
    name: 'yash',
    address: 'string',
  },
];
export const AddressBookRoute = () => {
  const removeContact = () => console.log('REMOVE CONTACT');
  return <AddressBookView contacts={contacts} removeContact={removeContact} />;
};
