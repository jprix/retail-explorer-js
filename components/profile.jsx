import * as React from 'react';
import { useContext, useEffect } from 'react';
import { ProfileContext } from '../context/profileContext';

import { HelpPanel, ColumnLayout } from '@cloudscape-design/components';

function Profile(props) {
  const {
    userProfile,
    profileLoading: profileLoaded,
    getProfile,
  } = useContext(ProfileContext);
  console.log(
    'this is the profile ',
    userProfile,
    profileLoaded,
    userProfile?.length,
    props
  );
  const token = props.token;
  //   const profileValues = userProfile.length > 0;
  useEffect(() => {
    if (Object.keys(userProfile).length === 0) {
      console.log('hit profile fetcher', token);
      getProfile(token);
    }
  }, []);

  return (
    <>
      <HelpPanel header={<h3>Profile Info</h3>}>
        <ColumnLayout variant="text-grid" borders="horizontal" columns={2}>
          <h4>Name:</h4>
          {userProfile?.name}

          <h4>User Type:</h4>

          {userProfile?.user_type}

          <h4>Native Currency:</h4>
          {userProfile?.native_currency}
        </ColumnLayout>
      </HelpPanel>
    </>
  );
}

export default Profile;
