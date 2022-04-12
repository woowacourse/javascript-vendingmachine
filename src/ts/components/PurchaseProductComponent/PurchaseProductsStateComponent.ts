import { $ } from '../../dom';
import { on } from '../../events';
import renderSnackBar from '../../snackbar';
import { Coins } from '../../types/CoinManager';
import { checkValidPurchase } from '../validator';

export default class PurchaseProductsStateComponent {
  private $purchasableProductTableBody = $(
    '.purchase-section .product-table tbody'
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
    private purchaseManager,
    private coinManager,
    private render,
    private renderTotalMoney
  ) {
    on(this.$purchasableProductTableBody, 'click', this.onPurchaseProduct);
    on(this.$returnButton, 'click', this.onClickReturnCoinsButton);
  }

  onPurchaseProduct = (e) => {
    e.preventDefault();
    if (!e.target.classList.contains('table-button')) {
      return;
    }

    const { productName } = e.target.closest('.product-table__info-tr').dataset;
    try {
      checkValidPurchase({
        quantity: this.productManager.getProductQuantity(productName),
        price: this.productManager.getProductPrice(productName),
        userMoney: this.purchaseManager.getMoney(),
      });

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

  renderReturnedCoins({ COIN_500, COIN_100, COIN_50, COIN_10 }: Coins) {
    this.$coin500.textContent = String(COIN_500);
    this.$coin100.textContent = String(COIN_100);
    this.$coin50.textContent = String(COIN_50);
    this.$coin10.textContent = String(COIN_10);
  }
}
