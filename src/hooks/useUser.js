import { useState, useEffect } from 'react';
import { fetchData as getUserData } from '../services/httpService';

export const useUser = (url, token) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getUserData(url, token)
      .then((data) => {
        if (!data) return;
        setUser(data);
      })
      .catch((error) => setError(error.message));
  }, [token, url]);

  return [user, error];
};
