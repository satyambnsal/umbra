import React from 'react';
import IncomingIcon from './../common/assets/incoming.svg?react';
import OutgoingIcon from './../common/assets/outgoing.svg?react';
import StakedIcon from './../common/assets/staked.svg?react';

export const TxIcon = ({ kind }: { kind: 'incoming' | 'outgoing' | 'other' }) => {
  if (kind === 'incoming') {
    return <IncomingIcon />;
  }
  if (kind === 'outgoing') {
    return <OutgoingIcon />;
  }
  return <StakedIcon />;
};
