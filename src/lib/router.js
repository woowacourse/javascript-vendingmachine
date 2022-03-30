class Router {
  routes = {
    home: '/',
    recharge: '/recharge',
    purchase: '/purchase',
  };
  pushState(data, name) {
    history.pushState(data, '', this.routes[name]);
  }
}
export default new Router();
