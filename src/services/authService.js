export async function authenticate(data, url) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((res) => res.json());

    if (response.status === 'error') throw new Error(response.error);
    return response.data;
  } catch (error) {
    throw error;
  }
}
