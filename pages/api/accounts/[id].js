export default async function listAccount(req, res) {
  const { query } = req;

  const { token, account_id } = query;

  let targetUrl = `https://api.coinbase.com/v2/accounts/${account_id}`;

  if (req.method === 'GET') {
    // Handle a GET request
    try {
      const getAccount = await fetch(targetUrl, {
        credentials: 'include',
        method: 'GET',
        withCredentials: true,
        headers: {
          Accept: 'application/json',
          'CB-VERSION': '2015-04-08',
          Authorization: 'Bearer ' + token,
        },
      });
      console.log('this was the get account', targetUrl);
      //console.log(getAccount);
      const response = await getAccount.json();
      const AccountById = response.data;

      return res.status(200).json(AccountById);
    } catch (error) {
      console.log('this was the user orders error', error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  } else {
    // Handle any other HTTP method
    res.status(400).json({ error: 'Method not allowed' });
  }
}
