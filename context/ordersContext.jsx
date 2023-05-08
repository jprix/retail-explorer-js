import React, { useState, useEffect, createContext } from 'react';

const defaultState = {};

export const OrdersContext = createContext(defaultState);

const OrdersProvider = ({ children }) => {
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [fetching, setFetching] = useState(false);

  const [userOrders, setUserOrders] = useState([]);

  const getOrders = async (token) => {
    console.log('hit get orders');
    if (fetching && userOrders === [] && loading) {
      return;
    }
    setFetching(true);
    const tokenResponse = await fetch(`/api/orders?token=${token}`, {
      method: 'GET',
    });

    const data = await tokenResponse.json();

    setUserOrders(data);
    setOrdersLoading(false);
    setFetching(false);
  };

  const state = {
    userOrders,
    ordersLoading,
    getOrders,
  };

  return (
    <OrdersContext.Provider value={state}>{children}</OrdersContext.Provider>
  );
};

export default OrdersProvider;
