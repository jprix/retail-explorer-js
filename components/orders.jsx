import React, { useContext, useEffect, useState } from 'react';
import {
  Table,
  Button,
  Modal,
  Box,
  SpaceBetween,
  ColumnLayout,
  HelpPanel,
} from '@cloudscape-design/components';
import { OrdersContext } from '../context/ordersContext';

import { AssetContext } from '../context/assetContext';
function Orders(props) {
  const {
    getOrders,
    userOrders,
    ordersLoading: ordersLoaded,
    order,
    getOrderByID,
    orderLoading: orderLoaded,
    setOrderLoading,
  } = useContext(OrdersContext);

  const { userAssets, asset } = useContext(AssetContext);
  const assetObject = userAssets.filter((obj) => obj.currency === asset);
  console.log('***', assetObject[0]?.id);
  const walletId = assetObject[0]?.id;
  console.log('wallet id', walletId);
  const token = props.token;
  const [detailsModal, setDetailsModal] = useState(false);

  useEffect(() => {
    if (userOrders !== []) {
      // using length instead of equality check
      console.log('making orders call with walletId', walletId);
      getOrders(token, walletId);
    }
  }, [asset]); // useEffect now depends on userOrders

  const closeModal = () => {
    setDetailsModal(false);
  };

  const handleSort = (sortingState) => {
    // using sortingState instead of event
    userOrders(sortingState); // updating userOrders with sorting state
  };

  const openModal = async (id) => {
    setDetailsModal(true);
    setOrderLoading(true);
    await getOrderByID(token, walletId, id);
  };

  return (
    <>
      <Table
        resizableColumns={true}
        trackBy="id"
        sortingDescending
        onSortingChange={handleSort}
        variant="container"
        columnDefinitions={[
          {
            id: 'id',
            header: 'Order Id',
            cell: (e) => e.id,
            width: 150,
            minWidth: 150,
            sortingField: 'id',
          },
          {
            id: 'asset',
            header: 'Asset',
            cell: (e) => e.amount.currency,
            width: 130,
            minWidth: 130,
            sortingField: 'asset',
          },
          {
            id: 'status',
            header: 'Status',
            cell: (e) => e.status,
            width: 135,
            minWidth: 135,
            sortingField: 'status',
          },
          {
            id: 'created_at',
            header: 'Order Date',
            cell: (e) => e.created_at,
            width: 150,
            minWidth: 150,
            sortingField: 'created_at',
          },
          {
            id: 'details',
            header: 'Details',
            cell: (e) => (
              <Button onClick={() => openModal(e.id)}>Details</Button>
            ),
            width: 150,
            minWidth: 150,
          },
        ]}
        items={userOrders}
        loading={ordersLoaded}
        loadingText="Loading Orders..."
        empty={
          <Box textAlign="center" color="inherit">
            <b>No Orders Found</b>
          </Box>
        }
      />
      {detailsModal && ( // corrected conditional rendering syntax
        <Modal
          onDismiss={closeModal}
          visible={detailsModal}
          closeAriaLabel="Close modal"
          footer={
            <Box float="right">
              <SpaceBetween direction="horizontal" size="xs">
                <Button variant="link" onClick={closeModal}>
                  Cancel
                </Button>
              </SpaceBetween>
            </Box>
          }
          header="Order Detail"
        >
          <>
            <HelpPanel>
              <ColumnLayout
                variant="text-grid"
                borders="horizontal"
                columns={2}
                loadingText="Loading Order Detail..."
                loading={orderLoaded}
              >
                <h4>Order Id:</h4>
                {order?.id}

                <h4>Status:</h4>

                {order?.status}

                <h4>Date:</h4>
                {order?.created_at}
              </ColumnLayout>
            </HelpPanel>
          </>
        </Modal>
      )}
    </>
  );
}

export default Orders;
