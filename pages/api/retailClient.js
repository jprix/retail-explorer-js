export const makeCall = async (
  token,
  path = '/',
  method = 'GET',
  body = ''
) => {
  const baseUrl = process.env.BASE_URL;
  const targetUrl = `${baseUrl}${path}`;
  const headers = {
    Accept: 'application/json',
    'CB-VERSION': '2015-04-08',
    Authorization: 'Bearer ' + token,
  };

  try {
    if (body) {
      const callRetail = await fetch(targetUrl, {
        method,
        body,
        credentials: 'include',
        headers,
      });
      return callRetail;
    } else {
      console.log('this is the target url', targetUrl);
      const callRetail = await fetch(targetUrl, {
        method,
        credentials: 'include',
        headers,
      });
      console.log('this is the call retail', callRetail);
      return callRetail;
    }
  } catch (e) {
    return e;
  }
};
