import { $, $$, emitCustomEvent } from '../utils/common';
import { SELECTOR } from '../constants/constants';
import { signUpTemplate } from '../templates/signUpTemplate';

export default class SignUpView {
  $app: HTMLDivElement;
  constructor() {
    this.$app = $(SELECTOR.ID.APP);
  }
  render() {
    console.log('SignUpView Render');
    this.$app.replaceChildren();
    this.$app.insertAdjacentHTML('beforeend', signUpTemplate);
  }
}
