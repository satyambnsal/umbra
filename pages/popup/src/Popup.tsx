import '@src/Popup.css';
import './assets/app.css';

import { withErrorBoundary, withSuspense } from '@extension/shared';
// import { exampleThemeStorage } from '@extension/storage';
// import type { ComponentPropsWithoutRef } from 'react';
import LoadingScreen from './components/top-loading';
import { Router } from './router/router';
import { ThemeProvider } from 'next-themes';

const Popup = () => {
  return (
    <>
      <LoadingScreen isLoading={false}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Router />
        </ThemeProvider>
      </LoadingScreen>
    </>
  );
};

export default withErrorBoundary(withSuspense(Popup, <div> Loading ... </div>), <div> Error Occur </div>);
