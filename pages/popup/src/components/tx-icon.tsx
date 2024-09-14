import React from 'react';
import IncomingIcon from './../common/assets/incoming.svg?react';
import OutgoingIcon from './../common/assets/outgoing.svg?react';
import StakedIcon from './../common/assets/staked.svg?react';

export const TxIcon = ({ currentWalletAddress }: { currentWalletAddress: string }) => {
  // TODO: According to current wallet address and tx get if the transaction is  "delegation" , "incoming" or "outgoing"
  const kind = false ? 'delegation' : 'incoming';
  if (kind === 'delegation') {
    return <StakedIcon />;
  }
  if (kind === 'incoming') {
    return <IncomingIcon />;
  }
  return <OutgoingIcon />;
};
