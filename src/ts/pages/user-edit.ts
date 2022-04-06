import { API } from '../../apis';

import { basePath } from '../../App';
import type { SignupInfo, UserInfoWithPassWord } from '../types';
import { focusOnInvalidInput, getUser, showSnackbar } from '../utils';
import { $, replaceHTML } from '../utils/dom';
import { validateUserInfo } from './validator';

export default class UserEditPage {
  #user: UserInfoWithPassWord | string;

  constructor(readonly routePage) {
    this.routePage = routePage;
  }

  async render() {
    this.#user = await getUser();

    if (typeof this.#user === 'string') {
      showSnackbar('Not Login');
      this.routePage(`${basePath}/`);
      return;
    }

    replaceHTML($('#app'), await this.#template());
    $('.edit-form').addEventListener('submit', this.#editHandler);
  }

  #template() {
    if (typeof this.#user === 'string') return ``;

    const { email, name } = this.#user;

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

  #editHandler = async (e: Event) => {
    e.preventDefault();
    if (!(e.target instanceof HTMLFormElement)) return;

    const $formElements = e.target.elements;

    const $inputs = {
      email: $formElements.namedItem('emailInput') as HTMLInputElement,
      password: $formElements.namedItem('pwInput') as HTMLInputElement,
      rePassword: $formElements.namedItem('rePwInput') as HTMLInputElement,
      name: $formElements.namedItem('nameInput') as HTMLInputElement,
    };

    const userInfo: SignupInfo = {
      email: $inputs.email.value,
      password: $inputs.password.value,
      name: $inputs.name.value,
    };

    try {
      if ($inputs.password.value !== $inputs.rePassword.value) {
        throw new Error('비밀번호가 일치하지 않습니다.');
      }
      validateUserInfo(userInfo);
    } catch ({ message, name }) {
      focusOnInvalidInput<SignupInfo>(name, $inputs);
      showSnackbar(message);
      return;
    }

    if (!confirm('회원 정보를 변경하시겠습니까?')) return;
    if (typeof this.#user === 'string') return;
    const response = await API.editInfo({
      ...userInfo,
      id: this.#user.id,
    });

    if (typeof response === 'string') return;
    this.routePage(`${basePath}/`);
  };
}
