import clsx from 'clsx';
import { CopyIcon, ExternalLinkIcon } from 'lucide-react';
import { toast } from 'sonner';
import { truncateString } from '../common/lib/string.js';

type AddressDropdownProps = {
  publicKey: string;
  className?: string;
  dropdownEnd?: boolean;
  type: string;
};

export const AddressDropdown = ({ publicKey, className, dropdownEnd, type }: AddressDropdownProps) => {
  const handleClick = () => {
    const elem = document.activeElement as HTMLLIElement;
    if (elem) {
      elem?.blur();
    }
  };
  const copyType = async () => {
    await navigator.clipboard.writeText(publicKey);
    toast.success(`${type} Copied`);
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
          <button type="button" onClick={copyType} className="flex gap-2">
            <CopyIcon />
            <span>Copy {type}</span>
          </button>
        </li>
        <li onClick={handleClick}>
          <button
            type="button"
            onClick={() => {
              console.log('OPEN IN BROWSER CLICKED');
            }}
            className="flex gap-2">
            <ExternalLinkIcon />
            <span>Open in Browser</span>
          </button>
        </li>
      </ul>
    </div>
  );
};
