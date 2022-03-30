import { ProductInformationInput } from '../component/ProductInformationInput';
import { ProductCatalogTable } from '../component/ProductCatalogTable';
import { ProductCatalog } from '../domain/ProductCatalog';

export class ProductManageView {
  productInformationInput: ProductInformationInput;
  productCatalogTable: ProductCatalogTable;
  contentsContainer: HTMLDivElement;
  productCatalog: ProductCatalog;
  props: object;

  constructor() {
    this.productCatalog = new ProductCatalog();
    this.contentsContainer = document.querySelector('#contents-container');

    this.props = {
      target: this.contentsContainer,
      productCatalog: this.productCatalog,
    };
    this.productInformationInput = new ProductInformationInput(this.props);
    this.productCatalogTable = new ProductCatalogTable(this.props);
  }

  eraseAll() {
    this.contentsContainer.textContent = '';
  }

  renderAll() {
    this.productInformationInput.render();
    this.productCatalogTable.render();
  }
}
