import '@src/Popup.css';
import './assets/app.css';

import { withErrorBoundary, withSuspense } from '@extension/shared';
// import { exampleThemeStorage } from '@extension/storage';
// import type { ComponentPropsWithoutRef } from 'react';
import LoadingScreen from './components/top-loading';
import { Router } from './router/router';
import { ThemeProvider } from 'next-themes';
import { useEffect, useState } from 'react';
import type { PXE } from '@aztec/aztec.js';
import { createPXEClient, waitForPXE } from '@aztec/aztec.js';
import { RPC_URL } from './constants';

const Popup = () => {
  const [pxeClient, setPXEClient] = useState<PXE>();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  useEffect(() => {
    setErrorMessage('');
    setIsLoading(true);
    const pxe = createPXEClient(RPC_URL);
    waitForPXE(pxe)
      .then(_ => setPXEClient(pxe))
      .catch(error => {
        setErrorMessage(error.toString());
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  console.log('pxe client', pxeClient);
  return (
    <>
      <LoadingScreen isLoading={false}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {isLoading && <p>is loading</p>}
          {errorMessage && <p>{errorMessage}</p>}
          {/* <Router /> */}
        </ThemeProvider>
      </LoadingScreen>
    </>
  );
};

export default withErrorBoundary(withSuspense(Popup, <div> Loading ... </div>), <div> Error Occur </div>);
