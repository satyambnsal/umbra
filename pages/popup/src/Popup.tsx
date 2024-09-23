import '@src/Popup.css';
import './assets/app.css';
import { ThemeProvider } from 'next-themes';
import { useEffect, useState } from 'react';
import { createDebugLogger, createPXEClient, waitForPXE } from '@aztec/aztec.js';
import { Router } from './router/router.js';
import { pxeAtom, rpcUrlAtom } from './atoms.js';
import { useAtom, useAtomValue } from 'jotai';
import { withErrorBoundary, withSuspense } from '@extension/shared';
// import LoadingScreen from './components/top-loading.js';
import { ErrorMessage } from './components/ErrorMsg.js';
import { LoadingScreen } from './components/top-loading.js';
import { useRPC } from './hooks/useRPC.js';

const debugLogger = createDebugLogger('umbra-logger');

const Popup = () => {
  console.log('POPUP STARTS');
  const [pxeClient, setPXEClient] = useAtom(pxeAtom);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const rpcUrl = useAtomValue(rpcUrlAtom);
  const { initRPCUrl } = useRPC();

  const handlePXEConnection = async () => {
    try {
      setErrorMessage('');
      setIsLoading(true);
      console.log('PXE URL', rpcUrl);
      const pxe = createPXEClient(rpcUrl);
      await waitForPXE(pxe, debugLogger);
      setPXEClient(pxe);
    } catch (error: any) {
      setErrorMessage(error.toString());
      console.error('ERROR FETCHING PXE', error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    initRPCUrl();
    handlePXEConnection();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log('pxe client 44', pxeClient);
  return (
    <>
      {/* <LoadingScreen isLoading={isLoading} errorMessage={errorMessage}> */}
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {!!isLoading && <LoadingScreen />}
        {!!errorMessage && <ErrorMessage errorMessage={errorMessage} handlePXEConnection={handlePXEConnection} />}
        {!isLoading && !errorMessage && <Router />}
      </ThemeProvider>
      {/* </LoadingScreen> */}
    </>
  );
};

export default withErrorBoundary(withSuspense(Popup, <div> Loading ... </div>), <div> Error Occur </div>);
