import { PurchasableProductCatalogTable } from '../component/PurchasableProductCatalogTable';
import { PurchaseMoneyInputForm } from '../component/PurchaseMoneyInputForm';
import { ReturnedCoinTable } from '../component/ReturnedCoinTable';
import { CoinVault } from '../domain/CoinVault';

import { ProductCatalog } from '../domain/ProductCatalog';
import { PurchaseMoney } from '../domain/PurchaseMoney';

interface ProductPurchaseViewInterface {
  getIsRendered();
  setIsRendered(status: boolean);
  show();
  renderAll();
}

export class ProductPurchaseView implements ProductPurchaseViewInterface {
  #productPurchaseContainer: HTMLDivElement;
  #purchaseMoneyInputForm: PurchaseMoneyInputForm;
  #purchasableProductCatalogTable: PurchasableProductCatalogTable;
  #returnedCoinTable: ReturnedCoinTable;
  #purchaseMoney: PurchaseMoney;
  #productCatalog: ProductCatalog;
  #coinVault: CoinVault;
  #isRendered: boolean;

  constructor({ productCatalog, coinVault }) {
    this.#isRendered = false;
    this.#productPurchaseContainer = document.querySelector('.product-purchase-container');

    this.#purchaseMoney = new PurchaseMoney();
    this.#productCatalog = productCatalog;
    this.#coinVault = coinVault;
    this.#purchaseMoneyInputForm = new PurchaseMoneyInputForm({
      target: this.#productPurchaseContainer,
      purchaseMoney: this.#purchaseMoney,
    });
    // TODO: 공통된 하나의 productCatalog 인스턴스를 내려받아야함
    this.#purchasableProductCatalogTable = new PurchasableProductCatalogTable({
      target: this.#productPurchaseContainer,
      productCatalog: this.#productCatalog,
    });
    // TODO: coinVault, purchaseMoney 내려줘야함
    this.#returnedCoinTable = new ReturnedCoinTable({
      target: this.#productPurchaseContainer,
      coinVault: this.#coinVault,
      purchaseMoney: this.#purchaseMoney,
    });
  }

  getIsRendered() {
    return this.#isRendered;
  }

  setIsRendered(status: boolean) {
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
  }
}
