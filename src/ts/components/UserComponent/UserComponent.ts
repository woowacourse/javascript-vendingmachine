import { $ } from '../../dom';
import { on } from '../../events';
import LoginComponent from './LoginComponent';
import SignupComponent from './SignupComponent';

export default class UserComponent {
  private signupComponent = new SignupComponent();
  private loginComponent = new LoginComponent();

  private $userButtonsWrapper = $('.user-buttons-wrapper');

  constructor() {
    on(this.$userButtonsWrapper, 'click', this.onClickUserThumbnail);
  }

  onClickUserThumbnail = (e) => {
    if (e.target.className === 'nav__user-button') {
      console.log(123);
    }
  };
}
