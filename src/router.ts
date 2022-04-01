class Router {
  static _instance?: Router;

  pageContainer?: HTMLElement;

  constructor() {
    if (Router._instance) {
      return Router._instance;
    }
    window.addEventListener('pushstate', this.onLocationChange);
    window.addEventListener('popstate', this.onLocationChange);
    this.pageContainer = document.querySelector('.tab-container') as HTMLElement;
    this.onLoad();
  }

  static get instance() {
    if (!Router._instance) {
      Router._instance = new Router();
    }
    return Router._instance;
  }

  private onLoad() {
    this.onLocationChange();
  }

  static pushState(url: string) {
    history.pushState({}, '', url);
    window.dispatchEvent(new Event('pushstate'));
  }

  onLocationChange = () => {
    if (this.pageContainer === undefined) return;

    switch (window.location.pathname) {
      case '/product-manage-tab':
        this.pageContainer.replaceChildren();
        this.pageContainer.insertAdjacentHTML(
          'beforeend',
          '<product-manage-page></product-manage-page>'
        );
        break;
      case '/charge-money-tab':
        this.pageContainer.replaceChildren();
        this.pageContainer.insertAdjacentHTML(
          'beforeend',
          '<charge-money-page></charge-money-page>'
        );
        break;
      case '/purchase-product-tab':
        this.pageContainer.replaceChildren();
        this.pageContainer.insertAdjacentHTML(
          'beforeend',
          '<purchase-product-page></purchase-product-page>'
        );
        break;
    }
  };
}

export default Router;
