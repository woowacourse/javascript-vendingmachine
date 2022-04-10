import Component from '../abstract/component';
import { customElement } from '../decorators/decortators';

@customElement('only-manager-accessible-page')
class OnlyManagerAccessiblePage extends Component {
  template(): string {
    return `<h2>🚫이 페이지는 관리자만 접근할 수 있습니다🚫 </h2>`;
  }
}
