import { $, getEntryPath } from 'Utils';
import { DEFAULT_PAGE } from 'Constants';

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
    if ((window.history.state && pathParams !== window.history.state.path) || !window.history.state)
      window.history.pushState({ path: pathParams }, '', pathParams);

    this.pageRender(pathParams);
  }

  pageRender(pathParams) {
    const pageName = getEntryPath(pathParams) || DEFAULT_PAGE;
    if (!this.pageList[pageName]) {
      alert('찾을 수 없는 페이지입니다.');
      history.back();
      return;
    }

    if (pageName === DEFAULT_PAGE) {
      this.#pageMount(this.pageList[pageName]);
      return;
    }

    this.pageList[pageName]().then(module => {
      const { default: PageClass } = module;
      this.#pageMount(PageClass);
    });
  }

  #pageMount(PageClass) {
    const loadedPage = new PageClass();
    this.currentPage && this.currentPage.unmount();

    loadedPage.mount();
    this.currentPage = loadedPage;
  }
}
