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
    console.log(gettingToken, token);

    if (token) {
      console.log('executing landing route push');
      router.push(`/landing?token=${token}`);
    }
    if (code && !token) {
      getAuthToken(code);
    }
  }, [authToken]);

  const closePreviewModal = () => {
    setShowModal(false);
  };

  return (
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
        <Button variant="secondary" onClick={() => setShowModal(false)}>
          Cancel
        </Button>
        {showModal && (
          <UserConnect open={showModal} close={closePreviewModal} />
        )}
      </>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const response = await fetch(`http://localhost:3000/api/products`);
  const furniture = await response.json();

  return {
    props: { furniture },
  };
}
