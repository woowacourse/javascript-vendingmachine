import { ACTION } from './constatns/flux-constants';
import { PAGE } from './constatns/routing-constants';
import createAction from './flux/createAction';
import Store from './flux/store';
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

  private async onLoad() {
    const { email, name } = await getUserInfo();
    Store.instance.dispatch(createAction(ACTION.LOGIN, { email, name }));
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

    const { isLogin } = Store.instance.getState().login;

    this.loginHeader.innerHTML = isLogin ? PAGE.LOGIN_INFO : PAGE.LOGIN_HEADER;
    this.pageContainer.replaceChildren();
    this.memberContainer.replaceChildren();

    switch (window.location.pathname) {
      case '/product-manage-tab': {
        const accessiblePage = isLogin
          ? PAGE.PRODUCT_MANAGE_PAGE
          : PAGE.ONLY_MANAGER_ACCESSIBLE_PAGE;

        this.header.classList.remove('hide');
        this.pageContainer.insertAdjacentHTML('beforeend', accessiblePage);
        break;
      }
      case '/charge-money-tab': {
        const accessiblePage = isLogin ? PAGE.CHARGE_MONEY_PAGE : PAGE.ONLY_MANAGER_ACCESSIBLE_PAGE;

        this.header.classList.remove('hide');
        this.pageContainer.insertAdjacentHTML('beforeend', accessiblePage);
        break;
      }
      case '/purchase-product-tab': {
        this.header.classList.remove('hide');
        this.pageContainer.insertAdjacentHTML('beforeend', PAGE.PURCHASE_PRODUCT_PAGE);
        break;
      }
      case '/login-form': {
        this.loginHeader.replaceChildren();
        this.header.classList.add('hide');
        this.memberContainer.insertAdjacentHTML('beforeend', PAGE.LOGIN_FORM);
        break;
      }
      case '/sign-up-form': {
        this.header.classList.add('hide');
        this.memberContainer.insertAdjacentHTML('beforeend', PAGE.SIGN_UP_FORM);
        break;
      }
      case '/modify-member-form': {
        this.header.classList.add('hide');
        this.memberContainer.insertAdjacentHTML('beforeend', PAGE.MODIFY_MEMBER_FORM);
        break;
      }
      default: {
        this.header.classList.remove('hide');
      }
    }
  };
}

export default Router;
