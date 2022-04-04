import { API } from '../../../apis';
import { $, replaceHTML } from '../../utils/dom';

export default class SignupComponent {
  render() {
    replaceHTML($('#app'), this.#template());
    $('.signup-form').addEventListener('submit', this.signupHandler);
  }

  #template() {
    return `
      <h2 class="title">회원가입</h2>
      <form class="signup-form form">
        <label for="email-input" class="input-description">이메일</label>
        <input id="email-input" type="email" class="form__input" placeholder="woowacourse@gmail.com" name="emailInput" />
        <label for="name-input" class="input-description">이름</label>
        <input id="name-input" type="text" class="form__input" placeholder="이름을 입력해주세요." name="nameInput" />
        <label for="pw-input" class="input-description">비밀번호</label>
        <input id="pw-input" type="password" class="form__input" placeholder="비밀번호를 입력해주세요." name="pwInput" />
        <label for="re-pw-input" class="input-description">비밀번호 확인</label>
        <input id="re-pw-input" type="password" class="form__input" placeholder="비밀번호를 입력해주세요." name="rePwInput" />
        <button class="form__button submit-button">확인</button>
      </form>
    `;
  }

  signupHandler = async e => {
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
}
