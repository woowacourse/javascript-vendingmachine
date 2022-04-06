import MainView from './views/mainView';
import { URL, CUSTOM_EVENT } from './constants/appContants';
import { RouteChangeDetailType } from './types/types';
import SignView from './views/signView';

export default class App {
  mainView: MainView;
  signView: SignView;

  constructor() {
    this.mainView = new MainView();
    this.signView = new SignView();

    window.addEventListener(CUSTOM_EVENT.PAGE_CHANGE, this.handlePageChange.bind(this));
    window.addEventListener(CUSTOM_EVENT.ROUTE_CHANGE, this.handleRouteChange.bind(this));
    window.addEventListener('popstate', this.renderPage.bind(this));
  }

  handlePageChange(event: CustomEvent<RouteChangeDetailType>) {
    this.handleRouteChange(event);
    this.renderPage();
  }

  handleRouteChange(event: CustomEvent<RouteChangeDetailType>) {
    const { page, section } = event.detail;

    window.history.pushState(null, null, `${URL.BASE_URL}/#${page}/#${section}`);
  }

  renderPage() {
    const [, page, url] = window.location.href.split('/#');

    switch (page) {
      case URL.MAIN:
        this.mainView.render();
        this.mainView.renderPageSection(url);
        break;
      case URL.SIGN:
        this.signView.render();
        this.signView.renderPageSection(url);
        break;
      default:
        this.mainView.render();
        this.mainView.renderPageSection(URL.PURCHASE_ITEM);
    }
  }
}
