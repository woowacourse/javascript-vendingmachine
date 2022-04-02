export const ROUTE_NAME = {
  MANAGE: 'manage',
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
  pushState(data, name) {
    if (window.location.pathname !== ROUTE[name]) {
      history.pushState(data, '', ROUTE[name]);
    }
  }
}

export default new Router();
