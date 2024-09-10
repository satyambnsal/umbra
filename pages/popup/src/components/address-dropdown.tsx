import React from 'react';
import clsx from 'clsx';
import { CopyIcon, ExternalLinkIcon, UserPlusIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { truncateString } from '../common/lib/string.js';

type AddressDropdownProps = {
  publicKey: string;
  className?: string;
  dropdownEnd?: boolean;
};

export const AddressDropdown = ({ publicKey, className, dropdownEnd }: AddressDropdownProps) => {
  const handleClick = () => {
    const elem = document.activeElement as HTMLLIElement;
    if (elem) {
      elem?.blur();
    }
  };
  const copyAddress = async () => {
    await navigator.clipboard.writeText(publicKey);
    toast.success('Address Copied');
  };
  const openInExplorer = () => {
    const url = 'www.google.com';
    window.open(url, '_blank')?.focus();
  };
  return (
    <div className={clsx('dropdown', dropdownEnd && 'dropdown-end')}>
      <div
        role="button"
        tabIndex={0}
        className={clsx(
          'tooltip cursor-pointer before:border-secondary before:border-2 before:max-w-screen before:break-all',
          className,
        )}
        data-tip={publicKey}>
        {truncateString({
          value: publicKey,
          endCharCount: 3,
          firstCharCount: 5,
        })}
      </div>
      <ul className="p-2 shadow menu dropdown-content border-2 border-secondary z-[1] bg-neutral rounded-box w-52">
        <li onClick={handleClick}>
          <button type="button" onClick={copyAddress} className="flex gap-2">
            <CopyIcon />
            <span>Copy Address</span>
          </button>
        </li>
        <li onClick={handleClick}>
          <button type="button" onClick={openInExplorer} className="flex gap-2">
            <ExternalLinkIcon />
            <span>Open in Browser</span>
          </button>
        </li>
      </ul>
    </div>
  );
};
