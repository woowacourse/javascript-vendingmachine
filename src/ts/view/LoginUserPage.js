import { loginUserPageTemplate } from '../template';
import { selectDom } from '../utils';
import { setCookie } from '../utils/cookie';
import { login } from '../vendingMachine/authLogic';

class LoginUserPage {
  constructor() {
    this.app = selectDom('#app');
  }

  renderInitialLoginPageState() {
    this.app.replaceChildren();
    this.app.insertAdjacentHTML('afterbegin', loginUserPageTemplate);

    this.loginForm = selectDom('.user-info-form', this.app);

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

      setCookie('accessToken', accessToken, 3);
      localStorage.setItem('user-name', name);
    } catch (error) {
      alert(error.message);
      return;
    }

    location.href = location.origin;
  };
}

export default LoginUserPage;
