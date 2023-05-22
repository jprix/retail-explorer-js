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
  Header,
  Container,
  SpaceBetween,
} from '@cloudscape-design/components';
import { TradeForm } from './TradeModal';
function AssetInfo(props) {
  const {
    userAssets,
    assetsLoading: assetLoaded,
    getAssets,
    asset,
  } = useContext(AssetContext);

  const token = props.token;
  const closeTradeModal = () => {
    setTradeModal(false);
  };

  useEffect(() => {
    if (userAssets.length === 0) {
      console.log('making assets call');
      getAssets(token);
    }
  }, [asset]);

  const assetInfo = userAssets.filter((obj) => obj.currency === asset);
  const [tradeModal, setTradeModal] = React.useState(false);

  const handleTransfer = () => {
    console.log('Transfer action');
    // code to execute the 'transfer' action
  };

  const handleTrade = () => {
    console.log('Trade action');
    setTradeModal(true);
  };

  return (
    <Container className="assetInfoContainer">
      <HelpPanel
        footer="footer content here"
        header={
          <Header
            actions={
              <SpaceBetween direction="horizontal" size="xs">
                <Button onClick={handleTrade}>Trade</Button>
                <Button>Transfer</Button>
              </SpaceBetween>
            }
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Icons asset={assetInfo[0]?.currency} /> {assetInfo[0]?.currency}{' '}
              Wallet Info
            </div>
          </Header>
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
      {tradeModal ? (
        <TradeForm token={token} open={tradeModal} close={closeTradeModal} />
      ) : null}
    </Container>
  );
}

export default AssetInfo;
