const request = async (url: string, option: object) => {
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
  const response = await request(
    'https://vendingmachine-json-server.herokuapp.com/register',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        name,
        password,
      }),
    }
  );

  return response;
};

export const requestSignIn = async (email: string, password: string) => {
  const response = await request(
    'https://vendingmachine-json-server.herokuapp.com/signin',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }
  );

  return response;
};

export const requestUserInfo = async (accessToken: string, userId: string) => {
  const response = await request(
    `https://vendingmachine-json-server.herokuapp.com/600/users/${userId}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return response;
};

export const requestEditInformation = async (accessToken: string, user) => {
  const response = await request(
    `https://vendingmachine-json-server.herokuapp.com/users/${user.id}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(user),
    }
  );

  return response;
};
