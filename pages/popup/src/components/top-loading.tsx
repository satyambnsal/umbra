import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import Logo from './../common/assets/logo.svg?react';
// import "./LoadingScreen.css";

interface LoadingScreenProps {
  isLoading: boolean;
  children: ReactNode;
}

const LoadingScreen = ({ isLoading, children }: LoadingScreenProps) => {
  const [showLoader, setShowLoader] = useState<boolean>(true);

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => setShowLoader(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  return (
    <div className="relative w-full h-screen">
      {showLoader && (
        <div className={`absolute inset-0 flex items-center justify-center ${isLoading ? '' : 'animate-fadeout'}`}>
          <Logo width={80} height={120} />
        </div>
      )}
      <div className={`transition-opacity duration-500 ${showLoader ? 'opacity-0' : 'opacity-100'}`}>{children}</div>
    </div>
  );
};

export default LoadingScreen;
