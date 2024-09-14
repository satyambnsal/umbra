import { TokenContract } from '@extension/storage/lib/types.js';
import clsx from 'clsx';
import { ArrowBigDown, ChevronDown } from 'lucide-react';

type SelectTokenDropdownProps = {
  tokenContracts: TokenContract[];
  selectedToken: TokenContract;
  selectToken: (token: TokenContract) => void;
};

export const SelectTokenDropdown = ({ tokenContracts, selectToken, selectedToken }: SelectTokenDropdownProps) => {
  const handleClick = () => {
    const elem = document.activeElement as HTMLLIElement;
    if (elem) {
      elem?.blur();
    }
  };

  return (
    <div className={clsx('dropdown', true && 'dropdown-end')}>
      <div
        role="button"
        tabIndex={0}
        className={clsx(
          'tooltip bg-secondary px-3 py-2 rounded-box cursor-pointer before:border-secondary before:border-2 before:max-w-screen before:break-all flex items-center gap-1',
        )}>
        {selectedToken.name}
        <ChevronDown />
      </div>
      <ul className="p-2 shadow menu dropdown-content border-2 border-secondary z-[1] bg-neutral rounded-box w-52">
        {tokenContracts &&
          tokenContracts.map(token => {
            return (
              <li onClick={handleClick} key={token?.symbol}>
                <button
                  type="button"
                  onClick={() => {
                    selectToken(token);
                  }}
                  className="flex gap-2">
                  <span className="font-semibold">{token?.symbol}</span>
                  <span>{token?.name}</span>
                </button>
              </li>
            );
          })}
      </ul>
    </div>
  );
};
