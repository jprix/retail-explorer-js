import React, { useState, useEffect, useContext } from 'react';

import {
  Button,
  Modal,
  Form,
  FormField,
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

  const [selectedOrderSide, setSelectedOrderSide] = useState({
    label: 'BUY',
    value: 'BUY',
  });

  const closeModal = () => {
    props.close();
  };

  const initiateTrade = () => {
    console.log('trade placed');
    closeModal();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('form submitted');
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
          </SpaceBetween>
        </Box>
      }
      header="Place order"
    >
      {/* <h3>Please select the asset you would like to view:</h3> */}
      <br />
      <form onSubmit={handleSubmit}>
        <Form
          id="tradeForm"
          actions={
            <Box float="right">
              <SpaceBetween direction="horizontal" size="xs">
                <Button variant="link" onClick={closeModal}>
                  Cancel
                </Button>
                <SpaceBetween id="formLabel" direction="horizontal" size="xs">
                  <Button id="submit" variant="primary">
                    {selectedOrderSide.label} {asset}
                  </Button>
                </SpaceBetween>
              </SpaceBetween>
            </Box>
          }
        >
          <Select
            label="Choose Ordet Type"
            selectedOption={selectedOrderType}
            onChange={({ detail }) =>
              setSelectedOrderType(detail.selectedOption)
            }
            options={[
              { label: 'MARKET', value: 'MARKET' },
              { label: 'LIMIT', value: 'LIMIT' },
            ]}
            selectedAriaLabel="Selected Order Type"
          />
          <SpaceBetween direction="horizontal" size="xs">
            <br />
            <Select
              label="Side"
              selectedOption={selectedOrderSide}
              onChange={({ detail }) =>
                setSelectedOrderSide(detail.selectedOption)
              }
              options={[
                { label: 'BUY', value: 'BUY' },
                { label: 'SELL', value: 'SELL' },
              ]}
              selectedAriaLabel="Selected Side"
            />
          </SpaceBetween>
        </Form>
      </form>
    </Modal>
  );
}
