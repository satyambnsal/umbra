import { useEffect } from 'react';
import { StartView } from '../views/start.js';
import { useNavigate } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import { accountsAtom } from '@src/atoms.js';

export const StartRoute = () => {
  const navigate = useNavigate();
  const accounts = useAtomValue(accountsAtom);

  useEffect(() => {
    if (accounts.length > 0) {
      return navigate('/dashboard');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accounts]);

  return <StartView onCreateClicked={() => navigate('/onboarding/create')} />;
};
