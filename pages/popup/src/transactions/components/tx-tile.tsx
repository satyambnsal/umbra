import type { PayTransactionFull } from '@src/atoms.js';
import { TxIcon } from '@src/components/tx-icon.js';
import { clsx } from 'clsx';
import { Link } from 'react-router-dom';

type TxTileProps = {
  tx: PayTransactionFull;
  currentWalletAddress: string;
};

export const TxTile = ({ tx, currentWalletAddress }: TxTileProps) => {
  const { from, to, txHash, currencySymbol, amount, dateTime } = tx;
  const kind = from === currentWalletAddress ? 'outgoing' : to === currentWalletAddress ? 'incoming' : 'other';
  return (
    <Link key={txHash} to={`/transactions/${txHash}`} className={clsx('flex justify-between')}>
      <div className="flex space-x-4">
        <div className="w-12 h-12 flex items-center justify-center bg-base-100 rounded-full">
          <TxIcon kind={kind} />
        </div>
        <div>
          {kind === 'incoming' && <p>Received</p>}
          {kind === 'outgoing' && <p>Sent</p>}
          {kind === 'other' && <p>Staked</p>}
          <p className="text-[#7D7A9C]">{dateTime}</p>
        </div>
      </div>
      <div className="text-right">
        <p>{`${amount} ${currencySymbol}`}</p>
      </div>
    </Link>
  );
};
