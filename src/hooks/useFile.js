import { useEffect, useState } from 'react';
import config from '../config.json';

const useFile = (uuid) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${config.apiEndpoint}/file/${uuid}`)
      .then((res) => res.json())
      .then((response) => {
        if (response.status === 'ok') setFile(response.data);
        else setError(response.error);
      })
      .catch((error) => setError(error.message));
  }, [uuid]);

  return [file, error];
};

export default useFile;
