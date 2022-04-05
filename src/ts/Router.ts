import View from './views/View';
import { PATH_ID, STORAGE_ID } from './constants';
import { renderPublicPage, renderUserPrivatePage } from './components/renderer';

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

    // 웹컴포넌트에서 보낸 커스텀 이벤트
    window.addEventListener('@route-login', this.routeLogin);
    window.addEventListener('@route-logout', this.routeLogout);
  }

  private routeLogin = () => {
    this.tabRouter(PATH_ID.PRODUCT_MANAGE, false);
    renderUserPrivatePage();
  };

  private routeLogout = () => {
    this.tabRouter(PATH_ID.PURCHASE_PRODUCT, false);
    renderPublicPage();
  };

  private tabRouter = (url: string, isPopState = false) => {
    if (!isPopState && url !== location.pathname + location.hash) {
      history.pushState({ url }, null, url);
    }
    this.view.renderTabs(url);
  };
}
