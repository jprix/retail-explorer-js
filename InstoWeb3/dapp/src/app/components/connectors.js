import { CoinbaseWallet } from '@web3-react/coinbase-wallet';
import { initializeConnector } from '@web3-react/core';
import { URLS } from '../../utils/chains';
import { Network } from '@web3-react/network';

console.log('these are the ', URLS);

export const [network, networkHooks] = initializeConnector(
  (actions) =>
    new Network({ actions, urlMap: { 1: 'https://cloudflare-eth.com' } })
);

export const [coinbaseWallet, coinbaseHooks] = initializeConnector(
  (actions) =>
    new CoinbaseWallet({
      actions,
      options: {
        // url: URLS[1][0],
        url: 'https://cloudflare-eth.com',
        appName: 'web3-react',
      },
    })
);
