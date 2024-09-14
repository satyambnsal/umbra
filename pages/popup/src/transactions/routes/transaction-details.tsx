import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TransactionDetailsView } from '../views/transaction-details.js';

export const TransactionDetailsRoute = () => {
  const navigate = useNavigate();
  const { hash } = useParams();
  return <TransactionDetailsView onGoBack={() => navigate(-1)} hash={hash} />;
};
