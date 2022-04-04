import { API } from '../../apis';
import { basePath } from '../component/App';
import { $, replaceHTML } from '../utils/dom';

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

  signupHandler = async e => {
    e.preventDefault();
    if (!(e.target instanceof HTMLFormElement)) return;

    const { emailInput, nameInput, pwInput } = e.target.elements;
    const response = await API.signup({
      email: emailInput.value,
      name: nameInput.value,
      password: pwInput.value,
    });

    if (typeof response === 'string') return;

    alert(`${nameInput.value}님 회원가입에 성공했습니다.`);

    history.pushState({}, '', `${basePath}/`);
    this.routePage(`${basePath}/`);
  };
}
