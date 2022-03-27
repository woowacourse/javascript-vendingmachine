import Component from '../abstract/component';
import { customElement } from '../decorators/decortators';

@customElement('vendingmachine-navigation')
class Navigation extends Component {
  template(): string {
    return `
      <nav class="d-flex justify-content-center">
        <button class="btn btn-secondary mr-1">상품 관리</button>
        <button class="btn btn-secondary mr-1">잔돈 충전</button>
        <button class="btn btn-secondary">상품 구매</button>
      </nav>
    `;
  }
}

export default Navigation;
