import Component from '../core/Component';
import { browser } from '../domains/Browser';
import { auth } from '../domains/Auth';
import { PAGES } from '../configs/constants';
import { convertStringToBoolean } from '../utils/commons';

class Router extends Component {
  setup() {
    const routes = Array.from(this.children).map((child) => ({
      path: child.getAttribute('path'),
      component: child,
    }));

    this.state = { routes };
  }

  render() {
    const component = this.getComponent();
    this.redirect(component);

    this.clearDOM();
    this.appendChild(component);
  }

  getComponent() {
    const location = browser.useStore((state) => state.location);
    const { routes } = this.state;

    const currentRoute = routes.filter(
      (route) =>
        route.path.split('|').includes(location) ||
        route.path === PAGES.DEFAULT.PATH
    )[0];

    return location === PAGES.LANDING.PATH
      ? routes[0].component
      : currentRoute?.component;
  }

  redirect(component) {
    const loginRequired = convertStringToBoolean(
      component.getAttribute('loginRequired')
    );
    const redirection = auth.authRoute(loginRequired);
    const state = {};

    switch (redirection) {
      case 'landing':
        window.history.pushState(state, '', PAGES.LANDING.PATH);
        dispatchEvent(new PopStateEvent('popstate', { state }));
        break;

      case 'login':
        window.history.pushState(state, '', '/login');
        dispatchEvent(new PopStateEvent('popstate', { state }));
        break;

      default:
        break;
    }
  }
}

customElements.define('component-router', Router);
