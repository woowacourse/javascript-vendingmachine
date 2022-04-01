import { $, getSearchParamsParse, getSearchParamsObject } from 'Utils';
import Header from 'Layout/Header';

export default class Router {
  pathname = window.location.pathname.slice(0, -1);
  pageHeader = new Header();
  pageList;
  previousPage;

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

    this.pageHeader.render({ currentPage: page });
    !!this.pageList[page] && this.pageList[page].mountPage();

    this.previousPage && this.previousPage.unmountPage();
    this.previousPage = this.pageList[page];
  }
}
