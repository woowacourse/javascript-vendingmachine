const request = async (url, option) => {
  const response = await fetch(url, option);
  const data = await response.json();

  if (!response.ok) throw new Error(data);

  return data;
};

export const requestRegister = async (
  email: string,
  name: string,
  password: string
) => {
  const response = await request('http://localhost:3000/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      name,
      password,
    }),
  });

  return response;
};
