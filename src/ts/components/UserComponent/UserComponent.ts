import { $ } from '../../dom';
import { on } from '../../events';
import LoginComponent from './LoginComponent';
import SignupComponent from './SignupComponent';
import { deleteCurrentUser, getCurrentUser, isUserLoggedIn } from '../../auth';
import ModifyUserInfoComponent from './ModifyUserInfoComponent';

export default class UserComponent {
  private $userButtonsWrapper = $('.user-buttons-wrapper');
  private $userMenu = $('.user-menu');
  private $userThumbnail = $('.user-thumbnail');
  private $logoutButton = $('.logout-button');

  constructor() {
    new SignupComponent();
    new LoginComponent();
    new ModifyUserInfoComponent();

    this.renderUserThumbnail();

    on(this.$userButtonsWrapper, 'click', this.onClickUserThumbnail);
    on(this.$userMenu, 'click', this.onClickUserMenu);
    on(this.$logoutButton, 'click', this.onLogout);
  }

  renderUserThumbnail() {
    if (!isUserLoggedIn()) {
      return;
    }

    const { name } = getCurrentUser();
    this.$userThumbnail.textContent = name[0];
  }

  onClickUserThumbnail = (e) => {
    if (e.target.className === 'user-thumbnail') {
      this.$userMenu.classList.toggle('hide');
    }
  };

  onClickUserMenu = (e) => {
    if (e.target.classList.contains('user-menu-item')) {
      this.$userMenu.classList.add('hide');
    }
  };

  onLogout = () => {
    deleteCurrentUser();
    window.location.pathname = '/purchase';
  };
}
