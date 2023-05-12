import {
  Container,
  Grid,
  Header,
  SpaceBetween,
} from '@cloudscape-design/components';
import { useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import { useRouter } from 'next/router';
import Layout from '../components/Layouts';
import { gridDefinition } from '../utils/grids';
import Profile from '../components/profile';
import Orders from '../components/orders';
import AssetInfo from '../components/assetInfo';

export function Landing() {
  const router = useRouter();
  const { authToken } = useContext(UserContext);
  const { query } = router;

  const token = query.token;

  return (
    <Layout>
      <Grid id="homeDashboard" gridDefinition={gridDefinition}>
        <Container
          variant="stacked"
          // header={
          //   <Header
          //     variant="h2"
          //     actions={
          //       <SpaceBetween direction="horizontal" size="l"></SpaceBetween>
          //     }
          //   >
          //     Landing Page
          //   </Header>
          // }
        >
          <AssetInfo token={token} />
        </Container>
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
          <Orders token={token} />
        </Container>
      </Grid>
    </Layout>
  );
}

export default Landing;
