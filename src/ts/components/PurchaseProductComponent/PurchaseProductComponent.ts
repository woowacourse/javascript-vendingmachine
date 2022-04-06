import { $ } from '../../dom';
import { on } from '../../events';
import PurchaseMoneyInputComponent from './PurchaseMoneyInputComponent';
import PurchaseProductsStateComponent from './PurchaseProductsStateComponent';

const generateTemplate = ({
  name: productName,
  price: productPrice,
  quantity: productQuantity,
}): string => `
  <tr class="product-table__info-tr" data-product-name="${productName}">
    <td>${productName}</td>
    <td>${productPrice}</td>
    <td>${productQuantity}개</td>
    <td class="product-table__button-wrapper">
      <button class="product-table__purchase-button table-button">구매</button>
    </td>
    <td class="product-table__button-wrapper hide">
      <button class="product-table__confirm-button table-button">확인</button>
    </td>
  </tr>
`;

export default class PurchaseProductComponent {
  private $app = $('#app');
  private $purchasableProductTableBody = $(
    '.purchase-section .product-table tbody'
  );
  private $totalMoney: HTMLSpanElement = $(
    '.money-for-purchase-section__total-money'
  );

  constructor(
    private productManager,
    private coinManager,
    private purchaseManager
  ) {
    new PurchaseMoneyInputComponent(
      this.purchaseManager,
      this.renderTotalMoney
    );
    new PurchaseProductsStateComponent(
      this.productManager,
      this.purchaseManager,
      this.coinManager,
      this.render,
      this.renderTotalMoney
    );
    on(this.$app, '@purchaseTabClicked', this.render);
  }

  render = () => {
    this.$purchasableProductTableBody.innerHTML = this.productManager
      .getProducts()
      .map((product) => generateTemplate(product))
      .join('');
    this.renderTotalMoney();
  };

  renderTotalMoney = () => {
    this.$totalMoney.textContent = this.purchaseManager.getMoney().toString();
  };
}
