export default async function handler(req, res) {
  const { query } = req;

  const access_token = query.token;
  console.log(access_token);
  let targetUrl = `https://api.coinbase.com/v2/user`;
  if (req.method === 'GET') {
    // Handle a GET request
    try {
      const getUser = await fetch(targetUrl, {
        credentials: 'include',
        method: 'GET',
        withCredentials: true,
        headers: {
          Accept: 'application/json',
          'CB-VERSION': '2015-04-08',
          Authorization: 'Bearer ' + access_token,
        },
      });
      const userProfile = await getUser.json();
      return res.status(200).json(userProfile);
    } catch (error) {
      console.log('this was the user profile error', error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  } else {
    // Handle any other HTTP method
    res.status(400).json({ error: 'Method not allowed' });
  }
}
