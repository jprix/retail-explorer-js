import React, { useState, useEffect, createContext } from 'react';

const defaultState = {};

export const OrdersContext = createContext(defaultState);

const OrdersProvider = ({ children }) => {
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [fetching, setFetching] = useState(false);
  const [userOrders, setUserOrders] = useState([]);
  const [orderLoading, setOrderLoading] = useState(true);
  const [order, setOrder] = useState({});
  const [orderFetching, setOrderFetching] = useState(false);
  const [placingOrder, setPlacingOrder] = useState(false);
  const [placingOrderLoading, setPlacingOrderLoading] = useState(false);
  const [userOrder, setUserOrder] = useState({});
  const getOrderByID = async (token, account_id, order_id) => {
    console.log('hit get user order');
    if (orderFetching && order === {} && orderLoading) {
      return;
    }
    setOrderFetching(true);
    const tokenResponse = await fetch(
      `/api/orders/${order_id}?token=${token}&account_id=${account_id}`,
      {
        method: 'GET',
      }
    );
    try {
      const data = await tokenResponse.json();

      setOrder(data);
      setOrderLoading(false);
      setOrderFetching(false);
    } catch (error) {
      setOrder({});
      console.log('error', error);
      setOrderLoading(false);
      setOrderFetching(false);
    }
  };

  const getOrders = async (token, account_id) => {
    if (fetching && userOrders === [] && loading) {
      return;
    }

    try {
      setFetching(true);
      setOrdersLoading(true);

      const orderResponse = await fetch(
        `/api/orders?token=${token}&account_id=${account_id}`,
        {
          method: 'GET',
        }
      );
      const data = await orderResponse.json();

      setUserOrders(data);
      setOrdersLoading(false);
      setFetching(false);
    } catch (error) {
      console.log('error', error);
      setOrdersLoading(false);
      setFetching(false);
    }
  };

  const createOrder = async (token, account_id) => {
    setPlacingOrder(true);
    const createOrderResponse = await fetch(
      `/api/orders?token=${token}&account_id=${account_id}`,
      {
        method: 'POST',
      }
    );

    const data = await orderResponse.json();

    setUserOrder(data);
    setPlacingOrderLoading(false);
    setPlacingOrder(false);
  };
  const state = {
    placingOrder,
    setPlacingOrder,
    placingOrderLoading,
    userOrder,
    createOrder,
    userOrders,
    ordersLoading,
    getOrders,
    getOrderByID,
    order,
    orderLoading,
    setOrderLoading,
  };

  return (
    <OrdersContext.Provider value={state}>{children}</OrdersContext.Provider>
  );
};

export default OrdersProvider;
