/**
 * Copyright 2022 Coinbase Global, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import '../styles/globals.css';
import '@cloudscape-design/global-styles/index.css';
import UserProvider from '../context/UserContext';
import ProfileProvider from '../context/profileContext';
import OrdersProvider from '../context/ordersContext';
import AssetProvider from '../context/assetContext';
import TransactionsProvider from '../context/transactionsContext';

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <ProfileProvider>
        <AssetProvider>
          <OrdersProvider>
            <TransactionsProvider>
              <Component {...pageProps} />
            </TransactionsProvider>
          </OrdersProvider>
        </AssetProvider>
      </ProfileProvider>
    </UserProvider>
  );
}

export default MyApp;
