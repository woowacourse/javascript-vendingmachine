export default class Authorization {
  #isLoggedIn;
  #userId;
  #name;

  constructor() {
    this.#userId = window.sessionStorage.getItem('userId');
    this.#name = window.sessionStorage.getItem('name');
    this.#isLoggedIn = !!this.#userId;
  }

  get isLoggedIn() {
    return this.#isLoggedIn;
  }

  get userName() {
    return this.#name;
  }

  async register(userInputData) {
    const response = await fetch(
      'https://vendingmachine-auth-server.herokuapp.com/users',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userInputData),
      }
    ).then((res) => res.json());

    const {
      accessToken,
      user: { id: userId, name },
    } = response;

    this.#saveUserData({ accessToken, userId, name });
    this.#isLoggedIn = true;
  }

  async update(userInputData) {
    const response = await fetch(
      `https://vendingmachine-auth-server.herokuapp.com/users/${this.#userId}`,
      {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userInputData),
      }
    ).then((res) => res.json());

    const {
      accessToken,
      user: { id: userId, name },
    } = response;

    this.#saveUserData({ accessToken, userId, name });
    this.#isLoggedIn = true;
  }

  async login(userInputData) {
    const response = await fetch(
      'https://vendingmachine-auth-server.herokuapp.com/signin',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userInputData),
      }
    ).then((res) => res.json());

    const {
      accessToken,
      user: { id: userId, name },
    } = response;

    this.#saveUserData({ accessToken, userId, name });
    this.#isLoggedIn = true;
  }

  logout() {
    window.sessionStorage.removeItem('accessToken');
    window.sessionStorage.removeItem('userId');

    this.#userId = null;
    this.#isLoggedIn = false;
  }

  #saveUserData({ accessToken, userId, name }) {
    window.sessionStorage.setItem('accessToken', accessToken);
    window.sessionStorage.setItem('userId', userId);
    window.sessionStorage.setItem('name', name);

    this.#userId = userId;
    this.#name = name;
  }
}
