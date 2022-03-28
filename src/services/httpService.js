import { Redirect } from 'react-router-dom';
import config from '../config.json';

export const fetchData = async (path, token, method = 'GET', body = {}) => {
  try {
    const getMethodOptions = {
      method: 'GET',
      headers: {
        'x-authorization': `Bearer ${token}`,
      },
    };

    const otherMethodOptions = {
      method,
      headers: {
        'x-authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ body }),
    };

    let response;

    if (method === 'GET')
      response = await fetch(`${config.apiEndpoint}${path}`, getMethodOptions);
    else
      response = await fetch(
        `${config.apiEndpoint}${path}`,
        otherMethodOptions
      );

    if (!response.ok) throw new Error(response.statusText);
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
    return data.data || data.message || data.files;
  } catch (error) {
    throw error;
  }
};
