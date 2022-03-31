class Router {
  routes = {
    home: '/',
    recharge: '/recharge',
    purchase: '/purchase',
    login: '/login',
    join: '/join',
    edit: '/edit',
  };

  pushState(data, name) {
    history.pushState(data, '', this.routes[name]);
  }
  getRouteName(path) {
    return Object.keys(this.routes).find(routeName => this.routes[routeName] === path);
  }
}
export default new Router();
