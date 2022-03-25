import { $, getSearchParamsObject } from '@Utils/index';
import Header from '@Display/Header';

export default class Router {
  pageHeader = new Header();
  pageList;

  constructor(pageList) {
    this.pageList = pageList;
    this.setEvents();
    this.pageRender(window.location.search);
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
    window.history.pushState(getSearchParamsObject(searchUrl), '', searchUrl);
    this.pageRender(searchUrl);
  }

  pageRender(searchUrl) {
    const { page = 'product' } = getSearchParamsObject(searchUrl);

    this.pageHeader.render({ currentPage: page });
    !!this.pageList[page] && this.pageList[page].loadPage();
  }
}
