// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';
import NxWelcome from './nx-welcome';
import { Web3ReactProvider } from '@web3-react/core';

import {
  coinbaseWallet,
  coinbaseHooks,
  network,
  networkHooks,
} from './components/connectors';

import { CoinbaseWalletCard } from './components/connectWallet';

export function App() {
  const connectors = [
    [coinbaseWallet, coinbaseHooks],
    [network, networkHooks],
  ];

  return (
    <Web3ReactProvider connectors={connectors}>
      <NxWelcome title="dapp" />
      <CoinbaseWalletCard />
    </Web3ReactProvider>
  );
}
export default App;
