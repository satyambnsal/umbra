import { MenuBar } from '../../components/menu-bar.js';
import { FromTo } from '../../components/from-to.js';
import dayjs from 'dayjs';
import type { PayTransactionFull } from '@src/atoms.js';
import { RefreshCw } from 'lucide-react';
import { AddressDropdown } from '@src/components/address-dropdown.js';
type TransactionDetailsViewProps = {
  onGoBack: () => void;
  tx: PayTransactionFull | undefined;
  hash?: string;
  refetchTx: () => Promise<void>;
  isFetching: boolean;
};

export const TransactionDetailsView = ({ onGoBack, tx, hash, refetchTx, isFetching }: TransactionDetailsViewProps) => {
  if (!tx) {
    return <h3>No Transaction found for hash {hash}</h3>;
  }
  const {
    from,
    to,
    amount,
    currencySymbol,
    txHash,
    dateTime,
    status,
    tokenContractAddress,
    type,
    transactionFee,
    blockHash,
    blockNumber,
  } = tx;

  console.log('TXN', tx);

  return (
    <div className="flex flex-col flex-1 bg-[#1a2b3c]" data-testid="appLayout">
      <MenuBar variant="back" onBackClicked={onGoBack} />
      <div className="px-8 pb-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl">Transaction detail</h2>
          <button onClick={refetchTx}>
            <RefreshCw className={`${isFetching && 'animate-spin'}`} />
          </button>
        </div>
        <div className="space-y-2">
          <FromTo from={from} to={to} />
          <div className="py-3 px-4 space-y-4 bg-secondary rounded-2xl">
            <div className="flex items-center justify-between">
              <p className="text-[#7D7A9C]">Status</p>
              <p className="text-right">{status}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-[#7D7A9C]">Type</p>
              <p className="text-right">{type}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-[#7D7A9C]">Amount</p>
              <p className="text-right">{`${amount} ${currencySymbol}`}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-[#7D7A9C]">Date and time</p>
              <p className="text-right">{dayjs().format(dateTime)}</p>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-[#7D7A9C]">Token Contract Address</p>
              <p className="text-right">
                <AddressDropdown
                  className="before:-ml-20"
                  publicKey={tokenContractAddress}
                  dropdownEnd
                  type="Contract Address"
                />
              </p>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-[#7D7A9C]">Transaction fee</p>
              <p className="text-right">{transactionFee} Wei</p>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-[#7D7A9C]">Block Hash</p>
              <p className="text-right">
                <AddressDropdown
                  className="before:-ml-20"
                  publicKey={blockHash ? blockHash : ''}
                  dropdownEnd
                  type="Block Hash"
                />
              </p>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-[#7D7A9C]">Block Number</p>
              <p className="text-right">{blockNumber}</p>
            </div>

            <hr className="border-[#413E5E]" />
            <div className="flex items-center justify-between">
              <p className="text-[#7D7A9C]">Hash</p>
              <AddressDropdown className="before:-ml-20" publicKey={txHash} dropdownEnd type="Hash" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
