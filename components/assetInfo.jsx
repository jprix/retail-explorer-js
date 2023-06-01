import * as React from 'react';
import { useContext, useEffect } from 'react';
import { AssetContext } from '../context/assetContext';
import { OrdersContext } from '../context/ordersContext';
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
  const { userOrders } = useContext(OrdersContext);

  const token = props.token;
  const closeTradeModal = () => {
    setTradeModal(false);
  };

  const assetInfo = userAssets.filter((obj) => obj.currency === asset);
  const [tradeModal, setTradeModal] = React.useState(false);
  const [product, setProduct] = React.useState(0);

  useEffect(() => {
    if (userAssets.length === 0) {
      console.log('making assets call', userAssets);
      getAssets(token);
      console.log('this is the asset', asset);
    }

    const fetchProduct = async () => {
      const path = `/api/products/${asset}-USD?token=${token}`;
      try {
        const productResponse = await fetch(path, {
          method: 'GET',
        });
        const productData = await productResponse.json();
        setProduct(productData);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [asset, userOrders]);

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
          <h4>Last Price:</h4>
          {product.price}
          <h4>ID:</h4>
          {assetInfo[0]?.id}
          <h4>Holds:</h4>
          {assetInfo[0]?.balance.amount}
          <h4>USD value:</h4>
          {assetInfo[0]?.native_balance.amount}
        </ColumnLayout>
      </HelpPanel>
      {tradeModal ? (
        <TradeForm
          token={token}
          price={product.price}
          open={tradeModal}
          close={closeTradeModal}
        />
      ) : null}
    </Container>
  );
}

export default AssetInfo;
