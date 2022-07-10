import { useEffect, useState } from 'react';
import config from '../config.json';
import { fetchData } from '../services/httpService';

export function useFiles(filter, token) {
  const [files, setFiles] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async function () {
      try {
        const endpoint = filter ? `/${filter}` : '/files';
        const url = `${config.userApiEndpoint}${endpoint}`;

        const files = await fetchData(url, token);
        if (files) setFiles(files);
      } catch (error) {
        setError(error.message);
      }
    })();
  }, [filter, token]);

  return [files, setFiles, error];
}
