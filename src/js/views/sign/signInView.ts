import singInTemplate from '../../templates/signInTemplate';
import { $ } from '../../utils/common';
import { SELECTOR } from '../../constants/viewConstants';

export default class SignInView {
  render() {
    const $signMain = $('#sign-main');
    $signMain.replaceChildren();
    $signMain.insertAdjacentHTML('beforeend', singInTemplate);
  }
}
