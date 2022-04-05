import { checkValidProfile } from './domains/validator';

const setUserAuth = (userAuth) => {
  localStorage.setItem('userAuth', JSON.stringify(userAuth));
};

export const getUserAuth = () => {
  return JSON.parse(localStorage.getItem('userAuth'));
};

const getUserTokenId = () => {
  const userAuth = getUserAuth();
  return {
    accessToken: `Bearer ${userAuth.accessToken}`,
    userUrl: `${API_URL}/664/users/${userAuth.id}`,
  };
};

export const deleteUserAuth = () => {
  localStorage.removeItem('userAuth');
};

export const getUserData = async () => {
  const { accessToken, userUrl } = getUserTokenId();
  const response = await fetch(userUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': accessToken,
    },
  });
  if (!response.ok) {
    throw new Error(`API에러: ${await response.text()}`);
  }
  const data = await response.json();

  return { email: data.email, name: data.name };
};

export const checkUserLoginStatus = async () => {
  const userAuth = getUserAuth();
  if (!userAuth) {
    return false;
  }
  const accessToken = `Bearer ${userAuth.accessToken}`;
  const userUrl = `${API_URL}/440/users/${userAuth.id}`;

  const response = await fetch(userUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': accessToken,
    },
  });
  if (!response.ok) {
    return false;
  }
  return true;
};

export const signupAuth = async ({ email, name, password, passwordCheck }) => {
  if (checkValidProfile(name, password, passwordCheck)) {
    const response = await fetch(`${API_URL}/signup`, {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`API에러: ${await response.text()}`);
    }

    return true;
  }
};

export const loginAuth = async ({ email, password }) => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error(`API에러: ${await response.text()}`);
  }
  const data = await response.json();
  const userAuth = {
    accessToken: data.accessToken,
    id: data.user.id,
  };
  setUserAuth(userAuth);

  return true;
};

export const editProfileAuth = async ({ name, password, passwordCheck }) => {
  if (checkValidProfile(name, password, passwordCheck)) {
    const { accessToken, userUrl } = getUserTokenId();
    const response = await fetch(userUrl, {
      method: 'PATCH',
      body: JSON.stringify({ name, password }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': accessToken,
      },
    });

    if (!response.ok) {
      throw new Error(`API에러: ${await response.text()}`);
    }

    return true;
  }
};

export const getUserFirstName = async () => {
  const { accessToken, userUrl } = getUserTokenId();
  if (!userUrl || !accessToken) {
    return;
  }
  const response = await fetch(userUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': accessToken,
    },
  });
  if (!response.ok) {
    deleteUserAuth();
    return false;
  }
  const data = await response.json();

  return data.name[0];
};
