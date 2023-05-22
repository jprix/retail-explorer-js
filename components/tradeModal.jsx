import React, { useState, useEffect, useContext } from 'react';

import {
  Button,
  Modal,
  Box,
  SpaceBetween,
  Select,
} from '@cloudscape-design/components';

import { AssetContext } from '../context/assetContext';

export function TradeForm(props) {
  const { asset } = useContext(AssetContext);
  const [selectedOrderType, setSelectedOrderType] = useState({
    label: 'MARKET',
    value: 'MARKET',
  });

  //   useEffect(() => {
  //     if (props.open) {
  //       setSelectedAssetOption({
  //         label: 'ETH-USD',
  //         value: 'ETH',
  //       });
  //     }
  //   }, [props.open]);

  const closeModal = () => {
    props.close();
  };

  const initiateTrade = () => {
    console.log('trade placed');
    closeModal();
  };

  return (
    <Modal
      onDismiss={closeModal}
      visible={props.open}
      closeAriaLabel="Close modal"
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="link" onClick={closeModal}>
              Cancel
            </Button>
            <Button variant="primary" onClick={initiateTrade}>
              Place Order
            </Button>
          </SpaceBetween>
        </Box>
      }
      header="Place an order"
    >
      {/* <h3>Please select the asset you would like to view:</h3> */}
      <br />
      <Select
        label="Choose Ordet Type"
        selectedOption={selectedOrderType}
        onChange={({ detail }) => setSelectedOrderType(detail.selectedOption)}
        options={[
          { label: 'MARKET', value: 'MARKET' },
          { label: 'LIMIT', value: 'LIMIT' },
        ]}
        selectedAriaLabel="Selected"
      />
    </Modal>
  );
}
