import React, { useState, useEffect, createContext } from 'react';

const defaultState = {};

export const AssetContext = createContext(defaultState);

const AssetProvider = ({ children }) => {
  const [assetsLoading, setAssetsLoading] = useState(true);
  const [fetching, setFetching] = useState(false);

  const [userAssets, setUserAssets] = useState([]);

  const getAssets = async (token) => {
    if (fetching && userAssets?.name && loading) {
      return;
    }
    setFetching(true);
    const tokenResponse = await fetch(`/api/accounts?token=${token}`, {
      method: 'GET',
    });

    const data = await tokenResponse.json();

    setUserAssets(data);
    console.log(userAssets);
    setAssetsLoading(false);
    setFetching(false);
  };

  const state = {
    userAssets,
    assetsLoading,
    getAssets,
  };

  return (
    <AssetContext.Provider value={state}>{children}</AssetContext.Provider>
  );
};

export default AssetProvider;
