import { ProductInformationInputForm } from '../component/ProductInformationInputForm';
import { ProductCatalogTable } from '../component/ProductCatalogTable';
import { ProductCatalog } from '../domain/ProductCatalog';

export class ProductManageView {
  #productInformationInputForm: ProductInformationInputForm;
  #productCatalogTable: ProductCatalogTable;
  #productCatalog: ProductCatalog;
  #contentsContainer: HTMLDivElement;
  props: object;

  constructor() {
    this.#productCatalog = new ProductCatalog();

    this.#contentsContainer = document.querySelector('#contents-container');
  }

  init() {
    this.#contentsContainer.textContent = '';

    this.#productInformationInputForm = new ProductInformationInputForm({
      target: this.#contentsContainer,
      productCatalog: this.#productCatalog,
    });
    this.#productCatalogTable = new ProductCatalogTable({
      target: this.#contentsContainer,
      productCatalog: this.#productCatalog,
    });
  }

  renderAll() {
    this.#contentsContainer.textContent = '';

    this.#productInformationInputForm.render();
    this.#productCatalogTable.render();
  }
}
