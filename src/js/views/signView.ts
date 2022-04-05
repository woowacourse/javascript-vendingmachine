import { CUSTOM_EVENT, URL } from '../constants/appContants';
import { signTemplate } from '../templates/sign/signTemplate';
import { $, emit } from '../utils/common';
import { SELECTOR } from '../constants/viewConstants';
import SignInView from './sign/signInView';
import SignUpView from './sign/signUpView';
import EditProfileView from './sign/editProfileView';

export default class SignView {
  private $app: HTMLElement;
  signInView: SignInView;
  singUpView: SignUpView;
  editProfileView: EditProfileView;

  constructor() {
    this.$app = $(SELECTOR.ID.APP);
    this.signInView = new SignInView();
    this.singUpView = new SignUpView();
    this.editProfileView = new EditProfileView();
  }

  render() {
    this.$app.replaceChildren();
    this.$app.insertAdjacentHTML('beforeend', signTemplate);
  }

  renderSignPageSection(url: string) {
    switch (url) {
      case URL.SIGN_IN:
        this.signInView.render();
        break;
      case URL.SING_UP:
        this.singUpView.render();
        break;
      case URL.EDIT_PROFILE:
        this.editProfileView.render();
        break;
      default:
        this.signInView.render();
    }
  }
}
