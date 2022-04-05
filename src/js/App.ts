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

    window.addEventListener(CUSTOM_EVENT.ROUTE_CHANGE, this.handleRouteChange.bind(this));
    window.addEventListener(CUSTOM_EVENT.RENDER_PAGE, this.renderPage.bind(this));
    window.addEventListener('popstate', this.renderPage.bind(this));
  }

  handleRouteChange(event: CustomEvent<RouteChangeDetailType>) {
    const { page, url } = event.detail;

    window.history.pushState(null, null, `${URL.BASE_URL}/#${page}/#${url}`);
  }

  renderPage() {
    const [_, page, url] = window.location.href.split('/#');

    switch (page) {
      case URL.MAIN:
        this.mainView.render();
        this.mainView.renderMainPageSection(url);
        break;
      case URL.SIGN:
        this.signView.render();
        this.signView.renderSignPageSection(url);
        break;
      default:
        this.mainView.render();
        this.mainView.renderMainPageSection(URL.PURCHASE_ITEM);
    }
  }

  initialRender() {
    window.history.pushState(null, null, `${URL.BASE_URL}/#${URL.MAIN}/#${URL.PURCHASE_ITEM}`);
    this.renderPage();
  }
}
