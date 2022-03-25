import React, { useEffect, useState } from 'react';
import config from '../config.json';

const Dashboard = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setloading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('uAccessToken') || '');
    if (!token) return setError('Login to access this route.');

    (async function () {
      try {
        const response = await fetch(`${config.apiEndpoint}/dashboard`, {
          method: 'GET',
          headers: {
            'x-authorization': `Bearer ${token}`,
          },
        }).then((res) => res.json());

        if (
          response.status === 'error' &&
          (response.statusCode === 401 || response.statusCode === 403)
        ) {
          localStorage.removeItem('uAccessToken');
          setError(response.error);
        }

        setError(null);
        setloading(null);
        setUserInfo(response.data);
      } catch (error) {
        setloading(false);
        setError(error);
      }
    })();
  }, []);

  if (loading) return <h1>LOADING</h1>;
  if (error) return <h4>ERROR: {JSON.stringify(error)}</h4>;

  return (
    <div>
      User Data:
      {JSON.stringify(userInfo)}
    </div>
  );
};

export default Dashboard;
