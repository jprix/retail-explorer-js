import * as React from 'react';
import { useContext, useEffect } from 'react';
import { AssetContext } from '../context/assetContext';
import { Icons } from '../utils/Icons';

import {
  HelpPanel,
  ColumnLayout,
  Button,
  ButtonGroup,
  Box,
  Container,
} from '@cloudscape-design/components';

function AssetInfo(props) {
  const {
    userAssets,
    assetsLoading: assetLoaded,
    getAssets,
    asset,
  } = useContext(AssetContext);

  const token = props.token;

  useEffect(() => {
    if (userAssets.length === 0) {
      console.log('making assets call');
      getAssets(token);
    }
  }, [asset]);

  const assetInfo = userAssets.filter((obj) => obj.currency === asset);
  console.log(assetInfo);

  const handleTransfer = () => {
    console.log('Transfer action');
    // code to execute the 'transfer' action
  };

  const handleDeposit = () => {
    console.log('Deposit action');
    // code to execute the 'deposit' action
  };

  return (
    <Container
      variant="stacked"
      footer="footer content"
      actions={
        <ButtonGroup>
          <Button onClick={handleTransfer}>Transfer</Button>
          <Button onClick={handleDeposit}>Deposit</Button>
        </ButtonGroup>
      }
    >
      <HelpPanel
        header={
          <>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Icons asset={assetInfo[0]?.currency} /> {assetInfo[0]?.currency}{' '}
              Wallet Info
            </div>
          </>
        }
      >
        <ColumnLayout variant="text-grid" borders="horizontal" columns={2}>
          <h4>Name:</h4>
          {assetInfo[0]?.name}
          <h4>ID:</h4>
          {assetInfo[0]?.id}
          <h4>Holds:</h4>
          {assetInfo[0]?.balance.amount}
          <h4>USD value:</h4>
          {assetInfo[0]?.native_balance.amount}
        </ColumnLayout>
      </HelpPanel>
    </Container>
  );
}

export default AssetInfo;
