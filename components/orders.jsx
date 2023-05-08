import * as React from 'react';
import { Table, Link } from '@cloudscape-design/components';

import { useContext, useEffect } from 'react';
import { OrdersContext } from '../context/ordersContext';

function Orders(props) {
  const {
    getOrders,
    userOrders,
    ordersLoading: ordersLoaded,
  } = useContext(OrdersContext);

  const token = props.token;

  console.log('orders component loaded');
  useEffect(() => {
    // const hasEmptyOrders = userOrders.some(
    //   (order) => Object.keys(order).length === 0
    // );
    // console.log('this is the orders', userOrders, hasEmptyOrders);
    if (userOrders !== []) {
      console.log('making orders call');
      getOrders(token);
    }
  }, []);

  const handleSort = (event) => {
    userOrders(event);
  };

  return (
    <Table
      resizableColumns={true}
      trackBy="name"
      sortingDescending
      onSortingChange={handleSort}
      variant="container"
      columnDefinitions={[
        {
          id: 'id',
          header: 'Order',
          cell: (e) => <Link href={`#/orders/${e.id}`}>{e.id}</Link>,
          width: 100,
          minWidth: 100,
        },
        {
          id: 'name',
          header: 'name',
          cell: (e) => e.name,
          width: 130,
          minWidth: 130,
          sortingField: 'name',
        },
        {
          id: 'volume',
          header: 'Volume',
          cell: (e) => e.volume,
          width: 135,
          minWidth: 135,
          sortingField: 'volume',
        },
        {
          id: 'marketCap',
          header: 'Market Cap',
          cell: (e) => e.marketCap,
          width: 150,
          minWidth: 150,
          sortingField: 'marketCap',
        },
        {
          id: 'direction',
          header: 'Direction',
          cell: (e) => e.direction,
          width: 110,
          minWidth: 110,
          sortingField: 'direction',
        },
        {
          id: 'supply',
          header: 'Supply',
          cell: (e) => e.supply,
          width: 110,
          minWidth: 90,
        },
        {
          id: 'trade',
          header: '',
          cell: (e) => <Link href={`#/assets/${e.ticker}`}>Trade</Link>,
          width: 170,
          minWidth: 170,
        },
      ]}
      items={userOrders}
      loading={ordersLoaded}
      loadingText="Loading Orders..."
    />
  );
}

export default Orders;
