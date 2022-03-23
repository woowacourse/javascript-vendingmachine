import CustomElement from '../abstracts/CustomElement';

class AdministratorMenu extends CustomElement {
  template() {
    return `
      <nav>
        <button class="nav__product-manage-button">상품 관리</button>
        <button class="nav__change-charge-button">잔돈 충전</button>
        <button class="nav__product-purchase-button">상품 구매</button>
      </nav>
    `;
  }
}

customElements.define('administrator-menu', AdministratorMenu);

export default AdministratorMenu;
