import React, { useState, useEffect, createContext } from 'react';

const defaultState = {};

export const AssetContext = createContext(defaultState);

const AssetProvider = ({ children }) => {
  const [assetsLoading, setAssetsLoading] = useState(true);
  const [fetching, setFetching] = useState(false);

  const [userAssets, setUserAssets] = useState([]);
  const [asset, setAsset] = useState('');

  const getAssets = async (token) => {
    if (fetching && userAssets?.name && loading) {
      return;
    }
    try {
      setFetching(true);
      setAssetsLoading(true);

      const assetsResponse = await fetch(`/api/accounts?token=${token}`, {
        method: 'GET',
      });

      const data = await assetsResponse.json();

      setUserAssets(data);
      console.log(userAssets);
      setAssetsLoading(false);
      setFetching(false);
    } catch (error) {
      console.log(error);
      setUserAssets([]);
      setAssetsLoading(false);
      setFetching(false);
    }
  };

  const selectedAsset = async (asset) => {
    setAsset(asset);
  };

  const state = {
    userAssets,
    assetsLoading,
    getAssets,
    asset,
    selectedAsset,
    setAsset,
  };

  return (
    <AssetContext.Provider value={state}>{children}</AssetContext.Provider>
  );
};

export default AssetProvider;
