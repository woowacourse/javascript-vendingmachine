import { ACTION_TYPES } from './../utils/constants';
import { ERROR_MSG } from '../utils/constants';
import {
  IGlobalStore,
  TGlobalState,
  TGlobalStateComponents,
  TGlobalAction,
  TGlobalStateKey,
} from './types';

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
        loggedUser: JSON.parse(localStorage.getItem('logged-user')),
        isLoggedIn: localStorage.getItem('access-token') ? true : false,
      },
      CURRENT_ROUTE_NAME: Object.keys(ROUTE).find(
        routeName => ROUTE[routeName] === window.location.pathname,
      ),
    };
  }

  mutateState({
    actionType,
    payload,
    stateKey,
  }: {
    actionType: TGlobalAction;
    payload: unknown;
    stateKey: TGlobalStateKey;
  }) {
    const reducer = this.reducer[actionType];

    if (reducer) {
      reducer(payload);
      this.notifySubscribedView(stateKey);
    }
  }

  subscribe(stateType: TGlobalStateKey, component: unknown) {
    this.subscribedComponents[stateType].push(component);
  }

  getState(stateKey: TGlobalStateKey, component: unknown) {
    if (this.subscribedComponents[stateKey].includes(component)) {
      return this.state[stateKey];
    }
    throw new Error(ERROR_MSG.CAN_NOT_REFERENCE_STATE);
  }

  notifySubscribedView(stateKey: TGlobalStateKey) {
    this.subscribedComponents[stateKey].forEach(component => component.wakeUp(stateKey));
  }

  reducer = {
    [ACTION_TYPES.LOGIN_USER]: payload => {
      const { loggedUser } = payload;

      this.state.AUTH_INFORMATION.loggedUser = loggedUser;
      this.state.AUTH_INFORMATION.isLoggedIn = true;
    },
    [ACTION_TYPES.CHANGE_ROUTE]: payload => {
      const { currentRouteName } = payload;
      this.state.CURRENT_ROUTE_NAME = currentRouteName;
    },
  };
}

export default new GlobalStore();
