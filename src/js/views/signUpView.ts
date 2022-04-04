import { $, $$, emitCustomEvent } from '../utils/common';
import { SELECTOR } from '../constants/constants';
import { signUpTemplate } from '../templates/signUpTemplate';

export default class SignUpView {
  $content: HTMLDivElement;
  constructor() {
    this.$content = $(SELECTOR.ID.CONTENT);
  }
  render() {
    console.log('SignUpView Render');
    this.$content.replaceChildren();
    this.$content.insertAdjacentHTML('beforeend', signUpTemplate);
  }
}
