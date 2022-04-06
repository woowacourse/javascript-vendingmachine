const HOST_NAME = 'https://vendingmachine.compy.life';

interface IRequest {
  status: boolean;
  content: object;
}

const request = async (url: string, option: RequestInit): Promise<IRequest> => {
  const response: Response = await fetch(HOST_NAME + url, option);
  const data = await response.json();

  return { status: response.ok, content: data };
};

export const requestRegister = async (email: string, name: string, password: string) => {
  const response = await request('/register', {
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

export const requestLogin = async (email: string, password: string) => {
  const response = await request('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  return response;
};

export const requestUserInfo = async (id: number, accessToken: string) => {
  const response = await request(`/users/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response;
};
