import '@src/Popup.css';
import './assets/app.css';
import { withErrorBoundary, withSuspense } from '@extension/shared';
import { exampleThemeStorage } from '@extension/storage';
import LoadingScreen from './components/top-loading';
import { ThemeProvider } from 'next-themes';
import { useCallback, useEffect, useState } from 'react';
import type { PXE } from '@aztec/aztec.js';
import { createPXEClient, waitForPXE } from '@aztec/aztec.js';
import { RPC_URL } from './constants';
import { Router } from './router/router.js';
import { walletStorage } from '@extension/storage';
import { pxeAtom } from './atoms.js';
import { useAtom } from 'jotai';
import { useStorage } from '@extension/shared';

const Popup = () => {
  const [pxeClient, setPXEClient] = useAtom(pxeAtom);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const walletData = useStorage(walletStorage);
  const handlePXEConnection = useCallback(() => {
    setErrorMessage('');
    setIsLoading(true);
    const pxe = createPXEClient(walletData.rpcUrl);
    waitForPXE(pxe)
      .then(() => setPXEClient(pxe))
      .catch(error => {
        setErrorMessage(error.toString());
      })
      .finally(() => {
        setIsLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [walletData.rpcUrl]);

  useEffect(() => {
    handlePXEConnection();
  }, [handlePXEConnection]);

  console.log('pxe client 44', pxeClient);
  return (
    <>
      <LoadingScreen isLoading={isLoading}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {isLoading && <p>is loading</p>}
          {errorMessage && (
            <div>
              <p>{errorMessage}</p>
              <button onClick={handlePXEConnection}>Try Reconnect</button>
            </div>
          )}
          {!isLoading && <Router />}
        </ThemeProvider>
      </LoadingScreen>
    </>
  );
};

export default withErrorBoundary(withSuspense(Popup, <div> Loading ... </div>), <div> Error Occur </div>);
