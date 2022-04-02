import { useEffect, useState } from 'react';
import config from '../config.json';

export function useFiles(filter, token) {
  const [files, setFiles] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async function () {
      try {
        const endpoint = filter ? `/${filter}` : '/files';
        const response = await fetch(`${config.apiEndpoint}${endpoint}`, {
          method: 'GET',
          headers: {
            'x-authorization': `Bearer ${token}`,
          },
        }).then((res) => res.json());

        if (response.status === 'ok') setFiles(response.files);
        else setError(response.message);
      } catch (error) {
        setError(error.message);
      }
    })();
  }, [filter, token]);

  return [files, setFiles, error];
}
