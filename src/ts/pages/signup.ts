import { API } from '../../apis';
import { basePath } from '../component/App';
import { $, replaceHTML } from '../utils/dom';
import { validateSignup } from './validator';

export default class SignupPage {
  constructor(private readonly routePage) {
    this.routePage = routePage;
  }

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

  signupHandler = async (e: Event) => {
    e.preventDefault();
    if (!(e.target instanceof HTMLFormElement)) return;

    const emailInput = e.target.elements.namedItem('emailInput');
    const pwInput = e.target.elements.namedItem('pwInput');
    const rePwInput = e.target.elements.namedItem('rePwInput');
    const nameInput = e.target.elements.namedItem('nameInput');

    if (!(emailInput instanceof HTMLInputElement)) return;
    if (!(pwInput instanceof HTMLInputElement)) return;
    if (!(rePwInput instanceof HTMLInputElement)) return;
    if (!(nameInput instanceof HTMLInputElement)) return;

    try {
      if (pwInput.value !== rePwInput.value)
        throw new Error('비밀번호가 일치하지 않습니다.');
    } catch ({ message }) {
      alert(message);
      return;
    }

    try {
      validateSignup(emailInput.value, pwInput.value, nameInput.value);
    } catch ({ message, name }) {
      alert(message);
      return;
    }

    const response = await API.signup({
      email: emailInput.value,
      name: nameInput.value,
      password: pwInput.value,
    });

    if (typeof response === 'string') {
      alert(response);
      return;
    }

    alert(`${nameInput.value}님 회원가입에 성공했습니다.`);

    history.pushState({}, '', `${basePath}/`);
    this.routePage(`${basePath}/`);
  };
}
