import { ACTION, PATH_TO_TAB_DIC } from './constants';
import createAction from './flux/createAction';
import Store from './flux/store';
import { Tab } from './types';

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
    Store.instance.dispatch(createAction(ACTION.CHANGE_ACTIVE_TAB, Router.activeTab()));
  }

  static pushState(url: string) {
    history.pushState({}, '', url);
    window.dispatchEvent(new Event('pushstate'));
  }

  onLocationChange = () => {
    Store.instance.dispatch(createAction(ACTION.CHANGE_ACTIVE_TAB, Router.activeTab()));
  };

  static activeTab(): Tab {
    const { pathname } = window.location;
    return PATH_TO_TAB_DIC[pathname];
  }
}

export default Router;
