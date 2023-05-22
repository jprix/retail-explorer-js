export default async function orders(req, res) {
  const { query } = req;

  const { token, product_id, side, quote_size, account_id } = query;
  let targetUrl = `https://api.coinbase.com/v2/accounts/${account_id}/buys`;

  if (req.method === 'GET') {
    // Handle a GET request
    try {
      const getOrders = await fetch(targetUrl, {
        credentials: 'include',
        method: 'GET',
        withCredentials: true,
        headers: {
          Accept: 'application/json',
          'CB-VERSION': '2015-04-08',
          Authorization: 'Bearer ' + token,
        },
      });

      console.log(getOrders);
      const response = await getOrders.json();
      const userOrders = response.data;

      return res.status(200).json(userOrders);
    } catch (error) {
      console.log('this was the user orders error', error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  } else if (req.method === 'POST') {
    const clientOrderId = Math.random().toString();

    const body = {
      clientOrderId,
      product_id,
      side,
      order_configuration: {
        market_market_ioc: {
          quote_size,
        },
      },
    };

    let payload = JSON.stringify(body);
    targetUrl = `https://api.coinbase.com/api/v3/brokerage/orders`;
    try {
      const initiateExecuteOrder = await fetch(targetUrl, {
        credentials: 'include',
        method: 'POST',
        withCredentials: true,
        body: payload,
        headers: {
          Accept: 'application/json',
          'CB-VERSION': '2015-04-08',
          Authorization: 'Bearer ' + token,
        },
      });

      const response = await initiateExecuteOrder.json();
      const order = response.data;

      return res.status(200).json(order);
    } catch (error) {
      console.log('this was the user orders error', error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  }
}
