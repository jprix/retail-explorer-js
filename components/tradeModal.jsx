import React, { useState, useEffect, useContext } from 'react';

import {
  Button,
  Modal,
  Form,
  FormField,
  Box,
  SpaceBetween,
  Select,
  Spinner,
  Input,
} from '@cloudscape-design/components';

import { AssetContext } from '../context/assetContext';
import { OrdersContext } from '../context/ordersContext';

export function TradeForm(props) {
  const { userOrder, placingOrder, createOrder } = useContext(OrdersContext);

  const token = props.token;
  const { asset } = useContext(AssetContext);
  const [quantity, setQuantity] = React.useState('1');
  const [error, setError] = React.useState('');
  const [baseCurrency, setBaseCurrency] = React.useState(0);

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

  const handleQuantity = (qty) => {
    if (!isNaN(+qty)) {
      setQuantity(qty);
      setError('');
    } else {
      setError('Please enter an integer value');
    }
  };

  const handleBaseCurrency = (bsc) => {
    if (!isNaN(+bsc)) {
      setBaseCurrency(bsc);
      setError('');
    } else {
      setError('Please enter an integer value');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('form submitted');
    try {
      const order = await createOrder(
        token,
        asset,
        quantity,
        selectedOrderSide.value
      );
      alert(order);
      closeModal();
    } catch (error) {
      console.log('error', error);
      alert(error.message);
      closeModal();
    }
  };

  return (
    <Modal
      onDismiss={closeModal}
      visible={props.open}
      closeAriaLabel="Close modal"
      header="Place order"
    >
      {/* <h3>Please select the asset you would like to view:</h3> */}
      {placingOrder ? <Spinner /> : null}
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
          {selectedOrderSide.value === 'BUY' ? (
            <FormField label="Quantity" id="quantity" errorText={error}>
              <Input
                id="inputQuantity"
                onChange={({ detail }) => handleQuantity(detail.value)}
                value={quantity}
              />
            </FormField>
          ) : (
            <FormField
              label="Base Currency"
              id="base_currency"
              errorText={error}
            >
              <Input
                id="baseCurrency"
                onChange={({ detail }) => handleBaseCurrency(detail.value)}
                value={baseCurrency}
              />
            </FormField>
          )}
        </Form>
      </form>
    </Modal>
  );
}
