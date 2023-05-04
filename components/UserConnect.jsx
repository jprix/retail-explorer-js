import React, { useState, useEffect } from 'react';
import { SelectScopes } from './selectScopes';

import {
  Button,
  Modal,
  Box,
  SpaceBetween,
} from '@cloudscape-design/components';

export function UserConnect(props) {
  const [connectModal, setConnectModal] = useState(false);
  const [selectedScopeOptions, setSelectedScopeOptions] = React.useState([]);
  useEffect(() => {
    if (window.opener) {
      console.log('window opener ', window.opener);
    }
  }, []);

  const initiateOauth = () => {
    const scope = selectedScopeOptions.map((scope) => scope.value).join(' ');
    console.log(scope, selectedScopeOptions);
    const state = Math.floor(Date.now() / 1000);
    window.location.href = `https://www.coinbase.com/oauth/authorize?client_id=087facde449a1039b4270e84dde9cd02f170f191394a72deb868c978d2bba803&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2F&response_type=code&scope=${scope}&state=${state}&account=all&meta[account]=all&meta[send_limit_amount]=1.00&meta[send_limit_currency]=USD&meta[send_limit_period]=month`;
  };
  const closeModal = () => {
    setConnectModal(false);
    props.close();
  };

  // console.log('selectedScopes in the userConnect ', selectedScopeOptions);

  return !connectModal ? (
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
            <Button variant="primary" onClick={initiateOauth}>
              Ok
            </Button>
          </SpaceBetween>
        </Box>
      }
      header="Connect Coinbase Account"
    >
      <h3>Please select the scopes you would like to approve?</h3>
      <br />
      <SelectScopes
        selectedScopeOptions={selectedScopeOptions}
        setSelectedScopeOptions={setSelectedScopeOptions}
      />
    </Modal>
  ) : (
    ''
  );
}
