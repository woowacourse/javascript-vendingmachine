import routes from '../routes';
import template from '../template';

export default class Signup {
  $headerTitle: HTMLElement;
  $contentsContainer: HTMLElement;
  $signupForm: HTMLFormElement;
  $signupEmail: HTMLInputElement;
  $signupName: HTMLFormElement;
  $signupPassword: HTMLInputElement;
  $signupPasswordCheck: HTMLInputElement;

  constructor() {
    this.$headerTitle = document.querySelector('#header-title');
    this.$contentsContainer = document.querySelector('.contents-container');
  }

  render() {
    this.$contentsContainer.insertAdjacentHTML('beforeend', template.signupContainer());
    this.$headerTitle.textContent = '회원가입';

    this.$signupForm = this.$contentsContainer.querySelector('#signup-form');
    this.$signupEmail = this.$contentsContainer.querySelector('#signup-email');
    this.$signupName = this.$contentsContainer.querySelector('#signup-name');
    this.$signupPassword = this.$contentsContainer.querySelector('#signup-password');
    this.$signupPasswordCheck = this.$contentsContainer.querySelector('#signup-password-check');

    this.$signupForm.addEventListener('submit', this.onSubmitLogin);
  }

  onSubmitLogin = async (e: SubmitEvent) => {
    e.preventDefault();

    const data = JSON.stringify({
      email: this.$signupEmail.value,
      name: this.$signupName.value,
      password: this.$signupPassword.value,
    });

    console.log(data);

    try {
      const response = await fetch('http://localhost:3000/signup', {
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
