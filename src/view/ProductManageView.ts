import { ProductCatalog } from '../domain/ProductCatalog';

import { ProductCatalogTable } from '../component/productManage/ProductCatalogTable';
import { ProductInformationInputForm } from '../component/productManage/ProductInformationInputForm';

interface ProductManageViewInterface {
  getIsRendered();
  show();
  renderAll();
}

export class ProductManageView implements ProductManageViewInterface {
  #productCatalog: ProductCatalog;
  #productInformationInputForm: ProductInformationInputForm;
  #productCatalogTable: ProductCatalogTable;
  #productManageContainer: HTMLDivElement;
  #isRendered: boolean;

  constructor({ productCatalog }) {
    this.#isRendered = false;
    this.#productManageContainer = document.querySelector('.product-manage-container');

    this.#productCatalog = productCatalog;

    this.#productInformationInputForm = new ProductInformationInputForm({
      target: this.#productManageContainer,
      productCatalog: this.#productCatalog,
    });
    this.#productCatalogTable = new ProductCatalogTable({
      target: this.#productManageContainer,
      productCatalog: this.#productCatalog,
    });
  }

  getIsRendered() {
    return this.#isRendered;
  }

  #setIsRendered(status: boolean) {
    this.#isRendered = status;
  }

  show() {
    this.#productManageContainer.classList.remove('hide');
  }

  hide() {
    this.#productManageContainer.classList.add('hide');
  }

  renderAll() {
    this.#productInformationInputForm.render();
    this.#productCatalogTable.render();

    this.#setIsRendered(true);
  }
}
