import { $, getSearchParamsParse, getSearchParamsObject } from 'Utils';

export default class Router {
  pathname = window.location.pathname.slice(0, -1);
  pageList;
  currentPage;

  constructor(pageList) {
    this.pageList = pageList;
    this.setEvents();
    this.pageRender(getSearchParamsParse(window.location.search));
  }

  setEvents() {
    $('#app').addEventListener('click', event => {
      const routeURL = event.target.dataset.route;
      if (!routeURL) return;

      this.pushState(routeURL);
    });

    window.addEventListener('popstate', () => {
      this.pageRender(window.location.search);
    });
  }

  pushState(searchUrl) {
    const searchParams = getSearchParamsParse(searchUrl);
    window.history.pushState(getSearchParamsObject(searchParams), '', this.pathname + searchUrl);
    this.pageRender(searchParams);
  }

  pageRender(searchUrl) {
    const { page = 'product' } = getSearchParamsObject(searchUrl);

    if (!this.pageList[page]) {
      alert('찾을 수 없는 페이지입니다.');
      history.back();
      return;
    }

    this.pageList[page]().then(module => {
      this.currentPage && this.currentPage.unmount();

      const { default: PageClass } = module;
      const loadedPage = new PageClass();

      loadedPage.mount();
      this.currentPage = loadedPage;
    });
  }
}
