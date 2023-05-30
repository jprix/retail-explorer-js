export default async function OrderById(req, res) {
  const { query } = req;

  const { token, account_id, id } = query;
  console.log(token, id);
  let targetUrl = `https://api.coinbase.com/api/v3/brokerage/orders/historical/${id}`;

  if (req.method === 'GET') {
    try {
      const getOrderById = await fetch(targetUrl, {
        credentials: 'include',
        method: 'GET',
        withCredentials: true,
        headers: {
          Accept: 'application/json',
          'CB-VERSION': '2015-04-08',
          Authorization: 'Bearer ' + token,
        },
      });

      const response = await getOrderById.json();
      const userOrder = response.order;

      return res.status(200).json(userOrder);
    } catch (error) {
      console.log('this was the user profile error', error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  } else {
    // Handle any other HTTP method
    res.status(400).json({ error: 'Method not allowed' });
  }
}
