import Component from '../core/Component';
import { getHash } from '../utils/domUtils';
import { PAGES } from '../configs/constants';

class Router extends Component {
  setup() {
    const routes = Array.from(this.children).map((child) => ({
      path: child.getAttribute('path'),
      component: child,
    }));

    this.state = { routes, location: getHash() };
  }

  render() {
    const { routes, location } = this.state;
    const currentRoute = routes.filter(
      (route) => route.path === location || route.path === PAGES.DEFAULT.PATH
    )[0];
    const component =
      (location === '' && routes[0].component) || currentRoute?.component;

    this.clearDOM();
    this.appendChild(component);
  }

  setEvent() {
    window.addEventListener('hashchange', (event) => {
      this.setState({ location: getHash(event.target) });
    });
  }
}

customElements.define('page-router', Router);
