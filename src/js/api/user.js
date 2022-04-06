const baseURL = 'https://immense-spire-44992.herokuapp.com/';

const UserApi = {
  signIn: async (email, password) => {
    const response = await fetch(`${baseURL}login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      const errorMessage = await response.json();
      throw Error(errorMessage);
    }
    return response.json();
  },

  signUp: async (email, name, password) => {
    const data = { email, password, name };
    const response = await fetch(`${baseURL}signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorMessage = await response.json();
      throw Error(errorMessage);
    }
    return response.json();
  },

  searchInfo: async (accessToken) => {
    const response = await fetch(`${baseURL}users/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) {
      const errorMessage = await response.json();
      throw Error(errorMessage);
    }
    return response.json();
  },

  update: async (accessToken, id, { email, name, password }) => {
    const response = await fetch(`${baseURL}users/${id}`, {
      headers: {
        method: 'POST',
        Authorization: `Bearer ${accessToken}`,
        body: JSON.stringify({ email, name, password }),
      },
    });
    if (!response.ok) {
      const errorMessage = await response.json();
      throw Error(errorMessage);
    }
    return response.json();
  },
};

export default UserApi;
