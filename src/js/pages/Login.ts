import routes from '../routes';
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

    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: data,
      });

      console.log(response);

      if (!response.ok) {
        throw new Error('잘못 입력 했습니다.');
      }

      const {
        accessToken,
        user: { id },
      } = await response.json();

      console.log(accessToken, id);
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('id', id);

      const { pathname } = window.location;
      history.pushState({}, '상품 관리하기', pathname + '#!/product-manage');
      routes();
    } catch (e) {
      alert(e);
    }
  };
}
