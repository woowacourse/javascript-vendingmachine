import CustomElement from '../abstracts/CustomElement';

class AdministratorMenu extends CustomElement {
  template() {
    return `
      <nav>
        <a href="#!product-manage"><button class="nav__product-manage-button product clicked">상품 관리</button></a>
        <a href="#!coin-charge"><button class="nav__coin-charge-button coin">잔돈 충전</button></a>
        <a href="#!product-purchase"><button class="nav__product-purchase-button">상품 구매</button></a>
      </nav>
    `;
  }
}

customElements.define('administrator-menu', AdministratorMenu);

export default AdministratorMenu;
