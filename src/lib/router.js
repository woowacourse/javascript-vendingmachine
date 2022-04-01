import globalStore from '../stores/globalStore';
import { ACTION_TYPES, GLOBAL_STATE_KEYS } from '../utils/constants';

export const ROUTE_NAME = {
  MANAGE: 'home',
  RECHARGE: 'recharge',
  PURCHASE: 'purchase',
  LOGIN: 'login',
  JOIN: 'join',
  EDIT: 'edit',
};

export const ROUTE = {
  [ROUTE_NAME.MANAGE]: '/',
  [ROUTE_NAME.RECHARGE]: '/recharge',
  [ROUTE_NAME.PURCHASE]: '/purchase',
  [ROUTE_NAME.LOGIN]: '/login',
  [ROUTE_NAME.JOIN]: '/join',
  [ROUTE_NAME.EDIT]: '/edit',
};

class Router {
  constructor() {
    this.setInitialState();
    this.bindEventHandler();
  }

  setInitialState() {
    globalStore.mutateState({
      actionType: ACTION_TYPES.CHANGE_ROUTE,
      payload: {
        currentRouteName: Object.keys(ROUTE).find(
          routeName => ROUTE[routeName] === window.location.pathname,
        ),
      },
      stateKey: GLOBAL_STATE_KEYS.CURRENT_ROUTE_NAME,
    });
  }

  bindEventHandler() {
    window.addEventListener('popstate', this.onPopState);
  }

  pushState(data, name) {
    if (window.location.pathname !== ROUTE[name]) {
      history.pushState(data, '', ROUTE[name]);

      globalStore.mutateState({
        actionType: ACTION_TYPES.CHANGE_ROUTE,
        payload: {
          currentRouteName: name,
        },
        stateKey: GLOBAL_STATE_KEYS.CURRENT_ROUTE_NAME,
      });
    }
  }

  onPopState = e => {
    const { state } = e;

    globalStore.mutateState({
      actionType: ACTION_TYPES.CHANGE_ROUTE,
      payload: { currentRouteName: state?.path ?? ROUTE_NAME.MANAGE },
      stateKey: GLOBAL_STATE_KEYS.CURRENT_ROUTE_NAME,
    });
  };
}

export default new Router();
