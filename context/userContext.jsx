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

import React, { useState, createContext, use } from 'react';

const defaultState = {};

export const UserContext = createContext(defaultState);

const UserProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState({});
  const [gettingToken, setGettingToken] = useState(false);

  const cachedAuthToken = authToken?.access_token;

  const getAuthToken = async (code) => {
    try {
      if (cachedAuthToken) {
        console.log('returning cached token', cachedAuthToken);
        return;
      } else {
        const tokenResponse = await fetch(`/api/hello?code=${code}`, {
          method: 'POST',
        });
        const data = await tokenResponse.json();
        setAuthToken(data);
        console.log('this is the data ', data);
      }
    } catch (error) {
      console.log('this was the token error', error);
    }
  };

  useEffect(() => {
    setCachedAuthToken(authToken?.access_token);
  }, [authToken]);

  const state = {
    getAuthToken,
    authToken: cachedAuthToken,
    gettingToken,
    setGettingToken,
  };

  return <UserContext.Provider value={state}>{children}</UserContext.Provider>;
};

export default UserProvider;
