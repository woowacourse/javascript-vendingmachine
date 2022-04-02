import { $, $$ } from '../utils/dom';
import MainUI from './MainUI/MainUI';
import SignUpUI from './SignUI/SignUpUI';
import { viewPainter } from './ViewPainter';

const basePath =
  process.env.NODE_ENV === 'production' ? '/javascript-vendingmachine' : '';

export default class App {
  constructor(
    private readonly mainUI = new MainUI(),
    private readonly signUpUI = new SignUpUI(),
  ) {
    this.mainUI.renderInitPage();

    $('.nav').addEventListener('click', this.navClickHandler);
    window.addEventListener('popstate', this.popStateHandler);
    $('.sign-in__link-sign-up').addEventListener(
      'click',
      this.signUpClickHandler,
    );

    viewPainter.mainUI = this.mainUI;
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

  private signUpClickHandler = () => {
    const pathname = `${basePath}/signup`;

    history.pushState({}, '', pathname);

    this.signUpUI.render();
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
      case '/signup':
        this.signUpUI.render();
    }
  }
}
