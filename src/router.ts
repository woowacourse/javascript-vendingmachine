import { PATH_TO_TAB_DIC } from './constants';
import { Tab } from './types';

class Router {
  static _instance?: Router;

  tabContainer?: HTMLElement;

  constructor() {
    if (Router._instance) {
      return Router._instance;
    }
    window.addEventListener('pushstate', this.onLocationChange);
    window.addEventListener('popstate', this.onLocationChange);
    this.tabContainer = document.querySelector('.tab-container') as HTMLElement;
    this.onLoad();
  }

  static get instance() {
    if (!Router._instance) {
      Router._instance = new Router();
    }
    return Router._instance;
  }

  private onLoad() {
    this.routeComponent(Router.activeTab());
  }

  routeComponent(activeTab: Tab) {
    if (!this.tabContainer) return;
    if (activeTab === Tab.ProductManageTab) {
      this.tabContainer.innerHTML = '<product-manage-tab></product-manage-tab>';
    } else if (activeTab === Tab.ChargeMoneyTab) {
      this.tabContainer.innerHTML = '<charge-money-tab></charge-money-tab>';
    } else if (activeTab === Tab.PurchaseProductTab) {
      this.tabContainer.innerHTML = '<purchase-product-tab></purchase-product-tab>';
    }
  }

  static pushState(url: string) {
    history.pushState({}, '', url);
    window.dispatchEvent(new Event('pushstate'));
  }

  onLocationChange = () => {
    this.routeComponent(Router.activeTab());
  };

  static activeTab() {
    const { pathname } = window.location;
    return PATH_TO_TAB_DIC[pathname];
  }
}

export default Router;
