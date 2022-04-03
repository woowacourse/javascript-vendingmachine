import { getUserInfo } from './member';

class Router {
  static _instance?: Router;

  pageContainer?: HTMLElement;
  memberContainer?: HTMLElement;
  loginHeader?: HTMLElement;

  constructor() {
    if (Router._instance) {
      return Router._instance;
    }
    window.addEventListener('pushstate', this.onLocationChange);
    window.addEventListener('popstate', this.onLocationChange);
    this.pageContainer = document.querySelector('.tab-container') as HTMLElement;
    this.memberContainer = document.querySelector('.member-container') as HTMLElement;
    this.loginHeader = document.querySelector('.login-header') as HTMLElement;
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
    if (this.pageContainer === undefined) return;
    if (this.memberContainer === undefined) return;
    if (this.loginHeader === undefined) return;

    const isLogin = !!(await getUserInfo());

    if (isLogin) {
      this.loginHeader.innerHTML = '<login-info></login=info>';
    } else {
      this.loginHeader.innerHTML = '<login-header></login=header>';
    }

    switch (window.location.pathname) {
      case '/product-manage-tab':
        this.pageContainer.replaceChildren();
        this.memberContainer.replaceChildren();
        document.querySelector('header')?.classList.remove('hide');

        this.pageContainer.insertAdjacentHTML(
          'beforeend',
          '<product-manage-page></product-manage-page>'
        );
        break;
      case '/charge-money-tab':
        this.pageContainer.replaceChildren();
        this.memberContainer.replaceChildren();
        document.querySelector('header')?.classList.remove('hide');

        this.pageContainer.insertAdjacentHTML(
          'beforeend',
          '<charge-money-page></charge-money-page>'
        );
        break;
      case '/purchase-product-tab':
        this.pageContainer.replaceChildren();
        this.memberContainer.replaceChildren();
        document.querySelector('header')?.classList.remove('hide');

        this.pageContainer.insertAdjacentHTML(
          'beforeend',
          '<purchase-product-page></purchase-product-page>'
        );
        break;
      case '/login-form':
        this.pageContainer.replaceChildren();
        this.memberContainer.replaceChildren();
        document.querySelector('header')?.classList.add('hide');

        this.memberContainer.insertAdjacentHTML('beforeend', '<login-form></login-form>');
        break;

      case '/sign-up-form':
        this.pageContainer.replaceChildren();
        this.memberContainer.replaceChildren();
        document.querySelector('header')?.classList.add('hide');

        this.memberContainer.insertAdjacentHTML('beforeend', '<sign-up-form></sign-up-form>');
        break;

      default:
        document.querySelector('header')?.classList.remove('hide');
        this.memberContainer.replaceChildren();
    }
  };
}

export default Router;
