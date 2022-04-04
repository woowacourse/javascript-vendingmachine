import { ProductInformationInputForm } from '../component/ProductInformationInputForm';
import { ProductCatalogTable } from '../component/ProductCatalogTable';

import { ProductCatalog } from '../domain/ProductCatalog';

interface ProductManageViewInterface {
  getIsRendered();
  setIsRendered(status: boolean);
  show();
  renderAll();
}

export class ProductManageView implements ProductManageViewInterface {
  #productInformationInputForm: ProductInformationInputForm;
  #productCatalogTable: ProductCatalogTable;
  #productCatalog: ProductCatalog;
  #productManageContainer: HTMLDivElement;
  #isRendered: boolean;

  constructor() {
    this.#isRendered = false;
    this.#productManageContainer = document.querySelector('#product-manage-container');

    this.#productCatalog = new ProductCatalog();

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

  setIsRendered(status: boolean) {
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
  }
}
