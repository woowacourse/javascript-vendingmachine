import { $, $$, emitCustomEvent, showSnackBar } from '../utils/common';
import { SELECTOR } from '../constants/constants';
import { logInTemplate } from '../templates/logInTemplate';

export default class LogInView {
  $content: HTMLDivElement;
  constructor() {
    this.$content = $(SELECTOR.ID.CONTENT);
  }

  handleSubmitLogInForm() {
    try {
      emitCustomEvent('LOG_IN', { detail: {} });
      window.history.pushState(null, null, '#purchaseItem');

      showSnackBar('로그인 되었습니다.');
    } catch (error) {
      alert(error.message);
    }
  }

  render() {
    console.log('LogInView Render');
    this.$content.replaceChildren();
    this.$content.insertAdjacentHTML('beforeend', logInTemplate);

    $('#login-form').addEventListener('submit', this.handleSubmitLogInForm.bind(this));
  }
}
