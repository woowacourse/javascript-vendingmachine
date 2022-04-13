import AuthStore from '../domains/stores/AuthStore';
import CustomElement from '../abstracts/CustomElement';
import { hideElement, showElement } from '../utils';

class AdministratorMenu extends CustomElement {
  connectedCallback() {
    super.connectedCallback();
    AuthStore.instance.subscribe(this);
  }

  template() {
    return `
      <nav>
        <a href="#!product-manage">
          <button class="nav__product-manage-button">상품 관리</button>
        </a>
        <a href="#!coin-charge">
          <button class="nav__coin-charge-button">잔돈 충전</button>
        </a>
        <a href="#!product-purchase">
          <button class="nav__product-purchase-button clicked">상품 구매</button>
        </a>
      </nav>
    `;
  }

  rerender(isAdministrator) {
    if (isAdministrator) {
      showElement(this);

      return;
    }

    hideElement(this);
  }
}

customElements.define('administrator-menu', AdministratorMenu);

export default AdministratorMenu;
