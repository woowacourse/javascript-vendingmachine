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
      const url = event.state ? event.state.url : PATH_ID.NOT_FOUND;
      this.tabRouter(url, true);
    });
    this.view.$navTab.addEventListener('@route-tab', (event: CustomEvent) => {
      const url = event.detail;
      this.tabRouter(url, false);
    });
  }

  private tabRouter = (url: string, isPopState = false) => {
    if (!isPopState && url !== location.pathname + location.hash) {
      history.pushState({ url }, null, url);
    }
    this.view.renderTabs(url);
  };
}
