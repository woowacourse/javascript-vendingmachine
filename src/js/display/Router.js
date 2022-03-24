import { $ } from '@Utils/index';

export default class Router {
  loadMethodList;

  constructor(loadMethodList) {
    this.loadMethodList = loadMethodList;
    this.setEvents();
    this.pageRender();
  }

  파라미터를오브젝트로바꿔주는기능(searchUrl = '') {
    const searchString = `?${searchUrl.split('?')[1]}`;
    const searchParams = new URLSearchParams(searchString);
    return [...searchParams.keys()].reduce((previous, key) => {
      previous[key] = searchParams.get(key);
      return previous;
    }, {});
  }

  setEvents() {
    $('#app').addEventListener('click', event => {
      const routeURL = event.target.dataset.route;
      if (!routeURL) return;
      this.pushState(routeURL);
    });

    window.addEventListener('popstate', event => {
      this.pageRender(window.location.search);
    });
  }

  pushState(searchUrl) {
    window.history.pushState(this.파라미터를오브젝트로바꿔주는기능(searchUrl), '', searchUrl);
    this.pageRender(searchUrl);
  }

  pageRender(searchUrl) {
    const { page = 'product' } = this.파라미터를오브젝트로바꿔주는기능(searchUrl);
    !!this.loadMethodList[page] && this.loadMethodList[page]();
  }
}
