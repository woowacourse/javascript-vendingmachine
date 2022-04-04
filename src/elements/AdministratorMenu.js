import CustomElement from '../abstracts/CustomElement';
import { BASE_URL } from '../constants';

class AdministratorMenu extends CustomElement {
  template() {
    return `
      <nav>
        <button class="nav__product-manage-button clicked" route="${BASE_URL}/">상품 관리</button>
        <button class="nav__coin-charge-button" route="${BASE_URL}/coin-charge/">잔돈 충전</button>
        <button class="nav__product-purchase-button" route="${BASE_URL}/product-purchase/">상품 구매</button>
      </nav>
    `;
  }
}

customElements.define('administrator-menu', AdministratorMenu);

export default AdministratorMenu;
