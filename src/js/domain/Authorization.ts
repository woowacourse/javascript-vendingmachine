export default class Authorization {
  #isLoggedIn;
  #userId;

  constructor() {
    this.#isLoggedIn = false;
    this.#userId = JSON.parse(window.sessionStorage.getItem('userId'));
  }

  get isLoggedIn() {
    return this.#isLoggedIn;
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
      user: { id: userId },
    } = response;

    this.#saveUserData({ accessToken, userId });
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
      user: { id: userId },
    } = response;

    this.#saveUserData({ accessToken, userId });
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
      user: { id: userId },
    } = response;

    this.#saveUserData({ accessToken, userId });
    this.#isLoggedIn = true;
  }

  logout() {
    window.sessionStorage.removeItem('accessToken');
    window.sessionStorage.removeItem('userId');

    this.#userId = null;
    this.#isLoggedIn = false;
  }

  #saveUserData({ accessToken, userId }) {
    window.sessionStorage.setItem('accessToken', accessToken);
    window.sessionStorage.setItem('userId', userId);

    this.#userId = userId;
  }
}
