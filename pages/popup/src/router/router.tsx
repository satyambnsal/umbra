import { ErrorBoundary } from 'react-error-boundary';
import { Toaster } from 'sonner';
import { MemoryRouter, Outlet, Route, Routes } from 'react-router-dom';
import React from 'react';
import { ErrorView } from '../error-renderer/views/error.js';
import { StartRoute } from '../onboarding/routes/start.js';
import { CreateWalletRoute } from '../onboarding/routes/create-wallet.js';
import { OverviewRoute } from '../wallet/routes/overview.js';
import { ReceiveRoute } from '../receive/routes/receive.js';
import { AccountsRoute } from '../accounts/routes/accounts.js';
import { TransactionsRoute } from '../transactions/routes/transactions.js';
import { TransactionDetailsRoute } from '../transactions/routes/transaction-details.js';
import { NetworksRoute } from '../wallet/routes/networks.js';
import { SendRoute } from '../send/routes/send.js';
import { SettingsRoute } from '@src/settings/routes/settings.js';
import { KeysRoute } from '@src/settings/routes/keys.js';
import { AboutRoute } from '@src/settings/routes/about.js';
import { NewNomineeRoute } from '@src/settings/routes/new-nominee.js';

export const Router = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorView}>
      <div className="flex flex-1 pointer min-h-screen">
        <Toaster theme="dark" />
        <MemoryRouter>
          <Routes>
            <Route path="/" element={<StartRoute />} />
            <Route path="/dashboard" element={<OverviewRoute />} />
            <Route path="/send" element={<SendRoute />} />
            <Route path="/receive" element={<ReceiveRoute />} />
            <Route path="/accounts" element={<AccountsRoute />} />
            <Route path="/networks" element={<NetworksRoute />} />

            <Route path="onboarding" element={<Outlet />}>
              <Route path="create" element={<CreateWalletRoute />} />
            </Route>

            <Route path="/transactions" element={<TransactionsRoute />} />
            <Route path="/transactions/:hash" element={<TransactionDetailsRoute />} />

            <Route path="settings" element={<Outlet />}>
              <Route path="" element={<SettingsRoute />} />

              <Route path="keys" element={<Outlet />}>
                <Route path="" element={<KeysRoute />} />
              </Route>

              <Route path="about" element={<Outlet />}>
                <Route path="" element={<AboutRoute />} />
              </Route>

              <Route path="nominee" element={<NewNomineeRoute />} />
            </Route>
          </Routes>
        </MemoryRouter>
      </div>
    </ErrorBoundary>
  );
};
