import Auth from '../domain/Auth';
import { historyRouterPush } from '../router';
import storage from '../storage';
import { $, $$, addEvent } from '../utils';
import { Path } from '../router';

class MainUI {
  private $userInfoButton = $('.user-info-button');
  private $selectBox = $('.select-box');
  private $selectBoxLogoutButton = $('.select-box__logout-button');
  private $selectBoxEditProfileButton = $('.select-box__edit-profile-button');
  private $selectBoxWrapper = $('.select-box-wrapper');
  private $loginButton = $('.login-button');
  private $editProfileFormEmail = $('#edit-profile-form__email');
  private $editProfileFormName = $('#edit-profile-form__name');
  private $nav = $('.nav');
  private $signupText = $('.signup-text');

  constructor() {
    this.renderInitialUI();

    this.$userInfoButton.addEventListener('click', this.handleUserInfoButtonClick);
    this.$selectBoxLogoutButton.addEventListener('click', this.handleSelectBoxLogoutButtonClick);
    this.$selectBoxEditProfileButton.addEventListener('click', this.handleSelectBoxEditProfileButtonClick);
    this.$loginButton.addEventListener('click', this.handleLoginButtonClick);
    this.$nav.addEventListener('click', this.handleNavClick);
    this.$signupText.addEventListener('click', this.handleSignupTextClick);
  }

  renderInitialUI() {
    if (storage.getAccessToken()) {
      this.$loginButton.classList.add('hidden');
      this.$userInfoButton.classList.remove('hidden');
      this.$userInfoButton.textContent = storage.getUserInfo().userName.slice(0, 1);
      return;
    }
    this.$selectBox.classList.add('hidden');
    this.$userInfoButton.classList.add('hidden');
  }

  handleUserInfoButtonClick = (e) => {
    this.$selectBox.classList.toggle('hidden');
  };

  handleSelectBoxLogoutButtonClick = (e) => {
    Auth.logout();
    this.$selectBoxWrapper.classList.add('hidden');
    this.$loginButton.classList.remove('hidden');
    historyRouterPush('/javascript-vendingmachine/logout');
  };

  handleSelectBoxEditProfileButtonClick = (e) => {
    (this.$editProfileFormEmail as HTMLInputElement).value = storage.getUserInfo().email;
    (this.$editProfileFormName as HTMLInputElement).value = storage.getUserInfo().userName;
    historyRouterPush('/javascript-vendingmachine/editprofile');
  };

  handleLoginButtonClick = (e) => {
    historyRouterPush('/javascript-vendingmachine/signin');
  };

  handleNavClick = (e) => {
    if ((e.target as HTMLButtonElement).type === undefined) return;

    const route = (e.target as HTMLButtonElement).getAttribute('route') as Path;
    historyRouterPush(route);
  };

  handleSignupTextClick = (e) => {
    historyRouterPush('/javascript-vendingmachine/signup');
  };
}

export default MainUI;
