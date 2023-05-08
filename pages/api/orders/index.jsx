// export async function post(request) {
//   console.log(request.url.searchParams.get('amount'));
//   const amount = request.url.searchParams.get('amount');

//   console.log(request.url.searchParams.get('currency'));
//   const currency = request.url.searchParams.get('currency');

//   console.log(request.url.searchParams.get('access_token'));
//   access_token = request.url.searchParams.get('access_token');
//   console.log(request.url.searchParams.get('quote'));
//   const quote = request.url.searchParams.get('quote');
//   if (quote) {
//     payload = {
//       amount: amount,
//       currency: currency,
//       quote: true,
//     };
//   } else {
//     payload = {
//       amount: amount,
//       currency: currency,
//     };
//   }

//   let url =
//     'https://api.coinbase.com/v2/accounts/f4f84a96-1e1a-5346-b594-a5c25cdf874e/buys';

//   const createOrders = await fetch(url, {
//     credentials: 'include',
//     method: 'POST',
//     withCredentials: true,
//     body: new URLSearchParams(payload),
//     headers: {
//       Accept: 'application/json',
//       'CB-VERSION': '2015-04-08',
//       Authorization: 'Bearer ' + access_token,
//     },
//   });

//   const placeOrder = await createOrders.json();
//   const result = placeOrder.data;
//   console.log(result);
//   return {
//     status: 201,
//     body: result,
//   };
// }

export default async function listOrders(req, res) {
  const { query } = req;

  const access_token = query.token;
  console.log(access_token);
  let targetUrl = `https://api.coinbase.com/v2/accounts`;

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
          Authorization: 'Bearer ' + access_token,
        },
      });

      const response = await getOrders.json();
      const userOrders = response.data;

      return res.status(200).json(userOrders);
    } catch (error) {
      console.log('this was the user profile error', error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  } else {
    // Handle any other HTTP method
    res.status(400).json({ error: 'Method not allowed' });
  }
}
