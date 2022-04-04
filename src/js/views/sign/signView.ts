import { URL } from '../../constants/appContants';
import { signTemplate } from '../../templates/signTemplate';
import { $ } from '../../utils/common';
import { SELECTOR } from '../../constants/viewConstants';
import SignInView from './signInView';

export default class SignView {
  private $app: HTMLElement;
  signInView: SignInView;

  constructor() {
    this.$app = $(SELECTOR.ID.APP);
    this.signInView = new SignInView();
  }

  render() {
    this.$app.replaceChildren();
    this.$app.insertAdjacentHTML('beforeend', signTemplate);
  }

  renderSignPageSection(url) {
    switch (url) {
      case URL.SIGN_IN:
        this.signInView.render();
        break;
      default:
        this.signInView.render();
    }
  }
}
