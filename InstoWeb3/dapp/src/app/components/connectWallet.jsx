import { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { Button, Container, Header } from '@cloudscape-design/components';

export function CoinbaseWalletCard() {
  const {
    connector,
    isActive,
    isActivating,
    account,
    accounts,
    chainId,
    provider,
  } = useWeb3React();

  const [error, setError] = useState(undefined);

  const connect = () => {
    console.log('connector', connector);
    connector?.activate(5);
  };

  const disconnect = () => {
    connector?.deactivate(chainId);
  };

  return (
    <Container
      header={
        <Header variant="h2" description="Container description">
          Connect your Wallet
        </Header>
      }
    >
      <Button onClick={connect} disabled={isActive}>
        Connect
      </Button>

      {isActive ? (
        <li>
          isActive: {isActive.toString()}
          isActivating: {isActivating.toString()}
          accounts: {accounts}
          {account}
          <br></br>chainId: {chainId}
        </li>
      ) : (
        'nothing'
      )}
      {isActive ? <Button onClick={disconnect}>Disconnect</Button> : ''}
    </Container>
  );
}
