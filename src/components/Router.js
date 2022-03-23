import Component from '../core/Component.js';

class Router extends Component {
  setup() {
    this.state = { location: '/', routes: Array.from(this.children) };
  }

  render() {
    const { location, routes } = this.state;

    const pathList = routes.map((route) => route.getAttribute('path'));
    const currentRoute = routes.filter(
      (route) => route.getAttribute('path') === location
    )[0];

    while (this.firstChild) {
      this.removeChild(this.lastChild);
    }

    if (pathList.includes(location) || location === '/') {
      this.appendChild(currentRoute || routes[0]);
    } else {
      this.appendChild(routes[routes.length - 1]);
    }
  }

  setEvent() {
    window.addEventListener('pushState', (event) => {
      const { href } = event.target.location;
      const route = href.split('/').pop();

      this.setState({ location: `/${route}` });
    });
  }
}

customElements.define('page-router', Router);
