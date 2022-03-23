const API = 'http://localhost:8000/api';

export async function authenticate(data, path) {
  const response = await fetch(`${API}/${path}`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ ...data }),
  }).then((res) => res.json());

  if (!response.ok) throw new Error(response.message);
  return response;
}
