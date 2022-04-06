import { historyRouterPush } from '../router';
import storage from '../storage';
import { CustomElement } from '../ui/CustomElement';
import { on, $, showSnackbar } from '../utils';
import { Notification } from '../ui/CustomElement';

class Authentication {
  static _instance: Authentication | null = null;

  static get instance() {
    if (!Authentication._instance) {
      Authentication._instance = new Authentication();
    }
    return Authentication._instance;
  }

  observers: { key: string; element: CustomElement }[] = [];

  subscribe(key: string, element: CustomElement) {
    this.observers.push({ key, element });
    if (this[key]) this[key]();
  }

  dispatch(params: any) {
    const { key, userName } = params;
    const targets = this.observers.filter((observer) => observer.key === key);

    targets.forEach((target) => target.element.notify({ userName } as Notification));
  }

  subscribeSignupPage() {
    on('.signup-form', '@signup', (e: CustomEvent) => this.signup(e.detail), $('signup-page'));
  }

  subscribeLoginPage() {
    on('.login-form', '@login', (e: CustomEvent) => this.login(e.detail), $('login-page'));
  }

  subscribeProfileEditPage() {
    on('.profile-edit-form', '@edit', (e: CustomEvent) => this.editProfile(e.detail), $('profile-edit-page'));
  }

  signup({ email, name, password }) {
    fetch('http://localhost:3000/register', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        name,
        password,
      }),
    })
      .then(async (response) => {
        const body = await response.json();

        if (!response.ok) throw new Error(body);
        historyRouterPush('/javascript-vendingmachine/');
      })
      .catch((err) => {
        showSnackbar(err.message);
      });
  }

  login({ email, password }) {
    fetch('http://localhost:3000/login', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then(async (response) => {
        const body = await response.json();

        if (!response.ok) throw new Error(body);
        const { accessToken, user } = body;
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('user', JSON.stringify(user));

        this.dispatch({ key: 'subscribeLoginPage', userName: user.name });
        historyRouterPush('/javascript-vendingmachine/');
      })
      .catch((err) => {
        showSnackbar(err.message);
      });
  }

  editProfile({ name, password }) {
    const token = localStorage.getItem('accessToken');
    const user = storage.getLocalStorage('user');

    if (!token || !user) return;

    fetch(`http://localhost:3000/users/${user.id}`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        email: user.email,
        name,
        password,
      }),
    })
      .then(async (response) => {
        const { ok } = response;
        const body = await response.json();
        if (!ok) throw new Error(body);

        localStorage.setItem('user', JSON.stringify(body));
        this.dispatch({ key: 'userMenu', userName: body.name });
        historyRouterPush('/javascript-vendingmachine/');
      })
      .catch((err) => {
        showSnackbar(err.message);
      });
  }
}

export default Authentication;
