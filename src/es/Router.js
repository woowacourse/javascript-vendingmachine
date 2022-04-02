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
      const { page } = event.target.dataset;
      if (page === '') {
        this.pushState('?');
        return;
      }
      if (!page) return;

      const params = new URLSearchParams({ page });
      this.pushState(`?${params.toString()}`);
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
    const { page = 'productPurchase' } = getSearchParamsObject(searchUrl);

    this.pageHeader.render({ currentPage: page });
    !!this.pageList[page] && this.pageList[page].loadPage();
  }
}
