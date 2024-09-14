import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TransactionDetailsView } from '../views/transaction-details.js';

export const TransactionDetailsRoute = () => {
  const navigate = useNavigate();
  const { hash } = useParams();
  console.log('Transaction hash in params', hash);
  return <TransactionDetailsView onGoBack={() => navigate(-1)} hash={hash} />;
};
