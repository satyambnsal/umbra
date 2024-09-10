type TxSide = 'outgoing' | 'incoming';

export const getTxSide = ({ tx, currentWalletAddress }: { tx: unknown; currentWalletAddress: string }): TxSide => {
  if (tx.to === currentWalletAddress) {
    return 'incoming';
  }
  return 'outgoing';
};

type TxKind = TxSide | 'delegation';

export const getTxKind = ({ tx, currentWalletAddress }: { tx: unknown; currentWalletAddress: string }): TxKind => {
  if (tx.type === 'any') return 'delegation';
  return getTxSide({ tx, currentWalletAddress });
};
