import { historyRouterPush } from '../router';
import storage from '../storage';
import { on, $, showSnackbar } from '../utils';
import { validateProfileEdit, validateSignup } from '../validator/authentication';
import { ELEMENT_KEY, BASE_URL, SERVER_ORIGIN, CUSTOM_EVENT } from '../constants';
import { Dispatch, Observer } from './types';

class Authentication {
  observers: Observer[] = [];

  dispatch({ key, action, userName }: Dispatch) {
    const targets = this.observers.filter((observer) => observer.key === key);

    targets.forEach((target) => target.element.notify({ action, userName }));
  }

  observe({ key, element }: Observer) {
    this.observers.push({ key, element });
    this[key]?.();
  }

  subscribeSignupPage() {
    on('.signup-form', CUSTOM_EVENT.AUTH.SIGNUP, (e) => this.signup(e.detail), $('signup-page'));
  }

  subscribeLoginPage() {
    on('.login-form', CUSTOM_EVENT.AUTH.LOGIN, (e) => this.login(e.detail), $('login-page'));
  }

  subscribeProfileEditPage() {
    on('.profile-edit-form', CUSTOM_EVENT.AUTH.EDIT, (e) => this.editProfile(e.detail), $('profile-edit-page'));
  }

  signup({ email, name, password, passwordConfirm }) {
    try {
      validateSignup(name, password, passwordConfirm);
      fetch(SERVER_ORIGIN + '/register', {
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

          this.dispatch({ key: ELEMENT_KEY.SIGNUP, userName: body.user.name });
          historyRouterPush(BASE_URL + '/');
        })
        .catch((err) => {
          showSnackbar(err.message);
        });
    } catch (error) {
      showSnackbar(error.message);
    }
  }

  login({ email, password }) {
    fetch(SERVER_ORIGIN + '/login', {
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

        this.dispatch({ key: ELEMENT_KEY.LOGIN, userName: user.name });
        historyRouterPush(BASE_URL + '/');
      })
      .catch((err) => {
        showSnackbar(err.message);
      });
  }

  editProfile({ name, password, passwordConfirm }) {
    try {
      const token = localStorage.getItem('accessToken');
      const user = storage.getLocalStorage('user');

      validateProfileEdit(password, passwordConfirm, token);
      fetch(`${SERVER_ORIGIN}/users/${user.id}`, {
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
          this.dispatch({ key: ELEMENT_KEY.PROFILE_EDIT, userName: body.name });
          this.dispatch({ key: ELEMENT_KEY.USER_MENU, userName: body.name });
          historyRouterPush(BASE_URL + '/');
        })
        .catch((err) => {
          showSnackbar(err.message);
        });
    } catch (error) {
      showSnackbar(error.message);
    }
  }
}

export default Authentication;
