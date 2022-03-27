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
    const { pathname } = window.location;
    this.routeComponent(pathname);
  }

  routeComponent(pathname: string) {
    if (!this.tabContainer) return;
    if (['/', '/product-manage-tab'].includes(pathname)) {
      this.tabContainer.innerHTML = '<product-manage-tab></product-manage-tab>';
    } else if (pathname === '/charge-money-tab') {
      this.tabContainer.innerHTML = '<charge-money-tab></charge-money-tab>';
    }
  }

  static pushState(url: string) {
    history.pushState({}, '', url);
    window.dispatchEvent(new Event('pushstate'));
  }

  onLocationChange = () => {
    const { pathname } = window.location;
    this.routeComponent(pathname);
  };
}

export default Router;
