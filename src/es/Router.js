import { $, getSearchParamsObject } from './utils';
import HeaderView from './View/HeaderView';

export default class Router {
  pathname = window.location.pathname.slice(0, -1);
  pageHeader = new HeaderView();
  pageList;

  constructor(pageList) {
    this.pageList = pageList;
    this.setEvents();
    this.pageRender(this.pathname + window.location.search);
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
    window.history.pushState(getSearchParamsObject(searchUrl), '', this.pathname + searchUrl);
    this.pageRender(searchUrl);
  }

  pageRender(searchUrl) {
    const { page = 'product' } = getSearchParamsObject(searchUrl);

    this.pageHeader.render({ currentPage: page });
    !!this.pageList[page] && this.pageList[page].loadPage();
  }
}
