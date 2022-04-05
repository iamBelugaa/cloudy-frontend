async function authenticate(data, url) {
  try {
    return await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((res) => res.json());
  } catch (error) {
    throw error;
  }
}

export const register = (data) => authenticate(data, '/register');

export const login = (data, path) => authenticate(data, path);
