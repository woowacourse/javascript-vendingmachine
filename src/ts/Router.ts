import View from './view/View';
import { PATH_ID, STORAGE_ID } from './constants';

export default class Router {
  currentTab: string;
  view: View;

  constructor(view: View) {
    this.view = view;

    this.currentTab = localStorage.getItem(STORAGE_ID.CURRENT_TAB) || PATH_ID.PRODUCT_MANAGE;
    history.replaceState({ url: this.currentTab }, null, this.currentTab);
    this.view.renderTabs(this.currentTab);

    window.addEventListener('popstate', (event: PopStateEvent) => {
      this.tabRouter(event.state.url, true);
    });
    this.view.$navTab.addEventListener('@route-tab', (event: CustomEvent) => {
      this.tabRouter(event.detail, false);
    });
  }

  private tabRouter = (url: string, isPopState = false) => {
    if (!isPopState && url !== location.pathname + location.hash) {
      history.pushState({ url }, null, url);
    }
    const routes = {
      [PATH_ID.PRODUCT_MANAGE]: () => {
        this.view.renderTabs(PATH_ID.PRODUCT_MANAGE);
      },
      [PATH_ID.RECHARGE]: () => {
        this.view.renderTabs(PATH_ID.RECHARGE);
      },
      [PATH_ID.PURCHASE_PRODUCT]: () => {
        this.view.renderTabs(PATH_ID.PURCHASE_PRODUCT);
      },
    };
    routes[url]();
  };
}
