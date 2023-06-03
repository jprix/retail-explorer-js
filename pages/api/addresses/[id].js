import { makeCall } from '../retailClient';
export default async function createAddress(req, res) {
  const { query } = req;

  const { token, id } = query;

  let path = `/v2/accounts/${id}/addresses`;

  if (req.method === 'POST') {
    // Handle a GET request
    try {
      const generateAddress = await makeCall(token, path);
      const response = await generateAddress.json();
      const newAddress = response.data;

      return res.status(200).json(newAddress);
    } catch (error) {
      console.log('this was the user orders error', error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  } else {
    // Handle any other HTTP method
    res.status(400).json({ error: 'Method not allowed' });
  }
}
