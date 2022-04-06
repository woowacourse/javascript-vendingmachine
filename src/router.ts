import { getUserInfo } from './member';
import { $ } from './utils';

class Router {
  static _instance?: Router;

  pageContainer?: HTMLElement;
  memberContainer?: HTMLElement;
  loginHeader?: HTMLElement;
  header?: HTMLElement;

  constructor() {
    if (Router._instance) {
      return Router._instance;
    }
    window.addEventListener('pushstate', this.onLocationChange);
    window.addEventListener('popstate', this.onLocationChange);

    this.pageContainer = $('.tab-container');
    this.memberContainer = $('.member-container');
    this.loginHeader = $('.login-header');
    this.header = $('header');

    this.onLoad();
  }

  static get instance() {
    if (!Router._instance) {
      Router._instance = new Router();
    }
    return Router._instance;
  }

  private onLoad() {
    this.onLocationChange();
  }

  static pushState(url: string) {
    history.pushState({}, '', url);
    window.dispatchEvent(new Event('pushstate'));
  }

  onLocationChange = async () => {
    if (
      this.pageContainer === undefined ||
      this.memberContainer === undefined ||
      this.loginHeader === undefined ||
      this.header === undefined
    )
      return;
    const isLogin = !!(await getUserInfo());

    if (isLogin) {
      this.loginHeader.innerHTML = '<login-info></login=info>';
    } else {
      this.loginHeader.innerHTML = '<login-header></login=header>';
    }

    this.pageContainer.replaceChildren();
    this.memberContainer.replaceChildren();

    switch (window.location.pathname) {
      case '/product-manage-tab': {
        this.header.classList.remove('hide');
        this.pageContainer.insertAdjacentHTML(
          'beforeend',
          '<product-manage-page></product-manage-page>'
        );
        break;
      }
      case '/charge-money-tab': {
        this.header.classList.remove('hide');
        this.pageContainer.insertAdjacentHTML(
          'beforeend',
          '<charge-money-page></charge-money-page>'
        );
        break;
      }
      case '/purchase-product-tab': {
        this.header.classList.remove('hide');
        this.pageContainer.insertAdjacentHTML(
          'beforeend',
          '<purchase-product-page></purchase-product-page>'
        );
        break;
      }
      case '/login-form': {
        this.loginHeader.replaceChildren();
        this.header.classList.add('hide');
        this.memberContainer.insertAdjacentHTML('beforeend', '<login-form></login-form>');
        break;
      }
      case '/sign-up-form': {
        this.header.classList.add('hide');
        this.memberContainer.insertAdjacentHTML('beforeend', '<sign-up-form></sign-up-form>');
        break;
      }
      case '/modify-member-form': {
        this.header.classList.add('hide');
        this.memberContainer.insertAdjacentHTML(
          'beforeend',
          '<modify-member-form></modify-member-form>'
        );
        break;
      }
      default: {
        this.header.classList.remove('hide');
      }
    }
  };
}

export default Router;
