import { ACTION } from './constants';
import createAction from './flux/createAction';
import Store from './flux/store';

class Router {
  static _instance?: Router;

  constructor() {
    if (Router._instance) {
      return Router._instance;
    }
    window.addEventListener('pushstate', this.onLocationChange);
    window.addEventListener('popstate', this.onLocationChange);
    this.onLoad();
  }

  static get instance() {
    if (!Router._instance) {
      Router._instance = new Router();
    }
    return Router._instance;
  }

  private onLoad() {
    const { pathname } = window.location;
    Store.instance.dispatch(createAction(ACTION.CHANGE_CURRENT_PATH, pathname));
  }

  static pushState(url: string) {
    history.pushState({}, '', url);
    window.dispatchEvent(new Event('pushstate'));
  }

  onLocationChange = () => {
    const { pathname } = window.location;
    Store.instance.dispatch(createAction(ACTION.CHANGE_CURRENT_PATH, pathname));
  };
}

export default Router;
