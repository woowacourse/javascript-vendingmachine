import View from './view/View';
import { PATH_ID, STORAGE_ID } from './constants';

export default class Router {
  currentTab: string;
  view: View;

  constructor(view: View) {
    this.view = view;

    this.currentTab = localStorage.getItem(STORAGE_ID.CURRENT_TAB) || PATH_ID.PRODUCT_MANAGE;
    history.replaceState({ url: this.currentTab }, null, this.currentTab);
    this.view.renderTabResult(this.currentTab);

    window.addEventListener('popstate', (event: PopStateEvent) => {
      this.tabRouter(event.state.url, true);
    });
    this.view.$navTab.addEventListener('@route-tab', this.handleRouteTab);
  }

  handleRouteTab = (event: CustomEvent) => {
    const url = event.detail;
    this.tabRouter(url);
  };

  tabRouter = (url: string, isPopState = false) => {
    if (!isPopState) history.pushState({ url }, null, url);
    const routes = {
      '/javascript-vendingmachine/#!/product-manage': () => {
        this.view.renderTabResult(PATH_ID.PRODUCT_MANAGE);
      },
      '/javascript-vendingmachine/#!/recharge': () => {
        this.view.renderTabResult(PATH_ID.RECHARGE);
      },
      '/javascript-vendingmachine/#!/purchase-product': () => {
        this.view.renderTabResult(PATH_ID.PURCHASE_PRODUCT);
      },
    };
    routes[url]();
  };
}
