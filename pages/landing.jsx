import { Container, Grid, Header, Button } from '@cloudscape-design/components';
import { useContext, useEffect, useState } from 'react'; // Import useState
import { UserContext } from '../context/UserContext';
import { useRouter } from 'next/router';
import Layout from '../components/Layouts';
import { gridDefinition } from '../utils/grids';
import Profile from '../components/profile';
import Orders from '../components/orders';
import AssetInfo from '../components/assetInfo';
import { AssetSwitcher } from '../components/assetSwitcher';
import { AssetContext } from '../context/assetContext';

export function Landing() {
  const router = useRouter();
  const [assetModal, setAssetModal] = useState(false);
  const { authToken } = useContext(UserContext);
  const { query } = router;
  const { asset } = useContext(AssetContext); // Retrieve asset from AssetContext
  const token = query.token;

  useEffect(() => {
    if (asset === '') {
      setAssetModal(true);
    }
  }, [asset]);

  const closeAssetModal = () => {
    setAssetModal(false);
  };

  let assetSwitcherComponent = null;

  if (asset === '' || assetModal) {
    assetSwitcherComponent = (
      <AssetSwitcher token={token} open={assetModal} close={closeAssetModal} />
    );
  }

  return (
    <Layout>
      <Button onClick={() => setAssetModal(true)}>Switch Asset</Button>
      <Grid id="homeDashboard" gridDefinition={gridDefinition}>
        {assetSwitcherComponent}
        <>
          <AssetInfo token={token} />

          <Container
            className="profileContentt"
            // loading={balanceLoaded}
            loadingText="Fetching Profile..."
          >
            <Profile token={token} />
          </Container>
          <Container
            className="ordersContainer"
            header={<Header variant="h2">Your Orders</Header>}
          >
            {asset !== '' ? <Orders token={token} /> : null}
          </Container>
        </>
      </Grid>
    </Layout>
  );
}

export default Landing;
