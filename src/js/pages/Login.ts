import api from '../api';
import showSnackbar from '../components/Snackbar';
import router from '../router/index';
import template from '../template';

export default class Login {
  $headerTitle: HTMLElement;
  $contentsContainer: HTMLElement;
  $loginForm: HTMLFormElement;
  $loginEmail: HTMLInputElement;
  $loginPassword: HTMLInputElement;

  constructor() {
    this.$headerTitle = document.querySelector('#header-title');
    this.$contentsContainer = document.querySelector('.contents-container');
  }

  render() {
    this.$contentsContainer.insertAdjacentHTML('beforeend', template.loginContainer());
    this.$headerTitle.textContent = '로그인';

    this.$loginForm = this.$contentsContainer.querySelector('#login-form');
    this.$loginEmail = this.$contentsContainer.querySelector('#login-email');
    this.$loginPassword = this.$contentsContainer.querySelector('#login-password');
    this.$loginForm.addEventListener('submit', this.onSubmitLogin);
  }

  onSubmitLogin = async (e: SubmitEvent) => {
    e.preventDefault();

    const data = JSON.stringify({
      email: this.$loginEmail.value,
      password: this.$loginPassword.value,
    });

    const res = await api.postUserLogin(data);

    if (typeof res === 'string') {
      showSnackbar(res);
      return;
    }

    const { accessToken, user } = res;

    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('user', JSON.stringify(user));

    router.to('#!/product-manage');
  };
}
