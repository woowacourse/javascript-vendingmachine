import { API } from '../../apis';
import { $, replaceHTML } from '../utils/dom';
import { basePath } from '../../App';
import { showSnackbar } from '../utils';

export default class LoginPage {
  constructor(readonly routePage) {
    this.routePage = routePage;
  }

  render() {
    replaceHTML($('#app'), this.#template());
    $('.login-form').addEventListener('submit', this.#loginSubmitHandler);
    $('.signup-button').addEventListener('click', this.#signupButtonHandler);
  }

  #template() {
    return `
      <h2 class="title">로그인</h2>
      <form class="login-form">
        <label for="email-input" class="input-description">이메일</label>
        <input id="email-input" type="email" class="form__input" placeholder="woowacourse@gmail.com" name="emailInput" />
        <label for="pw-input" class="input-description">비밀번호</label>
        <input id="pw-input" type="password" class="form__input" placeholder="비밀번호를 입력해주세요." name="pwInput" />
        <button class="form__button submit-button">확인</button>
        <p class="signup-description">아직 회원이 아시신가요? <button class="signup-button" data-pathname="/signup">회원가입</button></p>
      </form>
    `;
  }

  #loginSubmitHandler = async (e: Event) => {
    e.preventDefault();
    if (!(e.target instanceof HTMLFormElement)) return;

    const emailInput = e.target.elements.namedItem('emailInput');
    const pwInput = e.target.elements.namedItem('pwInput');

    if (!(emailInput instanceof HTMLInputElement)) return;
    if (!(pwInput instanceof HTMLInputElement)) return;

    try {
      const response = await API.login({
        email: emailInput.value,
        password: pwInput.value,
      });
      document.cookie = `user_id=${response.user.id}`;
      document.cookie = `access_token=${response.accessToken}`;
      this.routePage(`${basePath}/`);
    } catch ({ message }) {
      showSnackbar(message);
    }
  };

  #signupButtonHandler = (e: Event) => {
    if (!(e.target instanceof HTMLButtonElement)) return;
    const pathname = `${basePath}${e.target.dataset.pathname}`;

    this.routePage(pathname);
  };
}
