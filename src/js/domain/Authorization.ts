export default class Authorization {
  #isLoggedIn;
  #userId;
  #name;
  #email;

  constructor() {
    this.#userId = window.sessionStorage.getItem('userId');
    this.#name = window.sessionStorage.getItem('name');
    this.#email = window.sessionStorage.getItem('email');
    this.#isLoggedIn = !!this.#userId;
  }

  get isLoggedIn() {
    return this.#isLoggedIn;
  }

  get name() {
    return this.#name;
  }

  get email() {
    return this.#email;
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
      user: { id: userId, name, email },
    } = response;

    this.#saveUserData({ userId, name, email });
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

    const { id: userId, name, email } = response;

    this.#saveUserData({ userId, name, email });
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
      user: { id: userId, name, email },
    } = response;

    this.#saveUserData({ userId, name, email });
    this.#isLoggedIn = true;
  }

  logout() {
    window.sessionStorage.removeItem('accessToken');
    window.sessionStorage.removeItem('userId');

    this.#userId = null;
    this.#isLoggedIn = false;
  }

  #saveUserData({ userId, name, email }) {
    window.sessionStorage.setItem('userId', userId);
    window.sessionStorage.setItem('name', name);
    window.sessionStorage.setItem('email', email);

    this.#userId = userId;
    this.#name = name;
    this.#email = email;
  }
}
