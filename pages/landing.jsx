import { Container, Header, SpaceBetween } from '@cloudscape-design/components';
import { useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import { useRouter } from 'next/router';

export function Landing(props) {
  const router = useRouter();
  const { authToken } = useContext(UserContext);
  const { query } = router;

  console.log(query.token);
  const tokenDisplay = authToken?.access_token;

  return (
    <Container
      variant="stacked"
      header={
        <Header
          variant="h2"
          actions={
            <SpaceBetween direction="horizontal" size="l"></SpaceBetween>
          }
        >
          Landing Page
        </Header>
      }
    >
      {tokenDisplay}
    </Container>
  );
}

export default Landing;
