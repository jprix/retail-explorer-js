export default async function handler(req, res) {
  console.log('hit api');
  if (req.method === 'POST') {
    // Handle a POST request
    const { query } = req;
    console.log('this is the query ', query.code);
    const targetUrl = `https://api.coinbase.com/oauth/token`;
    const payload = {
      grant_type: 'authorization_code',
      code: query.code,
      client_id:
        '087facde449a1039b4270e84dde9cd02f170f191394a72deb868c978d2bba803',
      client_secret:
        'ab180bdfce5e26c25e4b563253d59499a1e16abee7d8ab99fcf8bdd89e6897d5',
      redirect_uri: 'http://localhost:3000/',
    };
    try {
      const tokenResponse = await fetch(targetUrl, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        method: 'POST',
        body: new URLSearchParams(payload),
      });

      const data = await tokenResponse.json();
      res.status(tokenResponse.status).json(data);

      return data;
    } catch (error) {
      console.log('this was the token error', error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  } else {
    // Handle any other HTTP method
    res.status(400).json({ error: 'Method not allowed' });
  }
}
