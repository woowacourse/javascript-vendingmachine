import { checkValidProfile } from './domains/validator';

class Auth {
  #isLoggedIn;

  constructor() {
    this.#isLoggedIn = false;
  }

  get isLoggedIn() {
    return this.#isLoggedIn;
  }

  #setUserAuth = (userAuth) => {
    localStorage.setItem('userAuth', JSON.stringify(userAuth));
  };

  getUserAuth = () => {
    return JSON.parse(localStorage.getItem('userAuth'));
  };

  #getUserTokenId = () => {
    const userAuth = this.getUserAuth();
    return {
      accessToken: `Bearer ${userAuth.accessToken}`,
      userUrl: `${API_URL}/664/users/${userAuth.id}`,
    };
  };

  deleteUserAuth = () => {
    this.#isLoggedIn = false;
    localStorage.removeItem('userAuth');
  };

  getUserData = async () => {
    const { accessToken, userUrl } = this.#getUserTokenId();
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

  checkUserLoginStatus = async () => {
    const userAuth = this.getUserAuth();
    if (!userAuth) {
      this.#isLoggedIn = false;
      return;
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
      this.#isLoggedIn = false;
    }
    this.#isLoggedIn = true;
  };

  signupAuth = async ({ email, name, password, passwordCheck }) => {
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

  loginAuth = async ({ email, password }) => {
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
    this.#setUserAuth(userAuth);
    this.#isLoggedIn = true;

    return true;
  };

  editProfileAuth = async ({ name, password, passwordCheck }) => {
    if (checkValidProfile(name, password, passwordCheck)) {
      const { accessToken, userUrl } = this.#getUserTokenId();
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

  getUserFirstName = async () => {
    const { accessToken, userUrl } = this.#getUserTokenId();
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
      this.deleteUserAuth();
      return false;
    }
    const data = await response.json();

    return data.name[0];
  };
}

const auth = new Auth();

export default auth;
