// import { formatCompact } from "@/common/lib/numbers";
// import { TxIcon } from "@/components/tx-icon";
import { Link } from 'react-router-dom';
import { TxIcon } from './tx-icon.js';
import { formatCompact } from '../common/lib/numbers.js';
import { PayTransactionFull } from '@src/atoms.js';
// import { formatCompact } from "../lib/numbers.js";

export const TxTile = ({ tx, currentWalletAddress }: { tx: PayTransactionFull; currentWalletAddress: string }) => {
  const formattedAmount = formatCompact({ value: tx.amount });
  const { from, to, txHash, currencySymbol } = tx;
  const kind = from === currentWalletAddress ? 'outgoing' : to === currentWalletAddress ? 'incoming' : 'other';

  return (
    <Link to={`/transactions/${txHash}`} className="[&:nth-child(3)]:hidden sm:[&:nth-child(3)]:flex">
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
