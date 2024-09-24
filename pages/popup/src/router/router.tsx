import { ErrorBoundary } from 'react-error-boundary';
import { Toaster } from 'sonner';
import { MemoryRouter, Outlet, Route, Routes } from 'react-router-dom';
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
import { UnlockWalletRoute } from '@src/lock/routes/unlock-wallet.js';
import { NotFoundRoute } from '@src/not-found/routes/not-found.js';
import { useEffect } from 'react';
import { useStorage } from '@extension/shared';
import { walletStorage } from '@extension/storage';
import { useSetAtom } from 'jotai';
import { currentTokenContractAtom, tokenContractsAtom } from '@src/atoms.js';
import { FaucetRoute } from '@src/settings/routes/faucet.js';
import { useLoadAccountFromStorage } from '@src/hooks/useLoadAccountsFromStorage.js';
import { useBalance } from '@src/hooks/useBalance.js';
import { TokensRoute } from '@src/settings/routes/tokens.js';
import { useLoadTransactions } from '@src/hooks/useLoadTransactions.js';
import { AddressBookRoute } from '@src/address-book/routes/address-book.js';
import { NewAddressRoute } from '@src/address-book/routes/new-address.js';

export const Router = () => {
  const walletData = useStorage(walletStorage);
  const setTokenContracts = useSetAtom(tokenContractsAtom);
  const setCurrentTokenContract = useSetAtom(currentTokenContractAtom);
  useBalance();
  useLoadAccountFromStorage();
  useLoadTransactions();
  useEffect(() => {
    const tokenContracts = walletData.tokenContracts;
    setTokenContracts(tokenContracts);
    if (tokenContracts.length > 0) {
      setCurrentTokenContract(tokenContracts[0]);
    }
  }, []);
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

            <Route path="contacts" element={<Outlet />}>
              <Route path="" element={<AddressBookRoute />} />
              <Route path="new" element={<NewAddressRoute />} />
            </Route>

            <Route path="onboarding" element={<Outlet />}>
              <Route path="create" element={<CreateWalletRoute />} />
            </Route>

            <Route path="/transactions" element={<TransactionsRoute />} />
            <Route path="/transactions/:hash" element={<TransactionDetailsRoute />} />

            <Route path="settings" element={<Outlet />}>
              <Route path="" element={<SettingsRoute />} />
              <Route path="faucet" element={<FaucetRoute />} />

              <Route path="keys" element={<Outlet />}>
                <Route path="" element={<KeysRoute />} />
              </Route>

              <Route path="about" element={<Outlet />}>
                <Route path="" element={<AboutRoute />} />
              </Route>

              <Route path="nominee" element={<NewNomineeRoute />} />
              <Route path="tokens" element={<TokensRoute />} />
            </Route>
            <Route path="/unlock" element={<UnlockWalletRoute />} />

            <Route path="/*" element={<NotFoundRoute />} />
          </Routes>
        </MemoryRouter>
      </div>
    </ErrorBoundary>
  );
};
