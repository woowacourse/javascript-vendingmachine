import { $ } from '../../dom';
import { on } from '../../events';
import renderSnackBar from '../../snackbar';

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
  private $moneyInput = $(
    '.money-for-purchase-form-section__money-input'
  ) as HTMLFormElement;
  private $moneyInputForm = $('.money-for-purchase-form') as HTMLInputElement;
  private $totalMoney: HTMLSpanElement = $(
    '.money-for-purchase-section__total-money'
  );
  private $returnButton = $(
    '.money-for-purchase-return-button'
  ) as HTMLButtonElement;
  private $coin500 = $(
    '.return-coin-quantity-section .coin-quantity-table__coin-500'
  );
  private $coin100 = $(
    '.return-coin-quantity-section .coin-quantity-table__coin-100'
  );
  private $coin50 = $(
    '.return-coin-quantity-section .coin-quantity-table__coin-50'
  );
  private $coin10 = $(
    '.return-coin-quantity-section .coin-quantity-table__coin-10'
  );

  constructor(
    private productManager,
    private coinManager,
    private purchaseManager
  ) {
    on(this.$app, '@purchaseTabClicked', this.render);
    on(this.$moneyInputForm, 'submit', this.onSubmitMoneyForPurchase);
    on(this.$purchasableProductTableBody, 'click', this.onPurchaseProduct);
    on(this.$returnButton, 'click', this.onClickReturnCoinsButton);
  }

  render = () => {
    this.$purchasableProductTableBody.innerHTML = this.productManager
      .getProducts()
      .map((product) => generateTemplate(product))
      .join('');
    this.renderTotalMoney();
  };

  onSubmitMoneyForPurchase = (e) => {
    e.preventDefault();

    this.purchaseManager.addMoney(this.$moneyInput.valueAsNumber);
    this.renderTotalMoney();
    this.$moneyInput.value = '';
  };

  renderTotalMoney() {
    this.$totalMoney.textContent = this.purchaseManager.getMoney().toString();
  }

  onPurchaseProduct = (e) => {
    e.preventDefault();

    const { productName } = e.target.closest('.product-table__info-tr').dataset;
    try {
      if (this.productManager.getProductQuantity(productName) <= 0) {
        throw new Error('해당 상품은 매진되었습니다.');
      }
      if (
        this.purchaseManager.getMoney() <
        this.productManager.getProductPrice(productName)
      ) {
        throw new Error('현재 투입 금액으로 살 수 없는 상품입니다.');
      }

      this.productManager.sellProduct(productName);
      this.purchaseManager.spendMoney(
        this.productManager.getProductPrice(productName)
      );

      this.render();
    } catch ({ message }) {
      renderSnackBar(message);
    }
  };

  onClickReturnCoinsButton = (e) => {
    e.preventDefault();

    this.renderReturnedCoins(
      this.coinManager.returnCoins(this.purchaseManager.getMoney())
    );
    this.purchaseManager.reset();
    this.renderTotalMoney();
  };

  renderReturnedCoins({ COIN_500, COIN_100, COIN_50, COIN_10 }) {
    this.$coin500.textContent = COIN_500;
    this.$coin100.textContent = COIN_100;
    this.$coin50.textContent = COIN_50;
    this.$coin10.textContent = COIN_10;
  }
}
