import { historyRouterPush } from '../router';
import { CustomElement } from '../ui/CustomElement';
import { on, $, showSnackbar } from '../utils';

class Authentication {
  static _instance: Authentication | null = null;

  static get instance() {
    if (!Authentication._instance) {
      Authentication._instance = new Authentication();
    }
    return Authentication._instance;
  }

  subscribe(key: string, element: CustomElement) {
    this[key]();
  }

  subscribeSignupPage() {
    on('.signup-form', '@signup', (e: CustomEvent) => this.signup(e.detail), $('signup-page'));
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
}

export default Authentication;
