import * as React from 'react';
import { useContext, useEffect } from 'react';
import { ProfileContext } from '../context/profileContext';

import { HelpPanel, ColumnLayout } from '@cloudscape-design/components';

function AssetInfo() {
  //   const {
  //     userProfile,
  //     profileLoading: profileLoaded,
  //     getProfile,
  //   } = useContext(ProfileContext);

  //const token = props.token;
  //   const profileValues = userProfile.length > 0;
  //   useEffect(() => {
  //     if (Object.keys(userProfile).length === 0) {
  //       console.log('hit profile fetcher', token);
  //       getProfile(token);
  //     }
  //   }, []);

  return (
    <>
      <HelpPanel header={<h3>Asset Info</h3>}>
        <ColumnLayout variant="text-grid" borders="horizontal" columns={2}>
          <h4>Asset Name:</h4>
          Bitcoin
          <h4>Holds:</h4>
          10.00000000 BTC
          <h4>USD value:</h4>
          280,000.00 USD
        </ColumnLayout>
      </HelpPanel>
    </>
  );
}

export default AssetInfo;
