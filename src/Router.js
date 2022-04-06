import { $, getEntryPath } from 'Utils';

export default class Router {
  pageList;
  currentPage;

  constructor(pageList) {
    this.pageList = pageList;
    this.setEvents();
    this.pageRender(getEntryPath());
  }

  setEvents() {
    $('#app').addEventListener('click', event => {
      const routeURL = event.target.dataset.route;
      if (!routeURL) return;

      this.pushState(routeURL);
    });

    window.addEventListener('popstate', () => {
      this.pageRender(location.pathname);
    });
  }

  pushState(pathParams) {
    window.history.pushState({ path: pathParams }, '', pathParams);
    this.pageRender(pathParams);
  }

  pageRender(pathParams) {
    const pageName = getEntryPath(pathParams) || 'product';
    if (!this.pageList[pageName]) {
      alert('찾을 수 없는 페이지입니다.');
      history.back();
      return;
    }

    this.pageList[pageName]().then(module => {
      this.currentPage && this.currentPage.unmount();

      const { default: PageClass } = module;
      const loadedPage = new PageClass();

      loadedPage.mount();
      this.currentPage = loadedPage;
    });
  }
}
