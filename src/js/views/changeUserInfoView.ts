import { $, emitCustomEvent } from '../utils/common';
import { SELECTOR } from '../constants/constants';
import { changeUserInfoTemplate } from '../templates/changeUserInfoTemplate';

export default class ChangeUserInfoView {
  $content: HTMLDivElement;
  constructor() {
    this.$content = $(SELECTOR.ID.CONTENT);
  }

  private handleSubmitChangeForm(event) {
    event.preventDefault();
    try {
      const targetId = event.target.id;
      const name = $(SELECTOR.ID.CHANGE_NAME_INPUT).value;
      const password = $(SELECTOR.ID.CHANGE_PASSWORD_INPUT).value;

      emitCustomEvent('CHANGE_USER_INFO', { detail: { name, password, targetId } });
    } catch (error) {
      alert(error.message);
    }
  }

  public render(isLogin) {
    const user = JSON.parse(sessionStorage.getItem('user'));
    this.$content.replaceChildren();
    this.$content.insertAdjacentHTML('beforeend', changeUserInfoTemplate(isLogin, user));

    if (isLogin) {
      $(SELECTOR.ID.CHANGE_FORM).addEventListener('submit', this.handleSubmitChangeForm.bind(this));
    }
  }
}
