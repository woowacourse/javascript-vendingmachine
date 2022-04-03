import { MESSAGE } from '../constants';
import UserDomain from '../domain/UserDomain/User';
import { showSnackbar } from '../utils';
import { $, $$ } from '../utils/dom';
import MainUI from './MainUI/MainUI';
import SignInUI from './SignUI/SignInUI';
import SignUpUI from './SignUI/SignUpUI';
import UserInfoEditUI from './SignUI/UserInfoEditUI';
import { viewPainter } from './ViewPainter';

export const basePath =
  process.env.NODE_ENV === 'production' ? '/javascript-vendingmachine' : '';

export default class App {
  constructor(
    private readonly userDomain = new UserDomain(),
    private readonly mainUI = new MainUI(),
    private readonly signInUI = new SignInUI(userDomain),
    private readonly signUpUI = new SignUpUI(),
    private readonly userInfoEditUI = new UserInfoEditUI(userDomain),
  ) {
    this.mainUI.renderInitPage();

    this.bindEvents();

    viewPainter.mainUI = this.mainUI;
    viewPainter.signInUI = this.signInUI;
  }

  private bindEvents() {
    $('.nav').addEventListener('click', this.navClickHandler);
    window.addEventListener('popstate', this.popStateHandler);
    $('.signin-button').addEventListener('click', this.signInClickHandler);
    $('.sign-in__link-sign-up').addEventListener(
      'click',
      this.signUpClickHandler,
    );
    $('.thumbnail').addEventListener('click', this.thumbnailClickHandler);
    $('.select-box').addEventListener('click', this.selectBoxClickHandler);
  }

  private navClickHandler = ({ target }) => {
    if (target.tagName !== 'BUTTON') return;

    const pathname = `${basePath}${target.dataset.pathname}`;

    if (pathname === location.pathname) return;

    history.pushState({}, '', pathname);

    this.activateClickedButton(target.dataset.pathname);
    this.renderPage(target.dataset.pathname);
  };

  private popStateHandler = () => {
    const paths = location.pathname.split('/');
    const pathname = `/${paths[paths.length - 1]}`;

    this.activateClickedButton(pathname);
    this.renderPage(pathname);
  };

  private signInClickHandler = () => {
    const pathname = `${basePath}/signin`;

    history.pushState({}, '', pathname);

    this.signInUI.render();
  };

  private signUpClickHandler = () => {
    const pathname = `${basePath}/signup`;

    history.pushState({}, '', pathname);

    this.signUpUI.render();
  };

  private thumbnailClickHandler() {
    const $selectBox = $('.select-box');

    $selectBox.classList.toggle('active');
    setTimeout(() => {
      $selectBox.classList.toggle('hide');
    }, 300);
  }

  private selectBoxClickHandler = (e: Event) => {
    if (!(e.target instanceof HTMLButtonElement)) return;

    switch (e.target.name) {
      case 'edit-button':
        const pathname = `${basePath}/edit`;
        history.pushState({}, '', pathname);

        this.userInfoEditUI.render();
        break;
      case 'signout-button':
        if (!confirm(MESSAGE.CONFIRM_SIGNOUT)) return;

        this.userDomain.signOut();
        this.mainUI.renderInitPage();
        this.mainUI.renderUserUI();
        this.thumbnailClickHandler();
        showSnackbar(MESSAGE.SUCCESS_SIGNOUT);
    }
  };

  private activateClickedButton(pathname) {
    $$('.nav__button').forEach($button => {
      if ($button.dataset.pathname === pathname) {
        $button.classList.add('active');
        return;
      }
      $button.classList.remove('active');
    });
  }

  private renderPage(pathname) {
    this.mainUI.renderInitPage();
    if (
      !this.userDomain.isSignIn &&
      pathname !== '/signin' &&
      pathname !== '/signup'
    )
      return;

    switch (pathname) {
      case '/':
        this.mainUI.renderProductManagementUI();
        break;
      case '/charge':
        this.mainUI.renderCoinManagementUI();
        break;
      case '/purchase':
        this.mainUI.renderProductPurchaseUI();
        break;
      case '/signin':
        this.signInUI.render();
        break;
      case '/signup':
        this.signUpUI.render();
        break;
      case '/edit':
        this.userInfoEditUI.render();
    }
  }
}
