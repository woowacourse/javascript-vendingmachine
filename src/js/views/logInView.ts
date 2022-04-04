import { $, $$, emitCustomEvent } from '../utils/common';
import { SELECTOR } from '../constants/constants';
import { logInTemplate } from '../templates/logInTemplate';

export default class LogInView {
  $app: HTMLDivElement;
  constructor() {
    this.$app = $(SELECTOR.ID.APP);
  }
  render() {
    console.log('LogInView Render');
    this.$app.replaceChildren();
    this.$app.insertAdjacentHTML('beforeend', logInTemplate);
  }
}
