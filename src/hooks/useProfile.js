import { getTokenFromLocalstorage } from '../utils';
import { useState, useEffect } from 'react';
import { getProfile } from '../services/profileService';

export function useProfile(url) {
  const token = getTokenFromLocalstorage('userSID');
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async function () {
      try {
        const profile = await getProfile(url, token);
        if (!profile) return;

        setError(null);
        setProfile(profile);
      } catch (error) {
        setError(error.message);
      }
    })();
  }, [token, url]);

  return [profile, error];
}
