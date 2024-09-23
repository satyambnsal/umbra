import { Link } from 'react-router-dom';
import { TxIcon } from './tx-icon.js';
import { formatCompact } from '../common/lib/numbers.js';
import type { PayTransactionFull } from '@src/atoms.js';

export const TxTile = ({ tx, currentWalletAddress }: { tx: PayTransactionFull; currentWalletAddress: string }) => {
  const formattedAmount = formatCompact({ value: tx.amount });
  const { from, to, txHash, currencySymbol } = tx;
  const kind = from === currentWalletAddress ? 'outgoing' : to === currentWalletAddress ? 'incoming' : 'other';

  return (
    <Link to={`/transactions/${txHash}`}>
      <div className="card bg-secondary p-4 aspect-square grid-col gap-1 justify-between">
        <div className="btn btn-circle bg-neutral">
          <TxIcon kind={kind} />
        </div>
        <div className="flex flex-col">
          <h3 className="mt-2 mr-1">{currencySymbol}</h3>
          <p>{formattedAmount}</p>
        </div>
      </div>
    </Link>
  );
};
