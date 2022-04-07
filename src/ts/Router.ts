import View from './views/View';
import { PATH_ID, STORAGE_ID } from './constants';
import { renderPublicPage, renderUserPrivatePage } from './components/renderer';
import auth from './Auth.js';
export default class Router {
  currentTab: string;
  view: View;

  constructor(view: View) {
    this.view = view;

    this.currentTab = localStorage.getItem(STORAGE_ID.CURRENT_TAB) || PATH_ID.PURCHASE_PRODUCT;
    this.tabRouter(this.currentTab, false);

    window.addEventListener('popstate', (event: PopStateEvent) => {
      const url = event.state ? event.state.url : PATH_ID.NOT_FOUND;
      this.tabRouter(url, true);
    });
    this.view.$navTab.addEventListener('@route-tab', (event: CustomEvent) => {
      const url = event.detail;
      this.tabRouter(url, false);
    });

    // 웹컴포넌트에서 보낸 커스텀 이벤트
    window.addEventListener('@route-login', () => {
      this.routeLogin(PATH_ID.PRODUCT_MANAGE);
    });
    window.addEventListener('@route-logout', this.routeLogout);
  }

  private routeLogin = (url: string) => {
    this.tabRouter(url, false);
  };

  private routeLogout = () => {
    localStorage.setItem(STORAGE_ID.CURRENT_TAB, PATH_ID.PURCHASE_PRODUCT);

    this.tabRouter(PATH_ID.PURCHASE_PRODUCT, false);
  };

  private tabRouter = (url: string, isPopState = false) => {
    this.view.renderTabs(url);
    if (!auth.isLoggedIn) {
      history.pushState({ url }, null, url);
      renderPublicPage();

      return;
    }

    if (!isPopState && url !== location.pathname + location.hash) {
      history.pushState({ url }, null, url);
    }
    renderUserPrivatePage();
  };
}
