import { ArrowRightIcon } from 'lucide-react';
import { AddressDropdown } from './address-dropdown.js';

type FromToProps = {
  from: string;
  to: string;
};

export const FromTo = ({ from, to }: FromToProps) => {
  return (
    <div className="card bg-secondary py-3 px-4 flex flex-row justify-between mt-1">
      <div className="flex flex-col">
        <div className="text-[#7D7A9C]">From</div>
        <AddressDropdown publicKey={from} className="before:ml-20" type="Address" />
      </div>
      <div className="btn btn-circle btn-neutral text-mint">
        <ArrowRightIcon size={24} />
      </div>
      <div className="flex flex-col">
        <div className="text-[#7D7A9C]">To</div>
        <AddressDropdown publicKey={to} className="before:-ml-20" dropdownEnd type="Address" />
      </div>
    </div>
  );
};
