import { useNavigate } from 'react-router-dom';
import { NotFoundView } from '../views/not-found.js';

// import { NotFoundView } from "../views/not-found"

export const NotFoundRoute = () => {
  const navigate = useNavigate();
  return <NotFoundView onGoBack={() => navigate(-1)} onGoToDashboard={() => navigate('/dashboard')} />;
};
