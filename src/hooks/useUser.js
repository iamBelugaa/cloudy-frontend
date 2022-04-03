import { useState, useEffect } from 'react';
import { getUserData } from '../services/dashboardService';

export const useUser = (token) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getUserData(token)
      .then((data) => {
        if (!data) return;
        setUser(data);
      })
      .catch((error) => setError(error.message));
  }, [token]);

  return [user, error];
};
