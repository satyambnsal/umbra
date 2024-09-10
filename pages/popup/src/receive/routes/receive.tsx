import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ReceiveView } from '../views/receive.js';
// import { useAccount } from "../../hooks/useAccounts.js";

export const ReceiveRoute = () => {
  const navigate = useNavigate();
  // const { copyWalletAddress } = useAccount();
  return (
    <ReceiveView
      publicKey={'987rkljcvsd8u90s9vuds'}
      walletName={'yash-aztec'}
      // onCopyWalletAddress={copyWalletAddress}
      onGoBack={() => navigate(-1)}
    />
  );
};
