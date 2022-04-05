import { API } from '../../apis';
import type { UserInfoWithPassWord } from '../../apis';

import { basePath } from '../component/App';
import { getUser, showSnackbar } from '../utils';
import { $, replaceHTML } from '../utils/dom';

export default class UserEditPage {
  private user: UserInfoWithPassWord | string;
  constructor(private readonly routePage) {
    this.routePage = routePage;
  }

  async render() {
    this.user = await getUser();

    if (typeof this.user === 'string') {
      showSnackbar('Not Login');
      history.pushState({}, '', `${basePath}/`);
      this.routePage(`${basePath}/`);
      return;
    }

    replaceHTML($('#app'), await this.#template());
    $('.edit-form').addEventListener('submit', this.editHandler);
  }

  #template() {
    if (typeof this.user === 'string') return ``;

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

  editHandler = async (e: Event) => {
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
      showSnackbar(message);
      return;
    }

    if (!confirm('회원 정보를 변경하시겠습니까?')) return;
    if (typeof this.user === 'string') return;
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
