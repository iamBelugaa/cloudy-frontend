import { Redirect } from 'react-router-dom';

export async function fetchData(url, token) {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'x-authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok && !response.status === 400)
      throw new Error(response.statusText);

    const data = await response.json();

    if (
      data.status === 'error' &&
      (data.statusCode === 401 ||
        data.statusCode === 403 ||
        data.statusCode === 404)
    ) {
      localStorage.removeItem('uAccessToken');
      return <Redirect to="/login" />;
    }

    if (data.status === 'error') throw new Error(data.error);
    return data.data || data.message || data.files || data.token;
  } catch (error) {
    throw error;
  }
}

export async function postData(url, token, body, method) {
  try {
    const response = await fetch(url, {
      method,
      headers: {
        'x-authorization': `Bearer ${token}`,
        'Content-Type': body ? 'application/json' : '',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok && !response.status === 400)
      throw new Error(response.statusText);

    const data = await response.json();

    if (
      data.status === 'error' &&
      (data.statusCode === 401 ||
        data.statusCode === 403 ||
        data.statusCode === 404)
    ) {
      localStorage.removeItem('uAccessToken');
      return <Redirect to="/login" />;
    }

    if (data.status === 'error') throw new Error(data.error);
    return data.data || data.message || data.files || data.token;
  } catch (error) {
    throw error;
  }
}
