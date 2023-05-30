/**
 * Copyright 2022 Coinbase Global, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import * as React from 'react';
import { useContext, useState, useEffect } from 'react';
import Layout from '../components/Layouts';
import { useRouter } from 'next/router';
import { Button } from '@cloudscape-design/components';
import { UserConnect } from '../components/UserConnect';
import { UserContext } from '../context/UserContext';

export default function HomePage() {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const { query } = router;
  const { getAuthToken, authToken, gettingToken } = useContext(UserContext);
  const code = query.code;

  useEffect(() => {
    const token = authToken?.access_token;

    if (Object.keys(authToken || {}).length === 0 && code === undefined) {
      return;
    } else if ((code && !gettingToken && token !== undefined) || token) {
      console.log('executing landing route push');
      router.push(`/landing?token=${token}`);
    } else {
      getAuthToken(code);
    }
  }, [authToken, code]);

  const closePreviewModal = () => {
    setShowModal(false);
  };

  return (authToken || {}).length === 0 ? (
    <Layout>
      <>
        <h1>Welcome to Retail API Explorer!</h1>
        <p>
          You have signed in! Please wait while we redirect you to the landing
          page.
        </p>
      </>
    </Layout>
  ) : (
    <Layout>
      <>
        <h1>Welcome to Retail API Explorer!</h1>
        <p>
          Please connect your Coinbase Retail Account to explore our Retail
          APIs.
        </p>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          Connect Coinbase Account
        </Button>

        {showModal && (
          <UserConnect open={showModal} close={closePreviewModal} />
        )}
      </>
    </Layout>
  );
}

// export async function getServerSideProps(context) {
//   const response = await fetch(`http://localhost:3000/api/products`);
//   const orders = await response.json();

//   return {
//     props: { orders },
//   };
// }
