import CustomElement from '../abstracts/CustomElement';
import { $ } from '../utils/dom';

class AdministratorMenu extends CustomElement {
  template() {
    return `
      <nav>
        <button class="nav__product-manage-button clicked">상품 관리</button>
        <button class="nav__coin-charge-button">잔돈 충전</button>
        <button class="nav__product-purchase-button">상품 구매</button>
      </nav>
    `;
  }

  setEvent() {
    $('.nav__product-manage-button').addEventListener('click', this.handleProductManageButtonClick);
    $('.nav__coin-charge-button').addEventListener('click', this.handleCoinChargeButtonClick);
  }

  handleProductManageButtonClick = () => {
    $('product-manage-container').show();
    $('coin-charge-container').hide();

    $('.nav__product-manage-button').classList.add('clicked');
    $('.nav__coin-charge-button').classList.remove('clicked');
  };

  handleCoinChargeButtonClick = () => {
    $('product-manage-container').hide();
    $('coin-charge-container').show();

    $('.nav__product-manage-button').classList.remove('clicked');
    $('.nav__coin-charge-button').classList.add('clicked');
  };
}

customElements.define('administrator-menu', AdministratorMenu);

export default AdministratorMenu;
