import { PurchasableProductCatalogTable } from '../component/productPurchase/PurchasableProductCatalogTable';
import { PurchaseMoneyInputForm } from '../component/productPurchase/PurchaseMoneyInputForm';
import { ReturnedCoinTable } from '../component/productPurchase/ReturnedCoinTable';
import { CoinVault } from '../domain/CoinVault';

import { ProductCatalog } from '../domain/ProductCatalog';
import { PurchaseMoney } from '../domain/PurchaseMoney';

interface ProductPurchaseViewInterface {
  getIsRendered();
  show();
  renderAll();
}

export class ProductPurchaseView implements ProductPurchaseViewInterface {
  #productPurchaseContainer: HTMLDivElement;
  #snackbar: HTMLDivElement;
  #coinVault: CoinVault;
  #productCatalog: ProductCatalog;
  #purchaseMoney: PurchaseMoney;
  #purchaseMoneyInputForm: PurchaseMoneyInputForm;
  #purchasableProductCatalogTable: PurchasableProductCatalogTable;
  #returnedCoinTable: ReturnedCoinTable;
  #isRendered: boolean;

  constructor({ productCatalog, coinVault }) {
    this.#isRendered = false;
    this.#productPurchaseContainer = document.querySelector('.product-purchase-container');
    this.#snackbar = document.querySelector('#snackbar');

    this.#purchaseMoney = new PurchaseMoney();
    this.#productCatalog = productCatalog;
    this.#coinVault = coinVault;

    this.#purchaseMoneyInputForm = new PurchaseMoneyInputForm({
      target: this.#productPurchaseContainer,
      purchaseMoney: this.#purchaseMoney,
    });

    this.#purchasableProductCatalogTable = new PurchasableProductCatalogTable({
      target: this.#productPurchaseContainer,
      productCatalog: this.#productCatalog,
      purchaseMoney: this.#purchaseMoney,
    });

    this.#returnedCoinTable = new ReturnedCoinTable({
      target: this.#productPurchaseContainer,
      coinVault: this.#coinVault,
      purchaseMoney: this.#purchaseMoney,
    });

    this.#productPurchaseContainer.addEventListener('showSnackbar', this.#showSnackbar);
  }

  getIsRendered() {
    return this.#isRendered;
  }

  #setIsRendered(status: boolean) {
    this.#isRendered = status;
  }

  show() {
    this.#productPurchaseContainer.classList.remove('hide');
  }

  hide() {
    this.#productPurchaseContainer.classList.add('hide');
  }

  renderAll() {
    this.#purchaseMoneyInputForm.render();
    this.#purchasableProductCatalogTable.render();
    this.#returnedCoinTable.render();

    this.#setIsRendered(true);
  }

  #showSnackbar = (e: CustomEvent) => {
    const { type, message } = e.detail;
    const emoji = type === 'success' ? '✅' : '❌';

    this.#snackbar.textContent = `${emoji} ${message}`;

    this.#snackbar.classList.toggle('show');
    setTimeout(() => {
      this.#snackbar.classList.toggle('show');
    }, 1500);
  };
}
