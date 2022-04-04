import { API } from '../../apis';
import type { UserInfoWithPassWord } from '../../apis';

import { basePath } from '../component/App';
import { getCookie } from '../utils';
import { $, replaceHTML } from '../utils/dom';

export default class UserEditPage {
  private user: UserInfoWithPassWord;
  constructor(private readonly routePage) {
    this.routePage = routePage;
  }

  async render() {
    replaceHTML($('#app'), await this.#template());
    $('.edit-form').addEventListener('submit', this.editHandler);
  }

  async #template() {
    const userId = getCookie('user_id');
    const accessToken = getCookie('access_token');

    this.user = await API.getUser(userId, accessToken);

    const { email, name } = this.user;

    return `
      <h2 class="title">회원가입</h2>
      <form class="edit-form form">
        <label for="email-input" class="input-description">이메일</label>
        <input id="email-input" type="email" class="form__input" placeholder="woowacourse@gmail.com" name="emailInput" value="${email}" disabled />
        <label for="name-input" class="input-description">이름</label>
        <input id="name-input" type="text" class="form__input" placeholder="이름을 입력해주세요." name="nameInput" value="${name}" />
        <label for="pw-input" class="input-description">비밀번호</label>
        <input id="pw-input" type="password" class="form__input" placeholder="비밀번호를 입력해주세요." name="pwInput" />
        <label for="re-pw-input" class="input-description">비밀번호 확인</label>
        <input id="re-pw-input" type="password" class="form__input" placeholder="비밀번호를 입력해주세요." name="rePwInput" />
        <button class="form__button submit-button">확인</button>
      </form>
    `;
  }

  editHandler = async e => {
    e.preventDefault();
    if (!(e.target instanceof HTMLFormElement)) return;

    if (!confirm('회원 정보를 변경하시겠습니까?')) return;

    const { emailInput, nameInput, pwInput } = e.target.elements;
    const response = await API.editInfo({
      email: emailInput.value,
      name: nameInput.value,
      password: pwInput.value,
      id: this.user.id,
    });

    if (typeof response === 'string') return;

    history.pushState({}, '', `${basePath}/`);
    this.routePage(`${basePath}/`);
  };
}
