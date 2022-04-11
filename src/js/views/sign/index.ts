import { URL } from '../../constants/appContants';
import { signTemplate } from '../../templates/sign/signTemplate';
import { $ } from '../../utils/common';
import { SELECTOR } from '../../constants/viewConstants';
import SignInView from './signInView';
import SignUpView from './signUpView';
import EditProfileView from './editProfileView';

export default class SignView {
  private $app: HTMLElement;
  private signInView: SignInView;
  private singUpView: SignUpView;
  private editProfileView: EditProfileView;

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

  renderPageSection(section: string) {
    const sections = {
      [URL.SIGN_IN]: this.signInView,
      [URL.SING_UP]: this.singUpView,
      [URL.EDIT_PROFILE]: this.editProfileView,
    };

    const currentView = sections[section] ?? this.signInView;
    currentView.render();
  }
}
