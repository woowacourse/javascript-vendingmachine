import { $, $$, emitCustomEvent } from '../utils/common';
import { SELECTOR } from '../constants/constants';
import { changeUserInfoTemplate } from '../templates/changeUserInfoTemplate';

export default class ChangeUserInfoView {
  $content: HTMLDivElement;
  constructor() {
    this.$content = $(SELECTOR.ID.CONTENT);
  }

  handleSubmitChangeForm(event) {
    event.preventDefault();
    try {
      const targetId = event.target.id;
      const name = $('#change-name-input').value;
      const password = $('#change-password-input').value;

      emitCustomEvent('CHANGE_USER_INFO', { detail: { name, password, targetId } });
    } catch (error) {
      alert(error.message);
    }
  }

  render(isLogin) {
    const user = JSON.parse(sessionStorage.getItem('user'));
    this.$content.replaceChildren();
    this.$content.insertAdjacentHTML('beforeend', changeUserInfoTemplate(isLogin, user));

    if (isLogin) {
      $('#change-form').addEventListener('submit', this.handleSubmitChangeForm.bind(this));
    }
  }
}
