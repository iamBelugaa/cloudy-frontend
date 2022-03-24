import React, { useEffect, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { toastify } from '../utils';
import { ToastContainer } from 'react-toastify';
import { useHistory } from 'react-router-dom';

const Dashboard = () => {
  const [token] = useLocalStorage('accessToken');
  const [userData, setUserData] = useState(null);
  const history = useHistory();

  useEffect(() => {
    if (!token) return history.push('/login');

    fetch('http://localhost:8000/api/dashboard', {
      method: 'GET',
      headers: {
        'x-Authorizaton': `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.status === 'error' || !response.ok) {
          toastify(response.error, 'error');
          localStorage.removeItem('accessToken');
          return history.push('/login');
        }
        setUserData(response);
      });
  }, []);

  return (
    <>
      <div>Dashboard</div>
      <p>
        User Information:
        {userData ? JSON.stringify(userData, null, 2) : 'Fetching'}
      </p>
      <ToastContainer />
    </>
  );
};

export default Dashboard;
