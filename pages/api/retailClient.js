export const makeCall = async (
  token,
  path = '/',
  method = 'GET',
  body = '',
  twoFAcode = ''
) => {
  const baseUrl = process.env.BASE_URL;

  const targetUrl = `https://api.coinbase.com${path}`;
  let headers;

  if (twoFAcode !== '') {
    headers = {
      Accept: 'application/json',
      'CB-VERSION': '2015-04-08',
      Authorization: 'Bearer ' + token,
      'CB-2FA-TOKEN': twoFAcode,
    };
  } else {
    headers = {
      Accept: 'application/json',
      'CB-VERSION': '2015-04-08',
      Authorization: 'Bearer ' + token,
    };
  }

  try {
    const options = {
      method,
      credentials: 'include',
      headers,
    };

    if (body) {
      options.body = body;
    }

    const callRetail = await fetch(targetUrl, options);
    console.log('this is the target url', targetUrl, body);
    console.log('this is the base url', baseUrl);
    return callRetail;
  } catch (e) {
    return e;
  }
};
