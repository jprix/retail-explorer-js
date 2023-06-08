import React, { useState, useEffect, createContext } from 'react';

const defaultState = {};

export const AssetContext = createContext(defaultState);

const AssetProvider = ({ children }) => {
  const [assetLoading, setAssetLoading] = useState(true);
  const [fetching, setFetching] = useState(false);

  const [userAsset, setUserAsset] = useState([]);
  const [asset, setAsset] = useState('');

  const getAsset = async (token, asset) => {
    if (fetching && assetLoading) {
      return;
    }
    try {
      setFetching(true);
      setAssetLoading(true);
      console.log('getting asset', asset);
      const assetResponse = await fetch(
        `/api/accounts/${asset}?token=${token}`,
        {
          method: 'GET',
        }
      );

      const data = await assetResponse.json();

      setUserAsset(data);
      console.log(userAsset);
      setAssetLoading(false);
      setFetching(false);
    } catch (error) {
      console.log(error);
      setUserAsset([]);
      setAssetLoading(false);
      setFetching(false);
    }
  };

  const selectedAsset = async (asset) => {
    setAsset(asset);
  };

  const state = {
    userAsset,
    assetLoading,
    getAsset,
    asset,
    selectedAsset,
    setAsset,
  };

  return (
    <AssetContext.Provider value={state}>{children}</AssetContext.Provider>
  );
};

export default AssetProvider;
