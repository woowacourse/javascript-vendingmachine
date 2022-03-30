import { $, getSearchParamsParse, getSearchParamsObject } from '@Utils/index';
import Header from '@Display/Header';

export default class Router {
  pathname = window.location.pathname.slice(0, -1);
  pageHeader = new Header();
  pageList;

  constructor(pageList) {
    this.pageList = pageList;
    this.setEvents();
    this.pageRender(this.pathname + getSearchParamsParse(window.location.search));
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

    this.pageHeader.render({ currentPage: page });
    !!this.pageList[page] && this.pageList[page].loadPage();
  }
}
