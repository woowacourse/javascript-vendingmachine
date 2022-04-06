import { COOKIE_EXPIRED_PERIOD } from '../constant/rule';
import { SELECTOR } from '../constant/selector';
import { KEY } from '../constant/storageKey';
import { loginUserPageTemplate } from '../template';
import { selectDom, showSnackbar } from '../utils';
import { setCookie } from '../utils/cookie';
import { login } from '../vendingMachine/authLogic';

class LoginUserPage {
  constructor() {
    this.app = selectDom(SELECTOR.APP);
    this.loginForm = null;
    this.snackbar = null;
  }

  renderInitialLoginPageState() {
    this.app.replaceChildren();
    this.app.insertAdjacentHTML('afterbegin', loginUserPageTemplate);

    this.loginForm = selectDom(SELECTOR.USER_INFO_FORM, this.app);
    this.snackbar = selectDom(SELECTOR.SNACKBAR, this.app);

    this.loginForm.addEventListener('submit', this.#onSubmitLoginForm);
  }

  #onSubmitLoginForm = async (e) => {
    e.preventDefault();
    const { email, password } = e.target;
    try {
      const [ok, body] = await login({
        email: email?.value.trim() ?? '',
        password: password?.value.trim() ?? '',
      });
      if (!ok) {
        throw new Error(body);
      }

      const {
        accessToken,
        user: { name },
      } = body;

      setCookie(KEY.ACCESS_TOKEN, accessToken, COOKIE_EXPIRED_PERIOD);
      localStorage.setItem(KEY.USER_NAME, name);
    } catch (error) {
      showSnackbar(this.snackbar, error.message);
      return;
    }
    location.hash = '';
  };
}

export default LoginUserPage;
