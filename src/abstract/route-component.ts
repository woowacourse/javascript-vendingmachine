import Router from '../router';
import Component from './component';

abstract class RouteComponent extends Component {
  constructor() {
    super();
    if (!this.dataset.to) {
      throw new Error('RouteComponent는 to attribute를 꼭 가지고 있어야합니다');
    }
    Router.instance.addListener(this);
  }

  onLocationChange() {
    this.render();
  }

  currentPath(): string {
    return Router.instance.getCurrentPath();
  }

  shouldRender() {
    const pathArr = JSON.parse(this.dataset.to!) as Array<string>;
    return pathArr.some((path) => path === location.pathname);
  }
}

export default RouteComponent;
