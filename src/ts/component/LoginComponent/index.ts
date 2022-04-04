import { API } from '../../../apis';
import { $, replaceHTML } from '../../utils/dom';
import { basePath } from '../App';

export default class LoginComponent {
  constructor(private readonly renderMainContent) {
    this.renderMainContent = renderMainContent;
  }
  render() {
    replaceHTML($('#app'), this.#template());
    $('.login-form').addEventListener('submit', this.loginHandler);
    $('.signup-button').addEventListener('click', this.signupButtonHandler);
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

  loginHandler = async e => {
    e.preventDefault();
    if (!(e.target instanceof HTMLFormElement)) return;

    const { emailInput, pwInput } = e.target.elements;
    const response = await API.login({
      email: emailInput.value,
      password: pwInput.value,
    });

    if (typeof response === 'string') return;

    document.cookie = `user_id=${response.user.id}`;
    document.cookie = `access_token=${response.accessToken}`;
  };

  signupButtonHandler = e => {
    if (!(e.target instanceof HTMLButtonElement)) return;
    const pathname = `${basePath}${e.target.dataset.pathname}`;

    history.pushState({}, '', pathname || '/');

    this.renderMainContent(pathname);
  };
}
