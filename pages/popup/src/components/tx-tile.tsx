// import { formatCompact } from "@/common/lib/numbers";
// import { TxIcon } from "@/components/tx-icon";
import React from 'react';
import { Link } from 'react-router-dom';
import { TxIcon } from './tx-icon.js';
import { formatCompact } from '../common/lib/numbers.js';
// import { formatCompact } from "../lib/numbers.js";

export const TxTile = ({ tx, currentWalletAddress }: { tx: any; currentWalletAddress: string }) => {
  const formattedAmount = formatCompact({ value: tx.amount });
  return (
    <Link
      to={`/transactions/${'5Jv9uVqJUn8Qq5jhBTEsntXHav2QEk8Qh7JbzNwZNN4Xa3PbH8ef'}`}
      className="[&:nth-child(3)]:hidden sm:[&:nth-child(3)]:flex">
      <div className="card bg-secondary p-4 aspect-square grid-col gap-1 justify-between">
        <div className="btn btn-circle bg-neutral">
          <TxIcon currentWalletAddress={currentWalletAddress} />
        </div>
        <div className="flex flex-col">
          <h3 className="mt-2">ETH</h3>
          <p>{formattedAmount}</p>
        </div>
      </div>
    </Link>
  );
};
