import Component from '../core/Component';
import { globalStore } from '../domains/GlobalStore';
import { PAGE } from '../constant';

class Router extends Component {
  setup() {
    const routes = Array.from(this.children).reduce((newObj, child) => {
      newObj[child.getAttribute('path')] = child;

      return newObj;
    }, {});

    this.state = { routes };
  }

  render() {
    // globalStore의 location 값이 바뀔때마다 재랜더
    // useStore로 Router는 등록되어 있음
    // 이렇게 하면 변한 props를 반영하지 못함.
    let curLocation = globalStore.useStore((state) => state.currentLocation);
    const { routes } = this.state;

    if (
      curLocation === PAGE.CHANGE_CHARGE.PATH ||
      curLocation === PAGE.ITEM_MANAGEMENT.PATH
    )
      curLocation = '/';
    const component = routes[curLocation] || routes['*'];

    this.clearDOM();
    this.appendChild(component);
  }
}

customElements.define('page-router', Router);
