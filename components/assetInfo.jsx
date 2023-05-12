import * as React from 'react';
import { useContext, useEffect } from 'react';
import { AssetContext } from '../context/assetContext';

import { HelpPanel, ColumnLayout } from '@cloudscape-design/components';

function AssetInfo(props) {
  const {
    userAssets,
    assetsLoading: assetLoaded,
    getAssets,
  } = useContext(AssetContext);

  const token = props.token;

  useEffect(() => {
    if (userAssets.length === 0) {
      console.log('making assets call');
      getAssets(token);
    }
  }, []);

  console.log('***', userAssets);
  const assetInfo = userAssets.filter((obj) => obj.currency === 'BTC');
  console.log(assetInfo);

  return (
    <>
      <HelpPanel header={<h3> {assetInfo[0]?.currency} Asset Info</h3>}>
        <ColumnLayout variant="text-grid" borders="horizontal" columns={2}>
          <h4>Wallet Name:</h4>
          {assetInfo[0]?.name}
          <h4>Wallet ID:</h4>
          {assetInfo[0]?.id}
          <h4>Holds:</h4>
          {assetInfo[0]?.balance.amount}
          <h4>USD value:</h4>
          {assetInfo[0]?.native_balance.amount}
        </ColumnLayout>
      </HelpPanel>
    </>
  );
}

export default AssetInfo;
