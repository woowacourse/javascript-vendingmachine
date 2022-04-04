import { CUSTOM_EVENT, URL } from '../../constants/appContants';
import { signTemplate } from '../../templates/signTemplate';
import { $, emit } from '../../utils/common';
import { SELECTOR } from '../../constants/viewConstants';
import SignInView from './signInView';
import SignUpView from './signUpView';

export default class SignView {
  private $app: HTMLElement;
  signInView: SignInView;
  singUpView: SignUpView;

  constructor() {
    this.$app = $(SELECTOR.ID.APP);
    this.signInView = new SignInView();
    this.singUpView = new SignUpView();

    window.addEventListener(
      CUSTOM_EVENT.OFFER_SIGNUP_CLICK,
      this.handleOfferSignupClick.bind(this)
    );
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
      case URL.SING_UP:
        this.singUpView.render();
        break;
      default:
        this.signInView.render();
    }
  }

  private handleOfferSignupClick(event) {
    const { url } = event.detail;

    this.renderSignPageSection(url);
    emit({ eventName: CUSTOM_EVENT.ROUTE_CHANGE, detail: { url, page: URL.SIGN } });
  }
}
