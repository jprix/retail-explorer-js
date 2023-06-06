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
  Textarea,
} from '@cloudscape-design/components';

import { AssetContext } from '../context/assetContext';

export function ReceiveForm(props) {
  const { token } = props;
  const { asset } = useContext(AssetContext);
  const [address, setAddress] = useState({});

  const closeModal = () => {
    props.close();
  };

  useEffect(() => {
    console.log('this is the address:', address);
  }, [address]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('form submitted', asset);
    try {
      const path = `/api/addresses/${asset}?token=${token}`;

      const createAddressResponse = await fetch(path, {
        method: 'POST',
      });
      const response = await createAddressResponse.json();
      setAddress(response);
      console.log('this is the adddress, ', response.address);
    } catch (error) {
      console.log('error', error);

      closeModal();
    }
  };

  return (
    <Modal
      onDismiss={closeModal}
      visible={props.open}
      closeAriaLabel="Close modal"
      header="Generate Address"
    >
      {/* <h3>Please select the asset you would like to view:</h3> */}

      <form onSubmit={handleSubmit}>
        <Form
          id="receiveForm"
          actions={
            <Box float="right">
              <SpaceBetween direction="horizontal" size="xs">
                <Button variant="link" onClick={closeModal}>
                  Close
                </Button>
                <SpaceBetween id="formLabel" direction="horizontal" size="xs">
                  {Object.keys(address).length === 0 ? (
                    <Button id="submit" variant="primary">
                      Generate Address
                    </Button>
                  ) : null}
                </SpaceBetween>
              </SpaceBetween>
            </Box>
          }
        >
          <div>
            <p>Would you like to generate a {asset} address?</p>
            {Object.keys(address).length !== 0 ? (
              <div>
                <p>
                  <b>Use this address to receive {asset}:</b>
                </p>
                <p>{address.address}</p>
              </div>
            ) : null}
          </div>
        </Form>
      </form>
    </Modal>
  );
}
