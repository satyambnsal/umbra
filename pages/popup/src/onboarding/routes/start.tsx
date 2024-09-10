import React from 'react';
import { StartView } from '../views/start.js';
import { useNavigate } from 'react-router-dom';

export const StartRoute = () => {
  const navigate = useNavigate();
  return <StartView onCreateClicked={() => navigate('/onboarding/create')} />;
};
