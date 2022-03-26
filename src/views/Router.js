import Component from '../core/Component';

class Router extends Component {
  setup() {
    const { href } = window.location;
    const location = new URL(href).hash;
    const routes = Array.from(this.children).map((child) => ({
      path: child.getAttribute('path'),
      component: child,
    }));

    this.state = { location, routes };
  }

  render() {
    const { location, routes } = this.state;
    const currentRoute = routes.filter(
      (route) => route.path === location || route.path === '*'
    )[0];
    const component =
      (location === '' && routes[0].component) || currentRoute?.component;

    this.clearDOM();
    this.appendChild(component);
  }

  setEvent() {
    window.addEventListener('hashchange', (event) => {
      const { href } = event.target.location;
      const location = new URL(href).hash;

      this.setState({ location });
    });
  }
}

customElements.define('page-router', Router);
