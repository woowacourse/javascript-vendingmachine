import Component from '../abstract/component';
import { WhiteList } from '../constants';
import { customElement } from '../decorators/decortators';
import Router from '../router';

@customElement('back-arrow')
class BackArrow extends Component {
  template(text: string): string {
    return `
      <button type="button">
        <img src='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGhlaWdodD0iNTEycHgiIGlkPSJMYXllcl8xIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgd2lkdGg9IjUxMnB4IiB4bWw6c3BhY2U9InByZXNlcnZlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48cG9seWdvbiBwb2ludHM9IjM1MiwxMjguNCAzMTkuNyw5NiAxNjAsMjU2IDE2MCwyNTYgMTYwLDI1NiAzMTkuNyw0MTYgMzUyLDM4My42IDIyNC43LDI1NiAiLz48L3N2Zz4=' />
        <span>${text}</span>
      </button>
    `;
  }

  setEvent() {
    const path = this.dataset.path ?? WhiteList.Home;
    this.addEvent('click', 'button', () => Router.pushState(path));
  }

  shouldSubscribe() {
    return false;
  }

  mount() {
    this.render();
  }

  render() {
    const text = this.textContent ?? 'Home';
    this.innerHTML = this.template(text);
  }
}

export default BackArrow;
