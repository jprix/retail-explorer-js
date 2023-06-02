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
    if (orderFetching && order === {} && orderLoading) {
      return;
    }
    setOrderFetching(true);
    setOrderLoading(true);

    const fetchOrderById = await fetch(
      `/api/orders/${order_id}?token=${token}&account_id=${account_id}`,
      {
        method: 'GET',
      }
    );
    try {
      const data = await fetchOrderById.json();

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

  const getOrders = async (token, account_id, asset) => {
    if (fetching && userOrders === [] && loading) {
      return;
    }

    try {
      setFetching(true);
      setOrdersLoading(true);

      const orderResponse = await fetch(
        `/api/orders?token=${token}&asset=${asset}`,
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

  const createOrder = async (
    token,
    product_id,
    quote_size,
    side,
    type = 'MARKET',
    limitPrice = ''
  ) => {
    let path;
    console.log('limit price', limitPrice);
    try {
      if (side === 'SELL') {
        path = `/api/orders?token=${token}&product_id=${product_id}-USD&base_size=${quote_size}&side=${side}&type=${type}&limtiPrice=${limitPrice}`;
      } else {
        path = `/api/orders?token=${token}&product_id=${product_id}-USD&quote_size=${quote_size}&side=${side}&type=${type}&limitPrice=${limitPrice}`;
      }

      setPlacingOrder(true);
      const createOrderResponse = await fetch(path, {
        method: 'POST',
      });
      const data = await createOrderResponse.json();

      setUserOrder(data);
      setUserOrders((prevOrders) => [...prevOrders, data]);
      setPlacingOrderLoading(false);
      setPlacingOrder(false);
    } catch (error) {
      console.log('error', error);
      setPlacingOrderLoading(false);
      setPlacingOrder(false);
    }
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
