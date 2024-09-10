import React from 'react';
import { ArrowRightIcon } from 'lucide-react';
import { AddressDropdown } from './address-dropdown.js';

export const FromTo = () => {
  return (
    <div className="card bg-secondary py-3 px-4 flex flex-row justify-between mt-1">
      <div className="flex flex-col">
        <div className="text-[#7D7A9C]">From</div>
        <AddressDropdown publicKey="B62qk1KqJq2m59NJuPmHHWDFsejzc21Hr8gcHqWYfhM51dwpsVxtEQS" className="before:ml-20" />
      </div>
      <div className="btn btn-circle btn-neutral text-mint">
        <ArrowRightIcon size={24} />
      </div>
      <div className="flex flex-col">
        <div className="text-[#7D7A9C]">To</div>
        <AddressDropdown
          publicKey="B62qm8YHJAvZit7qRXwvmVTLsAwsX5GjRZ7APAtLmQZiPVAB5LjMdf8"
          className="before:-ml-20"
          dropdownEnd
        />
      </div>
    </div>
  );
};
