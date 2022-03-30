import Component from '../core/Component';
import { vendingMachine } from '../domains/VendingMachine';
import { PAGES } from '../configs/constants';

class Router extends Component {
  setup() {
    const routes = Array.from(this.children).map((child) => ({
      path: child.getAttribute('path'),
      component: child,
    }));

    this.state = { routes };
  }

  render() {
    const location = vendingMachine.useStore((state) => state.location);
    const { routes } = this.state;

    const currentRoute = routes.filter(
      (route) => route.path === location || route.path === PAGES.DEFAULT.PATH
    )[0];
    const component =
      (location === '' && routes[0].component) || currentRoute?.component;

    this.clearDOM();
    this.appendChild(component);
  }
}

customElements.define('page-router', Router);
