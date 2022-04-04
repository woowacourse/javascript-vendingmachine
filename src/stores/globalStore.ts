import { WEB_STORAGE_KEY } from './../utils/constants';
import { IGlobalStore, TGlobalState, TGlobalStateComponents, TGlobalStateKey } from './types';

import { ROUTE } from '../lib/router';

class GlobalStore implements IGlobalStore {
  subscribedComponents: TGlobalStateComponents;

  state: TGlobalState;

  constructor() {
    this.subscribedComponents = {
      AUTH_INFORMATION: [],
      CURRENT_ROUTE_NAME: [],
    };
    this.state = {
      AUTH_INFORMATION: {
        loggedUser: JSON.parse(localStorage.getItem(WEB_STORAGE_KEY.USER)),
        isLoggedIn: localStorage.getItem(WEB_STORAGE_KEY.ACCESS_TOKEN) ? true : false,
      },
      CURRENT_ROUTE_NAME: Object.keys(ROUTE).find(
        routeName => ROUTE[routeName] === window.location.pathname,
      ),
    };
  }

  setState(key, valueOrFunction) {
    if (typeof valueOrFunction === 'function') {
      this.state[key] = valueOrFunction(this.state[key]);
    }
    if (typeof valueOrFunction !== 'function') {
      this.state[key] = valueOrFunction;
    }
    this.notifySubscribedView(key);
  }

  subscribe(stateType: TGlobalStateKey, component: unknown) {
    this.subscribedComponents[stateType].push(component);
  }

  getState(stateKey: TGlobalStateKey) {
    return this.state[stateKey];
  }

  notifySubscribedView(stateKey: TGlobalStateKey) {
    this.subscribedComponents[stateKey].forEach(component => component.wakeUp(stateKey));
  }
}

export default new GlobalStore();
